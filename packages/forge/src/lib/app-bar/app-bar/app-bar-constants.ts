import { COMPONENT_NAME_PREFIX } from '../../constants.js';

export const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}app-bar`;

const observedAttributes = {
  TITLE_TEXT: 'title-text',
  ELEVATION: 'elevation',
  THEME: 'theme',
  HREF: 'href',
  TARGET: 'target',
  THEME_MODE: 'theme-mode'
};

const attributes = {
  ...observedAttributes
};

const classes = {
  NO_CENTER: 'no-center',
  LOGO_TITLE_CONTAINER: 'logo-title-container',
  TITLE: 'title'
};

const selectors = {
  ROOT: '.forge-app-bar',
  LOGO_TITLE_CONTAINER: '.logo-title-container',
  CENTER_SLOT: 'slot[name=center]',
  CENTER_SECTION: '#center-section'
};

const events = {
  NAVIGATE: `${elementName}-navigate`,
  UPDATE: `${elementName}-update`
};

export const APP_BAR_CONSTANTS = {
  elementName,
  selectors,
  attributes,
  classes,
  events
};

export type AppBarElevation = 'none' | 'raised';
export type AppBarTheme = 'white' | 'custom' | '';
export type AppBarThemeMode = 'inherit' | 'scoped';

export type AppBarOverflowReason = 'title' | 'search' | 'end';

export interface AppBarUpdateEventData {
  /** Whether the app bar is in its mobile state. */
  mobile: boolean;
  /** What caused the mobile state: a truncated title, an `end` slot that doesn't fit alongside search, or an `end` slot that doesn't fit. */
  reason?: AppBarOverflowReason;
}
