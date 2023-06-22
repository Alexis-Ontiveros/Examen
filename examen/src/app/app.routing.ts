import { Route } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

export const app_route: Route[] = [
    {
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    { 
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
        loadChildren: () => import('./components/home/home.routing'),
        canActivate: [AuthGuard],
        data: { role: 'Admin' }
    },
    {
        path: 'home-client',
        loadComponent: () => import('./components/home-cliente/home-cliente.component').then(c => c.HomeClienteComponent),
        loadChildren: () => import('./components/home-cliente/home-cliente.routing'),
        canActivate: [AuthGuard],
        data: { role: 'Cliente' }
    },
];