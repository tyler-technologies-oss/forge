import '$src/shared';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { IButtonComponent } from '@tylertech/forge/button';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconFavorite, tylIconOpenInNew } from '@tylertech/tyler-icons/standard';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import '@tylertech/forge/button';
import './button.scss';

IconRegistry.define([tylIconForgeLogo, tylIconFavorite, tylIconOpenInNew]);

const regBtn = document.querySelector('#reg-btn') as HTMLButtonElement;
regBtn.addEventListener('click', evt => {
  evt.preventDefault();
  console.log('regular button click', evt);
});

const submitBtn = document.querySelector('#submit-btn') as HTMLButtonElement;
submitBtn.addEventListener('click', evt => {
  // evt.preventDefault();
  console.log('submit button click', evt);
});

const resetBtn = document.querySelector('#reset-btn') as HTMLButtonElement;
resetBtn.addEventListener('click', evt => {
  // evt.preventDefault();
  console.log('reset button click', evt);
});

const testForm = document.querySelector('#test-btn-form') as HTMLFormElement;
testForm.addEventListener('submit', evt => {
  console.log('Form submitted!', evt.submitter);
});

const hrefBtn = document.querySelector('forge-button[href]') as HTMLAnchorElement;
hrefBtn.addEventListener('click', evt => {
  // evt.preventDefault();
  console.log('href button click', evt);
});

const allButtons = document.querySelectorAll<IButtonComponent>('.content forge-button');

allButtons.forEach(btn => btn.addEventListener('click', evt => {
  // evt.preventDefault();
  console.log('click', evt);
}));

const disabledToggle = document.querySelector('#disabled-switch') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.disabled = selected);
});

const denseToggle = document.querySelector('#dense-switch') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.dense = selected);
});
