import type { IButtonComponent, IDialogComponent, IIconButtonComponent } from '@tylertech/forge';
import { IconRegistry } from '@tylertech/forge/icon';
import { tylIconClose } from '@tylertech/tyler-icons';

IconRegistry.define([tylIconClose]);

const openButton = document.getElementById('open-dialog-button-fullscreen') as IButtonComponent;
const dialog = document.getElementById('dialog-fullscreen') as IDialogComponent;
const closeIconButton = document.getElementById('close-dialog-icon-button-fullscreen') as IIconButtonComponent;
const closeButton = document.getElementById('close-dialog-button-fullscreen') as IButtonComponent;

openButton?.addEventListener('click', () => (dialog.open = true));
closeIconButton?.addEventListener('click', () => (dialog.open = false));
closeButton?.addEventListener('click', () => (dialog.open = false));
dialog?.addEventListener('forge-dialog-close', () => (dialog.open = false));
