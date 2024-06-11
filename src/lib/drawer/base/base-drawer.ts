import { coerceBoolean, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { BASE_DRAWER_CONSTANTS, DrawerDirection } from './base-drawer-constants';
import { BaseDrawerCore } from './base-drawer-core';

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
export abstract class BaseDrawerComponent<T extends BaseDrawerCore> extends BaseComponent implements IBaseDrawerComponent {
  public static get observedAttributes(): string[] {
    return Object.values(BASE_DRAWER_CONSTANTS.observedAttributes);
  }

  protected abstract _core: T;

  public connectedCallback(): void {
    this._core.connect();
  }

  public disconnectedCallback(): void {
    this._core.disconnect();
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
  @coreProperty()
  public declare open: boolean;

  /**
   * Controls the layout and animation direction of the drawer for positioning on the left vs. right side of the screen when toggling the `open` attribute.
   * @default "left"
   * @attribute
   */
  @coreProperty()
  public declare direction: DrawerDirection;
}
