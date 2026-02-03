import { COMPONENT_NAME_PREFIX } from '../../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-bar-search`;

const selectors = {
  ROOT: '.forge-app-bar-search',
  INPUT: 'input'
};

const attributes = {
  DISABLED: 'disabled',
  VALUE: 'value',
  PLACEHOLDER: 'placeholder'
};

const events = {
  INPUT: `${elementName}-input`
};

export const APP_BAR_SEARCH_CONSTANTS = {
  elementName,
  selectors,
  attributes,
  events
};

export interface IAppBarSearchInputEventData {
  value: string;
}
