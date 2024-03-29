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

import template from './dialog.html';
import styles from './dialog.scss';

export interface IDialogComponent extends IWithDefaultAria, IWithElementInternals {
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

const BaseClass = WithDefaultAria(WithElementInternals(BaseComponent));

/**
 * @tag forge-dialog
 */
@CustomElement({
  name: DIALOG_CONSTANTS.elementName,
  dependencies: [
    BackdropComponent
  ]
})
export class DialogComponent extends BaseClass implements IDialogComponent {
  public static get observedAttributes(): string[] {
    return Object.values(DIALOG_CONSTANTS.observedAttributes);
  }

  /** Contains all the dialogs that are currently open. */
  public static readonly [dialogStack]: Set<IDialogComponent> = new Set();

  private _foundation: DialogFoundation;

  public [hideBackdrop](): void {
    this._foundation.hideBackdrop();
  }
  
  public [showBackdrop](): void {
    this._foundation.showBackdrop();
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

  public show(): void {
    this.open = true;
  }

  public hide(): void {
    this.open = false;
  }
}
