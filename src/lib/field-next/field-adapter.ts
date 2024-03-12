import { addClass, getShadowElement, removeClass, toggleClass } from '@tylertech/forge-core';
import { unwrapElements, wrapElements } from '../core';
import { BaseAdapter, IBaseAdapter } from '../core/base';
import { FOCUS_INDICATOR_CONSTANTS } from '../focus-indicator';
import { FieldLabelPosition } from './base/base-field-constants';
import { IFieldComponent } from './field';
import { FIELD_CONSTANTS } from './field-constants';

export interface IFieldAdapter extends IBaseAdapter {
  addRootListener(name: keyof HTMLElementEventMap, listener: EventListener): void;
  addPopoverIconClickListener(listener: EventListener): void;
  removePopoverIconClickListener(listener: EventListener): void;
  attachResizeContainer(): void;
  removeResizeContainer(): void;
  setLabelPosition(value: FieldLabelPosition): void;
  setFloatingLabel(value: boolean, skipAnimation?: boolean): void;
  handleSlotChange(slot: HTMLSlotElement): void;
}

export class FieldAdapter extends BaseAdapter<IFieldComponent> implements IFieldAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _containerElement: HTMLElement;
  private readonly _labelElement: HTMLElement;
  private readonly _popoverIconElement: HTMLElement;

  private get _resizeContainerElement(): HTMLElement | null {
    return this._containerElement.querySelector(FIELD_CONSTANTS.selectors.RESIZE_CONTAINER) as HTMLElement | null;
  }

  constructor(component: IFieldComponent) {
    super(component);
    this._rootElement = getShadowElement(component, FIELD_CONSTANTS.selectors.ROOT);
    this._containerElement = getShadowElement(component, FIELD_CONSTANTS.selectors.CONTAINER);
    this._labelElement = getShadowElement(component, FIELD_CONSTANTS.selectors.LABEL);
    this._popoverIconElement = getShadowElement(component, FIELD_CONSTANTS.selectors.POPOVER_ICON);
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
   * Adds or removes animation classes on the root element.
   */
  public setFloatingLabel(value: boolean, skipAnimation = false): void {
    if (skipAnimation) {
      return;
    }

    const className = value ? FIELD_CONSTANTS.classes.FLOATING_IN : FIELD_CONSTANTS.classes.FLOATING_OUT;
    const animationName = value ? FIELD_CONSTANTS.animations.FLOAT_IN_LABEL : FIELD_CONSTANTS.animations.FLOAT_OUT_LABEL;
    const animationEndListener: EventListener = (evt: AnimationEvent) => {
      if (evt.animationName === animationName) {
        removeClass(className, this._rootElement);
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
    const slotElement = getShadowElement(this._component, `slot[name=${slot.name}]`) as HTMLSlotElement | undefined;
    if (!slotElement) {
      return;
    }

    const classMap = {
      label: FIELD_CONSTANTS.classes.HAS_LABEL,
      start: FIELD_CONSTANTS.classes.HAS_START,
      end: FIELD_CONSTANTS.classes.HAS_END,
      accessory: FIELD_CONSTANTS.classes.HAS_ACCESSORY,
      'support-text-start': FIELD_CONSTANTS.classes.HAS_SUPPORT_START,
      'support-text-end': FIELD_CONSTANTS.classes.HAS_SUPPORT_END
    };
    if (slot.name in classMap) {
      toggleClass(this._rootElement, !!slotElement.assignedNodes({ flatten: true }).length, classMap[slot.name]);
    }
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
