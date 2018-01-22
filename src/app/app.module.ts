import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';

//Services
import {WeatherService} from './services/weather.service';
import {CurrentWeatherService} from './services/current-weather.service';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule

  ],
  providers: [WeatherService,
              CurrentWeatherService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
