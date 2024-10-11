import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { DropdownDirective } from '../../../shared/dropdown.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [DropdownDirective, RouterLink, RouterLinkActive],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe?: Recipe;
  @Input() index!: number;
}
