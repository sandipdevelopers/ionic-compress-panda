import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCompressPage } from './video-compress.page';

const routes: Routes = [
  {
    path: '',
    component: VideoCompressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCompressPageRoutingModule {}
