import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnbordingPageRoutingModule } from './onbording-routing.module';

import { OnbordingPage } from './onbording.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnbordingPageRoutingModule,
    SharedModule
  ],
  declarations: [OnbordingPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class OnbordingPageModule {}
