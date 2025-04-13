import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

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
  private readonly API_URL = 'http://localhost:8080/api';
  private defaultProperties: BeerRecipe | null = null;
  private recipesSubject = new BehaviorSubject<BeerRecipe[]>([]);
  recipes$ = this.recipesSubject.asObservable();

  constructor(private http: HttpClient) { }

  addNewRecipe(newRecipe: Omit<BeerRecipe, 'id'>): void {
    this.http.post<BeerRecipe>(`${this.API_URL}/recipes`, newRecipe).subscribe({
      next: addedRecipe => {
        const currentRecipes = this.recipesSubject.value;
        this.recipesSubject.next([...currentRecipes, addedRecipe]);
      }
    })
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
