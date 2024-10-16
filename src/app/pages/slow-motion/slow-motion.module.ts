import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlowMotionPageRoutingModule } from './slow-motion-routing.module';

import { SlowMotionPage } from './slow-motion.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SlowMotionPageRoutingModule
  ],
  declarations: [SlowMotionPage]
})
export class SlowMotionPageModule {}
