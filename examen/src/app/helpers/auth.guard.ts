import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './auth.storage';

export const AuthGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const storageService = inject(StorageService);
    const router = inject(Router);
    const rol = storageService.getUserRole();

    if (storageService.isLoggedIn()) {
        
        if (route.data && route.data["role"] !== rol) {
            storageService.logout();
            router.navigateByUrl("/login");
            return false;
        }

        return true;
    }

    router.navigateByUrl("/login");
    return true;

};