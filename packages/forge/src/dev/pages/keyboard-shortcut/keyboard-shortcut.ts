import '$src/shared';
import '@tylertech/forge/button';
import '@tylertech/forge/focus-indicator';
import '@tylertech/forge/keyboard-shortcut';
import { IKeyboardShortcutComponent } from '@tylertech/forge/keyboard-shortcut';
import { ISwitchComponent } from '@tylertech/forge/switch';
import '@tylertech/forge/text-field';
import '@tylertech/forge/toast';
import { ToastComponent, ToastTheme } from '@tylertech/forge/toast';

function showToast(message: string, theme?: ToastTheme): void {
  ToastComponent.present({ message, duration: 2000, theme });
}

const buttonShortcut = document.querySelector('#button-shortcut') as IKeyboardShortcutComponent;
const textFieldShortcut = document.querySelector('#text-field-shortcut') as IKeyboardShortcutComponent;
const scopeShortcut1 = document.querySelector('#scope-shortcut-1') as IKeyboardShortcutComponent;
const scopeShortcut2 = document.querySelector('#scope-shortcut-2') as IKeyboardShortcutComponent;
const disabledShortcut = document.querySelector('#disabled-shortcut') as IKeyboardShortcutComponent;
const outerShortcut = document.querySelector('#outer-shortcut') as IKeyboardShortcutComponent;
const innerShortcut = document.querySelector('#inner-shortcut') as IKeyboardShortcutComponent;

const basicShortcuts = [buttonShortcut, textFieldShortcut];

buttonShortcut.addEventListener('forge-keyboard-shortcut-activate', ({ detail }) => {
  showToast(`Button shortcut: ${detail.key}`);
});

textFieldShortcut.addEventListener('forge-keyboard-shortcut-activate', ({ detail }) => {
  showToast(`Text field shortcut: ${detail.key}`);
});

scopeShortcut1.addEventListener('forge-keyboard-shortcut-activate', () => {
  showToast('Editor 1: Bold');
});

scopeShortcut2.addEventListener('forge-keyboard-shortcut-activate', () => {
  showToast('Editor 2: Bold');
});

disabledShortcut.addEventListener('forge-keyboard-shortcut-activate', () => {
  showToast('Disabled shortcut fired (this should not appear)');
});

outerShortcut.addEventListener('forge-keyboard-shortcut-activate', () => {
  ToastComponent.present({ message: 'Outer scope fired', duration: 2000, placement: 'bottom-end' });
});

innerShortcut.addEventListener('forge-keyboard-shortcut-activate', () => {
  ToastComponent.present({ message: 'Inner scope fired (fallthrough)', duration: 2000, placement: 'bottom-start' });
});

const seqCommentShortcut = document.querySelector('#seq-comment-shortcut') as IKeyboardShortcutComponent;
const seqUncommentShortcut = document.querySelector('#seq-uncomment-shortcut') as IKeyboardShortcutComponent;
const conflictStandaloneShortcut = document.querySelector('#conflict-standalone-shortcut') as IKeyboardShortcutComponent;
const conflictSequenceShortcut = document.querySelector('#conflict-sequence-shortcut') as IKeyboardShortcutComponent;

seqCommentShortcut.addEventListener('forge-keyboard-shortcut-activate', () => {
  showToast('Sequence: Comment (Ctrl+K > Ctrl+C)');
});

seqUncommentShortcut.addEventListener('forge-keyboard-shortcut-activate', () => {
  showToast('Sequence: Uncomment (Ctrl+K > Ctrl+U)');
});

conflictStandaloneShortcut.addEventListener('forge-keyboard-shortcut-activate', () => {
  showToast('Standalone: Ctrl+K fired');
});

conflictSequenceShortcut.addEventListener('forge-keyboard-shortcut-activate', () => {
  showToast('Sequence: Ctrl+K > Ctrl+C fired');
});

const keyTextField = document.querySelector('#opt-key') as HTMLInputElement;
basicShortcuts.forEach(s => (s.key = keyTextField.value));
keyTextField.addEventListener('change', () => {
  basicShortcuts.forEach(s => (s.key = keyTextField.value));
});

const globalToggle = document.querySelector('#opt-global') as ISwitchComponent;
globalToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  basicShortcuts.forEach(s => (s.global = selected));
});

const allowWhileTypingToggle = document.querySelector('#opt-allow-while-typing') as ISwitchComponent;
allowWhileTypingToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  basicShortcuts.forEach(s => (s.allowWhileTyping = selected));
});

const preventDefaultToggle = document.querySelector('#opt-prevent-default') as ISwitchComponent;
preventDefaultToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  basicShortcuts.forEach(s => (s.preventDefault = selected));
});

const useCodeToggle = document.querySelector('#opt-use-code') as ISwitchComponent;
useCodeToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  basicShortcuts.forEach(s => (s.useCode = selected));
});

const disabledToggle = document.querySelector('#opt-disabled') as ISwitchComponent;
disabledToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  basicShortcuts.forEach(s => (s.disabled = selected));
});

const allowRepeatToggle = document.querySelector('#opt-allow-repeat') as ISwitchComponent;
allowRepeatToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  basicShortcuts.forEach(s => (s.allowRepeat = selected));
});
