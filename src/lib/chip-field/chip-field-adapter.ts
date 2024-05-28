import { getShadowElement, listenOwnProperty, randomChars, toggleAttribute } from '@tylertech/forge-core';
import { IChipFieldComponent } from './chip-field';
import { ChipFieldInputAttributeObserver, ChipFieldValueChangeListener, CHIP_FIELD_CONSTANTS, ChipFieldObservedInputAttributes } from './chip-field-constants';
import { BaseFieldAdapter, IBaseFieldAdapter } from '../field/base/base-field-adapter';
import { FIELD_CONSTANTS } from '../field/field-constants';
import { IFieldComponent } from '../field';
import { LabelComponent, LABEL_CONSTANTS } from '../label';

export interface IChipFieldAdapter extends IBaseFieldAdapter {
  readonly popoverTargetElement: HTMLElement;
  readonly hasInputValue: boolean;
  readonly inputHasFocus: boolean;
  initialize(): void;
  addRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void;
  removeRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void;
  addInputListener(type: string, listener: EventListener): void;
  removeInputListener(type: string, listener: EventListener): void;
  clickInput(): void;
  tryAddValueChangeListener(context: unknown, listener: ChipFieldValueChangeListener): void;
  removeValueChangeListener(): void;
  getSlottedMemberElements(): HTMLElement[];
  focusInput(): void;
  handleDefaultSlotChange(slot: HTMLSlotElement, listener: ChipFieldInputAttributeObserver): void;
  tryConnectSlottedLabel(slot: HTMLSlotElement): void;
  toggleContainerClass(className: string, force?: boolean): void;
  setDisabled(value: boolean): void;
}

export class ChipFieldAdapter extends BaseFieldAdapter implements IChipFieldAdapter {
  protected readonly _fieldElement: IFieldComponent;
  private _containerElement: HTMLElement;
  private _memberSlot: HTMLSlotElement;
  private _popoverTargetElement: HTMLElement;
  private _inputElement: HTMLInputElement | undefined;
  private _inputMutationObserver?: MutationObserver;
  private _destroyValueChangerListener: (() => void) | undefined;

  public get hasValue(): boolean {
    const hasMembers = !!this._component.querySelector(CHIP_FIELD_CONSTANTS.selectors.MEMBER);
    return hasMembers || this.hasInputValue;
  }

  public get hasPlaceholder(): boolean {
    return !!this._inputElement?.placeholder;
  }

  public get hasInputValue(): boolean {
    return !!this._inputElement?.value;
  }

  public get inputHasFocus(): boolean {
    return !!this._inputElement?.matches(':focus');
  }

  public get popoverTargetElement(): HTMLElement {
    if (!this._popoverTargetElement) {
      this._popoverTargetElement = getShadowElement(this._fieldElement, FIELD_CONSTANTS.selectors.POPOVER_TARGET) as HTMLElement;
    }
    return this._popoverTargetElement;
  }

  constructor(component: IChipFieldComponent) {
    super(component);
    this._fieldElement = getShadowElement(component, FIELD_CONSTANTS.elementName) as IFieldComponent;
    this._containerElement = getShadowElement(component, CHIP_FIELD_CONSTANTS.selectors.CONTAINER) as HTMLElement;
    this._memberSlot = getShadowElement(component, CHIP_FIELD_CONSTANTS.selectors.MEMBER_SLOT) as HTMLSlotElement;

    this._fieldElement.setAttribute('exportparts', Object.values(FIELD_CONSTANTS.parts).join(', '));
  }

  public initialize(): void {
    this._inputElement = this._component.querySelector('input:not([type=checkbox]):not([type=radio])') as HTMLInputElement;
  }
  
  public addRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void {
    this._fieldElement.addEventListener(type, listener, options);
  }

  public removeRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void {
    this._fieldElement.removeEventListener(type, listener, options);
  }

