import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { SaveFileService } from 'src/app/services/save-file.service';

@Component({
  selector: 'app-save-file-modal',
  templateUrl: './save-file-modal.component.html',
  styleUrls: ['./save-file-modal.component.scss'],
})
export class SaveFileModalComponent implements OnInit {

  fileName: string = '';
  folderName: string = '';

  @Input() defaultFileName: any = '';
  @Input() defaultfolderName: any = '';
  constructor(
    private modalController: ModalController,
    public gs: GlobalService,
    public saveFile: SaveFileService,
  ) { }

  ngOnInit() {
    this.fileName = this.defaultFileName || '';
    this.folderName = this.defaultfolderName || this.saveFile.allFolder[0].name;
  }

  dismiss() {
    this.gs.presentToast('File save was canceled, Try again');
    this.modalController.dismiss();
  }

  saveToFolder() {
    const formattedFileName = this.fileName.replace(/\s+/g, '_').replace(/\.[^/.]+$/, '');
    const result = { folder: this.folderName || this.defaultfolderName, fileName: formattedFileName || this.defaultFileName };
    this.dismissWithResult(result);
  }
  dismissWithResult(result: { folder: string; fileName: string }) {
    this.modalController.dismiss(result);
  }

}
