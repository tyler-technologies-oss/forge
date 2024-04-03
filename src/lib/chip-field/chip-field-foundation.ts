import { IChipFieldAdapter } from './chip-field-adapter';
import { ChipFieldInputAttributeObserver, ChipFieldValueChangeListener, CHIP_FIELD_CONSTANTS } from './chip-field-constants';
import { BaseFieldFoundation, IBaseFieldFoundation } from '../field-next/base/base-field-foundation';

export interface IChipFieldFoundation extends IBaseFieldFoundation {
  addOnBlur: boolean;
  readonly popoverTargetElement: HTMLElement;
}

export class ChipFieldFoundation extends BaseFieldFoundation<IChipFieldAdapter> implements IChipFieldFoundation {
  private _addOnBlur = false;

  private _mouseDownListener: EventListener = this._onMouseDown.bind(this);
  private _clickListener: EventListener = this._onClick.bind(this);
  private _rootKeyDownListener: EventListener = this._onRootKeyDown.bind(this);
  private _inputKeyDownListener: EventListener = this._onKeyDown.bind(this);
  private _slotChangeListener: EventListener = this._onSlotChange.bind(this);
  private _inputAttributeListener: ChipFieldInputAttributeObserver = this._onInputAttributeChange.bind(this);
  private _valueChangeListener: ChipFieldValueChangeListener = this._onValueChange.bind(this);
  private _inputListener: EventListener = this._onValueChange.bind(this);
  private _blurListener: EventListener = this._onBlur.bind(this);

  constructor(adapter: IChipFieldAdapter) {
    super(adapter);
  }

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.addRootListener('mousedown', this._mouseDownListener, { capture: true });
    this._adapter.addRootListener('click', this._clickListener);
    this._adapter.addRootListener('keydown', this._rootKeyDownListener);
    this._adapter.addInputListener('keydown', this._inputKeyDownListener);
    this._adapter.addRootListener('slotchange', this._slotChangeListener);
    this._adapter.addRootListener('input', this._inputListener);
    this._adapter.tryAddValueChangeListener(this, this._valueChangeListener);

    if (this._addOnBlur) {
      this._adapter.addInputListener('blur', this._blurListener);
    }
  }

  public destroy(): void {
    this._adapter.removeRootListener('mousedown', this._mouseDownListener, { capture: true });
    this._adapter.removeRootListener('click', this._clickListener);
    this._adapter.removeRootListener('keydown', this._rootKeyDownListener);
    this._adapter.removeInputListener('keydown', this._inputKeyDownListener);
    this._adapter.removeRootListener('slotchange', this._slotChangeListener);
    this._adapter.removeRootListener('input', this._inputListener);
    this._adapter.removeInputListener('blur', this._blurListener);
    this._adapter.removeValueChangeListener();
  }

  protected _onBlur(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;

    if (this._addOnBlur) {
      this._addMember(input);
    }

    input.value = '';
  }

  private _onMouseDown(evt: MouseEvent): void {
    if (this._disabled || this._adapter.inputHasFocus) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }
  }

  private _onClick(_evt: MouseEvent): void {
    if (this._disabled) {
      return;
    }
    this._adapter.focusInput();
    this._adapter.clickInput();
  }

  private _onValueChange(): void {
    this._tryFloatLabel();
  }

  private _onSlotChange(evt: Event): void {
    const target = evt.target as HTMLSlotElement;
    switch (target.name) {
      case 'label':
        this._adapter.tryConnectSlottedLabel(target);
        break;
      case 'member':
        this._adapter.toggleContainerClass(CHIP_FIELD_CONSTANTS.classes.HAS_MEMBERS, target.assignedElements().length > 0);
        this._adapter.tryFloatLabel();
        this._adapter.getSlottedMemberElements().forEach(x => x.tabIndex = -1);
        break;
      case '':
        this._adapter.handleDefaultSlotChange(target, this._inputAttributeListener);
        this._adapter.tryAddValueChangeListener(this, this._valueChangeListener);
        this._tryFloatLabel();
        break;
    }
  }

  private _onInputAttributeChange(name: keyof typeof CHIP_FIELD_CONSTANTS.observedInputAttributes, value: string | null): void {
    switch (name) {
      case 'disabled':
        this.disabled = value !== null;
        break;
      case 'placeholder':
        this._tryFloatLabel();
        break;
    }
  }

  private _onRootKeyDown({ key }: KeyboardEvent): void {
    if (this._adapter.hasInputValue) {
      return;
    }

    switch (key) {
      case 'ArrowRight':
        this._focusNextMember();
        break;
      case 'ArrowLeft':
        this._focusPreviousMember();
        break;
      case 'Backspace':
      case 'Delete':
        this._removeMember();
        break;
    }
  }

  private _onKeyDown({ target, key }: KeyboardEvent): void {
    const input = target as HTMLInputElement;
    switch (key) {
      case 'Enter':
        this._addMember(input);
        break;
      case 'Escape':
        input.value = '';
        break;
      case 'Tab':
        if (!this._addOnBlur) {
          input.value = '';
        }
        break;
    }
  }

  private _focusNextMember(): void {
    const members = this._adapter.getSlottedMemberElements();
    if (!members.length || this._adapter.inputHasFocus) {
      return;
    }

    for (let i = 0; i < members.length; i++) {
      const member = members.at(i);
      const nextMember = members.at(i + 1);

      if (member && this._isMemberActive(member)) {
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
    if (!members.length) {
      return;
    }

    if (this._adapter.inputHasFocus) {
      members[members.length - 1].focus();
      return;
    }

    for (let i = 0; i < members.length; i++) {
      const previousMember = members.at(i - 1);
      const member = members.at(i);

      if (member && this._isMemberActive(member) && previousMember) {
        previousMember.focus();
        break;
      }
    }
  }

  private _isMemberActive(el: HTMLElement): boolean {
    return el.matches(':focus-within');
  }

  private _getActiveMember(): HTMLElement | null {
    const members = this._adapter.getSlottedMemberElements();
    return members.find(x => this._isMemberActive(x)) ?? null;
  }

  private _addMember(input: HTMLInputElement): void {
    const cleanInputValue = input.value.trim();
    if (cleanInputValue.length > 0) {
      this._adapter.emitHostEvent(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, cleanInputValue);
    }
    input.value = '';
  }

  private _removeMember(): void {
    let memberToRemove: HTMLElement | null | undefined = this._getActiveMember();
    if (!memberToRemove) {
      const members = this._adapter.getSlottedMemberElements();
      memberToRemove = members.at(-1);
    }

    if (!memberToRemove) {
      return;
    }

    this._focusNextMember();
    this._adapter.emitHostEvent(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, memberToRemove);
  }

  public get addOnBlur(): boolean {
    return this._addOnBlur;
  }
  public set addOnBlur(value: boolean) {
    value = Boolean(value);
    if (this._addOnBlur !== value) {
      this._addOnBlur = value;

      if (this._adapter.isConnected) {
        if (this._addOnBlur) {
          this._adapter.addInputListener('blur', this._blurListener);
        } else {
          this._adapter.removeInputListener('blur', this._blurListener);
        }
      }

      this._adapter.toggleHostAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_ON_BLUR, this._addOnBlur);
    }
  }

  public get popoverTargetElement(): HTMLElement {
    return this._adapter.popoverTargetElement;
  }

  public override get disabled(): boolean {
    return super.disabled;
  }
  public override set disabled(value: boolean) {
    if (this.disabled === value) {
      return;
    }
    super.disabled = value;
    this._adapter.setDisabled(value);
  }
}
