import { Subject, takeUntil } from 'rxjs';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

import { PrimeNGConfig } from 'primeng/api';
import { Tienda } from '../tienda';
import { TiendaService } from '../tienda.service';

@Component({
  selector: 'app-tienda-form',
  standalone: true,
  imports: [
    CommonModule
    , FormsModule
    , InputTextModule
    , CardModule
    , ButtonModule
    , DialogModule
    , ReactiveFormsModule
    , ToastModule
    , RouterModule
  ],
  providers: [MessageService, TiendaService],
  templateUrl: './tienda-form.component.html',
  styleUrls: ['./tienda-form.component.scss']
})
export default class TiendaFormComponent {

  id!: number;
  tienda!: Tienda;
  private destroySubject: Subject<void> = new Subject();

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    sucursal: new FormControl(''),
    direccion: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute
    , private router: Router
    , private service: TiendaService
    , private primengConfig: PrimeNGConfig
    , private formBuilder: FormBuilder
    , private messageService: MessageService
  ) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.buildForm();
    this.validaParamId();
  }

  validateId(): boolean {
    return isNaN(this.id)
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      sucursal: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  validaParamId(): void {
    this.route.params.pipe(
      takeUntil(this.destroySubject)
    ).subscribe(params => {
       this.id = +params['id'];
       this.getTiendas();
    });
  }

  getTiendas(): void {
    if(!isNaN(this.id)) {
      this.service.getById(this.id).pipe(
        takeUntil(this.destroySubject)
      ).subscribe({
        next: (tienda) => {
          this.form.patchValue(tienda);
        },
        error: (error) => console.log(error)
      });
    }
  }

  validateForm(): boolean {

    if(this.form.invalid) {      
      Object.keys(this.form.controls).forEach(key => {
        if(this.form.get(key)?.invalid) {
          this.messageService.add({ severity: 'warn', summary: key, detail: `El campo: "${key}" es requerido` });
        }
      }); 
      return false;
    }
    return true;
  }

  onSubmit(): void {

    this.tienda = {
      id: 0,
      sucursal: this.form.get('sucursal')?.value,
      direccion: this.form.get('direccion')?.value
    };

    if(isNaN(this.id)) {
      this.guardaTienda();
    } else {
      this.actualizaTienda();
    }
}

  guardaTienda(): void {
    this.service.add(this.tienda).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: "Guardado", detail: `Tienda guardada correctamente` });
        this.router.navigateByUrl("/home/tiendas/list", { replaceUrl: true });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: "Guardado", detail: 'Error al guardar' });
        console.log(error);        
      }        
    });
  }

  actualizaTienda(): void {
    this.service.update(this.id, this.tienda).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: "Actualizado", detail: `Tienda actualizada correctamente` }),
        this.router.navigateByUrl("/home/tiendas/list", { replaceUrl: true });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: "Actualizar", detail: 'Error al guardar' });
        console.log(error);        
      } 
    });
  }
}
