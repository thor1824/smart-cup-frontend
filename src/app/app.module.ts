import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicModule} from '@ionic/angular';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings.component";
import {TempGraphComponent} from "./temp-graph/temp-graph.component";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DeviceGuard} from "./guard/deviceGuard";
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {environment} from "../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
const config: SocketIoConfig = {url: environment.socketUrl, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SettingsComponent,
    TempGraphComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule ,
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
    HttpClientModule
  ],
  providers: [DeviceGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
