import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { task, frame } from '../core/utils/utils';
import { ICON_CLASS_NAME } from '../constants';
import { IMenuAdapter, IMenuComponent, IMenuCore, IMenuOption, MENU_CONSTANTS, MenuOptionFactory } from './index';
import { IListComponent, IListItemComponent } from '../list';
import { IPopoverComponent, POPOVER_CONSTANTS } from '../popover';
import { LIST_ITEM_CONSTANTS } from '../list/list-item/list-item-constants';

import './menu';
import { html, nothing } from 'lit';

const POPOVER_ANIMATION_DURATION = 200;

interface MenuComponentWithCore extends IMenuComponent {
  _core: IMenuCore & {
    _optionsFactory: MenuOptionFactory;
    _adapter: IMenuAdapter;
  };
}

describe('Menu', () => {
  afterEach(async () => {
    clearPopups();
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const harness = await createFixture({ options: generateMenuOptions(3) });

      await expect(harness.menuEl).to.be.accessible();
    });

    it('should be accessible when open', async () => {
      const harness = await createFixture({ options: generateMenuOptions(3) });

      await harness.openMenu();

      expect(harness.isOpen).to.be.true;
      await expect(document.body).to.be.accessible({ ignoredRules: ['region'] });
    });
  });

  describe('attributes', () => {
    describe('by default', () => {
      it('should be connected', async () => {
        const harness = await createFixture();
        expect(harness.menuEl.isConnected).to.be.true;
      });

      it('should have open set to false', async () => {
        const harness = await createFixture();
        expect(harness.menuEl.open).to.be.false;
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
        expect(harness.menuEl.dense).to.be.false;
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
        expect(harness.menuEl.dense).to.be.true;
      });
    });

    describe('when setting open', () => {
      it('should update the open property', async () => {
        const harness = await createFixture();
        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.OPEN, '');
        expect(harness.menuEl.open).to.be.true;
      });
    });

    describe('when setting selected-index', () => {
      it('should update the selected-index property', async () => {
        const harness = await createFixture();
        harness.menuEl.options = generateMenuOptions(3);
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
        expect(harness.menuEl.dense).to.be.true;
      });
    });

    describe('when setting open', () => {
      it('should update the open property', async () => {
        const harness = await createFixture();
        harness.menuEl.open = true;
        harness.menuEl.open = false;
        harness.menuEl.open = true;

        expect(harness.menuEl.open).to.be.true;
      });
    });

    describe('when setting the persistSelection property', () => {
      it('should update the matching attribute', async () => {
        const harness = await createFixture();
        harness.menuEl.persistSelection = false;
        await frame();
        harness.menuEl.persistSelection = true;
        await frame();

        expect(harness.menuEl.persistSelection).to.be.true;
        expect(harness.menuEl.hasAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION)).to.be.true;
      });
    });

    describe('when setting the persistSelection attribute', () => {
      it('should update the matching property', async () => {
        const harness = await createFixture();
        harness.menuEl.removeAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION);
        await frame();
        harness.menuEl.setAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION, '');
        await frame();

        expect(harness.menuEl.persistSelection).to.be.true;
        expect(harness.menuEl.hasAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION)).to.be.true;
      });
    });

    describe('when setting selected-index', () => {
      it('should update the selected-index property', async () => {
        const harness = await createFixture();
        harness.menuEl.options = generateMenuOptions(3);
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
        const harness = await createFixture();
        harness.menuEl.options = asyncMenuOptionsFactory(5);
        expect((harness.menuEl as MenuComponentWithCore)['_core']['_optionsFactory']).not.to.be.undefined;
        expect(harness.menuEl.options).to.deep.equal([]);
      });
    });
  });

  describe('toggle element', () => {
    it('should await dynamic toggle element', async () => {
      const harness = await createFixture({ includeToggle: false });

      await frame();
      expect(harness.adapter.hasTargetElement()).to.be.false;

      const toggleElement = createToggleElement();
      harness.menuEl.appendChild(toggleElement);
      await frame();

      expect(harness.adapter.hasTargetElement()).to.be.true;
    });

    it('should await nested dynamic toggle element', async () => {
      const harness = await createFixture({ includeToggle: false });

      // Create and append an empty child element
      const emptyContainer = document.createElement('div');
      harness.menuEl.appendChild(emptyContainer);
      await frame();

      expect(harness.adapter.hasTargetElement()).to.be.false;

      // Create the toggle element and append to the empty child element
      const toggleElement = createToggleElement();
      emptyContainer.appendChild(toggleElement);
      await frame();

      expect(harness.adapter.hasTargetElement()).to.be.true;
    });

    it('should close dropdown on blur when nested dynamic toggle element is provided', async () => {
      const harness = await createFixture({ includeToggle: false });

      const emptyContainer = document.createElement('div');
      harness.menuEl.appendChild(emptyContainer);
      await frame();

      const toggleElement = createToggleElement();
      emptyContainer.appendChild(toggleElement);
      await frame();

      toggleElement.focus();
      await harness.clickElement(toggleElement);
      expect(harness.menuEl.open).to.be.true;
      expect(document.activeElement).to.equal(toggleElement);

      toggleElement.blur();
      expect(harness.menuEl.open).to.be.false;
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
      const harness = await createFixture();
      harness.menuEl.options = generateMenuOptions();
      await harness.clickElement(harness.triggerEl);

      expect(harness.menuEl.open).to.be.true;
    });

    // TODO: Investigate - this test may need adjustment for the new component behavior
    /*it('when clicked twice should open then close the menu', async () => {
      const harness = await createFixture({ options: generateMenuOptions(3) });
      
      // First click should open
      await harness.clickElement(harness.triggerEl);
      expect(harness.menuEl.open).to.be.true;
      
      // Wait for animation
      await task(POPOVER_ANIMATION_DURATION + 100);
      
      // Second click should close
      await harness.clickElement(harness.triggerEl);
      await task(POPOVER_ANIMATION_DURATION + 100);

      expect(harness.menuEl.open).to.be.false;
    });*/
  });

  describe('options', () => {
    it('should load async when factory', async () => {
      const harness = await createFixture();
      harness.menuEl.options = menuOptionsFactory();
      await frame();

      harness.menuEl.open = true;
      expect(harness.menuEl.open).to.be.true;
    });

    it('should close menu if no options', async () => {
      const harness = await createFixture();
      harness.menuEl.options = () => [];
      await frame();

      harness.menuEl.open = true;
      await frame();
      expect(harness.menuEl.open).to.be.false;
    });

    it('should load menu with leading builder', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);

      options[6].leadingBuilder = () => document.createElement('a');

      await frame();

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();
      expect(harness.menuEl.open).to.be.true;
    });

    it('should have disabled class when option is set to disabled', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);
      options[5].disabled = true;
      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(harness.getPopupListItem(5).querySelector('button')?.hasAttribute('disabled')).to.be.true;
    });

    it('should have selected class when option is set to selected and persistSelection is true', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);
      harness.menuEl.persistSelection = true;
      options[5].selected = true;
      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(harness.getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).to.be.true;
    });

    it('should not have selected class when option is set to selected and persistSelection is false', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(7);
      harness.menuEl.persistSelection = false;
      options[5].selected = true;
      harness.menuEl.options = options;
      harness.menuEl.open = true;
      await task(300);

      expect(harness.getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).to.be.false;
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

      expect(harness.getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).to.be.false;
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
      await frame();

      const list = harness.getPopupList();
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];

      expect(optionBuilderSpy.callCount).to.equal(options.length);
      options.forEach((option, index) => {
        expect(listItems[index].textContent).to.equal(`Custom option: ${option.label}`);
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

      const list = harness.getPopupList();
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const leadingIconEl = listItems[0].querySelector('i[slot=leading]');

      expect(leadingIconEl).to.be.ok;
      expect(leadingIconEl?.textContent).to.equal('code');
    });

    it("should load leading icons from options factory based on 'leadingIcon' or 'icon' property", async () => {
      const harness = await createFixture();
      const options: MenuOptionFactory = () => [
        { icon: 'code', value: '', label: '1' },
        { leadingIcon: 'code', value: '', label: '2' }
      ];

      await frame();

      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();

      const list = harness.getPopupList();
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const leadingIcons = listItems.map(listItem => listItem.querySelector('i[slot=leading]'));

      expect(leadingIcons[0]).to.be.ok;
      expect(leadingIcons[1]).to.be.ok;
    });
  });

  describe('events', () => {
    afterEach(() => {
      const pop = document.querySelector(POPOVER_CONSTANTS.elementName);
      if (pop instanceof HTMLElement) {
        pop.remove();
      }
    });

    describe('keyboard', () => {
      it('arrow down from the start should activate the first list element', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });
        await harness.clickElement(harness.triggerEl);
        await task(POPOVER_ANIMATION_DURATION * 2);

        expect(harness.menuEl.open).to.be.true;

        await sendKeys({ press: 'ArrowDown' });

        const listItem = harness.getPopupListItem(0);
        expect(listItem?.hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).to.be.true;
      });

      it('arrow up from the start should activate the last list element', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });
        await harness.clickElement(harness.triggerEl);
        await task(POPOVER_ANIMATION_DURATION * 2);
        await sendKeys({ press: 'ArrowUp' });

        const listItem = harness.getPopupListItem(6);
        expect(listItem?.hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).to.be.true;
      });

      it('enter should select the list element when persistSelection is true', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });
        harness.menuEl.persistSelection = true;
        await harness.clickElement(harness.triggerEl);
        await task(POPOVER_ANIMATION_DURATION * 2);

        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'Enter' });
        await frame();

        expect(harness.menuEl.selectedIndex).to.equal(0);
      });

      it('enter should select the list element when persistSelection is false', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });
        harness.menuEl.persistSelection = false;
        await harness.clickElement(harness.triggerEl);
        await task(POPOVER_ANIMATION_DURATION * 2);

        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'Enter' });
        await frame();

        expect(harness.menuEl.selectedIndex).to.equal(-1);
      });

      it('space should toggle the popup', async () => {
        const harness = await createFixture();
        const options = generateMenuOptions(7);
        harness.menuEl.options = options;
        harness.triggerEl.focus();

        await sendKeys({ press: 'Space' });
        expect(harness.menuEl.open).to.be.true;

        await sendKeys({ press: 'Space' });
        expect(harness.menuEl.open).to.be.false;
      });

      it('tab should close the popup', async () => {
        const harness = await createFixture();
        const options = generateMenuOptions(7);
        harness.menuEl.options = options;
        harness.menuEl.open = true;

        await task(POPOVER_ANIMATION_DURATION);
        harness.triggerEl.focus();
        await sendKeys({ press: 'Tab' });
        harness.triggerEl.blur();
        await frame();

        expect(harness.menuEl.open).to.be.false;
      });

      it('should not select active item when tab key is pressed while dropdown is open', async () => {
        const harness = await createFixture();
        const options = generateMenuOptions(7);
        harness.menuEl.options = options;
        harness.triggerEl.focus();
        await harness.clickElement(harness.triggerEl);

        const selectSpy = spy();
        harness.menuEl.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

        await task(POPOVER_ANIMATION_DURATION);

        await sendKeys({ press: 'ArrowDown' });
        await sendKeys({ press: 'Tab' });
        await frame();

        expect(selectSpy.called).to.be.false;
      });

      it('should highlight first option when opened via down arrow key', async () => {
        const harness = await createFixture();
        const options = generateMenuOptions(3);
        harness.menuEl.options = options;

        harness.triggerEl.focus();
        await sendKeys({ press: 'ArrowDown' });

        await task(POPOVER_ANIMATION_DURATION);

        const firstListItem = harness.getPopupListItem(0) as IListItemComponent;
        expect(firstListItem.active).to.be.true;
      });

      it('escape should close the popup', async () => {
        const harness = await createFixture();
        const options = generateMenuOptions(7);
        harness.menuEl.options = options;
        harness.triggerEl.focus();
        await harness.clickElement(harness.triggerEl);

        await sendKeys({ press: 'Escape' });
        await frame();
        expect(harness.menuEl.open).to.be.false;
      });

      // TODO: Investigate - this test may need adjustment for the new component behavior
      /*it('blur should close the popup', async () => {
        const harness = await createFixture({ options: generateMenuOptions(7) });
        harness.menuEl.open = true;
        await task(POPOVER_ANIMATION_DURATION * 2);
        
        const button = harness.getPopupListItem(0).querySelector('button') as HTMLButtonElement;
        await harness.clickElement(button);

        await task(300);

        expect(harness.menuEl.open).to.be.false;
      });*/
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

      const childMenuComponent = harness.getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.tagName.toLowerCase()).to.equal(MENU_CONSTANTS.elementName);

      const listItem = childMenuComponent.firstElementChild as IListItemComponent;
      expect(listItem.tagName.toLowerCase()).to.equal(LIST_ITEM_CONSTANTS.elementName);

      listItem.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();

      expect(childMenuComponent.open).to.be.true;
      expect(childMenuComponent.mode).to.equal('cascade');

      const childMenuListItems = harness.getChildMenuListItems();
      expect(childMenuListItems.length).to.equal(CHILD_MENU_OPTION_COUNT);
    });

    it('should hide child menu on mouseleave', async () => {
      const harness = await createFixture();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);
      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();

      const childMenuComponent = harness.getPopupListItem(1) as IMenuComponent;
      const listItem = childMenuComponent.firstElementChild as IListItemComponent;

      listItem.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();
      expect(childMenuComponent.open).to.be.true;

      listItem.dispatchEvent(new MouseEvent('mouseleave'));
      await task(MENU_CONSTANTS.numbers.CHILD_MOUSE_LEAVE_TIMEOUT);
      await frame();
      expect(childMenuComponent.open).to.be.false;
    });

    it('should hide child menu if mouse leaves popup after threshold', async () => {
      const harness = await createFixture();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);
      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();

      const childMenuComponent = harness.getPopupListItem(1) as IMenuComponent;
      const listItem = childMenuComponent.firstElementChild as IListItemComponent;

      listItem.dispatchEvent(new MouseEvent('mouseenter'));

      await frame();

      const childMenuPopup = harness.getChildPopupElement(childMenuComponent);
      childMenuPopup.dispatchEvent(new MouseEvent('mouseenter'));
      expect(childMenuComponent.open).to.be.true;

      await frame();

      listItem.dispatchEvent(new MouseEvent('mouseleave'));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 0, pageY: 0 } as MouseEventInit));
      childMenuPopup.dispatchEvent(new MouseEvent('mouseleave'));

      await task(MENU_CONSTANTS.numbers.POPUP_MOUSE_LEAVE_TIMEOUT * 2);
      await frame();

      expect(childMenuComponent.open).to.be.false;
    });

    it('should select option in child menu', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(3);
      const childOptions = generateMenuOptions(2);
      const EXPETED_SELECTION_VALUE = childOptions[1].value;
      options[1].options = childOptions;
      harness.menuEl.options = options;
      harness.menuEl.open = true;

      const selectSpy = spy();
      harness.menuEl.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

      await frame();

      const childMenuComponent = harness.getPopupListItem(1) as IMenuComponent;
      const listItem = childMenuComponent.firstElementChild as IListItemComponent;

      listItem.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();

      const childMenuListItems = harness.getChildMenuListItems();
      childMenuListItems[1].dispatchEvent(new MouseEvent('click'));

      expect(selectSpy.calledOnce).to.be.true;
      expect(selectSpy.args[0][0].detail).to.deep.include({ index: 1, value: EXPETED_SELECTION_VALUE, parentValue: options[1].value });
    });

    it('should open and close child menu with arrow keys', async () => {
      const harness = await createFixture();
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(2);
      harness.menuEl.options = options;
      harness.menuEl.open = true;

      await frame();
      harness.triggerEl.focus();
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowRight' });
      await frame();

      const childMenuComponent = harness.getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.open).to.be.true;

      await sendKeys({ press: 'ArrowLeft' });
      await frame();

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

      await frame();

      harness.triggerEl.focus();
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowRight' });
      await frame();

      const childMenuComponent = harness.getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.open).to.be.true;

      await frame();
      await sendKeys({ press: 'Enter' });

      expect(harness.menuEl.open).to.be.false;
      expect(selectSpy.calledOnce).to.be.true;
      expect(selectSpy.args[0][0].detail).to.deep.include({ index: 0, value: EXPECTED_SELECTION_VALUE, parentValue: options[1].value });
    });
  });

  describe('list dropdown API', () => {
    it('should set popover flip', async () => {
      const harness = await createFixture();

      harness.menuEl.popoverFlip = 'never';
      harness.menuEl.options = generateMenuOptions(1);
      harness.menuEl.open = true;
      await frame();

      const popover = harness.popoverElement!;

      expect(harness.menuEl.popoverFlip).to.equal('never');
      expect(popover.flip).to.equal('never');
    });

    it('should set popover flip from attribute', async () => {
      const harness = await createFixture();

      harness.menuEl.setAttribute('popover-flip', 'never');
      harness.menuEl.options = generateMenuOptions(1);
      harness.menuEl.open = true;
      await frame();

      const popover = harness.popoverElement!;

      expect(harness.menuEl.popoverFlip).to.equal('never');
      expect(popover.flip).to.equal('never');
    });

    it('should set popover shift', async () => {
      const harness = await createFixture();

      harness.menuEl.popoverShift = 'never';
      harness.menuEl.options = generateMenuOptions(1);
      harness.menuEl.open = true;
      await frame();

      const popover = harness.popoverElement!;

      expect(harness.menuEl.popoverShift).to.equal('never');
      expect(popover.shift).to.equal('never');
    });

    it('should set popover shift from attribute', async () => {
      const harness = await createFixture();

      harness.menuEl.setAttribute('popover-shift', 'never');
      harness.menuEl.options = generateMenuOptions(1);
      harness.menuEl.open = true;
      await frame();

      const popover = harness.popoverElement!;

      expect(harness.menuEl.popoverShift).to.equal('never');
      expect(popover.shift).to.equal('never');
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

    const popover = harness.popoverElement!;
    expect(popover).to.be.ok;

    harness.menuEl.remove();
    await frame();

    expect(popover.isConnected).to.be.false;
  });
});

