import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tienda } from './tienda';
import { Articulo } from '../articulos/articulo';

const AUTH_API = 'https://localhost:7251/api/Tienda';

@Injectable()
export class TiendaService {

  constructor(private http: HttpClient) { }

  get(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(AUTH_API)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getById(id: number): Observable<Tienda> {
    return this.http.get<Tienda>(`${AUTH_API}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  add(tienda: Tienda): Observable<number> {
    return this.http.post<number>(AUTH_API, tienda)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, tienda: Tienda): Observable<number> {
    return this.http.put<number>(`${AUTH_API}/${id}`, tienda)
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

  getByTiendaId(id: number): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${AUTH_API}/Articulos/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getArticulosNoAsignados(id: number): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${AUTH_API}/Articulos/NoAsginados/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addArticuloTienda(tiendaId: number, articuloId: number): Observable<number> {
    return this.http.post<number>(`${AUTH_API}/Articulos`, { IdArticulo: articuloId, IdTienda: tiendaId  })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  removeArticuloTienda(tiendaId: number, articuloId: number): Observable<number> {
    return this.http.delete<number>(`${AUTH_API}/Articulos/${articuloId}/${tiendaId}`)
      .pipe(
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
