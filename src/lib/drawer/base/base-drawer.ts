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

export abstract class BaseDrawerComponent<T extends BaseDrawerFoundation> extends BaseComponent implements IBaseDrawerComponent {
  public static get observedAttributes(): string[] {
    return [
      BASE_DRAWER_CONSTANTS.attributes.OPEN,
      BASE_DRAWER_CONSTANTS.attributes.DIRECTION
    ];
  }

  protected abstract _foundation: T;

  constructor() {
    super();
  }

  public connectedCallback(): void {
    this._foundation.connect();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BASE_DRAWER_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case BASE_DRAWER_CONSTANTS.attributes.DIRECTION:
        this.direction = newValue as DrawerDirection;
        break;
    }
  }

  /** Toggles whether a `dismissible` or `modal` drawer is open or not. Has no effect on `permanent` drawers. */
  @FoundationProperty()
  public declare open: boolean;

  /** Controls the laytout direction of the drawer for positioning on the left vs. right side of the screen. */
  @FoundationProperty()
  public declare direction: DrawerDirection;
}
