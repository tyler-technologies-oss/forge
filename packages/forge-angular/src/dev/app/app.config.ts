import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export function getAppConfig(): ApplicationConfig {
  // Create the application config
  const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(withInterceptorsFromDi())]
  };

  return appConfig;
}
