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

@NgModule({
  declarations: [
    PrivateComponent,
    DashboardComponent,
    SettingsComponent,
    TempGraphComponent,
    NavBarComponent
  ],
  imports: [
    PrivateRoutingModule,
    IonicModule,
    FontAwesomeModule,
    CommonModule
  ]
})
export class PrivateModule {

  constructor() {
  }
}
