import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthorizationService } from 'src/app/core/services/authentication/user-authorization.service';
import { ErrorInterceptor } from 'src/app/core/helper/error-interceptor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public hasLoginFailed: boolean = false;
  public hasTokenExpired: boolean = false;

  public isLoading: boolean = false;
  private fromWelcome=false;
  private targetSite: string="";

  public constructor(private router: Router,
                     private activatedRoute: ActivatedRoute,
                     private userAuthorizationService: UserAuthorizationService,
                    ) {
  }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.origin === 'expiredToken') {
        this.hasTokenExpired = true;
      }
      this.targetSite=params.targetSite;
    });
  }

  public async login(): Promise<void> {


    this.isLoading = true;
    this.hasTokenExpired = false;

    let result: boolean = await this.userAuthorizationService.loginAdmin(this.email, this.password);
    this.isLoading = false;

    if (result) {
      let role=this.userAuthorizationService.getUserRole();
      if (this.targetSite!="undefined")
        this.router.navigate([this.targetSite]);
      else if (role=="User" ) {
        this.router.navigate(['/perform-test']);
      }
      else if (role=="Admin") {
        this.router.navigate(['/manage']);
      }
    } else {
      this.hasLoginFailed = true;
      ErrorInterceptor.toastWarningMessage('Benutzername oder Passwort ungültig!');
    }
  }
}
