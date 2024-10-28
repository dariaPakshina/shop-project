import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownDirective } from '../shared/dropdown.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DataStorageService } from '../data-storage.service';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownDirective, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorService: DataStorageService,
    private authService: AuthService
  ) {}

  onSaveData() {
    this.dataStorService.storeRecipes();
  }

  onFetchData() {
    this.dataStorService.fetchRecipes();
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; //? false : true
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
