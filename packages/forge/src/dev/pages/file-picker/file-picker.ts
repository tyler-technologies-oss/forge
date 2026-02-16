import '$src/shared';
import '@tylertech/forge/file-picker';
import '@tylertech/forge/button';
import { IFilePickerComponent } from '@tylertech/forge/file-picker';
import { ISwitchComponent } from '@tylertech/forge/switch';

const filePicker = document.querySelector('#file-picker-default') as IFilePickerComponent;
const filePickerCompact = document.querySelector('#file-picker-compact') as IFilePickerComponent;
const filePickerBorderless = document.querySelector('#file-picker-borderless') as IFilePickerComponent;
const filePickerHelperText = document.querySelector('#file-picker-helper-text') as HTMLElement;
const list = document.querySelector('#file-picker-list');
const listCompact = document.querySelector('#file-picker-list-compact');
const listBorderless = document.querySelector('#file-picker-list-borderless');
const acceptTextField = document.querySelector('#opt-accept') as HTMLInputElement;
const maxSizeTextField = document.querySelector('#opt-max-size') as HTMLInputElement;
const multipleCheckbox = document.querySelector('#opt-multiple') as ISwitchComponent;
const disabledCheckbox = document.querySelector('#opt-disabled') as ISwitchComponent;

filePicker.addEventListener('forge-file-picker-change', ({ detail }) => {
  console.log('[forge-file-picker-change]', detail);

  filePickerHelperText.innerText = `${detail.legalFiles.length} file(s)`;
  list.innerHTML = '';

  for (const { name } of detail.legalFiles) {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  }
});

filePickerCompact.addEventListener('forge-file-picker-change', ({ detail }) => {
  listCompact.innerHTML = '';

  for (const { name } of detail.legalFiles) {
    const li = document.createElement('li');
    li.textContent = name;
    listCompact.appendChild(li);
  }
});

filePickerBorderless.addEventListener('forge-file-picker-change', ({ detail }) => {
  listBorderless.innerHTML = '';

  for (const { name } of detail.legalFiles) {
    const li = document.createElement('li');
    li.textContent = name;
    listBorderless.appendChild(li);
  }
});

acceptTextField.addEventListener('input', () => {
  filePicker.accept = acceptTextField.value;
  filePickerCompact.accept = acceptTextField.value;
});

maxSizeTextField.addEventListener('input', () => {
  filePicker.maxSize = +maxSizeTextField.value;
  filePickerCompact.maxSize = +maxSizeTextField.value;
});

multipleCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => {
  filePicker.multiple = selected;
  filePickerCompact.multiple = selected;
});

disabledCheckbox.addEventListener('forge-switch-change', ({ detail: selected }) => {
  filePicker.disabled = selected;
  filePickerCompact.disabled = selected;
});
