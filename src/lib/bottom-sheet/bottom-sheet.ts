import { attachShadowTemplate, CustomElement, FoundationProperty, ICustomElement, upgradeProperty, coerceBoolean } from '@tylertech/forge-core';

import { BackdropComponent } from '../backdrop';
import { BottomSheetAdapter } from './bottom-sheet-adapter';
import { BOTTOM_SHEET_CONSTANTS, IBottomSheetDragEventData, IBottomSheetDragStartEventData } from './bottom-sheet-constants';
import { BottomSheetFoundation } from './bottom-sheet-foundation';

import template from './bottom-sheet.html';
import styles from './bottom-sheet.scss';

export interface IBottomSheetComponent extends ICustomElement {
  showBackdrop: boolean;
  backdropClose: boolean;
  escapeClose: boolean;
  open: boolean;
  fullscreen: boolean;
  openCallback: () => void | Promise<void>;
  closeCallback: () => void | Promise<void>;
  beforeCloseCallback: () => boolean | Promise<boolean>;
}

declare global {
  // tslint:disable-next-line: interface-name
  interface HTMLElementTagNameMap {
    'forge-bottom-sheet': IBottomSheetComponent;
  }

  interface HTMLElementEventMap {
    'forge-bottom-sheet-open': CustomEvent<void>;
    'forge-bottom-sheet-close': CustomEvent<void>;
    'forge-bottom-sheet-before-close': CustomEvent<void>;
    'forge-bottom-sheet-before-open': CustomEvent<void>;
    'forge-bottom-sheet-ready': CustomEvent<void>;
    'forge-bottom-sheet-drag-start': CustomEvent<IBottomSheetDragStartEventData>;
    'forge-bottom-sheet-dragged': CustomEvent<IBottomSheetDragEventData>;
    'forge-bottom-sheet-drag-end': CustomEvent<void>;
    'forge-bottom-sheet-drag-cancel': CustomEvent<void>;
    'forge-bottom-sheet-fullscreen': CustomEvent<boolean>;
  }
}

/**
 * The web component class behind the `<forge-bottom-sheet>` custom element.
 * 
 * @tag forge-bottom-sheet
 */
@CustomElement({
  name: BOTTOM_SHEET_CONSTANTS.elementName,
  dependencies: [BackdropComponent]
})
export class BottomSheetComponent extends HTMLElement implements IBottomSheetComponent {
  public static get observedAttributes(): string[] {
    return [
      BOTTOM_SHEET_CONSTANTS.attributes.BACKDROP_CLOSE,
      BOTTOM_SHEET_CONSTANTS.attributes.ESCAPE_CLOSE,
      BOTTOM_SHEET_CONSTANTS.attributes.OPEN,
      BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN,
      BOTTOM_SHEET_CONSTANTS.attributes.SHOW_BACKDROP
    ];
  }

  private _foundation: BottomSheetFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new BottomSheetFoundation(new BottomSheetAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case BOTTOM_SHEET_CONSTANTS.attributes.BACKDROP_CLOSE:
        this.backdropClose = coerceBoolean(newValue);
        break;
      case BOTTOM_SHEET_CONSTANTS.attributes.ESCAPE_CLOSE:
        this.escapeClose = coerceBoolean(newValue);
        break;
      case BOTTOM_SHEET_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN:
        this.fullscreen = coerceBoolean(newValue);
        break;
      case BOTTOM_SHEET_CONSTANTS.attributes.SHOW_BACKDROP:
        this.showBackdrop = coerceBoolean(newValue);
        break;
    }
  }

  /** Controls whether clicking the backdrop closes the bottom-sheet or not. Default is true. */
  @FoundationProperty()
  public declare backdropClose: boolean;

  /** Controls whether pressing the escape key closes the bottom-sheet or not. Default is true. */
  @FoundationProperty()
  public declare escapeClose: boolean;

  /** Controls whether the bottom-sheet is open or not. Default is false. */
  @FoundationProperty()
  public declare open: boolean;

  /** Controls whether the bottom-sheet is full screen or not. Default is false. */
  @FoundationProperty()
  public declare fullscreen: boolean;

  /** Shows a backdrop to prevent interacting with other content until the bottom sheet is dismissed.  Default is false. */
  @FoundationProperty()
  public declare showBackdrop: boolean;

  /** The function to call when the bottom-sheet wants to open. */
  @FoundationProperty()
  public declare openCallback: () => void | Promise<void>;

  /** the function to call when the bottom-sheet wants to close. */
  @FoundationProperty()
  public declare closeCallback: () => void | Promise<void>;

  /** the function to call when the bottom-sheet wants to close. */
  @FoundationProperty()
  public declare beforeCloseCallback: () => boolean | Promise<boolean>;
}
