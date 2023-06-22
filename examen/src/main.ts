import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { app_route } from './app/app.routing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/helpers/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(app_route),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ]
})
  .catch(err => console.error(err));
