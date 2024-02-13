import '$src/shared';
import type { ISwitchComponent } from '@tylertech/forge/switch';
import type { IButtonComponent } from '@tylertech/forge/button';
import type { IDeprecatedButtonComponent } from '@tylertech/forge/deprecated/button';
import type { ISelectComponent } from '@tylertech/forge/select';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconFavorite, tylIconOpenInNew } from '@tylertech/tyler-icons/standard';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import '@tylertech/forge/button';
import '@tylertech/forge/deprecated/button';
import '@tylertech/forge/label';
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

const popoverBtn = document.querySelector('#popover-button') as HTMLButtonElement;
const popoverEl = document.querySelector('#my-popover') as HTMLElement;
popoverEl.addEventListener('toggle', ({ newState }: any) => { // TODO: remove `any` when TypeScript version is upgraded for latest DOM typings
  popoverBtn.setAttribute('aria-expanded', `${newState === 'open'}`);
});

const showDialogBtn = document.querySelector('#show-dialog-btn') as HTMLButtonElement;
showDialogBtn.addEventListener('click', () => {
  const dialog = document.querySelector('#test-dialog') as HTMLDialogElement;
  dialog.showModal();
});

const allDeprecatedButtons = Array.from(document.querySelectorAll<IDeprecatedButtonComponent>('.content forge-deprecated-button'));
const allButtons = Array.from(document.querySelectorAll<IButtonComponent>('.content forge-button'));
allButtons.forEach(btn => btn.addEventListener('click', evt => console.log('click', evt)));

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.toggleAttribute('disabled', selected));
  allDeprecatedButtons.forEach(btn => btn.toggleAttribute('disabled', selected));
});

const denseToggle = document.querySelector('#opt-dense') as ISwitchComponent;
denseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.dense = selected);
  allDeprecatedButtons.forEach(btn => {
    btn.type = btn.type ? btn.type.replace(/(?:-?dense)?$/, selected ? '-dense' : '') : selected ? 'dense' : '';
  });
});

const pillToggle = document.querySelector('#opt-pill') as ISwitchComponent;
pillToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.pill = selected);
});

const anchorToggle = document.querySelector('#opt-anchor') as ISwitchComponent;
anchorToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.filter(b => !b.href).forEach(btn => btn.anchor = selected);
});

const fullWidthToggle = document.querySelector('#opt-full-width') as ISwitchComponent;
fullWidthToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.forEach(btn => btn.fullWidth = selected);
  allDeprecatedButtons.forEach(btn => btn.toggleAttribute('full-width', selected));
});

const popoverIconToggle = document.querySelector('#opt-popover-icon') as ISwitchComponent;
popoverIconToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  allButtons.filter(btn => btn.id !== 'popover-button').forEach(btn => btn.popoverIcon = selected);
});

const themeSelect = document.querySelector('#opt-theme') as ISelectComponent;
themeSelect.addEventListener('change', ({ detail }) => {
  allButtons.forEach(btn => btn.setAttribute('theme', detail));
});
