import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
import { SaveFileModalComponent } from 'src/app/component/save-file-modal/save-file-modal.component';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';

@Component({
  selector: 'app-slow-motion',
  templateUrl: './slow-motion.page.html',
  styleUrls: ['./slow-motion.page.scss'],
})
export class SlowMotionPage implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: any;

  isPlaying: boolean = false;
  isMuted: boolean = true;
  isFullScreen: boolean = false;
  videoUrl: string = '';
  loading: any;
  isSpinner: boolean = false;
  seletedSpeed :any = 'setpts=1.0*PTS'
  playbackSpeeds = [
    { label: '2.0x (Half Speed)', multiplier: 2.0, value: 'setpts=2.0*PTS' },
    { label: '1.5x (Slower)', multiplier: 1.333, value: 'setpts=1.333*PTS' },
    { label: '1.0x (Original)', multiplier: 1.0, value: 'setpts=1.0*PTS' },
    { label: '0.75x (Faster)', multiplier: 0.75, value: 'setpts=0.75*PTS' },
    { label: '0.5x (Double Speed)', multiplier: 0.5, value: 'setpts=0.5*PTS' }
  ];

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
    // videoElement.src = 'https://videos.pexels.com/video-files/4434242/4434242-uhd_1440_2560_24fps.mp4';
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
    let defaultFileName = 'SlowMotion-' + Math.floor(1000 + Math.random() * 9000);
    let defaultfolderName = 'slow-motion';
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
          let cmd = `-i ${this.gs.seletedVideo} -vf "${this.seletedSpeed}" -c:a copy ${saveFilePath}`;
          
          console.log("FFmpeg Command:", cmd);
          try {
            (<any>window).ffmpeg.exec(cmd, (success: any) => {
              this.gs.presentToast("Slow-motion effect applied successfully! Your video has been saved.");
              this.loddingDismiss();
              this.gs.goToVideoList(folder);
            },
            (failure: any) => {
              console.log("FFmpeg Failure:", JSON.stringify(failure));
              this.gs.presentToast("Failed to apply slow-motion effect. Please try again.");
              this.loddingDismiss();
            });
          } catch (error) {
            console.log("FFmpeg Error:", JSON.stringify(error));
            this.gs.presentToast("Failed to apply slow-motion effect. Please try again.");
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


