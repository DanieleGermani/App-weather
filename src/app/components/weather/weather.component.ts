import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {WeatherService} from  '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  date:number = new Date().getTime();
  weather:any;
  forecast:any;
  loading:boolean = false;
  location:any;


  constructor(public _weatherService:WeatherService) {}

  ngOnInit() {
      navigator.geolocation.getCurrentPosition((pos) =>{
      this.location = pos.coords;
      let lat = this.location.latitude;
      let lon = this.location.longitude
      console.log(this.location)
      this._weatherService.localWeather(lat,lon).subscribe(
        (data)=>{
          this.loading = true;
          console.log(data)
           this.weather = data;
           this.forecast = this.weather.list;
           console.log(this.forecast)

        })
    })
    }

  onSubmit(weatherForm:NgForm){
  // this.items.splice(0, this.items.length);
  this._weatherService.getWeather(weatherForm.value.city).subscribe(
    (data) => {
      this.loading = true;
      this.weather=data;
      console.log(this.weather)
      this.forecast = this.weather.list;
      console.log(this.forecast)
    }
  )

}

}
