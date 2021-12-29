import { Injectable } from '@angular/core';
import {Settings, SettingsPutBody} from "../private/settings/models/SettingsPutBody";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  api = environment.apiUrl + '/settings'
  constructor(private client: HttpClient) { }



  public UpdateSettings(setting: SettingsPutBody) {
    return this.client.put(this.api, setting);
  }

  public GetSettings(id: string) : Observable<Settings> {
    return this.client.get<Settings>(`${this.api}/${id}`);
  }

}
