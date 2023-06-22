import { Tienda } from '../tienda';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

import { RouterModule } from '@angular/router';
import { TiendaService } from '../tienda.service';

@Component({
    selector: 'app-tienda-list',
    standalone: true,
    providers: [ConfirmationService, MessageService, TiendaService],
    templateUrl: './tienda-list.component.html',
    styleUrls: ['./tienda-list.component.scss'],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        RouterModule,
        ConfirmDialogModule,
        ToastModule,
        DialogModule
    ]
})
export default class TiendaListComponent {
  TiendaId!: number;
  tiendas!: Tienda[];
  visibleModalArticulos: boolean = false;
  articulos: any[] = [];

  constructor(
    private service: TiendaService
    , private confirmationService: ConfirmationService
    , private messageService: MessageService) { }

  ngOnInit() {
    this.getTiendas();
  }

  getTiendas(): void {
    this.service.get().subscribe({
      next: (tiendas) => {
        this.tiendas = tiendas;
      },
      error: (error) => console.log(error)
    });
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
        message: 'Esta seguro de eliminar la tienda?',
        header: 'Eliminar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.service.delete(id).subscribe({
              next: () => {
                this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Registro eliminado correctamente' });
                this.getTiendas();
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
