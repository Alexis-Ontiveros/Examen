import { Route } from "@angular/router";

export default [
    {
        path: 'articulos/list',
        loadComponent: () => 
            import('./articulos/articulo-list/articulo-list.component'),
        title: 'Articulos'
    },
    {
        path: 'articulos/form',
        loadComponent: () => 
            import('./articulos/articulo-form/articulo-form.component'),
        title: 'Articulo'
    },
    {
        path: 'articulos/form/:id',
        loadComponent: () => 
            import('./articulos/articulo-form/articulo-form.component'),
        title: 'Articulo'
    },
    {
        path: 'tiendas/list',
        loadComponent: () => 
            import('./tiendas/tienda-list/tienda-list.component'),
        title: 'Tiendas'
    },
    {
        path: 'tiendas/form',
        loadComponent: () =>
            import('./tiendas/tienda-form/tienda-form.component'),
        title: 'Tienda'
    },
    {
        path: 'tiendas/form/:id',
        loadComponent: () =>
            import('./tiendas/tienda-form/tienda-form.component'),
        title: 'Tienda'
    },
    {
        path: 'tiendas/articulos/:id',
        loadComponent: () =>
            import('./tiendas/tienda-articulo/tienda-articulo.component'),
        title: 'Articulos'
    }
] as Route[];