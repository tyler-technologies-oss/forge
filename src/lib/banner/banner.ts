import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconCancel } from '@tylertech/tyler-icons/standard';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { TooltipComponent } from '../tooltip';
import { BannerAdapter } from './banner-adapter';
import { BANNER_CONSTANTS } from './banner-constants';
import { BannerFoundation } from './banner-foundation';

import template from './banner.html';
import styles from './banner.scss';

export interface IBannerComponent extends IBaseComponent {
  dismissed: boolean;
  canDismiss: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-banner': IBannerComponent;
  }

  interface HTMLElementEventMap {
    'forge-banner-dismissed': CustomEvent<void>;
    'forge-banner-undismissed': CustomEvent<void>;
  }
}

/**
 * The custom element class behind the `<forge-banner>` element.
 */
@CustomElement({
  name: BANNER_CONSTANTS.elementName,
  dependencies: [
    IconButtonComponent,
    IconComponent,
    TooltipComponent
  ]
})
export class BannerComponent extends BaseComponent implements IBannerComponent {
  public static get observedAttributes(): string[] {
    return [
      BANNER_CONSTANTS.attributes.DISMISSED,
      BANNER_CONSTANTS.attributes.CAN_DISMISS
    ];
  }

  protected _foundation: BannerFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconCancel);
    attachShadowTemplate(this, template, styles);
    this._foundation = new BannerFoundation(new BannerAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.connect();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BANNER_CONSTANTS.attributes.DISMISSED:
        this.dismissed = coerceBoolean(newValue);
        break;
      case BANNER_CONSTANTS.attributes.CAN_DISMISS:
        this.canDismiss = coerceBoolean(newValue);
        break;
    }
  }

  /** Controls whether the component is dismissed (hidden) or not.  */
  @FoundationProperty()
  public dismissed: boolean;

  /** Controls the visibility of the dismiss button. */
  @FoundationProperty()
  public canDismiss: boolean;
}
