import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./public/login/login.component";
import {DashboardComponent} from "./private/dashboard/dashboard.component";
import {SettingsComponent} from "./private/settings/settings.component";
import {TempGraphComponent} from "./private/temp-graph/temp-graph.component";
import {DeviceGuard} from "./private/guard/deviceGuard";

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
    canActivate: [DeviceGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: '**',
    redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  bootstrap: [],
})
export class AppRoutingModule { }
