import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IStackAdapter } from './stack-adapter';
import { StackAlignment, STACK_CONSTANTS } from './stack-constants';

export interface IStackFoundation extends ICustomElementFoundation {
  inline: boolean;
  wrap: boolean;
  stretch: boolean;
  gap: string;
  alignment: StackAlignment;
  justify: StackAlignment;
}

export class StackFoundation implements IStackFoundation {
  private _inline = false;
  private _wrap = false;
  private _stretch = false;
  private _gap = STACK_CONSTANTS.strings.DEFAULT_GAP;
  private _alignment: StackAlignment = 'start';
  private _justify: StackAlignment = 'start';

  constructor(private _adapter: IStackAdapter) {}

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
  public get gap(): string {
    return this._gap;
  }
  public set gap(value: string) {
    if (this._gap !== value) {
      this._gap = value;
      this._adapter.setGap(this._gap);
      this._adapter.setHostAttribute(STACK_CONSTANTS.attributes.GAP, this._gap);
    }
  }

  /** Controls the alignment of children */
  public get alignment(): StackAlignment {
    return this._alignment;
  }
  public set alignment(value: StackAlignment) {
    if (this._alignment !== value) {
      this._alignment = value;
      this._adapter.setHostAttribute(STACK_CONSTANTS.attributes.ALIGNMENT, this._alignment);
    }
  }

  /** Controls the justify-content of children */
  public get justify(): StackAlignment {
    return this._justify;
  }
  public set justify(value: StackAlignment) {
    if (this._justify !== value) {
      this._justify = value;
      this._adapter.setHostAttribute(STACK_CONSTANTS.attributes.JUSTIFY, this._justify);
    }
  }
}
