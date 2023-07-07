import { ISliderComponent } from '../slider';
import { SLIDER_CONSTANTS } from './slider-constants';

export function createStartInputElement(component: ISliderComponent): HTMLInputElement {
  const startInput = document.createElement('input');
  startInput.type = 'range';
  startInput.id = 'start';
  startInput.min = String(component.min);
  startInput.max = String(component.max);
  startInput.step = String(component.step);
  startInput.valueAsNumber = component.valueStart;
  startInput.disabled = component.disabled;
  startInput.classList.add('start');
  
  if (component.hasAttribute(SLIDER_CONSTANTS.attributes.ARIA_LABEL_START)) {
    startInput.setAttribute('aria-label', component.getAttribute(SLIDER_CONSTANTS.attributes.ARIA_LABEL_START) as string);
  }
  startInput.setAttribute('aria-valuetext', String(component.valueStart));

  return startInput;
}

export function createStartHandleElement(thumbLabel: string): HTMLElement {
  const startHandle = document.createElement('div');
  startHandle.classList.add(SLIDER_CONSTANTS.classes.HANDLE, SLIDER_CONSTANTS.classes.HANDLE_START);
  startHandle.setAttribute('part', 'handle-start');
  
  const startHandleThumb = document.createElement('div');
  startHandleThumb.classList.add(SLIDER_CONSTANTS.classes.HANDLE_THUMB);
  startHandleThumb.setAttribute('part', 'handle-start-thumb');
  startHandle.appendChild(startHandleThumb);
  
  const startHandleLabel = document.createElement('div');
  startHandleLabel.classList.add(SLIDER_CONSTANTS.classes.HANDLE_LABEL);
  startHandleLabel.setAttribute('part', 'handle-start-label');
  startHandle.appendChild(startHandleLabel);

  const startHandleLabelContent = document.createElement('span');
  startHandleLabelContent.textContent = thumbLabel;
  startHandleLabelContent.classList.add(SLIDER_CONSTANTS.classes.LABEL_CONTENT);
  startHandleLabelContent.setAttribute('part', 'handle-start-label-content');
  startHandleLabel.appendChild(startHandleLabelContent);

  const startHandleRipple = document.createElement('span');
  startHandleRipple.classList.add(SLIDER_CONSTANTS.classes.HANDLE_RIPPLE);
  startHandle.appendChild(startHandleRipple);
  
  return startHandle;
}

export function createLabel(text: string): HTMLElement {
  const labelElement = document.createElement('div');
  labelElement.classList.add(SLIDER_CONSTANTS.classes.LABEL);

  const labelContentElement = document.createElement('span');
  labelContentElement.textContent = text;
  labelContentElement.classList.add(SLIDER_CONSTANTS.classes.LABEL_CONTENT);
  labelElement.appendChild(labelContentElement);

  return labelElement;
}
