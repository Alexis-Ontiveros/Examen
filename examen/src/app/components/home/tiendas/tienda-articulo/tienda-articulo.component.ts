import { Subject, takeUntil } from 'rxjs';
import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PickListModule } from 'primeng/picklist';
import { FieldsetModule } from 'primeng/fieldset';
import { RouterModule } from '@angular/router';

import { TiendaService } from '../tienda.service';
import { MessageService } from 'primeng/api';

import { ActivatedRoute } from '@angular/router';

import { Articulo } from '../../articulos/articulo';

@Component({
  selector: 'app-tienda-articulo',
  standalone: true,
  imports: [
    CommonModule
    , ButtonModule
    , RouterModule
    , ConfirmDialogModule
    , ToastModule
    , PickListModule
    , FieldsetModule
  ],
  providers: [TiendaService, MessageService],
  templateUrl: './tienda-articulo.component.html',
  styleUrls: ['./tienda-articulo.component.scss']
})
export default class TiendaArticuloComponent {
  tiendaId!: number;

  articulosSource: Articulo[] = [];
  articulosTarget: Articulo[] = [];

  tiendaInfo!: string;

  private destroySubject: Subject<void> = new Subject();

  constructor(
    private service: TiendaService
    , private route: ActivatedRoute
    , private messageService: MessageService) { }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.destroySubject)
    ).subscribe(params => {
       this.tiendaId = +params['id'];
       this.getTiendaInfo();
       this.getArticulos();
    });
  }

  getTiendaInfo(): void {
    this.service.getById(this.tiendaId )
      .pipe(
        takeUntil(this.destroySubject)
      )
      .subscribe({
        next: (info) => {
          this.tiendaInfo = `${info.sucursal} - ${info.direccion}`;
        }
      })
  }

  getArticulos(): void {    
    this.service.getByTiendaId(this.tiendaId )
      .pipe(
        takeUntil(this.destroySubject)
      )
      .subscribe({
        next: (articulos) => {
          this.articulosTarget = articulos;
        },
        error: (error) => {
          this.messageService.add({ severity: 'warn', summary: "Articulos", detail: 'Ocurrio un error al obtener los articulos' });
          console.log(error);
        }
      });

      this.service.getArticulosNoAsignados(this.tiendaId )
        .pipe(
          takeUntil(this.destroySubject)
        )
        .subscribe({
          next: (articulos) => {
            this.articulosSource = articulos;
          },
          error: (error) => {
            this.messageService.add({ severity: 'warn', summary: "Articulos", detail: 'Ocurrio un error al obtener los articulos' });
            console.log(error);
          }
        });
  }

  quitarArticulo(event: any): void {
    if(event.items) {
      let articuloId = +event.items[0].id
      this.service.removeArticuloTienda(this.tiendaId, articuloId)
        .pipe(
          takeUntil(this.destroySubject)
        )
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: "Remover", detail: `Articulo removido correctamente` });
            this.getArticulos();
          },
          error: (error) => {
            this.messageService.add({ severity: 'warn', summary: "Articulos", detail: 'Ocurrio un error al remover el articulos' });
            console.log(error);
          }
        });
    }
  }

  agregarArticulo(event: any): void {
    if(event.items) {
      let articuloId = +event.items[0].id
      this.service.addArticuloTienda(this.tiendaId, articuloId)
        .pipe(
          takeUntil(this.destroySubject)
        )
        .subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: "Agregar", detail: `Articulo agregado correctamente` });
            this.getArticulos();
          },
          error: (error) => {
            this.messageService.add({ severity: 'warn', summary: "Articulos", detail: 'Ocurrio un error al agregar el articulos' });
            console.log(error);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

}
