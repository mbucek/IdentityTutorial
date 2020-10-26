import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthorizationService } from '../services/authentication/user-authorization.service';
import { Observable } from 'rxjs';
import { Injectable, setTestabilityGetter } from '@angular/core';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class IsRoleGrantedGuard implements CanActivate {

  public constructor(private adminAuthenticationService: UserAuthorizationService,
                     private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let requiredRoles: UserRole[] = route.data['roles'] as UserRole[];
    let role: UserRole = this.adminAuthenticationService.getUserRole();

    if (requiredRoles.some(r => r === role)) {
      return true;
    } else {
     // if (requiredRoles.find(r => r === UserRole.StartTest)) {

         //this.globalService.forbiddenTargetRoute=state.url;
         this.router.navigate(['/login'], {queryParams: {targetSite: state.url}});

      return false;
    }
  }
}
