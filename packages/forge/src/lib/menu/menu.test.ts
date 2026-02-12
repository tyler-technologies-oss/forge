import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { userEvent } from 'vitest/browser';
import { frame, task } from '../core/utils/utils.js';
import type { IMenuComponent } from './menu.js';
import type { IMenuOption } from './menu-constants.js';
import { MENU_CONSTANTS } from './menu-constants.js';
import { type IPopoverComponent, POPOVER_CONSTANTS } from '../popover/index.js';
import { type IListComponent, type IListItemComponent, LIST_ITEM_CONSTANTS } from '../list/index.js';
import { ICON_CLASS_NAME } from '../constants.js';

import './menu.js';
import '../list/list-item/index.js';

// Popover animation duration (200ms) + buffer
const POPOVER_ANIMATION_DURATION = 200;

const OPTIONS: IMenuOption<number>[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 }
];

describe('Menu', () => {
  beforeEach(async () => {
    await clearPopups();
  });

  afterEach(async () => {
    await clearPopups();
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();

      await expect(harness.menuEl).toBeAccessible();
    });

    it('should be accessible when open', async () => {
      const harness = await createFixture();

      await harness.openMenu();

      expect(harness.isOpen).toBe(true);
      await expect(document.body).toBeAccessible({ rules: { region: { enabled: false } } });
    });
  });

  describe('attributes', () => {
    describe('by default', () => {
      it('should be connected', async () => {
        const el = document.createElement('forge-menu') as IMenuComponent;
        document.body.appendChild(el);

        expect(el.isConnected).toBe(true);

        el.remove();
      });

      it('should have open set to false', async () => {
        const harness = await createFixture();

        expect(harness.menuEl.open).toBe(false);
      });

      it('should have placement set to bottom-start', async () => {
        const harness = await createFixture();

        expect(harness.menuEl.placement).toBe('bottom-start');
      });

      it('should have selected-index set -1', async () => {
        const harness = await createFixture();

        expect(harness.menuEl.selectedIndex).toBe(-1);
      });

      it('should have dense set to false', async () => {
        const harness = await createFixture();

        expect(harness.menuEl.dense).toBe(false);
      });

      it(`should have icon-class set to ${ICON_CLASS_NAME}`, async () => {
        const harness = await createFixture();

        expect(harness.menuEl.iconClass).toBe(ICON_CLASS_NAME);
      });
    });

    describe('when setting dense', () => {
      it('should update the dense property', async () => {
        const harness = await createFixture();

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.DENSE, '');

        expect(harness.menuEl.dense).toBe(true);
      });
    });

    describe('when setting open', () => {
      it('should update the open property', async () => {
        const harness = await createFixture();

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.OPEN, '');

        expect(harness.menuEl.open).toBe(true);
      });
    });

    describe('when setting selected-index', () => {
      it('should update the selected-index property', async () => {
        const harness = await createFixture({ options: generateMenuOptions(3) });

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.SELECTED_INDEX, '2');

        expect(harness.menuEl.selectedIndex).toBe(2);
      });
    });

    describe('when setting placement', () => {
      it('should update the placement property', async () => {
        const harness = await createFixture();

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.PLACEMENT, 'right-end');

        expect(harness.menuEl.placement).toBe('right-end');
      });
    });

    describe('when setting icon-class', () => {
      it('should update the icon-class property', async () => {
        const harness = await createFixture();

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.ICON_CLASS, ICON_CLASS_NAME);

        expect(harness.menuEl.iconClass).toBe(ICON_CLASS_NAME);
      });
    });
  });

  describe('properties', () => {
    describe('when setting dense', () => {
      it('should update the dense property', async () => {
        const harness = await createFixture();

        harness.menuEl.dense = true;
        harness.menuEl.dense = false;
        harness.menuEl.dense = true;

        expect(harness.menuEl.dense).toBe(true);
      });
    });

    describe('when setting open', () => {
      it('should update the open property', async () => {
        const harness = await createFixture();

        harness.menuEl.open = true;
        harness.menuEl.open = false;
        harness.menuEl.open = true;

        expect(harness.menuEl.open).toBe(true);
      });
    });

    describe('when setting the persistSelection property', () => {
      it('should update the matching attribute', async () => {
        const harness = await createFixture();

        harness.menuEl.persistSelection = false;
        await frame();
        harness.menuEl.persistSelection = true;
        await frame();

        expect(harness.menuEl.persistSelection).toBe(true);
        expect(harness.menuEl.hasAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION)).toBe(true);
      });
    });

    describe('when setting the persistSelection attribute', () => {
      it('should update the matching property', async () => {
        const harness = await createFixture();

        harness.menuEl.removeAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION);
        await frame();
        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION, '');
        await frame();

        expect(harness.menuEl.persistSelection).toBe(true);
        expect(harness.menuEl.hasAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION)).toBe(true);
      });
    });

    describe('when setting selected-index', () => {
      it('should update the selected-index property', async () => {
        const harness = await createFixture({ options: generateMenuOptions(3) });

        harness.menuEl.selectedIndex = 1;
        harness.menuEl.selectedIndex = 2;

        expect(harness.menuEl.selectedIndex).toBe(2);
      });
    });

    describe('when setting placement', () => {
      it('should update the placement property', async () => {
        const harness = await createFixture();

        harness.menuEl.placement = 'right-end';

        expect(harness.menuEl.placement).toBe('right-end');
      });
    });

    describe('when setting icon-class', () => {
      it('should update the icon-class property', async () => {
        const harness = await createFixture();

        harness.menuEl.iconClass = ICON_CLASS_NAME;

        expect(harness.menuEl.iconClass).toBe(ICON_CLASS_NAME);
      });
    });

    describe('when setting options', () => {
      it('should update the options property with list', async () => {
        const harness = await createFixture();

        harness.menuEl.options = generateMenuOptions(5);

        expect(harness.menuEl.options.length).toBe(5);
      });

      it('should update the options property with factory', async () => {
        const harness = await createFixture({ options: null as any });

        harness.menuEl.options = asyncMenuOptionsFactory(5);

        expect((harness.menuEl as any)._core._optionsFactory).not.toBeUndefined();
        expect(harness.menuEl.options).toEqual([]);
      });
    });
  });

  describe('toggle element', () => {
    it('should await dynamic toggle element', async () => {
      const screen = render(html`<forge-menu></forge-menu>`);
      const el = screen.container.querySelector('forge-menu') as IMenuComponent;

      await frame();
      expect((el as any)._core._adapter.hasTargetElement()).toBe(false);

      const toggleElement = createToggleElement();
      el.appendChild(toggleElement);
      await frame();

      expect((el as any)._core._adapter.hasTargetElement()).toBe(true);
    });

    it('should await nested dynamic toggle element', async () => {
      const screen = render(html`<forge-menu></forge-menu>`);
      const el = screen.container.querySelector('forge-menu') as IMenuComponent;

      const emptyContainer = document.createElement('div');
      el.appendChild(emptyContainer);
      await frame();

      expect((el as any)._core._adapter.hasTargetElement()).toBe(false);

      const toggleElement = createToggleElement();
      emptyContainer.appendChild(toggleElement);
      await frame();

      expect((el as any)._core._adapter.hasTargetElement()).toBe(true);
    });

    it('should close dropdown on blur when nested dynamic toggle element is provided', async () => {
      const screen = render(html`<forge-menu></forge-menu>`);
      const el = screen.container.querySelector('forge-menu') as IMenuComponent;

      const emptyContainer = document.createElement('div');
      el.appendChild(emptyContainer);
      await frame();

      const toggleElement = createToggleElement();
      emptyContainer.appendChild(toggleElement);
      await frame();

      toggleElement.focus();
      toggleElement.click();
      expect(el.open).toBe(true);
      expect(document.activeElement).toBe(toggleElement);

      toggleElement.blur();
      expect(el.open).toBe(false);
      expect(document.activeElement).not.toBe(toggleElement);
    });

    it('when clicked should open the menu', async () => {
      const harness = await createFixture();

      await harness.clickElement(harness.triggerEl);

      expect(harness.menuEl.open).toBe(true);
    });

    it('when clicked should open the menu with options factory', async () => {
      const harness = await createFixture();

      harness.menuEl.options = asyncMenuOptionsFactory();
      await harness.clickElement(harness.triggerEl);

      expect(harness.menuEl.open).toBe(true);
    });

    it('when clicked should open the menu with options', async () => {
      const harness = await createFixture({ options: generateMenuOptions() });

      await harness.clickElement(harness.triggerEl);

      expect(harness.menuEl.open).toBe(true);
    });

    it('when clicked twice should open then close the menu', async () => {
      const harness = await createFixture();

      await harness.clickElement(harness.triggerEl);
      expect(harness.menuEl.open).toBe(true);

      await harness.clickElement(harness.triggerEl);
      expect(harness.menuEl.open).toBe(false);
    });
  });

  describe('options', () => {
    it('should load async when factory', async () => {
      const harness = await createFixture();

      harness.menuEl.options = menuOptionsFactory();
      await frame();

      harness.menuEl.open = true;
      expect(harness.menuEl.open).toBe(true);
    });

    it('should close menu if no options', async () => {
      const harness = await createFixture();

      harness.menuEl.options = () => [];
      await frame();

      harness.menuEl.open = true;
      await frame();

      expect(harness.menuEl.open).toBe(false);
    });

    it('should load menu with leading builder', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      options[6].leadingBuilder = () => document.createElement('a');

      await frame();

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();
      expect(harness.menuEl.open).toBe(true);
    });

    it('should have disabled class when option is set to disabled', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);
      options[5].disabled = true;

      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(getPopupListItem(5).querySelector('button')?.hasAttribute('disabled')).toBe(true);
    });

    it('should have selected class when option is set to selected and persistSelection is true', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      harness.menuEl.persistSelection = true;
      options[5].selected = true;
      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).toBe(true);
    });

    it('should not have selected class when option is set to selected and persistSelection is false', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      harness.menuEl.persistSelection = false;
      options[5].selected = true;
      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).toBe(false);
    });

    it('should not have selected class when option is set to selected and persistSelection is switched from true to false', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      harness.menuEl.persistSelection = true;
      options[5].selected = true;
      harness.menuEl.options = options;
      await frame();
      harness.menuEl.persistSelection = false;
      harness.menuEl.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).toBe(false);
    });

    it('should use option builder', async () => {
      const harness = await createFixture();

      const optionBuilderSpy = vi.fn((option: IMenuOption, _listItem: HTMLElement) => {
        const div = document.createElement('div');
        div.id = `custom-option-${option.value}`;
        div.textContent = `Custom option: ${option.label}`;
        return div;
      });

      const options: IMenuOption[] = [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 }
      ];
      harness.menuEl.options = options;
      harness.menuEl.optionBuilder = optionBuilderSpy;

      harness.menuEl.open = true;
      await frame();

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];

      expect(optionBuilderSpy).toHaveBeenCalledTimes(options.length);
      options.forEach((option, index) => {
        expect(listItems[index].textContent).toBe(`Custom option: ${option.label}`);
      });
    });

    it('should reset options with leading icon if set while dropdown is open', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(1);

      await frame();

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();

      const newOptions = generateMenuOptions(1);
      newOptions[0].icon = 'code';
      harness.menuEl.options = newOptions;

      await frame();

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const leadingIconEl = listItems[0].querySelector('i[slot=leading]');

      expect(leadingIconEl).not.toBeNull();
      expect(leadingIconEl?.textContent).toBe('code');
    });

    it(`should load leading icons from options factory based on 'leadingIcon' or 'icon' property`, async () => {
      const harness = await createFixture();
      const options = (): IMenuOption[] => [
        { icon: 'code', value: '', label: '1' },
        { leadingIcon: 'code', value: '', label: '2' }
      ];

      await frame();

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const leadingIcons = listItems.map(listItem => listItem.querySelector('i[slot=leading]'));

      expect(leadingIcons[0]).not.toBeNull();
      expect(leadingIcons[1]).not.toBeNull();
    });
  });

  describe('events', () => {
    describe('keyboard', () => {
      it('arrow down from the start should activate the first list element', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        await harness.clickElement(harness.triggerEl);
        await task(300);
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));

        expect(getPopupListItem(0).hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      });

      it('arrow up from the start should activate the last list element', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        await harness.clickElement(harness.triggerEl);
        await task(300);
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));

        expect(getPopupListItem(6).hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      });

      it('enter should select the list element when persistSelection is true', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.menuEl.persistSelection = true;
        await harness.clickElement(harness.triggerEl);
        await task(300);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

        expect(harness.menuEl.selectedIndex).toBe(0);
      });

      it('enter should select the list element when persistSelection is false', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.menuEl.persistSelection = false;
        await harness.clickElement(harness.triggerEl);
        await task(300);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

        expect(harness.menuEl.selectedIndex).toBe(-1);
      });

      it('space should toggle the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(harness.menuEl.open).toBe(true);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(harness.menuEl.open).toBe(false);
      });

      it('tab should close the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.menuEl.open = true;

        await task(POPOVER_ANIMATION_DURATION);
        harness.triggerEl.focus();
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        harness.triggerEl.blur();
        await frame();

        expect(harness.menuEl.open).toBe(false);
      });

      it('should not select active item when tab key is pressed while dropdown is open', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.triggerEl.focus();
        await harness.clickElement(harness.triggerEl);

        const selectSpy = vi.fn();
        harness.menuEl.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

        await task(POPOVER_ANIMATION_DURATION);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        await frame();

        expect(selectSpy).not.toHaveBeenCalled();
      });

      it('should highlight first option when opened via down arrow key', async () => {
        const harness = await createFixture({ options: generateMenuOptions(3) });

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));

        await task(POPOVER_ANIMATION_DURATION);

        const firstListItem = getPopupListItem(0) as IListItemComponent;
        expect(firstListItem.active).toBe(true);
      });

      it('escape should close the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.triggerEl.focus();
        await harness.clickElement(harness.triggerEl);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        await frame();

        expect(harness.menuEl.open).toBe(false);
      });

      it('blur should close the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.menuEl.open = true;
        await task(300);

        getPopupListItem(0).querySelector('button')?.click();

        await task(300);

        expect(harness.menuEl.open).toBe(false);
      });
    });
  });

  describe('cascading', () => {
    it('should render child menu', async () => {
      const harness = await createFixture();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.tagName.toLowerCase()).toBe(MENU_CONSTANTS.elementName);

      const menuTrigger = childMenuComponent.querySelector('button') as HTMLButtonElement;
      expect(menuTrigger.tagName.toLowerCase()).toBe('button');

      menuTrigger.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();

      expect(childMenuComponent.open).toBe(true);
      expect(childMenuComponent.mode).toBe('cascade');

      const childMenuListItems = getChildMenuListItems(getPopoverElement());
      expect(childMenuListItems.length).toBe(CHILD_MENU_OPTION_COUNT);
    });

    it('should hide child menu on mouseleave', async () => {
      const harness = await createFixture();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const menuTrigger = childMenuComponent.querySelector('button') as HTMLButtonElement;

      menuTrigger.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();
      expect(childMenuComponent.open).toBe(true);

      menuTrigger.dispatchEvent(new MouseEvent('mouseleave'));
      await task(MENU_CONSTANTS.numbers.CHILD_MOUSE_LEAVE_TIMEOUT);
      await frame();
      expect(childMenuComponent.open).toBe(false);
    });

    it('should hide child menu if mouse leaves popup after threshold', async () => {
      const harness = await createFixture();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const menuTrigger = childMenuComponent.querySelector('button') as HTMLButtonElement;

      menuTrigger.dispatchEvent(new MouseEvent('mouseenter'));

      await frame();

      const childMenuPopup = getChildPopupElement(childMenuComponent);
      childMenuPopup.dispatchEvent(new MouseEvent('mouseenter'));
      expect(childMenuComponent.open).toBe(true);

      await frame();

      menuTrigger.dispatchEvent(new MouseEvent('mouseleave'));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 0, pageY: 0 } as MouseEventInit));
      childMenuPopup.dispatchEvent(new MouseEvent('mouseleave'));

      await task(MENU_CONSTANTS.numbers.POPUP_MOUSE_LEAVE_TIMEOUT * 2);
      await frame();

      expect(childMenuComponent.open).toBe(false);
    });

    it('should select option in child menu', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(3);
      const childOptions = generateMenuOptions(2);
      const EXPECTED_SELECTION_VALUE = childOptions[1].value;
      options[1].options = childOptions;

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      const selectSpy = vi.fn();
      harness.menuEl.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const menuTrigger = childMenuComponent.querySelector('button') as HTMLButtonElement;

      menuTrigger.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();

      const childMenuListItems = getChildMenuListItems(getPopoverElement());
      childMenuListItems[1].dispatchEvent(new MouseEvent('click'));

      expect(selectSpy).toHaveBeenCalledOnce();
      expect(selectSpy.mock.calls[0][0].detail).toMatchObject({
        index: 1,
        value: EXPECTED_SELECTION_VALUE,
        parentValue: options[1].value
      });
    });

    it('should open and close child menu with arrow keys', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(2);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.open).toBe(true);

      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      await frame();

      expect(childMenuComponent.open).toBe(false);
    });

    it('should select child option with arrow key', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(2);
      const EXPECTED_SELECTION_VALUE = (options[1].options[0] as IMenuOption).value;

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      const selectSpy = vi.fn();
      harness.menuEl.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

      await frame();

      harness.triggerEl.focus();
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.open).toBe(true);

      await frame();
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

      expect(harness.menuEl.open).toBe(false);
      expect(selectSpy).toHaveBeenCalledOnce();
      expect(selectSpy.mock.calls[0][0].detail).toMatchObject({
        index: 0,
        value: EXPECTED_SELECTION_VALUE,
        parentValue: options[1].value
      });
    });
  });

  describe('list dropdown API', () => {
    it('should set popover flip', async () => {
      const harness = await createFixture({ options: generateMenuOptions(1) });

      harness.menuEl.popoverFlip = 'never';
      harness.menuEl.open = true;
      await frame();

      const popover = getPopoverElement();

      expect(harness.menuEl.popoverFlip).toBe('never');
      expect(popover.flip).toBe('never');
    });

    it('should set popover flip from attribute', async () => {
      const harness = await createFixture({ options: generateMenuOptions(1) });

      harness.menuEl.setAttribute('popover-flip', 'never');
      harness.menuEl.open = true;
      await frame();

      const popover = getPopoverElement();

      expect(harness.menuEl.popoverFlip).toBe('never');
      expect(popover.flip).toBe('never');
    });

    it('should set popover shift', async () => {
      const harness = await createFixture({ options: generateMenuOptions(1) });

      harness.menuEl.popoverShift = 'never';
      harness.menuEl.open = true;
      await frame();

      const popover = getPopoverElement();

      expect(harness.menuEl.popoverShift).toBe('never');
      expect(popover.shift).toBe('never');
    });

    it('should set popover shift from attribute', async () => {
      const harness = await createFixture({ options: generateMenuOptions(1) });

      harness.menuEl.setAttribute('popover-shift', 'never');
      harness.menuEl.open = true;
      await frame();

      const popover = getPopoverElement();

      expect(harness.menuEl.popoverShift).toBe('never');
      expect(popover.shift).toBe('never');
    });
  });

  describe('popup target', () => {
    it('should have popup target property null by default', async () => {
      const harness = await createFixture();

      expect(harness.menuEl.popupTarget).toBeNull();
    });

    it('should set popup target via attribute', async () => {
      const harness = await createFixture({ popupTarget: 'custom-target' });

      expect(harness.menuEl.popupTarget).toBe('custom-target');
      expect(harness.menuEl.getAttribute(MENU_CONSTANTS.attributes.POPUP_TARGET)).toBe('custom-target');
    });

    it('should set popup target via property', async () => {
      const harness = await createFixture();

      harness.menuEl.popupTarget = 'custom-target';

      expect(harness.menuEl.popupTarget).toBe('custom-target');
      expect(harness.menuEl.getAttribute(MENU_CONSTANTS.attributes.POPUP_TARGET)).toBe('custom-target');
    });

    it('should position menu relative to popup target element when specified', async () => {
      const screen = render(html`
        <div>
          <div id="position-target" style="position: absolute; top: 100px; left: 100px; width: 200px; height: 50px;"></div>
          <forge-menu popup-target="position-target" .options=${OPTIONS}>
            <button type="button">Menu</button>
          </forge-menu>
        </div>
      `);

      const menuEl = screen.container.querySelector('forge-menu') as IMenuComponent;
      const triggerEl = menuEl.querySelector('button') as HTMLButtonElement;
      const targetEl = screen.container.querySelector('#position-target') as HTMLElement;

      await userEvent.click(triggerEl);
      await frame();
      await task(500);

      const popover = menuEl.popupElement as IPopoverComponent;
      expect(popover).not.toBeNull();
      expect(popover.anchorElement).toBe(targetEl);
    });

    it('should set aria-expanded on trigger button and not on popup target element', async () => {
      const screen = render(html`
        <div>
          <div id="position-target"></div>
          <forge-menu popup-target="position-target" .options=${OPTIONS}>
            <button type="button">Menu</button>
          </forge-menu>
        </div>
      `);

      const menuEl = screen.container.querySelector('forge-menu') as IMenuComponent;
      const triggerEl = menuEl.querySelector('button') as HTMLButtonElement;
      const targetEl = screen.container.querySelector('#position-target') as HTMLElement;

      await userEvent.click(triggerEl);
      await frame();
      await task(500);

      expect(triggerEl.getAttribute('aria-expanded')).toBe('true');
      expect(targetEl.hasAttribute('aria-expanded')).toBe(false);
    });
  });

  it('should remove popover when removed from DOM while open', async () => {
    const harness = await createFixture();
    const options: IMenuOption[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 }
    ];

    harness.menuEl.options = options;
    harness.menuEl.open = true;
    await frame();

    const popover = getPopoverElement();
    expect(popover).not.toBeNull();

    harness.menuEl.remove();
    await frame();

    expect(popover.isConnected).toBe(false);
  });
});

