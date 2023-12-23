import { attachShadowTemplate, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { OverlayAdapter } from './overlay-adapter';
import { OverlayLightDismissEventData, overlayStack, OVERLAY_CONSTANTS } from './overlay-constants';
import { OverlayFoundation } from './overlay-foundation';
import { BaseOverlay, IBaseOverlay } from './base/base-overlay';

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
 * @summary Overlays are used to render content in an element that rendered above all content on the page,
 * and positioned around a specified anchor element.
 * 
 * @description
 * An overlay is a low-level building block component that does not provide any visual styles. Its only
 * purpose is to render slotted content above all other content on the page. The element is positioned
 * around an anchor element with various positioning options.
 * 
 * @property {boolean} open - Whether or not the overlay is open.
 * @property {boolean} inline - Whether or not the overlay should be rendered inline (not in the :top-layer).
 * @property {HTMLElement} anchorElement - The element to anchor the overlay to.
 * @property {HTMLElement} anchor - The id of the element to anchor the overlay to.
 * @property {HTMLElement} arrowElement - The element to use as the arrow for the overlay.
 * @property {number} arrowElementOffset - The offset to apply to the arrow element.
 * @property {OverlayPlacement} placement - The placement of the overlay relative to the anchor element.
 * @property {OverlayPositionStrategy} positionStrategy - The positioning strategy to use for the overlay. Valid values are `'fixed'` and `'absolute'`.
 * @property {IOverlayPosition} offset - The offset to apply to the overlay position relative to the anchor element.
 * @property {boolean} shift - Whether or not the anchor element should shift along the side of the overlay when scrolling.
 * @property {OverlayHideState} hide - Whether or not the overlay should hide itself when the anchor element is out of view.
 * @property {boolean} static - Whether or not the overlay handles light dismiss itself or not.
 * @property {OverlayFlipState} flip - Whether or not the overlay should flip to the opposite placement when not enough room.
 * @property {boolean} auto - Whether or not the overlay should automatically attempt to locate the best placement.
 * @property {string} boundary - The id of the element to use as the boundary for the overlay.
 * @property {HTMLElement | null} boundaryElement - The element to use as the boundary for the overlay.
 * @property {OverlayPlacement[]} fallbackPlacements - The fallback placements to use when the overlay cannot be placed in the desired placement.
 * 
 * @attribute {string} open - Whether or not the overlay is open.
 * @attribute {string} inline - Whether or not the overlay should be rendered inline (not in the :top-layer).
 * @attribute {string} placement - The placement of the overlay relative to the anchor element.
 * @attribute {string} position-strategy - The positioning strategy to use for the overlay. Valid values are `'fixed'` and `'absolute'`.
 * @attribute {string} hide - Whether or not the overlay should hide itself when the anchor element is out of view.
 * @attribute {string} static - Whether or not the overlay handles light dismiss itself or not.
 * @attribute {string} shift - Whether or not the anchor element should shift along the side of the overlay when scrolling.
 * @attribute {string} no-flip - Tells the overlay not to flip to the opposite placement when not enough room.
 * @attribute {string} auto - Whether or not the overlay should automatically attempt to locate the best placement.
 * @attribute {string} position-placement - The placement of the overlay around the anchor element **after** dynamic positioning. This is a read-only attribute that is only available when open.
 * @attribute {string} boundary - The id of the element to use as the boundary for the overlay.
 * @attribute {string} fallback-placements - The fallback placements to use when the overlay cannot be placed in the desired placement. Should be a comma separated list of placements.
 * 
 * @event {CustomEvent<OverlayToggleEventData>} forge-overlay-light-dismiss - Dispatches when the overlay is light dismissed via the escape key or clicking outside the overlay.
 * 
 * @cssproperty --forge-overlay-position - The `position` of the overlay.
 * @cssproperty --forge-overlay-z-index - The `z-index` of the overlay. Defaults to the `popup` range.
 * @cssproperty --forge-overlay-height - The `height` of the overlay. Defaults to `min-content`.
 * @cssproperty --forge-overlay-width - The `width` of the overlay. Defaults to `min-content`.
 * 
 * @slot - The content to render inside the positioned overlay container.
 * 
 * @csspart root - The component's root element.
 */
@CustomElement({
  name: OVERLAY_CONSTANTS.elementName
})
export class OverlayComponent extends BaseOverlay<OverlayFoundation> implements IOverlayComponent {
  public static get observedAttributes(): string[] {
    return Object.values(OVERLAY_CONSTANTS.observedAttributes);
  }

  /**
   * Contains all the overlays that are currently open.
   */
  public static readonly [overlayStack]: Set<IOverlayComponent> = new Set();

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new OverlayFoundation(new OverlayAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  @FoundationProperty()
  public arrowElement: HTMLElement;

  @FoundationProperty()
  public arrowElementOffset: number;
}
