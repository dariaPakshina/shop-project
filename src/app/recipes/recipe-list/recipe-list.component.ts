import { Component, EventEmitter, Output } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { Recipe } from '../recipe.model';
import { NgFor } from '@angular/common';
import { DropdownDirective } from '../../shared/dropdown.directive';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent, NgFor, DropdownDirective],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://i.pinimg.com/originals/ed/5a/99/ed5a99bb35794a5993d7134baacafdbe.jpg'
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://i.pinimg.com/originals/ed/5a/99/ed5a99bb35794a5993d7134baacafdbe.jpg'
    ),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
