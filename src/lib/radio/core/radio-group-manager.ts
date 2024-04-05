import { getValidationMessage, internals, isFocusable } from '../../constants';
import { task } from '../../core/utils/event-utils';
import { IRadioComponent, RADIO_CONSTANTS, tryCheck } from '../radio';

/**
 * A class for coordinating the states of radio components within a radio group.
 */
export class RadioGroupManager {
  private static _radiosRequestingReset = new WeakSet<IRadioComponent>();

  /**
   * Returns an array of IRadioComponents that belong to the same radio group as the given
   * IRadioComponent.
   * If the given IRadioComponent does not have an associated form element, it searches the root
   * node for all IRadioComponents with the same name.
   * If the given IRadioComponent has an associated form element, it gets all RadioComponents with
   * the same name from the form element.
   * 
   * @param el - The IRadioComponent to get the radio group for.
   * @param rootNode - The node to search for radios.
   * @param form - The form element to get radios from.
   * @returns An array of IRadioComponents that belong to the same radio group as the given
   * IRadioComponent.
   */
  public static getRadioGroup(el: IRadioComponent, {
    rootNode,
    form
  }: {
    rootNode?: ShadowRoot | Document;
    form?: HTMLFormElement;
  } = {}): IRadioComponent[] {
    // If there's no name, it's not part of a radio group
    if (!el.name) {
      return [el];
    }

    // If there's no associated form element search the root node
    if (!el.form && !form) {
      const root = rootNode ?? el.getRootNode() as ShadowRoot | Document;
      const namedRadios = root.querySelectorAll<IRadioComponent>(`${RADIO_CONSTANTS.elementName}[name=${el.name}]`);
      return Array.from(namedRadios).filter(radio => !radio.form);
    }

    // When there is a form element, get all RadioComponents with the same name
    const formRadios = ((el.form ?? form) as HTMLFormElement).elements.namedItem(el.name);
    if (formRadios && Object.prototype.isPrototypeOf.call(RadioNodeList.prototype, formRadios)) {
      return Array.from(formRadios as RadioNodeList)
        .filter((radio: HTMLElement) => radio.matches(RADIO_CONSTANTS.elementName)) as IRadioComponent[];
    }
    return [el];
  }

  /**
   * Sets the validity of a radio group.
   * If no radio is selected in the group and selection is required, it sets the validity to
   * `valueMissing`.
   * 
   * @param el A radio component within the group to set the validity for.
   */
  public static setRadioGroupValidity(el: IRadioComponent): void {
    const group = RadioGroupManager.getRadioGroup(el);
    const invalid = RadioGroupManager._selectionIsRequired(group);
    
    group.forEach(radio => {
      const validationMessage = radio[getValidationMessage]({
        required: invalid,
        checked: radio.checked
      });
      radio[internals].setValidity({ valueMissing: invalid }, validationMessage);
    });
  }

  /**
   * Sets the selected radio in a radio group.
   * 
   * @param el - The radio component to set as selected.
   */
  public static setSelectedRadioInGroup(el: IRadioComponent): void {
    const group = RadioGroupManager.getRadioGroup(el);
    group.forEach(radio => radio.checked = radio === el);
  }

  /**
   * Sets the tabindices of radios in a radio group based on the currently checked radio.
   * @param el - A radio component within the group to update the tab indices for.
   * @param ignoreSelf - Whether to ignore the passed radio component when updating the tab indices.
   * @param rootNode - The node to search for radios.
   * @param form - The form element to get radios from.
   */
  public static syncRadioFocusableState(el: IRadioComponent, {
    ignoreSelf,
    rootNode,
    form
  }: {
    ignoreSelf: boolean;
    rootNode?: ShadowRoot | Document;
    form?: HTMLFormElement;
  } = { ignoreSelf: false }): void {
    let group = RadioGroupManager.getRadioGroup(el, { rootNode, form });
    group = group.filter(radio => (ignoreSelf && radio !== el) || radio.shadowRoot);

    if (!group.some(radio => radio.checked)) {
      group.forEach(radio => radio[isFocusable] = !radio.disabled);
      return;
    }
    group.forEach(radio => radio[isFocusable] = radio.checked && !radio.disabled);
  }

