import {Component, OnInit} from '@angular/core';
import {SettingsPutBody} from "./models/SettingsPutBody";
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
  private sensorId: string = "";

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
      this.sensorId = value.configs[0].sensorId;
      this.interval = (value.configs[0].interval / 1000);
      this.intervalString = this.interval + ' seconds';
    });
  }

  private SetCurrentInterval(interval: number) {
    if (interval === 0) {
      return;
    }
    this.intervalString = interval + ' seconds';

    const setting = <SettingsPutBody>({
      iotDeviceId: this.deviceService.DeviceId,
      sensorConfigs: [{
        sensorId: this.sensorId,
        interval: interval * 1000,
      }]
    });
    this.settingsService.UpdateSettings(setting).subscribe();
  }


}
