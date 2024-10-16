import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrimVideoPage } from './trim-video.page';

const routes: Routes = [
  {
    path: '',
    component: TrimVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrimVideoPageRoutingModule {}
