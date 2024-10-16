import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import {  LoadingController, ModalController } from '@ionic/angular';
import { SaveFileModalComponent } from 'src/app/component/save-file-modal/save-file-modal.component';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';

@Component({
  selector: 'app-split-video',
  templateUrl: './split-video.page.html',
  styleUrls: ['./split-video.page.scss'],
})
export class SplitVideoPage implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: any;

  isPlaying: boolean = false;
  isMuted: boolean = true;
  isFullScreen: boolean = false;
  videoUrl: string = '';
  loading: any;
  isSpinner: boolean = false;
  seletedDuration: any = 30;
  duration: any;
  splitOptions = [
    { label: '15 seconds', value: 15 },
    { label: '20 seconds', value: 20 },
    { label: '30 seconds', value: 30 },
    { label: '40 seconds', value: 40 },
    { label: '50 seconds', value: 50 },
    { label: '1 minute', value: 60 }
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
    // videoElement.src = this.gs.seletedVideo;
    videoElement.muted = this.isMuted;
    videoElement.load();
    videoElement.play().catch((error: any) => {
      console.error('Error attempting to play:', JSON.stringify(error));
    });
    this.isPlaying = true;
    videoElement.addEventListener('loadedmetadata', (event: any) => {
      this.duration = event.srcElement.duration;
    });

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
    if (this.duration < this.seletedDuration) {
      this.gs.presentToast("The selected segment duration is longer than the total video duration. No splitting is required.");
      return;  // Return early if no splitting is needed
    }

    let defaultFileName = 'split-' + Math.floor(1000 + Math.random() * 9000);
    let defaultfolderName = 'split-video';
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
        this.showLoading().then(async () => {
          const { folder, fileName } = result.data;
          let saveFilePath = `${this.file.dataDirectory}compresser/${folder}/${fileName}'_%03d.mp4'`;
          let exec = "-i " + this.gs.seletedVideo + " -ss 00:00:01 -c copy -f segment -segment_time " + this.seletedDuration + " -reset_timestamps 1 " + saveFilePath;
  
          (<any>window).ffmpeg.exec(exec,
            (success: any) => {
              this.gs.presentToast("All video segments have been processed successfully!");
              this.loddingDismiss();
              this.gs.goToVideoList(folder)
            },
            (failure: any) => {
              this.gs.presentToast('Error saving video. Please try again.');
              console.error('ffmpeg failure:', JSON.stringify(failure)); // Log the failure
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
