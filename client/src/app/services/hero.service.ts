import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../types/hero.type';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  apiUrl = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.apiUrl}/heroes`);
  }
}
