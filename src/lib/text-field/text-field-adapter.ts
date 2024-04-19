import { getShadowElement, listenOwnProperty, randomChars, toggleAttribute } from '@tylertech/forge-core';
import { BASE_FIELD_CONSTANTS, FIELD_CONSTANTS, IFieldComponent } from '../field';
import { BaseFieldAdapter, IBaseFieldAdapter } from '../field/base/base-field-adapter';
import { LabelComponent } from '../label';
import { ITextFieldComponent } from './text-field';
import { TextFieldInputAttributeObserver, TextFieldValueChangeListener, TEXT_FIELD_CONSTANTS } from './text-field-constants';

export interface ITextFieldAdapter extends IBaseFieldAdapter {
  readonly popoverTargetElement: HTMLElement;
  addRootListener(name: keyof HTMLElementEventMap, listener: EventListener): void;
  removeRootListener(name: keyof HTMLElementEventMap, listener: EventListener): void;
  disableInput(disabled: boolean): void;
  handleDefaultSlotChange(slot: HTMLSlotElement, listener: TextFieldInputAttributeObserver): void;
  tryAddValueChangeListener(context: unknown, listener: TextFieldValueChangeListener): void;
  removeValueChangeListener(): void;
  tryFloatLabel(force?: boolean): void;
  tryConnectSlottedLabel(slot: HTMLSlotElement): void;
  connectClearButton(listener: EventListener): void;
  disconnectClearButton(listener: EventListener): void;
  toggleClearButtonVisibility(visible: boolean): void;
  clearInput(): void;
}

export class TextFieldAdapter extends BaseFieldAdapter implements ITextFieldAdapter {
  protected readonly _fieldElement: IFieldComponent;
  private readonly _clearButtonSlotElement: HTMLSlotElement;
  private _popoverTargetElement: HTMLElement;
  private _inputElements: (HTMLInputElement | HTMLTextAreaElement)[] = [];
  private _inputMutationObserver?: MutationObserver;
  private _destroyValueChangerListeners: (() => void)[] = [];

  public get hasValue(): boolean {
    return this._inputElements.some(el => !!el.value);
  }

  public get hasPlaceholder(): boolean {
    return this._inputElements.some(el => !!el.placeholder);
  }

  public get popoverTargetElement(): HTMLElement {
    if (!this._popoverTargetElement) {
      this._popoverTargetElement = getShadowElement(this._fieldElement, FIELD_CONSTANTS.selectors.POPOVER_TARGET) as HTMLElement;
    }
    return this._popoverTargetElement;
  }

  constructor(component: ITextFieldComponent) {
    super(component);
    this._fieldElement = getShadowElement(component, TEXT_FIELD_CONSTANTS.selectors.FIELD) as IFieldComponent;
    this._clearButtonSlotElement = getShadowElement(component, TEXT_FIELD_CONSTANTS.selectors.CLEAR_BUTTON_SLOT) as HTMLSlotElement;
    this._fieldElement.setAttribute('exportparts', Object.values(FIELD_CONSTANTS.parts).join(', '));
    this._clearButtonSlotElement.remove();
  }

  public addRootListener(name: keyof HTMLElementEventMap, listener: EventListener): void {
    this._fieldElement.addEventListener(name, listener);
  }

  public removeRootListener(name: keyof HTMLElementEventMap, listener: EventListener): void {
    this._fieldElement.removeEventListener(name, listener);
  }

  public disableInput(disabled: boolean): void {
    this._inputElements.forEach(el => el.disabled = disabled);
  }

  public inputIsDisabled(): boolean {
    return this._inputElements.some(el => el.disabled);
  }

  public click(): void {
    this._inputElements[0]?.focus();
  }

  public applyLabel(value: string | null): void {
    this._inputElements.forEach((inputElement) => {
      toggleAttribute(inputElement, !!value, 'aria-label', value ?? '');
    });
  }

