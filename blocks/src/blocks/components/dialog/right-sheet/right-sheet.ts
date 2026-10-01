import type { IButtonComponent, IDialogComponent, IIconButtonComponent } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconClose } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconClose]);

const openButton = document.getElementById('open-dialog-button-right-sheet') as IButtonComponent;
const dialog = document.getElementById('dialog-right-sheet') as IDialogComponent;
const closeIconButton = document.getElementById('close-dialog-icon-button-right-sheet') as IIconButtonComponent;
const closeButton = document.getElementById('close-dialog-button-right-sheet') as IButtonComponent;

openButton?.addEventListener('click', () => (dialog.open = true));
closeIconButton?.addEventListener('click', () => (dialog.open = false));
closeButton?.addEventListener('click', () => (dialog.open = false));
dialog?.addEventListener('forge-dialog-close', () => (dialog.open = false));
