import { COMPONENT_NAME_PREFIX, KEYSTROKE_DEBOUNCE_THRESHOLD } from '../constants';
import { IOption } from '../select';
import { IListItemComponent } from '../list';
import { IListDropdownConfig } from '../list-dropdown';
import { IPopupPosition } from '../popup';
import { FIELD_CONSTANTS } from '../field/field-constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}autocomplete`;

const attributes = {
  MODE: 'mode',
  MULTIPLE: 'multiple',
  DEBOUNCE: 'debounce',
  FILTER_ON_FOCUS: 'filter-on-focus',
  ALLOW_UNMATCHED: 'allow-unmatched',
  POPUP_TARGET: 'popup-target',
  POPUP_CLASSES: 'popup-classes',
  OPTION_LIMIT: 'option-limit',
  OBSERVE_SCROLL: 'observe-scroll',
  OBSERVE_SCROLL_THRESHOLD: 'observe-scroll-threshold',
  SYNC_POPUP_WIDTH: 'sync-popup-width',
  OPEN: 'open',
  MATCH_KEY: 'match-key',
  DROPDOWN_ICON_OPEN: 'data-forge-dropdown-icon-open'
};

const selectors = {
  INPUT: FIELD_CONSTANTS.selectors.INPUT,
  DROPDOWN_ICON: '[data-forge-dropdown-icon],[data-forge-dropdown-icon],[forge-dropdown-icon],.forge-dropdown-icon',
  CLEAR_BUTTON: '[data-forge-autocomplete-clear],[forge-autocomplete-clear]'
};

const numbers = {
  DEFAULT_DEBOUNCE_TIME: KEYSTROKE_DEBOUNCE_THRESHOLD,
  NUM_SKELETON_ITEMS: 3
};

const events = {
  CHANGE: `${elementName}-change`,
  SELECT: `${elementName}-select`,
  SCROLLED_BOTTOM: `${elementName}-scrolled-bottom`
};

export const AUTOCOMPLETE_CONSTANTS = {
  elementName,
  attributes,
  selectors,
  numbers,
  events
};

export type AutocompleteOptionBuilder<T = any> = (option: IOption<T>, filterText: string, parentElement: IListItemComponent) => HTMLElement;
export type AutocompleteOptionGroupBuilder<T = any> = (option: IAutocompleteOptionGroup<T>) => HTMLElement;
export type AutocompleteFilterCallback<T = any> = (filterText: string, value: T | null) => Array<IOption<T>> | IAutocompleteOptionGroup[] | Promise<Array<IOption<T>> | IAutocompleteOptionGroup[]>;
export type AutocompleteSelectedTextBuilder<T = any> = (selectedOptions: Array<IOption<T>>) => string;

export enum AutocompleteMode {
  Default = 'default',
  Stateless = 'stateless'
}

export interface IAutocompleteOptionGroup<T = any> {
  text?: string;
  builder?: AutocompleteOptionGroupBuilder;
  options: Array<IOption<T>>;
}

export interface IAutocompletePopupConfiguration {
  filterText: string;
  popupTarget: string;
  dropdownConfig: IListDropdownConfig;
  popupClasses: string[];
  popupOffset: IPopupPosition;
  syncPopupWidth: boolean;
  listener: (value: string) => void;
  scrollEndListener: () => void;
}

export interface IAutocompleteSelectEventData {
  value: any;
}
