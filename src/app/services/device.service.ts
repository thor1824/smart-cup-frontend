import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Device} from "./auth.service";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  public readonly selectedDeviceKey = "selectedDeviceKey";
  public devices$ = new BehaviorSubject<Device[]>([]);
  public selectedDeviceId$ = new BehaviorSubject("");
  api = environment.apiUrl + '/device'

  constructor(private client: HttpClient) {
    const deviceId = localStorage.getItem(this.selectedDeviceKey);
    if (deviceId) {
      this.selectedDeviceId$.next(deviceId);
    }
  }

  get SelectedDeviceId(): string {
    return this.selectedDeviceId$.value;
  }

  set SelectedDeviceId(deviceId: string) {
    localStorage.setItem(this.selectedDeviceKey, deviceId)
    this.selectedDeviceId$.next(deviceId);
  }

  set Devices(devices: Device[]) {
    if(devices.length > 0) {
      if(this.SelectedDeviceId.length === 0) {
        this.SelectedDeviceId = devices[0].deviceCode;
      }
    }
    this.devices$.next(devices);
  }

  get Devices(): Device[] {

    return this.devices$.value;
  }

  public RegisterDevice(registerDeviceDto: RegisterDeviceDto) {
    return this.client.post<Device>(this.api, registerDeviceDto).pipe(tap(x => {
      const d = this.devices$.value;
      d.push(x);
      this.devices$.next(d);
    }));
  }

  public RemoveDevice(deviceId: string) {
    return this.client.delete(this.api + '/' + deviceId);
  }
}

export interface RegisterDeviceDto {
  userId: string;
  deviceCode: string;
  name: string;
}


