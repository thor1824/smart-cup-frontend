import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {DeviceService} from "./device.service";

export interface User {
  _id: string;
  email: string;
  devices: Device[];
}

export interface Device {
  _id: string;
  name: string;
  deviceCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = "token";
  private readonly userKey = "user";
  public jwtToken$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  user$: BehaviorSubject<User> = new BehaviorSubject<User>({_id: '', email: '', devices: []});
  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
  };
  api = environment.apiUrl + '/auth'

  constructor(private client: HttpClient, private device: DeviceService) {
    const storage = localStorage;
    const token = storage.getItem(this.tokenKey)
    var userJson = storage.getItem(this.userKey)
    if (token && userJson) {
      this.jwtToken$.next(token);
      this.user$.next(JSON.parse(userJson) as User);
    }
    this.jwtToken$.subscribe(token => {
      storage.setItem(this.tokenKey, token);
    })
    this.user$.subscribe(user => {
      storage.setItem(this.userKey, JSON.stringify(user));
    })
  }


  public signIn(email: string, password: string): Observable<{ user: any, token: any }> {
    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    return this.client.post<{ user: any, token: any }>(`${this.api}/login`, body.toString(), this.options).pipe(tap(x => {
      this.jwtToken$.next(x.token);
      this.user$.next(x.user);
      this.device.Devices = x.user.devices
    }));
  }

  public register(email: string, password: string) {
    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);
    return this.client.post<{ user: any, token: any }>(`${this.api}/register`, body.toString(), this.options).pipe(tap(x => {
      this.jwtToken$.next(x.token);
      this.user$.next(x.user);
    }));
  }

  me() {
    return this.client.get<User>(`${this.api}/me`).pipe(tap(x => {
      this.user$.next(x);
      this.device.Devices = x.devices
    }));
  }
}
