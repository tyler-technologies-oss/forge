import { consume, ContextRoot } from '@lit/context';
import {
  CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY,
  CUSTOM_ELEMENT_NAME_PROPERTY,
  coerceBoolean,
  coerceNumber,
  isDefined,
  playKeyframeAnimation,
  tryDefine
} from '@tylertech/forge-core';
import { tylIconDragHandle, tylIconDragVerticalVariant } from '@tylertech/tyler-icons';
import { PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { eventIncludesArrowKey } from '../../core/utils/event-utils.js';
import { safeMin, scaleValue } from '../../core/utils/utils.js';
import { FocusIndicatorComponent } from '../../focus-indicator/index.js';
import { IconComponent, IconRegistry } from '../../icon/index.js';
import { IStateLayerComponent, StateLayerComponent } from '../../state-layer/index.js';
import { ISplitViewBase } from '../core/split-view-base.js';
import { booleanAttributeConverter } from '../core/split-view-converters.js';
import type { ISplitViewComponent } from '../split-view/split-view.js';
import {
  ISplitViewContext,
  ISplitViewUpdateConfig,
  SplitViewOrientation,
  SPLIT_VIEW_CONSTANTS,
  SPLIT_VIEW_CONTEXT
} from '../split-view/split-view-constants.js';
import {
  ISplitViewPanelCursorConfig,
  ISplitViewPanelOpenEvent,
  ISplitViewPanelResizeAdapter,
  ISplitViewPanelState,
  ISplitViewPanelWillResizeEvent,
  SplitViewInputDeviceType,
  SplitViewPanelResizable,
  SPLIT_VIEW_PANEL_CONSTANTS
} from './split-view-panel-constants.js';
import {
  clampSize,
  clearState,
  createOverlay,
  getCursor,
  getHandleIcon,
  getPixelDimension,
  getSplitViewPanelSibling,
  getValuenow,
  handleBoundariesAfterResize,
  handleBoundariesDuringResize,
  initState,
  keyboardResize,
  maxResize,
  minResize,
  parseSize,
  pointerResize,
  setState
} from './split-view-panel-utils.js';

import styles from './split-view-panel.scss';

/** @deprecated - This will be removed in the future. Please switch to using SplitViewPanelComponent. */
export interface ISplitViewPanelComponent extends Partial<ISplitViewBase>, BaseLitElement {
  resizable: SplitViewPanelResizable;
  size: number | string;
  min: number | string;
  max: number | string | undefined;
  accessibleLabel: string;
  open: boolean;
  getContentSize(): number;
  getCollapsibleSize(): number;
  setContentSize(size: number): void;
  updatePanel(config: ISplitViewUpdateConfig): void;
}

const optionalBooleanConverter = {
  fromAttribute: (value: string | null): boolean | undefined => (value === null ? undefined : coerceBoolean(value)),
  toAttribute: (value?: boolean): string | null => (value ? '' : null)
};

const optionalNumberConverter = {
  fromAttribute: (value: string | null): number | undefined => (value ? coerceNumber(value) : undefined),
  toAttribute: (value?: number): string | null => (isDefined(value) ? `${value}` : null)
};

/**
 * @tag forge-split-view-panel
 *
 * @summary Individual panels within split views that can be resized and collapsed.
 *
 * @dependency forge-icon
 * @dependency forge-state-layer
 * @dependency forge-focus-indicator
 *
 * @event {CustomEvent<ISplitViewPanelWillResizeEvent>} forge-split-view-panel-will-resize - Emitted before the panel resizes.
 * @event {CustomEvent<number>} forge-split-view-panel-resize-start - Emitted when the panel starts resizing.
 * @event {CustomEvent<number>} forge-split-view-panel-resize-end - Emitted when the panel stops resizing.
 * @event {CustomEvent<number>} forge-split-view-panel-resize - Emitted when the panel resizes.
 * @event {CustomEvent<ISplitViewPanelOpenEvent>} forge-split-view-panel-will-open - Emitted before the panel opens.
 * @event {CustomEvent<ISplitViewPanelOpenEvent>} forge-split-view-panel-will-close - Emitted before the panel closes.
 * @event {CustomEvent<ISplitViewPanelOpenEvent>} forge-split-view-panel-did-open - Emitted after the panel opens.
 * @event {CustomEvent<ISplitViewPanelOpenEvent>} forge-split-view-panel-did-close - Emitted after the panel closes.
 *
 * @cssproperty --forge-split-view-panel-size - The size of the panel along the axis of orientation.
 * @cssproperty --forge-split-view-panel-cursor - The cursor to display when hovering over the panel.
 *
 * @csspart root - The root container element.
 * @csspart handle - The resize handle element.
 * @csspart icon - The icon within the resize handle.
 * @csspart state-layer - The state layer surface of the resize handle.
 * @csspart focus-indicator - The focus indicator of the resize handle.
 * @csspart content - The content container element.
 *
 * @slot - The content of the panel.
 */
export class SplitViewPanelComponent extends BaseLitElement implements ISplitViewPanelComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SPLIT_VIEW_PANEL_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconComponent, StateLayerComponent, FocusIndicatorComponent];

  /** @internal */
  public static contextRoot = new ContextRoot();

  static {
    IconRegistry.define([tylIconDragVerticalVariant, tylIconDragHandle]);
  }

  #open = true;
  #isInitialized = false;
  #isFirstUpdate = true;
  #state: ISplitViewPanelState = initState();
  #overlay?: HTMLElement;

  /**
   * Controls which side of the panel the resize handle appears on.
   * @default 'off'
   * @attribute
   */
  @property({ reflect: true })
  public resizable: SplitViewPanelResizable = 'off';

  /**
   * The initial size along the axis of orientation.
   * @default 200
   * @attribute
   */
  @property({ reflect: true })
  public size: number | string = 200;

  /**
   * The smallest size the panel can take along its axis of orientation.
   * @default 0
   * @attribute
   */
  @property({ reflect: true })
  public min: number | string = 0;

  /**
   * The largest size the panel can take along its axis of orientation.
   * @attribute
   */
  @property({
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => value || undefined,
      toAttribute: (value?: number | string) => (isDefined(value) ? `${value}` : null)
    }
  })
  public max: number | string | undefined;

  /**
   * The ARIA label given to the resize handle.
   * @default 'Split view panel'
   * @attribute accessible-label
   */
  @property({ attribute: SPLIT_VIEW_PANEL_CONSTANTS.attributes.ACCESSIBLE_LABEL, reflect: true })
  public accessibleLabel = 'Split view panel';

  /**
   * Controls the open state of the panel.
   * @default true
   * @attribute
   */
  @property({ reflect: true, converter: { fromAttribute: booleanAttributeConverter.fromAttribute, toAttribute: (value: boolean) => `${value}` } })
  public set open(value: boolean) {
    if (this.#open === value) {
      return;
    }
    if (this.#isInitialized) {
      this.#tryOpenOrClose(value, false, false);
      return;
    }
    this.#open = value;
  }
  public get open(): boolean {
    return this.#open;
  }

  /**
   * Whether resize interactions are disabled or enabled. Inherited from the split view when not set.
   * @attribute
   */
  @property({ reflect: true, converter: optionalBooleanConverter })
  public disabled?: boolean;

  /**
   * Whether the panel can be closed via keyboard interaction. Inherited from the split view when not set.
   * @attribute allow-close
   */
  @property({ attribute: SPLIT_VIEW_PANEL_CONSTANTS.attributes.ALLOW_CLOSE, reflect: true, converter: optionalBooleanConverter })
  public allowClose?: boolean;

  /**
   * Whether the panel automatically closes when it reaches a size of 0. Inherited from the split view when not set.
   * @attribute auto-close
   */
  @property({ attribute: SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE, reflect: true, converter: optionalBooleanConverter })
  public autoClose?: boolean;

  /**
   * The size at which the panel auto closes. Inherited from the split view when not set.
   * @attribute auto-close-threshold
   */
  @property({ attribute: SPLIT_VIEW_PANEL_CONSTANTS.attributes.AUTO_CLOSE_THRESHOLD, reflect: true, converter: optionalNumberConverter })
  public autoCloseThreshold?: number;

  @state()
  @consume({ context: SPLIT_VIEW_CONTEXT, subscribe: true })
  private _splitViewContext?: ISplitViewContext;

  @state() private _closed = false;
  @state() private _grabbed = false;

  @query(SPLIT_VIEW_PANEL_CONSTANTS.selectors.ROOT) private _root?: HTMLElement;
  @query(SPLIT_VIEW_PANEL_CONSTANTS.selectors.HANDLE) private _handle?: HTMLElement;
  @query(SPLIT_VIEW_PANEL_CONSTANTS.selectors.CONTENT) private _content?: HTMLElement;
  @query(SPLIT_VIEW_PANEL_CONSTANTS.selectors.STATE_LAYER) private _stateLayer?: IStateLayerComponent;

  readonly #resizeAdapter: ISplitViewPanelResizeAdapter = {
    getContentSize: orientation => this.#measureContentSize(orientation),
    setContentSize: value => this.#setContentSizeProperty(value),
    setValuenow: value => this._handle?.setAttribute('aria-valuenow', value.toFixed(2)),
    getAvailableSpace: (orientation, resizable) => this.#getAvailableSpace(orientation, resizable),
    getSiblingContentSize: () => getSplitViewPanelSibling(this)?.getContentSize() ?? 0,
    setSiblingContentSize: value => getSplitViewPanelSibling(this)?.setContentSize(value),
    setHandleCursor: (orientation, config) => this.#setHandleCursor(orientation, config),
    setBodyCursor: (orientation, config) => this.#overlay?.style.setProperty('cursor', getCursor(orientation, config)),
    animateStateLayer: fromActivated => this.#animateStateLayer(fromActivated)
  };

  public override connectedCallback(): void {
    // Attach the parent split view's context root so that context is provided even if the panel is
    // upgraded before the split view. This must happen before super.connectedCallback().
    const splitView = this.closest(SPLIT_VIEW_CONSTANTS.elementName);
    if (splitView) {
      SplitViewPanelComponent.contextRoot.attach(splitView);
    }

    super.connectedCallback();
    this.#isInitialized = true;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#removeOverlay();
    this.#removeDocumentPointerListeners();
  }

  public override willUpdate(): void {
    this.#isFirstUpdate = !this.hasUpdated;
    if (this.#isFirstUpdate) {
      this._closed = !this.open;
    }
  }

  public override updated(changedProperties: PropertyValues): void {
    const isFirstUpdate = this.#isFirstUpdate;

    // Size is applied first so that min and max are able to constrain it
    if (isFirstUpdate || changedProperties.has('size')) {
      this.#applySize();
    }
    if (isFirstUpdate || changedProperties.has('min')) {
      this.#applyMin();
    }
    if (isFirstUpdate || changedProperties.has('max')) {
      this.#applyMax();
    }

    if (isFirstUpdate) {
      return;
    }

    const oldContext = changedProperties.get('_splitViewContext') as ISplitViewContext | undefined;
    const context = this._splitViewContext;
    const hasContextChanged = changedProperties.has('_splitViewContext') && !!oldContext;

    if (changedProperties.has('resizable') || (hasContextChanged && oldContext.orientation !== context?.orientation)) {
      this.updatePanel({ accessibility: true, cursor: true });
    }

    const autoCloseChanged =
      changedProperties.has('autoClose') || (hasContextChanged && !isDefined(this.autoClose) && oldContext.autoClose !== context?.autoClose);
    const thresholdChanged =
      changedProperties.has('autoCloseThreshold') ||
      (hasContextChanged && !isDefined(this.autoCloseThreshold) && oldContext.autoCloseThreshold !== context?.autoCloseThreshold);
    if (autoCloseChanged || thresholdChanged) {
      this.#tryAutoClose();
    }
  }

  public render(): TemplateResult {
    const orientation = this.#orientation;
    const isResizable = this.resizable !== 'off';
    const isDisabled = this.#appliedDisabled;

    const handle = html`
      <div
        class="forge-split-view-panel__handle"
        id="handle"
        part="handle"
        role="separator"
        aria-controls="content"
        aria-grabbed=${this._grabbed ? 'true' : 'false'}
        aria-label=${ifDefined(this.accessibleLabel ?? undefined)}
        aria-orientation=${orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        aria-valuemin=${isResizable ? '0' : nothing}
        aria-valuemax=${isResizable ? '100' : nothing}
        aria-disabled=${isDisabled ? 'true' : nothing}
        tabindex=${isDisabled ? '-1' : '0'}
        @pointerdown=${this.#handlePointerdown}
        @keydown=${this.#handleKeydown}
        @keyup=${this.#handleKeyup}>
        <forge-icon class="forge-split-view-panel__icon" id="icon" part="icon" name=${getHandleIcon(orientation)}></forge-icon>
        <forge-state-layer target="handle" id="state-layer" exportparts="surface:state-layer"></forge-state-layer>
        <forge-focus-indicator inward target="handle" part="focus-indicator"></forge-focus-indicator>
      </div>
    `;
    const content = html`
      <div class="forge-split-view-panel__content" id="content" part="content" role="group">
        <slot></slot>
      </div>
    `;

    return html`
      <div
        class=${classMap({
          'forge-split-view-panel': true,
          [SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSED]: this._closed,
          [SPLIT_VIEW_PANEL_CONSTANTS.classes.GRABBED]: this._grabbed,
          [SPLIT_VIEW_PANEL_CONSTANTS.classes.DISABLED]: isDisabled
        })}
        id="root"
        part="root"
        resizable=${this.resizable}
        orientation=${orientation}>
        ${this.resizable === 'end' ? [content, handle] : [handle, content]}
      </div>
    `;
  }

  /**
   * Gets the size of content along the axis of orientation.
   * @returns The size of content in pixels.
   */
  public getContentSize(): number {
    return this.#measureContentSize(this.#orientation);
  }

  /**
   * Gets the amount that the content can shrink along the axis of orientation before reaching its
   * min size.
   * @returns The amount that content can shrink in pixels.
   */
  public getCollapsibleSize(): number {
    return this.getContentSize() - this.#toPixels(this.min);
  }

  /**
   * Sets the size of content along the axis of orientation.
   * @param size The new content size in pixels.
   */
  public setContentSize(size: number): void {
    if (this.resizable === 'off') {
      return;
    }

    this.#syncState();
    const newSize = clampSize(size, this.#state);
    this.#setContentSizeProperty(newSize);
    if (this.#isInitialized) {
      this.#emit(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, newSize);
    }
  }

  /**
   * Updates the provided characteristics.
   * @param config An update configuration.
   */
  public updatePanel(config: ISplitViewUpdateConfig): void {
    this.#syncState();

    if (config.size && this.open) {
      this.setContentSize(this.getContentSize());
    }

    // The following properties don't apply to non-resizable panels
    if (this.resizable === 'off') {
      return;
    }

    const orientation = this.#orientation;
    const size = this.getContentSize();
    const availableSpace = this.#getAvailableSpace(orientation, this.resizable);

    if (config.accessibility && this.open) {
      this.#resizeAdapter.setValuenow(getValuenow(size, { ...this.#state, availableSpace }));
    }

    if (config.cursor) {
      handleBoundariesAfterResize(this.#resizeAdapter, size, { ...this.#state, availableSpace });
    }
  }

  // Properties that fall back to the split view

  get #orientation(): SplitViewOrientation {
    return this._splitViewContext?.orientation ?? 'horizontal';
  }

  get #appliedDisabled(): boolean {
    return this.disabled ?? this._splitViewContext?.disabled ?? false;
  }

  get #appliedAllowClose(): boolean {
    return this.allowClose ?? this._splitViewContext?.allowClose ?? false;
  }

  get #appliedAutoClose(): boolean {
    return this.autoClose ?? this._splitViewContext?.autoClose ?? false;
  }

  get #appliedAutoCloseThreshold(): number {
    return this.autoCloseThreshold ?? this._splitViewContext?.autoCloseThreshold ?? 0;
  }

  get #splitView(): ISplitViewComponent | undefined {
    const parent = this.parentElement;
    return parent?.tagName.toLowerCase() === SPLIT_VIEW_CONSTANTS.elementName ? (parent as ISplitViewComponent) : undefined;
  }

  // Pointer interaction

  #handlePointerdown(evt: PointerEvent): void {
    if (this.#appliedDisabled || !this.#allowResize('pointer')) {
      return;
    }

    evt.preventDefault();

    document.addEventListener('pointermove', this.#pointermoveListener);
    document.addEventListener('pointerup', this.#pointerupListener);

    this.#setGrabbed(true);
    this._handle?.focus();

    this.#startResize();
    this.#state.startPoint = this.#orientation === 'horizontal' ? evt.clientX : evt.clientY;
    handleBoundariesDuringResize(this.#resizeAdapter, this.#state, 'pointer');
  }

  readonly #pointerupListener = (evt: PointerEvent): void => {
    evt.preventDefault();
    this.#removeDocumentPointerListeners();
    this.#setGrabbed(false);
    this.#endResize();
  };

  readonly #pointermoveListener = (evt: PointerEvent): void => {
    if (this.#appliedDisabled) {
      return;
    }

    evt.preventDefault();

    // Detect when the mouse button is released outside of the document
    if (evt.buttons === 0) {
      this.#removeDocumentPointerListeners();
      this.#setGrabbed(false);
      this.#endResize();
      return;
    }

    if (pointerResize(this.#resizeAdapter, evt, this.#state)) {
      this.#emit(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, this.#state.currentSize);
    }
  };

  #removeDocumentPointerListeners(): void {
    document.removeEventListener('pointermove', this.#pointermoveListener);
    document.removeEventListener('pointerup', this.#pointerupListener);
  }

  /**
   * Sets the grabbed appearance and covers the document with an overlay so that the cursor stays
   * consistent while dragging over other contexts.
   */
  #setGrabbed(value: boolean): void {
    this._grabbed = value;
    if (value) {
      this.#overlay ??= createOverlay();
      document.body.append(this.#overlay);
    } else {
      this.#overlay?.remove();
    }
  }

  #removeOverlay(): void {
    this.#overlay?.remove();
    this.#overlay = undefined;
  }

  // Keyboard interaction

  #handleKeydown(evt: KeyboardEvent): void {
    if (this.#appliedDisabled) {
      return;
    }

    if (evt.key === 'Enter') {
      this.#handleEnterKey(evt);
    } else if (evt.key === 'Home' && this.#allowResize('keyboard')) {
      this.#handleHomeKey(evt);
    } else if (evt.key === 'End' && this.#allowResize('keyboard')) {
      this.#handleEndKey(evt);
    } else if (eventIncludesArrowKey(evt) && this.#allowResize('keyboard')) {
      this.#handleArrowKey(evt);
    }
  }

  #handleKeyup(evt: KeyboardEvent): void {
    if (this.#state.arrowKeyHeld && eventIncludesArrowKey(evt)) {
      this.#endResize();
    }
  }

  #handleEnterKey(evt: KeyboardEvent): void {
    if (!this.#appliedAllowClose) {
      return;
    }

    evt.preventDefault();
    this.#tryOpenOrClose(!this.open, false, true);
  }

  #handleHomeKey(evt: KeyboardEvent): void {
    evt.preventDefault();

    this.#syncState();
    const size = minResize(this.#resizeAdapter, this.#state);
    this.#emit(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, size);
    this.#tryAutoClose();
  }

  #handleEndKey(evt: KeyboardEvent): void {
    evt.preventDefault();

    this.#syncState();
    const size = maxResize(this.#resizeAdapter, this.#state);
    this.#emit(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, size);
  }

  #handleArrowKey(evt: KeyboardEvent): void {
    const keys = this.#orientation === 'horizontal' ? { decrease: 'ArrowLeft', increase: 'ArrowRight' } : { decrease: 'ArrowUp', increase: 'ArrowDown' };
    let increment = 0;
    if (evt.key === keys.decrease) {
      increment = -1;
    } else if (evt.key === keys.increase) {
      increment = 1;
    } else {
      return;
    }

    evt.preventDefault();

    if (this.resizable === 'start') {
      increment *= -1;
    }
    if (evt.shiftKey) {
      increment *= 10;
    }

    if (!this.#state.arrowKeyHeld) {
      this.#startResize();
    }
    this.#state.arrowKeyHeld = true;

    if (keyboardResize(this.#resizeAdapter, increment, this.#state)) {
      this.#emit(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE, this.#state.currentSize);
    }
  }

  // Resizing

  /**
   * Emits a will resize event and allows it to be cancelled.
   * @returns Whether the resize should proceed.
   */
  #allowResize(inputDeviceType: SplitViewInputDeviceType): boolean {
    const detail: ISplitViewPanelWillResizeEvent = { inputDeviceType };
    return this.#emit(SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_RESIZE, detail, true);
  }

  #startResize(): void {
    this.#syncState();
    this.#state = setState(this.#resizeAdapter, this.#state);
    this.#emit(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_START, this.#state.startSize);
  }

  #endResize(): void {
    this.#emit(SPLIT_VIEW_PANEL_CONSTANTS.events.RESIZE_END, this.#state.currentSize);
    this.#splitView?.updatePanels({ accessibility: this.#state.startSize !== this.#state.currentSize, cursor: true });
    this.#state = clearState(this.#state);
    this.#tryAutoClose();
  }

  /**
   * Refreshes the state used while resizing with the current orientation, resizable value, and pixel min and max.
   */
  #syncState(): void {
    this.#state.orientation = this.#orientation;
    this.#state.resizable = this.resizable;
    this.#state.min = this.#toPixels(this.min);
    this.#state.max = isDefined(this.max) ? this.#toPixels(this.max) : undefined;
  }

  #toPixels(value: number | string): number {
    // The parent size is only measured when it's needed to resolve a percentage
    const parentSize = parseSize(value).unit === '%' ? this.#getParentSize() : 0;
    return getPixelDimension(value, parentSize);
  }

  #getParentSize(): number {
    const splitView = this.#splitView;
    const parentSize = this.#orientation === 'horizontal' ? splitView?.clientWidth : splitView?.clientHeight;
    return parentSize ?? 0;
  }

  #measureContentSize(orientation: SplitViewOrientation): number {
    const content = this._content;
    const size = orientation === 'horizontal' ? content?.clientWidth : content?.clientHeight;
    return size ?? 0;
  }

  #setContentSizeProperty(value: number): void {
    this.style.setProperty(SPLIT_VIEW_PANEL_CONSTANTS.customCssProperties.SIZE, `${value}px`);
  }

  /**
   * Gets the amount of space that the component is allowed to take. This includes the current
   * size of the component and the size of the sibling it resizes into along the axis of
   * orientation. The sibling's min and max values are taken into account but the component's are
   * not.
   */
  #getAvailableSpace(orientation: SplitViewOrientation, resizable: SplitViewPanelResizable): number {
    if (resizable === 'off') {
      // Return -1 if the panel is static (i.e. can't be user resized)
      return -1;
    }
    const sibling = getSplitViewPanelSibling(this);
    if (sibling) {
      return sibling.getCollapsibleSize() + this.#measureContentSize(orientation);
    }
    return this.#getParentSize();
  }

  #setHandleCursor(orientation?: SplitViewOrientation, config?: ISplitViewPanelCursorConfig): void {
    if (orientation) {
      this._root?.style.setProperty(SPLIT_VIEW_PANEL_CONSTANTS.customCssProperties.CURSOR, getCursor(orientation, config));
    } else {
      this._root?.style.removeProperty(SPLIT_VIEW_PANEL_CONSTANTS.customCssProperties.CURSOR);
    }
  }

  #animateStateLayer(fromActivated: boolean): void {
    if (fromActivated) {
      // Wait a short amount of time so the animation is distinguishable
      window.setTimeout(() => this._stateLayer?.playAnimation(), SPLIT_VIEW_PANEL_CONSTANTS.numbers.STATE_LAYER_ACTIVATION_WAIT);
    } else {
      this._stateLayer?.playAnimation();
    }
  }

  // Applying properties

  #applySize(): void {
    const pixelSize = getPixelDimension(this.size, this.#getParentSize());
    this.#setContentSizeProperty(pixelSize);

    // Wait for the DOM to render to get available space
    window.requestAnimationFrame(() => {
      this.#syncState();
      const availableSpace = this.#getAvailableSpace(this.#orientation, this.resizable);
      const maxSize = safeMin(this.#state.max, availableSpace);
      this.#resizeAdapter.setValuenow(scaleValue(pixelSize, this.#state.min, maxSize));
      this.#splitView?.updatePanels({ cursor: true });
    });
  }

  #applyMin(): void {
    if (this.resizable === 'off') {
      return;
    }

    const size = this.getContentSize();
    if (size < this.#toPixels(this.min)) {
      this.setContentSize(size);
    }
  }

  #applyMax(): void {
    if (!isDefined(this.max) || this.resizable === 'off') {
      return;
    }

    const size = this.getContentSize();
    if (size > this.#toPixels(this.max)) {
      this.setContentSize(size);
    }
  }

  // Opening and closing

  /**
   * Emits a will open or will close event and sets the panel open or closed if allowed.
   * @param shouldOpen Whether the panel should open or close.
   * @param auto Whether the panel auto-opened or auto-closed.
   * @param userInitiated Whether opening or closing via user action instead of programmatically.
   */
  #tryOpenOrClose(shouldOpen: boolean, auto: boolean, userInitiated: boolean): void {
    const event: ISplitViewPanelOpenEvent = { auto, userInitiated };
    const eventType = shouldOpen ? SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_OPEN : SPLIT_VIEW_PANEL_CONSTANTS.events.WILL_CLOSE;
    if (!this.#emit(eventType, event, true)) {
      return;
    }

    const oldValue = this.#open;
    this.#open = shouldOpen;
    this.requestUpdate('open', oldValue);
    this.#animateOpen(event);
  }

  async #animateOpen(event: ISplitViewPanelOpenEvent): Promise<void> {
    const root = this._root;
    if (!this.hasUpdated || !root) {
      return;
    }

    const splitView = this.#splitView;
    if (this.open && this._closed) {
      // The panel has to be displayed before it can animate into view
      this._closed = false;
      await this.updateComplete;
      splitView?.layerSlottedPanels(this);
      await playKeyframeAnimation(root, SPLIT_VIEW_PANEL_CONSTANTS.classes.OPENING, true);
    } else if (!this.open && !this._closed) {
      splitView?.layerSlottedPanels(this);
      await playKeyframeAnimation(root, SPLIT_VIEW_PANEL_CONSTANTS.classes.CLOSING, true);
      this._closed = !this.open;
      await this.updateComplete;
    } else {
      return;
    }

    this.#emit(this.open ? SPLIT_VIEW_PANEL_CONSTANTS.events.DID_OPEN : SPLIT_VIEW_PANEL_CONSTANTS.events.DID_CLOSE, event);
    splitView?.unlayerSlottedPanels();
    splitView?.updatePanels({ accessibility: true, cursor: true });
  }

  /**
   * Auto close the panel if enabled and within the size threshold.
   */
  #tryAutoClose(): void {
    if (this.#appliedAutoClose && this.getContentSize() <= this.#appliedAutoCloseThreshold) {
      this.#tryOpenOrClose(false, true, false);
    }
  }

  #emit(type: string, detail?: unknown, cancelable = false): boolean {
    return this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, cancelable }));
  }
}

tryDefine(SPLIT_VIEW_PANEL_CONSTANTS.elementName, SplitViewPanelComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-view-panel': ISplitViewPanelComponent;
  }

  interface HTMLElementEventMap {
    'forge-split-view-panel-will-resize': CustomEvent<ISplitViewPanelWillResizeEvent>;
    'forge-split-view-panel-resize-start': CustomEvent<number>;
    'forge-split-view-panel-resize-end': CustomEvent<number>;
    'forge-split-view-panel-resize': CustomEvent<number>;
    'forge-split-view-panel-will-open': CustomEvent<ISplitViewPanelOpenEvent>;
    'forge-split-view-panel-will-close': CustomEvent<ISplitViewPanelOpenEvent>;
    'forge-split-view-panel-did-open': CustomEvent<ISplitViewPanelOpenEvent>;
    'forge-split-view-panel-did-close': CustomEvent<ISplitViewPanelOpenEvent>;
  }
}
