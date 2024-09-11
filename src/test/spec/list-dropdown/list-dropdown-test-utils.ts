import { task } from '@tylertech/forge/core/utils/utils';
import { ListDropdown, IListDropdownConfig, IListDropdown, IListDropdownCore, LIST_DROPDOWN_CONSTANTS, IListDropdownOption } from '@tylertech/forge/list-dropdown';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from '@tylertech/forge/list';
import { ISelectOption } from '@tylertech/forge/select';
import { LINEAR_PROGRESS_CONSTANTS, ILinearProgressComponent } from '@tylertech/forge/linear-progress';
import { IPopoverComponent, POPOVER_CONSTANTS } from '@tylertech/forge/popover';

export interface IListDropdownTestContext {
  targetElement: HTMLElement;
  listDropdown: IListDropdown;
  core: IListDropdownCore;
  append(): void;
  remove(): void;
}

const POPOVER_ANIMATION_DURATION = 200;

export interface ITestListDropdownGroup {
  headerElement: HTMLElement;
  options: ISelectOption[];
}

export function createListDropdown(config: IListDropdownConfig, targetElement?: HTMLElement, append = true): IListDropdownTestContext {
  if (!targetElement) {
    targetElement = document.createElement('button');
    targetElement.textContent = 'Choose...';
  }

  if (append) {
    document.body.appendChild(targetElement);
  }

  const listDropdown = new ListDropdown(targetElement, config);

  return {
    targetElement,
    listDropdown,
    core: listDropdown['_core'],
    append: () => document.body.appendChild(targetElement!),
    remove: () => document.body.removeChild(targetElement!)
  };
}

export function getListDropdownPopup(): IPopoverComponent {
  return document.querySelector(POPOVER_CONSTANTS.elementName) as IPopoverComponent;
}

export function delayPopupAnimation(): Promise<void> {
  return task(POPOVER_ANIMATION_DURATION);
}

export function getPopupOptions(): ISelectOption[] {
  const popup = getListDropdownPopup();
  if (!popup) {
    return [];
  }
  const listItems = Array.from(popup.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
  return listItems.map(li => ({ label: li.innerText, value: li.value } as ISelectOption));
}

export function getPopupGroups(): ITestListDropdownGroup[] {
  const popup = getListDropdownPopup();
  const groups = Array.from(popup.querySelectorAll(`.${LIST_DROPDOWN_CONSTANTS.classes.GROUP_WRAPPER}`)) as HTMLElement[];
  return groups.map(groupElement => {
    const headerElement = groupElement.firstElementChild as HTMLElement;
    const options = Array.from(groupElement.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
    return {
      headerElement,
      options: options.map(o => ({ label: o.innerText, value: o.value }))
    };
  });
}

export function getListItems(): IListItemComponent[] {
  const popup = getListDropdownPopup();
  if (!popup) {
    return [];
  }
  return Array.from(popup.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
}

export function triggerDropdownClick(targetElement: HTMLElement): void {
  targetElement.focus();
  targetElement.click();
}

export function clickListItem(index: number): void {
  const listItems = getListItems();
  if (index >= 0 && index < listItems.length) {
    const shadowEl = listItems[index].shadowRoot!.firstElementChild as IListItemComponent;
    shadowEl.click();
  }
}

export function getActiveListItemIndex(): number {
  const listItems = getListItems();
  return listItems.findIndex(li => li.active);
}

export function getBusyVisibility(context: IListDropdownTestContext): boolean {
  const popup = context.listDropdown.dropdownElement;
  if (!popup) {
    return false;
  }

  const linearProgress = popup.querySelector(LINEAR_PROGRESS_CONSTANTS.elementName) as ILinearProgressComponent;
  if (!linearProgress) {
    return false;
  }

  return linearProgress.style.display !== 'none';
}

export function generateScrollableOptions(num = 100): IListDropdownOption[] {
  const options: IListDropdownOption[] = [];
  for (let i = 0; i < num; i++) {
    options.push({ label: `Option: ${i + 1}`, value: i });
  }
  return options;
}