  public handleDefaultSlotChange(slot: HTMLSlotElement, listener: TextFieldInputAttributeObserver): void {
    // Destroy the mutation observer if it exists
    this._inputMutationObserver?.disconnect();

    // If there are no assigned elements, return
    const assignedElements = slot.assignedElements();
    if (!assignedElements.length) {
      return;
    }

    // Get all the slotted inputs and textfields, if a textfield is slotted the field is multiline
    this._inputElements = assignedElements.filter(el => el.matches(TEXT_FIELD_CONSTANTS.selectors.INPUT)) as (HTMLInputElement | HTMLTextAreaElement)[];
    this._fieldElement.multiline = this._inputElements.some(el => el.tagName === TEXT_FIELD_CONSTANTS.tagNames.TEXTAREA);

    // Create a new mutation observer and observe each input
    this._inputMutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName) {
          const element = mutation.target as HTMLElement;
          const attribute = element.getAttribute(mutation.attributeName);
          const attributeName = mutation.attributeName as keyof typeof TEXT_FIELD_CONSTANTS.observedInputAttributes;
          listener(attributeName, attribute);
        }
      });
    });
    this._inputElements.forEach(el => {
      this._inputMutationObserver?.observe(el, { attributes: true, attributeFilter: TEXT_FIELD_CONSTANTS.observedInputAttributes });

      if (this._component.disabled) {
        el.disabled = true;
      }

      // Call the listener with each observed attribute to capture the initial state
      Object.values(TEXT_FIELD_CONSTANTS.observedInputAttributes).forEach(value => {
        const attributeName = value as keyof typeof TEXT_FIELD_CONSTANTS.observedInputAttributes;
        listener(attributeName, el.getAttribute(attributeName as string));
      });
    });
  }

  public tryAddValueChangeListener(context: unknown, listener: TextFieldValueChangeListener): void {
    // Destroy the previous value change listeners
    this._destroyValueChangerListeners.forEach(callback => callback());

    // Add a new value change listener to each input
    this._destroyValueChangerListeners = this._inputElements.map(el => {
      return listenOwnProperty(context, el, 'value', listener);
    });
  }

  public removeValueChangeListener(): void {
    this._destroyValueChangerListeners.forEach(callback => callback());
  }

  public tryFloatLabel(force?: boolean): void {
    // Force the label to float if specified
    if (force !== undefined) {
      this._fieldElement.floatLabel = force;
      return;
    }

    // Float the label if no input has a value or a placeholder
    this._fieldElement.floatLabel = this.hasValue || this.hasPlaceholder;
  }

  public tryConnectSlottedLabel(slot: HTMLSlotElement): void {
    // Only one input can be automatically connected to a label, return if there are no or more
    // than one inputs or if the input is already labelled
    if (this._inputElements.length !== 1 || this._inputElements[0].labels?.length) {
      return;
    }

    const inputElement = this._inputElements[0];
    const elements = slot.assignedElements({ flatten: true });

    // Attempt to find and connect a `<forge-label>` element
    const forgeLabel = elements.find(el => el.matches(TEXT_FIELD_CONSTANTS.selectors.FORGE_LABEL)) as LabelComponent | undefined;
    if (forgeLabel) {
      forgeLabel.forElement = this._component;
      forgeLabel.clickTarget = inputElement;
      return;
    }
    
    // Attempt to find and connect a `<label>` element
    const label = elements.find(el => el.tagName === TEXT_FIELD_CONSTANTS.tagNames.LABEL) as HTMLLabelElement | undefined;
    if (!label || label.control) {
      return;
    }

    const id = inputElement.id || `forge-input-${randomChars()}`;
    inputElement.id = id;
    label.htmlFor = id;
  }

  public connectClearButton(listener: EventListener): void {
    this._clearButtonSlotElement.addEventListener('click', listener);
  }

  public disconnectClearButton(listener: EventListener): void {
    this._clearButtonSlotElement.removeEventListener('click', listener);
  }

  public toggleClearButtonVisibility(visible: boolean): void {
    if (visible) {
      this._fieldElement.append(this._clearButtonSlotElement);
    } else {
      this._clearButtonSlotElement.remove();
    }
  }

  public clearInput(): void {
    if (!this._inputElements.length) {
      return;
    }
    this._inputElements.forEach(el => el.value = '');
    this._inputElements[0].focus();
  }
}
