import { attachShadowTemplate, coerceBoolean, coerceNumber, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { PopoverAdapter } from './popover-adapter';
import { IPopoverToggleEventData, PopoverAnimationType, PopoverPreset, PopoverTriggerType, POPOVER_CONSTANTS } from './popover-constants';
import { IPopoverFoundation, PopoverFoundation } from './popover-foundation';
import { OverlayComponent, OVERLAY_CONSTANTS } from '../overlay';
import { IOverlayAware, OverlayAware } from '../overlay/base/overlay-aware';
import { coerceStringToArray } from '../core/utils/utils';
import { IDismissible, tryDismiss, IDismissibleStackState } from '../core/utils/dismissible-stack';

import template from './popover.html';
import styles from './popover.scss';

export interface IPopoverComponent extends IOverlayAware, IDismissible {
  arrow: boolean;
  animationType: PopoverAnimationType;
  triggerType: PopoverTriggerType | PopoverTriggerType[];
  longpressDelay: number;
  persistentHover: boolean;
  hoverDelay: number;
  hoverDismissDelay: number;
  preset: PopoverPreset;
  hideAsync(): Promise<void>;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-popover': IPopoverComponent;
  }

  interface HTMLElementEventMap {
    'forge-popover-beforetoggle': CustomEvent<IPopoverToggleEventData>;
    'forge-popover-toggle': CustomEvent<IPopoverToggleEventData>;
  }
}

/**
 * @tag forge-popover
 * 
 * @summary Popovers are used to render content in an element that is above all other content on the page.
 * 
 * @property {boolean} arrow - Whether or not the popover should render an arrow.
 * @property {PopoverAnimationType} animationType - The animation type to use for the popover. Valid values are `'none'`, `'fade'`, `'slide'`, and `'zoom'` (default).
 * @property {PopoverTriggerType | PopoverTriggerType[]} triggerType - The trigger type(s) to use for the popover. Valid values are `'click'` (default), `'hover'`, `'focus'`, and `'longpress'`. Multiple can be specified.
 * @property {number} longpressDelay - The delay in milliseconds before a longpress event is detected.
 * @property {boolean} persistentHover - Whether or not the popover should remain open when the user hovers outside the popover.
 * @property {number} hoverDismissDelay - The delay in milliseconds before the popover is dismissed when the user hovers outside of the popover.
 * @property {number} hoverDelay - The delay in milliseconds before the popover is shown.
 * @property {PopoverPreset} preset - The preset to use for the popover.
 * 
 * @globalconfig placement
 * @globalconfig animationType
 * @globalconfig positionStrategy
 * @globalconfig shift
 * @globalconfig hide
 * @globalconfig flip
 * @globalconfig boundaryElement
 * @globalconfig fallbackPlacements
 * @globalconfig persistent
 * @globalconfig arrow
 * 
 * @attribute {string} arrow - Whether or not the popover should render an arrow.
 * @attribute {string} animation-type - The animation type to use for the popover. Valid values are `'none'`, `'fade'`, `'slide'`, and `'zoom'` (default).
 * @attribute {string} trigger-type - The trigger type(s) to use for the popover. Valid values are `'click'` (default), `'hover'`, `'focus'`, and `'longpress'`. Multiple can be specified.
 * @attribute {string} longpress-delay - The delay in milliseconds before a longpress event is detected.
 * @attribute {string} persistent-hover - Whether or not the popover should remain open when the user hovers outside the popover.
 * @attribute {string} hover-dismiss-delay - The delay in milliseconds before the popover is dismissed when the user hovers outside of the popover.
 * @attribute {number} hover-delay - The delay in milliseconds before the popover is shown.
 * @attribute {string} preset - The preset to use for the popover.
 * 
 * @event {CustomEvent<IPopoverToggleEventData} forge-popover-beforetoggle - Dispatches before the popover is toggled, and is cancelable.
 * @event {CustomEvent<IPopoverToggleEventData} forge-popover-toggle - Dispatches after the popover is toggled.
 * 
 * @cssproperty --forge-popover-background - The background color of the popover surface.
 * @cssproperty --forge-popover-border-radius - The border radius of the popover surface.
 * @cssproperty --forge-popover-box-shadow - The box shadow of the popover surface.
 * @cssproperty --forge-popover-border-width - The border width of the popover surface.
 * @cssproperty --forge-popover-border-style - The border style of the popover surface.
 * @cssproperty --forge-popover-border-color - The border color of the popover surface.
 * @cssproperty --forge-popover-width - The width of the popover surface. Defaults to `auto`.
 * @cssproperty --forge-popover-height - The height of the popover surface. Defaults to `auto`.
 * @cssproperty --forge-popover-min-width - The minimum width of the popover surface. Defaults to `none`.
 * @cssproperty --forge-popover-max-width - The maximum width of the popover surface. Defaults to `none`.
 * @cssproperty --forge-popover-min-height - The minimum height of the popover surface. Defaults to `none`.
 * @cssproperty --forge-popover-max-height - The maximum height of the popover surface. Defaults to `none`.
 * @cssproperty --forge-popover-arrow-size - The size of the arrow.
 * @cssproperty --forge-popover-arrow-height - The height of the arrow.
 * @cssproperty --forge-popover-arrow-width - The width of the arrow.
 * @cssproperty --forge-popover-arrow-background-color - The background color of the arrow. Defaults to the background color of the popover surface.
 * @cssproperty --forge-popover-arrow-top-rotation - The rotation of the arrow when the popover is placed on the top.
 * @cssproperty --forge-popover-arrow-right-rotation - The rotation of the arrow when the popover is placed on the right.
 * @cssproperty --forge-popover-arrow-bottom-rotation - The rotation of the arrow when the popover is placed on the bottom.
 * @cssproperty --forge-popover-arrow-left-rotation - The rotation of the arrow when the popover is placed on the left.
 * @cssproperty --forge-popover-arrow-border-width - The border width of the popover surface and arrow when an arrow is applied.
 * @cssproperty --forge-popover-arrow-clip-path - The clip path to use for the arrow element.
 * @cssproperty --forge-popover-animation-timing - The animation timing function to use for the popover animation.
 * @cssproperty --forge-popover-zoom-duration - The duration of the zoom animation.
 * @cssproperty --forge-popover-zoom-timing - The timing function to use for the zoom animation.
 * @cssproperty --forge-popover-slide-duration - The duration of the slide animation.
 * @cssproperty --forge-popover-slide-timing - The timing function to use for the slide animation.
 * @cssproperty --forge-popover-slide-offset - The start offset to use for the slide animation.
 * @cssproperty --forge-popover-fade-duration - The duration of the fade animation.
 * @cssproperty --forge-popover-fade-timing - The timing function to use for the fade animation.
 * @cssproperty --forge-popover-position-block-start - The `block-start` position of the popover.
 * @cssproperty --forge-popover-position-block-end - The `block-end` position of the popover.
 * @cssproperty --forge-popover-position-inline-start - The `inline-start` position of the popover.
 * @cssproperty --forge-popover-position-inline-end - The `inline-end` position of the popover.
 * @cssproperty --forge-popover-preset-dropdown-max-height - The maximum height of the popover when using `preset="dropdown"`. Defaults to `256px`.
 * @cssproperty --forge-popover-preset-dropdown-overflow - The overflow behavior of the popover when using `preset="dropdown"`. Defaults to `auto visible` (vertical scrolling only).
 * 
 * @slot - The content to render inside the popover.
 * 
 * @csspart overlay - The overlay root element.
 * @csspart surface - The surface container element for the slotted content.
 */
