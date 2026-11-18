import { autoUpdate } from '@floating-ui/dom';
import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { IBaseComponent } from '../core/base/base-component.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { supportsPopover } from '../core/utils/feature-detection.js';
import { locateTargetHeuristic, toggleState } from '../core/utils/utils.js';
import { FOCUS_INDICATOR_SAMPLE_RATIOS, FocusIndicatorFocusMode } from './focus-indicator-constants.js';

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

  public override firstUpdated(): void {
    if (supportsPopover()) {
      this.#indicatorElement = this.shadowRoot?.querySelector('.focus-indicator') as HTMLDivElement | undefined;
    }
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (this.hasUpdated) {
      if (changedProperties.has('target')) {
        this.#handleTargetChange();
      }
    }

    if (changedProperties.has('active')) {
      this.#handleActiveChange();
      this.#updateTopLayerState();
    }
  }

  public render(): TemplateResult {
    return html`<div class="focus-indicator" part="indicator" popover="manual"></div>`;
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
    if (!supportsPopover() || !this.#indicatorElement) {
      return;
    }

    if (this.active) {
      try {
        this.#indicatorElement.showPopover();
        this.#startPositioning();
      } catch {
        // Popover already shown or error occurred
      }
    } else {
      try {
        this.#indicatorElement.hidePopover();
      } catch {
        // Popover already hidden
      }
      this.#stopPositioning();
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
    this.#indicatorElement.toggleAttribute('obscured', !this.#isAnchorVisible(anchor, this.#targetElement, targetRect));
  }

  /**
   * Determines whether any part of the anchor is visible on the page by sampling a grid of points
   * within the portion of its bounds that is inside the viewport. Exits on the first visible point.
   *
   * The anchor may be a `pointer-events: none` overlay that hit testing never returns, so a hit on
   * the target element (or one of its ancestors) also counts as visible. Containment is evaluated
   * against the flat tree because the target can be a slot wrapper whose slotted content is the hit.
   */
  #isAnchorVisible(anchor: HTMLElement, target: HTMLElement, rect: DOMRect): boolean {
    const root = anchor.getRootNode() as Partial<DocumentOrShadowRoot>;
    if (!root.elementFromPoint) {
      return true;
    }

    const left = Math.max(rect.left, 0);
    const top = Math.max(rect.top, 0);
    const right = Math.min(rect.right, document.documentElement.clientWidth);
    const bottom = Math.min(rect.bottom, document.documentElement.clientHeight);
    if (left > right || top > bottom) {
      return false;
    }

    for (const yRatio of FOCUS_INDICATOR_SAMPLE_RATIOS) {
      for (const xRatio of FOCUS_INDICATOR_SAMPLE_RATIOS) {
        const x = Math.min(left + (right - left) * xRatio, document.documentElement.clientWidth - 1);
        const y = Math.min(top + (bottom - top) * yRatio, document.documentElement.clientHeight - 1);
        const hit = root.elementFromPoint(x, y);
        if (hit && [anchor, target].some(el => isFlatTreeInclusiveAncestor(el, hit) || isFlatTreeInclusiveAncestor(hit, el))) {
          return true;
        }
      }
    }
    return false;
  }

  #stopPositioning(): void {
    this.#cleanupAutoUpdate?.();
    this.#cleanupAutoUpdate = undefined;
  }
}

/**
 * Whether `ancestor` is `node` or contains it when slot assignments and shadow hosts are followed.
 */
function isFlatTreeInclusiveAncestor(ancestor: Node, node: Node): boolean {
  let current: Node | null = node;
  while (current) {
    if (current === ancestor) {
      return true;
    }
    current = (current as Element).assignedSlot ?? current.parentNode ?? (current as ShadowRoot).host ?? null;
  }
  return false;
}

tryDefine(FOCUS_INDICATOR_TAG_NAME, FocusIndicatorComponent);
