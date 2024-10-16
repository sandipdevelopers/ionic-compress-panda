import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrimVideoPageRoutingModule } from './trim-video-routing.module';

import { TrimVideoPage } from './trim-video.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrimVideoPageRoutingModule,
    SharedModule
  ],
  declarations: [TrimVideoPage]
})
export class TrimVideoPageModule {}
