import { CustomElement, attachShadowTemplate, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';

import { DialogFoundation } from './dialog-foundation';
import { DialogAdapter } from './dialog-adapter';
import { DIALOG_CONSTANTS, DialogPositionType, IDialogMoveStartEventData, IDialogMoveEventData, DialogStateCallback } from './dialog-constants';
import { BackdropComponent } from '../backdrop';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './dialog.html';
import styles from './dialog.scss';

export interface IDialogComponent extends IBaseComponent {
  backdropClose: boolean;
  escapeClose: boolean;
  open: boolean;
  fullscreen: boolean;
  openCallback: DialogStateCallback;
  closeCallback: DialogStateCallback;
  beforeCloseCallback: () => boolean | Promise<boolean>;
  positionType: DialogPositionType;
  positionX: number | string | null;
  positionY: number | string | null;
  moveable: boolean;
  moveTarget: string;
  initializeMoveTarget(): void;
  resetPosition(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-dialog': IDialogComponent;
  }

  interface HTMLElementEventMap {
    'forge-dialog-before-close': CustomEvent<void>;
    'forge-dialog-open': CustomEvent<void>;
    'forge-dialog-close': CustomEvent<void>;
    'forge-dialog-ready': CustomEvent<void>;
    'forge-dialog-move-start': CustomEvent<IDialogMoveStartEventData>;
    'forge-dialog-move': CustomEvent<IDialogMoveEventData>;
    'forge-dialog-move-end': CustomEvent<void>;
  }
}

/**
 * The web component class behind the `<forge-dialog>` custom element.
 * 
 * @tag forge-dialog
 */
@CustomElement({
  name: DIALOG_CONSTANTS.elementName,
  dependencies: [BackdropComponent]
})
export class DialogComponent extends BaseComponent implements IDialogComponent {
  public static get observedAttributes(): string[] {
    return [
      DIALOG_CONSTANTS.attributes.BACKDROP_CLOSE,
      DIALOG_CONSTANTS.attributes.ESCAPE_CLOSE,
      DIALOG_CONSTANTS.attributes.OPEN,
      DIALOG_CONSTANTS.attributes.FULLSCREEN,
      DIALOG_CONSTANTS.attributes.POSITION_TYPE,
      DIALOG_CONSTANTS.attributes.POSITION_X,
      DIALOG_CONSTANTS.attributes.POSITION_Y,
      DIALOG_CONSTANTS.attributes.MOVEABLE,
      DIALOG_CONSTANTS.attributes.MOVE_TARGET
    ];
  }

  private _foundation: DialogFoundation;

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
      case DIALOG_CONSTANTS.attributes.BACKDROP_CLOSE:
        this.backdropClose = newValue === 'true';
        break;
      case DIALOG_CONSTANTS.attributes.ESCAPE_CLOSE:
        this.escapeClose = newValue === 'true';
        break;
      case DIALOG_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.attributes.FULLSCREEN:
        this.fullscreen = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.attributes.POSITION_TYPE:
        this.positionType = newValue as DialogPositionType;
        break;
      case DIALOG_CONSTANTS.attributes.POSITION_X:
        this.positionX = newValue;
        break;
      case DIALOG_CONSTANTS.attributes.POSITION_Y:
        this.positionY = newValue;
        break;
      case DIALOG_CONSTANTS.attributes.MOVEABLE:
        this.moveable = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.attributes.MOVE_TARGET:
        this.moveTarget = newValue;
        break;
    }
  }

  /** Controls whether clicking the backdrop closes the dialog or not. Default is true. */
  @FoundationProperty()
  public declare backdropClose: boolean;

  /** Controls whether pressing the escape key closes the dialog or not. Default is true. */
  @FoundationProperty()
  public declare escapeClose: boolean;

  /** Controls whether the dialog is open or not. Default is false. */
  @FoundationProperty()
  public declare open: boolean;

  /** Controls whether the dialog is full screen or not. Default is false. */
  @FoundationProperty()
  public declare fullscreen: boolean;

  /** The function to call when the dialog wants to open. */
  @FoundationProperty()
  public declare openCallback: DialogStateCallback;

  /** the function to call when the dialog wants to close. */
  @FoundationProperty()
  public declare closeCallback: DialogStateCallback;

  /** the function to call when the dialog wants to close. */
  @FoundationProperty()
  public declare beforeCloseCallback: () => boolean | Promise<boolean>;

  /** Gets/sets the position type when using custom positioning values. Default is 'absolute'. */
  @FoundationProperty()
  public declare positionType: DialogPositionType;

  /** Controls the horizontal position of the dialog surface. */
  @FoundationProperty()
  public declare positionX: number | string | null;

  /** Controls the vertical position of the dialog surface. */
  @FoundationProperty()
  public declare positionY: number | string | null;

  /** Gets/sets whether the dialog surface can be moved or not. */
  @FoundationProperty()
  public declare moveable: boolean;

  /** Gets/sets the selector used to target the element that is used as the drag target. */
  @FoundationProperty()
  public declare moveTarget: string;

  public initializeMoveTarget(): void {
    this._foundation.initializeMoveTarget();
  }

  public resetPosition(): void {
    this._foundation.resetPosition();
  }
}
