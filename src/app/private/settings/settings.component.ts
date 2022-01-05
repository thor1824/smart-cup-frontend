import {Component, OnInit} from '@angular/core';
import {SettingsPutBody} from "./models/SettingsPutBody";
import {SettingsService} from "../../services/settings.service";
import {DeviceService} from "../../services/device.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public interval = 5;
  public intervalString = this.interval + ' seconds';
  private deviceId: string = "";

  constructor(private settingsService: SettingsService, private deviceService: DeviceService) {
    this.interval = settingsService.interval;
    this.intervalString = this.interval + ' seconds';
  }

  ngOnInit(): void {
    this.deviceService.selectedDeviceId$.subscribe(x => {
      this.deviceId = x;
    })
    //this.SetIntervalAtStart();
  }

  public OnIonChange(event: any) {
    this.SetCurrentInterval(event.detail.value);
  }

  private SetIntervalAtStart() {
  }

  private SetCurrentInterval(interval: number) {
    if (interval === 0) {
      return;
    }
    this.intervalString = interval + ' seconds';

    const setting = <SettingsPutBody>({
      iotDeviceId: this.deviceService.SelectedDeviceId,
      interval: interval * 1000,
      prefMinTemp: 10
    });
    console.log(interval);
    this.settingsService.UpdateSettings(setting).subscribe();
  }


}
