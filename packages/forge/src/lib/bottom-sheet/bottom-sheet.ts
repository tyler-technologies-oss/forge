import {
  CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY,
  CUSTOM_ELEMENT_NAME_PROPERTY,
  coerceBoolean,
  deepQuerySelectorAll,
  getEventPath,
  tryDefine
} from '@tylertech/forge-core';
import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { removeDefaultAttribute } from '../core/utils/lit-utils.js';
import { DialogComponent } from '../dialog/dialog.js';
import { DIALOG_CONSTANTS } from '../dialog/dialog-constants.js';
import {
  BottomSheetMode,
  BOTTOM_SHEET_CONSTANTS,
  IBottomSheetDragContext,
  IBottomSheetDragEventData,
  IBottomSheetDragStartEventData
} from './bottom-sheet-constants.js';

import styles from './bottom-sheet.scss';

/** @deprecated - This will be removed in the future. Please switch to using BottomSheetComponent. */
export interface IBottomSheetComponent extends BaseLitElement {
  mode: BottomSheetMode;
  persistent: boolean;
  open: boolean;
  fullscreen: boolean;
}

const booleanConverter = {
  fromAttribute: (value: string | null): boolean => coerceBoolean(value as string),
  toAttribute: (value: boolean): string | null => (value ? '' : null)
};

