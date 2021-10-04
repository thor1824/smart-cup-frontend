import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings.component";
import {TempGraphComponent} from "./temp-graph/temp-graph.component";
import {DeviceGuard} from "./guard/deviceGuard";

const routes: Routes = [
  {
    path: 'temp-graph',
    component: TempGraphComponent,
    canActivate: [DeviceGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [DeviceGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [DeviceGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  bootstrap: [],
})
export class AppRoutingModule { }
