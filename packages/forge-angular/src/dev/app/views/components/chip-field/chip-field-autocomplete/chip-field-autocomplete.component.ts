import { Component } from '@angular/core';
import { AutocompleteFilterCallback, IChipComponent, IChipDeleteEventData, IOption } from '@tylertech/forge';
import {
  ForgeAutocompleteProxyModule,
  ForgeAutocompleteModule,
  ForgeChipFieldModule,
  ForgeChipProxyModule,
  ForgeIconModule,
  ForgeCheckboxProxyModule,
  ForgeCheckboxModule
} from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chip-field-autocomplete',
  templateUrl: './chip-field-autocomplete.component.html',
  styleUrls: ['./chip-field-autocomplete.component.scss'],
  imports: [
    ForgeAutocompleteProxyModule,
    ForgeAutocompleteModule,
    FormsModule,
    ForgeChipFieldModule,
    ForgeChipProxyModule,
    ForgeIconModule,
    ForgeCheckboxProxyModule,
    ForgeCheckboxModule
  ]
})
export class ChipFieldAutocompleteComponent {
  public isRequired = false;
  public isInvalid = false;
  public isDisabled = false;
  public isDense = true;
  public states: IOption<string>[] = [
    { label: 'Alabama', value: 'AL' },
    { label: 'Alaska', value: 'AK' },
    { label: 'Arizona', value: 'AZ' },
    { label: 'Arkansas', value: 'AR' },
    { label: 'California', value: 'CA' },
    { label: 'Colorado', value: 'CO' },
    { label: 'Connecticut', value: 'CT' },
    { label: 'Delaware', value: 'DE' },
    { label: 'Florida', value: 'FL' },
    { label: 'Georgia', value: 'GA' },
    { label: 'Hawaii', value: 'HI' },
    { label: 'Idaho', value: 'ID' },
    { label: 'Illinois', value: 'IL' },
    { label: 'Indiana', value: 'IN' },
    { label: 'Iowa', value: 'IA' },
    { label: 'Kansas', value: 'KS' },
    { label: 'Kentucky', value: 'KY' },
    { label: 'Louisiana', value: 'LA' },
    { label: 'Maine', value: 'ME' },
    { label: 'Maryland', value: 'MD' },
    { label: 'Massachusetts', value: 'MA' },
    { label: 'Michigan', value: 'MI' },
    { label: 'Minnesota', value: 'MN' },
    { label: 'Mississippi', value: 'MS' },
    { label: 'Missouri', value: 'MO' },
    { label: 'Montana', value: 'MT' },
    { label: 'Nebraska', value: 'NE' },
    { label: 'Nevada', value: 'NV' },
    { label: 'New Hampshire', value: 'NH' },
    { label: 'New Jersey', value: 'NJ' },
    { label: 'New Mexico', value: 'NM' },
    { label: 'New York', value: 'NY' },
    { label: 'North Carolina', value: 'NC' },
    { label: 'North Dakota', value: 'ND' },
    { label: 'Ohio', value: 'OH' },
    { label: 'Oklahoma', value: 'OK' },
    { label: 'Oregon', value: 'OR' },
    { label: 'Pennsylvania', value: 'PA' },
    { label: 'Rhode Island', value: 'RI' },
    { label: 'South Carolina', value: 'SC' },
    { label: 'South Dakota', value: 'SD' },
    { label: 'Tennessee', value: 'TN' },
    { label: 'Texas', value: 'TX' },
    { label: 'Utah', value: 'UT' },
    { label: 'Vermont', value: 'VT' },
    { label: 'Virginia', value: 'VA' },
    { label: 'Washington', value: 'WA' },
    { label: 'West Virginia', value: 'WV' },
    { label: 'Wisconsin', value: 'WI' },
    { label: 'Wyoming', value: 'WY' }
  ];

  public selectedStates: string[] = ['AL', 'WY'];

  public filterListener: AutocompleteFilterCallback = filter => this._onFilter(filter);

  public deselectState(event$: CustomEvent<HTMLElement | IChipDeleteEventData>): void {
    const value = (event$.detail as IChipComponent | IChipDeleteEventData).value;
    const newStatesArray = [...this.selectedStates];
    const index = newStatesArray.findIndex(x => x === value);
    if (index === -1) {
      return;
    }

    newStatesArray.splice(index, 1);
    this.selectedStates = newStatesArray;
  }

  public selectState(event$: CustomEvent<string>): void {
    const value = event$.detail.trim().toUpperCase();
    if (!this._valueIsAllowed(value)) {
      return;
    }

    this.selectedStates.push(value);
  }

  private _onFilter(filter: string): IOption<string>[] {
    return this.states.filter(state => state.label.toLowerCase().includes(filter.toLowerCase()));
  }

  private _valueIsAllowed(value: string): boolean {
    const safeValue = value.toUpperCase().trim();
    const matchesDataSet = this.states.findIndex(s => s.value === safeValue) > -1;
    const isAlreadySelected = this.selectedStates.includes(safeValue);
    return matchesDataSet && !isAlreadySelected;
  }
}
