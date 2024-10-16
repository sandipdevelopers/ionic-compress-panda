import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OnboardingGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/onbording/onbording.module').then(m => m.OnbordingPageModule)
  },
  {
    path: 'home',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'video-list',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/video-list/video-list.module').then(m => m.VideoListPageModule)
  },
  {
    path: 'settings',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'video-compress',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/video-compress/video-compress.module').then(m => m.VideoCompressPageModule)
  },
  {
    path: 'trim-video',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/trim-video/trim-video.module').then(m => m.TrimVideoPageModule)
  },
  {
    path: 'change-audio',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/change-audio/change-audio.module').then(m => m.ChangeAudioPageModule)
  },
  {
    path: 'split-video',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/split-video/split-video.module').then(m => m.SplitVideoPageModule)
  },
  {
    path: 'slow-motion',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/slow-motion/slow-motion.module').then(m => m.SlowMotionPageModule)
  },
  {
    path: 'video-to-mp3',
    canActivate: [OnboardingGuard],
    loadChildren: () => import('./pages/video-to-mp3/video-to-mp3.module').then(m => m.VideoToMp3PageModule)
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
