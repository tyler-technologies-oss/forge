import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { FocusIndicatorAdapter } from './focus-indicator-adapter';
import { FocusIndicatorFocusMode, FOCUS_INDICATOR_CONSTANTS } from './focus-indicator-constants';
import { FocusIndicatorFoundation } from './focus-indicator-foundation';

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
 * @property {boolean} active - Controls whether the indicator is active.
 * @property {boolean} inward - Controls whether the indicator renders inward.
 * @property {boolean} circular - Controls whether the indicator renders circular.
 * @property {boolean} allowFocus - Controls whether the indicator renders when the target element matches `:focus` instead of `:focus-visible`.
 * @property {FocusIndicatorFocusMode} focusMode - The focus mode to use. Defaults to `focusin`.
 * 
 * @attribute {string} target - The id of the element to attach the focus indicator to.
 * @attribute {boolean} active - Controls whether the indicator is active.
 * @attribute {boolean} inward - Controls whether the indicator renders inward.
 * @attribute {boolean} circular - Controls whether the indicator renders circular.
 * @attribute {boolean} allow-focus - Controls whether the indicator renders when the target element matches `:focus` instead of `:focus-visible`.
 * @attribute {FocusIndicatorFocusMode} focus-mode - The focus mode to use. Defaults to `focusin`.
 * 
 * @cssproperty --forge-focus-indicator-active-width - The width of the focus indicator when active. When animating this is the max extent.
 * @cssproperty --forge-focus-indicator-color - The color of the focus indicator.
 * @cssproperty --forge-focus-indicator-duration - The animation duration.
 * @cssproperty --forge-focus-indicator-outward-offset - The offset of the focus indicator when outward.
 * @cssproperty --forge-focus-indicator-inward-offset - The offset of the focus indicator when inward.
 * @cssproperty --forge-focus-indicator-shape - The shape of the focus indicator.
 * @cssproperty --forge-focus-indicator-width - The width of the focus indicator when resting.
 * @cssproperty --forge-focus-indicator-shape-start-start - The start start shape.
 * @cssproperty --forge-focus-indicator-shape-start-end - The start end shape.
 * @cssproperty --forge-focus-indicator-shape-end-start - The end start shape.
 * @cssproperty --forge-focus-indicator-shape-end-end - The end end shape.
 * @cssproperty --forge-focus-indicator-offset-block - The block offset.
 * @cssproperty --forge-focus-indicator-offset-inline - The inline offset.
 * 
 * @csspart indicator - The focus indicator element.
 */
@CustomElement({
  name: FOCUS_INDICATOR_CONSTANTS.elementName
})
export class FocusIndicatorComponent extends BaseComponent implements IFocusIndicatorComponent {
  public static get observedAttributes(): string[] {
    return Object.values(FOCUS_INDICATOR_CONSTANTS.attributes);
  }

  private _foundation: FocusIndicatorFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new FocusIndicatorFoundation(new FocusIndicatorAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
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

  @FoundationProperty()
  public declare targetElement: HTMLElement;

  @FoundationProperty()
  public declare target: string | null;

  @FoundationProperty()
  public declare active: boolean;

  @FoundationProperty()
  public declare inward: boolean;

  @FoundationProperty()
  public declare circular: boolean;

  @FoundationProperty()
  public declare allowFocus: boolean;

  @FoundationProperty()
  public declare focusMode: FocusIndicatorFocusMode;
}
