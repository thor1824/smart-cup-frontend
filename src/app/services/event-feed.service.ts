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
  events$ = new BehaviorSubject<BaseEvent[]>([]);
  newestEvents$ = new BehaviorSubject<BaseEvent>(undefined as unknown as BaseEvent);

  metricsApi = `${environment.apiUrl}/metrics/:id`;
  constructor(private socket: Socket, private client: HttpClient) {

  }

  public GetEventFeed(id: string): Observable<BaseEvent[]> {
    this.client.get<BaseEvent[]>(`${this.metricsApi.replace(':id', id)}/all`).pipe(map(x => {
      x.forEach(y => y.timestamp = new Date(y.timestamp))
      return x;
    })).subscribe(evnts => {
      evnts = evnts.sort((a,b) =>
        b.timestamp.valueOf() - a.timestamp.valueOf()
      )
      console.log(evnts);
      this.events$.next(evnts);
      this.socket.fromEvent<BaseEvent>(`${id}/coffee-event`).pipe(map(x => {
        return {
          ...x,
          timestamp: new Date(x.timestamp)
        }

      })).subscribe(evnt =>
      {
        let temp = this.events$.value;
        temp.push(evnt);
        temp = temp.sort((a,b) =>
          b.timestamp.valueOf() - a.timestamp.valueOf()
        )
        this.newestEvents$.next(evnt);
        this.events$.next(temp);
      });
    });
    return this.events$;
  }


}
