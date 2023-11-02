import '$src/shared';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { IButtonComponent } from '@tylertech/forge/button';
import type { ISelectComponent } from '@tylertech/forge/select';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconFavorite, tylIconOpenInNew } from '@tylertech/tyler-icons/standard';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import '@tylertech/forge/button';
import './button.scss';

IconRegistry.define([tylIconForgeLogo, tylIconFavorite, tylIconOpenInNew]);

const formPreventToggle = document.querySelector('#opt-form-prevent') as ISwitchComponent;
const hrefPreventToggle = document.querySelector('#opt-href-prevent') as ISwitchComponent;

const submitBtn = document.querySelector('#submit-btn') as HTMLButtonElement;
submitBtn.addEventListener('click', evt => {
  if (formPreventToggle.on) {
    evt.preventDefault();
  }
  console.log('submit button click', evt);
});

const resetBtn = document.querySelector('#reset-btn') as HTMLButtonElement;
resetBtn.addEventListener('click', evt => {
  if (formPreventToggle.on) {
    evt.preventDefault();
  }
  console.log('reset button click', evt);
});

const testForm = document.querySelector('#test-btn-form') as HTMLFormElement;
testForm.addEventListener('submit', evt => {
  console.log('Form submitted!', evt.submitter);
});

const hrefBtn = document.querySelector('forge-button[href]') as HTMLAnchorElement;
hrefBtn.addEventListener('click', evt => {
  if (hrefPreventToggle.on) {
    evt.preventDefault();
  }
  console.log('href button click', evt);
});

const showDialogBtn = document.querySelector('#show-dialog-btn') as HTMLButtonElement;
showDialogBtn.addEventListener('click', () => {
  const dialog = document.querySelector('#test-dialog') as HTMLDialogElement;
  dialog.showModal();
});

const allButtons = document.querySelectorAll<IButtonComponent>('.content forge-button');
allButtons.forEach(btn => btn.addEventListener('click', evt => console.log('click', evt)));

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.disabled = selected);
});

const denseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.dense = selected);
});

const pillToggle = document.querySelector('#opt-pill') as ISwitchComponent;
pillToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.pill = selected);
});

const popoverIconToggle = document.querySelector('#opt-popover-icon') as ISwitchComponent;
popoverIconToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.popoverIcon = selected);
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  allButtons.forEach(btn => btn.setAttribute('theme', detail));
});
