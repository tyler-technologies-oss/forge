import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconClose, tylIconSave } from '@tylertech/tyler-icons';
import type { IDialogComponent } from '@tylertech/forge/dialog';

IconRegistry.define([tylIconClose, tylIconSave]);

const dialog = document.querySelector<IDialogComponent>('#content-scaffold-dialog');
const openButton = document.querySelector<HTMLElement>('#open-dialog-button');
const closeButton = document.querySelector<HTMLElement>('#close-dialog-button');
const cancelButton = document.querySelector<HTMLElement>('#cancel-dialog-button');

openButton?.addEventListener('click', () => {
  dialog?.show();
});

closeButton?.addEventListener('click', () => {
  dialog?.hide();
});

cancelButton?.addEventListener('click', () => {
  dialog?.hide();
});
