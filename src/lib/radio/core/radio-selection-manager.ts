import { IRadioComponent, RADIO_CONSTANTS, tryCheck } from '../radio';

export class RadioSelectionManager {
  /**
   * Returns an array of IRadioComponents that belong to the same radio group as the given IRadioComponent.
   * If the given IRadioComponent does not have an associated form element, it searches the root node for all IRadioComponents with the same name.
   * If the given IRadioComponent has an associated form element, it gets all RadioComponents with the same name from the form element.
   * 
   * @param el - The IRadioComponent to get the radio group for.
   * @returns An array of IRadioComponents that belong to the same radio group as the given IRadioComponent.
   */
  public static getRadioGroup(el: IRadioComponent): IRadioComponent[] {
    // If there's no name, it's not part of a radio group
    if (!el.name) {
      return [el];
    }

    // If there's no associated form element search the root node
    if (!el.form) {
      const root = el.getRootNode() as ShadowRoot | Document;
      const namedRadios = root.querySelectorAll<IRadioComponent>(`${RADIO_CONSTANTS.elementName}[name=${el.name}]`);
      return Array.from(namedRadios).filter(radio => !radio.form);
    }

    // When there is a form element, get all RadioComponents with the same name
    const formRadios = el.form.elements.namedItem(el.name);
    if (formRadios && Object.prototype.isPrototypeOf.call(RadioNodeList.prototype, formRadios)) {
      return Array.from(formRadios as RadioNodeList)
        .filter((radio: HTMLElement) => radio.matches(RADIO_CONSTANTS.elementName)) as IRadioComponent[];
    }
    return [el];
  }

  /**
   * Adds or removes each radio in a radio group from the tab order.
   * 
   * @param el - The radio component.
   * @param event - The event type (`'focus'` or `'blur'`).
   */
  public static setUncheckedRadioGroupFocus(el: IRadioComponent, event: 'focus' | 'blur'): void {
    const group = RadioSelectionManager.getRadioGroup(el);
    
    if (event === 'focus') {
      group.forEach(radio => radio.tabIndex = -1);
      el.tabIndex = 0;
      return;
    }

    if (!el.checked || group[0] === el || group[group.length - 1] === el) {
      group.forEach(radio => radio.tabIndex = 0);
    }
  }

  /**
   * Determines if a radio selection is required based on the radio group it belongs to.
   * 
   * @param el - The radio component.
   * @returns True if the radio selection is required, false otherwise.
   */
  public static selectionIsRequired(el: IRadioComponent): boolean {
    const group = RadioSelectionManager.getRadioGroup(el);
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

  /**
   * Sets the selected radio in a radio group.
   * 
   * @param el - The radio component to set as selected.
   */
  public static setSelectedRadioInGroup(el: IRadioComponent): void {
    const group = RadioSelectionManager.getRadioGroup(el);
    group.forEach(radio => radio.checked = radio === el);
  }

  /**
   * Focuses the next radio in the radio group.
   * 
   * @param el - The currently focused radio component.
   */
  public static focusNextRadioInGroup(el: IRadioComponent): void {
    RadioSelectionManager._updateRadioGroupFocus(el, 1);
  }

  /**
   * Focuses the previous radio in the radio group.
   * 
   * @param el - The currently focused radio component.
   */
  public static focusPreviousRadioInGroup(el: IRadioComponent): void {
    RadioSelectionManager._updateRadioGroupFocus(el, -1);
  }

  /**
   * Updates the focus and selection of a radio group based on the currently focused radio and the direction of the focus change.
   * 
   * @param el - The currently focused radio element.
   * @param increment - The direction of the focus change. 1 for forward, -1 for backward.
   */
  private static _updateRadioGroupFocus(el: IRadioComponent, increment: 1 | -1): void {
    const group = RadioSelectionManager.getRadioGroup(el);

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
    nextRadio.tabIndex = 0;
    nextRadio.focus();

    // Remove every other radio from the tab order and deselect it
    group.forEach(radio => {
      if (radio === nextRadio) {
        return;
      }
      radio.tabIndex = -1;
      radio.checked = false;
    });
  }
}
