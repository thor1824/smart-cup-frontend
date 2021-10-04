import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public readonly deviceKey = "deviceId";
  private deviceId = "";

  constructor() {
    const deviceId = localStorage.getItem(this.deviceKey);
    if(deviceId) {
      this.deviceId = deviceId;
    }
  }

  get DeviceId(): string {
    return this.deviceId
  }

  set DeviceId(deviceId: string) {
    localStorage.setItem(this.deviceKey, deviceId)
    this.deviceId = deviceId
  }

}
