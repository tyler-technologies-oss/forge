import { CustomElement, attachShadowTemplate, coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { tylIconKeyboardArrowLeft, tylIconKeyboardArrowDown } from '@tylertech/tyler-icons/standard';
import { OpenIconFoundation } from './open-icon-foundation';
import { OpenIconAdapter } from './open-icon-adapter';
import { OPEN_ICON_CONSTANTS } from './open-icon-constants';
import { IconRegistry, IconComponent } from '../icon';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

import template from './open-icon.html';
import styles from './open-icon.scss';

export interface IOpenIconComponent extends IBaseComponent {
  open: boolean;
  orientation: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-open-icon': IOpenIconComponent;
  }
}

/**
 * The web component class behind the `<forge-open-icon>` custom element.
 * 
 * @tag forge-open-icon
 */
@CustomElement({
  name: OPEN_ICON_CONSTANTS.elementName,
  dependencies: [IconComponent]
})
export class OpenIconComponent extends BaseComponent implements IOpenIconComponent {
  public static get observedAttributes(): string[] {
    return [
      OPEN_ICON_CONSTANTS.attributes.OPEN,
      OPEN_ICON_CONSTANTS.attributes.ORIENTATION
    ];
  }

  private _foundation: OpenIconFoundation;

  constructor() {
    super();
    IconRegistry.define([tylIconKeyboardArrowLeft, tylIconKeyboardArrowDown]);
    attachShadowTemplate(this, template, styles);
    this._foundation = new OpenIconFoundation(new OpenIconAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case OPEN_ICON_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case OPEN_ICON_CONSTANTS.attributes.ORIENTATION:
        this.orientation = newValue;
        break;
    }
  }

  /** Controls the open state of the icon. */
  @FoundationProperty()
  public declare open: boolean;

  /**
   * Gets/sets the orientation of the icon.
   * Valid values are 'vertical' (default) or 'horizontal'.
   */
  @FoundationProperty()
  public declare orientation: string;
}
