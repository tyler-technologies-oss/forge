import { COMPONENT_NAME_PREFIX } from '../../constants';
import { IOption } from '../../select';

const elementName = `${COMPONENT_NAME_PREFIX}app-bar-search`;

const classes = {
  FOCUSED: 'forge-app-bar-search--focused',
  DISABLED: 'forge-app-bar-search--disabled'
};

const selectors = {
  ROOT: '.forge-app-bar-search',
  INPUT: 'input',
  GLOBAL_ICON_CONTAINER: '.forge-app-bar-search__global-icon-container',
  CONTEXT_CONTAINER: '.forge-app-bar-search__context'
};

const attributes = {
  DISABLED: 'disabled',
  VALUE: 'value',
  PLACEHOLDER: 'placeholder',
  COMBINED: 'combined',
  GLOBAL: 'global'
};

const events = {
  INPUT: `${elementName}-input`
};

const strings = {
  DEFAULT_CONTEXT: 'global'
};

export const APP_BAR_SEARCH_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events,
  strings
};

export const DEFAULT_COMBINED_OPTIONS: IOption[] = [
  { label: 'in this application', value: 'local' },
  { label: 'in all products', value: strings.DEFAULT_CONTEXT }
];

export interface IAppBarSearchInputEventData {
  value: string;
  combined: boolean;
  context: string;
}
