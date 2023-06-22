import { ArticuloService } from '../articulo.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

import { Articulo } from '../articulo';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-articulo-list',
  standalone: true,
  imports: [
    CommonModule
    , TableModule
    , ButtonModule
    , RouterModule
    , ConfirmDialogModule
    , ToastModule
  ],
  providers: [ConfirmationService, MessageService, ArticuloService],
  templateUrl: './articulo-list.component.html',
  styleUrls: ['./articulo-list.component.scss']
})
export default class ArticuloListComponent {

  articulos!: Articulo[];

  constructor(private service: ArticuloService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit() {
    this.getArticulos();
  }

  getArticulos(): void {
    this.service.get().subscribe({
      next: (articulos) => {
        this.articulos = articulos;
      },
      error: (error) => console.log(error)
    });
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
        message: 'Esta seguro de eliminar el articulo?',
        header: 'Eliminar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.service.delete(id).subscribe({
              next: () => {
                this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Registro eliminado correctamente' });
                this.getArticulos();
              },
              error: (error) => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el registro' })
            });
        },
        reject: (type: any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                  console.log('REJECT');
                  break;
                case ConfirmEventType.CANCEL:
                  console.log('CANCEL');
                  break;
            }
        }
    });
  }

  showImage(imageArray: any): string {
    const blob = new Blob([imageArray]);
    return URL.createObjectURL(blob);
  }

}
