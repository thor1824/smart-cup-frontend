import {Component, OnInit, Pipe} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SettingsPutBody} from "./models/SettingsPutBody";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {valueOrDefault} from "chart.js/helpers";
import {SettingsService} from "../services/settings.service";
import {DeviceService} from "../services/device.service";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public interval = 5;
  public intervalString = '';

  constructor(private settingsService: SettingsService, private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.SetIntervalAtStart();
  }

  public OnIonChange() {
    this.SetCurrentInterval(this.interval);
  }

  private SetIntervalAtStart() {
    this.settingsService.GetSettings(this.deviceService.DeviceId).subscribe(value => {
      this.interval = (value.configs[0].interval / 1000);
      this.intervalString = this.interval + ' seconds';
    });
  }

  private SetCurrentInterval(interval: number) {
    if(interval === 0) {
      return;
    }
    this.intervalString = interval + ' seconds';

    const setting = <SettingsPutBody>({
      interval: interval * 1000,
      iotDeviceId: this.deviceService.DeviceId
    });
    this.settingsService.UpdateSettings(setting).subscribe();
  }


}
