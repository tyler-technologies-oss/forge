import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';

import { BackdropComponent } from '../backdrop';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals';
import { DialogAdapter } from './dialog-adapter';
import { DIALOG_CONSTANTS } from './dialog-constants';
import { DialogFoundation } from './dialog-foundation';

import template from './dialog.html';
import styles from './dialog.scss';

export interface IDialogComponent extends IWithDefaultAria, IWithElementInternals {
  open: boolean;
  persistent: boolean;
  /** @depreated Use `persistent` instead. */
  backdropClose: boolean;
  /** @depreated Use `persistent` instead. */
  escapeClose: boolean;
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
    // 'forge-dialog-move-start': CustomEvent<IDialogMoveStartEventData>;
    // 'forge-dialog-move': CustomEvent<IDialogMoveEventData>;
    // 'forge-dialog-move-end': CustomEvent<void>;
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
    return [
      DIALOG_CONSTANTS.attributes.OPEN,
      DIALOG_CONSTANTS.attributes.BACKDROP_CLOSE,
      DIALOG_CONSTANTS.attributes.ESCAPE_CLOSE
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
      case DIALOG_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.attributes.BACKDROP_CLOSE:
        this.backdropClose = coerceBoolean(newValue);
        break;
      case DIALOG_CONSTANTS.attributes.ESCAPE_CLOSE:
        this.escapeClose = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare open: boolean;

  @FoundationProperty()
  public declare persistent: boolean;

  /** @depreated Use `persistent` instead. */
  @FoundationProperty()
  public declare backdropClose: boolean;

  /** @depreated Use `persistent` instead. */
  @FoundationProperty()
  public declare escapeClose: boolean;

  public show(): void {
    this.open = true;
  }

  public hide(): void {
    this.open = false;
  }
}
