import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeAudioPage } from './change-audio.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeAudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeAudioPageRoutingModule {}
