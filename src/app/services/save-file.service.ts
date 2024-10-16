import { Injectable } from '@angular/core';
import { File, Entry } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class SaveFileService {

  allFolder: Entry[] =[]
  constructor(
    private file: File
  ) { }

  createFolder() {

    //  Main  folder 
    this.file.checkDir(this.file.dataDirectory, 'compresser').then((resp) => {
      console.log("resp:: 1 ", JSON.stringify(resp));
    }).catch((error: any) => {
      this.file.createDir(this.file.dataDirectory, 'compresser', true).then((resp) => {
          this.file.checkDir(`${this.file.dataDirectory}compresser`, 'compress-video').then((resp) => {
      console.log("resp:: 1 compress-video", JSON.stringify(resp));
    }).catch((error: any) => {
      console.log("error:: 1 compress-video", JSON.stringify(error));
      this.file.createDir(`${this.file.dataDirectory}compresser`, 'compress-video', true).then((resp) => {
        console.log("resp:: 2 compress-video", JSON.stringify(resp));
      }).catch((error: any) => {
        console.log("error:: 2 compress-video", JSON.stringify(error));
      });
    });


    this.file.checkDir(`${this.file.dataDirectory}compresser`, 'trim-video').then((resp) => {
      console.log("resp:: 1 trim-video", JSON.stringify(resp));
    }).catch((error: any) => {
      console.log("error:: 1 trim-video", JSON.stringify(error));
      this.file.createDir(`${this.file.dataDirectory}compresser`, 'trim-video', true).then((resp) => {
        console.log("resp:: 2 trim-video", JSON.stringify(resp));
      }).catch((error: any) => {
        console.log("error:: 2 trim-video", JSON.stringify(error));
      });
    });



    this.file.checkDir(`${this.file.dataDirectory}compresser`, 'video-to-mp3').then((resp) => {
      console.log("resp:: 1 video-to-mp3", JSON.stringify(resp));
    }).catch((error: any) => {
      console.log("error:: 1 video-to-mp3", JSON.stringify(error));
      this.file.createDir(`${this.file.dataDirectory}compresser`, 'video-to-mp3', true).then((resp) => {
        console.log("resp:: 2 video-to-mp3", JSON.stringify(resp));
      }).catch((error: any) => {
        console.log("error:: 2 video-to-mp3", JSON.stringify(error));
      });
    });

    this.file.checkDir(`${this.file.dataDirectory}compresser`, 'change-audio').then((resp) => {
      console.log("resp:: 1 change-audio", JSON.stringify(resp));
    }).catch((error: any) => {
      console.log("error:: 1 change-audio", JSON.stringify(error));
      this.file.createDir(`${this.file.dataDirectory}compresser`, 'change-audio', true).then((resp) => {
        console.log("resp:: 2 change-audio", JSON.stringify(resp));
      }).catch((error: any) => {
        console.log("error:: 2 change-audio", JSON.stringify(error));
      });
    });


    this.file.checkDir(`${this.file.dataDirectory}compresser`, 'split-video').then((resp) => {
      console.log("resp:: 1 split-video", JSON.stringify(resp));
    }).catch((error: any) => {
      console.log("error:: 1 split-video", JSON.stringify(error));
      this.file.createDir(`${this.file.dataDirectory}compresser`, 'split-video', true).then((resp) => {
        console.log("resp:: 2 split-video", JSON.stringify(resp));
      }).catch((error: any) => {
        console.log("error:: 2 split-video", JSON.stringify(error));
      });
    });


    this.file.checkDir(`${this.file.dataDirectory}compresser`, 'slow-motion').then((resp) => {
      console.log("resp:: 1 slow-motion", JSON.stringify(resp));
    }).catch((error: any) => {
      console.log("error:: 1 slow-motion", JSON.stringify(error));
      this.file.createDir(`${this.file.dataDirectory}compresser`, 'slow-motion', true).then((resp) => {
        console.log("resp:: 2 slow-motion", JSON.stringify(resp));
      }).catch((error: any) => {
        console.log("error:: 2 slow-motion", JSON.stringify(error));
      });
    });

      }).catch((error: any) => {
      });
    });

    // child folder 

  
  }

  getAllFolder() {

    this.file.listDir(this.file.dataDirectory, 'compresser').then((resp: Entry[]) => {
      if (resp.length) {
        this.allFolder = resp.sort((a, b) => a.name.localeCompare(b.name));;
        console.log(":::::::::::::::::::::", JSON.stringify(this.allFolder))
      }
    }).catch((error) => {

    })
  }
}



