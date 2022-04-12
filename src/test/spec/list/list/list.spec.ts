import { defineListComponent, IListComponent, LIST_CONSTANTS, LIST_ITEM_CONSTANTS, IListItemComponent, ListComponent } from '@tylertech/forge/list';
import { DIVIDER_CONSTANTS, IDividerComponent } from '@tylertech/forge/divider';
import { removeElement, getShadowElement, getActiveElement } from '@tylertech/forge-core';
import { tick, dispatchKeyEvent } from '@tylertech/forge-testing';

interface ITestListItemNumber {
  id: number;
  text: string;
  value: number;
}

interface ITestListItemString {
  id: number;
  text: string;
  value: string;
}

const listNumberItems = [
  { id: 1, text: 'one', value: 1 },
  { id: 2, text: 'two', value: 2 },
  { id: 3, text: 'three', value: 3 }
];

const listStringItems = [
  { id: 1, text: 'one', value: '1' },
  { id: 2, text: 'two', value: '2' },
  { id: 3, text: 'three', value: '3' }
];

interface ITestContext {
  context: ITestListContext
}

interface ITestListContext {
  component: IListComponent;
  getListItemComponents(): IListItemComponent[];
  append(): void;
  destroy(): void;
}

describe('ListComponent', function(this: ITestContext) {
  beforeAll(function(this: ITestContext) {
    defineListComponent();
  });
  
  afterEach(function(this: ITestContext) {
    this.context.destroy();
  });

  describe('list with number values', function(this: ITestContext) {
    it('should not be static by default', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      expect(this.context.component.static).toBe(false);
    });

    it('should set static via property', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      await tick();
      this.context.component.static = true;
      expect(this.context.component.hasAttribute(LIST_CONSTANTS.attributes.STATIC)).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.static)).toBe(true);
    });

    it('should set static via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.STATIC, 'true');
      expect(this.context.component.static).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.static)).toBe(true);
    });

    it('should render list items static when set by default via attribute', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.STATIC, 'true');
      this.context.append();
      expect(this.context.component.static).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.static)).toBe(true);
    });

    it('should render list items static when set by default via property', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.static = true;
      this.context.append();
      expect(this.context.component.static).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.static)).toBe(true);
    });

    it('should set list items to not be static', async function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.static = true;
      this.context.append();
      await tick();
      this.context.component.static = false;
      expect(this.context.component.hasAttribute(LIST_CONSTANTS.attributes.STATIC)).toBe(false);
      expect(this.context.getListItemComponents().every(li => li.static)).toBe(false);
    });

    it('should not handle keydown events when static', async function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.static = true;
      this.context.append();
      const keydownSpy = spyOn(this.context.component['_foundation'], '_onKeydown').and.callThrough();
      await tick();
      dispatchKeyEvent(this.context.getListItemComponents()[0], 'keydown', 'Enter');
      expect(keydownSpy).not.toHaveBeenCalled();
    });

    it('should handle keydown events when not static', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      const keydownSpy = spyOn(this.context.component['_foundation'], '_onKeydown').and.callThrough();
      await tick();
      dispatchKeyEvent(this.context.getListItemComponents()[0], 'keydown', 'Enter');
      expect(keydownSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle keydown events when not static', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      const keydownSpy = spyOn(this.context.component['_foundation'], '_onKeydown').and.callThrough();
      await tick();
      dispatchKeyEvent(this.context.getListItemComponents()[0], 'keydown', 'Enter');
      expect(keydownSpy).toHaveBeenCalledTimes(1);
    });

    it('should not be dense by default', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      expect(this.context.component.dense).toBe(false);
    });

    it('should set dense via property', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      this.context.component.dense = true;
      expect(this.context.component.dense).toBe(true);
      expect(this.context.component.hasAttribute(LIST_CONSTANTS.attributes.DENSE)).toBe(true);
      this.context.component.dense = false;
      expect(this.context.component.dense).toBe(false);
      expect(this.context.component.hasAttribute(LIST_CONSTANTS.attributes.DENSE)).toBe(false);
    });

    it('should set dense via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.DENSE, 'true');
      expect(this.context.component.dense).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.dense)).toBe(true);
    });

    it('should render list items dense when set by default via attribute', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.DENSE, 'true');
      this.context.append();
      expect(this.context.component.dense).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.dense)).toBe(true);
    });

    it('should render list items dense when set by default via property', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.dense = true;
      this.context.append();
      expect(this.context.component.dense).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.dense)).toBe(true);
    });

    it('should set list items to not be dense', async function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.dense = true;
      this.context.append();
      await tick();
      this.context.component.dense = false;
      expect(this.context.component.hasAttribute(LIST_CONSTANTS.attributes.DENSE)).toBe(false);
      expect(this.context.getListItemComponents().every(li => li.dense)).toBe(false);
    });

    it('should set propagate click by default', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      expect(this.context.component.propagateClick).toBe(true);
    });

    it('should set propagate click via property', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      this.context.component.propagateClick = false;
      expect(this.context.component.propagateClick).toBe(false);
      this.context.component.propagateClick = true;
      expect(this.context.component.propagateClick).toBe(true);
    });

    it('should set propagate click via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.PROPAGATE_CLICK, 'false');
      expect(this.context.component.propagateClick).toBe(false);
      expect(this.context.getListItemComponents().every(li => li.propagateClick)).toBe(false);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.PROPAGATE_CLICK, 'true');
      expect(this.context.component.propagateClick).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.propagateClick)).toBe(true);
    });

    it('should set list items to not propagate click when set by default via attribute', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.PROPAGATE_CLICK, 'false');
      this.context.append();
      expect(this.context.component.propagateClick).toBe(false);
      expect(this.context.getListItemComponents().every(li => li.propagateClick)).toBe(false);
    });

    it('should set list items to not propagate click when set by default via property', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.propagateClick = false;
      this.context.append();
      expect(this.context.component.propagateClick).toBe(false);
      expect(this.context.getListItemComponents().every(li => li.propagateClick)).toBe(false);
    });

    it('should not be indented by default', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      expect(this.context.component.indented).toBe(false);
    });

    it('should set indented via property', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      this.context.component.indented = true;
      expect(this.context.component.indented).toBe(true);
      expect(this.context.component.hasAttribute(LIST_CONSTANTS.attributes.INDENTED)).toBe(true);
      this.context.component.indented = false;
      expect(this.context.component.indented).toBe(false);
      expect(this.context.component.hasAttribute(LIST_CONSTANTS.attributes.INDENTED)).toBe(false);
    });

    it('should set indented via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.INDENTED, 'true');
      expect(this.context.component.indented).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.indented)).toBe(true);
    });

    it('should render list items indented when set by default via attribute', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.INDENTED, 'true');
      this.context.append();
      expect(this.context.component.indented).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.indented)).toBe(true);
    });

    it('should render list items indented when set by default via property', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.indented = true;
      this.context.append();
      expect(this.context.component.indented).toBe(true);
      expect(this.context.getListItemComponents().every(li => li.indented)).toBe(true);
    });

    it('should set list items to not be indented', async function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.indented = true;
      this.context.append();
      await tick();
      this.context.component.indented = false;
      expect(this.context.component.hasAttribute(LIST_CONSTANTS.attributes.INDENTED)).toBe(false);
      expect(this.context.getListItemComponents().every(li => li.indented)).toBe(false);
    });

    it('should initialize with selected value via property', function(this: ITestContext) {
      this.context = setupTestContext(false, listNumberItems);
      this.context.component.selectedValue = [1, 2];
      this.context.append();
      expect(this.context.component.selectedValue.length).toBe(2);
      const listItemComponents = this.context.getListItemComponents();
      expect(listItemComponents[0].selected).toBe(true);
      expect(listItemComponents[1].selected).toBe(true);
    });

    it('should set selected value with via property', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      this.context.component.selectedValue = [1, 2];
      expect(this.context.component.selectedValue.length).toBe(2);
      let listItemComponents = this.context.getListItemComponents();
      expect(listItemComponents[0].selected).toBe(true);
      expect(listItemComponents[1].selected).toBe(true);

      await tick();

      this.context.component.selectedValue = 1;
      expect(this.context.component.selectedValue).toBe(1);
      listItemComponents = this.context.getListItemComponents();
      expect(listItemComponents[0].selected).toBe(true);
      expect(listItemComponents[1].selected).toBe(false);
    });

    it('should emit selected event when enter is pressed on focused list item', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      const listener = jasmine.createSpy('selected listener');
      this.context.component.addEventListener(LIST_ITEM_CONSTANTS.events.SELECT, listener);
      await tick();
      dispatchKeyEvent(this.context.getListItemComponents()[0], 'keydown', 'Enter');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should emit selected event when space is pressed on focused list item', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      const listener = jasmine.createSpy('selected listener');
      this.context.component.addEventListener(LIST_ITEM_CONSTANTS.events.SELECT, listener);
      await tick();
      dispatchKeyEvent(this.context.getListItemComponents()[0], 'keydown', 'Space');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should not ignore modifier keys when pressed on focused list item', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      const listener = jasmine.createSpy('selected listener');
      this.context.component.addEventListener(LIST_ITEM_CONSTANTS.events.SELECT, listener);
      const listItemComponents = this.context.getListItemComponents();
      const firstItem = listItemComponents[0];
      const secondItem = listItemComponents[1];
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' ,ctrlKey: true})); 
      this.context.component.focus();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' ,altKey: true})); 
      this.context.component.focus();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' ,shiftKey: true})); 
      this.context.component.focus();
      this.context.component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' ,metaKey: true}));
      expect(listener).toHaveBeenCalledTimes(0);
    })

    it('should focus first list item when home is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      await tick();
      const listItemComponents = this.context.getListItemComponents();
      const firstListItem = getShadowElement(listItemComponents[0], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      const secondListItem = getShadowElement(listItemComponents[1], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      secondListItem.focus();
      dispatchKeyEvent(listItemComponents[1], 'keydown', 'Home', true);
      expect(getActiveElement()).toBe(firstListItem);
    });

    it('should focus last list item when end is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      await tick();
      const listItemComponents = this.context.getListItemComponents();
      const lastListItem = getShadowElement(listItemComponents[2], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      const secondListItem = getShadowElement(listItemComponents[1], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      secondListItem.focus();
      dispatchKeyEvent(listItemComponents[1], 'keydown', 'End', true);
      expect(getActiveElement()).toBe(lastListItem);
    });

    it('should focus next list item when down arrow is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      await tick();
      const listItemComponents = this.context.getListItemComponents();
      const firstListItem = getShadowElement(listItemComponents[0], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      const secondListItem = getShadowElement(listItemComponents[1], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      firstListItem.focus();
      dispatchKeyEvent(listItemComponents[0], 'keydown', 'ArrowDown', true);
      expect(getActiveElement()).toBe(secondListItem);
    });

    it('should focus previous list item when up arrow is pressed', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      await tick();
      const listItemComponents = this.context.getListItemComponents();
      const firstListItem = getShadowElement(listItemComponents[0], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      const secondListItem = getShadowElement(listItemComponents[1], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      secondListItem.focus();
      dispatchKeyEvent(listItemComponents[1], 'keydown', 'ArrowUp', true);
      expect(getActiveElement()).toBe(firstListItem);
    });

    it('should wrap focus when up arrow is pressed on first list item', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      await tick();
      const listItemComponents = this.context.getListItemComponents();
      const firstListItem = getShadowElement(listItemComponents[0], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      const lastListItem = getShadowElement(listItemComponents[2], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      firstListItem.focus();
      dispatchKeyEvent(listItemComponents[1], 'keydown', 'ArrowUp', true);
      expect(getActiveElement()).toBe(lastListItem);
    });

    it('should wrap focus when down arrow is pressed on last list item', async function(this: ITestContext) {
      this.context = setupTestContext(true, listNumberItems);
      await tick();
      const listItemComponents = this.context.getListItemComponents();
      const firstListItem = getShadowElement(listItemComponents[0], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      const lastListItem = getShadowElement(listItemComponents[2], LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
      lastListItem.focus();
      dispatchKeyEvent(listItemComponents[1], 'keydown', 'ArrowDown', true);
      expect(getActiveElement()).toBe(firstListItem);
    });
  });

  describe('list with string values', function(this: ITestContext) {    
    it('should set a single selected string value via attribute', function(this: ITestContext) {
      this.context = setupTestContext(true, listStringItems);
      const selectedValue = '1';
      this.context.component.setAttribute(LIST_CONSTANTS.attributes.SELECTED_VALUE, selectedValue);
      const listItemComponents = this.context.getListItemComponents();
      expect(listItemComponents[0].selected).toBe(true);
      expect(listItemComponents[1].selected).toBe(false);
    });   
  });

  function setupTestContext(append = false, listItems: ITestListItemNumber[] | ITestListItemString[]): ITestListContext {
    const fixture = document.createElement('div');
    fixture.id = 'list-test-fixture';
    const component = document.createElement(LIST_CONSTANTS.elementName) as IListComponent;
    for (const item of listItems) {
      const listItem = document.createElement(LIST_ITEM_CONSTANTS.elementName) as IListItemComponent;
      listItem.value = item.value;
      listItem.textContent = item.text;
      component.appendChild(listItem);
      const divider = document.createElement(DIVIDER_CONSTANTS.elementName) as IDividerComponent;
      component.appendChild(divider);
    }
    fixture.appendChild(component);
    if (append) document.body.appendChild(fixture);
    return {
      component,
      getListItemComponents: () => Array.from(component.querySelectorAll(LIST_ITEM_CONSTANTS.elementName)),
      append: () => document.body.appendChild(fixture),
      destroy: () => removeElement(fixture)
    };
  }  
});
