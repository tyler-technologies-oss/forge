import { Component, OnInit } from '@angular/core';
import { AutocompleteFilterCallback, IOption, IconRegistry } from '@tylertech/forge';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons';
import { DemoCardComponent } from '../../../components/demo-card/demo-card.component';
import { ForgeAutocompleteProxyModule, ForgeAutocompleteModule, ForgeTextFieldModule, ForgeIconModule } from '@tylertech/forge-angular';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  imports: [DemoCardComponent, ForgeAutocompleteProxyModule, ForgeAutocompleteModule, FormsModule, ForgeTextFieldModule, ForgeIconModule, JsonPipe]
})
export class AutocompleteComponent implements OnInit {
  public selectedState?: IOption<string>;
  public selectedStates: IOption<string>[] = [];
  public filterListener: AutocompleteFilterCallback = filter => this._onFilter(filter);

  constructor() {
    IconRegistry.define(tylIconArrowDropDown);
  }

  public ngOnInit(): void {
    this.selectedState = this.states.find(o => o.value === 'ME');
    this.selectedStates = this.states.filter(o => ['ME', 'NH', 'VT'].includes(o.value));
  }

  private _onFilter(filter: string): IOption[] {
    return this.states.filter(state => state.label.toLowerCase().includes(filter.toLowerCase()));
  }

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
    { label: 'Lousiana', value: 'LA' },
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
}
