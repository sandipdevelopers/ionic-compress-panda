import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import {  LoadingController, ModalController } from '@ionic/angular';
import { SaveFileModalComponent } from 'src/app/component/save-file-modal/save-file-modal.component';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';

@Component({
  selector: 'app-video-to-mp3',
  templateUrl: './video-to-mp3.page.html',
  styleUrls: ['./video-to-mp3.page.scss'],
})
export class VideoToMp3Page implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: any;

  isPlaying: boolean = false;
  isMuted: boolean = true;
  isFullScreen: boolean = false;
  videoUrl: string = '';
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

    // Toggle mute state
    videoElement.muted = !videoElement.muted;
    this.isMuted = videoElement.muted;

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
    let defaultFileName = 'VideoToMP3-' + Math.floor(1000 + Math.random() * 9000);
    let defaultfolderName = 'video-to-mp3';
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
          let saveFilePath = `${this.file.dataDirectory}compresser/${folder}/${fileName}.m4a`;
          let cmd = "-i " + this.gs.seletedVideo + " -vn -ar 44100 -ac 2 -b:a 256k -c:a aac " + saveFilePath;
          (<any>window).ffmpeg.exec(cmd, (success: any) => {
            this.gs.presentToast("Video to MP3 conversion successful! Your file has been saved.");
            this.loddingDismiss();
            this.gs.goToVideoList(folder);
          },
            (failure: any) => {
              console.log("failure :::::::::", JSON.stringify(failure));
              this.gs.presentToast("Video to MP3 conversion failed. Please try again.");
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
