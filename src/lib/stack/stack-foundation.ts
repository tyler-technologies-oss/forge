import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IStackAdapter } from './stack-adapter';
import { STACK_CONSTANTS, StackAlignMode } from './stack-constants';

export interface IStackFoundation extends ICustomElementFoundation {

}

export class StackFoundation implements IStackFoundation {
  private _inline = false;
  private _wrap = false;
  private _stretch = false;
  private _gap = 16;
  private _align = StackAlignMode.Start;
  constructor(private _adapter: IStackAdapter) {}

  public initialize(): void {
  }

  /** Controls the direction of the stack. */
  public get inline(): boolean {
    return this._inline;
  }
  public set inline(value: boolean) {
    value = Boolean(value);
    if (this._inline !== value) {
      this._inline = value;
      this._adapter.toggleHostAttribute(STACK_CONSTANTS.attributes.INLINE, this._inline);
    }
  }

  /** Controls the direction of the stack. */
  public get wrap(): boolean {
    return this._wrap;
  }
  public set wrap(value: boolean) {
    value = Boolean(value);
    if (this._wrap !== value) {
      this._wrap = value;
      this._adapter.toggleHostAttribute(STACK_CONSTANTS.attributes.WRAP, this._wrap);
    }
  }

  /** Controls if the children within the stack should stretch in width */
  public get stretch(): boolean {
    return this._stretch;
  }
  public set stretch(value: boolean) {
    value = Boolean(value);
    if (this._stretch !== value) {
      this._stretch = value;
      this._adapter.toggleHostAttribute(STACK_CONSTANTS.attributes.STRETCH, this._stretch);
    }
  }

  /** Controls the gap amount between the children in pixels */
  public get gap(): number {
    return this._gap;
  }
  public set gap(value: number) {
    if (this._gap !== value) {
      this._gap = value;
      this._adapter.setGap(this._gap);
    }
  }

  /** Controls the alignment of children */
  public get align(): StackAlignMode {
    return this._align;
  }
  public set align(value: StackAlignMode) {
    if (this._align !== value) {
      this._align = value;
      this._adapter.setHostAttribute(STACK_CONSTANTS.attributes.ALIGN, this._align);
    }
  }

  public disconnect(): void {
  }
}
