import { addClass, getEventPath, isDefined, isObject, isDeepEqual } from '@tylertech/forge-core';
import { tylIconCheckBox, tylIconCheckBoxOutlineBlank } from '@tylertech/tyler-icons/standard';
import { ICON_CLASS_NAME } from '../constants';
import { ILinearProgressComponent, LINEAR_PROGRESS_CONSTANTS } from '../linear-progress';
import { IListComponent, LIST_CONSTANTS } from '../list/list';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '../list/list-item';
import { IPopupComponent, PopupAnimationType, POPUP_CONSTANTS } from '../popup';
import { ISkeletonComponent, SKELETON_CONSTANTS } from '../skeleton';
import { IListDropdownCascadingElementFactoryConfig, IListDropdownOpenConfig, IListDropdownOption, IListDropdownOptionGroup, ListDropdownAsyncStyle, ListDropdownIconType, ListDropdownType, LIST_DROPDOWN_CONSTANTS } from './list-dropdown-constants';

export enum ListDropdownOptionType { Option, Group }

/**
 * Creates the floating dropdown element container.
 * @param config 
 * @param targetElement 
 */
export function createDropdown(config: IListDropdownOpenConfig, targetElement: HTMLElement): IPopupComponent {
  const dropdownElement = createPopupDropdown(config, targetElement);
  const dropdownId =  `list-dropdown-popup-${config.id}`;

  // Prevent mousedown events from changing focus. We keep focus in the target element at all times while open.
  dropdownElement.addEventListener('mousedown', evt => {
    const composedPath = getEventPath(evt);

    // We allow for custom header and footer templates and these elements could be focusable so we need to allow access into them
    const isFromCustomTemplate = composedPath.find(el => el.nodeType === 1 && el.hasAttribute(LIST_DROPDOWN_CONSTANTS.attributes.DATA_ALLOW_FOCUS));
    if (isFromCustomTemplate) {
      return;
    }

    const isWithinDropdownElement = composedPath.find(el => el.id === dropdownId || el.id === config.id);
    if (isWithinDropdownElement) {
      evt.preventDefault();
    }
  });

  // Set roles and other attributes based on our type
  switch (config.type) {
    case ListDropdownType.Menu:
      dropdownElement.setAttribute('role', 'menu');
      dropdownElement.setAttribute('aria-orientation', 'vertical');
      break;
    default:
      dropdownElement.setAttribute('role', 'listbox');
  }

  if (config.id) {
    dropdownElement.id = dropdownId;
  }
  if (config.popupClasses) {
    addClass(config.popupClasses, dropdownElement);
  }

  return dropdownElement;
}

export function createPopupDropdown(config: IListDropdownOpenConfig, targetElement: HTMLElement): IPopupComponent {
  const popupElement = document.createElement('forge-popup');
  popupElement.targetElement = targetElement;
  popupElement.placement = config.popupPlacement || 'bottom-start';
  popupElement.manageFocus = false;
  popupElement.static = !!config.popupStatic;

  if (config.constrainViewportWidth) {
    popupElement.setAttribute(POPUP_CONSTANTS.attributes.CONSTRAIN_VIEWPORT_WIDTH, '');
  }

  if (config.popupOffset) {
    popupElement.offset = config.popupOffset;
  }

  // Set the animations based on our type
  switch (config.type) {
    case ListDropdownType.Menu:
      popupElement.animationType = PopupAnimationType.Menu;
      break;
    case ListDropdownType.None:
      popupElement.animationType = PopupAnimationType.None;
      break;
    default:
      popupElement.animationType = PopupAnimationType.Dropdown;
  }
  return popupElement;
}

export function createList(config: IListDropdownOpenConfig): IListComponent {
  const listElement = document.createElement(LIST_CONSTANTS.elementName) as IListComponent;
  listElement.id = `list-dropdown-list-${config.id}`;
  listElement.propagateClick = false;
  return listElement;
}

/**
 * Creates the list to place inside of the dropdown.
 * @param config 
 */