  public addInputListener(type: string, listener: EventListener): void {
    this._inputElement?.addEventListener(type, listener);
  }

  public removeInputListener(type: string, listener: EventListener): void {
    this._inputElement?.removeEventListener(type, listener);
  }
  
  public clickInput(): void {
    this._inputElement?.click();
  }

  public tryAddValueChangeListener(context: unknown, listener: ChipFieldValueChangeListener): void {
    this._destroyValueChangerListener?.();
    if (this._inputElement) {
      this._destroyValueChangerListener = listenOwnProperty(context, this._inputElement, 'value', listener);
    }
  }

  public removeValueChangeListener(): void {
    this._destroyValueChangerListener?.();
  }

  public focusInput(): void {
    this._inputElement?.focus();
  }

  public getSlottedMemberElements(): HTMLElement[] {
    return this._memberSlot.assignedElements() as HTMLElement[];
  }

  public click(): void {
    this.focusInput();
  }

  public applyLabel(value: string | null): void {
    /* c8 ignore next 3 */
    if (!this._inputElement) {
      return;
    }
    toggleAttribute(this._inputElement, !!value, 'aria-label', value ?? '');
  }

  public tryFloatLabel(force?: boolean | undefined): void {
    if (force !== undefined) {
      this._component.floatLabel = force;
      return;
    }
    this._component.floatLabel = this.hasValue || this.hasPlaceholder;
  }

  public handleDefaultSlotChange(slot: HTMLSlotElement, listener: ChipFieldInputAttributeObserver): void {
    this._inputMutationObserver?.disconnect();

    const assignedElements = slot.assignedElements();
    this._inputElement = assignedElements.find(el => el.matches(CHIP_FIELD_CONSTANTS.selectors.INPUT)) as HTMLInputElement;
    
    if (this._inputElement) {
      if (this._component.disabled) {
        this._inputElement.disabled = true;
      }

      this._inputMutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName) {
            const element = mutation.target as HTMLElement;
            const attribute = element.getAttribute(mutation.attributeName);
            const attributeName = mutation.attributeName as ChipFieldObservedInputAttributes;
            listener(attributeName, attribute);
          }
        });
      });
      this._inputMutationObserver?.observe(this._inputElement, { attributes: true, attributeFilter: [...CHIP_FIELD_CONSTANTS.observedInputAttributes] });

      // Call the listener with each observed attribute to capture the initial state
      Object.values(CHIP_FIELD_CONSTANTS.observedInputAttributes).forEach(value => {
        const attributeName = value as ChipFieldObservedInputAttributes;
        if (this._inputElement) {
          listener(attributeName, this._inputElement.getAttribute(attributeName as string));
        }
      });
    }
  }

  public tryConnectSlottedLabel(slot: HTMLSlotElement): void {
    /* c8 ignore next 3 */
    if (!this._inputElement) {
      return;
    }

    const elements = slot.assignedElements({ flatten: true });

    // Attempt to find and connect a `<forge-label>` element
    const forgeLabel = elements.find(el => el.matches(LABEL_CONSTANTS.elementName)) as LabelComponent | undefined;
    if (forgeLabel) {
      forgeLabel.forElement = this._component;
      forgeLabel.clickTarget = this._inputElement;
      return;
    }
    
    // Attempt to find and connect a `<label>` element
    const label = elements.find(el => el.tagName === CHIP_FIELD_CONSTANTS.tagNames.LABEL) as HTMLLabelElement | undefined;
    if (!label || label.control) {
      return;
    }

    const id = this._inputElement.id || `forge-input-${randomChars()}`;
    this._inputElement.id = id;
    label.htmlFor = id;
  }

  public toggleContainerClass(className: string, force?: boolean): void {
    this._containerElement.classList.toggle(className, force);
  }

  public setDisabled(value: boolean): void {
    if (this._inputElement) {
      this._inputElement.disabled = value;
    }
  }
}
