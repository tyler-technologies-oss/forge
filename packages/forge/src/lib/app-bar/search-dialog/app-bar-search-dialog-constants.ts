import { COMPONENT_NAME_PREFIX } from '../../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-bar-search-dialog`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const APP_BAR_SEARCH_DIALOG_CONSTANTS = {
  elementName,
  events: {
    SUBMIT: `${elementName}-submit`
  }
};

export interface AppBarSearchDialogSubmitEventData {
  value: string;
}
