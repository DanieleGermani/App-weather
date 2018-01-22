import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()

@Injectable()
export class WeatherService {
  apiKey= 'f2a9209a378910f52bb19e7afb5e13ba';
  url = 'http://api.openweathermap.org/data/2.5/forecast';


  constructor(public http: Http) { }

  getWeather(city:string){
    return this.http.get(`${this.url}?q=${city}&units=metric&appid=${this.apiKey}`).map( res =>
      res.json()
    );
  }

  localWeather(lat:string,lon:string){
  return  this.http.get(`${this.url}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`).map( res => res.json());
}





}
