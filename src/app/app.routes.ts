import { Routes } from '@angular/router';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadComponent: () =>
      import('./recipes/recipes.component').then((mod) => mod.RecipesComponent),
    children: [
      { path: '', component: RecipeStartComponent, canActivate: [authGuard] },
      { path: 'new', component: RecipeEditComponent, canActivate: [authGuard] },
      {
        path: ':id',
        component: RecipeDetailComponent,
        canActivate: [authGuard],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'shopping-list',
    loadComponent: () =>
      import('./shopping-list/shopping-list.component').then(
        (mod) => mod.ShoppingListComponent
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((mod) => mod.AuthComponent),
  },
];
