/// <reference types="jasmine" />
import {
  defineMenuComponent,
  IListComponent,
  IListItemComponent,
  IMenuAdapter,
  IMenuComponent,
  IMenuCore,
  IMenuOption,
  IPopoverComponent,
  POPOVER_CONSTANTS,
  LIST_ITEM_CONSTANTS,
  MENU_CONSTANTS,
  MenuOptionFactory
} from '@tylertech/forge';
import { task, frame } from '@tylertech/forge/core/utils/utils';
import { ICON_CLASS_NAME } from '@tylertech/forge/constants';

const POPOVER_ANIMATION_DURATION = 200;

interface ITestContext {
  context: ITestMenuContext;
}

interface MenuComponentWithCore extends IMenuComponent {
  _core: IMenuCore & {
    _optionsFactory: MenuOptionFactory;
    _adapter: IMenuAdapter;
  };
}

interface ITestMenuContext {
  component: IMenuComponent;
  core: IMenuCore;
  adapter: IMenuAdapter;
  fixture: HTMLElement;
  getToggleElement(): HTMLElement;
  destroy(): void;
}

describe('MenuComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineMenuComponent();
    clearPopups();
  });

  afterEach(function(this: ITestContext) {
    clearPopups();
    this.context.destroy();
  });

  describe('attributes', function(this: ITestContext) {
    describe('by default', function(this: ITestContext) {
      it('should be connected', function(this: ITestContext) {
        this.context = setupTestContext();
        const component = createComponent();
        document.body.appendChild(component);
        expect(this.context.component.isConnected).toBeTrue();
        component.remove();
      });

      it('should have open set to false', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.open).toBe(false, 'Should init as false');
      });

      it(`should have placement set to bottom-start`, function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.placement).toBe('bottom-start', `Should init as bottom-start`);
      });

      it('should have selected-index set -1', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.selectedIndex).toBe(-1);
      });

      it('should have dense set to false', function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.dense).toBe(false, `Should init as false`);
      });

      it(`should have icon-class set to ${ICON_CLASS_NAME}`, function(this: ITestContext) {
        this.context = setupTestContext();
        expect(this.context.component.iconClass).toBe(ICON_CLASS_NAME, `Should init as ${ICON_CLASS_NAME}`);
      });
    });

    describe(`when setting dense`, function(this: ITestContext) {
      it('should update the dense property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(MENU_CONSTANTS.attributes.DENSE, '');
        expect(this.context.component.dense).toBe(true, `The dense attribute should reflect the dense property`);
      });
    });

    describe(`when setting open`, function(this: ITestContext) {
      it('should update the open property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(MENU_CONSTANTS.attributes.OPEN, '');
        expect(this.context.component.open).toBe(true, `The open attribute should reflect the open property`);
      });
    });

    describe(`when setting selected-index`, function(this: ITestContext) {
      it('should update the selected-index property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.options = generateMenuOptions(3);
        this.context.component.setAttribute(MENU_CONSTANTS.attributes.SELECTED_INDEX, '2');
        expect(this.context.component.selectedIndex).toBe(2, `The selected-index attribute should reflect the selected-index property`);
      });
    });

    describe(`when setting placement`, function(this: ITestContext) {
      it('should update the placement property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(MENU_CONSTANTS.attributes.PLACEMENT, 'right-end');
        expect(this.context.component.placement).toBe('right-end', `The placement attribute should reflect the placement property`);
      });
    });

    describe(`when setting icon-class`, function(this: ITestContext) {
      it('should update the icon-class property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.setAttribute(MENU_CONSTANTS.attributes.ICON_CLASS, ICON_CLASS_NAME);
        expect(this.context.component.iconClass).toBe(ICON_CLASS_NAME, `The icon-class attribute should reflect the icon-class property`);
      });
    });
  });

  describe(`properties`, function(this: ITestContext) {
    describe(`when setting dense`, function(this: ITestContext) {
      it('should update the dense property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.dense = true;
        this.context.component.dense = false;
        this.context.component.dense = true;
        expect(this.context.component.dense).toBe(true, `The dense property should reflect the dense property`);
      });
    });

    describe(`when setting open`, function(this: ITestContext) {
      it('should update the open property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.open = true;
        this.context.component.open = false;
        this.context.component.open = true;

        expect(this.context.component.open).toBe(true, `The open property should reflect the open property`);
      });
    });

    describe('when setting the persistSelection property', function(this: ITestContext) {
      it('should update the matching attribute', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.persistSelection = false;
        await frame();
        this.context.component.persistSelection = true;
        await frame();
        
        expect(this.context.component.persistSelection).toBe(true);
        expect(this.context.component.hasAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION)).toBe(true);
      });
    });

    describe('when setting the persistSelection attribute', function(this: ITestContext) {
      it('should update the matching property', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.removeAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION);
        await frame();
        this.context.component.setAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION, '');
        await frame();

        expect(this.context.component.persistSelection).toBe(true);
        expect(this.context.component.hasAttribute(MENU_CONSTANTS.attributes.PERSIST_SELECTION)).toBe(true);
      });
    });

    describe(`when setting selected-index`, function(this: ITestContext) {
      it('should update the selected-index property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.options = generateMenuOptions(3);
        this.context.component.selectedIndex = 1;
        this.context.component.selectedIndex = 2;
        expect(this.context.component.selectedIndex).toBe(2, `The selectedIndex property should reflect the selected-index property`);
      });
    });

    describe(`when setting placement`, function(this: ITestContext) {
      it('should update the placement property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.placement = 'right-end';
        expect(this.context.component.placement).toBe('right-end', `The placement property should reflect the placement property`);
      });
    });

    describe(`when setting icon-class`, function(this: ITestContext) {
      it('should update the icon-class property', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.iconClass = ICON_CLASS_NAME;
        expect(this.context.component.iconClass).toBe(ICON_CLASS_NAME, `The iconClass property should reflect the icon-class property`);
      });
    });

    describe(`when setting options`, function(this: ITestContext) {
      it('should update the options property with list', function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.options = generateMenuOptions(5);
        expect(this.context.component.options.length).toBe(5, `The options property should reflect the options property`);
      });

      it('should update the options property with factory', async function(this: ITestContext) {
        this.context = setupTestContext();
        this.context.component.options = asyncMenuOptionsFactory(5);
        expect((this.context.component as MenuComponentWithCore)['_core']['_optionsFactory']).not.toBe(undefined, `The options factory should be set in the core`);
        expect(this.context.component.options).toEqual([], `The options factory should be set in the core`);
      });
    });
  });

  describe('toggle element', function(this: ITestContext) {
    it('should await dynamic toggle element', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      await frame();
      expect(this.context.adapter.hasTargetElement()).toBeFalse();

      const toggleElement = createToggleElement();
      this.context.component.appendChild(toggleElement);
      await frame();

      expect(this.context.adapter.hasTargetElement()).toBeTrue();
    });

    it('should await nested dynamic toggle element', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      // Create and append an empty child element
      const emptyContainer = document.createElement('div');
      this.context.component.appendChild(emptyContainer);
      await frame();

      expect(this.context.adapter.hasTargetElement()).toBeFalse();
      
      // Create the toggle element and append to the empty child element
      const toggleElement = createToggleElement();
      emptyContainer.appendChild(toggleElement);
      await frame();

      expect(this.context.adapter.hasTargetElement()).toBeTrue();
    });

    it('should close dropdown on blur when nested dynamic toggle element is provided', async function(this: ITestContext) {
      this.context = setupTestContext(false);

      const emptyContainer = document.createElement('div');
      this.context.component.appendChild(emptyContainer);
      await frame();

      const toggleElement = createToggleElement();
      emptyContainer.appendChild(toggleElement);
      await frame();

      toggleElement.focus();
      toggleElement.click();
      expect(this.context.component.open).toBeTrue();
      expect(document.activeElement).toBe(toggleElement);

      toggleElement.blur();
      expect(this.context.component.open).toBeFalse();
      expect(document.activeElement).not.toBe(toggleElement);
    });

    it(`when clicked should open the menu`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.getToggleElement().click();

      expect(this.context.component.open).toBe(true, 'Clicking the toggle element should have opened the menu');
    });

    it(`when clicked should open the menu with options factory`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.options = asyncMenuOptionsFactory();
      this.context.getToggleElement().click();

      expect(this.context.component.open).toBe(true, 'Clicking the toggle element should have opened the menu');
    });

    it(`when clicked should open the menu with options`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.options = generateMenuOptions();
      this.context.getToggleElement().click();

      expect(this.context.component.open).toBe(true, 'Clicking the toggle element should have opened the menu');
    });

    it(`when clicked twice should open then close the menu`, function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.getToggleElement().click();
      expect(this.context.component.open).toBe(true, 'Clicking the toggle element should have opened the menu');
      this.context.getToggleElement().click();

      expect(this.context.component.open).toBe(false, 'Clicking the toggle element should have closed the open menu');
    });
  });

  describe(`options`, function(this: ITestContext) {
    it(`should load async when factory`, async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.options = menuOptionsFactory();
      await frame();

      this.context.component.open = true;
      expect(this.context.component.open).toBe(true);
    });

    it(`should close menu if no options`, async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.options = () => [];
      await frame();

      this.context.component.open = true;
      await frame();
      expect(this.context.component.open).toBe(false);
    });

    it(`should load menu with leading builder`, async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(7);

      options[6].leadingBuilder = () => document.createElement('a');

      await frame();

      this.context.component.options = options;
      this.context.component.open = true;

      await frame();
      expect(this.context.component.open).toBe(true);
    });

    it(`should have disabled class when option is set to disabled`, async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(7);
      options[5].disabled = true;
      this.context.component.options = options;
      this.context.component.open = true;
      await task(300);

      expect(getPopupListItem(5).querySelector('button')?.hasAttribute('disabled')).toBe(true);
    });

    it(`should have selected class when option is set to selected and persistSelection is true`, async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(7);
      this.context.component.persistSelection = true;
      options[5].selected = true;
      this.context.component.options = options;
      this.context.component.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).toBe(true);
    });

    it(`should not have selected class when option is set to selected and persistSelection is false`, async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(7);
      this.context.component.persistSelection = false;
      options[5].selected = true;
      this.context.component.options = options;
      this.context.component.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).toBe(false);
    });

    it(`should not have selected class when option is set to selected and persistSelection is switched from true to false`, async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(7);
      this.context.component.persistSelection = true;
      options[5].selected = true;
      this.context.component.options = options;
      await frame();
      this.context.component.persistSelection = false;
      this.context.component.open = true;
      await task(300);

      expect(getPopupListItem(5).hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).toBe(false);
    });

    it('should use option builder', async function(this: ITestContext) {
      this.context = setupTestContext();

      const optionBuilderSpy = jasmine.createSpy('option builder spy', (option: IMenuOption, listItem: HTMLElement) => {
        const div = document.createElement('div');
        div.id = `custom-option-${option.value}`;
        div.textContent = `Custom option: ${option.label}`;
        return div;
      }).and.callThrough();

      const options: IMenuOption[] = [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3 }
      ];
      this.context.component.options = options;
      this.context.component.optionBuilder = optionBuilderSpy;

      this.context.component.open = true;
      await frame();

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];

      expect(optionBuilderSpy).toHaveBeenCalledTimes(options.length);
      options.forEach((option, index) => {
        expect(listItems[index].textContent).toBe(`Custom option: ${option.label}`);
      });
    });

    it('should reset options with leading icon if set while dropdown is open', async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(1);

      await frame();

      this.context.component.options = options;
      this.context.component.open = true;

      await frame();

      const newOptions = generateMenuOptions(1);
      newOptions[0].icon = 'code';
      this.context.component.options = newOptions;

      await frame();

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const leadingIconEl = listItems[0].querySelector('i[slot=leading]');

      expect(leadingIconEl).toBeTruthy();
      expect(leadingIconEl?.textContent).toBe('code');
    });

    it(`should load leading icons from options factory based on 'leadingIcon' or 'icon' property`, async function(this: ITestContext){
      this.context = setupTestContext();
      const options: MenuOptionFactory = () => {
        return [
          { icon: 'code', value: '', label: '1' },
          { leadingIcon: 'code', value: '', label: '2' }
        ];
      }

      await frame();

      this.context.component.options = options;
      this.context.component.open = true;
      
      await frame();

      const list = getPopupList(getPopoverElement());
      const listItems = Array.from(list.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)) as IListItemComponent[];
      const leadingIcons = listItems.map(listItem => listItem.querySelector('i[slot=leading]'));

      expect(leadingIcons[0]).toBeTruthy();
      expect(leadingIcons[1]).toBeTruthy();
    });
  });

  describe(`events`, function(this: ITestContext) {
    afterEach(function(this: ITestContext) {
      const pop = document.querySelector(POPOVER_CONSTANTS.elementName);
      if (pop instanceof HTMLElement) {
        pop.remove();
      }
    });

    describe('keyboard', function(this: ITestContext) {
      it('arrow down from the start should activate the first list element', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.options = options;
        this.context.getToggleElement().click();
        await task(300);
        this.context.getToggleElement().dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));

        expect(getPopupListItem(0).hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      });

      it('arrow up from the start should activate the last list element', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.options = options;
        this.context.getToggleElement().click();
        await task(300);
        this.context.getToggleElement().dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));

        expect(getPopupListItem(6).hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      });

      it('enter should select the list element when persistSelection is true', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.persistSelection = true;
        this.context.component.options = options;
        this.context.getToggleElement().click();
        await task(300);

        this.context.getToggleElement().dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        this.context.getToggleElement().dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        expect(this.context.component.selectedIndex).toBe(0);
      });

      it('enter should select the list element when persistSelection is false', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.persistSelection = false;
        this.context.component.options = options;
        this.context.getToggleElement().click();
        await task(300);

        this.context.getToggleElement().dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        this.context.getToggleElement().dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
        expect(this.context.component.selectedIndex).toBe(-1);
      });

      it('space should toggle the popup', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.options = options;

        this.context.getToggleElement().dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(this.context.component.open).toBe(true, 'Space should open the popup when closed');

        this.context.getToggleElement().dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        expect(this.context.component.open).toBe(false, 'Space should close the popup when open');
      });

      it('tab should close the popup', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.options = options;
        this.context.component.open = true;

        await task(POPOVER_ANIMATION_DURATION);
        const toggleElement = this.context.getToggleElement();
        toggleElement.focus();
        toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        toggleElement.blur();
        await frame();

        expect(this.context.component.open).toBeFalse();
      });

      it('should not select active item when tab key is pressed while dropdown is open', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.options = options;
        const toggleElement = this.context.getToggleElement();
        toggleElement.focus();
        toggleElement.click();

        const selectSpy = jasmine.createSpy('select spy');
        this.context.component.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

        await task(POPOVER_ANIMATION_DURATION);

        toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
        toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Tab' }));
        await frame();

        expect(selectSpy).not.toHaveBeenCalled();
      });

      it('should highlight first option when opened via down arrow key', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(3);
        this.context.component.options = options;
        
        const toggleElement = this.context.getToggleElement();
        toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));

        await task(POPOVER_ANIMATION_DURATION);

        const firstListItem = getPopupListItem(0) as IListItemComponent;
        expect(firstListItem.active).toBeTrue();
      });

      it('escape should close the popup', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.options = options;
        const toggleElement = this.context.getToggleElement();
        toggleElement.focus();
        toggleElement.click();

        toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
        await frame();
        expect(this.context.component.open).toBe(false, 'Escape should close the popup');
      });

      it('blur should close the popup', async function(this: ITestContext) {
        this.context = setupTestContext();
        const options = generateMenuOptions(7);
        this.context.component.options = options;
        this.context.component.open = true;
        await task(300);
        
        getPopupListItem(0).querySelector('button')?.click();

        await task(300);

        expect(this.context.component.open).toBe(false);
      });
    });
  });

  describe('cascading', function(this: ITestContext) {
    it('should render child menu', async function(this: ITestContext) {
      this.context = setupTestContext();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);
      this.context.component.options = options;
      this.context.component.open = true;

      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.tagName.toLowerCase()).toBe(MENU_CONSTANTS.elementName);
      
      const listItem = childMenuComponent.firstElementChild as IListItemComponent;
      expect(listItem.tagName.toLowerCase()).toBe(LIST_ITEM_CONSTANTS.elementName);
      
      listItem.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();

      expect(childMenuComponent.open).toBeTrue();
      expect(childMenuComponent.mode).toBe('cascade');

      const childMenuListItems = getChildMenuListItems(getPopoverElement());
      expect(childMenuListItems.length).toBe(CHILD_MENU_OPTION_COUNT);
    });

    it('should hide child menu on mouseleave', async function(this: ITestContext) {
      this.context = setupTestContext();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);
      this.context.component.options = options;
      this.context.component.open = true;

      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const listItem = childMenuComponent.firstElementChild as IListItemComponent;
      
      listItem.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();
      expect(childMenuComponent.open).toBeTrue();
      
      listItem.dispatchEvent(new MouseEvent('mouseleave'));
      await task(MENU_CONSTANTS.numbers.CHILD_MOUSE_LEAVE_TIMEOUT);
      await frame();
      expect(childMenuComponent.open).toBeFalse();
    });

    it('should hide child menu if mouse leaves popup after threshold', async function(this: ITestContext) {
      this.context = setupTestContext();
      const CHILD_MENU_OPTION_COUNT = 2;
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(CHILD_MENU_OPTION_COUNT);
      this.context.component.options = options;
      this.context.component.open = true;

      await frame();
      
      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const listItem = childMenuComponent.firstElementChild as IListItemComponent;
      
      listItem.dispatchEvent(new MouseEvent('mouseenter'));
      
      await frame();
      
      const childMenuPopup = getChildPopupElement(childMenuComponent);
      childMenuPopup.dispatchEvent(new MouseEvent('mouseenter'));
      expect(childMenuComponent.open).toBeTrue();

      await frame();
      
      listItem.dispatchEvent(new MouseEvent('mouseleave'));
      document.dispatchEvent(new MouseEvent('mousemove', { pageX: 0, pageY: 0 } as MouseEventInit));
      childMenuPopup.dispatchEvent(new MouseEvent('mouseleave'));

      await task(MENU_CONSTANTS.numbers.POPUP_MOUSE_LEAVE_TIMEOUT * 2);
      await frame();

      expect(childMenuComponent.open).toBeFalse();
    });

    it('should select option in child menu', async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(3);
      const childOptions = generateMenuOptions(2);
      const EXPETED_SELECTION_VALUE = childOptions[1].value;
      options[1].options = childOptions;
      this.context.component.options = options;
      this.context.component.open = true;

      const selectSpy = jasmine.createSpy('select spy');
      this.context.component.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

      await frame();

      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      const listItem = childMenuComponent.firstElementChild as IListItemComponent;
      
      listItem.dispatchEvent(new MouseEvent('mouseenter'));
      await frame();

      const childMenuListItems = getChildMenuListItems(getPopoverElement());
      childMenuListItems[1].dispatchEvent(new MouseEvent('click'));

      expect(selectSpy).toHaveBeenCalledTimes(1);
      expect(selectSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: { index: 1, value: EXPETED_SELECTION_VALUE, parentValue: options[1].value }}));
    });

    it('should open and close child menu with arrow keys', async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(2);
      this.context.component.options = options;
      this.context.component.open = true;

      await frame();
      const toggleElement = this.context.getToggleElement();
      toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await frame();
      
      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.open).toBeTrue();
      
      toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      await frame();

      expect(childMenuComponent.open).toBeFalse();
    });

    it('should select child option with arrow key', async function(this: ITestContext) {
      this.context = setupTestContext();
      const options = generateMenuOptions(3);
      options[1].options = generateMenuOptions(2);
      const EXPECTED_SELECTION_VALUE = (options[1].options[0] as IMenuOption).value;
      this.context.component.options = options;
      this.context.component.open = true;

      const selectSpy = jasmine.createSpy('select spy');
      this.context.component.addEventListener(MENU_CONSTANTS.events.SELECT, selectSpy);

      await frame();
      
      const toggleElement = this.context.getToggleElement();
      toggleElement.focus();
      toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await frame();
      
      const childMenuComponent = getPopupListItem(1) as IMenuComponent;
      expect(childMenuComponent.open).toBeTrue();
      
      await frame();
      toggleElement.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));

      expect(this.context.component.open).toBeFalse();
      expect(selectSpy).toHaveBeenCalledTimes(1);
      expect(selectSpy).toHaveBeenCalledWith(jasmine.objectContaining({ detail: { index: 0, value: EXPECTED_SELECTION_VALUE, parentValue: options[1].value }}));
    });
  });

  it('should remove popover when removed from DOM while open', async function(this: ITestContext) {
    this.context = setupTestContext();
    const options: IMenuOption[] = [
      { label: 'One', value: 1 },
      { label: 'Two', value: 2 },
      { label: 'Three', value: 3 }
    ];
    this.context.component.options = options;
    this.context.component.open = true;
    await frame();

    const popover = getPopoverElement();
    expect(popover).toBeTruthy();
    
    this.context.component.remove();
    await frame();

    expect(popover.isConnected).toBeFalse();
  });

  function setupTestContext(appendToggle = true): ITestMenuContext {
    const fixture = document.createElement('div');
    fixture.id = 'menu-test-fixture';
    const component = document.createElement(MENU_CONSTANTS.elementName) as MenuComponentWithCore;
    const core = component['_core'];
    const adapter = core['_adapter'] as IMenuAdapter;
    if (appendToggle) {
      component.appendChild(createToggleElement());
    }
    fixture.appendChild(component);
    document.body.appendChild(fixture);
    return {
      component,
      core,
      adapter,
      fixture,
      getToggleElement: () => component.querySelector('button') as HTMLButtonElement,
      destroy: () => fixture.remove()
    };
  }
  
  function generateMenuOptions(count: number = 5) {
    const options: IMenuOption[] = [];
    for (let i = 0; i < count; i++) {
      options.push({ value: i, disabled: false, divider: i === 4 ? true : false, icon: 'arrow_right', label: i.toString() });
    }
    return options;
  }

  function asyncMenuOptionsFactory(count: number = 5) {
    return () =>
      new Promise<IMenuOption[]>(resolve => {
        return resolve(generateMenuOptions(count));
      });
  }

  function menuOptionsFactory(count: number = 5) {
    return () => generateMenuOptions(count);
  }

  function createToggleElement() {
    const button = document.createElement('button');
    button.type = 'button';
    return button;
  }

  function createComponent() {
    return document.createElement('forge-menu') as IMenuComponent;
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

  function clearPopups(): void {
    const popups = Array.from(document.querySelectorAll(POPOVER_CONSTANTS.elementName));
    popups.forEach(p => p.remove());
  }
});
