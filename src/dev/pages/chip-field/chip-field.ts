import '$src/shared';
import { FieldLabelAlignment, FieldLabelPosition, IAutocompleteComponent, IChipComponent, IChipFieldComponent, IconRegistry, ISelectComponent, ISwitchComponent } from '@tylertech/forge';
import '@tylertech/forge/chip-field';
import '@tylertech/forge/autocomplete';
import data from '../autocomplete/data.json';
import { tylIconArrowDropDown, tylIconPlace } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconPlace,
  tylIconArrowDropDown
]);

const simpleChipField = document.querySelector('#demo-simple-chip-field') as IChipFieldComponent;
const autocompleteComponent = document.querySelector('#demo-autocomplete') as IAutocompleteComponent;
const autocompleteChipField = autocompleteComponent.querySelector('#demo-autocomplete-chip-field') as IChipFieldComponent;
const autocompleteChipFieldInput = autocompleteChipField.querySelector('#autocomplete-chip-field-input') as HTMLInputElement;
let selectedAutocompleteValues: string[] = [];

simpleChipField.addEventListener('forge-chip-field-member-added', ({ detail: name }) => {
  const newChip = document.createElement('forge-chip');
  newChip.setAttribute('slot', 'member');
  newChip.type = 'field';
  newChip.dense = true;
  newChip.value = name;
  newChip.textContent = name;

  newChip.addEventListener('forge-chip-delete', () => {
    if (newChip.disabled) {
      return;
    }
    newChip.remove();
  });

  simpleChipField.appendChild(newChip);
});

simpleChipField.addEventListener('forge-chip-field-member-removed', ({ detail }) => {
  simpleChipField.removeChild(detail);
});

autocompleteComponent.filter = filter => {
  return data.filter(({ label }) => label.toLowerCase().includes(filter.toLowerCase()));
};

autocompleteComponent.addEventListener('forge-autocomplete-select', ({ detail: { value }}) => {
  const exists = selectedAutocompleteValues.includes(value);
  if (!exists) {
    addMember(value);
  } else {
    removeMember(value);
  }
});

autocompleteChipField.addEventListener('forge-chip-field-member-removed', ({ detail }) => {
  const chip = detail as IChipComponent;
  autocompleteComponent.value = selectedAutocompleteValues.filter(v => v !== chip.value);
  removeMember(chip.value as string);
});

function onRemoveMemberEvent(evt): void {
  if (evt.target.disabled) {
    return;
  }

  removeMember(evt.target.value);
}

function addAutocompleteMember(value: string): void {
  if (!autocompleteComponent) {
    return;
  }

  if (selectedAutocompleteValues.includes(value)) {
    return;
  }

  selectedAutocompleteValues.push(value);
  autocompleteComponent.value = [...selectedAutocompleteValues];
}

function addChipFieldMember(name: string): void {
  const existingValues = Array.from(autocompleteChipField.querySelectorAll('forge-chip')).map(({ value }) => value);
  if (existingValues.includes(name)) {
    return;
  }

  const newChip = document.createElement('forge-chip');
  newChip.setAttribute('slot', 'member');
  newChip.type = 'field';
  newChip.dense = true;
  newChip.invalid = invalidToggle.selected;
  newChip.value = name;
  newChip.textContent = name;

  newChip.addEventListener('forge-chip-delete', onRemoveMemberEvent);

  const icon = document.createElement('forge-icon');
  icon.setAttribute('slot', 'leading');
  icon.name = 'place';

  newChip.appendChild(icon);
  autocompleteChipField.appendChild(newChip);
}

function addMember(name: string): void {
  addChipFieldMember(name);
  addAutocompleteMember(name);
}

function removeAutocompleteMember(value: string): void {
  if (!autocompleteComponent) {
    return;
  }

  const index = selectedAutocompleteValues.indexOf(value);
  if (index < 0) {
    return;
  }

  selectedAutocompleteValues.splice(index, 1);
  autocompleteComponent.value = [...selectedAutocompleteValues];
}

function removeChipFieldMember(name: string): void {
  const elementToRemove = Array.from(autocompleteChipField.querySelectorAll('forge-chip')).find(({ value }) => value === name);
  if (elementToRemove) {
    elementToRemove.remove();
  }
}