class MenuHarness {
  constructor(
    public menuEl: IMenuComponent,
    public triggerEl: HTMLButtonElement
  ) {}

  public async openMenu(): Promise<void> {
    await this.clickElement(this.triggerEl);
    await frame();
    await this.dropdownAnimation();
  }

  public async dropdownAnimation(): Promise<void> {
    await frame();
    return new Promise(resolve => setTimeout(resolve, 500));
  }

  public get popoverElement(): IPopoverComponent | undefined {
    return this.menuEl.popupElement as IPopoverComponent | undefined;
  }

  public get isOpen(): boolean {
    return this.menuEl.open && !!this.popoverElement && this.popoverElement.isConnected && this.popoverElement.open;
  }

  public async selectOption(index: number): Promise<void> {
    await this.openMenu();
    const option = this.popoverElement?.querySelectorAll('forge-list-item')[index];
    if (option) {
      await this.clickElement(option as HTMLElement);
    }
  }

  public async clickElement(element: HTMLElement): Promise<void> {
    await userEvent.click(element);
  }
}

interface MenuFixtureConfig {
  options?: IMenuOption[];
  popupTarget?: string;
}

async function createFixture({ options = OPTIONS, popupTarget }: MenuFixtureConfig = {}): Promise<MenuHarness> {
  const optionsValue = options === null ? nothing : options;
  const screen = render(html`
    <forge-menu .options=${optionsValue} popup-target=${popupTarget ?? nothing}>
      <button type="button">Menu</button>
    </forge-menu>
  `);
  const el = screen.container.querySelector('forge-menu') as IMenuComponent;
  const triggerEl = el.querySelector('button') as HTMLButtonElement;
  return new MenuHarness(el, triggerEl);
}

