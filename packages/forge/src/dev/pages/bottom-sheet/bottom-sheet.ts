import '$src/shared';
import '@tylertech/forge/bottom-sheet';
import { BOTTOM_SHEET_CONSTANTS, IBottomSheetComponent } from '@tylertech/forge/bottom-sheet';
import '@tylertech/forge/button';
import './bottom-sheet.scss';

const standardBottomSheet = document.getElementById('standard-bottom-sheet') as IBottomSheetComponent;
const showStandardButton = document.getElementById('show-standard-bottom-sheet-button');
showStandardButton.addEventListener('click', () => (standardBottomSheet.open = !standardBottomSheet.open));

const scrollableBottomSheet = document.getElementById('scrollable-bottom-sheet') as IBottomSheetComponent;
const showStandardScrollableSheet = document.getElementById('show-scrollable-bottom-sheet-button');
showStandardScrollableSheet.addEventListener('click', () => (scrollableBottomSheet.open = true));

const standardCloseButton = standardBottomSheet.querySelector('#standard-close-button');
standardCloseButton.addEventListener('click', () => (standardBottomSheet.open = false));

const scrollableCloseButton = scrollableBottomSheet.querySelector('#scrollable-close-button');
scrollableCloseButton.addEventListener('click', () => (scrollableBottomSheet.open = false));

const events = [
  BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE,
  BOTTOM_SHEET_CONSTANTS.events.CLOSE,
  BOTTOM_SHEET_CONSTANTS.events.OPEN,
  BOTTOM_SHEET_CONSTANTS.events.READY
];

function logEvents(bottomSheet: IBottomSheetComponent): void {
  events.forEach(type => bottomSheet.addEventListener(type, console.log));
}

logEvents(standardBottomSheet);
logEvents(scrollableBottomSheet);
