import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoToMp3PageRoutingModule } from './video-to-mp3-routing.module';

import { VideoToMp3Page } from './video-to-mp3.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoToMp3PageRoutingModule,
    SharedModule
  ],
  declarations: [VideoToMp3Page]
})
export class VideoToMp3PageModule {}
