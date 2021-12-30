import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        headers: req.headers.append('Authorization', `Bearer ${this.authService.jwtToken$.value}`)
      })
    );
  }
}
