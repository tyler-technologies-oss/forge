import { ICustomElementFoundation } from '@tylertech/forge-core';

import { ITabAdapter } from './tab-adapter';
import { TAB_CONSTANTS, ITabDimensions } from './tab-constants';

export interface ITabFoundation extends ICustomElementFoundation {
  disabled: boolean;
  active: boolean;
  stretch: boolean;
  activate(previousIndicatorClientRect?: DOMRect): void;
  deactivate(): void;
  computeIndicatorBounds(): DOMRect | undefined;
  computeDimensions(): ITabDimensions;
  focus(): void;
  setTabIndex(value: number): void;
}

export class TabFoundation implements ITabFoundation {
  private _disabled = false;
  private _active = false;
  private _stretch = false;
  private _clickListener: (evt: MouseEvent) => void;

  constructor(private _adapter: ITabAdapter) {
    this._clickListener = (evt: MouseEvent) => this._onClick(evt);
  }

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.initializeRipple();
    this._adapter.initializeIndicator();
    this._adapter.setDisabled(this._disabled);
    this._setActive(this._active);
    this._adapter.addButtonListener('click', this._clickListener);
  }
  
  public disconnect(): void {
    this._adapter.destroyRipple();
    this._adapter.destroyIndicator();
    this._adapter.removeButtonListener('click', this._clickListener);
  }

  private _onClick(evt: MouseEvent): void {
    if (!this._active) {
      this._adapter.emitHostEvent(TAB_CONSTANTS.events.INTERACTED, undefined, true);
    }
  }

  private _setActive(isActive: boolean, previousIndicatorClientRect?: DOMRect): void {
    this._active = isActive;
    this._adapter.setActive(this._active);
    if (this._active) {
      this._adapter.activateIndicator(previousIndicatorClientRect);
    } else {
      this._adapter.deactivateIndicator();
    }
  }

  public activate(previousIndicatorClientRect?: DOMRect): void {
    this._setActive(true, previousIndicatorClientRect);
  }

  public deactivate(): void {
    this._setActive(false);
  }

  public computeIndicatorBounds(): DOMRect | undefined {
    return this._adapter.computeIndicatorBounds();
  }

  public computeDimensions(): ITabDimensions {
    const rootWidth = this._adapter.getOffsetWidth();
    const rootLeft = this._adapter.getOffsetLeft();
    const contentWidth = this._adapter.getContentOffsetWidth();
    const contentLeft = this._adapter.getContentOffsetLeft();
    return {
      contentLeft: rootLeft + contentLeft,
      contentRight: rootLeft + contentLeft + contentWidth,
      rootLeft,
      rootRight: rootLeft + rootWidth
    };
  }
  
  public focus(): void {
    this._adapter.focus();
  }

  public setTabIndex(value: number): void {
    this._adapter.setTabIndex(value);
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    if (this._active !== value) {
      this._setActive(value);
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.ACTIVE, this._active);
    }
  }

  public get stretch(): boolean {
    return this._stretch;
  }
  public set stretch(value: boolean) {
    if (this._stretch !== value) {
      this._stretch = value;
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.STRETCH, this._stretch);
    }
  }
}
