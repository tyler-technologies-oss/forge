import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BackdropComponent } from '../backdrop';
import { BaseComponent } from '../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals';
import { DialogAdapter } from './dialog-adapter';
import { DialogFoundation } from './dialog-foundation';
import {
  DialogAnimationType,
  DialogMode,
  DialogPlacement,
  DialogPositionStrategy,
  DialogPreset,
  DialogSizeStrategy,
  dialogStack,
  DialogType,
  DIALOG_CONSTANTS,
  hideBackdrop,
  IDialogMoveEventData,
  IDialogMoveStartEventData,
  showBackdrop
} from './dialog-constants';
import { IDismissible, IDismissibleStackState, tryDismiss } from '../core/utils/dismissible-stack';

import template from './dialog.html';
import styles from './dialog.scss';

export interface IDialogProperties {
  open: boolean;
  mode: DialogMode;
  type: DialogType;
  animationType: DialogAnimationType;
  preset: DialogPreset;
  persistent: boolean;
  fullscreen: boolean;
  trigger: string;
  triggerElement: HTMLElement | null;
  positionStrategy: DialogPositionStrategy;
  sizeStrategy: DialogSizeStrategy;
  placement: DialogPlacement;
  moveable: boolean;
}

export interface IDialogComponent extends IDialogProperties, IWithDefaultAria, IWithElementInternals, IDismissible {
  show(): void;
  hide(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-dialog': IDialogComponent;
  }

  interface HTMLElementEventMap {
    'forge-dialog-open': CustomEvent<void>;
    'forge-dialog-close': CustomEvent<void>;
    'forge-dialog-before-close': CustomEvent<void>;
    'forge-dialog-move-start': CustomEvent<IDialogMoveStartEventData>;
    'forge-dialog-move': CustomEvent<IDialogMoveEventData>;
    'forge-dialog-move-end': CustomEvent<void>;
  }
}

