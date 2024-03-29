import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PrivateComponent} from './private.component';
import {TempGraphComponent} from "./temp-graph/temp-graph.component";
import {DeviceGuard} from "./guard/deviceGuard";
import {SettingsComponent} from "./settings/settings.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventFeedComponent} from "./event-feed/event-feed.component";
import {MetricFeedComponent} from "../private/metric-feed/metric-feed.component";

const routes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    children: [
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
        path: 'event-feed',
        component: EventFeedComponent,
        canActivate: [DeviceGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'metric-feed',
        component: MetricFeedComponent,
        canActivate: [DeviceGuard]
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}
