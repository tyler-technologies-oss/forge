import { addClass, getShadowElement, removeClass, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../core/base';
import { FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../focus-indicator';
import { FieldLabelPosition } from './base/base-field-constants';
import { IFieldComponent } from './field';
import { FIELD_CONSTANTS } from './field-constants';

export interface IFieldAdapter extends IBaseAdapter<IFieldComponent> {
  readonly focusIndicator: IFocusIndicatorComponent;
  addRootListener(name: keyof HTMLElementEventMap, listener: EventListener): void;
  addPopoverIconClickListener(listener: EventListener): void;
  removePopoverIconClickListener(listener: EventListener): void;
  setLabelPosition(value: FieldLabelPosition): void;
  setFloatingLabel(value: boolean, skipAnimation?: boolean): void;
  handleSlotChange(slot: HTMLSlotElement): void;
  initializeSlots(): void;
}

export class FieldAdapter extends BaseAdapter<IFieldComponent> implements IFieldAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _containerElement: HTMLElement;
  private readonly _inputContainerElement: HTMLElement;
  private readonly _labelElement: HTMLElement;
  private readonly _popoverIconElement: HTMLElement;
  private readonly _focusIndicatorElement: IFocusIndicatorComponent;

  public get focusIndicator(): IFocusIndicatorComponent {
    return this._focusIndicatorElement;
  }

  constructor(component: IFieldComponent) {
    super(component);
    this._rootElement = getShadowElement(component, FIELD_CONSTANTS.selectors.ROOT);
    this._containerElement = getShadowElement(component, FIELD_CONSTANTS.selectors.CONTAINER);
    this._inputContainerElement = getShadowElement(component, FIELD_CONSTANTS.selectors.INPUT_CONTAINER);
    this._labelElement = getShadowElement(component, FIELD_CONSTANTS.selectors.LABEL);
    this._popoverIconElement = getShadowElement(component, FIELD_CONSTANTS.selectors.POPOVER_ICON);
    this._focusIndicatorElement = getShadowElement(component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
  }

  public addRootListener(name: keyof HTMLElementEventMap, listener: EventListener): void {
    this._rootElement.addEventListener(name, listener);
  }

  public addPopoverIconClickListener(listener: EventListener): void {
    this._popoverIconElement.addEventListener('click', listener);
  }

  public removePopoverIconClickListener(listener: EventListener): void {
    this._popoverIconElement.removeEventListener('click', listener);
  }

  /**
   * Moves the label into the container element if the position is inset, or out to the root
   * element otherwise.
   */
  public setLabelPosition(value: FieldLabelPosition): void {
    this._labelElement.remove();

    if (value === 'inset') {
      this._containerElement.prepend(this._labelElement);
    } else {
      this._rootElement.prepend(this._labelElement);
    }
  }

  /**
   * Adds or removes animation classes on the root element.
   */
  public setFloatingLabel(value: boolean, skipAnimation = false): void {
    if (skipAnimation || !this._labelElement) {
      return;
    }

    // Temporarily lock the input container element width to its current width before the animation starts
    // to ensure that the element cannot collapse while the animation is executing. The width will be
    // removed after the animation completes.
    const { width: inputContainerWidth } = this._inputContainerElement.getBoundingClientRect();
    if (inputContainerWidth > 0) {
      this._inputContainerElement.style.setProperty('width', `${inputContainerWidth}px`);
    }

    const className = value ? FIELD_CONSTANTS.classes.FLOATING_IN : FIELD_CONSTANTS.classes.FLOATING_OUT;
    const animationName = value ? FIELD_CONSTANTS.animations.FLOAT_IN_LABEL : FIELD_CONSTANTS.animations.FLOAT_OUT_LABEL;
    const animationEndListener: EventListener = (evt: AnimationEvent) => {
      if (evt.animationName === animationName) {
        removeClass(className, this._rootElement);
        this._inputContainerElement.style.removeProperty('width');
        this._rootElement.removeEventListener('animationend', animationEndListener);
      }
    };

    addClass(className, this._rootElement);
    this._rootElement.addEventListener('animationend', animationEndListener);
  }

  /**
   * Adds or removes a class from the root element indicating whether the slot has any assigned
   * nodes.
   */
  public handleSlotChange(slot: HTMLSlotElement): void {
    if (slot.name === '') {
      this._trySlotLabel(slot);
      return;
    }

    // Ensure that the slot belongs to the field
    while (slot.assignedSlot) {
      slot = slot.assignedSlot;
    }

    if (!slot) {
      return;
    }

    const classMap = {
      label: FIELD_CONSTANTS.classes.HAS_LABEL,
      start: FIELD_CONSTANTS.classes.HAS_START,
      end: FIELD_CONSTANTS.classes.HAS_END,
      accessory: FIELD_CONSTANTS.classes.HAS_ACCESSORY,
      'support-text': FIELD_CONSTANTS.classes.HAS_SUPPORT_START,
      'support-text-end': FIELD_CONSTANTS.classes.HAS_SUPPORT_END
    };
    if (slot.name in classMap) {
      toggleClass(this._rootElement, !!slot.assignedNodes({ flatten: true }).length, classMap[slot.name]);
    }
  }

  public initializeSlots(): void {
    const slotElements = this._rootElement.querySelectorAll<HTMLSlotElement>('slot');
    slotElements.forEach(slotElement => this.handleSlotChange(slotElement));
  }

  /**
   * Gets `<label>` and `<forge-label>` elements from the default slot and assigns them to the
   * 'label' slot.
   */
  private _trySlotLabel(slot: HTMLSlotElement): void {
    const elements = slot.assignedElements({ flatten: true });
    const labels = elements.filter(el => el.matches(FIELD_CONSTANTS.selectors.LABEL_ELEMENTS));

    labels.forEach(label => {
      if (label.slot) {
        return;
      }
      label.slot = 'label';
    });
  }
}
