import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativeMarket } from "@capacitor-community/native-market";
import { ToastController } from '@ionic/angular';
import { Camera } from "@awesome-cordova-plugins/camera/ngx"
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  app_vesion: any = '1.0';
  seletedVideo: string = "https://videos.pexels.com/video-files/5492238/5492238-hd_1080_1920_30fps.mp4";
  constructor(
    public router: Router,
    public camera: Camera,
    private toastController: ToastController,
    private share: SocialSharing,
    private http :HttpClient 

  ) { }

 
  async presentToast(message: string,) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: 'light'
    });
    toast.present();
  }

  shareApp() {
    const message = 'Check out this awesome video!';
    const subject = 'Video Compression App';
    const url = 'https://apps.apple.com/app/idXXXXXX';

    this.share.share(message, subject, '', url).then(() => {
      // Success!
      console.log('Sharing successful');
    }).catch((error) => {
      // Error!
      console.error('Error in sharing:', error);
    });
  }

  rateApp() {
    let appId = "idXXXXXX";
    NativeMarket.openStoreListing({
      appId: appId,
    }).then(() => []).catch((error) => {
      console.log('Rate US  not  working on Web.');
    });
  }


  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToVideoList(seletedFolderName: any) {
    const queryParams = {
      seletedFolderName: seletedFolderName,
    };
    this.router.navigate(['/video-list'], { queryParams });
  }

  goToVideoCompress() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }).then((resp: any) => {
      if (resp) {
        this.seletedVideo = resp;
        this.router.navigate(['/video-compress']);
      } else {
        this.presentToast('No video selected. Please try again.');
      }
    }).catch((error: any) => {
      this.presentToast('An error occurred while selecting the video. Please try again.');
    });
  }

  goToTrimVideo() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }).then((resp: any) => {
      if (resp) {
        this.seletedVideo = resp;
        this.router.navigate(['/trim-video']);
      } else {
        this.presentToast('No video selected. Please try again.');
      }
    }).catch((error: any) => {
      this.presentToast('An error occurred while selecting the video. Please try again.');
    });

  }

  goToVideoToMp3() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }).then((resp: any) => {
      if (resp) {
        this.seletedVideo = resp;
        this.router.navigate(['/video-to-mp3']);
      } else {
        this.presentToast('No video selected. Please try again.');
      }
    }).catch((error: any) => {
      this.presentToast('An error occurred while selecting the video. Please try again.');
    });

  }

  goToChangeAudio() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }).then((resp: any) => {
      if (resp) {
        this.seletedVideo = resp;
        this.router.navigate(['/change-audio']);
      } else {
        this.presentToast('No video selected. Please try again.');
      }
    }).catch((error: any) => {
      this.presentToast('An error occurred while selecting the video. Please try again.');
    });

  }

  goToSplitVideo() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }).then((resp: any) => {
      if (resp) {
        this.seletedVideo = resp;
        this.router.navigate(['/split-video']);
      } else {
        this.presentToast('No video selected. Please try again.');
      }
    }).catch((error: any) => {
      this.presentToast('An error occurred while selecting the video. Please try again.');
    });

  }

  goToSlowMotion() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }).then((resp: any) => {
      if (resp) {
        this.seletedVideo = resp;
        this.router.navigate(['/slow-motion']);
      } else {
        this.presentToast('No video selected. Please try again.');
      }
    }).catch((error: any) => {
      this.presentToast('An error occurred while selecting the video. Please try again.');
    });

  }

  uploadVideo() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.VIDEO
    }).then((resp: any) => {
      this.seletedVideo = resp;
    });
  }

}
