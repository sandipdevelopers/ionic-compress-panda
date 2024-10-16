import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
})
export class VideoListPage implements OnInit {
  seletedFolderName: any;
  loading: any;
  isSpinner: boolean = true;
  allData: any[] = [];
  constructor(
    public gs: GlobalService,
    public saveFile: SaveFileService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private file: File,
    private share: SocialSharing,
    private actionCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.saveFile.getAllFolder();
    this.seletedFolderName = this.route.snapshot.queryParamMap.get('seletedFolderName');
    this.readFolder(this.seletedFolderName)
  }

  async segmentChange() {
    this.readFolder(this.seletedFolderName)
  }

  readFolder(readFolder: any) {
    this.isSpinner = true;
    console.log("Entry", readFolder);
    this.showLoading().then(() => {
      try {
        this.allData = [];
        this.file.listDir(`${this.file.dataDirectory}compresser`, readFolder).then((resp: any[]) => {
          if (resp.length) {
            let count = 0;
            const readFileData = async () => {
              if (count < resp.length) {
                await this.file.resolveLocalFilesystemUrl(resp[count]['nativeURL']).then(async (fileEntry) => {
                  await fileEntry.getMetadata((fileObj: any) => {
                    resp[count]['date'] = fileObj['modificationTime'];
                    resp[count]['size'] = fileObj.size;
                    const fileNameParts = resp[count].name.split('.');

                    if (fileNameParts.length > 1) {
                      resp[count].ext = fileNameParts.pop(); 
                    } else {
                      resp[count].ext = '';
                    }
                    count += 1;
                    readFileData();
                    this.cdr.detectChanges();
                  });
                });
              } else {
                this.cdr.detectChanges();
                this.allData = resp.sort((a, b) => {
                  return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                console.log("allData", JSON.stringify(this.allData));

                this.isSpinner = false;
                this.loddingDismiss();
                this.cdr.detectChanges();
              }
            }
            readFileData();
          } else {
            this.isSpinner = false;
            this.loddingDismiss();
          }

        }).catch((error) => {
          this.isSpinner = false;
          this.loddingDismiss();
        })
      } catch (error) {
        this.isSpinner = false;
        this.loddingDismiss();
      }


    })
  }

  async clickToAction(data: any, index: any) {
    const actionSheet = await this.actionCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteVideo(data, index)
          }
        },
        {
          text: 'View',
          handler: async () => {
            try {
              const fileOpenerOptions: FileOpenerOptions = {
                filePath: data.nativeURL,
              };
              await FileOpener.open(fileOpenerOptions);
            } catch (e) {
              console.log('Error opening file', e);
            }
          }
        }, {
          text: 'Share',
          handler: () => {
            this.shareVideo(data);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
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
  }

  async sortData(array: any, key: any) {
    return array.sort((a: any, b: any) => {
      let x = a[key];
      let y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  }


  async deleteVideo(data: any, index: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${data.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Delete canceled');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            if (data.fullPath.startsWith('/')) {
              data.fullPath = data.fullPath.substring(1);
            }

            this.file.removeFile(this.file.dataDirectory, data.fullPath).then((resp: any) => {
              this.allData.splice(index, 1);
              this.gs.presentToast("Video has been deleted successfully.");
            }).catch((error) => {
              this.gs.presentToast("Video has been deleted successfully.");
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async shareVideo(data: any) {
    await this.share.share('', '', data.nativeURL, '');
  }
}