@CustomElement({
  name: POPOVER_CONSTANTS.elementName,
  dependencies: [OverlayComponent]
})
export class PopoverComponent extends OverlayAware<IPopoverFoundation> implements IPopoverComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(OVERLAY_CONSTANTS.observedAttributes),
      ...Object.values(POPOVER_CONSTANTS.observedAttributes)
    ];
  }

  public [tryDismiss](state: IDismissibleStackState): boolean {
    return this._foundation.dispatchBeforeToggleEvent(state);
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new PopoverFoundation(new PopoverAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case POPOVER_CONSTANTS.observedAttributes.ARROW:
        this.arrow = coerceBoolean(newValue);
        return;
      case POPOVER_CONSTANTS.observedAttributes.ANIMATION_TYPE:
        this.animationType = newValue as PopoverAnimationType;
        return;
      case POPOVER_CONSTANTS.observedAttributes.TRIGGER_TYPE:
        this.triggerType = newValue?.trim() ? coerceStringToArray<PopoverTriggerType>(newValue) : POPOVER_CONSTANTS.defaults.TRIGGER_TYPE;
        return;
      case POPOVER_CONSTANTS.observedAttributes.LONGPRESS_DELAY:
        this.longpressDelay = coerceNumber(newValue);
        return;
      case POPOVER_CONSTANTS.observedAttributes.PERSISTENT_HOVER:
        this.persistentHover = coerceBoolean(newValue);
        return;
      case POPOVER_CONSTANTS.observedAttributes.HOVER_DELAY:
        this.hoverDelay = coerceNumber(newValue);
        return;
      case POPOVER_CONSTANTS.observedAttributes.HOVER_DISMISS_DELAY:
        this.hoverDismissDelay = coerceNumber(newValue);
        return;
      case POPOVER_CONSTANTS.observedAttributes.PRESET:
        this.preset = newValue as PopoverPreset;
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @FoundationProperty()
  public declare arrow: boolean;

  @FoundationProperty()
  public declare animationType: PopoverAnimationType;

  @FoundationProperty()
  public declare triggerType: PopoverTriggerType | PopoverTriggerType[];

  @FoundationProperty()
  public declare longpressDelay: number;

  @FoundationProperty()
  public declare persistentHover: boolean;

  @FoundationProperty()
  public declare hoverDelay: number;

  @FoundationProperty()
  public declare hoverDismissDelay: number;

  @FoundationProperty()
  public declare preset: PopoverPreset;

  public hideAsync(): Promise<void> {
    return this._foundation.hideAsync();
  }
}
