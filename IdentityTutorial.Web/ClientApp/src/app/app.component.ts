import { Component, OnInit } from '@angular/core';
import { ErrorInterceptor} from './core/helper/error-interceptor';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserAuthorizationService } from './core/services/authentication/user-authorization.service';
import { WeatherForecastService } from './core/services/dao/weather-forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Authentication Demo';

  public constructor(private toastr: ToastrService, private router: Router, private userAuthorizationService: UserAuthorizationService, private weatherService: WeatherForecastService
   ) {

  }

  public logout(): void {
    this.userAuthorizationService.logoutUser();
    this.router.navigate(['/login'], {queryParams: {targetSite: '/manage'}});
  }

  public getUserName(): string {
    return this.userAuthorizationService.getUserName() ?? "not logged in";
  }

  public ngOnInit(): void {
    ErrorInterceptor.toastr = this.toastr;
  }

  public fetchData() {
    this.weatherService.getAll().subscribe(
      data=>{
        alert(data);
      }
    )
  }

}

