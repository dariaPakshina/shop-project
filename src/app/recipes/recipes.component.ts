import { Component } from '@angular/core';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { Recipe } from './recipe.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    NgIf,
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  selectedRecipe?: Recipe;
}
