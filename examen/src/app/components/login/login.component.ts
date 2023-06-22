import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';

import { MessageService } from 'primeng/api';
import { LoginService } from './login.service';
import { StorageService } from 'src/app/helpers/auth.storage';
import { Usuario } from './usuario';

import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
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
    , PasswordModule
  ],
  providers: [MessageService, LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  visible: boolean = false;

  form: FormGroup = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private primengConfig: PrimeNGConfig
    , private formBuilder: FormBuilder
    , private messageService: MessageService
    , private authService: LoginService
    , private storageService: StorageService
    , private router: Router
    ) { }

  ngOnInit(): void {

    this.primengConfig.ripple = true;
    if(this.storageService.isLoggedIn()) {
      this.routeUser();
    } else {
      this.showDialog();
      this.buildForm();
    }
    
  }

  showDialog(): void {
      this.visible = true;
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      userName: ['IOntiveros', [Validators.required]],
      password: ['Ontiveros1992', [Validators.required]]
    });
  }

  onSubmit(): void {

    if(this.form.invalid) {
      if(this.form.get('userName')?.invalid) {
        this.messageService.add({ severity: 'warn', summary: 'Nombre de usuario', detail: 'El nombre de usuario es requerido' });
      }

      if(this.form.get('password')?.invalid) {
        this.messageService.add({ severity: 'warn', summary: 'Contraseña', detail: 'La contraseña es requerida' });
      }

      return;
    }

    this.login();

  }

  routeUser(): void {
    const path = this.storageService.getPath();
    this.router.navigateByUrl(path || "/login");
  }

  login(): void {
    let user: Usuario = new Usuario();

    user.UserName = this.form.get('userName')?.value;
    user.Password = this.form.get('password')?.value

    this.authService.login(user).subscribe({
      next: () => {
        this.routeUser();
      },
      error: (error) => console.log(error)
    });
  }
}
