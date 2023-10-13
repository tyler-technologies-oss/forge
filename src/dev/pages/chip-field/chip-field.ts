import '$src/shared';
import { IAutocompleteComponent, IChipComponent, IChipFieldComponent, IconRegistry, ISwitchComponent } from '@tylertech/forge';
import '@tylertech/forge/chip-field';
import '@tylertech/forge/autocomplete';
import data from '../autocomplete/data.json';
import { tylIconArrowDropDown, tylIconPlace } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconPlace,
  tylIconArrowDropDown
]);

const simpleChipField = document.querySelector('#demo-simple-chip-field') as IChipFieldComponent;
const onBlurChipField = document.querySelector('#demo-onblur-chip-field') as IChipFieldComponent;
const autocompleteComponent = document.querySelector('#demo-autocomplete') as IAutocompleteComponent;
const autocompleteChipField = autocompleteComponent.querySelector('#demo-autocomplete-chip-field') as IChipFieldComponent;
const autocompleteChipFieldInput = autocompleteChipField.querySelector('#autocomplete-chip-field-input') as HTMLInputElement;
let selectedAutocompleteValues: string[] = [];

const requiredToggle = document.querySelector('#opt-required') as ISwitchComponent;
const invalidToggle = document.querySelector('#opt-invalid') as ISwitchComponent;
const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
const denseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
const populateButton = document.querySelector('#opt-btn-populate') as HTMLButtonElement;
const clearButton = document.querySelector('#opt-btn-clear') as HTMLButtonElement;

requiredToggle.addEventListener('forge-switch-select', updateRequiredState);
invalidToggle.addEventListener('forge-switch-select', updateInvalidState);
disabledToggle.addEventListener('forge-switch-select', updateDisabledState);
denseToggle.addEventListener('forge-switch-select', updateDenseState);
populateButton.addEventListener('click', () => populateMembers(45));
clearButton.addEventListener('click', removeAllMembers);

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


onBlurChipField.addEventListener('forge-chip-field-member-added', ({ detail: name }) => {
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

  onBlurChipField.appendChild(newChip);
});

onBlurChipField.addEventListener('forge-chip-field-member-removed', ({ detail }) => {
  onBlurChipField.removeChild(detail);
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

function updateRequiredState({ detail: isRequired }: CustomEvent<boolean>): void {
  autocompleteChipField.required = isRequired;
}

function updateInvalidState({ detail: isInvalid }: CustomEvent<boolean>): void {
  autocompleteChipField.invalid = isInvalid;

  const chips = autocompleteChipField.querySelectorAll('forge-chip');
  chips.forEach(({ invalid }) => invalid = isInvalid);
}

function updateDisabledState({ detail: isDisabled }: CustomEvent<boolean>): void {
  autocompleteChipFieldInput.disabled = isDisabled;
  setChipsDisabledState(isDisabled);
}

function updateDenseState({ detail: isDense }: CustomEvent<boolean>): void {
  autocompleteChipField.density = isDense ? 'dense' : 'default';
  
  const chips = autocompleteChipField.querySelectorAll('forge-chip') as NodeListOf<IChipComponent>;
  chips.forEach(({ dense }) => dense = isDense);
}

function setChipsDisabledState(isDisabled: boolean): void {
  const chips = autocompleteChipField.querySelectorAll('forge-chip');
  chips.forEach(({ disabled }) => disabled = isDisabled);
}
