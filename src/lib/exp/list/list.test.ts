import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import sinon from 'sinon';
import { TestHarness } from '../../../test/utils/test-harness';
import { IFocusIndicatorComponent } from '../../focus-indicator/focus-indicator';
import { IStateLayerComponent } from '../../state-layer/state-layer';
import { IListItemComponentExp, LIST_ITEM_CONSTANTS_EXP } from './list-item';
import './list/list';
import { IListComponentExp } from './list/list';
import { LIST_CONSTANTS_EXP } from './list/list-constants';

const DEFAULT_HREF = 'https://www.tylertech.com/';

describe('List', () => {
  it('should be accessible', async () => {
    const ctx = await createFixture();
    await expect(ctx.list).to.be.accessible();
  });

  it('should have a default role of list', async () => {
    const ctx = await createFixture();
    expect(ctx.list.getAttribute('role')).to.equal('list');
  });

  it('should set list item role to listitem', async () => {
    const ctx = await createFixture();
    expect(ctx.listItemsAttr('role', 'listitem')).to.true;
  });

  it('should dispatch select event when clicked', async () => {
    const ctx = await createFixture();
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-exp-select', spy);
    ctx.listItems[1].click();
    expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
  });

  it('should dispatch select event when enter key is pressed', async () => {
    const ctx = await createFixture();
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-exp-select', spy);
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
  });

  it('should dispatch select event when space key is pressed', async () => {
    const ctx = await createFixture();
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-exp-select', spy);
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
  });

  it('should not dispatch select event when disabled', async () => {
    const ctx = await createFixture({ disabled: true });
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-exp-select', spy);
    ctx.listItems[1].click();
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ctx.listItems[1].dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(spy).to.not.have.been.called;
  });

  it('should not dispatch select event when noninteractive', async () => {
    const ctx = await createFixture({ nonInteractive: true });
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-exp-select', spy);
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

    ctx.list.setAttribute(LIST_CONSTANTS_EXP.attributes.SELECTED_VALUE, '2');
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
    expect(ctx.listItems[0].getAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.HREF)).to.equal(DEFAULT_HREF);
    expect(anchor.href).to.equal(DEFAULT_HREF);
    expect(anchor.target).to.equal('_blank');
    await expect(ctx.list).to.be.accessible();
  });

  it('should set anchor target', async () => {
    const ctx = await createFixture({ anchor: true, anchorTarget: '_self' });
    const anchor = ctx.getListItemRootElement(0) as HTMLAnchorElement;

    expect(anchor).to.be.instanceOf(HTMLAnchorElement);
    expect(ctx.listItems[0].target).to.equal('_self');
    expect(ctx.listItems[0].getAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.TARGET)).to.equal('_self');
    expect(anchor.href).to.equal(DEFAULT_HREF);
    expect(anchor.target).to.equal('_self');
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

    expect(anchor.target).to.equal('_blank');
    
    ctx.listItems[0].target = '_self';
    expect(anchor.target).to.equal('_self');
  });

  it('should set disabled', async () => {
    const ctx = await createFixture({ disabled: true });

    expect(ctx.listItemsAttr('disabled', '')).to.true;
    expect(ctx.listItemsAttr('tabindex', '-1')).to.true;
    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;
    await expect(ctx.list).to.be.accessible();
  });

  it('should re-enable interactivity after disabled', async () => {
    const ctx = await createFixture({ disabled: true });

    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;

    ctx.list.disabled = false;
    expect(ctx.listItemsAttr('tabindex', '0')).to.true;
    expect(ctx.hasStateLayer()).to.be.true;
    expect(ctx.hasFocusIndicator()).to.be.true; 
  });

  it('should set nonInteractive', async () => {
    const ctx = await createFixture({ nonInteractive: true });

    expect(ctx.listItemsAttr('tabindex', '-1')).to.true;
    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;
    await expect(ctx.list).to.be.accessible();
  });

  it('should set non-interactive via static attribute for backwards compatibility', async () => {
    const ctx = await createFixture();

    ctx.list.static = true;
    expect(ctx.list.static).to.be.true;
    expect(ctx.list.nonInteractive).to.be.true;
    expect(ctx.listItemsAttr('tabindex', '-1')).to.true;
    expect(ctx.listItemsAttr(LIST_ITEM_CONSTANTS_EXP.attributes.STATIC, '')).to.true;
    expect(ctx.listItemsAttr(LIST_ITEM_CONSTANTS_EXP.attributes.NON_INTERACTIVE, '')).to.true;
    expect(ctx.hasStateLayer()).to.be.false;
    expect(ctx.hasFocusIndicator()).to.be.false;

    ctx.list.static = false;
    expect(ctx.list.static).to.be.false;
    expect(ctx.list.nonInteractive).to.be.false;
    expect(ctx.listItemsAttr('tabindex', '0')).to.true;
    expect(ctx.listItemsAttr(LIST_ITEM_CONSTANTS_EXP.attributes.STATIC, '')).to.false;
    expect(ctx.listItemsAttr(LIST_ITEM_CONSTANTS_EXP.attributes.NON_INTERACTIVE, '')).to.false;
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
    expect(ctx.listItemsAttr('tabindex', '0')).to.true;
    expect(ctx.hasStateLayer()).to.be.true;
    expect(ctx.hasFocusIndicator()).to.be.true;
  });

  it('should set dense', async () => {
    const ctx = await createFixture({ dense: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.DENSE)).to.true;
    expect(ctx.listItemsAttr('dense', '')).to.true;

    ctx.list.dense = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.DENSE)).to.false;
    expect(ctx.listItemsAttr('dense', '')).to.false;
  });

  it('should set indented', async () => {
    const ctx = await createFixture({ indented: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.INDENTED)).to.true;
    expect(ctx.listItemsAttr('indented', '')).to.true;

    ctx.list.indented = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.INDENTED)).to.false;
    expect(ctx.listItemsAttr('indented', '')).to.false;
  });

  it('should set twoLine', async () => {
    const ctx = await createFixture({ twoLine: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.TWO_LINE)).to.true;
    expect(ctx.listItemsAttr('two-line', '')).to.true;

    ctx.list.twoLine = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.TWO_LINE)).to.false;
    expect(ctx.listItemsAttr('two-line', '')).to.false;
  });

  it('should set threeLine', async () => {
    const ctx = await createFixture({ threeLine: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.THREE_LINE)).to.true;
    expect(ctx.listItemsAttr('three-line', '')).to.true;

    ctx.list.threeLine = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.THREE_LINE)).to.false;
    expect(ctx.listItemsAttr('three-line', '')).to.false;
  });

  it('should set wrap', async () => {
    const ctx = await createFixture({ wrap: true });

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.WRAP)).to.true;
    expect(ctx.listItemsAttr('wrap', '')).to.true;

    ctx.list.wrap = false;

    expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.WRAP)).to.false;
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
    expect(ctx.listItems[1].hasAttribute(LIST_ITEM_CONSTANTS_EXP.attributes.ACTIVE)).to.be.true;
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
      nonInteractive: true,
      disabled: true,
      dense: true,
      twoLine: true,
      threeLine: true,
      selectedValue: '4'
    });

    const listItem = document.createElement('forge-list-item-exp');
    listItem.value = '4';
    ctx.list.appendChild(listItem);

    expect(listItem.nonInteractive).to.be.true;
    expect(listItem.disabled).to.be.true;
    expect(listItem.dense).to.be.true;
    expect(listItem.twoLine).to.be.true;
    expect(listItem.threeLine).to.be.true;
    expect(listItem.selected).to.be.true;
  });

  it('should not dispatch select event if target element has forge-ignore attribute', async () => {
    const ctx = await createFixture();
    const spy = sinon.spy();
    ctx.list.addEventListener('forge-list-item-exp-select', spy);

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
  nonInteractive?: boolean;
  disabled?: boolean;
  dense?: boolean;
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
  nonInteractive,
  disabled,
  dense,
  indented,
  selectedValue,
  twoLine,
  threeLine,
  wrap,
  anchor,
  anchorTarget = '_blank',
  withCheckbox,
  withRadioButton
}: ListFixtureConfig = {}): Promise<ListHarness> {
  const el = await fixture<IListComponentExp>(html`
    <forge-list-exp
      ?non-interactive=${nonInteractive}
      ?disabled=${disabled}
      ?dense=${dense}
      ?indented=${indented}
      ?two-line=${twoLine}
      ?three-line=${threeLine}
      ?wrap=${wrap}
      .selectedValue=${selectedValue}>
      <forge-list-item-exp .href=${anchor ? DEFAULT_HREF : ''} .target=${anchorTarget} value="1">
        One
        ${withCheckbox ? html`<input type="checkbox" slot="trailing" />` : null}
        ${withRadioButton ? html`<input type="radio" slot="trailing" />` : null}
      </forge-list-item-exp>
      <forge-list-item-exp value="2">Two</forge-list-item-exp>
      <forge-list-item-exp value="3">Three</forge-list-item-exp>
    </forge-list-exp>
  `);
  return new ListHarness(el);
}

class ListHarness extends TestHarness<IListComponentExp> {
  public list: IListComponentExp;
  public listItems: IListItemComponentExp[];

  constructor(el: IListComponentExp) {
    super(el);
  }
  
  public initElementRefs(): void {
    this.list = this.element;
    this.listItems = Array.from(this.element.querySelectorAll('forge-list-item-exp'));
  }

  public listItemsAttr(attr: string, value: string): boolean {
    return this.listItems.every(li => li.getAttribute(attr) === value);
  }

  public getListItemRootElement(index: number): HTMLElement {
    const item = this.listItems[index];
    return item.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS_EXP.selectors.ROOT) as HTMLElement;
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
}
