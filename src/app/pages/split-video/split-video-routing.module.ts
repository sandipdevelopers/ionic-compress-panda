import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitVideoPage } from './split-video.page';

const routes: Routes = [
  {
    path: '',
    component: SplitVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitVideoPageRoutingModule {}
