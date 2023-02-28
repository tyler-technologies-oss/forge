import { ICustomElementFoundation } from '@tylertech/forge-core';
import { INextBaseButtonAdapter } from './base-button-adapter';
import { NextAnchorTarget, NextButtonType, NEXT_BASE_BUTTON_CONSTANTS } from './base-button-constants';

export interface INextBaseButtonFoundation extends ICustomElementFoundation {
  type: NextButtonType;
  disabled: boolean;
  href: string | undefined;
  initialize(): void;
}

export abstract class NextBaseButtonFoundation<T extends INextBaseButtonAdapter> implements INextBaseButtonFoundation {
  /**
   * Component state
   */
  private _disabled = false;
  private _title: string | undefined;
  
  /**
   * State specific to <button>
   */
  private _type: NextButtonType = 'button';
  private _value: unknown;

  /**
   * State specific to <a>
   */
  private _href: string | undefined;
  private _target: NextAnchorTarget;
  private _rel: string | undefined;
  private _download: string | undefined;

  constructor(protected _adapter: T) {}

  public initialize(): void {
    this._adapter.deferRippleInitialization();
  }

  public get type(): NextButtonType {
    return this._type;
  }
  public set type(value: NextButtonType) {
    if (this._type !== value) {
      this._type = value;
      this._adapter.setButtonType(this._type);
      this._adapter.setHostAttribute(NEXT_BASE_BUTTON_CONSTANTS.attributes.TYPE, this._type);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== !!value) {
      this._disabled = !!value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(NEXT_BASE_BUTTON_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get href(): string | undefined {
    return this._href;
  }
  public set href(value: string | undefined) {
    if (this._href !== value) {
      this._href = value;
      this._adapter.setHref(this._href);
      this._syncState();
      this._adapter.setHostAttribute(NEXT_BASE_BUTTON_CONSTANTS.attributes.HREF, this._href);
    }
  }

  protected _syncState(): void {
    this._adapter.setDisabled(this._disabled);
  }
}
