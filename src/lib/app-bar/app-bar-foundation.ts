import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IAppBarAdapter } from './app-bar-adapter';
import { APP_BAR_CONSTANTS } from './app-bar-constants';

export interface IAppBarFoundation extends ICustomElementFoundation {
  titleText: string;
  fixed: boolean;
  raised: boolean;
}

/**
 * Provides facilities and helper methods for creating an app-bar component.
 */
export class AppBarFoundation implements IAppBarFoundation {
  private _titleText: string;
  private _fixed = false;
  private _raised = true;
  private _bottomSlotListener: (evt: Event) => void;
  private _centerSlotListener: (evt: Event) => void;

  constructor(private _adapter: IAppBarAdapter) {
    this._bottomSlotListener = evt => this._onBottomSlotChanged(evt);
    this._centerSlotListener = evt => this._onCenterSlotChanged(evt);
  }

  public initialize(): void {
    this._adapter.setTitleText(this._titleText);
    this._adapter.addBottomSlotListener(this._bottomSlotListener);
    this._adapter.addCenterSlotListener(this._centerSlotListener);
    this._adapter.setCenterSlotVisibility();
    this._adapter.setRaised(this._raised);
    this._adapter.setFixed(this._fixed);
  }

  private _onBottomSlotChanged(evt: Event): void {
    const slotElement = evt.target as HTMLSlotElement;
    if (slotElement.assignedNodes().length) {
      this._adapter.addBottomClass(APP_BAR_CONSTANTS.classes.ROW);
    } else {
      this._adapter.removeBottomClass(APP_BAR_CONSTANTS.classes.ROW);
    }
  }

  private _onCenterSlotChanged(evt: Event): void {
    this._adapter.setCenterSlotVisibility();
  }

  /** Gets/sets the title text. */
  public get titleText(): string {
    return this._titleText;
  }
  public set titleText(value: string) {
    if (this._titleText !== value) {
      this._titleText = value;
      this._adapter.setTitleText(this._titleText);
      this._adapter.setHostAttribute(APP_BAR_CONSTANTS.attributes.TITLE_TEXT, value);
    }
  }
  
  /** Gets/sets the fixed state. */
  public get fixed(): boolean {
    return this._fixed;
  }
  public set fixed(value: boolean) {
    if (this._fixed !== value) {
      this._fixed = value;
      this._adapter.setFixed(this._fixed);
      this._adapter.setHostAttribute(APP_BAR_CONSTANTS.attributes.FIXED, this._fixed.toString());
    }
  }

  public get raised(): boolean {
    return this._raised;
  }
  public set raised(value: boolean) {
    if (this._raised !== value) {
      this._raised = value;
      this._adapter.setRaised(value);
      this._adapter.setHostAttribute(APP_BAR_CONSTANTS.attributes.RAISED, this._raised.toString());
    }
  }
}
