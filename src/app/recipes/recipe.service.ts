import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // cannot access from outside
  private recipes: Recipe[] = [
    new Recipe(
      'Pesto Pasta',
      "With bright, bold flavor, it's one of our favorite weeknight dinners.",
      'https://xome-chef.ru/image/cache/catalog/spiralerzka-004-1670159943-1000x1000.jpg',
      [new Ingredient('Pasta', 250), new Ingredient('Pesto Sauce', 50)]
    ),
    new Recipe(
      'Palak Paneer',
      'Palak Paneer, a classic North Indian dish, combines spinach and paneer cheese in a flavorful curry.',
      'https://i.pinimg.com/736x/61/eb/99/61eb99840d2a700f680ab0d0dec10c9b.jpg',
      [new Ingredient('Spinach', 100), new Ingredient('Paneer Cheese', 50)]
    ),
  ];

  // to access recipes copy from outside
  getRecipes() {
    return this.recipes.slice(); // copying an array
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  constructor(private slService: ShoppingListService) {}

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
