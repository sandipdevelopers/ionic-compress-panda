import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {  File } from '@awesome-cordova-plugins/file/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
import { SaveFileModalComponent } from 'src/app/component/save-file-modal/save-file-modal.component';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { FilePicker } from "@capawesome/capacitor-file-picker"
@Component({
  selector: 'app-change-audio',
  templateUrl: './change-audio.page.html',
  styleUrls: ['./change-audio.page.scss'],
})
export class ChangeAudioPage implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: any;

  isPlaying: boolean = false;
  isMuted: boolean = true;
  isFullScreen: boolean = false;
  videoUrl: string = '';
  selectedAudio: string = '';
  loading: any;
  isSpinner: boolean = false;
  constructor(
    public gs: GlobalService,
    public saveFile: SaveFileService,
    public cdr: ChangeDetectorRef,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public file: File,
  ) { }

  ngOnInit() { }

  onFullscreenChange() {
    this.isFullScreen = !!document.fullscreenElement || !!(document as any).webkitFullscreenElement || !!(document as any).msFullscreenElement;
    this.cdr.detectChanges();
  }

  async ionViewDidEnter() {
    this.setVideoUrl();
    document.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('msfullscreenchange', this.onFullscreenChange.bind(this));
  }

  async setVideoUrl() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.src = (<any>window).Ionic.WebView.convertFileSrc(this.gs.seletedVideo);
    videoElement.muted = this.isMuted;
    videoElement.load();
    videoElement.play().catch((error: any) => {
      console.error('Error attempting to play:', JSON.stringify(error));
    });
    this.isPlaying = true;
  }
  togglePlayPause() {
    const videoElement = this.videoPlayer.nativeElement;
    if (videoElement.paused) {
      videoElement.play().then(() => {
        this.isPlaying = true;
      }).catch((error: any) => {
        console.error('Error attempting to play:', error);
      });
    } else {
      videoElement.pause();
      this.isPlaying = false;
    }
    this.cdr.detectChanges();
  }

  toggleMute() {
    const videoElement = this.videoPlayer.nativeElement;

    videoElement.muted = !videoElement.muted; 
    this.isMuted = videoElement.muted; 
    
    // Log the states for debugging
    console.log("videoElement.muted", videoElement.muted);
    console.log("this.isMuted", this.isMuted);
    this.cdr.detectChanges();
  }

  // Toggle Fullscreen
  toggleFullScreen() {
    const videoElement = this.videoPlayer.nativeElement;

    if (!this.isFullScreen) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
      this.isFullScreen = true;
      this.cdr.detectChanges();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if ((document as any).webkitFullscreenElement) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msFullscreenElement) {
        (document as any).msExitFullscreen();
      }
      this.isFullScreen = false;
      this.cdr.detectChanges();
    }
  }

  async openSaveFileModal() {
    if (!this.selectedAudio) {
      this.gs.presentToast('Please select an audio file to proceed.');
      return;
    }
    let defaultFileName = 'change-audio-' + Math.floor(1000 + Math.random() * 9000);
    let defaultfolderName = 'change-audio';
    const modal = await this.modalController.create({
      component: SaveFileModalComponent,
      backdropDismiss: false,
      breakpoints: [1],
      initialBreakpoint: 1,
      cssClass: 'save-file-modal',
      componentProps: { defaultFileName, defaultfolderName },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.showLoading().then(() => {
          const { folder, fileName } = result.data;
          let saveFilePath = `${this.file.dataDirectory}compresser/${folder}/${fileName}.mp4`;
          let cmd = ` -i   ${this.gs.seletedVideo}   -i   ${this.selectedAudio}  -c:v copy -map 0:v:0 -map 1:a:0 -shortest ${saveFilePath} `;
          (<any>window).ffmpeg.exec(cmd, (success: any) => {
            this.gs.presentToast("Audio change successful! Your video with the new audio has been saved.");
            this.loddingDismiss();
            this.gs.goToVideoList(folder);
          }, (failure: any) => {
              this.gs.presentToast("Audio change failed. Please try again.");
              this.loddingDismiss();
            }
          );
        });
      }
    });
    return await modal.present();
  }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait..',
      spinner: 'circles',
      backdropDismiss: false
    });

    this.loading.present();
  }

  async selectAudio() {
    await FilePicker.pickFiles().then((result: any) => {
      if (result && result.files && result.files.length) {
        if(result.files && result.files.length) {
          this.selectedAudio = result.files[0].path;
          this.gs.presentToast("Audio file selected.");
        }
      } else {
        this.gs.presentToast("No audio file selected. Please try again.");
      }
    }).catch((error: any) => {
      this.gs.presentToast("Error selecting audio file. Please try again.");
    });
    
  }
  loddingDismiss() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null
    }
  }

  ionViewWillLeave() {
    this.loddingDismiss();
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.muted = this.isMuted;
    videoElement.pause();
  }
}
