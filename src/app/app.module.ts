import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import {File} from "@awesome-cordova-plugins/file/ngx"
import {Camera} from "@awesome-cordova-plugins/camera/ngx"
import { TimeFormatPipe } from './pipes/time-format.pipe';
import {  SocialSharing} from "@awesome-cordova-plugins/social-sharing/ngx";
import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,SharedModule,HttpClientModule],
  providers: [File,Camera,SocialSharing,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },TimeFormatPipe],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
