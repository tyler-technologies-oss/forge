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

interface FocusIndicatorBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

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

    this.#cleanupAutoUpdate = autoUpdate(this.#targetElement, this.#indicatorElement, () => this.#updatePosition(), { animationFrame: true });
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

    const clipBounds = getClipBounds(anchor);
    this.#indicatorElement.style.setProperty('--_focus-indicator-top-layer-clip-top', toClipInset(clipBounds.top - targetRect.top));
    this.#indicatorElement.style.setProperty('--_focus-indicator-top-layer-clip-right', toClipInset(targetRect.right - clipBounds.right));
    this.#indicatorElement.style.setProperty('--_focus-indicator-top-layer-clip-bottom', toClipInset(targetRect.bottom - clipBounds.bottom));
    this.#indicatorElement.style.setProperty('--_focus-indicator-top-layer-clip-left', toClipInset(clipBounds.left - targetRect.left));

    this.#indicatorElement.toggleAttribute('inward', this.inward);
    this.#indicatorElement.toggleAttribute('circular', this.circular);
    this.#indicatorElement.toggleAttribute('obscured', !this.#isAnchorVisible(anchor, this.#targetElement, targetRect, clipBounds));
  }

  /**
   * Determines whether any part of the anchor is visible on the page by sampling a grid of points
   * within the portion of its bounds that is inside the viewport. Exits on the first visible point.
   *
   * The anchor may be a `pointer-events: none` overlay that hit testing never returns, so a hit on
   * the target element (or one of its ancestors) also counts as visible. Containment is evaluated
   * against the flat tree because the target can be a slot wrapper whose slotted content is the hit.
   */
  #isAnchorVisible(anchor: HTMLElement, target: HTMLElement, rect: DOMRect, clipBounds: FocusIndicatorBounds): boolean {
    const root = anchor.getRootNode() as Partial<DocumentOrShadowRoot>;
    if (!root.elementFromPoint) {
      return true;
    }

    const visibleRect = intersect(rect, clipBounds);
    if (!visibleRect) {
      return false;
    }
    const { left, top, right, bottom } = visibleRect;

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

const CLIPPING_OVERFLOW_PATTERN = /auto|scroll|hidden|clip|overlay/;
const CONTAINING_BLOCK_WILL_CHANGE_PATTERN = /transform|perspective|filter/;
const CONTAINING_BLOCK_CONTAIN_PATTERN = /paint|layout|strict|content/;
const NO_CLIP_INSET = '-100vmax';
const CLIP_TOLERANCE_PX = 0.5;

type ContainingBlockKind = 'in-flow' | 'absolute' | 'fixed';

/**
 * The bounds of the viewport narrowed by every ancestor that actually clips the element.
 *
 * An ancestor only clips the element when it is, or is inside, the element's containing block, so
 * absolutely and fixed positioned elements skip ancestors that do not contain them. Elements in the
 * top layer are not clipped by their ancestors at all.
 */
function getClipBounds(element: HTMLElement): FocusIndicatorBounds {
  const bounds: FocusIndicatorBounds = {
    left: 0,
    top: 0,
    right: document.documentElement.clientWidth,
    bottom: document.documentElement.clientHeight
  };

  if (isInTopLayer(element)) {
    return bounds;
  }

  let kind = getContainingBlockKind(getComputedStyle(element));
  let current: Element | null = getFlatTreeParent(element);
  while (current && current !== document.documentElement) {
    const style = getComputedStyle(current);
    if (style.display === 'contents' || !containsDescendantOfKind(style, kind)) {
      current = getFlatTreeParent(current);
      continue;
    }

    const isInline = style.display === 'inline';
    const clipsX = !isInline && CLIPPING_OVERFLOW_PATTERN.test(style.overflowX);
    const clipsY = !isInline && CLIPPING_OVERFLOW_PATTERN.test(style.overflowY);
    if (clipsX || clipsY) {
      const { left, top } = current.getBoundingClientRect();
      const paddingBoxLeft = left + current.clientLeft;
      const paddingBoxTop = top + current.clientTop;
      if (clipsX) {
        bounds.left = Math.max(bounds.left, paddingBoxLeft);
        bounds.right = Math.min(bounds.right, paddingBoxLeft + current.clientWidth);
      }
      if (clipsY) {
        bounds.top = Math.max(bounds.top, paddingBoxTop);
        bounds.bottom = Math.min(bounds.bottom, paddingBoxTop + current.clientHeight);
      }
    }

    if (isInTopLayer(current)) {
      break;
    }
    kind = getContainingBlockKind(style);
    current = getFlatTreeParent(current);
  }

  return bounds;
}

function getContainingBlockKind({ position }: CSSStyleDeclaration): ContainingBlockKind {
  return position === 'absolute' || position === 'fixed' ? position : 'in-flow';
}

/**
 * Whether an element with this style is the containing block for a descendant of the given kind.
 * Every ancestor can clip an in-flow descendant, but an absolutely positioned one is only clipped by
 * the nearest positioned ancestor and those above it, and a fixed one by ancestors that create a
 * containing block for fixed descendants, such as a transform.
 */
function containsDescendantOfKind(style: CSSStyleDeclaration, kind: ContainingBlockKind): boolean {
  if (kind === 'in-flow') {
    return true;
  }
  const createsFixedContainingBlock =
    [style.transform, style.perspective, style.filter, style.backdropFilter].some(value => value && value !== 'none') ||
    CONTAINING_BLOCK_WILL_CHANGE_PATTERN.test(style.willChange) ||
    CONTAINING_BLOCK_CONTAIN_PATTERN.test(style.contain);
  return kind === 'fixed' ? createsFixedContainingBlock : style.position !== 'static' || createsFixedContainingBlock;
}

function isInTopLayer(element: Element): boolean {
  try {
    return element.matches(':popover-open, :modal');
  } catch {
    return false;
  }
}

/**
 * Intersects `rect` with `bounds`, or returns `null` when nothing of the rect is left,
 * such as when it is scrolled out of a scroll container.
 */
function intersect(rect: DOMRect, bounds: FocusIndicatorBounds): FocusIndicatorBounds | null {
  const result: FocusIndicatorBounds = {
    left: Math.max(rect.left, bounds.left),
    top: Math.max(rect.top, bounds.top),
    right: Math.min(rect.right, bounds.right),
    bottom: Math.min(rect.bottom, bounds.bottom)
  };
  return result.left > result.right || result.top > result.bottom ? null : result;
}

/**
 * How far the anchor's edge is cut off by its clip bounds. Only a side where the anchor itself is
 * clipped is trimmed, so a fully visible anchor can still draw its indicator outside of a scroll container.
 * Overflow within a sub-pixel tolerance is ignored so fractional layout and zoom do not trim a visible anchor.
 */
function toClipInset(overflow: number): string {
  return overflow > CLIP_TOLERANCE_PX ? `${overflow}px` : NO_CLIP_INSET;
}

function getFlatTreeParent(node: Element): Element | null {
  return node.assignedSlot ?? node.parentElement ?? (node.getRootNode() as ShadowRoot).host ?? null;
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
