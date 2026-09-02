import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, ref, type Ref } from 'lit/directives/ref.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, ForgeResizeObserver, throttle } from '@tylertech/forge-core';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { ToolbarComponent } from '../toolbar/index.js';
import { ResponsiveToolbarState, ResponsiveToolbarUpdateEventData } from './responsive-toolbar-constants.js';

import '../toolbar/toolbar.js';

import styles from './responsive-toolbar.scss';

export interface IResponsiveToolbarComponent extends BaseLitElement {
  noBorder: boolean;
  inverted: boolean;
  resizeDelay: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-responsive-toolbar': IResponsiveToolbarComponent;
  }

  interface HTMLElementEventMap {
    'forge-responsive-toolbar-update': CustomEvent<ResponsiveToolbarUpdateEventData>;
  }
}

/** The amount of space between the title and actions before the title is considered to be overlapping the actions. */
const BUFFER = 24;

/** The default delay in milliseconds to throttle resize events. */
const RESIZE_DELAY = 100;

export const RESPONSIVE_TOOLBAR_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-responsive-toolbar';

/**
 * @tag forge-responsive-toolbar
 *
 * @summary A toolbar that switches between two end-slot layouts based on whether its title is overlapping its actions.
 *
 * @meta extended
 *
 * @dependency forge-toolbar
 *
 * @slot before-start - Maps to the toolbar before-start slot
 * @slot start - Maps to the toolbar start slot
 * @slot end-large - The content you want to render at larger sizes in the toolbar end slot
 * @slot end-small - The content you want to render at smaller sizes in the toolbar end slot
 * @slot after-end - Maps to the toolbar after-end slot
 *
 * @state small - The title is overlapping the actions, the large end slot is hidden.
 * @state large - The title is not overlapping the actions, the small end slot is hidden.
 *
 * @event {CustomEvent<ResponsiveToolbarUpdateEventData>} forge-responsive-toolbar-update - Dispatched when the overflow state changes.
 */
@customElement(RESPONSIVE_TOOLBAR_TAG_NAME)
export class ResponsiveToolbarComponent extends BaseLitElement implements IResponsiveToolbarComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RESPONSIVE_TOOLBAR_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ToolbarComponent];

  public static styles = unsafeCSS(styles);

  /** Hides the toolbar divider. */
  @property({ type: Boolean, attribute: 'no-border' })
  public noBorder = false;

  /** Controls whether a bottom divider (default) or top divider (true) is used. */
  @property({ type: Boolean })
  public inverted = false;

  /** Controls the delay in milliseconds to throttle resize events. */
  @property({ type: Number, attribute: 'resize-delay' })
  public resizeDelay = RESIZE_DELAY;

  readonly #startSlotContainer: Ref<HTMLElement> = createRef();
  readonly #endSlotContainer: Ref<HTMLElement> = createRef();
  readonly #internals: ElementInternals;
  #throttledHandleResize: (() => void) | undefined;
  #currentState: ResponsiveToolbarState | undefined;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#initializeThrottledResizeHandler();
    ForgeResizeObserver.observe(this, this.#handleResize);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#currentState = undefined;
    ForgeResizeObserver.unobserve(this);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('resizeDelay') && this.resizeDelay !== changedProperties.get('resizeDelay')) {
      this.#initializeThrottledResizeHandler();
    }
  }

  public render(): TemplateResult {
    return html`
      <forge-toolbar auto-height ?no-divider=${this.noBorder} ?inverted=${this.inverted} @slotchange=${this.#updateOverlapState}>
        <slot name="before-start" slot="before-start"></slot>
        <div ${ref(this.#startSlotContainer)} slot="start">
          <slot name="start"></slot>
        </div>
        <div slot="end" id="end-large" ${ref(this.#endSlotContainer)}>
          <slot name="end-large"></slot>
        </div>
        <div slot="end" id="end-small">
          <slot name="end-small"></slot>
        </div>
        <slot name="after-end" slot="after-end"></slot>
      </forge-toolbar>
    `;
  }

  #initializeThrottledResizeHandler(): void {
    this.#throttledHandleResize = throttle(() => requestAnimationFrame(() => this.#updateOverlapState()), this.resizeDelay);
  }

  #handleResize = (): void => {
    this.#throttledHandleResize?.();
  };

  #updateOverlapState(): void {
    const titleInlineEndEdge = this.#startSlotContainer.value?.getBoundingClientRect().right || 0;
    const actionsInlineStartEdge = this.#endSlotContainer.value?.getBoundingClientRect().left || 0;
    const isSmall = titleInlineEndEdge + BUFFER >= actionsInlineStartEdge;
    const newState: ResponsiveToolbarState = isSmall ? 'small' : 'large';

    if (this.#currentState === newState) {
      return;
    }

    this.#currentState = newState;
    toggleState(this.#internals, 'small', newState === 'small');
    toggleState(this.#internals, 'large', newState === 'large');
    this.#emitOverflowEvent(newState);
  }

  #emitOverflowEvent(state: ResponsiveToolbarState): void {
    const event = new CustomEvent<ResponsiveToolbarUpdateEventData>('forge-responsive-toolbar-update', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { state }
    });
    this.dispatchEvent(event);
  }
}
