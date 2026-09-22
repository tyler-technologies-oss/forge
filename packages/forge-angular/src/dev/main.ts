import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { getAppConfig } from './app/app.config';

// Uncomment to test global configuration
// window.TylerForgeGlobalConfiguration = {
//   'forge-text-field': {
//     'labelPosition': 'block-start'
//   }
// };

if (environment.production) {
  enableProdMode();
}

const appConfig = getAppConfig();
bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
