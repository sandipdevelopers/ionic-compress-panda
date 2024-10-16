import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoListPageRoutingModule } from './video-list-routing.module';

import { VideoListPage } from './video-list.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    VideoListPageRoutingModule,
    SharedModule
  ],
  declarations: [VideoListPage]
})
export class VideoListPageModule {}
