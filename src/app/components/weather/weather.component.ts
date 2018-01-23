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
  color: any = [];
  item: any;
  items: any = [];
  codes: any = [];

  serviceWeather(data) {
    this.loading = true;
    this.weather = data;
    this.forecast = this.weather.list;
    console.log(this.forecast[0].weather[0].id)

    for (let i = 0; i <= this.forecast.length - 1; i = i + 7) {
      let item = [];
      let date = data.list[i].dt_txt;
      let code = data.list[i].weather[0].id;
      let temp = data.list[i].main.temp;
      let color;

      if (code == 800) {
        color = '3px solid #fff600';
        this.codes.push(code)
      } if (code == 500) {
        color = '3px solid #00d2ff';
      } if (code == 600 || code == 601) {
        color = '3px solid #d71d1d';
      } if (code == 801 || code == 802 || code == 803) {
        color = '3px solid #ffffff';
      } if (code == 900) {
        color = '3px solid #17202A';
      } if (code == 300) {
        color = '3px solid #43de37';
      }



      item.push(date, code, temp, color)
      // console.log(item)
      this.items.push(item)
    }
    // for(let j = 0; j<= this.codes.length -1; j++){
    //   if(this.codes[j] ==  800){
    //     this.color.push('3px solid #fff600')
    //     continue
    //   }if(this.codes[j] == 500 || this.codes[j] == 501 ){
    //     this.color.push('3px solid #00d2ff')
    //     continue
    //   }if(this.codes[j] == 600 || this.codes[j] == 601){
    //     this.color.push('3px solid #d71d1d')
    //     continue
    //   }if(this.codes[j] == 801){
    //     this.color.push('3px solid #ffffff')
    //     continue
    //   }else{
    //     this.color.push('3px solid #43de37')
    //   }
    //   }
    console.log(this.items)
    console.log(this.color)
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
    this.codes = [];
    this.color = [];
    this.items = [];
    this._weatherService.getWeather(weatherForm.value.city).subscribe(
      (data) => {
        this.serviceWeather(data)
      })
    console.log(this.weather)
  }
}
