import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Meal from '../models/Meal';
@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private http: HttpClient) {}

  totalNutrient(meals: Meal[], nutrient: string): number {
    console.log(meals);
    console.log(nutrient);
    let total = 0;
    meals.forEach((meal) => {
      total += Number(meal.aliment[nutrient as keyof typeof meal.aliment]);
    });
    return total;
  }
}
