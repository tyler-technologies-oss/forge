import '$src/shared';
import '@tylertech/forge/radio';
import '@tylertech/forge/divider';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import './radio.scss';

const radioGroup = document.getElementById('example-radio-group');

const nextButton = document.querySelector('#next-button');
nextButton.addEventListener('click', () => {
  selectNext();
});

const addRadioButton = document.querySelector('#add-button');
addRadioButton.addEventListener('click', () => {
  addRadio();
});

const removeRadioButton = document.querySelector('#remove-button');
removeRadioButton.addEventListener('click', () => {
  removeRadio();
});

function selectNext(): void {
  const radioInputs = getRadioInputs();
  let selectedIndex = radioInputs.findIndex(radio => radio.checked) + 1;
  if (selectedIndex >= radioInputs.length) {
    selectedIndex = 0;
  }
  if (radioInputs[selectedIndex]) {
    radioInputs[selectedIndex].checked = true;
  }
}

function addRadio(): void {
  const radioInputs = getRadioInputs();
  const newId = radioInputs.length + 1;
  const newRadio = document.createElement('forge-radio');

  const newInput = document.createElement('input');
  newInput.setAttribute('type', 'radio');
  newInput.setAttribute('id', `input-radio-example-${newId}`);
  newInput.setAttribute('name', 'radios-example');
  newRadio.appendChild(newInput);

  const newLabel = document.createElement('label');
  newLabel.setAttribute('for', `input-radio-example-${newId}`);
  newLabel.textContent = `Option ${newId}`;
  newRadio.append(newLabel);

  radioGroup.appendChild(newRadio);
}

function removeRadio(): void {
  const radios = radioGroup.querySelectorAll('forge-radio');
  radios[radios.length - 1].remove();
}

function getRadioInputs(): HTMLInputElement[] {
  return [...radioGroup.querySelectorAll('input[type=radio]') as NodeListOf<HTMLInputElement>];
}
