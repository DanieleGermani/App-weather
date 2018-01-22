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


  constructor(public _weatherService:WeatherService) { }

  ngOnInit() {
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


 //      let array = this.weather.list;
 //      console.log(array)
 //
 // for(var i = 0; i <= array.length; i= i+8){
 //
 //   let item = [];
 //    item.push(
 //                    data.list[i].main.temp,
 //                    data.list[i].dt_txt,
 //                    data.list[i].weather[0].icon);
 //    this.items.push(item)
 //    console.log(item)
 // }
 // console.log(this.items)
 //      localStorage.setItem('location', JSON.stringify(location));

    }
  )

}

}
