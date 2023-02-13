import '$src/shared';
import '@tylertech/forge/dialog';
import '@tylertech/forge/toolbar';
import '@tylertech/forge/scaffold';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import { IconRegistry, ISwitchComponent } from '@tylertech/forge';
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

const showDialogButton = document.getElementById('show-dialog-button');
showDialogButton.addEventListener('click', () => openDialog());

function openDialog(): void {
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
  dialogElement.addEventListener('forge-dialog-close', evt => dialogElement.open = false);

  // Handle the accept button being clicked
  const acceptButton = dialogElement.querySelector('#accept-button');
  acceptButton.addEventListener('click', () => {
    console.log('[dialog] Accept button clicked');
    dialogElement.open = false;
  });

  // Handle the cancel button being clicked
  const cancelButton = dialogElement.querySelector('#cancel-button');
  cancelButton.addEventListener('click', () => dialogElement.open = false);

  // Handle the close button being clicked
  const closeButton = dialogElement.querySelector('#close-button');
  closeButton.addEventListener('click', () => dialogElement.open = false);

  // Shows the dialog by appending it to the body and starting its animations
  dialogElement.open = true;
}
