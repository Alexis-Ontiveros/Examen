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
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule
    , RouterModule
    , MenubarModule
    , RippleModule
    , ButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  items: MenuItem[] = [];

  constructor(private primengConfig: PrimeNGConfig, private router:Router, private storage: StorageService) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.items = [
      {
        label: 'Articulos',
        icon: 'pi pi-fw pi-database',
        items: [
          {
            label: 'Agregar',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: 'articulos/form'
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'Lista de articulos',
            routerLink: 'articulos/list'
          }
        ]
      },
      {
        label: 'Tiendas',
        icon: 'pi pi-fw pi-sitemap',
        items: [
          {
            label: 'Agregar',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: 'tiendas/form'
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'Lista de articulos',
            routerLink: 'tiendas/list'
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
