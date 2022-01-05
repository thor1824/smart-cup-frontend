import { Injectable } from '@angular/core';
import {Settings, SettingsPutBody} from "../private/settings/models/SettingsPutBody";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  api = environment.apiUrl + '/settings'
  interval: number = 5;
  constructor(private client: HttpClient) { }



  public UpdateSettings(setting: SettingsPutBody) {
    return this.client.put(this.api, setting).pipe(tap(x => {
      this.interval = setting.interval / 1000;
    }));
  }

  public GetSettings(id: string) : number {
    return this.interval;
  }

}
