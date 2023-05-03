import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty, isDefined } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { PopupAdapter } from './popup-adapter';
import { IPopupPosition, IPopupPositionEventData, PopupAnimationType, PopupPlacement, PopupStateCallback, POPUP_CONSTANTS } from './popup-constants';
import { PopupFoundation } from './popup-foundation';


import template from './popup.html';
import styles from './popup.scss';

export interface IPopupComponent extends IBaseComponent {
  targetElement: HTMLElement;
  placement: PopupPlacement;
  fallbackPlacements: PopupPlacement[];
  open: boolean;
  manageFocus: boolean;
  animationType: `${PopupAnimationType}`;
  static: boolean;
  offset: IPopupPosition;
  hideWhenClipped: boolean;
  position(): void;
  openCallback: PopupStateCallback;
  closeCallback: PopupStateCallback;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-popup': IPopupComponent;
  }

  interface HTMLElementEventMap {
    'forge-popup-open': CustomEvent<void>;
    'forge-popup-close': CustomEvent<void>;
    'forge-popup-position': CustomEvent<IPopupPositionEventData>;
    'forge-popup-blur': CustomEvent<void>;
  }
}

/**
 * The web component class behind the `<forge-popup>` custom element.
 * 
 * @tag forge-popup
 */
@CustomElement({
  name: POPUP_CONSTANTS.elementName
})
export class PopupComponent extends BaseComponent implements IPopupComponent {
  private _foundation: PopupFoundation;

  public static get observedAttributes(): string[] {
    return [
      POPUP_CONSTANTS.attributes.OPEN,
      POPUP_CONSTANTS.attributes.PLACEMENT,
      POPUP_CONSTANTS.attributes.MANAGE_FOCUS,
      POPUP_CONSTANTS.attributes.ANIMATION_TYPE,
      POPUP_CONSTANTS.attributes.STATIC,
      POPUP_CONSTANTS.attributes.HIDE_WHEN_CLIPPED
    ];
  }

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new PopupFoundation(new PopupAdapter(this));
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case POPUP_CONSTANTS.attributes.OPEN:
        this.open = isDefined(newValue);
        break;
      case POPUP_CONSTANTS.attributes.PLACEMENT:
        this.placement = newValue as PopupPlacement;
        break;
      case POPUP_CONSTANTS.attributes.MANAGE_FOCUS:
        this.manageFocus = coerceBoolean(newValue);
        break;
      case POPUP_CONSTANTS.attributes.ANIMATION_TYPE:
        this.animationType = newValue as PopupAnimationType;
        break;
      case POPUP_CONSTANTS.attributes.STATIC:
        this.static = coerceBoolean(newValue);
        break;
      case POPUP_CONSTANTS.attributes.HIDE_WHEN_CLIPPED:
        this.hideWhenClipped = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare targetElement: HTMLElement;

  @FoundationProperty()
  public declare placement: `${PopupPlacement}`;

  @FoundationProperty()
  public declare fallbackPlacements: `${PopupPlacement}`[];

  @FoundationProperty()
  public declare open: boolean;

  @FoundationProperty()
  public declare manageFocus: boolean;

  @FoundationProperty()
  public declare animationType: `${PopupAnimationType}`;

  @FoundationProperty()
  public declare static: boolean;

  @FoundationProperty()
  public declare hideWhenClipped: boolean;

  @FoundationProperty()
  public declare openCallback: PopupStateCallback;

  @FoundationProperty()
  public declare closeCallback: PopupStateCallback;

  @FoundationProperty()
  public declare offset: IPopupPosition;

  public position(): void {
    this._foundation.position();
  }
}