export function createListItems(config: IListDropdownOpenConfig, listElement: IListComponent, options?: Array<IListDropdownOption | IListDropdownOptionGroup>): void {
  // Ensure the options are provided in the form a group (if no groups provided, then we have one anonymous group of options)
  const groups = getOptionsByGroup(options || config.options);

  const limitOptions = config.optionLimit ? true : false;
  let optionLimit = config.optionLimit || 0;
  let optionIndex = 0;

  // Iterate over our groups and render the optional headers and options for that group
  for (const group of groups) {
    let optionParent: IListComponent | HTMLElement = listElement;

    // Check for a group header builder callback
    if (group.builder && typeof group.builder === 'function') {
      const headerElement = group.builder(group);
      if (headerElement) {
        const groupWrapper = document.createElement('div');
        groupWrapper.classList.add(LIST_DROPDOWN_CONSTANTS.classes.GROUP_WRAPPER);
        optionParent = groupWrapper;
        groupWrapper.appendChild(headerElement);
        listElement.appendChild(groupWrapper);
      }
    } else if (group.text) {
      // We are rendering just text as a group header so create the group header element with predefined styles
      const groupWrapper = document.createElement('div');
      groupWrapper.classList.add(LIST_DROPDOWN_CONSTANTS.classes.GROUP_WRAPPER);

      const listHeaderElement = document.createElement('div');
      listHeaderElement.textContent = group.text;
      listHeaderElement.classList.add('forge-typography--overline');
      listHeaderElement.style.fontFamily = 'Roboto,sans-serif';
      listHeaderElement.style.fontSize = '0.75rem';
      listHeaderElement.style.lineHeight = '2rem';
      listHeaderElement.style.letterSpacing = '0.16667em';
      listHeaderElement.style.fontWeight = '500';
      listHeaderElement.style.margin = '4px 8px';

      optionParent = groupWrapper;
      groupWrapper.appendChild(listHeaderElement);
      listElement.appendChild(groupWrapper);
    }

    // Loop over the options for this group
    for (const option of group.options) {
      // First we check if this option is just a divider
      if (option.divider) {
        const dividerElement = createDivider();
        listElement.appendChild(dividerElement);
        continue;
      }

      // Check if an option limit has been provided to reduce amount of options that need to be rendered
      if (limitOptions && --optionLimit < 0) {
        break;
      }

      optionIndex++;
      
      // Create and configure the list element
      const isSelected = config.selectedValues ? config.selectedValues.some(v => isDeepEqual(v, option.value)) : false;
      let listItemElement = document.createElement('forge-list-item');
      listItemElement.value = option.value;
      listItemElement.id = `list-dropdown-option-${config.id}-${optionIndex}`;
      listItemElement.style.cursor = 'pointer';

      if (config.wrapOptionText) {
        listItemElement.wrap = true;
      }
      
      // Add any CSS classes to the option list-item
      if (option.optionClass && (typeof option.optionClass === 'string' || Array.isArray(option.optionClass) && option.optionClass.length)) {
        addClass(option.optionClass, listItemElement);
      }

      // Set role based on type
      switch (config.type) {
        case ListDropdownType.Menu:
          listItemElement.setAttribute('role', 'menuitem');
          break;
        case ListDropdownType.None:
          break;
        default:
          listItemElement.setAttribute('role', 'option');
      }

      if (config.dense) {
        listItemElement.dense = true;
      }

      // Check for a custom option template builder
      if (config.optionBuilder && typeof config.optionBuilder === 'function') {
        const element = config.optionBuilder(option, listItemElement);
        if (element) {
          if (typeof element === 'string') {
            listItemElement.innerHTML = element;
          } else {
            listItemElement.appendChild(element);
          }
        }
      } else {
        if (typeof config.transform !== 'function') {
          listItemElement.textContent = option.label || '';
        } else {
          const result = config.transform(option.label);
          if (typeof result === 'string') {
            listItemElement.textContent = result;
          } else if (typeof result === 'object' && (result as HTMLElement).nodeType !== undefined) {
            listItemElement.appendChild(result);
          }
        }
      }

      // Leading element/icon
      if (option.leadingBuilder) {
        const element = option.leadingBuilder();
        if (isObject(element)) {
          element.slot = 'leading';
          listItemElement.appendChild(element);
        }
      } else if (option.leadingIcon) {
        const leadingIconElement = createIconElement(option.leadingIconType, option.leadingIcon, option.leadingIconClass || config.iconClass);
        leadingIconElement.slot = 'leading';
        listItemElement.appendChild(leadingIconElement);
      }

      // Trailing element/icon
      if (option.trailingBuilder) {
        const element = option.trailingBuilder();
        if (isObject(element)) {
          element.slot = 'trailing';
          listItemElement.appendChild(element);
        }
      } else if (option.trailingIcon) {
        const trailingIconElement = createIconElement(option.trailingIconType, option.trailingIcon, option.trailingIconClass || config.iconClass);
        trailingIconElement.slot = 'trailing';
        listItemElement.appendChild(trailingIconElement);
      }

      // Update the disabled state
      if (option.disabled) {
        listItemElement.disabled = option.disabled;
        listItemElement.setAttribute('aria-disabled', 'true');
      } else {
        listItemElement.style.cursor = 'pointer';
        listItemElement.setAttribute('aria-disabled', 'false');
      }

      // Update the selected state
      if (isSelected) {
        listItemElement.selected = true;
      }
      listItemElement.setAttribute('aria-selected', isSelected ? 'true' : 'false');

      // If multiple selections are enabled then we need to create and append a leading checkbox element
      if (config.multiple) {
        const checkboxElement = createCheckboxElement(isSelected);
        listItemElement.appendChild(checkboxElement);
        listItemElement.setAttribute('aria-selected', `${isSelected}`);
        listItemElement.setAttribute('aria-checked', `${isSelected}`);
      }

      if (option.elementAttributes) {
        option.elementAttributes.forEach((value: string, key: string) => {
          listItemElement.setAttribute(key, value);
        });
      }

      // If we have any child options, we need to render a child menu for this list item
      if (!option.disabled && typeof config.cascadingElementFactory === 'function' && Array.isArray(option.options) && option.options.length) {
        // Create the trailing indicator icon to show that a child menu exists for this option. 
        const optionIconElement = document.createElement('forge-icon');
        optionIconElement.name = 'arrow_right';
        optionIconElement.slot = 'trailing';
        listItemElement.appendChild(optionIconElement);

        const nonDividerOptions = group.options.filter(o => !o.divider);

        // Create the nested cascading element wrapper
        const factoryConfig: IListDropdownCascadingElementFactoryConfig = {
          index: nonDividerOptions.indexOf(option),
          options: option.options,
          parentValue: option.value
        };
        const cascadingElement = config.cascadingElementFactory.call(null, factoryConfig);
        cascadingElement.appendChild(listItemElement);
        listItemElement = cascadingElement;
      }

      optionParent.appendChild(listItemElement);
    }
  }
}

