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
import { ArticuloService } from 'src/app/components/home/articulos/articulo.service';
import { Articulo } from '../articulo';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-articulo-form',
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
  providers: [MessageService, ArticuloService],
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.scss']
})
export default class ArticuloFormComponent {
  id!: number;
  articulo!: Articulo;
  img: any;
  private destroySubject: Subject<void> = new Subject();
  uploadedFiles: any[] = [];
  
  fileName!: string;

  formData = new FormData();

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl(''),
    stock: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute
    , private router: Router
    , private articuloServie: ArticuloService
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
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      stock: ['', [Validators.required]]
    });
  }

  validaParamId(): void {
    this.route.params.pipe(
      takeUntil(this.destroySubject)
    ).subscribe(params => {
       this.id = +params['id'];
       this.getArticulo();
    });
  }

  getArticulo(): void {
    if(!isNaN(this.id)) {
      this.articuloServie.getById(this.id).pipe(
        takeUntil(this.destroySubject)
      ).subscribe({
        next: (articulo) => {
          this.form.patchValue({
            codigo: articulo.codigo,
            descripcion: articulo.descripcion,
            precio: articulo.precio,
            stock: articulo.stock
          });
          this.img = articulo.imagen
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

      this.formData.append('codigo', this.form.get('codigo')?.value);
      this.formData.append('descripcion', this.form.get('descripcion')?.value);
      this.formData.append('precio', this.form.get('precio')?.value);
      this.formData.append('stock', this.form.get('stock')?.value);

      if(isNaN(this.id)) {
        this.guardaArticulo();
      } else {
        this.actualizaArticulo();
      }
  }

  guardaArticulo(): void {
    this.articuloServie.add(this.formData).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: "Guardado", detail: `Articulo guardado correctamente` });
        this.router.navigateByUrl("/home/articulos/list", { replaceUrl: true });
      },
      error: (error) => 
        this.messageService.add({ severity: 'error', summary: "Guardado", detail: error })
    });
  }

  actualizaArticulo(): void {
    this.articuloServie.update(this.id, this.formData).pipe(
      takeUntil(this.destroySubject)
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: "Actualizado", detail: `Articulo actualizado correctamente` }),
        this.router.navigateByUrl("/home/articulos/list", { replaceUrl: true });
      },
      error: (error) => 
        this.messageService.add({ severity: 'error', summary: "Actualizado", detail: error })
    });
  }

  selectFile(event: any): void {
    const file:File = event.target.files[0];
    this.fileName = file.name;
    if(file) {
      this.formData.append('imagen', file);
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }
  
}
