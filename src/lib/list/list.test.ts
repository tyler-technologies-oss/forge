import { expect } from '@esm-bundle/chai';
import { nothing } from 'lit';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import sinon from 'sinon';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { TestHarness } from '../../test/utils/test-harness';
import { IFocusIndicatorComponent } from '../focus-indicator/focus-indicator';
import { IStateLayerComponent } from '../state-layer/state-layer';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from './list-item';
import './list/list';
import { IListComponent } from './list/list';
import { LIST_CONSTANTS } from './list/list-constants';

const DEFAULT_HREF = 'https://www.tylertech.com/';

describe('List', () => {
  it('should be accessible', async () => {
    const ctx = await createFixture();
    await expect(ctx.list).to.be.accessible();
  });

  it('should have a default role of list', async () => {
    const ctx = await createFixture();
    expect(ctx.list.getAttribute('role')).to.equal('list');
    expect(ctx.listItemsAttr('role', 'listitem')).to.true;
  });

  it('should set role to listbox', async () => {
    const ctx = await createFixture({ role: 'listbox' });
    expect(ctx.list.getAttribute('role')).to.equal('listbox');
    expect(ctx.listItemsAttr('role', 'option')).to.true;
  });

  it('should set role to menu', async () => {
    const ctx = await createFixture({ role: 'menu' });
    expect(ctx.list.getAttribute('role')).to.equal('menu');
    expect(ctx.listItemsAttr('role', 'menuitem')).to.true;
  });

  it('should update role dynamically', async () => {
    const ctx = await createFixture();
    expect(ctx.listItemsAttr('role', 'listitem')).to.true;
    
    ctx.list.role = 'listbox';
    await elementUpdated(ctx.list);
    expect(ctx.listItemsAttr('role', 'option')).to.true;

    ctx.list.role = 'menu';
    await elementUpdated(ctx.list);
    expect(ctx.listItemsAttr('role', 'menuitem')).to.true;

    ctx.list.role = 'list';
    await elementUpdated(ctx.list);
    expect(ctx.listItemsAttr('role', 'listitem')).to.true;
  });

  it('should dispatch select event when clicked', async () => {
    const ctx = await createFixture();
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-select', spy);
    ctx.listItems[1].click();
    expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
  });

  it('should dispatch select event when enter key is pressed', async () => {
    const ctx = await createFixture();
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-select', spy);
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
  });

  it('should dispatch select event when space key is pressed', async () => {
    const ctx = await createFixture();
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-select', spy);
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
  });

  it('should not dispatch select event when disabled', async () => {
    const ctx = await createFixture({ disabled: true });
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-select', spy);
    ctx.listItems[1].click();
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(spy).to.not.have.been.called;
  });

  it('should not dispatch select event when noninteractive', async () => {
    const ctx = await createFixture({ nonInteractive: true });
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-select', spy);
    ctx.listItems[1].click();
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(spy).to.not.have.been.called;
  });

  it('should set selected via selectedValue on list', async () => {
    const ctx = await createFixture({ selectedValue: '2' });

    expect(ctx.listItems[1].selected).to.true;
    expect(ctx.listItems.filter(li => li.selected).length).to.be.equal(1);
    await expect(ctx.list).to.be.accessible();
  });

  it('should set selected value via attribute', async () => {
    const ctx = await createFixture();

    ctx.list.setAttribute(LIST_CONSTANTS.attributes.SELECTED_VALUE, '2');
    expect(ctx.list.selectedValue).to.equal('2');
    expect(ctx.listItems[1].selected).to.be.true;
  });

  it('should remove selected value', async () => {
    const ctx = await createFixture({ selectedValue: '2' });

    expect(ctx.listItems[1].selected).to.true;

    ctx.list.selectedValue = null;
    expect(ctx.listItems.filter(li => li.selected).length).to.be.equal(0);
  });

  it('should render anchor element when href is set', async () => {
    const ctx = await createFixture({ anchor: true });
    const anchor = ctx.getListItemRootElement(0) as HTMLAnchorElement;

    expect(anchor).to.be.instanceOf(HTMLAnchorElement);
    expect(ctx.listItems[0].href).to.equal(DEFAULT_HREF);
    expect(ctx.listItems[0].getAttribute(LIST_ITEM_CONSTANTS.attributes.HREF)).to.equal(DEFAULT_HREF);
    expect(anchor.href).to.equal(DEFAULT_HREF);
    expect(anchor.target).to.equal('');
    await expect(ctx.list).to.be.accessible();
  });

  it('should set anchor target', async () => {
    const ctx = await createFixture({ anchor: true, anchorTarget: '_self' });
    const anchor = ctx.getListItemRootElement(0) as HTMLAnchorElement;

    expect(anchor).to.be.instanceOf(HTMLAnchorElement);
    expect(ctx.listItems[0].target).to.equal('_self');
    expect(ctx.listItems[0].getAttribute(LIST_ITEM_CONSTANTS.attributes.TARGET)).to.equal('_self');
    expect(anchor.href).to.equal(DEFAULT_HREF);
    expect(anchor.target).to.equal('_self');
  });

  it('should set anchor download', async () => {
    const ctx = await createFixture({ anchor: true });
    const anchor = ctx.getListItemRootElement(0) as HTMLAnchorElement;

    expect(anchor).to.be.instanceOf(HTMLAnchorElement);

    ctx.listItems[0].download = 'file.txt';
    expect(anchor.download).to.equal('file.txt');
  });

  it('should set anchor rel', async () => {
    const ctx = await createFixture({ anchor: true });
    const anchor = ctx.getListItemRootElement(0) as HTMLAnchorElement;

    expect(anchor).to.be.instanceOf(HTMLAnchorElement);

    ctx.listItems[0].rel = 'noopener';
    expect(anchor.rel).to.equal('noopener');
  });

  it('should reset root element when href is removed', async () => {
    const ctx = await createFixture({ anchor: true });
    const anchor = ctx.getListItemRootElement(0) as HTMLAnchorElement;

    expect(anchor).to.be.instanceOf(HTMLAnchorElement);

    ctx.listItems[0].href = '';
    expect(ctx.getListItemRootElement(0)).to.be.instanceOf(HTMLDivElement);
  });

  it('should update anchor target element', async () => {
    const ctx = await createFixture({ anchor: true });
    const anchor = ctx.getListItemRootElement(0) as HTMLAnchorElement;

    expect(anchor.target).to.equal('');
    
    ctx.listItems[0].target = '_self';
    expect(anchor.target).to.equal('_self');
  });

  it('should click <a> tag when click() is called', async () => {
    const ctx = await createFixture();

    const firstListItem = ctx.listItems[0];
    window['forgeAnchorTest'] = () => {};
    const href = 'javascript: forgeAnchorTest()';
    firstListItem.href = href;
    await elementUpdated(firstListItem);
    const testSpy = sinon.spy(window as any, 'forgeAnchorTest');

    firstListItem.click();
    await elementUpdated(firstListItem);
    delete window['forgeAnchorTest'];

    expect(testSpy).to.have.been.calledOnce;
  });

  it('should click <a> tag via mouse', async () => {
    const ctx = await createFixture();

    const firstListItem = ctx.listItems[0];
    window['forgeAnchorTest'] = () => {};
    const href = `javascript: forgeAnchorTest()`;
    firstListItem.href = href;
    const testSpy = sinon.spy(window as any, 'forgeAnchorTest');

    await ctx.clickElement(firstListItem);
    await elementUpdated(firstListItem);
    delete window['forgeAnchorTest'];

    expect(testSpy).to.have.been.calledOnce;
  });

  it('should click <a> tag via keyboard when enter key is pressed', async () => {
    const ctx = await createFixture();

    const firstListItem = ctx.listItems[0];
    window['forgeAnchorTest'] = () => {};
    const href = `javascript: forgeAnchorTest()`;
    firstListItem.href = href;
    const testSpy = sinon.spy(window as any, 'forgeAnchorTest');

    firstListItem.focus();
    await sendKeys({ press: 'Enter' });
    await elementUpdated(firstListItem);
    delete window['forgeAnchorTest'];

    expect(testSpy).to.have.been.calledOnce;
  });

  it('should set disabled', async () => {
    const ctx = await createFixture({ disabled: true });

    expect(ctx.listItemsAttr('disabled', '')).to.true;
    expect(ctx.listItemsTabIndex(-1)).to.true;
    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;
    await expect(ctx.list).to.be.accessible();
  });

  it('should re-enable interactivity after disabled', async () => {
    const ctx = await createFixture({ disabled: true });

    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;

    ctx.list.disabled = false;
    expect(ctx.listItemsTabIndex(0)).to.true;
    expect(ctx.hasStateLayer()).to.be.true;
    expect(ctx.hasFocusIndicator()).to.be.true; 
  });

  it('should set nonInteractive', async () => {
    const ctx = await createFixture({ nonInteractive: true });

    expect(ctx.listItemsTabIndex(-1)).to.true;
    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;
    await expect(ctx.list).to.be.accessible();
  });

  it('should set non-interactive via static attribute for backwards compatibility', async () => {
    const ctx = await createFixture();

    ctx.list.static = true;
    expect(ctx.list.static).to.be.true;
    expect(ctx.list.nonInteractive).to.be.true;
    expect(ctx.listItemsTabIndex(-1)).to.true;
    expect(ctx.listItemsAttr(LIST_ITEM_CONSTANTS.attributes.STATIC, '')).to.true;
    expect(ctx.listItemsAttr(LIST_ITEM_CONSTANTS.attributes.NON_INTERACTIVE, '')).to.true;
    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;

    ctx.list.static = false;
    expect(ctx.list.static).to.be.false;
    expect(ctx.list.nonInteractive).to.be.false;
    expect(ctx.listItemsTabIndex(0)).to.true;
    expect(ctx.listItemsAttr(LIST_ITEM_CONSTANTS.attributes.STATIC, '')).to.false;
    expect(ctx.listItemsAttr(LIST_ITEM_CONSTANTS.attributes.NON_INTERACTIVE, '')).to.false;
    expect(ctx.hasStateLayer()).to.be.true;
    expect(ctx.hasFocusIndicator()).to.be.true;

    ctx.listItems[0].static = true;
    expect(ctx.listItems[0].static).to.be.true;
    expect(ctx.listItems[0].nonInteractive).to.be.true;
  });

  it('should re-enable interactivity after nonInteractive', async () => {
    const ctx = await createFixture({ nonInteractive: true });

    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;

    ctx.list.nonInteractive = false;
    expect(ctx.listItemsTabIndex(0)).to.true;
    expect(ctx.hasStateLayer()).to.be.true;
    expect(ctx.hasFocusIndicator()).to.be.true;
  });

  it('should set dense', async () => {
    const ctx = await createFixture({ dense: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.DENSE)).to.true;
    expect(ctx.listItemsAttr('dense', '')).to.true;

    ctx.list.dense = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.DENSE)).to.false;
    expect(ctx.listItemsAttr('dense', '')).to.false;
  });

  it('should set indented', async () => {
    const ctx = await createFixture({ indented: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.INDENTED)).to.true;
    expect(ctx.listItemsAttr('indented', '')).to.true;

    ctx.list.indented = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.INDENTED)).to.false;
    expect(ctx.listItemsAttr('indented', '')).to.false;
  });

  it('should set twoLine', async () => {
    const ctx = await createFixture({ twoLine: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE)).to.true;
    expect(ctx.listItemsAttr('two-line', '')).to.true;

    ctx.list.twoLine = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE)).to.false;
    expect(ctx.listItemsAttr('two-line', '')).to.false;
  });

  it('should set threeLine', async () => {
    const ctx = await createFixture({ threeLine: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE)).to.true;
    expect(ctx.listItemsAttr('three-line', '')).to.true;

    ctx.list.threeLine = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE)).to.false;
    expect(ctx.listItemsAttr('three-line', '')).to.false;
  });

  it('should set wrap', async () => {
    const ctx = await createFixture({ wrap: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.WRAP)).to.true;
    expect(ctx.listItemsAttr('wrap', '')).to.true;

    ctx.list.wrap = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.WRAP)).to.false;
    expect(ctx.listItemsAttr('wrap', '')).to.false;
  });

  it('should focus next item when down arrow key is pressed', async () => {
    const ctx = await createFixture();

    ctx.focusListItem(0);
    ctx.listItemPressKey(0, 'ArrowDown');
    expect(ctx.isListItemFocused(1)).to.be.true;
  });

  it('should focus previous item when down up key is pressed', async () => {
    const ctx = await createFixture();

    ctx.focusListItem(1);
    ctx.listItemPressKey(1, 'ArrowUp');
    expect(ctx.isListItemFocused(0)).to.be.true;
  });

  it('should focus first item when home key is pressed', async () => {
    const ctx = await createFixture();

    ctx.focusListItem(1);
    ctx.listItemPressKey(1, 'Home');
    expect(ctx.isListItemFocused(0)).to.be.true;
  });

  it('should focus last item when end key is pressed', async () => {
    const ctx = await createFixture();

    ctx.focusListItem(1);
    ctx.listItemPressKey(1, 'End');
    expect(ctx.isListItemFocused(2)).to.be.true;
  });

  it('should cycle focus to first item when down arrow pressed on last item', async () => {
    const ctx = await createFixture();

    ctx.focusListItem(2);
    ctx.listItemPressKey(2, 'ArrowDown');
    expect(ctx.isListItemFocused(0)).to.be.true;
  });

  it('should cycle focus to last item when up arrow pressed on first item', async () => {
    const ctx = await createFixture();

    ctx.focusListItem(0);
    ctx.listItemPressKey(0, 'ArrowUp');
    expect(ctx.isListItemFocused(2)).to.be.true;
  });

  it('should not move focus when modifier key is pressed', async () => {
    const ctx = await createFixture();

    ctx.focusListItem(1);
    ctx.listItemPressKey(1, 'ArrowDown', { shiftKey: true });
    ctx.listItemPressKey(1, 'ArrowDown', { altKey: true });
    ctx.listItemPressKey(1, 'ArrowDown', { ctrlKey: true });
    ctx.listItemPressKey(1, 'ArrowDown', { metaKey: true });
    expect(ctx.isListItemFocused(1)).to.be.true;
  });

  it('should activate focus indicator when active set', async () => {
    const ctx = await createFixture();

    ctx.listItems[1].active = true;
    expect(ctx.listItems[1].active).to.be.true;
    expect(ctx.listItems[1].hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).to.be.true;
    expect(ctx.listItemActive(0)).to.be.false; 
    expect(ctx.listItemActive(1)).to.be.true; 
    expect(ctx.listItemActive(0)).to.be.false; 
  });

  it('should set selected when value matches list selected value', async () => {
    const ctx = await createFixture({ selectedValue: 'some-value' });

    expect(ctx.listItems[1].selected).to.be.false;
    
    ctx.listItems[1].value = 'some-value';
    expect(ctx.listItems[1].selected).to.be.true;
  });

  it('should toggle slotted checkbox when list item is selected', async () => {
    const ctx = await createFixture({ withCheckbox: true });

    expect(ctx.listItems[0].selected).to.be.false;
    expect((ctx.listItems[0].querySelector('input[type=checkbox]') as HTMLInputElement)?.checked).to.be.false;

    ctx.listItems[0].selected = true;
    expect(ctx.listItems[0].selected).to.be.true;
    expect((ctx.listItems[0].querySelector('input[type=checkbox]') as HTMLInputElement)?.checked).to.be.true;
  });

  it('should toggle slotted radio button when list item is selected', async () => {
    const ctx = await createFixture({ withRadioButton: true });

    expect(ctx.listItems[0].selected).to.be.false;
    expect((ctx.listItems[0].querySelector('input[type=radio]') as HTMLInputElement)?.checked).to.be.false;

    ctx.listItems[0].selected = true;
    expect(ctx.listItems[0].selected).to.be.true;
    expect((ctx.listItems[0].querySelector('input[type=radio]') as HTMLInputElement)?.checked).to.be.true;
  });

  it('should inherit parent list state when adding new list item', async () => {
    const ctx = await createFixture({
      role: 'listbox',
      nonInteractive: true,
      disabled: true,
      dense: true,
      propagateClick: false,
      twoLine: true,
      threeLine: true,
      selectedValue: '4'
    });

    const listItem = document.createElement('forge-list-item');
    listItem.value = '4';
    ctx.list.appendChild(listItem);

    expect(listItem.nonInteractive).to.be.true;
    expect(listItem.disabled).to.be.true;
    expect(listItem.dense).to.be.true;
    expect(listItem.propagateClick).to.be.false;
    expect(listItem.twoLine).to.be.true;
    expect(listItem.threeLine).to.be.true;
    expect(listItem.selected).to.be.true;
    expect(listItem.role).to.equal('option');
  });

  it('should not dispatch select event if target element has forge-ignore attribute', async () => {
    const ctx = await createFixture();
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-select', spy);

    const ignoredElement = document.createElement('button');
    ignoredElement.type = 'button';
    ignoredElement.setAttribute('forge-ignore', '');
    ctx.listItems[0].appendChild(ignoredElement);

    await elementUpdated(ctx.list);
    ignoredElement.click();

    expect(spy).to.not.have.been.called;
  });
});

