import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoCompressPageRoutingModule } from './video-compress-routing.module';

import { VideoCompressPage } from './video-compress.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoCompressPageRoutingModule,
    SharedModule
  ],
  declarations: [VideoCompressPage]
})
export class VideoCompressPageModule {}
