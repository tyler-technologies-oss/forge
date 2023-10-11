import { attachShadowTemplate, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { OverlayAdapter } from './overlay-adapter';
import { IOverlayToggleEventData, OverlayLightDismissEventData, OVERLAY_CONSTANTS } from './overlay-constants';
import { OverlayFoundation } from './overlay-foundation';
import { BaseOverlay, IBaseOverlay } from './base-overlay';

import template from './overlay.html';
import styles from './overlay.scss';

export interface IOverlayComponent extends IBaseOverlay {
  arrowElement: HTMLElement | undefined;
  arrowElementOffset: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-overlay': IOverlayComponent;
  }

  interface HTMLElementEventMap {
    'forge-overlay-light-dismiss': CustomEvent<OverlayLightDismissEventData>;
  }
}

/**
 * @tag forge-overlay
 * 
 * @summary Overlays are used to render content in a floating element that is anchored around a target element.
 * 
 * @description
 * An overlay is a primitive component that does not provide any visual styles. Its only
 * purpose is to render slotted content in a floating element. The element can be positioned
 * manually, or configured to anchor itself with smart positioning around a target element.
 * 
 * @property {boolean} open - Whether or not the overlay is open.
 * @property {boolean} inline - Whether or not the overlay should be rendered inline (not in the :top-layer).
 * @property {HTMLElement} targetElement - The element to anchor the overlay to.
 * @property {HTMLElement} target - The id of the element to anchor the overlay to.
 * @property {HTMLElement} arrowElement - The element to use as the arrow for the overlay.
 * @property {number} arrowElementOffset - The offset to apply to the arrow element.
 * @property {OverlayPlacement} placement - The placement of the overlay relative to the target element.
 * @property {OverlayPositionStrategy} positionStrategy - The positioning strategy to use for the overlay. Valid values are `'fixed'` and `'absolute'`.
 * @property {IOverlayPosition} offset - The offset to apply to the overlay position relative to the target element.
 * @property {boolean} shift - Whether or not the target element should shift along the side of the overlay when scrolling.
 * @property {boolean} hide - Whether or not the overlay should hide itself when the target element is out of view.
 * @property {boolean} static - Whether or not the overlay handles light dismiss itself or not.
 * @property {boolean} flip - Whether or not the overlay should flip to the opposite placement when not enough room.
 * @property {boolean} auto - Whether or not the overlay should automatically attempt to locate the best placement.
 * @property {boolean} dialog - Whether or not the overlay is intended to be a dialog semantically. Default is `false`.
 * @property {boolean} modal - Only applies when `dialog` is `true`. Whether or not the dialog is modal. Default is `false`.
 * 
 * @attribute {boolean} open - Whether or not the overlay is open.
 * @attribute {boolean} inline - Whether or not the overlay should be rendered inline (not in the :top-layer).
 * @attribute {OverlayPlacement} placement - The placement of the overlay relative to the target element.
 * @attribute {OverlayPositionStrategy} position-strategy - The positioning strategy to use for the overlay. Valid values are `'fixed'` and `'absolute'`.
 * @attribute {boolean} hide - Whether or not the overlay should hide itself when the target element is out of view.
 * @attribute {boolean} static - Whether or not the overlay handles light dismiss itself or not.
 * @attribute {boolean} shift - Whether or not the target element should shift along the side of the overlay when scrolling.
 * @attribute {boolean} no-flip - Tells the overlay not to flip to the opposite placement when not enough room.
 * @attribute {boolean} auto - Whether or not the overlay should automatically attempt to locate the best placement.
 * @attribute {string} position-placement - The placement of the overlay around the target element **after** dynamic positioning. This is a read-only attribute that is only available when open.
 * @attribute {boolean} dialog - Whether or not the overlay is intended to be a dialog semantically. Default is `false`.
 * @attribute {boolean} modal - Only applies when `dialog` is `true`. Whether or not the dialog is modal. Default is `false`.
 * 
 * @event {CustomEvent<OverlayToggleEventData>} forge-overlay-toggle - Fires when the overlay is toggled.
 * @event {CustomEvent<OverlayToggleEventData>} forge-overlay-beforetoggle - Fires before the overlay is toggled.
 * 
 * @cssproperty --forge-overlay-position - The `position` of the overlay.
 * @cssproperty --forge-overlay-z-index - The `z-index` of the overlay. Defaults to the `popup` range.
 * @cssproperty --forge-overlay-height - The `height` of the overlay. Defaults to `min-content`.
 * @cssproperty --forge-overlay-width - The `width` of the overlay. Defaults to `min-content`.
 * 
 * @slot - The content to render inside the overlay.
 * 
 * @csspart root - The component's root element.
 */
@CustomElement({
  name: OVERLAY_CONSTANTS.elementName
})
export class OverlayComponent extends BaseOverlay<OverlayFoundation> implements IOverlayComponent {
  public static get observedAttributes(): string[] {
    return [
      ...Object.values(OVERLAY_CONSTANTS.observedAttributes)
    ];
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new OverlayFoundation(new OverlayAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  @FoundationProperty()
  public arrowElement: HTMLElement;

  @FoundationProperty()
  public arrowElementOffset: number;
}
