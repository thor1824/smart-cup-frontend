import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {EventTypeENUM, Metrics, TimePeriodENUM} from "../private/metric-feed/models/Metrics";

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  api = environment.apiUrl + '/metrics'
  constructor(private client: HttpClient) { }

  public GetMetrics(deviceId: string) : Observable<Metrics> {
    return this.client.get<Metrics>(`${this.api}/${deviceId}`);
  }
}
