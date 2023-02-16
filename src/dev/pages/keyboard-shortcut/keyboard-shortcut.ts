import '$src/shared';
import '@tylertech/forge/keyboard-shortcut';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import '@tylertech/forge/text-field';
import { IKeyboardShortcutComponent } from '@tylertech/forge/keyboard-shortcut';
import { ISwitchComponent } from '@tylertech/forge';

const buttonShortcut = document.querySelector('#button-shortcut') as IKeyboardShortcutComponent;
const textFieldShortcut = document.querySelector('#text-field-shortcut') as IKeyboardShortcutComponent;

buttonShortcut.addEventListener('forge-keyboard-shortcut-activate', ({ detail }) => {
  alert(`Button shortcut works: ${detail.key}`);
  console.log('[forge-keyboard-shortcut-activate] button', detail);
});

textFieldShortcut.addEventListener('forge-keyboard-shortcut-activate', ({ detail }) => {
  alert(`Text field shortcut works: ${detail.key}`);
  console.log('[forge-keyboard-shortcut-activate] text-field', detail);
});

const keyTextField = document.querySelector('#opt-key') as HTMLInputElement;
buttonShortcut.key = keyTextField.value;
textFieldShortcut.key = keyTextField.value;
keyTextField.addEventListener('change', () => {
  buttonShortcut.key = keyTextField.value;
  textFieldShortcut.key = keyTextField.value;
});

const globalToggle = document.querySelector('#opt-global') as ISwitchComponent;
globalToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonShortcut.global = selected;
  textFieldShortcut.global = selected;
});

const allowWhileTypingToggle = document.querySelector('#opt-allow-while-typing') as ISwitchComponent;
allowWhileTypingToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonShortcut.allowWhileTyping = selected;
  textFieldShortcut.allowWhileTyping = selected;
});

const preventDefaultToggle = document.querySelector('#opt-prevent-default') as ISwitchComponent;
preventDefaultToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonShortcut.preventDefault = selected;
  textFieldShortcut.preventDefault = selected;
});

const useCodeToggle = document.querySelector('#opt-use-code') as ISwitchComponent;
useCodeToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonShortcut.useCode = selected;
  textFieldShortcut.useCode = selected;
});

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-select', ({ detail: selected }) => {
  buttonShortcut.disabled = selected;
  textFieldShortcut.disabled = selected;
});
