import { PositionPlacement } from '@tylertech/forge-core';
import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}popup`;

const attributes = {
  CONTAINER: 'forge-popup',
  OPEN: 'open',
  PLACEMENT: 'placement',
  MANAGE_FOCUS: 'manage-focus',
  ANIMATION_TYPE: 'animation-type',
  STATIC: 'static',
  HIDE_WHEN_CLIPPED: 'hide-when-clipped',
  HOST: 'forge-popup-host',
  INITIAL_FOCUS: 'forge-popup-focus'
};

const classes = {
  OPEN: 'forge-popup--open',
  OPENING: 'forge-popup--opening',
  CLOSED: 'forge-popup--closed',
  SELECT: 'forge-popup--select'
};

const selectors = {
  HOST: `.forge-popup-host, [${attributes.HOST}]`,
  CONTAINER: '.forge-popup',
  INITIAL_FOCUS: `[${attributes.INITIAL_FOCUS}]`
};

const events = {
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  POSITION: `${elementName}-position`,
  BLUR: `${elementName}-blur`
};

const numbers = {
  ANIMATION_DURATION: 120
};

export const POPUP_CONSTANTS = {
  elementName,
  classes,
  selectors,
  attributes,
  events,
  numbers
};

export interface IPopupPosition {
  x: number;
  y: number;
}

export type PopupPlacement = PositionPlacement;

export enum PopupAnimationType {
  None = 'none',
  Menu = 'menu',
  Dropdown = 'dropdown'
}

export interface IPopupPositionEventData extends IPopupPosition {
  visibility: 'visible' | 'hidden';
}

export type PopupStateCallback = () => boolean | void | Promise<boolean | void>;
