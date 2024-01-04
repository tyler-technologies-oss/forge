import { attachShadowTemplate, coerceBoolean, coerceNumber, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { PopoverAdapter } from './popover-adapter';
import { IPopoverToggleEventData, PopoverAnimationType, PopoverTriggerType, POPOVER_CONSTANTS } from './popover-constants';
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
 * @description Popovers are used to render content in an element that is above all other content on the page.
 * 
 * @property {boolean} arrow - Whether or not the popover should render an arrow.
 * @property {PopoverAnimationType} animationType - The animation type to use for the popover. Valid values are `'none'`, `'fade'`, `'slide'`, and `'zoom'` (default).
 * @property {PopoverTriggerType | PopoverTriggerType[]} triggerType - The trigger type(s) to use for the popover. Valid values are `'click'` (default), `'hover'`, `'focus'`, and `'longpress'`. Multiple can be specified.
 * @property {number} longpressDelay - The delay in milliseconds before a longpress event is detected.
 * 
 * @attribute {string} arrow - Whether or not the popover should render an arrow.
 * @attribute {string} animation-type - The animation type to use for the popover. Valid values are `'none'`, `'fade'`, `'slide'`, and `'zoom'` (default).
 * @attribute {string} trigger-type - The trigger type(s) to use for the popover. Valid values are `'click'` (default), `'hover'`, `'focus'`, and `'longpress'`. Multiple can be specified.
 * @attribute {string} longpress-delay - The delay in milliseconds before a longpress event is detected.
 * 
 * @event {CustomEvent<IPopoverToggleEventData} forge-popover-beforetoggle - Dispatches before the popover is toggled, and is cancelable.
 * @event {CustomEvent<IPopoverToggleEventData} forge-popover-toggle - Dispatches after the popover is toggled.
 * 
 * @cssproperty background - The background color of the popover surface.
 * @cssproperty border-radius - The border radius of the popover surface.
 * @cssproperty box-shadow - The box shadow of the popover surface.
 * @cssproperty border-width - The border width of the popover surface.
 * @cssproperty border-style - The border style of the popover surface.
 * @cssproperty border-color - The border color of the popover surface.
 * @cssproperty arrow-size - The size of the arrow.
 * @cssproperty arrow-height - The height of the arrow.
 * @cssproperty arrow-width - The width of the arrow.
 * @cssproperty arrow-background-color - The background color of the arrow. Defaults to the background color of the popover surface.
 * @cssproperty arrow-top-rotation - The rotation of the arrow when the popover is placed on the top.
 * @cssproperty arrow-right-rotation - The rotation of the arrow when the popover is placed on the right.
 * @cssproperty arrow-bottom-rotation - The rotation of the arrow when the popover is placed on the bottom.
 * @cssproperty arrow-left-rotation - The rotation of the arrow when the popover is placed on the left.
 * @cssproperty arrow-border-width - The border width of the popover surface and arrow when an arrow is applied.
 * @cssproperty arrow-clip-path - The clip path to use for the arrow element.
 * @cssproperty animation-timing - The animation timing function to use for the popover animation.
 * @cssproperty zoom-duration - The duration of the zoom animation.
 * @cssproperty zoom-timing - The timing function to use for the zoom animation.
 * @cssproperty slide-duration - The duration of the slide animation.
 * @cssproperty slide-timing - The timing function to use for the slide animation.
 * @cssproperty slide-offset - The start offset to use for the slide animation.
 * @cssproperty fade-duration - The duration of the fade animation.
 * @cssproperty fade-timing - The timing function to use for the fade animation.
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
      POPOVER_CONSTANTS.attributes.ARROW,
      POPOVER_CONSTANTS.attributes.ANIMATION_TYPE,
      POPOVER_CONSTANTS.attributes.TRIGGER_TYPE,
      POPOVER_CONSTANTS.attributes.LONGPRESS_DELAY
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
      case POPOVER_CONSTANTS.attributes.ARROW:
        this.arrow = coerceBoolean(newValue);
        return;
      case POPOVER_CONSTANTS.attributes.ANIMATION_TYPE:
        this.animationType = newValue as PopoverAnimationType;
        return;
      case POPOVER_CONSTANTS.attributes.TRIGGER_TYPE:
        this.triggerType = newValue?.trim() ? coerceStringToArray<PopoverTriggerType>(newValue) : POPOVER_CONSTANTS.defaults.TRIGGER_TYPE;
        return;
      case POPOVER_CONSTANTS.attributes.LONGPRESS_DELAY:
        this.longpressDelay = coerceNumber(newValue);
        return;
    }
    super.attributeChangedCallback(name, oldValue, newValue);
  }

  @FoundationProperty()
  public arrow: boolean;

  @FoundationProperty()
  public animationType: PopoverAnimationType;

  @FoundationProperty()
  public triggerType: PopoverTriggerType | PopoverTriggerType[];

  @FoundationProperty()
  public longpressDelay: number;
}
