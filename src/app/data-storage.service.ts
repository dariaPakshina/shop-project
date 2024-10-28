import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipes/recipe.service';
import { catchError, exhaustMap, filter, map, take, tap } from 'rxjs/operators';

import { Recipe } from './recipes/recipe.model';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .patch('https://29219502db799041.mokky.dev/recipes', recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://6ce95b9a7b2bff1a.mokky.dev/recipes')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      )
      .subscribe(
        (recipes) => console.log('Recipes loaded and stored:', recipes),
        (error) => console.error('Error in fetching recipes:', error)
      );
  }
}
