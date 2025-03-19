import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apiRequestInterceptor } from './interceptors/api-request.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [ provideRouter(routes),provideHttpClient(withFetch(),withInterceptors([apiRequestInterceptor])), provideAnimations(), provideClientHydration()]
};
