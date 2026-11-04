import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-layout`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const APP_LAYOUT_CONSTANTS = {
  elementName
};

export const APP_LAYOUT_CLOSE_ATTRIBUTE = 'data-forge-app-layout-close';

export type AppLayoutBreakpoint = 'small' | 'large';

export interface AppLayoutBreakpointChangeEventData {
  breakpoint: AppLayoutBreakpoint;
}

export interface AppLayoutDrawerChangeEventData {
  open: boolean;
}