/**
 * @tag forge-dialog
 * 
 * @summary Dialogs are temporary UI elements that are used to display information, ask for input, or confirm actions.
 * 
 * @dependency forge-backdrop
 * 
 * @property {boolean} [open=false] - Indicates whether the dialog is open.
 * @property {DialogMode} [mode="modal"] - The mode of the dialog.
 * @property {DialogType} [type="dialog"] - The type of the dialog.
 * @property {DialogAnimationType} [animationType="zoom"] - The animation type of the dialog.
 * @property {DialogPreset} [preset="dialog"] - The preset design that the dialog will apply.
 * @property {boolean} [persistent=false] - Indicates whether the dialog is dismissible via escape and backdrop click or not.
 * @property {boolean} [fullscreen=false] - Indicates whether the dialog is fullscreen or not.
 * @property {string} trigger - The selector of the element that triggers the dialog.
 * @property {HTMLElement | null} [triggerElement=null] - The element that triggers the dialog.
 * @property {boolean} [moveable=false] - Indicates whether the dialog is moveable or not.
 * @property {DialogPositionStrategy} [positionStrategy="viewport"] - Controls whether the dialog is rendered relative to the viewport its nearest containing block.
 * @property {DialogSizeStrategy} [sizeStrategy="content"] - Controls the block and/or inline size of the dialog. Defaults to the size of the content it contains.
 * @property {DialogPlacement} [placement="center"] - The placement of the dialog.
 * 
 * @globalconfig animationType
 * @globalconfig positionStrategy
 * @globalconfig sizeStrategy
 * @globalconfig persistent
 * @globalconfig moveable
 * 
 * @attribute {boolean} [open=false] - Indicates whether the dialog is open.
 * @attribute {DialogMode} [mode="modal"] - The mode of the dialog.
 * @attribute {DialogType} [type="dialog"] - The type of the dialog.
 * @attribute {DialogAnimationType} [animationType="zoom"] - The animation type of the dialog.
 * @attribute {DialogPreset} [preset="dialog"] - The preset design that the dialog will apply.
 * @attribute {boolean} [persistent=false] - Indicates whether the dialog is dismissible via escape and backdrop click or not.
 * @attribute {boolean} [fullscreen=false] - Indicates whether the dialog is fullscreen or not.
 * @attribute {string} trigger - The selector of the element that triggers the dialog.
 * @attribute {boolean} [moveable=false] - Indicates whether the dialog is moveable or not.
 * @attribute {DialogPositionStrategy} [positionStrategy="viewport"] - Controls whether the dialog is rendered relative to the viewport its nearest containing block.
 * @attribute {DialogSizeStrategy} [sizeStrategy="content"] - Controls the block and/or inline size of the dialog. Defaults to the size of the content it contains.
 * @attribute {DialogPlacement} [placement="center"] - The placement of the dialog.
 * 
 * @event {CustomEvent<void>} forge-dialog-open - Dispatched when the dialog is opened.
 * @event {CustomEvent<void>} forge-dialog-close - Dispatched when the dialog is closed.
 * @event {CustomEvent<void>} forge-dialog-before-close - Dispatched before the dialog is closed. This event is cancelable.
 * @event {CustomEvent<IDialogMoveStartEventData>} forge-dialog-move-start - Dispatched when the dialog is first moved.
 * @event {CustomEvent<IDialogMoveEventData>} forge-dialog-move - Dispatched when the dialog is being moved.
 * @event {CustomEvent<void>} forge-dialog-move-end - Dispatched when the dialog is done being moved.
 * 
 * @cssproperty --forge-dialog-background - The background color of the dialog.
 * @cssproperty --forge-dialog-shape - The shape of the dialog.
 * @cssproperty --forge-dialog-elevation - The elevation of the dialog.
 * @cssproperty --forge-dialog-spacing - The spacing between elements inside the dialog.
 * @cssproperty --forge-dialog-block-start-spacing - The spacing at the start of the dialog block.
 * @cssproperty --forge-dialog-block-end-spacing - The spacing at the end of the dialog block.
 * @cssproperty --forge-dialog-inline-start-spacing - The spacing at the start of the dialog inline.
 * @cssproperty --forge-dialog-inline-end-spacing - The spacing at the end of the dialog inline.
 * @cssproperty --forge-dialog-padding - The padding of the dialog.
 * @cssproperty --forge-dialog-width - The width of the dialog.
 * @cssproperty --forge-dialog-height - The height of the dialog.
 * @cssproperty --forge-dialog-min-width - The minimum width of the dialog.
 * @cssproperty --forge-dialog-max-width - The maximum width of the dialog.
 * @cssproperty --forge-dialog-min-height - The minimum height of the dialog.
 * @cssproperty --forge-dialog-max-height - The maximum height of the dialog.
 * @cssproperty --forge-dialog-z-index - The z-index of the dialog.
 * @cssproperty --forge-dialog-move-handle-color - The color of the move handle.
 * @cssproperty --forge-dialog-move-handle-size - The size of the move handle.
 * @cssproperty --forge-dialog-move-handle-hover-cursor - The cursor style when hovering over the move handle.
 * @cssproperty --forge-dialog-move-handle-active-cursor - The cursor style when the move handle is active.
 * @cssproperty --forge-dialog-move-handle-spacing - The spacing around the move handle.
 * @cssproperty --forge-dialog-move-transition-duration - The duration of the move transition.
 * @cssproperty --forge-dialog-move-transition-easing - The easing function of the move transition.
 * @cssproperty --forge-dialog-moving-opacity - The opacity of the dialog when it is being moved.
 * @cssproperty --forge-dialog-enter-animation-duration - The duration of the enter animation.
 * @cssproperty --forge-dialog-enter-animation-easing - The easing function of the enter animation.
 * @cssproperty --forge-dialog-exit-animation-duration - The duration of the exit animation.
 * @cssproperty --forge-dialog-exit-animation-easing - The easing function of the exit animation.
 * @cssproperty --forge-dialog-zoom-opacity - The opacity of the dialog during zoom animation.
 * @cssproperty --forge-dialog-zoom-scale - The scale of the dialog during zoom animation.
 * @cssproperty --forge-dialog-fade-opacity - The opacity of the dialog during fade animation.
 * @cssproperty --forge-dialog-slide-opacity - The opacity of the dialog during slide animation.
 * @cssproperty --forge-dialog-slide-translate - The translation distance of the dialog during slide animation.
 * @cssproperty --forge-dialog-backdrop-opacity - The opacity of the dialog backdrop.
 * @cssproperty --forge-dialog-nonmodal-elevation - The elevation of non-modal dialogs.
 * @cssproperty --forge-dialog-fullscreen-enter-animation-duration - The duration of the enter animation for fullscreen dialogs.
 * @cssproperty --forge-dialog-fullscreen-exit-animation-duration - The duration of the exit animation for fullscreen dialogs.
 * @cssproperty --forge-dialog-position-x - The x-axis position of the dialog.
 * @cssproperty --forge-dialog-position-y - The y-axis position of the dialog.
 * @cssproperty --forge-dialog-preset-sheet-enter-animation-duration - The duration of the enter animation for preset sheet dialogs.
 * @cssproperty --forge-dialog-preset-sheet-exit-animation-duration - The duration of the exit animation for preset sheet dialogs.
 * 
 * @csspart root - The dialog container element.
 * @csspart backdrop - The backdrop element.
 * @csspart surface - The dialog surface element.
 * @csspart move-handle-container - The alignment container for the move handle.
 * @csspart move-handle - The move handle element.
 * @csspart move-handle-icon - The move handle icon element.
 * 
 * @slot - The content of the dialog.
 * @slot move-handle - The move handle content.
 */
