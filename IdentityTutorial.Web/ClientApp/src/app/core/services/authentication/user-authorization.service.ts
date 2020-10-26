import { Injectable } from '@angular/core';
import {UserDao} from './user.dao';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserRole} from '../../enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizationService {

  private jwtService = new JwtHelperService();
  private token: string = null;

  public constructor(private authDAO: UserDao) {
    this.token = sessionStorage.getItem('token');
  }

  public async loginAdmin(email: string, password: string): Promise<boolean> {
    let response: any = await this.authDAO.loginAdmin(email, password);

    if ((response!=null) && (response.auth_token != null)) {
      this.token = response.auth_token;
      sessionStorage.setItem('token', this.token);
      return true;
    } else {
      return false;
    }
  }

  public loginMember(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', this.token);
  }

  public logoutUser(): void {
    this.token = null;
    sessionStorage.removeItem('token');
  }

  public getUserRole(): UserRole {
    let token: any = this.getToken();
    if (token != null) {
      return token.role;
    } else {
      return null;
    }
  }

  public getUserName(): UserRole {
    let token: any = this.getToken();
    if (token != null) {
      return token.sub;
    } else {
      return null;
    }
  }

  public isUserAuthenticated(): boolean {
    if (this.token != null && this.token !== '') {
      return !this.jwtService.isTokenExpired(this.token);
    } else {
      return false;
    }
  }

  public isTokenExpired(): boolean  {
    if (this.token != null && this.token !== '') {
      return this.jwtService.isTokenExpired(this.token);
    }
    else
      return false; //Wenn kein Token vorhanden, gilt dies nicht als Expired!
  }

  public hasUserAdminRole(): boolean {
    let role = this.getUserRole();
    return role === UserRole.Admin;
  }


  public isUserLoggedIn(email: string): boolean {
    let token: any = this.getToken();
    return token != null && token.sub === email;
  }

  public getEncodedToken(): string {
    return this.token;
  }

  private getToken(): any {
    if (this.token != null && this.token !== '') {
      try {
        return this.jwtService.decodeToken(this.token);
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }
}
