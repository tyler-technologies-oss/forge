import { PopupPlacement } from '../popup/popup-constants';
import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}toast`;

const observedAttributes = {
  MESSAGE: 'message',
  ACTION_TEXT: 'action-text',
  DURATION: 'duration',
  PLACEMENT: 'placement',
  DISMISSIBLE: 'dismissible'
};


const attributes = {
  ...observedAttributes
};

const events = {
  ACTION: `${elementName}-action`,
  CLOSE: `${elementName}-close`
};

const defaults = {
  PLACEMENT: 'bottom' as ToastPlacement,
  DURATION: 2750
};

export const TOAST_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  defaults,
  events
};

export type ToastPlacement = PopupPlacement;