@CustomElement({
  name: DIALOG_CONSTANTS.elementName,
  dependencies: [
    BackdropComponent
  ]
})
export class DialogComponent extends WithDefaultAria(WithElementInternals(BaseComponent)) implements IDialogComponent {
  public static get observedAttributes(): string[] {
    return Object.values(DIALOG_CONSTANTS.observedAttributes);
  }

  /**
   * @internal
   * Contains all the dialogs that are currently open.
   */
  public static readonly [dialogStack]: Set<IDialogComponent> = new Set();

  private _foundation: DialogFoundation;

  /** @internal */
  public [hideBackdrop](): void {
    this._foundation.hideBackdrop();
  }
  
  /** @internal */
  public [showBackdrop](): void {
    this._foundation.showBackdrop();
  }

  public [tryDismiss](_state?: IDismissibleStackState<string> | undefined): boolean {
    return this._foundation.dispatchBeforeCloseEvent();
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new DialogFoundation(new DialogAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case DIALOG_CONSTANTS.observedAttributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.observedAttributes.MODE:
        this.mode = newValue as DialogMode ?? DIALOG_CONSTANTS.defaults.MODE;
        break;
      case DIALOG_CONSTANTS.observedAttributes.TYPE:
        this.type = newValue as DialogType ?? DIALOG_CONSTANTS.defaults.TYPE;
        break;
      case DIALOG_CONSTANTS.observedAttributes.ANIMATION_TYPE:
        this.animationType = newValue as DialogAnimationType ?? DIALOG_CONSTANTS.defaults.ANIMATION_TYPE;
        break;
      case DIALOG_CONSTANTS.observedAttributes.PRESET:
        this.preset = newValue as DialogPreset ?? DIALOG_CONSTANTS.defaults.PRESET;
        break;
      case DIALOG_CONSTANTS.observedAttributes.PERSISTENT:
        this.persistent = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.observedAttributes.FULLSCREEN:
        this.fullscreen = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.observedAttributes.TRIGGER:
        this.trigger = newValue;
        break;
      case DIALOG_CONSTANTS.observedAttributes.MOVEABLE:
        this.moveable = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.observedAttributes.POSITION_STRATEGY:
        this.positionStrategy = newValue as DialogPositionStrategy ?? DIALOG_CONSTANTS.defaults.POSITION_STRATEGY;
        break;
      case DIALOG_CONSTANTS.observedAttributes.SIZE_STRATEGY:
        this.sizeStrategy = newValue as DialogSizeStrategy ?? DIALOG_CONSTANTS.defaults.SIZE_STRATEGY;
        break;
      case DIALOG_CONSTANTS.observedAttributes.PLACEMENT:
        this.placement = newValue as DialogPlacement ?? DIALOG_CONSTANTS.defaults.PLACEMENT;
        break;
    }
  }

  @FoundationProperty()
  public declare open: boolean;
  
  @FoundationProperty()
  public declare mode: DialogMode;

  @FoundationProperty()
  public declare type: DialogType;

  @FoundationProperty()
  public declare animationType: DialogAnimationType;

  @FoundationProperty()
  public declare preset: DialogPreset;

  @FoundationProperty()
  public declare persistent: boolean;

  @FoundationProperty()
  public declare fullscreen: boolean;

  @FoundationProperty()
  public declare trigger: string;

  @FoundationProperty()
  public declare triggerElement: HTMLElement | null;

  @FoundationProperty()
  public declare moveable: boolean;

  @FoundationProperty()
  public declare positionStrategy: DialogPositionStrategy;

  @FoundationProperty()
  public declare sizeStrategy: DialogSizeStrategy;

  @FoundationProperty()
  public declare placement: DialogPlacement;

  /** Shows the dialog. */
  public show(): void {
    this.open = true;
  }

  /** Hides the dialog. */
  public hide(): void {
    this.open = false;
  }
}
