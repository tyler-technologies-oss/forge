import { COMPONENT_NAME_PREFIX } from '../constants.js';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}view-switcher`;

const classes = {
  ROOT: 'forge-view-switcher',
  VIEW_HIDDEN: 'forge-view-switcher__view--hidden',
  VIEW_SWITCHER_SLIDE: 'slide',
  VIEW_SWITCHER_FADE: 'fade'
};

const selectors = {
  ROOT: `.${classes.ROOT}`,
  DEFAULT_SLOT: 'slot:not([name])',
  VIEW_HIDDEN: `.${classes.VIEW_HIDDEN}`
};

const attributes = {
  INDEX: 'index',
  ANIMATION_TYPE: 'animation-type'
};

const numbers = {
  DEFAULT_TRANSITION_DURATION: 500
};

export const VIEW_SWITCHER_CONSTANTS = {
  elementName,
  attributes,
  classes,
  selectors,
  numbers
};

export interface IViewSwitcherView {
  element: HTMLElement;
}

export enum ViewAnimationDirection {
  Left = 'left',
  Right = 'right'
}

/** @deprecated Use `ViewSwitcherAnimation` type instead. */
export enum ViewSwitcherAnimationType {
  None = 'none',
  Slide = 'slide',
  Fade = 'fade'
}

export type ViewSwitcherAnimation = 'none' | 'slide' | 'fade';
