import { COMPONENT_NAME_PREFIX, KEYSTROKE_DEBOUNCE_THRESHOLD } from '../constants.js';
import { IListItemComponent } from '../list/index.js';
import { IListDropdownConfig, IListDropdownOption, IListDropdownOptionGroup, ListDropdownOptionGroupBuilder } from '../list-dropdown/index.js';
import { IOverlayOffset } from '../overlay/overlay-constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}autocomplete`;

const attributes = {
  MODE: 'mode',
  MULTIPLE: 'multiple',
  DEBOUNCE: 'debounce',
  FILTER_ON_FOCUS: 'filter-on-focus',
  FILTER_FOCUS_FIRST: 'filter-focus-first',
  SELECT_FIRST_OPTION_ON_BLUR: 'select-first-option-on-blur',
  ALLOW_UNMATCHED: 'allow-unmatched',
  POPUP_TARGET: 'popup-target',
  POPUP_CLASSES: 'popup-classes',
  OPTION_LIMIT: 'option-limit',
  OBSERVE_SCROLL: 'observe-scroll',
  OBSERVE_SCROLL_THRESHOLD: 'observe-scroll-threshold',
  SYNC_POPUP_WIDTH: 'sync-popup-width',
  OPEN: 'open',
  MATCH_KEY: 'match-key',
  FILTER_TEXT: 'filter-text',
  DROPDOWN_ICON_OPEN: 'data-forge-dropdown-icon-open'
};

const selectors = {
  INPUT: 'input',
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

export type AutocompleteOptionBuilder<T = any> = (option: IAutocompleteOption<T>, filterText: string, parentElement: IListItemComponent) => HTMLElement;
export type AutocompleteOptionGroupBuilder<T = any> = ListDropdownOptionGroupBuilder<T>;
export type AutocompleteFilterCallback<T = any> = (
  filterText: string,
  value: T | null
) => IAutocompleteOption<T>[] | IAutocompleteOptionGroup<T>[] | Promise<IAutocompleteOption<T>[] | IAutocompleteOptionGroup<T>[]>;
export type AutocompleteSelectedTextBuilder<T = any> = (selectedOptions: Array<IAutocompleteOption<T>>) => string;

export enum AutocompleteMode {
  Default = 'default',
  Stateless = 'stateless'
}

export interface IAutocompleteOption<T = any> extends IListDropdownOption<T> {}
export interface IAutocompleteOptionGroup<T = any> extends IListDropdownOptionGroup<T> {}

export interface IAutocompletePopupConfiguration {
  filterText: string;
  popupTarget: string;
  dropdownConfig: IListDropdownConfig;
  popupClasses: string[];
  popupOffset: IOverlayOffset;
  syncPopupWidth: boolean;
  listener: (value: string) => void;
  scrollEndListener: () => void;
}

export interface IAutocompleteSelectEventData<T = any> {
  value: T;
}

export interface IAutocompleteForceFilterOptions {
  preserveValue: boolean;
}
