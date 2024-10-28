import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { User } from './user-model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  token: string;
  data: {
    id: number;
    fullName: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null); //also gives previous data, before subscribe
  private loginExpirTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  private handleErrors(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.message) {
      case 'RESOURCE_USER_ALREADY_EXISTS': //RESOURCE_INVALID_LOGIN_OR_PASSWORD
        errorMessage = 'This email already exists!';
        break;
      case 'RESOURCE_INVALID_LOGIN_OR_PASSWORD': //RESOURCE_INVALID_LOGIN_OR_PASSWORD
        errorMessage = 'Wrong login or password';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(data: object, token: string) {
    // const expirationDate = new Date()
    const user = new User(data, token);
    this.user.next(user);
    this.autoLogOut();
    localStorage.setItem('userData', JSON.stringify(user));
  }

  signUp(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://6ce95b9a7b2bff1a.mokky.dev/register', {
        fullName: name,
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleErrors),
        tap((resData) => {
          this.handleAuthentication(resData.data, resData.token);
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://6ce95b9a7b2bff1a.mokky.dev/auth', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleErrors),
        tap((resData) => {
          this.handleAuthentication(resData.data, resData.token);
        })
      );
  }

  autoLogIn() {
    const userData: {
      data: object;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.data, userData._token);

    if (loadedUser.token) {
      this.user.next(loadedUser);

      this.autoLogOut();
    }
  }

  autoLogOut() {
    this.loginExpirTimer = setTimeout(() => {
      this.logOut();
    }, 3600000);
  }

  logOut() {
    this.user.next(null); // set user as anauthenticated
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.loginExpirTimer) {
      clearTimeout(this.loginExpirTimer);
    }
  }
}