interface ListFixtureConfig {
  role?: 'list' | 'listbox' | 'menu';
  nonInteractive?: boolean;
  disabled?: boolean;
  dense?: boolean;
  propagateClick?: boolean;
  indented?: boolean;
  selectedValue?: any;
  twoLine?: boolean;
  threeLine?: boolean;
  wrap?: boolean;
  anchor?: boolean;
  anchorTarget?: '_blank' | '_self';
  withCheckbox?: boolean;
  withRadioButton?: boolean;
}

async function createFixture({
  role,
  nonInteractive,
  disabled,
  dense,
  propagateClick,
  indented,
  selectedValue,
  twoLine,
  threeLine,
  wrap,
  anchor,
  anchorTarget,
  withCheckbox,
  withRadioButton
}: ListFixtureConfig = {}): Promise<ListHarness> {
  const el = await fixture<IListComponent>(html`
    <forge-list
      role=${role ?? nothing}
      ?non-interactive=${nonInteractive}
      ?disabled=${disabled}
      ?dense=${dense}
      ?indented=${indented}
      ?two-line=${twoLine}
      ?three-line=${threeLine}
      ?wrap=${wrap}
      .propagateClick=${propagateClick}
      .selectedValue=${selectedValue}>
      <forge-list-item .href=${anchor ? DEFAULT_HREF : ''} .target=${anchorTarget ?? ''} value="1">
        One
        ${withCheckbox ? html`<input type="checkbox" slot="trailing" />` : null}
        ${withRadioButton ? html`<input type="radio" slot="trailing" />` : null}
      </forge-list-item>
      <forge-list-item value="2">Two</forge-list-item>
      <forge-list-item value="3">Three</forge-list-item>
    </forge-list>
  `);
  return new ListHarness(el);
}

