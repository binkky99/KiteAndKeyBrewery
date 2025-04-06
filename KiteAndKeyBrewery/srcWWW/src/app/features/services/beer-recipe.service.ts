import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

export interface BeerRecipe {
  id: number;
  name: string;
  boilingTemp: number,
  grainWeight: number,
  firstRest: number,
  grainTemp: number,
  waterRatio: number
}

@Injectable()
export class BeerRecipeService {
  private readonly API_URL = 'http://localhost:8080/';
  private defaultProperties: BeerRecipe | null = null;

  constructor(private http: HttpClient) { }

  addNewRecipe(recipe: BeerRecipe): Observable<BeerRecipe> {
    return this.http.post<BeerRecipe>(`${this.API_URL}/recipes`, recipe);
  }

  getDefaultProperties(): Observable<BeerRecipe> {
    if (this.defaultProperties) {
      return of(this.defaultProperties);
    } else {
      return this.http.get<BeerRecipe>(`${this.API_URL}/resources/default-recipe-properties`).pipe(
        tap((response) => this.defaultProperties = response)
      );
    }
  }

  getAllRecipes(): Observable<any> {
    return this.http.get(`${this.API_URL}/recipes`);
  }

  updateRecipe(recipe: BeerRecipe): Observable<BeerRecipe> {
    return this.http.put<BeerRecipe>(`${this.API_URL}/recipes/${recipe.id}`, recipe);
  }
}
