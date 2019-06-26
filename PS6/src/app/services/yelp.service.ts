import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShopModel} from '../models/shopModel';
import {endpoints} from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class YelpService {
  localYelpEndpoint = endpoints.YelpEndpoint;

  getShops(term: string): Observable<ShopModel[]> {
    return this.httpClient.get<ShopModel[]>(this.localYelpEndpoint + term);
  }

  constructor(private httpClient: HttpClient) {
  }
}
