import { Subject, takeUntil } from 'rxjs';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { Articulo } from '../../home/articulos/articulo';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/helpers/auth.storage';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-carrito-compra',
  standalone: true,
  imports: [
    CommonModule
    , TableModule
    , ButtonModule
    , RouterModule
    , ToastModule
    , TooltipModule
  ],
  providers: [ClienteService, MessageService],
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.scss']
})
export default class CarritoCompraComponent {
  path!: string;
  articulos!: Articulo[];
  private destroySubject: Subject<void> = new Subject();
  total!: number;

  constructor(
    private service: ClienteService
    , private route: ActivatedRoute
    , private storage: StorageService
    , private messageService: MessageService) { }

  ngOnInit() {

    this.route.params.pipe(
      takeUntil(this.destroySubject)
    ).subscribe(
      params => {
        this.path = params['path'];
        this.getArticulos();
      }
    );

  }

  activeControl(): boolean {
    return this.path === 'Pendientes'
  }

  getArticulos(): void {
    let user = JSON.parse(this.storage.getUser() || "[]");
    this.service.getCarrito(this.path, user.cliente.id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: (articulos) => {
        this.articulos = articulos;
        this.calculaTotal();
      },
      error: (error) => console.log(error)
    });
  }

  removeArticulo(idArticulos: number): void {
    let user = JSON.parse(this.storage.getUser() || "[]");
    this.service.removeArticulo(user.cliente.id, idArticulos).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: "Carrito", detail: `Articulo quitado` });
        this.getArticulos();
      },
      error: (error) => console.log(error)
    });
  }

  aprovarCompra(): void {
    let user = JSON.parse(this.storage.getUser() || "[]");
    this.service.aprovarCompra(user.cliente.id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: "Carrito", detail: `Compra realizada` });
        this.getArticulos();
      },
      error: (error) => console.log(error)
    });
  }

  cancelarCompra(): void {
    let user = JSON.parse(this.storage.getUser() || "[]");
    this.service.cancelarCompra(user.cliente.id).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: "Carrito", detail: `Compra cancelada` });
        this.getArticulos();
      },
      error: (error) => console.log(error)
    });
  }

  calculaTotal(): void {
    let sum: number = 0;
    this.articulos.forEach(a => sum += a.precio);
    this.total = sum;
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

}
