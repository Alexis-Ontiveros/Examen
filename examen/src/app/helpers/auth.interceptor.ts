import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError} from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from './auth.storage';

const USER_KEY = 'userToken';

export function AuthInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {

    const storageService = inject(StorageService);
    const router = inject(Router);

    if(storageService.isLoggedIn()) {
        let token = storageService.getToken();
        request = request.clone({ 
            setHeaders: { 
                    Authorization: `Bearer ${token}`
                } 
        });
    }

    return next(request)
        .pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                  console.log('event: ', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    storageService.logout();
                    router.navigateByUrl("/login", { replaceUrl: true });
                }
                return throwError(() => error);
            }));
}