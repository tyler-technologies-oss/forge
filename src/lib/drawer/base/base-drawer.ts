import { coerceBoolean, FoundationProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { BASE_DRAWER_CONSTANTS, DrawerDirection } from './base-drawer-constants';
import { BaseDrawerFoundation } from './base-drawer-foundation';

export interface IBaseDrawerComponent extends IBaseComponent {
  open: boolean;
  direction: DrawerDirection;
}

declare global {
  interface HTMLElementEventMap {
    'forge-drawer-after-open': CustomEvent<void>;
    'forge-drawer-after-close': CustomEvent<void>;
  }
}

/**
 * @event {CustomEvent<void>} forge-drawer-after-open - Dispatched after the drawer has opened.
 * @event {CustomEvent<void>} forge-drawer-after-close - Dispatched after the drawer has closed.
 */
export abstract class BaseDrawerComponent<T extends BaseDrawerFoundation> extends BaseComponent implements IBaseDrawerComponent {
  public static get observedAttributes(): string[] {
    return Object.values(BASE_DRAWER_CONSTANTS.observedAttributes);
  }

  protected abstract _foundation: T;

  public connectedCallback(): void {
    this._foundation.connect();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BASE_DRAWER_CONSTANTS.observedAttributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case BASE_DRAWER_CONSTANTS.observedAttributes.DIRECTION:
        this.direction = newValue as DrawerDirection;
        break;
    }
  }

  /**
   * Toggles whether the drawer is visible or not.
   * @default false
   * @attribute
   */
  @FoundationProperty()
  public declare open: boolean;

  /**
   * Controls the layout and animation direction of the drawer for positioning on the left vs. right side of the screen when toggling the `open` attribute.
   * @default "left"
   * @attribute
   */
  @FoundationProperty()
  public declare direction: DrawerDirection;
}