class ListHarness extends TestHarness<IListComponent> {
  public list: IListComponent;
  public listItems: IListItemComponent[];

  constructor(el: IListComponent) {
    super(el);
  }
  
  public initElementRefs(): void {
    this.list = this.element;
    this.listItems = Array.from(this.element.querySelectorAll('forge-list-item'));
  }

  public listItemsAttr(attr: string, value: string): boolean {
    return this.listItems.every(li => li.getAttribute(attr) === value);
  }

  public listItemsTabIndex(tabIndex: number): boolean {
    return this.listItems.every(li => (li.shadowRoot?.firstElementChild as HTMLElement)?.tabIndex === tabIndex);
  }

  public getListItemRootElement(index: number): HTMLElement {
    const item = this.listItems[index];
    return item.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;
  }

  public hasStateLayer(): boolean {
    return this.listItems.every(li => !!(getShadowElement(li, 'forge-state-layer') as IStateLayerComponent));
  }

  public hasFocusIndicator(): boolean {
    return this.listItems.every(li => !!(getShadowElement(li, 'forge-focus-indicator') as IFocusIndicatorComponent));
  }

  public listItemPressKey(index: number, key: string, modifierKeys?: { shiftKey?: true, altKey?: true, ctrlKey?: true, metaKey?: true }): void {
    this.listItems[index].dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...modifierKeys }));
  }

  public focusListItem(index: number): void {
    this.listItems[index].focus();
  }

  public isListItemFocused(index: number): boolean {
    return this.listItems[index].matches(':focus');
  }

  public listItemActive(index: number): boolean {
    const focusIndicator = getShadowElement(this.listItems[index], 'forge-focus-indicator') as IFocusIndicatorComponent;
    return focusIndicator?.active;
  }

  public clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();
    return sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }
}
