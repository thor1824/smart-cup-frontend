import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {BaseEvent, SettingsChangedEvent, SipEvent} from '../private/event-feed/models/BaseEvent';
import {Socket} from "ngx-socket-io";
import {map, tap} from "rxjs/operators";
import {TempReading} from "./temp.service";

@Injectable({
  providedIn: 'root'
})
export class EventFeedService {
  api = environment.apiUrl + '/event-feed'
  s = 1640868813887;
  events$ = new BehaviorSubject<BaseEvent[]>([
    {
      id: "1",
      timestamp: new Date(this.s + 1),
      sipVolume: "10",
      code: "a"
    } as SipEvent
  ]);

  metricsApi = `${environment.apiUrl}/metrics/:id`;
  constructor(private socket: Socket, private client: HttpClient) {

  }

  public GetEventFeed(id: string): Observable<BaseEvent[]> {
    this.client.get<BaseEvent[]>(`${this.metricsApi.replace(':id', id)}/all`).subscribe(evnts => {
      this.events$.next(evnts);
      this.socket.fromEvent<BaseEvent>(`${id}/coffee-event`).subscribe(evnt =>
      {
        console.log("tab",evnt);
        const temp = this.events$.value;
        temp.push(evnt);
        this.events$.next(temp);
      });
    });
    return this.events$;
  }


}
