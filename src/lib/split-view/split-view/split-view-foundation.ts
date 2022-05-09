import { ICustomElementFoundation } from '@tylertech/forge-core';

import { ISplitViewAdapter } from './split-view-adapter';
import { SplitViewOrientation, SPLIT_VIEW_CONSTANTS } from './split-view-constants';

export interface ISplitViewFoundation extends ICustomElementFoundation {
  orientation: SplitViewOrientation;
  disabled: boolean;
}

export class SplitViewFoundation implements ISplitViewFoundation {
  private _orientation: SplitViewOrientation = 'horizontal';
  private _disabled = false;

  constructor(private _adapter: ISplitViewAdapter) {}

  public initialize(): void {
    this._applyOrientation();
  }

  public get orientation(): SplitViewOrientation {
    return this._orientation;
  }
  public set orientation(value: SplitViewOrientation) {
    if (this._orientation !== value) {
      this._orientation = value;
      this._applyOrientation();
    }
  }

  private _applyOrientation(): void {
    this._adapter.setHostAttribute(SPLIT_VIEW_CONSTANTS.attributes.ORIENTATION, this._orientation);
    this._adapter.setOrientation(this._orientation);
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._applyDisabled();
    }
  }

  private _applyDisabled(): void {
    this._adapter.toggleHostAttribute(SPLIT_VIEW_CONSTANTS.attributes.DISABLED, this._disabled);
    this._adapter.setDisabled(this._disabled);
  }
}