function removeMember(name: string): void {
  removeChipFieldMember(name);
  removeAutocompleteMember(name);
}

function populateMembers(numberOfMembers: number): void {
  removeAllMembers();
  let count = 0;
  while (count < numberOfMembers) {
    addMember(data[count].value);
    count++;
  }

  setChipsDisabledState(autocompleteChipFieldInput.disabled);
}

function removeAllMembers(): void {
  selectedAutocompleteValues = [];
  autocompleteChipField.querySelectorAll('forge-chip').forEach(chip => chip.remove());
}

const densitySelect = document.querySelector('#opt-density') as ISelectComponent;
densitySelect.addEventListener('change', ({ detail }) => {
  simpleChipField.density = detail;
  autocompleteChipField.density = detail;
});

const labelPositionSelect = document.querySelector('#opt-label-position') as ISelectComponent;
labelPositionSelect.addEventListener('change', () => {
  simpleChipField.labelPosition = labelPositionSelect.value as FieldLabelPosition;
  autocompleteChipField.labelPosition = labelPositionSelect.value as FieldLabelPosition;
});

const labelAlignmentSelect = document.querySelector('#opt-label-alignment') as ISelectComponent;
labelAlignmentSelect.addEventListener('change', () => {
  simpleChipField.labelAlignment = labelAlignmentSelect.value as FieldLabelAlignment;
  autocompleteChipField.labelAlignment = labelAlignmentSelect.value as FieldLabelAlignment;
});

const variantSelect = document.querySelector('#opt-variant') as ISelectComponent;
variantSelect.addEventListener('change', ({ detail }) => {
  simpleChipField.variant = detail;
  autocompleteChipField.variant = detail;
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  simpleChipField.theme = detail;
  autocompleteChipField.theme = detail;
});

const floatLabelToggle = document.querySelector('#opt-float-label') as ISwitchComponent;
floatLabelToggle.addEventListener('forge-switch-change', ({ detail }) => {
  simpleChipField.floatLabel = detail;
  autocompleteChipField.floatLabel = detail;
});

const requiredToggle = document.querySelector('#opt-required') as ISwitchComponent;
requiredToggle.addEventListener('forge-switch-change', ({ detail: isRequired }: CustomEvent<boolean>) => {
  simpleChipField.required = isRequired;
  autocompleteChipField.required = isRequired;
});

const invalidToggle = document.querySelector('#opt-invalid') as ISwitchComponent;
invalidToggle.addEventListener('forge-switch-change', ({ detail: isInvalid }: CustomEvent<boolean>) => {
  simpleChipField.invalid = isInvalid;
  autocompleteChipField.invalid = isInvalid;

  const chips = autocompleteChipField.querySelectorAll('forge-chip');
  chips.forEach(({ invalid }) => invalid = isInvalid);
});

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: isDisabled }: CustomEvent<boolean>) => {
  simpleChipField.disabled = isDisabled;
  autocompleteChipFieldInput.disabled = isDisabled;
  setChipsDisabledState(isDisabled);
});

const denseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail }: CustomEvent<boolean>) => {
  simpleChipField.dense = detail;
  autocompleteChipField.dense = detail;
});

const onBlurToggle = document.querySelector('#opt-add-on-blur') as ISwitchComponent;
onBlurToggle.addEventListener('forge-switch-change', ({ detail: addOnBlur }: CustomEvent<boolean>) => {
  simpleChipField.addOnBlur = addOnBlur;
});

const populateButton = document.querySelector('#opt-btn-populate') as HTMLButtonElement;
populateButton.addEventListener('click', () => populateMembers(45));

const clearButton = document.querySelector('#opt-btn-clear') as HTMLButtonElement;
clearButton.addEventListener('click', removeAllMembers);

function setChipsDisabledState(isDisabled: boolean): void {
  const chips = [
    ...simpleChipField.querySelectorAll('forge-chip'),
    ...autocompleteChipField.querySelectorAll('forge-chip')
  ];
  chips.forEach(chip => chip.disabled = isDisabled);
}