/**
 * @tag forge-bottom-sheet
 *
 * @summary Bottom sheets slide up from the bottom of the screen to reveal more content and/or actions that the user can take.
 *
 * @dependency forge-dialog
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
export class BottomSheetComponent extends BaseLitElement implements IBottomSheetComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BOTTOM_SHEET_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [DialogComponent];

  #internals: ElementInternals;
  #open = false;
  #mode: BottomSheetMode = BOTTOM_SHEET_CONSTANTS.defaults.mode;
  #fullscreen = false;
  #isDragging = false;
  #dragContext: IBottomSheetDragContext | undefined;
  #lastPosition: { y: number; clientY: number } | undefined;
  #scrollTarget: HTMLElement | null = null;

  #bodyScrollHandler: EventListener = () => this.#onBodyScroll();
  #dragStartHandler: EventListener = evt => this.#onDragStart(evt as MouseEvent | TouchEvent);
  #dragMoveHandler: EventListener = evt => this.#onDragMove(evt as MouseEvent | TouchEvent);
  #dragEndHandler: EventListener = () => this.#onDragEnd();
  #dragCancelHandler: EventListener = () => this.#onDragCancel();
  #dialogDismissListener: EventListener = () => this.#onDialogDismiss();
  #dialogBeforeCloseListener: EventListener = evt => this.#onDialogBeforeClose(evt as CustomEvent);

  /**
   * Whether the bottom sheet is open.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: booleanConverter })
  public set open(value: boolean) {
    value = Boolean(value);
    if (this.#open === value) {
      return;
    }
    const oldValue = this.#open;
    this.#open = value;
    this.toggleAttribute(BOTTOM_SHEET_CONSTANTS.attributes.OPEN, value);
    if (this.isConnected && this.hasUpdated) {
      if (value) {
        this.#openBottomSheet();
      } else {
        this.#closeBottomSheet();
      }
    }
    this.requestUpdate('open', oldValue);
  }
  public get open(): boolean {
    return this.#open;
  }

  /**
   * The mode of the bottom sheet.
   * @default 'nonmodal'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: BottomSheetMode) => removeDefaultAttribute(value, BOTTOM_SHEET_CONSTANTS.defaults.mode) }
  })
  public set mode(value: BottomSheetMode) {
    this.#mode = value || BOTTOM_SHEET_CONSTANTS.defaults.mode;
  }
  public get mode(): BottomSheetMode {
    return this.#mode;
  }

  /**
   * Whether the bottom sheet is persistent.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: booleanConverter })
  public persistent = false;

  /**
   * Whether the bottom sheet is fullscreen.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: booleanConverter })
  public set fullscreen(value: boolean) {
    value = Boolean(value);
    if (this.#fullscreen !== value) {
      this.#fullscreen = value;
      this._isFullscreen = value;
    }
  }
  public get fullscreen(): boolean {
    return this.#fullscreen;
  }

  /** Whether the sheet is currently expanded, which also happens when it's dragged or scrolled to fullscreen. */
  @state() private _isFullscreen = false;
  @state() private _isDragged = false;

  @query(BOTTOM_SHEET_CONSTANTS.selectors.DIALOG) private _dialog?: DialogComponent;
  @query(BOTTOM_SHEET_CONSTANTS.selectors.SURFACE) private _surface?: HTMLElement;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#applyDefaultAria();
    if (this.hasUpdated) {
      this.#initialize();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('mode')) {
      this.#applyDefaultAria();
    }
  }

  public override firstUpdated(): void {
    this.#initialize();
  }

  public render(): TemplateResult {
    return html`
      <forge-dialog
        class=${classMap({
          dialog: true,
          [BOTTOM_SHEET_CONSTANTS.classes.DRAGGING]: this._isDragged,
          [BOTTOM_SHEET_CONSTANTS.classes.FULLSCREEN]: this._isFullscreen
        })}
        preset="bottom-sheet"
        exportparts="surface"
        role="presentation"
        .mode=${this.mode}
        .persistent=${this.persistent}>
        <div class="surface" part="root">
          <slot></slot>
        </div>
      </forge-dialog>
    `;
  }

  #applyDefaultAria(): void {
    setDefaultAria(this, this.#internals, {
      role: 'dialog',
      ariaModal: this.mode === 'modal' || this.mode === 'inline-modal' ? 'true' : 'false'
    });
  }

  #initialize(): void {
    if (this._dialog) {
      this._dialog.fullscreen = this.fullscreen;
    }
    if (this.open) {
      this.#openBottomSheet();
    }
  }

  #openBottomSheet(): void {
    const dialog = this._dialog;
    if (!dialog) {
      return;
    }

    if (this.fullscreen) {
      this._isFullscreen = true;
    }

    dialog.addEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, this.#dialogBeforeCloseListener);
    dialog.addEventListener(DIALOG_CONSTANTS.events.CLOSE, this.#dialogDismissListener);
    dialog.mode = this.mode;
    dialog.open = true;

    if (this.#isScrollable()) {
      this.#initScrollableHandlers();
    }

    this.#trySetInitialFocus();

    this.dispatchEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.OPEN, { bubbles: true }));
  }

  #closeBottomSheet(): void {
    const dialog = this._dialog;
    dialog?.removeEventListener(DIALOG_CONSTANTS.events.BEFORE_CLOSE, this.#dialogBeforeCloseListener);
    dialog?.removeEventListener(DIALOG_CONSTANTS.events.CLOSE, this.#dialogDismissListener);
    this.#removeScrollableHandlers();
    if (dialog) {
      dialog.open = false;
    }
    this.dispatchEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.CLOSE, { bubbles: true }));
    this._isFullscreen = false;
  }

  #onDialogDismiss(): void {
    this.open = false;
  }

  #onDialogBeforeClose(evt: CustomEvent): void {
    const beforeCloseEvent = new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.BEFORE_CLOSE, {
      bubbles: true,
      cancelable: true
    });
    this.dispatchEvent(beforeCloseEvent);
    if (beforeCloseEvent.defaultPrevented) {
      evt.preventDefault();
    }
  }

  #trySetInitialFocus(): void {
    window.requestAnimationFrame(() => {
      if (this.open && this.isConnected) {
        this.querySelector<HTMLElement>(BOTTOM_SHEET_CONSTANTS.selectors.INITIAL_FOCUS)?.focus();
      }
    });
  }

  #getContentElement(): HTMLElement | null {
    const contentElements = Array.from(deepQuerySelectorAll(this, BOTTOM_SHEET_CONSTANTS.selectors.CONTENT_BODY, false)) as HTMLElement[];
    return contentElements[0] ?? null;
  }

  #isScrollable(): boolean {
    const contentElement = this.#getContentElement();
    return contentElement ? contentElement.scrollHeight > contentElement.offsetHeight : false;
  }

  /** If scrollable, allow drag to/from fullscreen, and make fullscreen on scroll. */
  #initScrollableHandlers(): void {
    if (this._isFullscreen || !this.#isScrollable()) {
      return;
    }

    this._surface?.addEventListener('mousedown', this.#dragStartHandler);
    this._surface?.addEventListener('touchstart', this.#dragStartHandler);
    this.#scrollTarget = this.#getContentElement();
    this.#scrollTarget?.addEventListener('scroll', this.#bodyScrollHandler);
  }

  #removeScrollableHandlers(): void {
    this._surface?.removeEventListener('mousedown', this.#dragStartHandler);
    this._surface?.removeEventListener('touchstart', this.#dragStartHandler);
    this.#scrollTarget?.removeEventListener('scroll', this.#bodyScrollHandler);
    this.#scrollTarget = null;
  }

  #setContainerHeight(height: number | null): void {
    if (height != null) {
      const percent = Math.min(100, (100 * height) / window.innerHeight);
      this._dialog?.style.setProperty('--forge-dialog-max-height', `${percent}%`);
    } else {
      this._dialog?.style.removeProperty('--forge-dialog-max-height');
    }
  }

  #onBodyScroll(): void {
    if (!this._isFullscreen && !this.#isDragging) {
      this._isFullscreen = true;
      this.dispatchEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, { bubbles: true, detail: true }));
    }
  }

  #onDragStart(evt: MouseEvent | TouchEvent): void {
    if (this._isFullscreen) {
      const eventPath = getEventPath(evt);
      const isWithinScrollContainer = this.#isScrollable() && (this.#getContentElement()?.contains(eventPath[0]) ?? false);
      if (isWithinScrollContainer) {
        // We ignore drag events that originate from within the scrollable content when in full screen mode (to allow for scroll interactions)
        return;
      }
    }

    evt.stopPropagation();

    const bounds = this._surface?.getBoundingClientRect() as DOMRect;
    const clientY = evt instanceof MouseEvent ? evt.clientY : evt.touches[0].clientY;
    this.#dragContext = {
      top: clientY - bounds.top,
      height: bounds.height
    };
    document.body.addEventListener('mousemove', this.#dragMoveHandler, { passive: false });
    document.body.addEventListener('touchmove', this.#dragMoveHandler, { passive: false });
    document.body.addEventListener('mouseup', this.#dragEndHandler);
    document.body.addEventListener('touchend', this.#dragEndHandler);
    document.body.addEventListener('touchcancel', this.#dragCancelHandler);
  }

  #onDragMove(evt: MouseEvent | TouchEvent): void {
    evt.stopPropagation();
    evt.preventDefault();
    if (!this.#dragContext) {
      return;
    }
    const clientY = evt instanceof MouseEvent ? evt.clientY : evt.touches[0].clientY;
    const height = { y: window.innerHeight - clientY + this.#dragContext.top };

    // If this is the beginning of the move sequence, we emit the start event (to allow for preventing default) and
    // then update the surface position if not prevented
    if (!this.#isDragging) {
      this.#isDragging = true;
      const dragStartEvt = new CustomEvent<IBottomSheetDragStartEventData>(BOTTOM_SHEET_CONSTANTS.events.DRAG_START, {
        bubbles: true,
        detail: height,
        cancelable: true
      });
      this.dispatchEvent(dragStartEvt);
      if (dragStartEvt.defaultPrevented) {
        return;
      }
      this._isDragged = true;
    }

    // If not fullscreen, clamp to minimum of original height.
    const newPosition = this._isFullscreen ? height : { y: Math.max(height.y, this.#dragContext.height) };

    // Only update the position if it actually changed
    if (!this.#lastPosition || newPosition.y !== this.#lastPosition.y) {
      const dragMoveEvt = new CustomEvent<IBottomSheetDragEventData>(BOTTOM_SHEET_CONSTANTS.events.DRAGGED, {
        bubbles: true,
        detail: newPosition,
        cancelable: true
      });
      this.dispatchEvent(dragMoveEvt);
      if (dragMoveEvt.defaultPrevented) {
        return;
      }
      this.#lastPosition = { ...newPosition, clientY };
      this.#setContainerHeight(newPosition.y);
    }
  }

  #onDragEnd(): void {
    if (this.#lastPosition) {
      const clientY = this.#lastPosition.clientY;
      const dragContext = this.#dragContext;
      if (dragContext) {
        const isFullscreen = this._isFullscreen;
        if (isFullscreen && clientY > 0) {
          this._isFullscreen = false;
        } else if (!isFullscreen && clientY < dragContext.height + dragContext.top) {
          this._isFullscreen = true;
        }
        this.dispatchEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.FULLSCREEN, { bubbles: true, detail: isFullscreen }));
      }
    }
    if (this.#isDragging) {
      this.dispatchEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.DRAG_END, { bubbles: true }));
    }
    this.#dragComplete();
  }

  #onDragCancel(): void {
    if (this.#isDragging) {
      this.dispatchEvent(new CustomEvent(BOTTOM_SHEET_CONSTANTS.events.DRAG_CANCEL, { bubbles: true }));
    }
    this.#dragComplete();
  }

  #dragComplete(): void {
    this._isDragged = false;
    document.body.removeEventListener('mousemove', this.#dragMoveHandler);
    document.body.removeEventListener('touchmove', this.#dragMoveHandler);
    document.body.removeEventListener('mouseup', this.#dragEndHandler);
    document.body.removeEventListener('touchend', this.#dragEndHandler);
    document.body.removeEventListener('touchcancel', this.#dragCancelHandler);
    this.#setContainerHeight(null);
    this.#lastPosition = undefined;
    this.#dragContext = undefined;
    this.#isDragging = false;
  }
}

tryDefine(BOTTOM_SHEET_CONSTANTS.elementName, BottomSheetComponent);

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
