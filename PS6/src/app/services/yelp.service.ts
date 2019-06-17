import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShopModel} from '../models/shopModel';

@Injectable({
  providedIn: 'root'
})
export class YelpService {
  localYelpEndpoint = 'http://localhost:3000/ps4/boston/yelp/business?key=';

  getShops(term: string): Observable<ShopModel[]> {
    return this.httpClient.get<ShopModel[]>(this.localYelpEndpoint + term);
  }

  constructor(private httpClient: HttpClient) {
  }
}
