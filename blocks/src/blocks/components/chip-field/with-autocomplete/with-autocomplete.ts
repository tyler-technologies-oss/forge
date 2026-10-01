import type { IAutocompleteComponent, IAutocompleteSelectEventData } from '@tylertech/forge/autocomplete';
import type { IChipFieldComponent } from '@tylertech/forge/chip-field';
import type { IOption } from '@tylertech/forge/select';

const US_STATES: IOption[] = [
  { label: 'Alabama', value: 'AL' }, { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' }, { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' }, { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' }, { label: 'Delaware', value: 'DE' },
  { label: 'Florida', value: 'FL' }, { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' }, { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' }, { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' }, { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' }, { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' }, { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' }, { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' }, { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' }, { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' }, { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' }, { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' }, { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' }, { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' }, { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' }, { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' }, { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' }, { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' }, { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' }, { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' }, { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' }, { label: 'Wyoming', value: 'WY' }
];

const autocomplete = document.querySelector<IAutocompleteComponent>('forge-autocomplete');
const chipField = document.querySelector<IChipFieldComponent>('forge-chip-field');
const selectedValues: string[] = [];

function addMember(value: string): void {
  if (!chipField) {
    return;
  }
  const chip = document.createElement('forge-chip');
  chip.setAttribute('slot', 'member');
  chip.type = 'field';
  chip.dense = true;
  chip.value = value;
  chip.textContent = value;

  chip.addEventListener('forge-chip-delete', () => {
    chip.remove();
    const index = selectedValues.indexOf(value);
    if (index !== -1) {
      selectedValues.splice(index, 1);
    }
  });

  chipField.appendChild(chip);
}

if (autocomplete) {
  autocomplete.filter = (filterText: string): IOption[] => {
    const remaining = US_STATES.filter(({ value }) => !selectedValues.includes(value));
    return remaining.filter(({ label }) => label.toLowerCase().includes(filterText.toLowerCase()));
  };

  autocomplete.addEventListener('forge-autocomplete-select', event => {
    const { detail } = event as CustomEvent<IAutocompleteSelectEventData>;
    if (!selectedValues.includes(detail.value)) {
      addMember(detail.value);
      selectedValues.push(detail.value);
    }
  });
}
