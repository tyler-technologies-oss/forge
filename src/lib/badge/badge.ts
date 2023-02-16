import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { BadgeAdapter } from './badge-adapter';
import { BADGE_CONSTANTS } from './badge-constants';
import { BadgeFoundation } from './badge-foundation';

import template from './badge.html';
import styles from './badge.scss';

export interface IBadgeComponent extends IBaseComponent {
  dot: boolean;
  open: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-badge': IBadgeComponent;
  }
}

/**
 * The web component class behind the `<forge-badge>` custom element.
 * 
 * @tag forge-badge
 */
@CustomElement({
  name: BADGE_CONSTANTS.elementName
})
export class BadgeComponent extends BaseComponent implements IBadgeComponent {
  public static get observedAttributes(): string[] {
    return [
      BADGE_CONSTANTS.attributes.DOT,
      BADGE_CONSTANTS.attributes.OPEN
    ];
  }

  private _foundation: BadgeFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new BadgeFoundation(new BadgeAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BADGE_CONSTANTS.attributes.DOT:
        this.dot = coerceBoolean(newValue);
        break;
      case BADGE_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
    }
  }

  /** Controls whether the component renders a simple dot/circle, or allows for content. */
  @FoundationProperty()
  public declare dot: boolean;

  /** Controls the visibility state. */
  @FoundationProperty()
  public declare open: boolean;
}
