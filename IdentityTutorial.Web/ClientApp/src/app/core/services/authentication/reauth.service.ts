import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ReauthService {

  public isReauthNecessary: boolean = false;

  public constructor(private router: Router,
                     private toastr: ToastrService) {
  }

  public async redirectAccordingly(url: string, isTokenExpired: boolean): Promise<void> {
    this.isReauthNecessary = true;


    // if (url.indexOf('fit') !== -1) {
    //   await this.router.navigate(['/'], {queryParams: {origin: 'tokenExpired'}});
    // } else if (url.indexOf('admin-tool') !== -1) {
    //   await this.router.navigate(['/admin-tool', 'login'], {queryParams: {origin: 'tokenExpired'}});
    // } else if (url.indexOf('konto') !== -1) {
    //   await this.router.navigate(['/konto', 'login'], {queryParams: {origin: 'tokenExpired'}});
    // }

    //this.globalService.forbiddenTargetRoute=url;
    if (isTokenExpired) {
      await this.router.navigate(['/login'], {queryParams: {origin: 'tokenExpired', queryParams: {targetSite: url}}});
      this.toastr.error('Sie müssen sich leider erneut einloggen.', 'Ihre Sitzung ist abgelaufen!', {
        timeOut: 10000,
        progressBar: true
      });
    }
    else {
      await this.router.navigate(['/login'], {queryParams: {queryParams: {targetSite: url}}});
    }

    this.isReauthNecessary = false;
  }
}
