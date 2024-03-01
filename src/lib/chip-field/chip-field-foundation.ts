import { getActiveElement } from '@tylertech/forge-core';
import { IChipFieldAdapter } from './chip-field-adapter';
import { CHIP_FIELD_CONSTANTS } from './chip-field-constants';
import { IFieldFoundation, FieldFoundation } from '../field/field-foundation';

export interface IChipFieldFoundation extends IFieldFoundation {
  addOnBlur: boolean;
}

export class ChipFieldFoundation extends FieldFoundation implements IChipFieldFoundation {
  private _addOnBlur = false;
  private _memberSlotListener: () => void;
  private _inputContainerMouseDownListener: (evt: MouseEvent) => void;
  private _handleRootKeyDown: (event: KeyboardEvent) => void;
  private _handleKeyDown: (event: KeyboardEvent) => void;

  constructor(protected _adapter: IChipFieldAdapter) {
    super(_adapter);
    this._memberSlotListener = () => this._onMemberSlotChanged();
    this._inputContainerMouseDownListener = evt => this._onInputContainerMouseDown(evt);
    this._handleRootKeyDown = evt => this._onRootKeyDown(evt);
    this._handleKeyDown = evt => this._onKeyDown(evt);
  }

  public initialize(): void {
    super.initialize();
    this._adapter.addMemberSlotListener(this._memberSlotListener);
    this._adapter.addInputContainerListener('mousedown', this._inputContainerMouseDownListener);
    this._adapter.addRootListener('keydown', this._handleRootKeyDown);
    this._adapter.addInputListener('keydown', this._handleKeyDown);
  }

  public disconnect(): void {
    super.disconnect();
    this._adapter.removeMemberSlotListener(this._memberSlotListener);
    this._adapter.removeInputContainerListener('mousedown', this._inputContainerMouseDownListener);
    this._adapter.removeRootListener('keydown', this._handleRootKeyDown);
    this._adapter.removeInputListener('keydown', this._handleKeyDown);
  }

  /** Controls adding a member of entered text on blur. */
  public get addOnBlur(): boolean {
    return this._addOnBlur;
  }
  public set addOnBlur(value: boolean) {
    value = Boolean(value);
    if (this._addOnBlur !== value) {
      this._addOnBlur = value;
      this._adapter.toggleHostAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_ON_BLUR, this._addOnBlur);
    }
  }

  private _onInputContainerMouseDown(evt: MouseEvent): void {
    evt.preventDefault();
    this._adapter.focusInput();
    this._adapter.tryPropagateClick(evt.target);
  }

  protected _onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;

    if (this._addOnBlur) {
      this._addMember(input);
    }

    input.value = '';
    super._onBlur(event);
  }

  private _onRootKeyDown(event: KeyboardEvent): void {
    if (this._adapter.inputHasValue()) {
      return;
    }

    switch (event.key) {
      case 'Right':
      case 'ArrowRight':
        this._focusNextMember();
        break;
      case 'Left':
      case 'ArrowLeft':
        this._focusPreviousMember();
        break;
      case 'Backspace':
      case 'Delete':
      case 'Del':
        this._removeMember();
        break;
      default:
        break;
    }
  }

  private _onKeyDown(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    switch (event.key) {
      case 'Enter':
        this._addMember(input);
        break;
      case 'Esc':
      case 'Escape':
        input.value = '';
        break;
      case 'Tab':
        if (!this._addOnBlur) {
          input.value = '';
        }
        break;
      default:
        break;
    }
  }

  private _focusNextMember(): void {
    const members = this._adapter.getSlottedMemberElements();
    if (members.length < 1 || this._adapter.inputHasFocus()) {
      return;
    }

    for (let i = 0; i < members.length; i++) {
      const member = members.item(i);
      const nextMember = members.item(i + 1);

      if (this._memberIsActive(member)) {
        if (nextMember) {
          nextMember.focus();
          break;
        } else {
          this._adapter.focusInput();
        }
      }
    }
  }

  private _focusPreviousMember(): void {
    const members = this._adapter.getSlottedMemberElements();
    if (members.length < 1) {
      return;
    }

    if (this._adapter.inputHasFocus()) {
      members[members.length - 1].focus();
      return;
    }

    for (let i = 0; i < members.length; i++) {
      const previousMember = members.item(i - 1);
      const member = members.item(i);

      if (this._memberIsActive(member) && previousMember) {
        previousMember.focus();
        break;
      }
    }
  }

  private _memberIsActive(ele: HTMLElement): boolean {
    return ele.matches(':focus-within') || getActiveElement(ele.ownerDocument) === ele || ele.hasAttribute('focused');
  }

  private _getActiveMember(): HTMLElement | null {
    const members = this._adapter.getSlottedMemberElements();

    for (let i = 0; i < members.length; i++) {
      const member = members.item(i);
      if (this._memberIsActive(member)) {
        return member;
      }
    }

    return null;
  }

  private _addMember(input: HTMLInputElement): void {
    const cleanInputValue = input.value.trim();
    if (cleanInputValue && cleanInputValue.length > 0) {
      this._adapter.emitHostEvent(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, cleanInputValue);
    }
    input.value = '';
  }

  private _removeMember(): void {
    let memberToRemove = this._getActiveMember();
    if (!memberToRemove) {
      const members = this._adapter.getSlottedMemberElements();
      memberToRemove = members.item(members.length - 1);
    }

    if (!memberToRemove) {
      return;
    }

    this._focusNextMember();
    this._adapter.emitHostEvent(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, memberToRemove);
  }

  private _onMemberSlotChanged(): void {
    this.floatLabel(this._adapter.fieldHasValue() || this._adapter.inputHasFocus());
    this._adapter.getSlottedMemberElements().forEach(x => x.tabIndex = -1);
  }
}