  /**
   * Focuses the next radio in the radio group.
   * 
   * @param el - The currently focused radio component.
   */
  public static focusNextRadioInGroup(el: IRadioComponent): void {
    RadioGroupManager._updateRadioGroupFocus(el, 1);
  }

  /**
   * Focuses the previous radio in the radio group.
   * 
   * @param el - The currently focused radio component.
   */
  public static focusPreviousRadioInGroup(el: IRadioComponent): void {
    RadioGroupManager._updateRadioGroupFocus(el, -1);
  }

  /**
   * Adds or removes each radio in a radio group from the tab order. When no radio is selected and
   * focus is not in the group, all radios are added to the tab order. Otherwise only the selected
   * radio is added to the tab order.
   * 
   * @param el - The focused or blurred radio component.
   * @param event - The event type (`'focus'` or `'blur'`).
   */
  public static setUncheckedRadioGroupFocus(el: IRadioComponent, event: 'focus' | 'blur'): void {
    const group = RadioGroupManager.getRadioGroup(el);
    
    if (event === 'focus') {
      group.forEach(radio => radio[isFocusable] = radio === el);
      return;
    }

    if (!el.checked || group[0] === el || group[group.length - 1] === el) {
      group.forEach(radio => radio[isFocusable] = true);
    }
  }

  /**
   * Resets a radio group to . This will run once each radio has a chance to
   * update.
   * 
   * @param el - The radio component requesting the reset.
   * @returns A promise that resolves when the reset logic is complete.
   */
  public static async requestRadioGroupReset(el: IRadioComponent): Promise<void> {
    this._radiosRequestingReset.add(el);

    // Wait for any other radios in the group to request a reset. The reset logic should only run
    // once per group
    await task();

    // If the radio has been removed from the set, its group has already been reset and we can
    // skip it
    if (!this._radiosRequestingReset.has(el)) {
      return;
    }
    
    const group = RadioGroupManager.getRadioGroup(el);
    let checkedRadio: IRadioComponent | null = null;

    // The first loop removes each radio in the group from the set and stores the radio that should
    // be checked, if any
    group.forEach(radio => {
      this._radiosRequestingReset.delete(radio);
      
      if (radio.defaultChecked) {
        checkedRadio = radio;
      }
    });

    // The second loop sets the checked radio and sets each radio to be focusable if there is a no
    // selection, or only the selected radio if there is
    group.forEach(radio => {
      radio.checked = radio === checkedRadio;
      radio[isFocusable] = !checkedRadio || radio.checked;
    });
  }

  /**
   * Updates the focus and selection of a radio group based on the currently focused radio and the
   * direction of the focus change.
   * 
   * @param el - The currently focused radio element.
   * @param increment - The direction of the focus change. 1 for forward, -1 for backward.
   */
  private static _updateRadioGroupFocus(el: IRadioComponent, increment: 1 | -1): void {
    const group = RadioGroupManager.getRadioGroup(el);

    // Get the next enabled and writable radio in the group
    let index = group.indexOf(el);
    let nextRadio = group[index];
    do {
      index += increment;
      if (index < 0) {
        index = group.length - 1;
      } else if (index >= group.length) {
        index = 0;
      }

      nextRadio = group[index];
      if (nextRadio === el) {
        return;
      }
    } while (nextRadio.disabled || nextRadio.readonly);

    // Attempt to check the next radio, return if the event is cancelled
    if (!nextRadio[tryCheck]()) {
      return;
    }

    // Add the next radio to the tab order, and focus it
    nextRadio[isFocusable] = true;
    nextRadio.focus();

    // Remove every other radio from the tab order and deselect it
    group.forEach(radio => {
      if (radio === nextRadio) {
        return;
      }
      radio[isFocusable] = false;
      radio.checked = false;
    });
  }

  /**
   * Determines if a radio selection is required within a group.
   * 
   * @param group - The radio components within a group.
   * @returns True if the radio selection is required, false otherwise.
   */
  private static _selectionIsRequired(group: IRadioComponent[]): boolean {
    let required = false;
    let selection = false;

    group.forEach(radio => {
      if (radio.required) {
        required = true;
      }
      if (radio.checked) {
        selection = true;
      }
    });

    return required && !selection;
  }
}
