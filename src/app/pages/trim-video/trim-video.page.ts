import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AnimationKeyFrames, LoadingController, ModalController } from '@ionic/angular';
import { SaveFileModalComponent } from 'src/app/component/save-file-modal/save-file-modal.component';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';

@Component({
  selector: 'app-trim-video',
  templateUrl: './trim-video.page.html',
  styleUrls: ['./trim-video.page.scss'],
})
export class TrimVideoPage implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: any;

  isPlaying: boolean = false;
  isMuted: boolean = true;
  isFullScreen: boolean = false;

  duration: number = 0;
  seletedDuration = {
    lower: 0, upper: 0
  }
  loading: any;
  constructor(
    public gs: GlobalService,
    public saveFile: SaveFileService,
    public cdr: ChangeDetectorRef,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public file: File
  ) {
    this.pinFormatter = this.pinFormatter.bind(this);
  }

  ngOnInit() {

  }

  onFullscreenChange() {
    this.isFullScreen = !!document.fullscreenElement || !!(document as any).webkitFullscreenElement || !!(document as any).msFullscreenElement;
    this.cdr.detectChanges();
  }

  ionViewDidEnter() {
    this.setVideoUrl();

    document.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('msfullscreenchange', this.onFullscreenChange.bind(this));
  }

  async setVideoUrl() {
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.src = (<any>window).Ionic.WebView.convertFileSrc(this.gs.seletedVideo);
    // videoElement.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    videoElement.load();
    videoElement.muted = this.isMuted;
    videoElement.play().catch((error: AnimationKeyFrames) => {
      console.error('Error attempting to play:', error);
    });
    videoElement.addEventListener('loadedmetadata', (event: any) => {
      this.duration = event.srcElement.duration;
      this.seletedDuration.upper = this.duration
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

    videoElement.muted = !videoElement.muted;
    this.isMuted = videoElement.muted;
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
    let defaultFileName = 'TrimVideo-' + Math.floor(1000 + Math.random() * 9000);
    let defaultfolderName = 'trim-video';
    console.log(this.seletedDuration);

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
          let cmd = "-ss " + this.seletedDuration.lower + " -t " + this.seletedDuration.upper + " -i " + this.gs.seletedVideo + " -r 5 -c:v libx264 -b:v 600k -b:a 44100 -ac 2 -ar 22050 -tune fastdecode -preset ultrafast " + saveFilePath;
          (<any>window).ffmpeg.exec(cmd, (success: any) => {
            console.log("success:::::",JSON.stringify(success));
            
            this.gs.presentToast("Video trimming successful! Your file has been saved.");
            this.loddingDismiss();
            this.gs.goToVideoList(folder);
          },
            (failure: any) => {
              this.gs.presentToast("Video trimming failed. Please try again.");
              this.loddingDismiss();
            }
          );
        });

        // command = "-ss "+this.sliderVal.lower+" -t "+this.sliderVal.upper+" -i "+ this.orgVideoURL +" -r 5 -c:v libx264 -b:v 600k -b:a 44100 -ac 2 -ar 22050 -tune fastdecode -preset ultrafast "+outputPath;
      }
    });

    return await modal.present();
  }

  pinFormatter(value: number) {
    if (!value) return "0";
    try {

      const hours = Math.floor(value / 3600);
      const minutes = Math.floor((value % 3600) / 60);
      const seconds = Math.floor(value % 60);

      if (hours > 0) {
        return this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(seconds);
      } else if (minutes > 0) {
        return this.pad(minutes) + ":" + this.pad(seconds);
      } else {
        return this.pad(seconds) + ' Sec';
      }
    } catch (error) {
      console.error("Error formatting value:", error);
      return "0";
    }
  }
  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }


  rangeChange() {
    const video = this.videoPlayer.nativeElement;
    video.currentTime = this.seletedDuration.lower;
    video.play();
    // Automatically pause the video at the 'upper' value of the selected duration
    const upperLimit = this.seletedDuration.upper;
    video.ontimeupdate = () => {
      if (video.currentTime >= upperLimit) {
        video.pause();
      }
    };
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
