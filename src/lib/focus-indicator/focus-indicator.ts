import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { nothing, PropertyValues, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { IBaseComponent } from '../core/base/base-component';
import { BaseLitElement } from '../core/base/base-lit-element';
import { locateTargetHeuristic, toggleState } from '../core/utils/utils';
import { FocusIndicatorFocusMode } from './focus-indicator-constants';

import styles from './focus-indicator.scss';

export interface IFocusIndicatorComponent extends IBaseComponent {
  targetElement: HTMLElement | undefined;
  target: string | null;
  active: boolean;
  inward: boolean;
  circular: boolean;
  allowFocus: boolean;
  focusMode: FocusIndicatorFocusMode;
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
 * @summary Renders a focus indicator when an attached element matches `:focus-visible`.
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
@customElement(FOCUS_INDICATOR_TAG_NAME)
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

  #targetElement: HTMLElement | undefined;
  #internals: ElementInternals;

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
    this.#targetElement = undefined;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (this.hasUpdated) {
      if (changedProperties.has('target')) {
        this.#handleTargetChange();
      }
    }

    if (changedProperties.has('active')) {
      this.#handleActiveChange();
    }
  }

  public override render(): typeof nothing {
    return nothing; // This component does not render any elements, it only applies encapsulated styles to the host element.
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
}
