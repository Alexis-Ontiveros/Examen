import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Articulo } from './articulo';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const AUTH_API = 'https://localhost:7251/api/Articulo';

@Injectable()
export class ArticuloService {

  constructor(private http: HttpClient) { }

  get(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(AUTH_API)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${AUTH_API}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  add(articulo: FormData): Observable<number> {
    return this.http.post<number>(AUTH_API, articulo)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, articulo: FormData): Observable<number> {
    return this.http.put<number>(`${AUTH_API}/${id}`, articulo)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: number): Observable<number> {
    return this.http.delete<number>(`${AUTH_API}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => errorMessage);
  }
}
