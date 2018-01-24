import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'

})
export class WeatherComponent implements OnInit {
  date: number = new Date().getTime();
  weather: any;
  forecast: any;
  /*Uso la variabile loading por saber cuando se ha hecho una petiizion corectamente,
  y lo utilizio en html con el ngIF para saber cuando tener el loiding o no (false o true ) */
  loading: boolean = false;
  location: any;
  items: any = [];


  serviceWeather(data) {
    this.loading = true;
    //data es lo que me devuelve la pedicion al api
    this.weather = data;
    /*sacco una array de objetos (40) que voy utilizando por hacer el forecast de 5 dias, en la prueba , tenia que
    ser 7 dias de forecast, pero el api (free) no permite hace peticiones por mas de 5 dias.
    como en la prueba tecnica era 7 dias de forcast, yo repito el dia curriente para llegar a 6 dias */
    this.forecast = this.weather.list;
//Llamo la funcion aqui abajo
    this.choiceColor(data);

  }
/*he creado esta funcion con loop , por recorerme forecast[Array] para crear mi array de arrays,
con todas las informaciones que me sirve para le html */
  choiceColor(data){
    for (let i = 1; i <= this.forecast.length - 1; i = i + 7) {
      let item = [];
      let date = data.list[i].dt_txt;
      let code = data.list[i].weather[0].id;
      let temp = data.list[i].main.temp;
      let color;
      let border;
      let dayOrNigth;
/* necesito saber si es noche o dia , porque hay diferentes iconos (en el fonts icons que estoy utillizando )
por la noche o el dia , pero puedo cambiarlo con las palabras llave (night y day )
por eso cada ved el loop encuentra una 'n' igualo mi variabile dayOrNigth a 'night'.. si no es 'day'*/
      if(data.list[i].sys.pod == 'n'){
        dayOrNigth = 'night';
      }else{
        dayOrNigth = 'day';
      }
      /*aqui mas menos es como arriba , pero lo necesito para colorar los div de cada dia del forecast, dependiendo
      del clima que hay va cabiando de color el div y el border-top*/
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
      /*hago un push a item[Array] por crear una array y guarda juntos todos los elementos */
      item.push(date, code, temp, color,border,dayOrNigth)
      /* Una vez que cada elemento esta ordenado en su array  y en su posicion, hago otro push en items
      asi tengo todas las array en una , y la puedo utillizar en el html con un ngFor
       */
      this.items.push(item)
    }
  }
//importo el servicio para utilizar su fuciones
  constructor(public _weatherService: WeatherService) { }

  ngOnInit() {
    /*Cada vez que carga la pagina web uso la funcion getCurrentPosition para sacar la latitud y logitude,
    que paso al funcion localWeather (que es una funcion que esta en el servicio, que espera estos dos parametros ,
  para hacer la peticion al api ) */

    navigator.geolocation.getCurrentPosition((pos) => {
      this.location = pos.coords;
      let lat = this.location.latitude;
      let lon = this.location.longitude

      this._weatherService.localWeather(lat, lon).subscribe(
        (data) => {
          /*Por no repitir codigo he creado esta funcion (serviceWeather) explico su funcionalitad mas arriba */
          this.serviceWeather(data)
        })
    })
  }

  onSubmit(weatherForm: NgForm) {
    /*Limpo items array cada vez antes de una nueva busqueda*/
    this.items = [];
    
    this._weatherService.getWeather(weatherForm.value.city).subscribe(
      (data) => {
        /*Por no repitir codigo he creado esta funcion (serviceWeather) explico su funcionalitad mas arriba */
        this.serviceWeather(data)
      })
  }
}