function generateMenuOptions(count: number = 5): IMenuOption[] {
  const options: IMenuOption[] = [];
  for (let i = 0; i < count; i++) {
    options.push({
      value: i,
      disabled: false,
      divider: i === 4,
      icon: 'arrow_right',
      label: i.toString()
    });
  }
  return options;
}

function asyncMenuOptionsFactory(count: number = 5) {
  return () => new Promise<IMenuOption[]>(resolve => resolve(generateMenuOptions(count)));
}

function menuOptionsFactory(count: number = 5) {
  return () => generateMenuOptions(count);
}

function createToggleElement(): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  return button;
}

function getPopoverElement(): IPopoverComponent {
  return document.querySelector(POPOVER_CONSTANTS.elementName) as IPopoverComponent;
}

function getChildPopupElement(childMenu: IMenuComponent): IPopoverComponent {
  return childMenu.popupElement as IPopoverComponent;
}

function getPopupList(popup?: IPopoverComponent): IListComponent {
  return (popup || getPopoverElement())!.querySelector('forge-list') as IListComponent;
}

function getPopupListItem(index: number): HTMLElement {
  return getPopupList().children[index] as HTMLElement;
}

function getChildMenuListItems(popup: IPopoverComponent): IListItemComponent[] {
  const childPopup = popup.querySelector(POPOVER_CONSTANTS.elementName) as IPopoverComponent;
  if (!childPopup) {
    return [];
  }
  const list = getPopupList(childPopup);
  return Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName));
}

async function clearPopups(): Promise<void> {
  const popups = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
  popups.forEach(p => p.remove());
}
