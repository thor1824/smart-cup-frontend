import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {EventTypeENUM, Metrics, TimePeriodENUM} from "../private/metric-feed/models/Metrics";

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  metricsApi = `${environment.apiUrl}/metrics/:id`;
  constructor(private client: HttpClient) { }

  getFilled(deviceId: string): Observable<any> {
    return this.client.get(`${this.metricsApi.replace(':id', deviceId)}/filled`);
  }

  getSipped(deviceId: string): Observable<any> {
    return this.client.get(`${this.metricsApi.replace(':id', deviceId)}/Sipped`);
  }

  getIntake(deviceId: string): Observable<any> {
    return this.client.get(`${this.metricsApi.replace(':id', deviceId)}/intake`);
  }
}
