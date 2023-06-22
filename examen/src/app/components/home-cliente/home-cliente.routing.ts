import { Route } from "@angular/router";

export default [
  {
    path: 'cliente/dashboard',
    loadComponent: () => 
        import('./tiendas-articulos/tiendas-articulos.component'),
    title: 'Articulos'
  },
  {
    path: 'cliente/carrito/:path',
    loadComponent: () => 
        import('./carrito-compra/carrito-compra.component'),
    title: 'Carrito'
  }
] as Route[];