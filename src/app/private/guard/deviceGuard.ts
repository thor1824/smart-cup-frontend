import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs/operators";

@Injectable()
export class DeviceGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.jwtToken$.pipe(map(x => {
      if (!!x && x.length > 0) {
        return true;
      } else {
        this.router.navigate(['auth/login']).then()
        return false;
      }
    }));
  }
}
