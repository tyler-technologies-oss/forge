import { autoUpdate } from '@floating-ui/dom';
import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { IBaseComponent } from '../core/base/base-component.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { supportsPopover } from '../core/utils/feature-detection.js';
import { locateTargetHeuristic, toggleState } from '../core/utils/utils.js';
import { FocusIndicatorFocusMode } from './focus-indicator-constants.js';

import styles from './focus-indicator.scss';

export interface IFocusIndicatorComponent extends IBaseComponent {
  targetElement: HTMLElement | undefined;
  target: string | null;
  active: boolean;
  inward: boolean;
  circular: boolean;
  allowFocus: boolean;
  focusMode: FocusIndicatorFocusMode;
  renderInTopLayer: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-focus-indicator': IFocusIndicatorComponent;
  }
}

export const FOCUS_INDICATOR_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-focus-indicator';

/**
 * @tag forge-focus-indicator
 *
 * @summary Focus indicators show a "focus ring" around an attached element that matches `:focus-visible`. These are building block components used by other components to show focus state, and are not typically used directly.
 *
 * @cssproperty --forge-focus-indicator-display - The `display` style. Defaults to `flex`.
 * @cssproperty --forge-focus-indicator-width - The width of the focus indicator when resting.
 * @cssproperty --forge-focus-indicator-active-width - The width of the focus indicator when active. When animating this is the max extent.
 * @cssproperty --forge-focus-indicator-color - The color of the focus indicator.
 * @cssproperty --forge-focus-indicator-shape - The shape of the focus indicator.
 * @cssproperty --forge-focus-indicator-duration - The animation duration.
 * @cssproperty --forge-focus-indicator-easing - The animation easing function.
 * @cssproperty --forge-focus-indicator-shape-start-start - The start start shape.
 * @cssproperty --forge-focus-indicator-shape-start-end - The start end shape.
 * @cssproperty --forge-focus-indicator-shape-end-start - The end start shape.
 * @cssproperty --forge-focus-indicator-shape-end-end - The end end shape.
 * @cssproperty --forge-focus-indicator-outward-offset - The offset of the focus indicator when outward.
 * @cssproperty --forge-focus-indicator-inward-offset - The offset of the focus indicator when inward.
 * @cssproperty --forge-focus-indicator-offset-block - The block offset.
 * @cssproperty --forge-focus-indicator-offset-inline - The inline offset.
 *
 * @csspart indicator - The focus indicator element.
 *
 * @cssclass forge-focus-indicator - The element to render the focus indicator on.
 * @cssclass forge-focus-indicator__target - The element to trigger the focus indicator from when focused.
 * @cssclass forge-focus-indicator--active - Forces the focus indicator to be visible.
 * @cssclass forge-focus-indicator--inward - Renders the focus inside the target element.
 */
