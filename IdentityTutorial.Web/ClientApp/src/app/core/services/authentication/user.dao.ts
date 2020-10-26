import { Injectable, Inject } from '@angular/core';
//import * as CryptoJS from 'cryptojs';
import CryptoES from 'crypto-es';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, publishLast, refCount } from 'rxjs/operators';
import { ErrorInterceptor } from '../../helper/error-interceptor';

@Injectable({
    providedIn: 'root'
  })
export class UserDao {

  //public fitUserCache: Promise<FitUser[]> = null;

  public constructor(private http: HttpClient,  @Inject('BASE_URL') private baseUrl: string) {
  }

  public async loginAdmin(email: string, password: string): Promise<any> {
    //password = CryptoJS.SHA256(password).toString().toUpperCase();
     password = CryptoES.SHA256(password).toString().toUpperCase();
    return this.http.post<any>(this.baseUrl + 'api/auth/login', {userName: email, password: password})
      .pipe(catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }

  // public async createAdmin(email: string, password: string, role: FitUserRole): Promise<FitUser[] | FitHttpError> {
  //   let json: any = {
  //     fitUser: new FitUser(email, role),
  //     password: CryptoJS.SHA256(password).toString().toUpperCase()
  //   };

  //   let response = this.http.post<FitUser[]>(this.appConfig.serverURL + '/account', json)
  //     .pipe(
  //       publishLast(), refCount(),
  //       catchError(ErrorInterceptor.catchErrorMessage)
  //     )
  //     .toPromise();

  //   if ((await response) instanceof FitHttpError) {
  //     return response;
  //   } else {
  //     this.fitUserCache = response as Promise<FitUser[]>;
  //     return this.fitUserCache;
  //   }
  // }

  // public async fetchAllUsers(): Promise<FitUser[]> {
  //   if (this.fitUserCache == null) {
  //     this.fitUserCache = this.http.get<FitUser[]>(this.appConfig.serverURL + '/account')
  //       .pipe(publishLast(), refCount())
  //       .toPromise();
  //   }

  //   return this.fitUserCache;
  // }

  // public async deleteUser(fitUser: FitUser): Promise<FitUser[]> {
  //   this.fitUserCache = this.http.delete<FitUser[]>(this.appConfig.serverURL + '/account/' + fitUser.id)
  //     .pipe(publishLast(), refCount())
  //     .toPromise();

  //   return this.fitUserCache;
  // } 



  



}
