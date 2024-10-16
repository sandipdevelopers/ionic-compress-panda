import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnbordingPage } from './onbording.page';

const routes: Routes = [
  {
    path: '',
    component: OnbordingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnbordingPageRoutingModule {}
