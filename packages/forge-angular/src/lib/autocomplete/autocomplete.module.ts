import { NgModule } from '@angular/core';

import { AutocompleteValueAccessor } from './autocomplete-value-accessor.directive';
import { ForgeAutocompleteProxyModule } from './autocomplete-proxy.module';

@NgModule({
  declarations: [AutocompleteValueAccessor],
  exports: [AutocompleteValueAccessor, ForgeAutocompleteProxyModule]
})
export class ForgeAutocompleteModule {}
