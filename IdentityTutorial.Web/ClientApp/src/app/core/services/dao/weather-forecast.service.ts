import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { WeatherForecast } from '../../model/weather-forecast.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl=baseUrl;

    //base url wird in main.ts als provider bereitgestellt (siehe dort) und dynamisch zur Laufzeit ermittelt
    //(nur sinnvoll wenn API-Server und Webserver der Angular Seite idente URL besitzen):
    //const providers = [
    //  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
    //];
   }

   getAll(): Observable<WeatherForecast[]> {
    return this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast');
  }
}
