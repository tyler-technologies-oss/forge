import '$src/shared';
import '@tylertech/forge/popup';
import '@tylertech/forge/select';
import '@tylertech/forge/text-field';
import '@tylertech/forge/divider';
import '@tylertech/forge/button';
import type { IPopupComponent, IPopupPositionEventData, ISelectComponent } from '@tylertech/forge';

let popupElement: IPopupComponent | undefined;
let childPopupElement: IPopupComponent | undefined;
const popupTemplate = document.getElementById('forge-popup-template') as HTMLTemplateElement;
const popupPlacementSelect = document.getElementById('opt-placement') as ISelectComponent;

const showPopupButton = document.getElementById('show-popup-button');
showPopupButton.addEventListener('click', () => {
  showPopup();
});

function showPopup(): void {
  if (!popupElement) {
    popupElement = document.createElement('forge-popup');
    popupElement.targetElement = showPopupButton;
    popupElement.placement = popupPlacementSelect.value;
    popupElement.appendChild(popupTemplate.content.cloneNode(true));
    popupElement.open = true;

    showPopupButton.addEventListener('forge-popup-blur', blurListener);
    showPopupButton.addEventListener('forge-popup-position', positionListener);

    const childButton = popupElement.querySelector('button');
    if (childButton) {
      childButton.addEventListener('click', () => {
        if (!childPopupElement) {
          childPopupElement = addChildPopup(popupElement);
          childPopupElement.targetElement.addEventListener('forge-popup-close', () => {
            childPopupElement = undefined;
          });
        } else {
          childPopupElement.open = false;
          childPopupElement = undefined;
        }
      });
    }
  } else {
    closePopup();
  }
}

function closePopup(): void {
  if (popupElement) {
    popupElement.open = false;
    childPopupElement = undefined;
    popupElement = undefined;
  }
};

function blurListener(evt: Event): void {
  // evt.preventDefault(); // This will causes the popup to not close when focus is outside of the popup
  console.log(evt);
  popupElement = undefined;
  childPopupElement = undefined;
}

function positionListener(evt: CustomEvent<IPopupPositionEventData>): void {
  console.log(evt.detail);
}

function addChildPopup(parentElement: HTMLElement): IPopupComponent {
  const popupTarget = parentElement.querySelector('button');
  let _popupElement: IPopupComponent | undefined;

  if (popupTarget) {
    _popupElement = document.createElement('forge-popup');
    _popupElement.targetElement = popupTarget;
    _popupElement.placement = popupPlacementSelect.value;
    _popupElement.appendChild(popupTemplate.content.cloneNode(true));
    _popupElement.querySelector('h2').innerText = 'Child popup';
    _popupElement.open = true;
  }

  return _popupElement;
};
