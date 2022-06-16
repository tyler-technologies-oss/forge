import { getShadowElement, removeElement, getActiveElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { CHECKBOX_CONSTANTS, ICheckboxComponent } from '@tylertech/forge/checkbox';
import { DRAWER_CONSTANTS, IDrawerComponent } from '@tylertech/forge/drawer';
import { defineListComponent, IListComponent, LIST_CONSTANTS } from '@tylertech/forge/list';
import { defineListItemComponent, IListItemComponent, LIST_ITEM_CONSTANTS } from '@tylertech/forge/list/list-item';
import { IRadioComponent, RADIO_CONSTANTS } from '@tylertech/forge/radio';

interface ITestContext {
  context: ITestListItemDefaultContext | ITestListItemDrawerContext | ITestListItemCheckboxContext | ITestListItemRadioContext;
}

interface ITestListItemDefaultContext {
  component: IListItemComponent;
  listComponent: IListComponent;
  getRootElement(): HTMLElement;
  append(): void;
  destroy(): void;
}

interface ITestListItemDrawerContext {
  component: IListItemComponent;
  destroy(): void;
}

interface ITestListItemCheckboxContext {
  component: IListItemComponent;
  listComponent: IListComponent;
  getRootElement(): HTMLElement;
  getInputElement(): HTMLInputElement;
  destroy(): void;
}

interface ITestListItemRadioContext {
  component1: IListItemComponent;
  component2: IListItemComponent;
  listComponent: IListComponent;
  getRootElement1(): HTMLElement;
  getRootElement2(): HTMLElement;
  getRadioInput1(): HTMLInputElement;
  getRadioInput2(): HTMLInputElement;
  destroy(): void;
}

describe('ListItemComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineListItemComponent();
    defineListComponent();
  });

  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('individual list item', function(this: ITestContext) {
    it('should have proper role', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.getAttribute('role')).toBe(LIST_ITEM_CONSTANTS.roles.LIST_ITEM);
    });

    it('should not have drawer context attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.DRAWER_CONTEXT)).toBe(false);
    });

    it('should not be two-line by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.twoLine).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.TWO_LINE)).toBe(false);
    });

    it('should not be three-line by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.threeLine).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.THREE_LINE)).toBe(false);
    });

    it('should not be static by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.static).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.STATIC)).toBe(false);
    });

    it('should not be active by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.active).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.ACTIVE)).toBe(false);
    });

    it('should use ripple by default', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      expect(this.context.component.ripple).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains('mdc-ripple-upgraded')).toBe(true);
    });

    it('should not be selected by default', function(this: ITestContext) {
      this.context = setupTestContext(true);

      expect(this.context.component.selected).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.SELECTED)).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.ACTIVATED)).toBe(false);
    });

    it('should not have value by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.value).toBeUndefined();
    });

    it('should not have href by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.href).toBeUndefined();
    });

    it('should not have target by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.target).toBeUndefined();
    });

    it('should not be disabled by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.disabled).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.DISABLED)).toBe(false);
    });

    it('should not wrap by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.wrap).toBeFalse();
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.WRAP)).toBeFalse();
    });

    it('should not be dense by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.dense).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.DENSE)).toBe(false);
    });

    it('should propagate click by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.propagateClick).toBe(true);
    });

    it('should not be indented by default', function(this: ITestContext) {
      this.context = setupTestContext(true);
      expect(this.context.component.indented).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.INDENTED)).toBe(false);
    });

    it('should remove ripple', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      await tick();
      this.context.component.ripple = false;
      await tick();
      expect(this.context.component.ripple).toBe(false);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.RIPPLE)).toBe(true);
      expect(this.context.component.getAttribute(LIST_ITEM_CONSTANTS.attributes.RIPPLE)).toBe('false');
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains('mdc-ripple-upgraded')).toBe(false);
    });

    it('should not set ripple if static', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.ripple = false;
      (this.context as ITestListItemDefaultContext).append();
      await tick();
      this.context.component.static = true;
      this.context.component.ripple = true;
      await tick();
      expect(this.context.component.ripple).toBe(false);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.RIPPLE)).toBe(true);
      expect(this.context.component.getAttribute(LIST_ITEM_CONSTANTS.attributes.RIPPLE)).toBe('false');
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains('mdc-ripple-upgraded')).toBe(false);
    });

    it('should set to static via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.static = true;
      expect(this.context.component.static).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.STATIC)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.STATIC)).toBe(true);
    });

    it('should set to static via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.STATIC, 'true');
      expect(this.context.component.static).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.STATIC)).toBe(true);
    });

    it('should set to static via attribute by default', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.STATIC, 'true');
      (this.context as ITestListItemDefaultContext).append();
      expect(this.context.component.static).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.STATIC)).toBe(true);
    });

    it('should not emit selected event when static', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.STATIC, 'true');
      (this.context as ITestListItemDefaultContext).append();
      const listener = jasmine.createSpy('selected listener');
      this.context.component.addEventListener(LIST_ITEM_CONSTANTS.events.SELECT, listener);
      (this.context as ITestListItemDefaultContext).getRootElement().click();
      expect(listener).not.toHaveBeenCalled();
    });

    it('should emit selected event when not static', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const listener = jasmine.createSpy('selected listener');
      this.context.component.addEventListener(LIST_ITEM_CONSTANTS.events.SELECT, listener);
      (this.context as ITestListItemDefaultContext).getRootElement().click();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should emit selected event when enter key is pressed', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const listener = jasmine.createSpy('selected listener');
      this.context.component.addEventListener(LIST_ITEM_CONSTANTS.events.SELECT, listener);
      (this.context as ITestListItemDefaultContext).getRootElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should emit selected event when enter space is pressed', function(this: ITestContext) {
      this.context = setupTestContext(true);
      const listener = jasmine.createSpy('selected listener');
      this.context.component.addEventListener(LIST_ITEM_CONSTANTS.events.SELECT, listener);
      (this.context as ITestListItemDefaultContext).getRootElement().dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should set value via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.value = 1;
      expect(this.context.component.value).toBe(1);
    });

    it('should set correct role based on href value', function(this: ITestContext) {
      this.context = setupTestContext();
      const url = 'https://www.google.com/';
      (this.context as ITestListItemDefaultContext).append();
      this.context.component.href = url;
      expect((this.context as ITestListItemDefaultContext).getRootElement().getAttribute('role')).toBe(LIST_ITEM_CONSTANTS.roles.LINK);
    });

    it('should toggle role based on href', async function(this: ITestContext) {
      this.context = setupTestContext();
      const url = 'https://www.google.com/';
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.HREF, url);
      (this.context as ITestListItemDefaultContext).append();
      expect((this.context as ITestListItemDefaultContext).getRootElement().getAttribute('role')).toBe(LIST_ITEM_CONSTANTS.roles.LINK);
      this.context.component.href = '';
      await tick();
      expect((this.context as ITestListItemDefaultContext).getRootElement().getAttribute('role')).toBe(LIST_ITEM_CONSTANTS.roles.LIST_ITEM);
    });

    it('should set href via property', function(this: ITestContext) {
      this.context = setupTestContext();
      const url = 'https://www.google.com/';
      (this.context as ITestListItemDefaultContext).append();
      this.context.component.href = url;
      expect(this.context.component.href).toBe(url);
      expect(this.context.component.getAttribute(LIST_ITEM_CONSTANTS.attributes.HREF)).toBe(url);
    });

    it('should not emit selected event when href is set', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.HREF, '#SomeHref');
      (this.context as ITestListItemDefaultContext).append();
      const listener = jasmine.createSpy('selected listener');
      (this.context as ITestListItemDefaultContext).listComponent.addEventListener(LIST_ITEM_CONSTANTS.events.SELECT, listener);
      (this.context as ITestListItemDefaultContext).getRootElement().click();
      expect(listener).not.toHaveBeenCalled();
    });

    it('should set target via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.target = '_blank';
      expect(this.context.component.target).toBe('_blank');
    });

    it('should set target via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.TARGET, '_blank');
      expect(this.context.component.target).toBe('_blank');
    });

    it('should set disabled via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.disabled = true;
      expect(this.context.component.disabled).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.DISABLED)).toBe(true);
      this.context.component.disabled = false;
      expect(this.context.component.disabled).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.DISABLED)).toBe(false);
    });

    it('should set disabled via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.DISABLED, 'true');
      expect(this.context.component.disabled).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.DISABLED)).toBe(true);
    });

    it('should set wrap via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.wrap = true;
      const rootElement = (this.context as ITestListItemDefaultContext).getRootElement();

      expect(this.context.component.wrap).toBeTrue();
      expect(rootElement.classList.contains(LIST_ITEM_CONSTANTS.classes.WRAP)).toBeTrue();

      this.context.component.wrap = false;

      expect(this.context.component.wrap).toBeFalse();
      expect(rootElement.classList.contains(LIST_ITEM_CONSTANTS.classes.WRAP)).toBeFalse();
    });

    it('should set wrap via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.WRAP, '');
      expect(this.context.component.wrap).toBeTrue();
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.WRAP)).toBeTrue();
    });

    it('should set target via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.TARGET, '_blank');
      expect(this.context.component.target).toBe('_blank');
    });

    it('should focus list item', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.focus();
      expect(getActiveElement()).toBe((this.context as ITestListItemDefaultContext).getRootElement());
    });

    it('should not set focus when list item is selected', async function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.selected = true;
      await tick();
      expect(getActiveElement()).not.toBe((this.context as ITestListItemDefaultContext).getRootElement());
    });

    it('should render selected when set by default via attribute', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED, '');
      (this.context as ITestListItemDefaultContext).append();
      
      expect(this.context.component.selected).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.SELECTED)).toBe(true);
    });

    it('should set two-line via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.twoLine = true;
      expect(this.context.component.twoLine).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.TWO_LINE)).toBe(true);
      this.context.component.twoLine = false;
      expect(this.context.component.twoLine).toBe(false);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE)).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.TWO_LINE)).toBe(false);
    });

    it('should set two-line via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE, 'true');
      expect(this.context.component.twoLine).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.TWO_LINE)).toBe(true);
    });

    it('should set two-line via attribute by default', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE, 'true');
      (this.context as ITestListItemDefaultContext).append();
      expect(this.context.component.twoLine).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.TWO_LINE)).toBe(true);
    });

    it('should set three-line via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.threeLine = true;
      expect(this.context.component.threeLine).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.THREE_LINE)).toBe(true);
      this.context.component.threeLine = false;
      expect(this.context.component.threeLine).toBe(false);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE)).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.THREE_LINE)).toBe(false);
    });

    it('should set three-line via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE, 'true');
      expect(this.context.component.threeLine).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.THREE_LINE)).toBe(true);
    });

    it('should set three-line via attribute by default', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE, 'true');
      (this.context as ITestListItemDefaultContext).append();
      expect(this.context.component.threeLine).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.THREE_LINE)).toBe(true);
    });

    it('should set active via property', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.active = true;
      expect(this.context.component.active).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.ACTIVE)).toBe(true);
    });

    it('should set active via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true);
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE, 'true');
      expect(this.context.component.active).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.ACTIVE)).toBe(true);
    });

    it('should set active via attribute by default', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE, 'true');
      (this.context as ITestListItemDefaultContext).append();
      expect(this.context.component.active).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.ACTIVE)).toBe(true);
    });

    it('should set active via property by default', function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.setAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE, 'true');
      (this.context as ITestListItemDefaultContext).append();
      expect(this.context.component.active).toBe(true);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.ACTIVE)).toBe(true);
    });

    it('should toggle active', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.active = true;
      (this.context as ITestListItemDefaultContext).append();
      await tick();
      this.context.component.active = false;
      expect(this.context.component.active).toBe(false);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.ACTIVE)).toBe(false);
    });

    it('should toggle selected', async function(this: ITestContext) {
      this.context = setupTestContext();
      this.context.component.selected = true;
      (this.context as ITestListItemDefaultContext).append();
      await tick();
      this.context.component.selected = false;
      expect(this.context.component.selected).toBe(false);
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED)).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.SELECTED)).toBe(false);
      expect((this.context as ITestListItemDefaultContext).getRootElement().classList.contains(LIST_ITEM_CONSTANTS.classes.ACTIVATED)).toBe(false);
    });
  });

  describe('child of drawer component', function(this: ITestContext) {

    it('should have drawer context attribute when a child of a drawer component', function(this: ITestContext) {
      this.context = setupDrawerTestContext();
      expect(this.context.component.hasAttribute(LIST_ITEM_CONSTANTS.attributes.DRAWER_CONTEXT)).toBe(true);
      expect(this.context.component.getAttribute(LIST_ITEM_CONSTANTS.attributes.DRAWER_CONTEXT)).toBe('true');
    });
  });

  describe('with checkbox', function(this: ITestContext) {
    it('should check checkbox when clicked', function(this: ITestContext) {
      this.context = setupCheckboxTestContext();
      (this.context as ITestListItemCheckboxContext).getRootElement().click();
      expect((this.context as ITestListItemCheckboxContext).getInputElement().checked).toBe(true);
    });

    it('should not check checkbox with the forge-ignore attribute applied when list-item is clicked', function(this: ITestContext) {
      this.context = setupCheckboxTestContext();
      const checkboxInputElement = (this.context as ITestListItemCheckboxContext).getInputElement();
      checkboxInputElement.setAttribute(LIST_ITEM_CONSTANTS.attributes.IGNORE, '');
      (this.context as ITestListItemCheckboxContext).getRootElement().click();
      expect(checkboxInputElement.checked).toBe(false);
    });

    it('should emit change event toggling checked state', function(this: ITestContext) {
      this.context = setupCheckboxTestContext();
      const changeSpy = jasmine.createSpy('change spy');
      (this.context as ITestListItemCheckboxContext).getInputElement().addEventListener('change', changeSpy);

      (this.context as ITestListItemCheckboxContext).getRootElement().click();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with radio', function(this: ITestContext) {
    it('should check radio when clicked', function(this: ITestContext) {
      this.context = setupRadioTestContext();
      this.context.getRootElement1().click();
      expect(this.context.getRadioInput1().checked).toBe(true);
    });

    it('should not check radio with the "forge-ignore" attribute applied when list-item is clicked', function(this: ITestContext) {
      this.context = setupRadioTestContext();
      const radioInput1 = this.context.getRadioInput1();
      radioInput1.setAttribute(LIST_ITEM_CONSTANTS.attributes.IGNORE, '');
      
      this.context.getRootElement1().click();
      expect(radioInput1.checked).toBe(false);
    });

    it('should check radio button in another list item', function(this: ITestContext) {
      this.context = setupRadioTestContext();
      this.context.getRootElement1().click();
      this.context.getRootElement2().click();
      expect(this.context.getRadioInput1().checked).toBe(false);
      expect(this.context.getRadioInput2().checked).toBe(true);
    });

    it('should emit change event toggling checked state', function(this: ITestContext) {
      this.context = setupRadioTestContext();
      const changeSpy = jasmine.createSpy('change spy');
      this.context.getRadioInput1().addEventListener('change', changeSpy);

      this.context.getRootElement1().click();

      expect(changeSpy).toHaveBeenCalledTimes(1);
    });
  });

  function setupTestContext(append = false): ITestListItemDefaultContext {
    const fixture = document.createElement('div');
    fixture.id = 'list-item-test-fixture';

    const listComponent = document.createElement(LIST_CONSTANTS.elementName) as IListComponent;
    const component = createListItem();
    listComponent.appendChild(component);
    fixture.appendChild(listComponent);

    if (append) {
      document.body.appendChild(fixture);
    }

    return {
      listComponent,
      component,
      getRootElement: () => getShadowElement(component, LIST_ITEM_CONSTANTS.selectors.LIST_ITEM),
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }

  function setupDrawerTestContext(): ITestListItemDrawerContext {
    const fixture = document.createElement('div');
    fixture.id = 'list-item-drawer-test-fixture';
    const listComponent = document.createElement(LIST_CONSTANTS.elementName) as IListComponent;
    const component = createListItem();
    listComponent.appendChild(component)
    const drawerComponent = document.createElement(DRAWER_CONSTANTS.elementName) as IDrawerComponent;
    drawerComponent.appendChild(listComponent);
    fixture.appendChild(drawerComponent);
    document.body.appendChild(fixture);
    return {
      component,
      destroy: () => removeElement(fixture)
    };
  }

  function setupCheckboxTestContext(): ITestListItemCheckboxContext {
    const fixture = document.createElement('div');
    fixture.id = 'list-item-test-fixture';
    const listComponent = document.createElement(LIST_CONSTANTS.elementName) as IListComponent;
    const component = createListItem();
    const checkboxComponent = document.createElement(CHECKBOX_CONSTANTS.elementName) as ICheckboxComponent;
    checkboxComponent.slot = 'trailing';
    const checkboxInputElement = document.createElement('input');
    checkboxInputElement.type = 'checkbox';
    checkboxComponent.appendChild(checkboxInputElement);
    component.appendChild(checkboxComponent);
    listComponent.appendChild(component)
    fixture.appendChild(listComponent);
    document.body.appendChild(fixture);
    return {
      listComponent,
      component,
      getRootElement: () => getShadowElement(component, LIST_ITEM_CONSTANTS.selectors.LIST_ITEM),
      getInputElement: () => component.querySelector('input') as HTMLInputElement,
      destroy: () => removeElement(fixture)
    };
  }

  function setupRadioTestContext(): ITestListItemRadioContext {
    const fixture = document.createElement('div');
    fixture.id = 'list-item-radio-test-fixture';
    const listComponent = document.createElement(LIST_CONSTANTS.elementName) as IListComponent;
    const component1 = createListItem();
    const component2 = createListItem();
    const radio1Component = createRadio();
    component1.appendChild(radio1Component);
    listComponent.appendChild(component1)
    const radio2Component = createRadio();
    component2.appendChild(radio2Component);
    listComponent.appendChild(component2);
    fixture.appendChild(listComponent);
    document.body.appendChild(fixture);
    return {
      component1,
      component2,
      listComponent,
      getRootElement1: () => getShadowElement(component1, LIST_ITEM_CONSTANTS.selectors.LIST_ITEM),
      getRootElement2: () => getShadowElement(component2, LIST_ITEM_CONSTANTS.selectors.LIST_ITEM),
      getRadioInput1: () => component1.querySelector('input') as HTMLInputElement,
      getRadioInput2: () => component2.querySelector('input') as HTMLInputElement,
      destroy: () => removeElement(fixture)
    };
  }
  
  function createListItem(): IListItemComponent {
    const component = document.createElement(LIST_ITEM_CONSTANTS.elementName) as IListItemComponent;
    const lineOne = document.createElement('span');
    lineOne.textContent = 'Line one';
    component.appendChild(lineOne);
    return component;
  }

  function createRadio(): IRadioComponent {
    const component = document.createElement(RADIO_CONSTANTS.elementName) as IRadioComponent;
    component.slot = 'trailing';
    const inputElement = document.createElement('input');
    inputElement.type = 'radio';
    inputElement.name = 'list-radio';
    component.appendChild(inputElement);
    return component;
  }
});
