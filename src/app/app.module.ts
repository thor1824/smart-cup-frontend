import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from '@ionic/angular';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./public/login/login.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeviceGuard} from "./private/guard/deviceGuard";
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { DeviceSwitcherComponent } from './private/device-switcher/device-switcher.component';
import {AuthInterceptor} from "./private/interceptors/auth.interceptor";
import { MetricFeedComponent } from './private/metric-feed/metric-feed.component';

const config: SocketIoConfig = {url: environment.socketUrl, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    MetricFeedComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    IonicModule.forRoot(
      {
        mode: 'md',
        /*navAnimation: fancyAnimation*/
      }
    ),
    SocketIoModule.forRoot(config),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DeviceGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
