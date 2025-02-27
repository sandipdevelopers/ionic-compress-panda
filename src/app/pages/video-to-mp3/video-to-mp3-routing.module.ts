import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoToMp3Page } from './video-to-mp3.page';

const routes: Routes = [
  {
    path: '',
    component: VideoToMp3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoToMp3PageRoutingModule {}
