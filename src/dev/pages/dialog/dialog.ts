import '$src/shared';
import '@tylertech/forge/dialog';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/button';
import { IconRegistry, IDialogComponent, IDialogMoveEventData, ISelectComponent, ISwitchComponent } from '@tylertech/forge';
import './dialog.scss';
import { tylIconClose } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconClose
]);

const dialogTemplate = document.getElementById('forge-dialog-template') as HTMLTemplateElement;
const preventCloseToggle = document.getElementById('opt-prevent-close') as ISwitchComponent;

const inlineDialog = document.getElementById('inline-dialog') as IDialogComponent;
inlineDialog.addEventListener('forge-dialog-before-close', evt => {
  console.log(evt);
  if (preventCloseToggle.on) {
    evt.preventDefault();
    console.log('[forge-dialog] close prevented');
    return;
  }
});

const showDynamicDialogButton = document.getElementById('show-dynamic-dialog-button');
showDynamicDialogButton.addEventListener('click', () => openDynamicDialog());

const acceptButton = inlineDialog.querySelector('#accept-button');
acceptButton.addEventListener('click', () => inlineDialog.hide());

const cancelButton = inlineDialog.querySelector('#cancel-button');
cancelButton.addEventListener('click', () => inlineDialog.hide());

const closeButton = inlineDialog.querySelector('#close-button');
closeButton.addEventListener('click', () => inlineDialog.hide());

const typeSelect = document.getElementById('opt-type') as ISelectComponent;
typeSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.type = selected;
});

const modeSelect = document.getElementById('opt-mode') as ISelectComponent;
modeSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.mode = selected;
});

const animationTypeSelect = document.getElementById('opt-animation-type') as ISelectComponent;
animationTypeSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.animationType = selected;
});

const presetSelect = document.getElementById('opt-preset') as ISelectComponent;
presetSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.preset = selected;
});

const placementSelect = document.getElementById('opt-placement') as ISelectComponent;
placementSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.placement = selected;

  if (selected === 'custom') {
    inlineDialog.style.setProperty('--forge-dialog-position-x', '100px');
    inlineDialog.style.setProperty('--forge-dialog-position-y', '100px');
  } else {
    inlineDialog.style.removeProperty('--forge-dialog-position-x');
    inlineDialog.style.removeProperty('--forge-dialog-position-y');
  }
});

const persistentToggle = document.getElementById('opt-persistent') as ISwitchComponent;
persistentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.persistent = selected;

  escapeCloseToggle.on = !selected;
  backdropCloseToggle.on = !selected;
});

const escapeCloseToggle = document.getElementById('opt-escape-close') as ISwitchComponent;
escapeCloseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.escapeClose = selected;
});

const backdropCloseToggle = document.getElementById('opt-backdrop-close') as ISwitchComponent;
backdropCloseToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.backdropClose = selected;
});

const fullscreenToggle = document.getElementById('opt-fullscreen') as ISwitchComponent;
fullscreenToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.fullscreen = selected;
});

const moveableToggle = document.getElementById('opt-moveable') as ISwitchComponent;
moveableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.moveable = selected;
});

const preventMoveToggle = document.getElementById('opt-prevent-move') as ISwitchComponent;
preventMoveToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    inlineDialog.addEventListener('forge-dialog-move', onPreventMove);
  } else {
    inlineDialog.removeEventListener('forge-dialog-move', onPreventMove);
  }
});

function onPreventMove(evt: CustomEvent<IDialogMoveEventData>): void {
  evt.preventDefault();
  console.log('[forge-dialog] move prevented');
}

function openDynamicDialog(): void {
  // Create the <forge-dialog> element
  const dialogElement = document.createElement('forge-dialog');
  dialogElement.classList.add('dialog');

  // Apply options
  dialogElement.escapeClose = escapeCloseToggle.on;
  dialogElement.backdropClose = backdropCloseToggle.on;
  dialogElement.fullscreen = fullscreenToggle.selected;
  dialogElement.moveable = moveableToggle.on;
  dialogElement.placement = placementSelect.value;

  if (preventMoveToggle.on) {
    dialogElement.addEventListener('forge-dialog-move', evt => {
      evt.preventDefault();
      console.log('[forge-dialog] move prevented');
    });
  }
  
  if (dialogElement.placement === 'custom') {
    dialogElement.style.setProperty('--forge-dialog-position-x', '100px');
    dialogElement.style.setProperty('--forge-dialog-position-y', '100px');
  }

  // Load the template content and set that as the content for the dialog
  const content = dialogTemplate.content.cloneNode(true);
  dialogElement.appendChild(content);

  dialogElement.addEventListener('forge-dialog-before-close', evt => {
    console.log(evt);
    if (preventCloseToggle.on) {
      evt.preventDefault();
      console.log('[forge-dialog] close prevented');
      return;
    }
  });

  dialogElement.addEventListener('forge-dialog-close', evt => {
    console.log(evt);
    dialogElement.remove();
  });

  // Handle the accept button being clicked
  const templateAcceptButton = dialogElement.querySelector('#accept-button');
  templateAcceptButton.addEventListener('click', () => dialogElement.hide());

  // Handle the cancel button being clicked
  const templateCancelButton = dialogElement.querySelector('#cancel-button');
  templateCancelButton.addEventListener('click', () => dialogElement.hide());

  // Handle the close button being clicked
  const templateCloseButton = dialogElement.querySelector('#close-button');
  templateCloseButton.addEventListener('click', () => dialogElement.hide());

  // Shows the dialog by appending it to the body and toggling its open state
  document.body.appendChild(dialogElement);
  dialogElement.open = true;
}
