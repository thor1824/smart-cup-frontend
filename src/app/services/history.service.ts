import { Injectable } from '@angular/core';
import {Settings, SettingsPutBody} from "../private/settings/models/SettingsPutBody";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { of } from 'rxjs';
import {environment} from "../../environments/environment";
import {BaseEvent, SettingsChangedEvent, SipEvent} from '../private/event-feed/models/BaseEvent';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
    api = environment.apiUrl + '/event-feed'
    constructor(private client: HttpClient) { }

    public GetHistory(id: string) : Observable<BaseEvent[]> {

        const newContent: BaseEvent[] = [{
        id: "1",
        timestamp: new Date(1640868813887),
        sipVolume: "10",
        code: "a"
     } as SipEvent, {
        id: "2",
        timestamp: new Date(1640868813885),
        code: "b"
      } as SettingsChangedEvent];
     return of(newContent);


      // return this.client.get<BaseEvent[]>(`${this.api}/${id}`);
    }
}
