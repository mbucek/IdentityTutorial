import { UserAuthorizationService } from '../services/authentication/user-authorization.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserAuthenticationInterceptor implements HttpInterceptor {

  public constructor(private userAuthorizationService: UserAuthorizationService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.userAuthorizationService.isUserAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.userAuthorizationService.getEncodedToken()}`
        }
      });
    }

    return next.handle(request);
  }
}
