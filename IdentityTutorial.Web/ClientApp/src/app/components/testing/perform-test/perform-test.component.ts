import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthorizationService } from 'src/app/core/services/authentication/user-authorization.service';
import { WeatherForecast } from '../../../core/model/weather-forecast.model';
import { WeatherForecastService } from '../../../core/services/dao/weather-forecast.service';

@Component({
  selector: 'app-perform-test',
  templateUrl: './perform-test.component.html',
  styleUrls: ['./perform-test.component.scss']
})
export class PerformTestComponent implements OnInit {

  weatherForecasts: WeatherForecast[] ;

  constructor(private router: Router,
     private userAuthorizationService: UserAuthorizationService, private weatherService: WeatherForecastService) { }



  ngOnInit() {
      this.loadWeatherForecast();
  }

  loadWeatherForecast() {
     this.weatherService.getAll().subscribe(
       data=>{
         this.weatherForecasts=data;
       }
     )
  }


}
