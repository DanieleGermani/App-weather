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

  serviceWeather(data) {
    this.loading = true;
    this.weather = data;
    this.forecast = this.weather.list;
    console.log(this.forecast[0].weather[0].id)

    for (let i = 0; i <= this.forecast.length - 1; i = i + 7) {
      let code = this.forecast[i].weather[0].id;
      let item = [];
      item.push(data.list[i].weather[0].id)
      console.log(item)
      this.items.push(item)
    }
    for(let j = 0; j<= this.items.length -1; j++){
      if(this.items[j] == 800 || this.items[j] == 801){
        this.color.push('#fff600')
        continue
      }if(this.items[j] == 500){
        this.color.push('#00d2ff')
        continue
      }if(this.items[j] == 600){
        this.color.push('#d71d1d')
        continue
      }if(this.items[j] == 801){
        this.color.push('#ffffff')
        continue
      }else{
        this.color.push('#43de37')
      }
      }
    console.log(this.items)
    console.log(this.color)
  }

  constructor(public _weatherService: WeatherService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.location = pos.coords;
      let lat = this.location.latitude;
      let lon = this.location.longitude
      console.log(this.location)
      this._weatherService.localWeather(lat, lon).subscribe(
        (data) => {
          this.serviceWeather(data)
        })

    })
  }

  onSubmit(weatherForm: NgForm) {
    // this.color.splice(0, this.color.length);
    // this.items.splice(0, this.items.length);
    this.items = [];
    this.color = [];
    this._weatherService.getWeather(weatherForm.value.city).subscribe(
      (data) => {
        this.serviceWeather(data)
      })
      console.log(this.weather)
  }
}
