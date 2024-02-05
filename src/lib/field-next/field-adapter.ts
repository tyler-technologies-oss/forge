import { addClass, getShadowElement, removeClass, toggleClass } from '@tylertech/forge-core';
import { unwrapElements, wrapElements } from '../core';
import { BaseAdapter, IBaseAdapter } from '../core/base';
import { FOCUS_INDICATOR_CONSTANTS } from '../focus-indicator';
import { IFieldComponent } from './field';
import { FieldLabelPosition, FieldSlot, FIELD_CONSTANTS } from './field-constants';

export interface IFieldAdapter extends IBaseAdapter {
  addSlotChangeListener(slotName: FieldSlot, listener: () => void): void;
  addPopoverIconClickListener(listener: () => void): void;
  removePopoverIconClickListener(listener: () => void): void;
  attachResizeContainer(): void;
  removeResizeContainer(): void;
  setLabelPosition(value: FieldLabelPosition): void;
  setFloatingLabel(value: boolean): void;
  handleSlotChange(slotName: FieldSlot): void;
}

export class FieldAdapter extends BaseAdapter<IFieldComponent> implements IFieldAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _containerElement: HTMLElement;
  private readonly _labelElement: HTMLElement;
  private readonly _startSlotElement: HTMLSlotElement;
  private readonly _endSlotElement: HTMLSlotElement;
  private readonly _accessorySlotElement: HTMLSlotElement;
  private readonly _supportStartSlotElement: HTMLSlotElement;
  private readonly _supportEndSlotElement: HTMLSlotElement;
  private readonly _popoverIconElement: HTMLElement;

  private get _resizeContainerElement(): HTMLElement | null {
    return this._containerElement.querySelector(FIELD_CONSTANTS.selectors.RESIZE_CONTAINER) as HTMLElement | null;
  }

  constructor(component: IFieldComponent) {
    super(component);

    this._rootElement = getShadowElement(component, FIELD_CONSTANTS.selectors.ROOT);
    this._containerElement = getShadowElement(component, FIELD_CONSTANTS.selectors.CONTAINER);
    this._labelElement = getShadowElement(component, FIELD_CONSTANTS.selectors.LABEL);
    this._startSlotElement = getShadowElement(component, FIELD_CONSTANTS.selectors.START_SLOT) as HTMLSlotElement;
    this._endSlotElement = getShadowElement(component, FIELD_CONSTANTS.selectors.END_SLOT) as HTMLSlotElement;
    this._accessorySlotElement = getShadowElement(component, FIELD_CONSTANTS.selectors.ACCESSORY_SLOT) as HTMLSlotElement;
    this._supportStartSlotElement = getShadowElement(component, FIELD_CONSTANTS.selectors.SUPPORT_START_SLOT) as HTMLSlotElement;
    this._supportEndSlotElement = getShadowElement(component, FIELD_CONSTANTS.selectors.SUPPORT_END_SLOT) as HTMLSlotElement;
    this._popoverIconElement = getShadowElement(component, FIELD_CONSTANTS.selectors.POPOVER_ICON);
  }

  public addSlotChangeListener(slotName: FieldSlot, listener: (evt: Event) => void): void {
    switch (slotName) {
      case 'start':
        this._startSlotElement.addEventListener('slotchange', listener);
        break;
      case 'end':
        this._endSlotElement.addEventListener('slotchange', listener);
        break;
      case 'accessory':
        this._accessorySlotElement.addEventListener('slotchange', listener);
        break;
      case 'support-start':
        this._supportStartSlotElement.addEventListener('slotchange', listener);
        break;
      case 'support-end':
        this._supportEndSlotElement.addEventListener('slotchange', listener);
        break;
    }
  }

  public addPopoverIconClickListener(listener: () => void): void {
    this._popoverIconElement.addEventListener('click', listener);
  }

  public removePopoverIconClickListener(listener: () => void): void {
    this._popoverIconElement.removeEventListener('click', listener);
  }

  /**
   * Wraps the container's children in a resizable div.
   */
  public attachResizeContainer(): void {
    // Return if a resize container is already attached
    if (this._resizeContainerElement) {
      return;
    }

    const resizeContainer = document.createElement('div');
    resizeContainer.classList.add(FIELD_CONSTANTS.classes.RESIZE_CONTAINER);

    const childElements = Array.from(this._containerElement.children) as HTMLElement[];
    wrapElements(childElements, resizeContainer, [FOCUS_INDICATOR_CONSTANTS.elementName]);
  }

  /**
   * Removes the resize container while retaining its children as direct children of the container.
   */
  public removeResizeContainer(): void {
    const resizeContainerElement = this._resizeContainerElement;

    if (resizeContainerElement) {
      unwrapElements(resizeContainerElement);
    }
  }

  /**
   * Moves the label to the start or end of the root element, ensuring that the DOM order matches
   * the visual order.
   */
  public setLabelPosition(value: FieldLabelPosition): void {
    this._labelElement.remove();

    if (value === 'inline-end') {
      this._rootElement.append(this._labelElement);
    } else if (value === 'inset') {
      const resizeContainerElement = this._resizeContainerElement;

      if (resizeContainerElement) {
        resizeContainerElement.prepend(this._labelElement);
        return;
      }
      this._containerElement.prepend(this._labelElement);
    } else {
      this._rootElement.prepend(this._labelElement);
    }
  }

  /**
   * Adds or removes the floating label class from the root element after the animation ends.
   */
  public setFloatingLabel(value: boolean): void {
    if (value) {
      const animationEndListener: EventListener = (evt: AnimationEvent) => {
        if (evt.animationName === FIELD_CONSTANTS.animations.FLOATING_INPUT) {
          addClass(FIELD_CONSTANTS.classes.FLOATING, this._rootElement);
          this._rootElement.removeEventListener('animationend', animationEndListener);
        }
      };

      this._rootElement.addEventListener('animationend', animationEndListener);
      return;
    }

    removeClass(FIELD_CONSTANTS.classes.FLOATING, this._rootElement);
  }

  /**
   * Adds or removes a class from the root element indicating whether the slot has any assigned
   * nodes.
   */
  public handleSlotChange(slotName: FieldSlot): void {
    switch (slotName) {
      case 'start':
        toggleClass(this._rootElement, !!this._startSlotElement.assignedNodes().length, FIELD_CONSTANTS.classes.HAS_START);
        break;
      case 'end':
        toggleClass(this._rootElement, !!this._endSlotElement.assignedNodes().length, FIELD_CONSTANTS.classes.HAS_END);
        break;
      case 'accessory':
        toggleClass(this._rootElement, !!this._accessorySlotElement.assignedNodes().length, FIELD_CONSTANTS.classes.HAS_ACCESSORY);
        break;
      case 'support-start':
        toggleClass(this._rootElement, !!this._supportStartSlotElement.assignedNodes().length, FIELD_CONSTANTS.classes.HAS_SUPPORT_START);
        break;
      case 'support-end':
        toggleClass(this._rootElement, !!this._supportEndSlotElement.assignedNodes().length, FIELD_CONSTANTS.classes.HAS_SUPPORT_END);
        break;
    }
  }
}