export function createCheckboxElement(selected: boolean): HTMLElement {
  const checkboxElement = document.createElement('forge-icon');
  checkboxElement.setAttribute(LIST_DROPDOWN_CONSTANTS.attributes.CHECKBOX_ELEMENT, '');
  checkboxElement.name = selected ? tylIconCheckBox.name : tylIconCheckBoxOutlineBlank.name;
  checkboxElement.slot = 'leading';
  checkboxElement.style.marginRight = '16px';
  checkboxElement.style.verticalAlign = 'middle';
  return checkboxElement;
}

function createDivider(): HTMLElement {
  const divider = document.createElement('forge-divider');
  divider.setAttribute('aria-hidden', 'true');
  return divider;
}

function createIconElement(type: ListDropdownIconType = 'font', iconName: string, iconClass?: string): HTMLElement {
  if (type === 'component') {
    const icon = document.createElement('forge-icon');
    if (iconClass) {
      icon.classList.add(iconClass);
    }
    icon.setAttribute('aria-hidden', 'true');
    icon.name = iconName;
    return icon;
  }

  const iconElement = document.createElement('i');
  iconElement.classList.add(iconClass || ICON_CLASS_NAME);
  iconElement.setAttribute('aria-hidden', 'true');
  iconElement.textContent = iconName;
  return iconElement;
}

export function createAsyncElement(asyncStyle?: ListDropdownAsyncStyle): HTMLElement {
  switch (asyncStyle) {
    case ListDropdownAsyncStyle.Skeleton:
      return createSkeletonElement();
    default:
      return createSpinnerElement();
  }
}

function createSpinnerElement(): HTMLElement {
  const div = document.createElement('div');
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';
  div.style.padding = '8px';
  div.style.boxSizing = 'border-box';

  const spinner = document.createElement('forge-circular-progress');
  spinner.style.setProperty('--forge-circular-progress-size', '24px');
  div.appendChild(spinner);

  return div;
}

function createSkeletonElement(): HTMLElement {
  const list = document.createElement('forge-list');
  const div = document.createElement('div');
  div.style.minWidth = '192px';
  for (let i = 0; i < 3; i++) {
    const listItemSkeleton = document.createElement(SKELETON_CONSTANTS.elementName) as ISkeletonComponent;
    listItemSkeleton.setAttribute('list-item', '');
    div.appendChild(listItemSkeleton);
  }
  list.appendChild(div);
  return list;
}

export function createBusyElement(): ILinearProgressComponent {
  const linearProgress = document.createElement(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;
  linearProgress.determinate = false;
  linearProgress.style.position = 'absolute';
  linearProgress.style.top = '0';
  linearProgress.style.left = '0';
  linearProgress.style.right = '0';
  linearProgress.style.width = '100%';
  return linearProgress;
}

function getOptionsByGroup(options: Array<IListDropdownOption | IListDropdownOptionGroup>): IListDropdownOptionGroup[] {
  return isListDropdownOptionType(options, ListDropdownOptionType.Group) ? (options as IListDropdownOptionGroup[]) : [{ text: '', options }] as IListDropdownOptionGroup[];
}

/**
 * Determines if the provided options are of the specified type.
 * @param options The options either grouped or individual.
 * @param type The type of option to detect.
 */
export function isListDropdownOptionType(options: Array<IListDropdownOption | IListDropdownOptionGroup>, type: ListDropdownOptionType): type is ListDropdownOptionType {
  const isOptionGroups = options.some((o: IListDropdownOption | IListDropdownOptionGroup) => isDefined(o) && isObject(o) && o.hasOwnProperty('options') && (o.hasOwnProperty('text') || o.hasOwnProperty('builder')));
  const isOptionTypes = options.some((o: IListDropdownOption | IListDropdownOptionGroup) => isDefined(o) && isObject(o) && o.hasOwnProperty('label') && o.hasOwnProperty('value'));
  return (isOptionGroups && type === ListDropdownOptionType.Group) || (isOptionTypes && type === ListDropdownOptionType.Option);
}
