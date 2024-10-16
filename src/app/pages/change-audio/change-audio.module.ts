import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeAudioPageRoutingModule } from './change-audio-routing.module';

import { ChangeAudioPage } from './change-audio.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeAudioPageRoutingModule,SharedModule
  ],
  declarations: [ChangeAudioPage]
})
export class ChangeAudioPageModule {}
