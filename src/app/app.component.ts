import { Component } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { GlobalService } from './services/global.service';
import { SaveFileService } from './services/save-file.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  networkAlert: any;
  updateAlert: any;
  constructor(
    public gs: GlobalService,
    public saveFile: SaveFileService,
    public modalController: ModalController,
    private plateform: Platform,
    public alertController: AlertController,
  ) {
    this.plateform.ready().then(async () => {
     
      await this.saveFile.createFolder();
      await this.saveFile.getAllFolder();
      
    });


  }
}

