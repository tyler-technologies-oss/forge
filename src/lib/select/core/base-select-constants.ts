import { IListDropdownOption, IListDropdownOptionGroup } from '../../list-dropdown/list-dropdown-constants';

export type SelectOptionBuilder = (option: ISelectOption, parentElement: HTMLElement) => HTMLElement;
export type SelectSelectedTextBuilder = (selectedOptions: IListDropdownOption[]) => string;
export type SelectOptionListenerDestructor = () => void;
export type SelectBeforeValueChangeCallback<T> = (value: T | T[]) => boolean | Promise<boolean>;

export interface ISelectOption extends IListDropdownOption {}
export interface ISelectOptionGroup extends IListDropdownOptionGroup {}

const observedAttributes = {
  VALUE: 'value',
  MULTIPLE: 'multiple',
  OBSERVE_SCROLL: 'observe-scroll',
  OBSERVE_SCROLL_THRESHOLD: 'observe-scroll-threshold',
  POPUP_CLASSES: 'popup-classes',
  OPTION_LIMIT: 'option-limit',
  SYNC_POPUP_WIDTH: 'sync-popup-width',
  CONSTRAIN_POPUP_WIDTH: 'constrain-popup-width',
  WRAP_OPTION_TEXT: 'wrap-option-text'
};

const attributes = {
  ...observedAttributes
};

const events = {
  CHANGE: 'change'
};

export const BASE_SELECT_CONSTANTS = {
  attributes,
  events
};
