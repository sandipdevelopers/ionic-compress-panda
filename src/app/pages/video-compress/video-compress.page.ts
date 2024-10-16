import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { SaveFileModalComponent } from 'src/app/component/save-file-modal/save-file-modal.component';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { Capacitor } from '@capacitor/core';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Component({
  selector: 'app-video-compress',
  templateUrl: './video-compress.page.html',
  styleUrls: ['./video-compress.page.scss'],
})
export class VideoCompressPage implements OnInit {
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
    public file: File
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
    videoElement.play().then(()=>{
    }).catch((error: any) => {
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

  // Toggle Mute/Unmute
  toggleMute() {
    const videoElement = this.videoPlayer.nativeElement;

    // Toggle mute state
    videoElement.muted = !videoElement.muted; // Toggle muted state
    this.isMuted = videoElement.muted; // Update isMuted state

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
    let defaultFileName = 'compress-video-' + Math.floor(1000 + Math.random() * 9000);
    let defaultfolderName = 'compress-video';
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
          let cmd = "-i " + this.gs.seletedVideo + " -r 5 -c:v libx264 -b:v 600k -b:a 44100 -ac 2 -ar 22050 -tune fastdecode -preset ultrafast " + saveFilePath;
          try {
            (<any>window).ffmpeg.exec(cmd, (success: any) => {
                  this.gs.presentToast("Video has been deleted successfully.");
              this.loddingDismiss();
              this.gs.goToVideoList(folder);
            },
              (failure: any) => {
                console.log("failure :::::::::", JSON.stringify(failure));
                this.gs.presentToast("Video compression failed. Please try again.");
                this.loddingDismiss();
              }
            );
          } catch (error) {
            console.log("failure :::::::::", JSON.stringify(error));
            this.gs.presentToast("Video compression failed. Please try again.");
            this.loddingDismiss();
          }
          
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
