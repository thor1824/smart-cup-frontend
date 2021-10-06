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

  public OnIonChange(event: any) {
    this.SetCurrentInterval(event.detail.value);
  }

  private SetIntervalAtStart() {
    this.settingsService.GetSettings(this.deviceService.DeviceId).subscribe(value => {
      console.log(value)
      this.sensorId = value.configs[0].SensorId;
      this.interval = (value.configs[0].Interval / 1000);
      this.intervalString = this.interval + ' seconds';
    });
  }

  private SetCurrentInterval(interval: number) {
    if (interval === 0 || !this.sensorId) {
      return;
    }
    this.intervalString = interval + ' seconds';

    const setting = <SettingsPutBody>({
      iotDeviceId: this.deviceService.DeviceId,
      sensorConfigs: [{
        SensorId: this.sensorId,
        Interval: interval * 1000,
      }]
    });
    this.settingsService.UpdateSettings(setting).subscribe();
  }


}
