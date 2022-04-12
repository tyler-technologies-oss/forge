import { IChipFieldComponent } from './chip-field';
import { getShadowElement } from '@tylertech/forge-core';
import { CHIP_FIELD_CONSTANTS } from './chip-field-constants';
import { FieldAdapter, IFieldAdapter } from '../field/field-adapter';

export interface IChipFieldAdapter extends IFieldAdapter {
  // root
  addRootListener(type: string, callback: (event: Event) => void): void;
  removeRootListener(type: string, callback: (event: Event) => void): void;

  // member
  addMemberSlotListener(listener: (evt: Event) => void): void;
  removeMemberSlotListener(listener: (evt: Event) => void): void;

  addInputContainerListener(type: string, callback: (event: Event) => void): void;
  removeInputContainerListener(type: string, callback: (event: Event) => void): void;

  // state selectors
  getSlottedMemberElements(): NodeListOf<HTMLElement>;

  // state actions
  focusInput(): void;
}

export class ChipFieldAdapter extends FieldAdapter implements IChipFieldAdapter {
  protected _memberSlot: HTMLSlotElement;
  protected _inputContainerElement: HTMLElement;

  constructor(component: IChipFieldComponent) {
    super(component);
  }

  public initialize(required: boolean): void {
    super.initialize(required, CHIP_FIELD_CONSTANTS.selectors.ROOT);
    this._memberSlot = getShadowElement(this._component, CHIP_FIELD_CONSTANTS.selectors.MEMBER_SLOT) as HTMLSlotElement;
    this._inputContainerElement = getShadowElement(this._component, CHIP_FIELD_CONSTANTS.selectors.INPUT_CONTAINER) as HTMLElement;
  }

  public addRootListener(type: string, callback: (event: Event) => void): void {
    this._rootElement.addEventListener(type, callback);
  }

  public removeRootListener(type: string, callback: (event: Event) => void): void {
    this._rootElement.removeEventListener(type, callback);
  }

  public addMemberSlotListener(listener: (evt: Event) => void): void {
    this._memberSlot.addEventListener('slotchange', listener);
  }

  public removeMemberSlotListener(listener: (evt: Event) => void): void {
    if (this._memberSlot) {
      this._memberSlot.removeEventListener('slotchange', listener);
    }
  }

  public addInputContainerListener(type: string, callback: (event: Event) => void): void {
    this._inputContainerElement.addEventListener(type, callback);
  }

  public removeInputContainerListener(type: string, callback: (event: Event) => void): void {
    this._inputContainerElement.removeEventListener(type, callback);
  }

  public override fieldHasValue(): boolean {
    const aMemberExists = !!this._component.querySelector(CHIP_FIELD_CONSTANTS.selectors.MEMBER);
    return aMemberExists || super.inputHasValue();
  }

  public focusInput(): void {
    if (!this._inputElement) {
      return;
    }

    this._inputElement.focus();
  }

  public getSlottedMemberElements(): NodeListOf<HTMLElement> {
    return this._component.querySelectorAll<HTMLElement>(CHIP_FIELD_CONSTANTS.selectors.MEMBER);
  }
}