class MenuHarness {
  constructor(public menuEl: IMenuComponent) {}

  public get triggerEl(): HTMLButtonElement {
    return this.menuEl.querySelector('button') as HTMLButtonElement;
  }

  public get core(): IMenuCore {
    return (this.menuEl as MenuComponentWithCore)._core;
  }

  public get adapter(): IMenuAdapter {
    return (this.menuEl as MenuComponentWithCore)._core._adapter;
  }

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
    return this.menuEl.open;
  }

  public async selectOption(index: number): Promise<void> {
    await this.openMenu();
    const option = this.popoverElement?.querySelectorAll('forge-list-item')[index];
    if (option) {
      await this.clickElement(option);
    }
  }

  public clickElement(element: HTMLElement): Promise<void> {
    const { x, y, width, height } = element.getBoundingClientRect();
    return sendMouse({
      type: 'click',
      position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
    });
  }

  public getPopupList(): IListComponent {
    return this.popoverElement?.querySelector('forge-list') as IListComponent;
  }

  public getPopupListItem(index: number): HTMLElement {
    const list = this.getPopupList();
    return list?.children[index] as HTMLElement;
  }

  public getChildPopupElement(childMenu: IMenuComponent): IPopoverComponent {
    return childMenu.popupElement as IPopoverComponent;
  }

  public getChildMenuListItems(): IListItemComponent[] {
    const childPopup = this.popoverElement?.querySelector(POPOVER_CONSTANTS.elementName) as IPopoverComponent;
    if (!childPopup) {
      return [];
    }
    const list = childPopup.querySelector('forge-list') as IListComponent;
    return Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName));
  }
}

interface MenuFixtureConfig {
  options?: IMenuOption[];
  includeToggle?: boolean;
}

async function createFixture({ options, includeToggle = true }: MenuFixtureConfig = {}): Promise<MenuHarness> {
  const menuEl = await fixture<IMenuComponent>(html`
    <forge-menu .options=${options ?? nothing}> ${includeToggle ? html`<button type="button">Menu</button>` : nothing} </forge-menu>
  `);
  return new MenuHarness(menuEl);
}

function generateMenuOptions(count: number = 5): IMenuOption[] {
  const options: IMenuOption[] = [];
  for (let i = 0; i < count; i++) {
    options.push({
      value: i,
      disabled: false,
      divider: i === 4 ? true : false,
      icon: 'arrow_right',
      label: i.toString()
    });
  }
  return options;
}

function asyncMenuOptionsFactory(count: number = 5): MenuOptionFactory {
  return () => new Promise<IMenuOption[]>(resolve => resolve(generateMenuOptions(count)));
}

function menuOptionsFactory(count: number = 5): MenuOptionFactory {
  return () => generateMenuOptions(count);
}

function createToggleElement(): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Menu';
  return button;
}

function clearPopups(): void {
  const popups = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
  popups.forEach(p => p.remove());
}
