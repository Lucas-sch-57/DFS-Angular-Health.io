import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Meal from '../models/Meal';

@Injectable({
  providedIn: 'root',
})
export class AlimentsService {
  constructor(private http: HttpClient) {}

  getAliments() {
    return this.http.get('http://localhost:3000/aliments');
  }

  addMeal(meal: Meal) {
    return this.http.post('http://localhost:3000/meal', { meal });
  }

  getUserMeals(id: number | null, date: string) {
    return this.http.get('http://localhost:3000/meals/' + id + '/' + date);
  }
}
