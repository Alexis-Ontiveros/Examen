import { Subject, takeUntil } from 'rxjs';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { ClienteService } from '../cliente.service';
import { MessageService } from 'primeng/api';

import { TiendaArticulos } from './tienda_articulos';
import { StorageService } from 'src/app/helpers/auth.storage';

@Component({
  selector: 'app-tiendas-articulos',
  standalone: true,
  imports: [
    CommonModule
    , CarouselModule
    , TagModule
    , FieldsetModule
    , DividerModule
    , ButtonModule
    , ToastModule
  ],providers: [ClienteService, MessageService],
  templateUrl: './tiendas-articulos.component.html',
  styleUrls: ['./tiendas-articulos.component.scss']
})
export default class TiendasArticulosComponent {

  tiendas!: TiendaArticulos[];
  private destroySubject: Subject<void> = new Subject();

  constructor(private service: ClienteService, private messageService: MessageService, private storage: StorageService) {}

  ngOnInit(): void {
    this.getArticulos();
  }

  getSeverity(stock: number): string {

    if(stock > 5) {
      return "success";
    }

    if(stock > 0 && stock <= 5) {
      return 'warning'; 
    }

    return 'danger';
  }

  getArticulos(): void {
    this.service.getArticulos().pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: (tiendas) => {
        console.log(tiendas)
        this.tiendas = tiendas;
      },
      error: (error) => console.log(error)
    });
  }

  addArticulo(id: number): void {

    let user = JSON.parse(this.storage.getUser() || "[]");

    let value = {
      IdCliente: user.cliente.id,
      IdArticulo: id
    };

    this.service.addArticulo(value).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: "Carrito", detail: `Articulo agregado al carrito` });
      },
      error: (error) => {
        this.messageService.add({ severity: 'warn', summary: "Carrito", detail: `Error al agregar al carrito` });
        console.log(error)
      }
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

}
