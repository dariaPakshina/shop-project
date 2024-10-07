import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { DropdownDirective } from '../../shared/dropdown.directive';
import { NgFor } from '@angular/common';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [DropdownDirective, NgFor],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe | any;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
