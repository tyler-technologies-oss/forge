import { COMPONENT_NAME_PREFIX } from '../constants';

const elementName: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}dialog`;

const observedAttributes = {
  OPEN: 'open',
  VISIBLE: 'visible',
  MODE: 'mode',
  TYPE: 'type',
  ANIMATION_TYPE: 'animation-type',
  PRESET: 'preset',
  PERSISTENT: 'persistent',
  FULLSCREEN: 'fullscreen',
  FULLSCREEN_THRESHOLD: 'fullscreen-threshold',
  TRIGGER: 'trigger',
  MOVEABLE: 'moveable',
  MOVE_TARGET: 'move-target',
  POSITION_STRATEGY: 'position-strategy',
  PLACEMENT: 'placement',
  SIZE_STRATEGY: 'size-strategy',
  LABEL: 'label',
  DESCRIPTION: 'description'
};

const attributes = {
  ...observedAttributes,
  ARIA_LABEL_ID: 'forge-dialog-label',
  ARIA_DESCRIPTION_ID: 'forge-dialog-description'
};

const classes = {
  MOVED: 'moved',
  MOVING: 'moving'
};

const selectors = {
  DIALOG: '.forge-dialog',
  SURFACE: '.surface',
  MOVE_HANDLE: '.move-handle',
  AUTOFOCUS: ':is([autofocus],[forge-dialog-focus])'
};

const events = {
  BEFORE_CLOSE: `${elementName}-before-close`,
  OPEN: `${elementName}-open`,
  CLOSE: `${elementName}-close`,
  MOVE_START: `${elementName}-move-start`,
  MOVE: `${elementName}-move`,
  MOVE_END: `${elementName}-move-end`,
  FULLSCREEN_CHANGE: `${elementName}-fullscreen-change`
};

const defaults = {
  MODE: 'modal' as DialogMode,
  TYPE: 'dialog' as DialogType,
  ANIMATION_TYPE: 'zoom' as DialogAnimationType,
  PRESET: 'dialog' as DialogPreset,
  SIZE_STRATEGY: 'content' as DialogSizeStrategy,
  POSITION_STRATEGY: 'viewport' as DialogPositionStrategy,
  PLACEMENT: 'center' as DialogPlacement,
  FULLSCREEN_THRESHOLD: 599
};

export const DIALOG_CONSTANTS = {
  elementName,
  observedAttributes,
  classes,
  attributes,
  selectors,
  events,
  defaults
};

export interface IDialogMoveEventData {
  x: number;
  y: number;
}

export interface IDialogMoveContext {
  top: number;
  left: number;
  height: number;
  width: number;
}

export interface IDialogMoveStartEventData extends IDialogMoveEventData {}

export type DialogMode = 'modal' | 'inline-modal' | 'nonmodal';
export type DialogType = 'dialog' | 'alertdialog';
export type DialogAnimationType = 'none' | 'zoom' | 'fade' | 'slide' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
export type DialogPositionStrategy = 'viewport' | 'container';
export type DialogPlacement = 'custom' | 'center' | 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type DialogSizeStrategy = 'content' | 'container-inline' | 'container-block';
export type DialogPreset = 'dialog' | 'bottom-sheet' | 'top-sheet' | 'left-sheet' | 'right-sheet';

export const hideBackdrop = Symbol('hideBackdrop');
export const showBackdrop = Symbol('showBackdrop');
export const dialogStack = Symbol('dialogStack');