export class FocusIndicatorComponent extends BaseLitElement implements IFocusIndicatorComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = FOCUS_INDICATOR_TAG_NAME;

  /**
   * The element to attach the focus indicator to.
   * @default undefined
   */
  @property({ attribute: false })
  public set targetElement(value: HTMLElement | undefined) {
    this.#detachTargetListeners();
    this.#targetElement = value;
    if (this.isConnected) {
      this.#attachTargetListeners();
    }
  }
  public get targetElement(): HTMLElement | undefined {
    return this.#targetElement;
  }

  /**
   * The id of the element to attach the focus indicator to.
   * @default null
   * @attribute
   */
  @property({ type: String })
  public target: string | null = null;

  /**
   * Controls whether the indicator is active.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public active = false;

  /**
   * Controls whether the indicator renders inward.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public inward = false;

  /**
   * Controls whether the indicator renders circular.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public circular = false;

  /**
   * Controls whether the indicator renders when the target element matches `:focus` instead of `:focus-visible`.
   * @default false
   * @attribute allow-focus
   */
  @property({ type: Boolean, attribute: 'allow-focus' })
  public allowFocus = false;

  /**
   * The focus mode to use. Valid values are `focusin` (default) and `focus`.
   * @default 'focusin'
   * @attribute focus-mode
   */
  @property({ attribute: 'focus-mode' })
  public focusMode: FocusIndicatorFocusMode = 'focusin';

  /**
   * Controls whether the indicator renders in the top layer using the Popover API. This prevents the indicator from being clipped by ancestors with `overflow` set.
   * @default false
   * @attribute render-in-top-layer
   */
  @property({ type: Boolean, attribute: 'render-in-top-layer' })
  public renderInTopLayer = false;

  #targetElement: HTMLElement | undefined;
  #internals: ElementInternals;
  #indicatorElement: HTMLDivElement | undefined;
  #cleanupAutoUpdate: (() => void) | undefined;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    if (!this.#targetElement) {
      this.#targetElement = locateTargetHeuristic(this, this.target) ?? undefined;
    }
    this.#attachTargetListeners();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#detachTargetListeners();
    this.#stopPositioning();
    if (this.#indicatorElement) {
      try {
        this.#indicatorElement.hidePopover();
      } catch {
        // Popover already hidden
      }
    }
    this.#targetElement = undefined;
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (this.hasUpdated) {
      if (changedProperties.has('target')) {
        this.#handleTargetChange();
      }
    }

    if (changedProperties.has('active')) {
      this.#handleActiveChange();
    }

    if (changedProperties.has('renderInTopLayer')) {
      toggleState(this.#internals, 'top-layer', this.renderInTopLayer);
    }
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('renderInTopLayer')) {
      this.#indicatorElement = this.renderInTopLayer ? (this.shadowRoot?.querySelector('.top-layer') as HTMLDivElement | undefined) : undefined;
    }

    if (changedProperties.has('active') || changedProperties.has('renderInTopLayer')) {
      this.#updateTopLayerState();
    }
  }

  public render(): TemplateResult | typeof nothing {
    return this.renderInTopLayer ? html`<div class="top-layer" part="indicator" popover="manual"></div>` : nothing;
  }

  #detachTargetListeners(): void {
    this.#targetElement?.removeEventListener(this.focusMode, this.#handleTargetInteraction);
    this.#targetElement?.removeEventListener('focusout', this.#handleTargetInteraction);
    this.#targetElement?.removeEventListener('pointerdown', this.#handleTargetInteraction);
  }

  #attachTargetListeners(): void {
    this.#targetElement?.addEventListener(this.focusMode, this.#handleTargetInteraction);
    this.#targetElement?.addEventListener('focusout', this.#handleTargetInteraction);
    this.#targetElement?.addEventListener('pointerdown', this.#handleTargetInteraction);
  }

  #handleTargetInteraction = (evt: Event): void => {
    const target = evt.target as HTMLElement | null;
    switch (evt.type) {
      case this.focusMode:
        this.active = this.#isActive(this.allowFocus ? ':focus' : ':focus-visible', target);
        break;
      case 'focusout':
        this.active = false;
        break;
      case 'pointerdown':
        this.active = this.allowFocus ? this.#isActive(':focus', target) : this.#isActive(':focus-visible', target);
        break;
    }
  };

  #isActive(selector: string, el?: HTMLElement | null): boolean {
    const targetedEl = el ?? this.#targetElement;
    return !!targetedEl?.matches(selector);
  }

  #handleTargetChange(): void {
    this.#detachTargetListeners();
    if (this.isConnected) {
      this.#targetElement = locateTargetHeuristic(this, this.target) ?? undefined;
      this.#attachTargetListeners();
    }
  }

  #handleActiveChange(): void {
    this.toggleAttribute('active', this.active);
    toggleState(this.#internals, 'active', this.active);
  }

  #updateTopLayerState(): void {
    this.#stopPositioning();

    if (!this.renderInTopLayer || !supportsPopover() || !this.#indicatorElement) {
      return;
    }

    if (this.active) {
      try {
        this.#indicatorElement.showPopover();
      } catch {
        // Popover already shown or error occurred
      }
      this.#startPositioning();
    } else {
      try {
        this.#indicatorElement.hidePopover();
      } catch {
        // Popover already hidden
      }
    }
  }

  #startPositioning(): void {
    if (!this.#targetElement || !this.#indicatorElement) {
      return;
    }

    this.#cleanupAutoUpdate = autoUpdate(this.#targetElement, this.#indicatorElement, () => this.#updatePosition());
  }

  #updatePosition(): void {
    if (!this.#targetElement || !this.#indicatorElement) {
      return;
    }

    const anchor = this.parentElement ?? this.#targetElement;
    const targetRect = anchor.getBoundingClientRect();

    this.#indicatorElement.style.setProperty('--_focus-indicator-top-layer-left', `${targetRect.left}px`);
    this.#indicatorElement.style.setProperty('--_focus-indicator-top-layer-top', `${targetRect.top}px`);
    this.#indicatorElement.style.setProperty('--_focus-indicator-top-layer-width', `${targetRect.width}px`);
    this.#indicatorElement.style.setProperty('--_focus-indicator-top-layer-height', `${targetRect.height}px`);

    this.#indicatorElement.toggleAttribute('inward', this.inward);
    this.#indicatorElement.toggleAttribute('circular', this.circular);
  }

  #stopPositioning(): void {
    this.#cleanupAutoUpdate?.();
    this.#cleanupAutoUpdate = undefined;
  }
}

tryDefine(FOCUS_INDICATOR_TAG_NAME, FocusIndicatorComponent);
