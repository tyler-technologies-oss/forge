import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ForgeAutocompleteModule, ForgeAutocompleteProxyModule, ForgeIconModule, ForgeTextFieldModule } from '@tylertech/forge-angular';

import { AutocompleteComponent } from './autocomplete.component';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForgeAutocompleteModule,
    ForgeAutocompleteProxyModule,
    ForgeIconModule,
    ForgeTextFieldModule,
    DemoCardComponent,
    AutocompleteComponent
  ]
})
export class AutocompleteModule {}
