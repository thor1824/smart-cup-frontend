import {NgModule} from '@angular/core';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {TempGraphComponent} from "./temp-graph/temp-graph.component";
import {PrivateComponent} from "./private.component";
import {PrivateRoutingModule} from "./private-routing.module";
import {IonicModule} from "@ionic/angular";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {EventFeedComponent} from './event-feed/event-feed.component';
import {DeviceSwitcherComponent} from "./device-switcher/device-switcher.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
  declarations: [
    PrivateComponent,
    DashboardComponent,
    SettingsComponent,
    TempGraphComponent,
    NavBarComponent,
    EventFeedComponent,
    DeviceSwitcherComponent
  ],
  imports: [
    PrivateRoutingModule,
    IonicModule,
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PrivateModule {

  constructor() {
  }
}
