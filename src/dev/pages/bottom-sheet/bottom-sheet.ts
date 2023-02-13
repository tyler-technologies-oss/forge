import '$src/shared';
import '@tylertech/forge/bottom-sheet';
import { IBottomSheetComponent } from '@tylertech/forge/bottom-sheet';
import '@tylertech/forge/button';
import '@tylertech/forge/button/forge-button.scss';
import '@tylertech/forge/dialog/forge-dialog-utils.scss';
import './bottom-sheet.scss';

const showStandardButton = document.getElementById('show-standard-bottom-sheet-button');
showStandardButton.addEventListener('click', () => openStandardBottomSheet());

const showStandardScrollableSheet = document.getElementById('show-standard-scrollable-sheet-button');
showStandardScrollableSheet.addEventListener('click', () => openScrollableBottomSheet());

const scrollablelBottomSheetTemplate = document.getElementById('forge-scrollable-bottom-sheet-template') as HTMLTemplateElement;
const standardBottomSheetTemplate = document.getElementById('forge-standard-bottom-sheet-template') as HTMLTemplateElement;

function openScrollableBottomSheet(): void {
  const bottomSheetElement = document.createElement('forge-bottom-sheet');
  bottomSheetElement.showBackdrop = true;

  const content = scrollablelBottomSheetTemplate.content.cloneNode(true);
  bottomSheetElement.appendChild(content);

  bottomSheetElement.addEventListener('forge-bottom-sheet-close', (evt) => {
    console.log('close', evt);
  });

  // Handle the accept button being clicked	  
  const acceptButton = bottomSheetElement.querySelector('#accept-button');
  acceptButton.addEventListener('click', () => {
    console.log('[bottom-sheet] Accept button clicked');
    bottomSheetElement.open = false;
  });

  // bottomSheetElement.beforeCloseCallback = () => false;

  // Handle the cancel button being clicked
  const cancelButton = bottomSheetElement.querySelector('#cancel-button');
  cancelButton.addEventListener('click', () => bottomSheetElement.open = false);

  // Shows the bottom sheet by appending it to the body and starting its animations
  bottomSheetElement.open = true;
}

const events = [`forge-bottom-sheet-before-close`, `forge-bottom-sheet-close`, `forge-bottom-sheet-open`, `forge-bottom-sheet-ready`];

function logEvents(bottomSheet: IBottomSheetComponent): void {
  events.forEach(eventType => bottomSheet.addEventListener(eventType, console.log));
}

function openStandardBottomSheet(): void {
  const bottomSheetElement = document.createElement('forge-bottom-sheet');

  const content = standardBottomSheetTemplate.content.cloneNode(true);
  bottomSheetElement.appendChild(content);
  logEvents(bottomSheetElement);

  const closeButton = bottomSheetElement.querySelector('#close-button');
  closeButton.addEventListener('click', () => bottomSheetElement.open = false);

  bottomSheetElement.open = true;
}
