import type { IButtonComponent, IDialogComponent, IIconButtonComponent } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconClose } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconClose]);

const openButton = document.getElementById('open-dialog-button') as IButtonComponent;
const dialog = document.getElementById('dialog') as IDialogComponent;
const closeIconButton = document.getElementById('close-dialog-icon-button') as IIconButtonComponent;
const closeButton = document.getElementById('close-dialog-button') as IButtonComponent;

openButton?.addEventListener('click', () => (dialog.open = true));
closeIconButton?.addEventListener('click', () => (dialog.open = false));
closeButton?.addEventListener('click', () => (dialog.open = false));
dialog?.addEventListener('forge-dialog-close', () => (dialog.open = false));
