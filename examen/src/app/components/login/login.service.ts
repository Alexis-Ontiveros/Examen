import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario, UsuarioToken } from './usuario';
import { tap } from 'rxjs/operators';

const AUTH_API = 'https://localhost:7251/api/Usuario';
const AUTH_USER = 'authUser';
const AUTH_TOKEN = 'userToken';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<UsuarioToken> {
    return this.http.post<UsuarioToken>(`${AUTH_API}/Login`, usuario, httpOptions)
      .pipe(
        tap(res => {
          window.sessionStorage.removeItem(AUTH_TOKEN);
          window.sessionStorage.setItem(AUTH_TOKEN, res.token);
          window.sessionStorage.removeItem(AUTH_USER);
          window.sessionStorage.setItem(AUTH_USER, JSON.stringify(res.user));
        }),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error:any) {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}
