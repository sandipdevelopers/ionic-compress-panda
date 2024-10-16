import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

declare let admob: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAdsService {

  private appOpenAdInstance: any;
  private interstitialAdInstance: any;

  constructor(private platform: Platform) {
    this.initializeAdService();
  }

  private async initializeAdService() {
    this.platform.ready().then(async () => {
      await admob.requestTrackingAuthorization();
      this.initializeBannerAd();
      this.initializeAppOpenAd(true);
      this.initializeInterstitialAd();

      this.platform.resume.subscribe(async () => {
        await this.displayAppOpenAd();
      });

      document.addEventListener('admob.interstitial.dismiss', async () => {
        this.loadInterstitialAd();
      });

      document.addEventListener('admob.ad.dismiss', async (event: any) => {
        if (event.ad instanceof admob.AppOpenAd) {
          this.loadAppOpenAd(false);
        }
      });
    });
  }

  private async initializeBannerAd() {
    const bannerAd = new admob.BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/6300978111', // test ad unit ID
      position: 'bottom',
      // offset: 0
    });
    await bannerAd.show();
  }

  private async initializeAppOpenAd(showImmediately: boolean) {
    this.appOpenAdInstance = new admob.AppOpenAd({
      adUnitId: 'ca-app-pub-3940256099942544/3419835294', // test ad unit ID
    });
    await this.loadAppOpenAd(showImmediately);
  }

  private async initializeInterstitialAd() {
    this.interstitialAdInstance = new admob.InterstitialAd({
      adUnitId: 'ca-app-pub-3940256099942544/1033173712', // test ad unit ID
    });
    await this.loadInterstitialAd();
  }

  private async loadInterstitialAd() {
    await this.interstitialAdInstance.load();
  }

  private async loadAppOpenAd(showImmediately: boolean) {
    const isAdAvailable = await this.appOpenAdInstance.show();
    if (!isAdAvailable) {
      await this.appOpenAdInstance.load();
      if (showImmediately) {
        await this.displayAppOpenAd();
      }
    }
  }

  private async displayAppOpenAd() {
    await this.appOpenAdInstance.show();
  }

  public async displayFullScreenAd() {
    try {
      await this.interstitialAdInstance.show();
    } catch (error) {
      console.error('Error displaying full screen ad:', error);
    }
  }

  public triggerAdRandomly() {
    const adTriggerPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16];
    const randomTrigger = adTriggerPoints[Math.floor(Math.random() * adTriggerPoints.length)];

    if ([1, 4, 8, 12 , 16].includes(randomTrigger)) {
      this.displayFullScreenAd();
    }
  }
}
