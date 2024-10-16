import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitVideoPageRoutingModule } from './split-video-routing.module';

import { SplitVideoPage } from './split-video.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitVideoPageRoutingModule,
    SharedModule
  ],
  declarations: [SplitVideoPage]
})
export class SplitVideoPageModule {}
