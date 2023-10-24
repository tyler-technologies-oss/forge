import '$src/shared';
import '@tylertech/forge/dialog';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import { IconRegistry, IDialogComponent, IDialogMoveEventData, ISwitchComponent } from '@tylertech/forge';
import './dialog.scss';
import { tylIconClose } from '@tylertech/tyler-icons/standard';

IconRegistry.define([
  tylIconClose
]);

const dialogTemplate = document.getElementById('forge-dialog-template') as HTMLTemplateElement;
const fullscreenToggle = document.getElementById('opt-fullscreen') as ISwitchComponent;
const moveableToggle = document.getElementById('opt-moveable') as ISwitchComponent;
const preventMoveToggle = document.getElementById('opt-prevent-move') as ISwitchComponent;
const customPositionToggle = document.getElementById('opt-custom-position') as ISwitchComponent;

const inlineDialog = document.getElementById('inline-dialog') as IDialogComponent;
const showInlineDialogButton = document.getElementById('show-inline-dialog-button');
showInlineDialogButton.addEventListener('click', () => inlineDialog.open = true);

const showDynamicDialogButton = document.getElementById('show-dynamic-dialog-button');
showDynamicDialogButton.addEventListener('click', () => openDynamicDialog());

inlineDialog.addEventListener('forge-dialog-close', () => inlineDialog.hide());

const acceptButton = inlineDialog.querySelector('#accept-button');
acceptButton.addEventListener('click', () => inlineDialog.hide());

const cancelButton = inlineDialog.querySelector('#cancel-button');
cancelButton.addEventListener('click', () => inlineDialog.hide());

const closeButton = inlineDialog.querySelector('#close-button');
closeButton.addEventListener('click', () => inlineDialog.hide());

fullscreenToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.fullscreen = selected;
});

moveableToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.moveable = selected;
});

preventMoveToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  if (selected) {
    inlineDialog.addEventListener('forge-dialog-move', onPreventMove);
  } else {
    inlineDialog.removeEventListener('forge-dialog-move', onPreventMove);
  }
});

customPositionToggle.addEventListener('forge-switch-change', ({ detail: selected }) => {
  inlineDialog.positionX = selected ? 100 : undefined;
  inlineDialog.positionY = selected ? 100 : undefined;
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
  dialogElement.fullscreen = fullscreenToggle.selected;
  dialogElement.moveable = moveableToggle.selected;

  if (preventMoveToggle.selected) {
    dialogElement.addEventListener('forge-dialog-move', evt => {
      evt.preventDefault();
      console.log('[forge-dialog] move prevented');
    });
  }
  
  if (customPositionToggle.selected) {
    dialogElement.positionX = 100;
    dialogElement.positionY = 100;
  }

  // Load the template content and set that as the content for the dialog
  const content = dialogTemplate.content.cloneNode(true);
  dialogElement.appendChild(content);

  // Listen for the `forge-dialog-close` event (by default it will fire if the backdrop is clicked or if the escape button is pressed)
  dialogElement.addEventListener('forge-dialog-close', () => {
    dialogElement.hide(true);
  });

  // Handle the accept button being clicked
  const templateAcceptButton = dialogElement.querySelector('#accept-button');
  templateAcceptButton.addEventListener('click', () => {
    dialogElement.hide(true);
  });

  // Handle the cancel button being clicked
  const templateCancelButton = dialogElement.querySelector('#cancel-button');
  templateCancelButton.addEventListener('click', () => {
    dialogElement.hide(true);
  });

  // Handle the close button being clicked
  const templateCloseButton = dialogElement.querySelector('#close-button');
  templateCloseButton.addEventListener('click', () => {
    dialogElement.hide(true);
  });

  // Shows the dialog by appending it to the body and starting its animations
  dialogElement.show(document.body);
}
