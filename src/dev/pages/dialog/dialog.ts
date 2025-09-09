import '$src/shared';
import '@tylertech/forge/dialog';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/button';
import '@tylertech/forge/dialog/forge-dialog.scss';
import './dialog.scss';
import { tylIconClose } from '@tylertech/tyler-icons';
import { IDialogComponent, IDialogMoveEventData } from '@tylertech/forge/dialog';
import { IconRegistry } from '@tylertech/forge/icon';
import { ISelectComponent } from '@tylertech/forge/select';
import { ISwitchComponent } from '@tylertech/forge/switch';

IconRegistry.define([
  tylIconClose
]);

const dialogTemplate = document.getElementById('forge-dialog-template') as HTMLTemplateElement;
const preventCloseToggle = document.getElementById('opt-prevent-close') as ISwitchComponent;

const cssDialog = document.getElementById('css-only-dialog') as HTMLDialogElement;

const inlineDialog = document.getElementById('inline-dialog') as IDialogComponent;
inlineDialog.addEventListener('forge-dialog-before-close', evt => {
  console.log(evt);
  if (preventCloseToggle.on) {
    evt.preventDefault();
    console.log('[forge-dialog] close prevented');
    return;
  }
});
inlineDialog.addEventListener('forge-dialog-open', evt => console.log('[forge-dialog]', evt));
inlineDialog.addEventListener('forge-dialog-close', evt => console.log('[forge-dialog]', evt));
inlineDialog.addEventListener('forge-dialog-move-start', evt => console.log('[forge-dialog]', evt));
inlineDialog.addEventListener('forge-dialog-move', evt => console.log('[forge-dialog]', evt));
inlineDialog.addEventListener('forge-dialog-move-end', evt => console.log('[forge-dialog]', evt));
inlineDialog.addEventListener('forge-dialog-fullscreen-change', evt => console.log('[forge-dialog]', evt));

const showDynamicDialogButton = document.getElementById('show-dynamic-dialog-button');
showDynamicDialogButton.addEventListener('click', () => openDynamicDialog());

const saveButton = inlineDialog.querySelector('#save-button');
saveButton.addEventListener('click', () => {
  confirmSaveDialog.show();
});

const confirmSaveDialog = inlineDialog.querySelector('#confirm-save-dialog') as IDialogComponent;
const confirmYesButton = confirmSaveDialog.querySelector('#yes-button');
confirmYesButton.addEventListener('click', () => {
  confirmSaveDialog.hide();
  inlineDialog.hide();
});

const cancelButton = inlineDialog.querySelector('#cancel-button');
cancelButton.addEventListener('click', () => inlineDialog.hide());

const closeButton = inlineDialog.querySelector('#close-button');
closeButton.addEventListener('click', () => inlineDialog.hide());

const typeSelect = document.getElementById('opt-type') as ISelectComponent;
typeSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.type = selected;
  cssDialog.role = selected;
});

const modeSelect = document.getElementById('opt-mode') as ISelectComponent;
modeSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.mode = selected;
  cssDialog.classList.toggle('forge-dialog--non-modal', selected === 'nonmodal');
});

const animationTypeSelect = document.getElementById('opt-animation-type') as ISelectComponent;
animationTypeSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.animationType = selected;
  cssDialog.classList.remove('forge-dialog--animation-fade', 'forge-dialog--animation-none', 'forge-dialog--animation-slide');
  if (selected !== 'zoom') {
    cssDialog.classList.add(`forge-dialog--animation-${selected}`);
  }
});

const presetSelect = document.getElementById('opt-preset') as ISelectComponent;
presetSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.preset = selected;
  cssDialog.classList.remove('forge-dialog--bottom-sheet', 'forge-dialog--left-sheet', 'forge-dialog--right-sheet', 'forge-dialog--top-sheet');
  if (selected !== 'dialog') {
    cssDialog.classList.add(`forge-dialog--${selected}`);
  }
});

const placementSelect = document.getElementById('opt-placement') as ISelectComponent;
placementSelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.placement = selected;
  cssDialog.classList.remove('forge-dialog--custom', 'forge-dialog--top-left', 'forge-dialog--top', 'forge-dialog--top-right', 'forge-dialog--center', 'forge-dialog--bottom-left', 'forge-dialog--bottom', 'forge-dialog--bottom-right');
  cssDialog.classList.add(`forge-dialog--${selected}`);

  if (selected === 'custom') {
    inlineDialog.style.setProperty('--forge-dialog-position-x', '100px');
    inlineDialog.style.setProperty('--forge-dialog-position-y', '100px');
    cssDialog.style.setProperty('--forge-dialog-position-x', '100px');
    cssDialog.style.setProperty('--forge-dialog-position-y', '100px');
  } else {
    inlineDialog.style.removeProperty('--forge-dialog-position-x');
    inlineDialog.style.removeProperty('--forge-dialog-position-y');
    cssDialog.style.removeProperty('--forge-dialog-position-x');
    cssDialog.style.removeProperty('--forge-dialog-position-y');
  }
});

const sizeStrategySelect = document.getElementById('opt-size-strategy') as ISelectComponent;
sizeStrategySelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.sizeStrategy = selected;
});

const positionStrategySelect = document.getElementById('opt-position-strategy') as ISelectComponent;
positionStrategySelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.positionStrategy = selected;
});

const persistentToggle = document.getElementById('opt-persistent') as ISwitchComponent;
persistentToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.persistent = selected;
  preventCloseToggle.disabled = selected;
});

const fullscreenToggle = document.getElementById('opt-fullscreen') as ISwitchComponent;
fullscreenToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.fullscreen = selected;
});

const moveableToggle = document.getElementById('opt-moveable') as ISwitchComponent;
moveableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.moveable = selected;
});

const moveBoundarySelect = document.getElementById('opt-move-boundary') as ISelectComponent;
moveBoundarySelect.addEventListener('change', ({ detail: selected }) => {
  inlineDialog.moveBoundary = selected;
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
  dialogElement.persistent = persistentToggle.on;
  dialogElement.fullscreen = fullscreenToggle.on;
  dialogElement.moveable = moveableToggle.on;
  dialogElement.moveBoundary = moveBoundarySelect.value;
  dialogElement.placement = placementSelect.value;
  dialogElement.sizeStrategy = sizeStrategySelect.value;
  dialogElement.positionStrategy = positionStrategySelect.value;
  dialogElement.type = typeSelect.value;
  dialogElement.mode = modeSelect.value;
  dialogElement.animationType = animationTypeSelect.value;
  dialogElement.preset = presetSelect.value;

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
  const templateSaveButton = dialogElement.querySelector('#save-button');
  templateSaveButton.addEventListener('click', () => dialogElement.hide());

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

const cssDialogButton = document.getElementById('show-css-dialog-button');
cssDialogButton.addEventListener('click', () => openCssOnlyDialog());

function openCssOnlyDialog(): void {
  if (cssDialog.classList.contains('forge-dialog--non-modal')) {
    cssDialog.show();
  } else {
    cssDialog.showModal();
  }
  cssDialog.querySelector('#close-button').addEventListener('click', () => cssDialog.close(), { once: true });
  cssDialog.querySelector('#cancel-button').addEventListener('click', () => cssDialog.close(), { once: true });
  cssDialog.querySelector('#save-button').addEventListener('click', () => cssDialog.close(), { once: true });
}
