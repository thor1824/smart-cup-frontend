import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {BaseEvent, SettingsChangedEvent, SipEvent} from '../private/event-feed/models/BaseEvent';
import {Socket} from "ngx-socket-io";
import {map} from "rxjs/operators";
import {TempReading} from "./temp.service";

@Injectable({
  providedIn: 'root'
})
export class EventFeedService {
  api = environment.apiUrl + '/event-feed'
  s = 1640868813887;
   newContent: BaseEvent[] = [
    {
      id: "1",
      timestamp: new Date(this.s + 1),
      sipVolume: "10",
      code: "a"
    } as SipEvent
  ];
  constructor(private socket: Socket) {

  }

  public GetEventFeed(id: string): Observable<BaseEvent[]> {
    this.socket.fromEvent<BaseEvent>(`${id}/coffee-event`).subscribe(a =>
    {
      console.log("NIGGA");
      console.log(a);
      console.log(a);
      this.newContent.push(a);
      return this.newContent;
    })
    return of(this.newContent);
  }
}
