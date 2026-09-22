import type { ButtonComponent, IDialogComponent, IconButtonComponent } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconClose } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconClose]);

const openButton = document.getElementById('open-dialog-button-top-sheet') as ButtonComponent;
const dialog = document.getElementById('dialog-top-sheet') as IDialogComponent;
const closeIconButton = document.getElementById('close-dialog-icon-button-top-sheet') as IconButtonComponent;
const closeButton = document.getElementById('close-dialog-button-top-sheet') as ButtonComponent;

openButton?.addEventListener('click', () => (dialog.open = true));
closeIconButton?.addEventListener('click', () => (dialog.open = false));
closeButton?.addEventListener('click', () => (dialog.open = false));
dialog?.addEventListener('forge-dialog-close', () => (dialog.open = false));
