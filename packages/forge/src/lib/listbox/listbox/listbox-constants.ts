import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}listbox`;

const observedAttributes = {
  MULTIPLE: 'multiple',
  DISABLED: 'disabled',
  ORIENTATION: 'orientation'
};

const attributes = {
  ...observedAttributes
};

const events = {
  CHANGE: `${elementName}-change`,
  ACTIVATE: `${elementName}-activate`
};

const selectors = {
  OPTION: '[role="option"]',
  OPTION_NOT_DISABLED: '[role="option"]:not([aria-disabled="true"])',
  OPTION_GROUP: '[role="group"]'
};

export const LISTBOX_CONSTANTS = {
  elementName,
  observedAttributes,
  attributes,
  events,
  selectors
};

export interface IListboxChangeEventData {
  value: any | any[];
  previousValue: any | any[] | null;
}

export interface IListboxActivateEventData {
  value: any;
}

export interface ListboxOptionData {
  element: HTMLElement;
  value: any;
  label: string;
  disabled: boolean;
  index: number;
}
