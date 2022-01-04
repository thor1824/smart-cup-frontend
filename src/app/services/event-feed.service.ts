import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {BaseEvent, SettingsChangedEvent, SipEvent} from '../private/event-feed/models/BaseEvent';

@Injectable({
  providedIn: 'root'
})
export class EventFeedService {
  api = environment.apiUrl + '/event-feed'

  constructor(private client: HttpClient) {
  }

  public GetEventFeed(id: string): Observable<BaseEvent[]> {
    const s = 1640868813887;
    const newContent: BaseEvent[] = [
      {
        id: "1",
        timestamp: new Date(s + 1),
        sipVolume: "10",
        code: "a"
      } as SipEvent,
      {
        id: "2",
        timestamp: new Date(s + 2),
        code: "b"
      } as SettingsChangedEvent,
      {
        id: "2",
        timestamp: new Date(s + 4),
        code: "c"
      } as SettingsChangedEvent,
      {
        id: "2",
        timestamp: new Date(s + 5),
        code: "e"
      } as SettingsChangedEvent,
      {
        id: "2",
        timestamp: new Date(s + 6),
        code: "f"
      } as SettingsChangedEvent,
    ];
    return of(newContent);


    // return this.client.get<BaseEvent[]>(`${this.api}/${id}`);
  }

<<<<<<< HEAD

=======
  getFilled(deviceId: string): Observable<any> {
    return this.client.get(`${this.metricsApi.replace(':id', deviceId)}/filled`, {params:{
        rng: "0"
      }});
  }

  getSipped(deviceId: string): Observable<any> {
    return this.client.get(`${this.metricsApi.replace(':id', deviceId)}/Sipped`, {params:{
        rng: "0"
      }});
  }

  getIntake(deviceId: string): Observable<any> {
    return this.client.get(`${this.metricsApi.replace(':id', deviceId)}/intake`, {params:{
        rng: "0"
      }});
  }
>>>>>>> c16aa338296cf016ac75a7c17b1f5e4e17c0cb0f
}
