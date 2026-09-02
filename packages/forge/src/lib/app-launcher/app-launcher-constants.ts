import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-launcher`;

/** @deprecated - These are internal constants that will be removed/moved in the future. Please avoid using them. */
export const APP_LAUNCHER_CONSTANTS = {
  elementName
};

export interface AppLauncherOption {
  label: string;
  uri: string;
  iconName: string;
  target?: string;
}

export type AppLauncherView = 'related' | 'all' | 'loading';
