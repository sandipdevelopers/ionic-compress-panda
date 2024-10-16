import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SlowMotionPage } from './slow-motion.page';

const routes: Routes = [
  {
    path: '',
    component: SlowMotionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlowMotionPageRoutingModule {}
