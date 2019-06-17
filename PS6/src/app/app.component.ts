import {Component} from '@angular/core';
import {ShopModel} from './models/shopModel';
import {YelpService} from './services/yelp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Search good shops';
  private selectedShop: ShopModel = null;
  shops = [];

  term = '';

  getShops(term: string): void {
    this.yelpService.getShops(term)
      .subscribe(shops => {
        this.shops = shops;
      });
  }


  constructor(private yelpService: YelpService) {

  }
}
