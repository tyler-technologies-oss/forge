import { Component } from '@angular/core';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ChipFieldSimpleComponent } from './chip-field-simple/chip-field-simple.component';
import { ForgeDividerModule } from '@tylertech/forge-angular';
import { ChipFieldSimpleReactiveFormComponent } from './chip-field-simple-reactive-form/chip-field-simple-reactive-form.component';
import { ChipFieldAutocompleteComponent } from './chip-field-autocomplete/chip-field-autocomplete.component';
import { ChipFieldAutocompleteReactiveFormComponent } from './chip-field-autocomplete-reactive-form/chip-field-autocomplete-reactive-form.component';

@Component({
  selector: 'app-chip-field',
  templateUrl: './chip-field.component.html',
  styleUrls: ['./chip-field.component.scss'],
  imports: [
    DemoCardComponent,
    ChipFieldSimpleComponent,
    ForgeDividerModule,
    ChipFieldSimpleReactiveFormComponent,
    ChipFieldAutocompleteComponent,
    ChipFieldAutocompleteReactiveFormComponent
  ]
})
export class ChipFieldComponent {}
