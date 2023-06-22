import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';

import { PrimeNGConfig } from 'primeng/api';
import { StorageService } from 'src/app/helpers/auth.storage';

@Component({
  selector: 'app-home-cliente',
  standalone: true,
  imports: [
    CommonModule
    , RouterModule
    , MenubarModule
    , RippleModule
    , ButtonModule
  ],
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss']
})
export class HomeClienteComponent {

  items: MenuItem[] = [];

  constructor(private primengConfig: PrimeNGConfig, private router:Router, private storage: StorageService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: 'cliente/dashboard'
      },
      {
        label: 'En el carrito',
        icon: 'pi pi-fw pi-cart-plus',
        items: [
          {
            icon: 'pi pi-fw pi-cart-plus',
            label: 'En el carrito',
            routerLink: 'cliente/carrito/Pendientes'
          },
          {
            icon: 'pi pi-fw pi-shopping-bag',
            label: 'Mis compras',
            routerLink: 'cliente/carrito/Compras'
          },
          {
            icon: 'pi pi-fw pi-shopping-cart',
            label: 'Canceladas',
            routerLink: 'cliente/carrito/Cancelados'
          }
        ]
      }
    ];
  }

  cerrarSesion() {
    this.storage.logout();
    this.router.navigateByUrl("/login");
  }
}
