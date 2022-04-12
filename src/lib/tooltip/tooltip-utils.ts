import { IElementPosition, positionElementAsync } from '@tylertech/forge-core';
import { PopupPlacement } from '../popup';
import { TOOLTIP_CONSTANTS } from './tooltip-constants';

/**
 * Attaches a positioned tooltip to the provided target element.
 * @param targetElement The element to position the tooltip around.
 * @param placement The placement of the tooltip relative to the target element.
 * @param content The content of the tooltip.
 */
export function attachTooltip(targetElement: HTMLElement, placement: PopupPlacement, content: string | HTMLElement | Text): HTMLElement {
  if (typeof content === 'string') {
    content = document.createTextNode(content);
  }

  const element = document.createElement('div');
  element.setAttribute('role', 'tooltip');
  element.classList.add(TOOLTIP_CONSTANTS.classes.TOOLTIP);
  element.appendChild(content);
  element.setAttribute('role', 'tooltip');
  element.setAttribute('aria-hidden', 'true');

  const hostDocument = targetElement.ownerDocument || document;
  hostDocument.body.appendChild(element);

  const offset: IElementPosition = { x: 0, y: 0 };
  const offsetAmount = 4;

  switch (placement) {
    case 'top':
      offset.y = -offsetAmount;
      element.classList.add(TOOLTIP_CONSTANTS.classes.TOOLTIP_TOP);
      break;
    case 'right':
      offset.x = offsetAmount;
      element.classList.add(TOOLTIP_CONSTANTS.classes.TOOLTIP_RIGHT);
      break;
    case 'bottom':
      offset.y = offsetAmount;
      element.classList.add(TOOLTIP_CONSTANTS.classes.TOOLTIP_BOTTOM);
      break;
    case 'left':
      offset.x = -offsetAmount;
      element.classList.add(TOOLTIP_CONSTANTS.classes.TOOLTIP_LEFT);
      break;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      element.classList.add(TOOLTIP_CONSTANTS.classes.TOOLTIP_OPEN);
      positionElementAsync({ element, targetElement, placement, transform: false, offset });
    });
  });

  return element;
}
