import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DeviceService} from "./device.service";
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TempService {
  tempApi = `${environment.apiUrl}/temperature`

  tempOfPeriod = new BehaviorSubject<TempReading[]>([]);
  newestTemp = new ReplaySubject<TempReading>(1);
  tempOfPeriod$ = this.tempOfPeriod.asObservable();
  newestTemp$ = this.newestTemp.asObservable();

  constructor(
    private http: HttpClient,
    private deviceService: DeviceService,
    private socket: Socket
  ) { }


  getNewestTemp(): Observable<TempReading> {

    return this.newestTemp$;
  }


  getThisMonthTemp(): Observable<TempReading[]> {
    const end = new Date();
    const start = new Date(end.valueOf() - 2592000000); // -30 days
    this.http.get<TempReading[]>(`${this.tempApi}/${this.deviceService.DeviceId}`, {
      params: {
        from: '' + start,
        to: '' + end
      }
    }).subscribe(response => {
      console.log(response)

      if(!response || response.length <= 0) {
        return;
      }

      for (const tempReading of response) {
        tempReading.timestamp = new Date(tempReading.timestamp);
      }
      const sorted = response.sort((a, b) => b.timestamp.valueOf() - a.timestamp.valueOf())
      this.tempOfPeriod.next(sorted);
      this.newestTemp.next(sorted[0]);
    })
    this.socket.fromEvent<TempReading>(`${this.deviceService.DeviceId}/temp-new`).subscribe((tempReading) => {
      tempReading.timestamp = new Date(tempReading.timestamp);
      const readings = this.tempOfPeriod.value;
      readings.push(tempReading);
      this.newestTemp.next(tempReading);
      this.tempOfPeriod.next(readings.sort((a, b) => b.timestamp.valueOf() - a.timestamp.valueOf()));
    });
    return this.tempOfPeriod$;
  }
}

export interface TempReading {
  value: number;
  measurementType: MeasurementType;
  timestamp: Date;
  iot_id: string;
  sensor_id: string;
}

export enum MeasurementType {
  Celcius = "C",
  Fahrenheit = "F",
  Kelvin = "K"
}
