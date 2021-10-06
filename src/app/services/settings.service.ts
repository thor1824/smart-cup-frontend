import { Injectable } from '@angular/core';
import {Settings, SettingsPutBody} from "../settings/models/SettingsPutBody";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private client: HttpClient) { }



  public UpdateSettings(setting: SettingsPutBody) {
    return this.client.put('http://localhost:3000/settings', setting);
  }

  public GetSettings(id: string) : Observable<Settings> {
    return this.client.get<Settings>('http://localhost:3000/settings/' + id);
  }

}
