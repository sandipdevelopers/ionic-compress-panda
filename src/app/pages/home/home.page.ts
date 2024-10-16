import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  seletedFolderName: any;
  constructor(
    public gs: GlobalService,
    public saveFile: SaveFileService,
    public modalController: ModalController,
    private plateform: Platform
  ) { }

  ngOnInit(): void {
    this.plateform.ready().then(async () => {
       await this.saveFile.getAllFolder();
      setTimeout(() => {
        this.seletedFolderName = this.saveFile.allFolder[0].name
      }, 700);
    })
  }
  ionViewDidEnter() {
 
  }
  segmentChange() {
   this.gs.goToVideoList(this.seletedFolderName)
  }


}
