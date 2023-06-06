import { CustomElement, FoundationProperty, attachShadowTemplate, coerceBoolean } from '@tylertech/forge-core';
import { OverlayAdapter } from './overlay-adapter';
import { IOverlayPosition, OVERLAY_CONSTANTS, OverlayPlacement, OverlayPositionStrategy } from './overlay-constants';
import { OverlayFoundation } from './overlay-foundation';

import { BaseComponent, IBaseComponent } from '../core';
import template from './overlay.html';
import styles from './overlay.scss';

export interface IOverlayComponent extends IBaseComponent {
  open: boolean;
  targetElement: HTMLElement;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayPosition;
  hideWhenClipped: boolean;
  static: boolean;
  internals: ElementInternals;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-overlay': IOverlayComponent;
  }
}

/**
 * The custom element class behind the `<forge-overlay>` element.
 * 
 * An overlay is a primitive component that does not provide any visual styles. Its only
 * purpose is to render slotted content in a floating element. The element can be positioned
 * manually, or configured to anchor itself with smart positioning around another element.
 * 
 * @tag forge-overlay
 */
@CustomElement({
  name: OVERLAY_CONSTANTS.elementName
})
export class OverlayComponent extends BaseComponent implements IOverlayComponent {
  public static get observedAttributes(): string[] {
    return [
      OVERLAY_CONSTANTS.attributes.OPEN,
      OVERLAY_CONSTANTS.attributes.PLACEMENT,
      OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY,
      OVERLAY_CONSTANTS.attributes.HIDE_WHEN_CLIPPED,
      OVERLAY_CONSTANTS.attributes.STATIC
    ];
  }

  private _foundation: OverlayFoundation;
  public internals: ElementInternals;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new OverlayFoundation(new OverlayAdapter(this));
    this.internals = this.attachInternals();
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case OVERLAY_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.attributes.PLACEMENT:
        this.placement = newValue as OverlayPlacement;
        break;
      case OVERLAY_CONSTANTS.attributes.POSITION_STRATEGY:
        this.positionStrategy = newValue as OverlayPositionStrategy;
        break;
      case OVERLAY_CONSTANTS.attributes.HIDE_WHEN_CLIPPED:
        this.hideWhenClipped = coerceBoolean(newValue);
        break;
      case OVERLAY_CONSTANTS.attributes.STATIC:
        this.static = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public open: boolean;

  @FoundationProperty()
  public targetElement: HTMLElement;

  @FoundationProperty()
  public placement: OverlayPlacement;

  @FoundationProperty()
  public positionStrategy: OverlayPositionStrategy;

  @FoundationProperty()
  public offset: IOverlayPosition;

  @FoundationProperty()
  public hideWhenClipped: boolean;

  @FoundationProperty()
  public static: boolean;
}
