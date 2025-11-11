import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { nothing } from 'lit';
import { task } from '../core/utils/utils';
import { IMenuComponent } from './menu';
import { IMenuOption, MENU_CONSTANTS } from './menu-constants';
import { IPopoverComponent, POPOVER_CONSTANTS } from '../popover';
import { IListComponent, IListItemComponent, LIST_ITEM_CONSTANTS } from '../list';
import { ICON_CLASS_NAME } from '../constants';

import './menu';
import '../list/list-item';

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

      await expect(harness.menuEl).to.be.accessible();
    });

    it('should be accessible when open', async () => {
      const harness = await createFixture();

      await harness.openMenu();

      expect(harness.isOpen).to.be.true;
      await expect(document.body).to.be.accessible({ ignoredRules: ['region'] });
    });
  });

  describe('attributes', () => {
    describe('by default', () => {
      it('should be connected', async () => {
        const el = document.createElement('forge-menu') as IMenuComponent;
        document.body.appendChild(el);

        expect(el.isConnected).to.be.true;

        el.remove();
      });

      it('should have open set to false', async () => {
        const harness = await createFixture();

        expect(harness.menuEl.open).to.equal(false);
      });

      it('should have placement set to bottom-start', async () => {
        const harness = await createFixture();

        expect(harness.menuEl.placement).to.equal('bottom-start');
      });

      it('should have selected-index set -1', async () => {
        const harness = await createFixture();

        expect(harness.menuEl.selectedIndex).to.equal(-1);
      });

      it('should have dense set to false', async () => {
        const harness = await createFixture();

        expect(harness.menuEl.dense).to.equal(false);
      });

      it(`should have icon-class set to ${ICON_CLASS_NAME}`, async () => {
        const harness = await createFixture();

        expect(harness.menuEl.iconClass).to.equal(ICON_CLASS_NAME);
      });
    });

    describe('when setting dense', () => {
      it('should update the dense property', async () => {
        const harness = await createFixture();

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.DENSE, '');

        expect(harness.menuEl.dense).to.equal(true);
      });
    });

    describe('when setting open', () => {
      it('should update the open property', async () => {
        const harness = await createFixture();

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.OPEN, '');

        expect(harness.menuEl.open).to.equal(true);
      });
    });

    describe('when setting selected-index', () => {
      it('should update the selected-index property', async () => {
        const harness = await createFixture({ options: generateMenuOptions(3) });

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.SELECTED_INDEX, '2');

        expect(harness.menuEl.selectedIndex).to.equal(2);
      });
    });

    describe('when setting placement', () => {
      it('should update the placement property', async () => {
        const harness = await createFixture();

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.PLACEMENT, 'right-end');

        expect(harness.menuEl.placement).to.equal('right-end');
      });
    });

    describe('when setting icon-class', () => {
      it('should update the icon-class property', async () => {
        const harness = await createFixture();

        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.ICON_CLASS, ICON_CLASS_NAME);

        expect(harness.menuEl.iconClass).to.equal(ICON_CLASS_NAME);
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

        expect(harness.menuEl.dense).to.equal(true);
      });
    });

    describe('when setting open', () => {
      it('should update the open property', async () => {
        const harness = await createFixture();

        harness.menuEl.open = true;
        harness.menuEl.open = false;
        harness.menuEl.open = true;

        expect(harness.menuEl.open).to.equal(true);
      });
    });

    describe('when setting the persistSelection property', () => {
      it('should update the matching attribute', async () => {
        const harness = await createFixture();

        harness.menuEl.persistSelection = false;
        await elementUpdated(harness.menuEl);
        harness.menuEl.persistSelection = true;
        await elementUpdated(harness.menuEl);

        expect(harness.menuEl.persistSelection).to.equal(true);
        expect(harness.menuEl.hasAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION)).to.be.true;
      });
    });

    describe('when setting the persistSelection attribute', () => {
      it('should update the matching property', async () => {
        const harness = await createFixture();

        harness.menuEl.removeAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION);
        await elementUpdated(harness.menuEl);
        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION, '');
        await elementUpdated(harness.menuEl);

        expect(harness.menuEl.persistSelection).to.equal(true);
        expect(harness.menuEl.hasAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION)).to.be.true;
      });
    });

    describe('when setting selected-index', () => {
      it('should update the selected-index property', async () => {
        const harness = await createFixture({ options: generateMenuOptions(3) });

        harness.menuEl.selectedIndex = 1;
        harness.menuEl.selectedIndex = 2;

        expect(harness.menuEl.selectedIndex).to.equal(2);
      });
    });

    describe('when setting placement', () => {
      it('should update the placement property', async () => {
        const harness = await createFixture();

        harness.menuEl.placement = 'right-end';

        expect(harness.menuEl.placement).to.equal('right-end');
      });
    });

    describe('when setting icon-class', () => {
      it('should update the icon-class property', async () => {
        const harness = await createFixture();

        harness.menuEl.iconClass = ICON_CLASS_NAME;

        expect(harness.menuEl.iconClass).to.equal(ICON_CLASS_NAME);
      });
    });

    describe('when setting options', () => {
      it('should update the options property with list', async () => {
        const harness = await createFixture();

        harness.menuEl.options = generateMenuOptions(5);

        expect(harness.menuEl.options.length).to.equal(5);
      });

      it('should update the options property with factory', async () => {
        const harness = await createFixture({ options: null as any });

        harness.menuEl.options = asyncMenuOptionsFactory(5);

        expect((harness.menuEl as any)._core._optionsFactory).to.not.be.undefined;
        expect(harness.menuEl.options).to.deep.equal([]);
      });
    });
  });

  describe('toggle element', () => {
    it('should await dynamic toggle element', async () => {
      const el = await fixture<IMenuComponent>(html`<forge-menu></forge-menu>`);

      await elementUpdated(el);
      expect((el as any)._core._adapter.hasTargetElement()).to.be.false;

      const toggleElement = createToggleElement();
      el.appendChild(toggleElement);
      await elementUpdated(el);

      expect((el as any)._core._adapter.hasTargetElement()).to.be.true;
    });

    it('should await nested dynamic toggle element', async () => {
      const el = await fixture<IMenuComponent>(html`<forge-menu></forge-menu>`);

      const emptyContainer = document.createElement('div');
      el.appendChild(emptyContainer);
      await elementUpdated(el);

      expect((el as any)._core._adapter.hasTargetElement()).to.be.false;

      const toggleElement = createToggleElement();
      emptyContainer.appendChild(toggleElement);
      await elementUpdated(el);

      expect((el as any)._core._adapter.hasTargetElement()).to.be.true;
    });

    it('should close dropdown on blur when nested dynamic toggle element is provided', async () => {
      const el = await fixture<IMenuComponent>(html`<forge-menu></forge-menu>`);

      const emptyContainer = document.createElement('div');
      el.appendChild(emptyContainer);
      await elementUpdated(el);

      const toggleElement = createToggleElement();
      emptyContainer.appendChild(toggleElement);
      await elementUpdated(el);

      toggleElement.focus();
      toggleElement.click();
      expect(el.open).to.be.true;
      expect(document.activeElement).to.equal(toggleElement);

      toggleElement.blur();
      expect(el.open).to.be.false;
      expect(document.activeElement).not.to.equal(toggleElement);
    });

    it('when clicked should open the menu', async () => {
      const harness = await createFixture();

      await harness.clickElement(harness.triggerEl);

      expect(harness.menuEl.open).to.be.true;
    });

    it('when clicked should open the menu with options factory', async () => {
      const harness = await createFixture();

      harness.menuEl.options = asyncMenuOptionsFactory();
      await harness.clickElement(harness.triggerEl);

      expect(harness.menuEl.open).to.be.true;
    });

    it('when clicked should open the menu with options', async () => {
      const harness = await createFixture({ options: generateMenuOptions() });

      await harness.clickElement(harness.triggerEl);

      expect(harness.menuEl.open).to.be.true;
    });

    it('when clicked twice should open then close the menu', async () => {
      const harness = await createFixture();

      await harness.clickElement(harness.triggerEl);
      expect(harness.menuEl.open).to.be.true;

      await harness.clickElement(harness.triggerEl);
      expect(harness.menuEl.open).to.be.false;
    });
  });

  describe('options', () => {
    it('should load async when factory', async () => {
      const harness = await createFixture();

      harness.menuEl.options = menuOptionsFactory();
      await elementUpdated(harness.menuEl);

      harness.menuEl.open = true;
      expect(harness.menuEl.open).to.be.true;
    });

    it('should close menu if no options', async () => {
      const harness = await createFixture();

      harness.menuEl.options = () => [];
      await elementUpdated(harness.menuEl);

      harness.menuEl.open = true;
      await elementUpdated(harness.menuEl);

      expect(harness.menuEl.open).to.be.false;
    });

    it('should load menu with leading builder', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      options[6].leadingBuilder = () => document.createElement('a');

      await elementUpdated(harness.menuEl);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await elementUpdated(harness.menuEl);
      expect(harness.menuEl.open).to.be.true;
    });

    it('should have disabled class when option is set to disabled', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);
      options[5].disabled = true;

      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(getPopupListItem(5).querySelector('button')?.hasAttribute('disabled')).to.be.true;
    });

    it('should have selected class when option is set to selected and persistSelection is true', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      harness.menuEl.persistSelection = true;
      options[5].selected = true;
      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).to.be.true;
    });

    it('should not have selected class when option is set to selected and persistSelection is false', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      harness.menuEl.persistSelection = false;
      options[5].selected = true;
      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).to.be.false;
    });

    it('should not have selected class when option is set to selected and persistSelection is switched from true to false', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      harness.menuEl.persistSelection = true;
      options[5].selected = true;
      harness.menuEl.options = options;
      await elementUpdated(harness.menuEl);
      harness.menuEl.persistSelection = false;
      harness.menuEl.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).to.be.false;
    });

    it('should use option builder', async () => {
      const harness = await createFixture();

      const optionBuilderSpy = spy((option: IMenuOption, listItem: HTMLElement) => {
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
      await elementUpdated(harness.menuEl);

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];

      expect(optionBuilderSpy.callCount).to.equal(options.length);
      options.forEach((option, index) => {
        expect(listItems[index].textContent).to.equal(`Custom option: ${option.label}`);
      });
    });

    it('should reset options with leading icon if set while dropdown is open', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(1);

      await elementUpdated(harness.menuEl);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await elementUpdated(harness.menuEl);

      const newOptions = generateMenuOptions(1);
      newOptions[0].icon = 'code';
      harness.menuEl.options = newOptions;

      await elementUpdated(harness.menuEl);

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const leadingIconEl = listItems[0].querySelector('i[slot=leading]');

      expect(leadingIconEl).to.exist;
      expect(leadingIconEl?.textContent).to.equal('code');
    });

    it(`should load leading icons from options factory based on 'leadingIcon' or 'icon' property`, async () => {
      const harness = await createFixture();
      const options = (): IMenuOption[] => [
        { icon: 'code', value: '', label: '1' },
        { leadingIcon: 'code', value: '', label: '2' }
      ];

      await elementUpdated(harness.menuEl);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await elementUpdated(harness.menuEl);

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const leadingIcons = listItems.map(listItem => listItem.querySelector('i[slot=leading]'));

      expect(leadingIcons[0]).to.exist;
      expect(leadingIcons[1]).to.exist;
    });
  });

  describe('events', () => {
    describe('keyboard', () => {
      it('arrow down from the start should activate the first list element', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        await harness.clickElement(harness.triggerEl);
        await task(300);
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));

        expect(getPopupListItem(0).hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).to.be.true;
      });

      it('arrow up from the start should activate the last list element', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        await harness.clickElement(harness.triggerEl);
        await task(300);
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));

        expect(getPopupListItem(6).hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).to.be.true;
      });

      it('enter should select the list element when persistSelection is true', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.menuEl.persistSelection = true;
        await harness.clickElement(harness.triggerEl);
        await task(300);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

        expect(harness.menuEl.selectedIndex).to.equal(0);
      });

      it('enter should select the list element when persistSelection is false', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.menuEl.persistSelection = false;
        await harness.clickElement(harness.triggerEl);
        await task(300);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

        expect(harness.menuEl.selectedIndex).to.equal(-1);
      });

      it('space should toggle the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(harness.menuEl.open).to.be.true;

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(harness.menuEl.open).to.be.false;
      });

      it('tab should close the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.menuEl.open = true;

        await task(POPOVER_ANIMATION_DURATION);
        harness.triggerEl.focus();
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        harness.triggerEl.blur();
        await elementUpdated(harness.menuEl);

        expect(harness.menuEl.open).to.be.false;
      });

      it('should not select active item when tab key is pressed while dropdown is open', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.triggerEl.focus();
        await harness.clickElement(harness.triggerEl);

        const selectSpy = spy();
        harness.menuEl.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

        await task(POPOVER_ANIMATION_DURATION);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        await elementUpdated(harness.menuEl);

        expect(selectSpy).not.to.have.been.called;
      });

      it('should highlight first option when opened via down arrow key', async () => {
        const harness = await createFixture({ options: generateMenuOptions(3) });

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));

        await task(POPOVER_ANIMATION_DURATION);

        const firstListItem = getPopupListItem(0) as IListItemComponent;
        expect(firstListItem.active).to.be.true;
      });

      it('escape should close the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.triggerEl.focus();
        await harness.clickElement(harness.triggerEl);

        harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        await elementUpdated(harness.menuEl);

        expect(harness.menuEl.open).to.be.false;
      });

      it('blur should close the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });

        harness.menuEl.open = true;
        await task(300);

        getPopupListItem(0).querySelector('button')?.click();

        await task(300);

        expect(harness.menuEl.open).to.be.false;
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

      await elementUpdated(harness.menuEl);

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.tagName.toLowerCase()).to.equal(MENU_CONSTANTS.elementName);

      const menuTrigger = childMenuComponent.querySelector('button') as HTMLButtonElement;
      expect(menuTrigger.tagName.toLowerCase()).to.equal('button');

      menuTrigger.dispatchEvent(new MouseEvent('mouseenter'));
      await elementUpdated(harness.menuEl);

      expect(childMenuComponent.open).to.be.true;
      expect(childMenuComponent.mode).to.equal('cascade');

      const childMenuListItems = getChildMenuListItems(getPopoverElement());
      expect(childMenuListItems.length).to.equal(CHILD_MENU_OPTION_COUNT);
    });

    it('should hide child menu on mouseleave', async () => {
      const harness = await createFixture();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await elementUpdated(harness.menuEl);

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const menuTrigger = childMenuComponent.querySelector('button') as HTMLButtonElement;

      menuTrigger.dispatchEvent(new MouseEvent('mouseenter'));
      await elementUpdated(harness.menuEl);
      expect(childMenuComponent.open).to.be.true;

      menuTrigger.dispatchEvent(new MouseEvent('mouseleave'));
      await task(MENU_CONSTANTS.numbers.CHILD_MOUSE_LEAVE_TIMEOUT);
      await elementUpdated(harness.menuEl);
      expect(childMenuComponent.open).to.be.false;
    });

    it('should hide child menu if mouse leaves popup after threshold', async () => {
      const harness = await createFixture();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await elementUpdated(harness.menuEl);

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const menuTrigger = childMenuComponent.querySelector('button') as HTMLButtonElement;

      menuTrigger.dispatchEvent(new MouseEvent('mouseenter'));

      await elementUpdated(harness.menuEl);

      const childMenuPopup = getChildPopupElement(childMenuComponent);
      childMenuPopup.dispatchEvent(new MouseEvent('mouseenter'));
      expect(childMenuComponent.open).to.be.true;

      await elementUpdated(harness.menuEl);

      menuTrigger.dispatchEvent(new MouseEvent('mouseleave'));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 0, pageY: 0 } as MouseEventInit));
      childMenuPopup.dispatchEvent(new MouseEvent('mouseleave'));

      await task(MENU_CONSTANTS.numbers.POPUP_MOUSE_LEAVE_TIMEOUT * 2);
      await elementUpdated(harness.menuEl);

      expect(childMenuComponent.open).to.be.false;
    });

    it('should select option in child menu', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(3);
      const childOptions = generateMenuOptions(2);
      const EXPECTED_SELECTION_VALUE = childOptions[1].value;
      options[1].options = childOptions;

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      const selectSpy = spy();
      harness.menuEl.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

      await elementUpdated(harness.menuEl);

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const menuTrigger = childMenuComponent.querySelector('button') as HTMLButtonElement;

      menuTrigger.dispatchEvent(new MouseEvent('mouseenter'));
      await elementUpdated(harness.menuEl);

      const childMenuListItems = getChildMenuListItems(getPopoverElement());
      childMenuListItems[1].dispatchEvent(new MouseEvent('click'));

      expect(selectSpy).to.have.been.calledOnce;
      expect(selectSpy.firstCall.args[0].detail).to.deep.include({
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

      await elementUpdated(harness.menuEl);
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await elementUpdated(harness.menuEl);

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.open).to.be.true;

      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      await elementUpdated(harness.menuEl);

      expect(childMenuComponent.open).to.be.false;
    });

    it('should select child option with arrow key', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(2);
      const EXPECTED_SELECTION_VALUE = (options[1].options[0] as IMenuOption).value;

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      const selectSpy = spy();
      harness.menuEl.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

      await elementUpdated(harness.menuEl);

      harness.triggerEl.focus();
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await elementUpdated(harness.menuEl);

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.open).to.be.true;

      await elementUpdated(harness.menuEl);
      harness.triggerEl.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

      expect(harness.menuEl.open).to.be.false;
      expect(selectSpy).to.have.been.calledOnce;
      expect(selectSpy.firstCall.args[0].detail).to.deep.include({
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
      await elementUpdated(harness.menuEl);

      const popover = getPopoverElement();

      expect(harness.menuEl.popoverFlip).to.equal('never');
      expect(popover.flip).to.equal('never');
    });

    it('should set popover flip from attribute', async () => {
      const harness = await createFixture({ options: generateMenuOptions(1) });

      harness.menuEl.setAttribute('popover-flip', 'never');
      harness.menuEl.open = true;
      await elementUpdated(harness.menuEl);

      const popover = getPopoverElement();

      expect(harness.menuEl.popoverFlip).to.equal('never');
      expect(popover.flip).to.equal('never');
    });

    it('should set popover shift', async () => {
      const harness = await createFixture({ options: generateMenuOptions(1) });

      harness.menuEl.popoverShift = 'never';
      harness.menuEl.open = true;
      await elementUpdated(harness.menuEl);

      const popover = getPopoverElement();

      expect(harness.menuEl.popoverShift).to.equal('never');
      expect(popover.shift).to.equal('never');
    });

    it('should set popover shift from attribute', async () => {
      const harness = await createFixture({ options: generateMenuOptions(1) });

      harness.menuEl.setAttribute('popover-shift', 'never');
      harness.menuEl.open = true;
      await elementUpdated(harness.menuEl);

      const popover = getPopoverElement();

      expect(harness.menuEl.popoverShift).to.equal('never');
      expect(popover.shift).to.equal('never');
    });
  });

  describe('popup target', () => {
    it('should have popup target property null by default', async () => {
      const harness = await createFixture();

      expect(harness.menuEl.popupTarget).to.equal(null);
    });

    it('should set popup target via attribute', async () => {
      const harness = await createFixture({ popupTarget: 'custom-target' });

      expect(harness.menuEl.popupTarget).to.equal('custom-target');
      expect(harness.menuEl.getAttribute(MENU_CONSTANTS.attributes.POPUP_TARGET)).to.equal('custom-target');
    });

    it('should set popup target via property', async () => {
      const harness = await createFixture();

      harness.menuEl.popupTarget = 'custom-target';

      expect(harness.menuEl.popupTarget).to.equal('custom-target');
      expect(harness.menuEl.getAttribute(MENU_CONSTANTS.attributes.POPUP_TARGET)).to.equal('custom-target');
    });

    it('should position menu relative to popup target element when specified', async () => {
      const container = await fixture(html`
        <div>
          <div id="position-target" style="position: absolute; top: 100px; left: 100px; width: 200px; height: 50px;"></div>
          <forge-menu popup-target="position-target" .options=${OPTIONS}>
            <button type="button">Menu</button>
          </forge-menu>
        </div>
      `);

      const menuEl = container.querySelector('forge-menu') as IMenuComponent;
      const triggerEl = menuEl.querySelector('button') as HTMLButtonElement;
      const targetEl = container.querySelector('#position-target') as HTMLElement;

      await clickElement(triggerEl);
      await elementUpdated(menuEl);
      await new Promise(resolve => setTimeout(resolve, 500));

      const popover = menuEl.popupElement as IPopoverComponent;
      expect(popover).to.exist;
      expect(popover.anchorElement).to.equal(targetEl);
    });

    it('should set aria-expanded on trigger button and not on popup target element', async () => {
      const container = await fixture(html`
        <div>
          <div id="position-target"></div>
          <forge-menu popup-target="position-target" .options=${OPTIONS}>
            <button type="button">Menu</button>
          </forge-menu>
        </div>
      `);

      const menuEl = container.querySelector('forge-menu') as IMenuComponent;
      const triggerEl = menuEl.querySelector('button') as HTMLButtonElement;
      const targetEl = container.querySelector('#position-target') as HTMLElement;

      await clickElement(triggerEl);
      await elementUpdated(menuEl);
      await new Promise(resolve => setTimeout(resolve, 500));

      expect(triggerEl.getAttribute('aria-expanded')).to.equal('true');
      expect(targetEl.hasAttribute('aria-expanded')).to.be.false;
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
    await elementUpdated(harness.menuEl);

    const popover = getPopoverElement();
    expect(popover).to.exist;

    harness.menuEl.remove();
    await elementUpdated(harness.menuEl);

    expect(popover.isConnected).to.be.false;
  });
});

