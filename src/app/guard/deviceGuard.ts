import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {DeviceService} from "../services/device.service";
import {Observable} from "rxjs";

@Injectable()
export class DeviceGuard implements CanActivate {
  constructor(
              private deviceService: DeviceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return !!this.deviceService.DeviceId;
  }
}
