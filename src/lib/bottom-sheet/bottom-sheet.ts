import { attachShadowTemplate, CustomElement, FoundationProperty, ICustomElement, coerceBoolean } from '@tylertech/forge-core';
import { BaseComponent } from '../core/base/base-component';
import { WithDefaultAria } from '../core/mixins/internals/with-default-aria';
import { WithElementInternals } from '../core/mixins/internals/with-element-internals';
import { DialogComponent } from '../dialog/dialog';
import { BottomSheetAdapter } from './bottom-sheet-adapter';
import { BottomSheetMode, BOTTOM_SHEET_CONSTANTS, IBottomSheetDragEventData, IBottomSheetDragStartEventData } from './bottom-sheet-constants';
import { BottomSheetFoundation } from './bottom-sheet-foundation';

import template from './bottom-sheet.html';
import styles from './bottom-sheet.scss';

export interface IBottomSheetComponent extends ICustomElement {
  mode: BottomSheetMode;
  persistent: boolean;
  open: boolean;
  fullscreen: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-bottom-sheet': IBottomSheetComponent;
  }

  interface HTMLElementEventMap {
    'forge-bottom-sheet-before-close': CustomEvent<void>;
    'forge-bottom-sheet-close': CustomEvent<void>;
    'forge-bottom-sheet-open': CustomEvent<void>;
    'forge-bottom-sheet-drag-start': CustomEvent<IBottomSheetDragStartEventData>;
    'forge-bottom-sheet-dragged': CustomEvent<IBottomSheetDragEventData>;
    'forge-bottom-sheet-drag-end': CustomEvent<void>;
    'forge-bottom-sheet-drag-cancel': CustomEvent<void>;
    'forge-bottom-sheet-fullscreen': CustomEvent<boolean>;
  }
}

/**
 * @tag forge-bottom-sheet
 * 
 * @summary Bottom sheets slide up from the bottom of the screen to reveal more content and/or actions that the user can take.
 * 
 * @property {boolean} open - Whether the bottom sheet is open.
 * @property {BottomSheetMode} mode - The mode of the bottom sheet. Defaults to non-modal.
 * @property {boolean} persistent - Whether the bottom sheet is persistent.
 * @property {boolean} fullscreen - Whether the bottom sheet is fullscreen.
 * 
 * @attribute {boolean} open - Whether the bottom sheet is open.
 * @attribute {BottomSheetMode} mode - The mode of the bottom sheet. Defaults to non-modal.
 * @attribute {boolean} persistent - Whether the bottom sheet is persistent.
 * @attribute {boolean} fullscreen - Whether the bottom sheet is fullscreen.
 * 
 * @event {CustomEvent<void>} forge-bottom-sheet-before-close - Fires before the bottom sheet closes.
 * @event {CustomEvent<void>} forge-bottom-sheet-close - Fires after the bottom sheet closes.
 * @event {CustomEvent<void>} forge-bottom-sheet-open - Fires after the bottom sheet opens.
 * @event {CustomEvent<IBottomSheetDragStartEventData>} forge-bottom-sheet-drag-start - Fires when the bottom sheet starts to be dragged.
 * @event {CustomEvent<IBottomSheetDragEventData>} forge-bottom-sheet-dragged - Fires when the bottom sheet is dragged.
 * @event {CustomEvent<void>} forge-bottom-sheet-drag-end - Fires when the bottom sheet drag ends.
 * @event {CustomEvent<void>} forge-bottom-sheet-drag-cancel - Fires when the bottom sheet drag is cancelled.
 * @event {CustomEvent<boolean>} forge-bottom-sheet-fullscreen - Fires when the bottom sheet is toggled to fullscreen.
 * 
 * @cssproperty --forge-bottom-sheet-desktop-max-width - The maximum width of the bottom sheet on desktop.
 * @cssproperty --forge-bottom-sheet-desktop-min-width - The minimum width of the bottom sheet on desktop.
 * @cssproperty --forge-bottom-sheet-animation-duration - The duration of the bottom sheet animation to fullscreen.
 * @cssproperty --forge-bottom-sheet-animation-timing - The timing function of the bottom sheet animation to fullscreen.
 * 
 * @csspart root - The root element of the bottom sheet.
 * @csspart surface - The surface element of the bottom sheet within th dialog.
 * 
 * @slot - The content of the bottom sheet. This is a passthrough slot to the dialog surface.
 */
@CustomElement({
  name: BOTTOM_SHEET_CONSTANTS.elementName,
  dependencies: [
    DialogComponent
  ]
})
export class BottomSheetComponent extends WithElementInternals(WithDefaultAria(BaseComponent)) implements IBottomSheetComponent {
  public static get observedAttributes(): string[] {
    return Object.values(BOTTOM_SHEET_CONSTANTS.observedAttributes);
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

  public attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case BOTTOM_SHEET_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case BOTTOM_SHEET_CONSTANTS.attributes.MODE:
        this.mode = newValue as BottomSheetMode;
        break;
      case BOTTOM_SHEET_CONSTANTS.observedAttributes.PERSISTENT:
        this.persistent = coerceBoolean(newValue);
        break;
      case BOTTOM_SHEET_CONSTANTS.attributes.FULLSCREEN:
        this.fullscreen = coerceBoolean(newValue);
        break;
    }
  }
 
  @FoundationProperty()
  public declare open: boolean;

  @FoundationProperty()
  public declare mode: BottomSheetMode;

  @FoundationProperty()
  public declare persistent: boolean;

  @FoundationProperty()
  public declare fullscreen: boolean;
}
