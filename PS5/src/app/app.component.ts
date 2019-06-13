import { Component } from '@angular/core';
import {WEATHERS} from './WEATHERS-MOCK';
import {WEATHER} from './WEATHER';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'City Weather';
  weathers = WEATHERS;
  private selectedWeather: WEATHER;


  selectWeather(weather: WEATHER) {
    this.selectedWeather = weather;

  }
}
