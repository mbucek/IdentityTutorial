import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthorizationService } from '../services/authentication/user-authorization.service';
import { ReauthService } from '../services/authentication/reauth.service';

@Injectable({
    providedIn: 'root'
  })
export class IsAuthenticatedGuard implements CanActivate {

  public constructor(private userAuthorizationService: UserAuthorizationService,
                     private reauthService: ReauthService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userAuthorizationService.isUserAuthenticated()) {
      this.reauthService.redirectAccordingly(state.url, this.userAuthorizationService.isTokenExpired());
      return false;
    } else {
      return true;
    }
  }
}
