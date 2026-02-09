import { CALENDAR_MENU_CONSTANTS, ICalendarMenuOption } from './calendar-menu-constants.js';

export function getGrid(options: ICalendarMenuOption[]): HTMLElement {
  const grid = document.createElement('div');
  grid.setAttribute('part', CALENDAR_MENU_CONSTANTS.parts.MENU);
  grid.classList.add(CALENDAR_MENU_CONSTANTS.classes.VIEW, CALENDAR_MENU_CONSTANTS.classes.GRID);
  let gridItems: HTMLElement[];
  if (options.length > 12) {
    grid.classList.add(CALENDAR_MENU_CONSTANTS.classes.GRID_FOUR_COL);
    gridItems = getGridItems(options);
  } else {
    grid.classList.add(CALENDAR_MENU_CONSTANTS.classes.GRID_THREE_COL);
    gridItems = getGridItems(options);
  }
  gridItems.forEach(g => grid.appendChild(g));
  return grid;
}

export function getGridItems(options: ICalendarMenuOption[]): HTMLElement[] {
  return options.map(o => {
    const element = document.createElement('div');
    element.classList.add(CALENDAR_MENU_CONSTANTS.classes.ITEM, CALENDAR_MENU_CONSTANTS.classes.GRID_ITEM);
    element.innerText = o.label;
    element.setAttribute('role', 'button');
    element.setAttribute('part', CALENDAR_MENU_CONSTANTS.parts.ITEM);
    element.setAttribute('tabindex', '-1');
    element.setAttribute(CALENDAR_MENU_CONSTANTS.attributes.DATA_VALUE, o.value.toString());
    if (o.selected) {
      element.classList.add(CALENDAR_MENU_CONSTANTS.classes.ITEM_SELECTED);
      element.setAttribute('aria-current', 'true');
    }
    if (o.disabled) {
      element.setAttribute('disabled', 'true');
    }

    const stateLayerElement = document.createElement('forge-state-layer');
    element.appendChild(stateLayerElement);

    const focusIndicatorElement = document.createElement('forge-focus-indicator');
    focusIndicatorElement.inward = true;
    element.appendChild(focusIndicatorElement);

    return element;
  });
}

export function getList(options: ICalendarMenuOption[]): HTMLElement {
  const wrapper = document.createElement('div');
  const list = document.createElement('div');
  wrapper.classList.add(CALENDAR_MENU_CONSTANTS.classes.VIEW, CALENDAR_MENU_CONSTANTS.classes.LIST_WRAPPER);
  list.classList.add(CALENDAR_MENU_CONSTANTS.classes.LIST);
  list.setAttribute('role', 'list');
  list.appendChild(getScrollSpy(CALENDAR_MENU_CONSTANTS.ids.SCROLL_SPY_TOP));
  getListItems(options).forEach(l => list.appendChild(l));
  list.appendChild(getScrollSpy(CALENDAR_MENU_CONSTANTS.ids.SCROLL_SPY_BOTTOM));
  wrapper.appendChild(list);
  return wrapper;
}

export function getListItems(options: ICalendarMenuOption[]): HTMLElement[] {
  return options.map(o => {
    const element = document.createElement('div');
    element.innerText = o.label;
    element.classList.add(CALENDAR_MENU_CONSTANTS.classes.ITEM, CALENDAR_MENU_CONSTANTS.classes.LIST_ITEM);
    element.setAttribute('part', CALENDAR_MENU_CONSTANTS.parts.ITEM);
    element.setAttribute('tabindex', '-1');
    element.setAttribute('role', 'listitem');
    element.setAttribute(CALENDAR_MENU_CONSTANTS.attributes.DATA_VALUE, o.value.toString());
    if (o.selected) {
      element.classList.toggle(CALENDAR_MENU_CONSTANTS.classes.ITEM_SELECTED, true);
      element.setAttribute('aria-current', 'true');
    }
    if (o.disabled) {
      element.setAttribute('disabled', 'true');
    }

    const stateLayerElement = document.createElement('forge-state-layer');
    element.appendChild(stateLayerElement);

    const focusIndicatorElement = document.createElement('forge-focus-indicator');
    focusIndicatorElement.inward = true;
    element.appendChild(focusIndicatorElement);

    return element;
  });
}

export function getScrollSpy(id: string): HTMLElement {
  const element = document.createElement('div');
  element.id = id;
  element.setAttribute('aria-hidden', 'true');
  return element;
}

export function removeAllExceptLastChild(el: HTMLElement): void {
  while (el.childNodes.length > 1) {
    if (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
}
