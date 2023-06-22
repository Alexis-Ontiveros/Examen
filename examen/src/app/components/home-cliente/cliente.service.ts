import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { TiendaArticulos } from './tiendas-articulos/tienda_articulos';
import { Articulo } from '../home/articulos/articulo';

const API_TIENDA = 'https://localhost:7251/api/Tienda/Articulos/Dashboard';
const API_CLIENTE = 'https://localhost:7251/api/Clientes';

@Injectable()
export class ClienteService {

  constructor(private http: HttpClient) { }

  getArticulos(): Observable<TiendaArticulos[]> {
    return this.http.get<TiendaArticulos[]>(API_TIENDA)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addArticulo(value: any): Observable<number> {
    return this.http.post<number>(`${API_CLIENTE}/Agregar`, value)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getCarrito(route: string, id: number): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${API_CLIENTE}/${route}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  removeArticulo(idCliente: number, idArticulos: number): Observable<number> {
    return this.http.delete<number>(`${API_CLIENTE}/Quitar/${idCliente}/${idArticulos}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  aprovarCompra(idCliente: number): Observable<number> {
    return this.http.post<number>(`${API_CLIENTE}/Comprar/${idCliente}`, { })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  cancelarCompra(idCliente: number): Observable<number> {
    return this.http.post<number>(`${API_CLIENTE}/Cancelar/${idCliente}`, { })
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
