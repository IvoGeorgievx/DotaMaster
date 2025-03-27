import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemPopularity } from '../types/item-popularity.type';
import { Item } from '../types/item.type';

@Injectable({
  providedIn: 'root',
})
export class ItemPopularityService {
  constructor(private readonly http: HttpClient) {}

  getItemPopularity(): Observable<ItemPopularity[]> {
    return this.http.get<ItemPopularity[]>(
      'http://localhost:3000/item-popularity'
    );
  }

  getItemNames(): Observable<{ [name: string]: Item }> {
    return this.http.get<{ [name: string]: Item }>(
      'https://raw.githubusercontent.com/odota/dotaconstants/master/build/items.json'
    );
  }
}
