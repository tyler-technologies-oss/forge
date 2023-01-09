import { CustomElement, attachShadowTemplate, ICustomElement, FoundationProperty, coerceBoolean } from '@tylertech/forge-core';
import { OverlayAdapter } from './overlay-adapter';
import { OverlayFoundation } from './overlay-foundation';
import { IOverlayPosition, OverlayPlacement, OverlayPositionStrategy, OVERLAY_CONSTANTS } from './overlay-constants';

import template from './overlay.html';
import styles from './overlay.scss';
import { BaseComponent, IBaseComponent } from '../core';

export interface IOverlayComponent extends IBaseComponent {
  open: boolean;
  targetElement: HTMLElement;
  placement: OverlayPlacement;
  positionStrategy: OverlayPositionStrategy;
  offset: IOverlayPosition;
  hideWhenClipped: boolean;
  position(): void;
  show(): Promise<void>;
  hide(): Promise<void>;
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
      OVERLAY_CONSTANTS.attributes.HIDE_WHEN_CLIPPED
    ];
  }

  private _foundation: OverlayFoundation;

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

  public position(): void {
    this._foundation.position();
  }

  public show(): Promise<void> {
    return this._foundation.show();
  }

  public hide(): Promise<void> {
    return this._foundation.hide();
  }
}
