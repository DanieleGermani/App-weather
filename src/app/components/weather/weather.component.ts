import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  date: number = new Date().getTime();
  weather: any;
  forecast: any;
  loading: boolean = false;
  location: any;
  items: any = [];


  serviceWeather(data) {
    this.loading = true;
    this.weather = data;
    this.forecast = this.weather.list;
    console.log(this.forecast[0].weather[0].id);
    this.choiceColor(data);

    console.log(this.items)
  }

  choiceColor(data){
    for (let i = 1; i <= this.forecast.length - 1; i = i + 7) {
      let item = [];
      let date = data.list[i].dt_txt;
      let code = data.list[i].weather[0].id;
      let temp = data.list[i].main.temp;
      let color;
      let border;
      let dayOrNigth;


      if(data.list[i].sys.pod == 'n'){
        dayOrNigth = 'night';
      }else{
        dayOrNigth = 'day';
      }

      if (code == 800) {
        color = 'rgba(255, 246, 0, 0.1)';
        border = '3px solid rgb(255, 246, 0)';
      } if (code == 500 || code == 501 || code == 502 || code == 503) {
        color = 'rgba(0, 210, 255, 0.1)';
        border = '3px solid rgb(0, 210, 255)';
      } if (code == 600 || code == 601 || code == 602 || code == 615) {
        color = 'rgba(231, 76, 60, 0.1)';
        border = '3px solid rgb(231, 76, 60)';
      } if (code == 801 || code == 802 || code == 803 || code == 804) {
        color = 'rgba(255, 255, 255, 0.1)';
        border = '3px solid rgb(255, 255, 255)';
      } if (code == 900 || code == 901 || code == 903 || code == 904) {
        color = 'rgba(23, 32, 42, 0.1)';
        border = '3px solid rgb(23, 32, 42)';
      } if (code == 300 || code == 300 || code == 301 || code == 310) {
        color = 'rgba(40, 180, 99, 0.1)';
        border = '3px solid rgb(40, 180, 99)';
      }

      item.push(date, code, temp, color,border,dayOrNigth)
      // console.log(item)
      this.items.push(item)
    }
  }

  constructor(public _weatherService: WeatherService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.location = pos.coords;
      let lat = this.location.latitude;
      let lon = this.location.longitude

      this._weatherService.localWeather(lat, lon).subscribe(
        (data) => {
          this.serviceWeather(data)
          console.log(this.weather)
        })
    })
  }

  onSubmit(weatherForm: NgForm) {
    // this.color.splice(0, this.color.length);
    // this.items.splice(0, this.items.length);
    this.items = [];
    this._weatherService.getWeather(weatherForm.value.city).subscribe(
      (data) => {
        this.serviceWeather(data)
      })
    console.log(this.weather)
  }
}
