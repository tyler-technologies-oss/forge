import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { FocusIndicatorAdapter } from './focus-indicator-adapter';
import { FocusIndicatorFocusMode, FOCUS_INDICATOR_CONSTANTS } from './focus-indicator-constants';
import { FocusIndicatorCore } from './focus-indicator-core';

import template from './focus-indicator.html';
import styles from './focus-indicator.scss';

export interface IFocusIndicatorComponent extends IBaseComponent {
  targetElement: HTMLElement;
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

/**
 * @tag forge-focus-indicator
 *
 * @summary Renders a focus indicator when an attached element matches `:focus-visible`.
 *
 * @property {HTMLElement} targetElement - The element to attach the focus indicator to.
 * @property {string} target - The id of the element to attach the focus indicator to.
 * @property {boolean} [active=false] - Controls whether the indicator is active.
 * @property {boolean} [inward=false] - Controls whether the indicator renders inward.
 * @property {boolean} [circular=false] - Controls whether the indicator renders circular.
 * @property {boolean} [allowFocus=false] - Controls whether the indicator renders when the target element matches `:focus` instead of `:focus-visible`.
 * @property {FocusIndicatorFocusMode} [focusMode="focusin"] - The focus mode to use.
 *
 * @attribute {string} target - The id of the element to attach the focus indicator to.
 * @attribute {boolean} [active=false] - Controls whether the indicator is active.
 * @attribute {boolean} [inward=false] - Controls whether the indicator renders inward.
 * @attribute {boolean} [circular=false] - Controls whether the indicator renders circular.
 * @attribute {boolean} [allow-focus=false] - Controls whether the indicator renders when the target element matches `:focus` instead of `:focus-visible`.
 * @attribute {FocusIndicatorFocusMode} [focus-mode="focusin"] - The focus mode to use.
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
@customElement({
  name: FOCUS_INDICATOR_CONSTANTS.elementName
})
export class FocusIndicatorComponent extends BaseComponent implements IFocusIndicatorComponent {
  public static get observedAttributes(): string[] {
    return Object.values(FOCUS_INDICATOR_CONSTANTS.attributes);
  }

  private _core: FocusIndicatorCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new FocusIndicatorCore(new FocusIndicatorAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case FOCUS_INDICATOR_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        break;
      case FOCUS_INDICATOR_CONSTANTS.attributes.ACTIVE:
        this.active = coerceBoolean(newValue);
        break;
      case FOCUS_INDICATOR_CONSTANTS.attributes.INWARD:
        this.inward = coerceBoolean(newValue);
        break;
      case FOCUS_INDICATOR_CONSTANTS.attributes.CIRCULAR:
        this.circular = coerceBoolean(newValue);
        break;
      case FOCUS_INDICATOR_CONSTANTS.attributes.ALLOW_FOCUS:
        this.allowFocus = coerceBoolean(newValue);
        break;
      case FOCUS_INDICATOR_CONSTANTS.attributes.FOCUS_MODE:
        this.focusMode = newValue as FocusIndicatorFocusMode;
        break;
    }
  }

  @coreProperty()
  declare public targetElement: HTMLElement;

  @coreProperty()
  declare public target: string | null;

  @coreProperty()
  declare public active: boolean;

  @coreProperty()
  declare public inward: boolean;

  @coreProperty()
  declare public circular: boolean;

  @coreProperty()
  declare public allowFocus: boolean;

  @coreProperty()
  declare public focusMode: FocusIndicatorFocusMode;
}