class MenuHarness {
  constructor(
    public menuEl: IMenuComponent,
    public triggerEl: HTMLButtonElement
  ) {}

  public async openMenu(): Promise<void> {
    await this.clickElement(this.triggerEl);
    await elementUpdated(this.menuEl);
    await this.dropdownAnimation();
  }

  public async dropdownAnimation(): Promise<void> {
    await elementUpdated(this.menuEl);
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

  public clickElement(element: HTMLElement): Promise<void> {
    const { x, y, width, height } = element.getBoundingClientRect();
    return sendMouse({
      type: 'click',
      position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
    });
  }
}

interface MenuFixtureConfig {
  options?: IMenuOption[];
  popupTarget?: string;
}

async function createFixture({ options = OPTIONS, popupTarget }: MenuFixtureConfig = {}): Promise<MenuHarness> {
  const optionsValue = options === null ? nothing : options;
  const el = await fixture<IMenuComponent>(html`
    <forge-menu .options=${optionsValue} popup-target=${popupTarget ?? nothing}>
      <button type="button">Menu</button>
    </forge-menu>
  `);
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

function clickElement(element: HTMLElement): Promise<void> {
  const { x, y, width, height } = element.getBoundingClientRect();
  return sendMouse({
    type: 'click',
    position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
  });
}
