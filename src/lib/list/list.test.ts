import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import sinon from 'sinon';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import { IFocusIndicatorComponent } from '../focus-indicator/focus-indicator';
import { IStateLayerComponent } from '../state-layer/state-layer';
import { IListItemComponent, LIST_ITEM_CONSTANTS } from './list-item';
import { IListComponent } from './list/list';
import { LIST_CONSTANTS } from './list/list-constants';
import { IMenuComponent } from '../menu/menu';

import './list/list';
import '../menu/menu';

describe('List', () => {
  describe('accessibility', () => {
    it('should be accessible', async () => {
      const ctx = await createFixture();
      await expect(ctx.list).to.be.accessible();
    });

    it('should have a default role of list', async () => {
      const ctx = await createFixture();
      expect(ctx.list.getAttribute('role')).to.equal('list');
      expect(ctx.listItemsAttr('role', 'listitem')).to.true;
    });
  });

  describe('select event', () => {
    it('should dispatch select event when clicked', async () => {
      const ctx = await createFixture();
      const spy = sinon.spy();
      ctx.list.addEventListener('forge-list-item-select', spy);
      ctx.clickListItem(1);
      expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
    });

    it('should dispatch select event when enter key is pressed', async () => {
      const ctx = await createFixture();
      const spy = sinon.spy();
      ctx.list.addEventListener('forge-list-item-select', spy);
      ctx.listItems[1].querySelector('button')?.focus();

      await sendKeys({ press: 'Enter' });

      expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
    });

    it('should dispatch select event when space key is pressed', async () => {
      const ctx = await createFixture();
      const spy = sinon.spy();
      ctx.list.addEventListener('forge-list-item-select', spy);
      ctx.listItems[1].querySelector('button')?.focus();

      await sendKeys({ press: ' ' });

      expect(spy).to.have.been.calledOnceWith(sinon.match.has('detail', sinon.match.has('value', '2')));
    });

    it('should not dispatch select event when disabled', async () => {
      const ctx = await createFixture({ disabled: true });
      const spy = sinon.spy();
      ctx.list.addEventListener('forge-list-item-select', spy);

      ctx.listItems[0].querySelector('button')?.focus();
      ctx.clickListItem(0);
      await sendKeys({ press: 'Enter' });
      await sendKeys({ press: ' ' });

      expect(spy).to.not.have.been.called;
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

  describe('selected', () => {
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

    it('should set selected when value matches list selected value', async () => {
      const ctx = await createFixture({ selectedValue: 'some-value' });

      expect(ctx.listItems[1].selected).to.be.false;

      ctx.listItems[1].value = 'some-value';
      expect(ctx.listItems[1].selected).to.be.true;
    });
  });

  describe('disabled', () => {
    it('should set disabled', async () => {
      const ctx = await createFixture({ disabled: true });

      expect(ctx.getListItemRootElement(0).classList.contains(LIST_ITEM_CONSTANTS.classes.DISABLED)).to.be.true;
      expect(ctx.hasStateLayer()).to.be.false;
      expect(ctx.hasFocusIndicator()).to.be.false;
      await expect(ctx.list).to.be.accessible();
    });

    it('should re-enable interactivity after disabled', async () => {
      const ctx = await createFixture({ disabled: true });

      expect(ctx.hasStateLayer()).to.be.false;
      expect(ctx.hasFocusIndicator()).to.be.false;

      (ctx.listItems[0].querySelector('button') as HTMLButtonElement).disabled = false;

      await elementUpdated(ctx.list);

      expect(ctx.hasStateLayer()).to.be.true;
      expect(ctx.hasFocusIndicator()).to.be.true;
    });
  });

  describe('API', () => {
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

    it('should set multicolumn', async () => {
      const ctx = await createFixture({ multicolumn: true });

      // Assert host attribute is set
      expect(ctx.list.hasAttribute(LIST_CONSTANTS.attributes.MULTICOLUMN)).to.true;

      // Assert CSS class is added to inner element
      const innerElement = getShadowElement(ctx.list, LIST_CONSTANTS.selectors.INNER);
      expect(innerElement.classList.contains(LIST_CONSTANTS.classes.MULTICOLUMN)).to.be.true;

      // Assert child list items do NOT receive the property (unlike dense/wrap)
      expect(ctx.listItemsAttr('multicolumn', '')).to.false;

      // Test toggling off
      ctx.list.multicolumn = false;

      // Assert host attribute is removed
      expect(ctx.list.hasAttribute(LIST_CONSTANTS.attributes.MULTICOLUMN)).to.false;

      // Assert CSS class is removed from inner element
      expect(innerElement.classList.contains(LIST_CONSTANTS.classes.MULTICOLUMN)).to.be.false;
    });
  });

  describe('focus indicator', () => {
    it('should not have focus indicator when no interactive element is present', async () => {
      const el = await fixture<IListComponent>(html`<forge-list-item>Test Item</forge-list-item>`);
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).not.to.be.ok;
    });

    it('should have focus indicator when button is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list-item>
          <button type="button">Test Item</button>
        </forge-list-item>
      `);
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).to.be.ok;
    });

    it('should have focus indicator when checkbox is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list-item>
          <input type="checkbox" slot="start" />
          Test Item
        </forge-list-item>
      `);
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).to.be.ok;
    });

    it('should have focus indicator when radio button is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list-item>
          <input type="radio" slot="start" />
          Test Item
        </forge-list-item>
      `);
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).to.be.ok;
    });

    it('should have focus indicator when anchor is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list-item>
          <a href="javascript: void(0);">Test Item</a>
        </forge-list-item>
      `);
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).to.be.ok;
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

    it('should not activate focus indicator when clicked', async () => {
      const el = await fixture<IListComponent>(html`<forge-list-item><button>Test Item</button></forge-list-item>`);
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
      const button = el.querySelector('button') as HTMLButtonElement;

      await clickElement(el);

      expect(button.matches(':focus')).to.be.true;
      expect(focusIndicator.active).to.be.false;
    });
  });

  describe('state layer', () => {
    it('should not have a state layer when no interactive element is present', async () => {
      const el = await fixture<IListComponent>(html`<forge-list-item>Test Item</forge-list-item>`);
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).not.to.be.ok;
    });

    it('should have state layer when button is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list-item>
          <button type="button">Test Item</button>
        </forge-list-item>
      `);
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).to.be.ok;
    });

    it('should have state layer when checkbox is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list-item>
          <input type="checkbox" slot="start" />
          Test Item
        </forge-list-item>
      `);
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).to.be.ok;
    });

    it('should have state layer when radio button is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list-item>
          <input type="radio" slot="start" />
          Test Item
        </forge-list-item>
      `);
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).to.be.ok;
    });

    it('should have state layer when anchor is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list-item>
          <a href="javascript: void(0);">Test Item</a>
        </forge-list-item>
      `);
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).to.be.ok;
    });

    it('should animate state layer when button is clicked', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <button type="button">Test Item</button>
          </forge-list-item>
        </forge-list>
      `);
      const listItem = el.querySelector('forge-list-item') as IListItemComponent;
      const stateLayerEl = listItem.shadowRoot!.querySelector('forge-state-layer') as IStateLayerComponent;
      const stateLayerAnimationSpy = sinon.spy((stateLayerEl as any)._core._adapter, 'startAnimation');

      await clickElement(listItem);

      expect(stateLayerAnimationSpy).to.have.been.calledOnce;
    });

    it('should animate state layer when checkbox is clicked', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            Test Item
            <input type="checkbox" slot="start" />
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const stateLayerEl = listItemEl.shadowRoot!.querySelector('forge-state-layer') as IStateLayerComponent;
      const stateLayerAnimationSpy = sinon.spy((stateLayerEl as any)._core._adapter, 'startAnimation');
      const checkbox = listItemEl.querySelector('input') as HTMLInputElement;

      checkbox.click();

      expect(stateLayerAnimationSpy).to.have.been.calledOnce;
    });

    it('should animate state layer when pressing enter key or space key on button', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <button type="button">Test Item</button>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const stateLayerEl = listItemEl.shadowRoot!.querySelector('forge-state-layer') as IStateLayerComponent;
      const stateLayerAnimationSpy = sinon.spy((stateLayerEl as any)._core._adapter, 'startAnimation');
      const button = listItemEl.querySelector('button') as HTMLButtonElement;

      button.focus();
      await sendKeys({ press: 'Enter' });

      expect(stateLayerAnimationSpy).to.have.been.calledOnce;

      await sendKeys({ press: ' ' });

      expect(stateLayerAnimationSpy).to.have.been.calledTwice;
    });
  });

  describe('list', () => {
    it('should inherit parent list state when adding new list item', async () => {
      const ctx = await createFixture({
        disabled: true,
        dense: true,
        twoLine: true,
        threeLine: true,
        selectedValue: '4'
      });

      const listItem = document.createElement('forge-list-item');
      listItem.value = '4';
      ctx.list.appendChild(listItem);

      expect(listItem.dense).to.be.true;
      expect(listItem.twoLine).to.be.true;
      expect(listItem.threeLine).to.be.true;
      expect(listItem.selected).to.be.true;
    });
  });

  describe('nested anchor', () => {
    it('should detect nested anchor element', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);" aria-label="Navigate to link">Test</a>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const rootEl = listItemEl.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;
      const internalAnchor = rootEl.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;

      expect(internalAnchor).to.exist;
      expect(internalAnchor.href).to.equal('javascript: void(0);');
      expect(internalAnchor.getAttribute('aria-hidden')).to.equal('true');
      expect(internalAnchor.classList.contains(LIST_ITEM_CONSTANTS.classes.INTERNAL_ANCHOR)).to.be.true;
      await expect(el).to.be.accessible();
    });

    it('should dynamically detect nested anchor element', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>List Item</forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const rootEl = listItemEl.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;

      await expect(el).to.be.accessible();

      const anchor = document.createElement('a');
      anchor.href = 'javascript: void(0);';
      anchor.setAttribute('aria-label', 'Navigate to link');
      listItemEl.appendChild(anchor);

      await elementUpdated(el);

      let internalAnchor = rootEl.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;

      expect(internalAnchor).to.exist;
      expect(internalAnchor.href).to.equal(anchor.href);
      expect(internalAnchor.getAttribute('aria-hidden')).to.equal('true');
      expect(internalAnchor.classList.contains(LIST_ITEM_CONSTANTS.classes.INTERNAL_ANCHOR)).to.be.true;
      await expect(el).to.be.accessible();

      anchor.remove();

      await elementUpdated(el);

      internalAnchor = rootEl.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;

      expect(internalAnchor).to.not.exist;
      await expect(el).to.be.accessible();
    });

    it('should dispatch select event when anchor is clicked', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);" aria-label="Navigate to link"></a>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const spy = sinon.spy();
      el.addEventListener('forge-list-item-select', spy);

      listItemEl.querySelector('a')?.click();

      expect(spy).to.have.been.calledOnce;
    });

    it('should click slotted anchor when clicking internal anchor', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);" aria-label="Navigate to link"></a>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const internalAnchor = listItemEl.shadowRoot!.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;
      const anchor = listItemEl.querySelector('a') as HTMLAnchorElement;
      const spy = sinon.spy(anchor, 'click');

      internalAnchor.click();

      expect(spy).to.have.been.calledOnce;
    });

    it('should click slotted anchor when pressing space key', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);">Test</a>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const anchor = listItemEl.querySelector('a') as HTMLAnchorElement;
      const spy = sinon.spy(anchor, 'click');

      anchor.focus();
      anchor.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      anchor.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true }));

      expect(spy).to.have.been.calledOnce;
    });

    it('should update internal anchor href when slotted href changes', async () => {
      const oldHref = 'javascript: void(0);';
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <a href=${oldHref}>Test</a>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const rootEl = listItemEl.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;
      const anchor = listItemEl.querySelector('a') as HTMLAnchorElement;
      const internalAnchor = rootEl.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;

      expect(internalAnchor.href).to.equal(oldHref);

      const newHref = 'javascript: console.log("changed")';
      anchor.href = newHref;
      await elementUpdated(el);

      expect(oldHref).not.to.equal(newHref);
      expect(internalAnchor.href).to.equal(newHref);
    });
  });

  describe('nested button', () => {
    it('should detect nested button element', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <button type="button">Button</button>
          </forge-list-item>
        </forge-list>
      `);

      await expect(el).to.be.accessible();
    });

    it('should dynamically detect nested button element', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>List Item</forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;

      await expect(el).to.be.accessible();

      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', 'Button');
      listItemEl.appendChild(button);

      await elementUpdated(el);

      await expect(el).to.be.accessible();

      button.remove();

      await elementUpdated(el);

      await expect(el).to.be.accessible();
    });

    it('should dispatch select event when button is clicked', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <button type="button" aria-label="Button"></button>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const spy = sinon.spy();
      el.addEventListener('forge-list-item-select', spy);

      listItemEl.querySelector('button')?.click();

      expect(spy).to.have.been.calledOnce;
    });

    it('should click slotted button when template clicked', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <button type="button" aria-label="Button"></button>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const rootEl = listItemEl.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;
      const button = listItemEl.querySelector('button') as HTMLButtonElement;
      const spy = sinon.spy(button, 'click');

      rootEl.click();

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('noninteractive', () => {
    it('should not attach to nested button if noninteractive', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item noninteractive>
            <button type="button">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const selectSpy = sinon.spy();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.querySelector('button')?.click();

      expect(selectSpy).to.not.have.been.called;
    });

    it('should detach from nested button if noninteractive dynamically', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <button type="button">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const selectSpy = sinon.spy();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.noninteractive = true;

      listItemEl.querySelector('button')?.click();

      expect(selectSpy).to.not.have.been.called;
    });

    it('should set noninteractive via parent list on all child list items', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list noninteractive>
          <forge-list-item>
            <button type="button">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;

      expect(listItemEl.noninteractive).to.be.true;

      el.noninteractive = false;

      expect(listItemEl.noninteractive).to.be.false;
    });

    it('should not attach to nested anchor if noninteractive', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item noninteractive>
            <a href="javascript: void(0);">Link</a>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const selectSpy = sinon.spy();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.querySelector('a')?.click();

      expect(selectSpy).to.not.have.been.called;
    });

    it('should detach from nested anchor if noninteractive dynamically', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);">Link</a>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const selectSpy = sinon.spy();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.noninteractive = true;

      listItemEl.querySelector('a')?.click();

      expect(selectSpy).to.not.have.been.called;
    });

    it('should be interactive is button is slotted into noninteractive slot', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            Text
            <button type="button" slot="secondary-text">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const stateLayerEl = listItemEl.shadowRoot!.querySelector('forge-state-layer');
      const focusIndicatorEl = listItemEl.shadowRoot!.querySelector('forge-focus-indicator');
      const selectSpy = sinon.spy();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.querySelector('button')?.click();

      expect(stateLayerEl).not.to.be.ok;
      expect(focusIndicatorEl).not.to.be.ok;
      expect(selectSpy).not.to.have.been.calledOnce;
    });
  });

  describe('with form control', () => {
    it('should toggle slotted start form control when clicked', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            Test Item
            <input type="checkbox" slot="start" />
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const checkbox = listItemEl.querySelector('input') as HTMLInputElement;

      expect(checkbox.checked).to.be.false;

      listItemEl.click();

      expect(checkbox.checked).to.be.true;
    });

    it('should not toggle start checkbox if forge-ignore attribute is present', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            Test Item
            <input type="checkbox" slot="start" forge-ignore />
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const checkbox = listItemEl.querySelector('input') as HTMLInputElement;

      expect(checkbox.checked).to.be.false;

      listItemEl.click();

      expect(checkbox.checked).to.be.false;
    });

    it('should dispatch select event when slotted label with for attribute is clicked', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            <label for="the-checkbox">Test Item</label>
            <input type="checkbox" id="the-checkbox" slot="start" />
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const labelEl = listItemEl.querySelector('label') as HTMLLabelElement;
      const checkboxEl = listItemEl.querySelector('input') as HTMLInputElement;
      const selectSpy = sinon.spy();
      el.addEventListener('forge-list-item-select', selectSpy);

      expect(listItemEl.noninteractive).to.be.false;
      expect(checkboxEl.checked).to.be.false;

      await clickElement(labelEl);

      expect(selectSpy).to.have.been.calledOnce;
      expect(checkboxEl.checked).to.be.true;
    });

    it('should click slotted form control when enter key is pressed', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-list-item>
            Test Item
            <input type="checkbox" slot="start" />
          </forge-list-item>
        </forge-list>
      `);
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const checkbox = listItemEl.querySelector('input') as HTMLInputElement;
      const spy = sinon.spy(checkbox, 'click');

      checkbox.focus();
      await sendKeys({ press: 'Enter' });

      expect(spy).to.have.been.calledOnce;
    });
  });

  describe('with menu', () => {
    it('should toggle its menu when clicked anywhere', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <forge-menu id="menu">
            <forge-list-item>
              <span id="slotted-content" slot="start">Text</span>
              <button type="button">Open menu</button>
            </forge-list-item>
          </forge-menu>
        </forge-list>
      `);
      const menu = el.querySelector('#menu') as IMenuComponent;
      const slottedContent = el.querySelector('#slotted-content') as HTMLElement;

      slottedContent.click();

      expect(menu.open).to.be.true;
    });

    it('should handle forge-ignore on menus identically to buttons', async () => {
      const el = await fixture<IListComponent>(html`
        <forge-list>
          <!-- with forge-ignore -->
          <forge-menu id="list-item-1-menu">
            <forge-list-item id="list-item-1">
              <button type="button">List item 1 button</button>
              <forge-menu forge-ignore id="list-item-1-slotted-menu" slot="end">
                <button id="list-item-1-slotted-menu-button" type="button">Open menu</button>
              </forge-menu>
              <button forge-ignore id="list-item-1-slotted-button" slot="end">Click me</button>
            </forge-list-item>
          </forge-menu>

          <!-- without forge-ignore -->
          <forge-menu id="list-item-2-menu">
            <forge-list-item id="list-item-2">
              <button type="button">List item 1 button</button>
              <forge-menu id="list-item-2-slotted-menu" slot="end">
                <button id="list-item-2-slotted-menu-button" type="button">Open menu</button>
              </forge-menu>
              <button id="list-item-2-slotted-button" slot="end">Click me</button>
            </forge-list-item>
          </forge-menu>
        </forge-list>
      `);

      //List item with forge-ignore on menu and button
      const listItem1 = el.querySelector('#list-item-1') as IListItemComponent;
      const listItem1Menu = el.querySelector('#list-item-1-menu') as IMenuComponent;
      const listItem1SlottedMenu = el.querySelector('#list-item-1-slotted-menu') as IMenuComponent;
      const listItem1SlottedMenuButton = el.querySelector('#list-item-1-slotted-menu-button') as HTMLButtonElement;
      const listItem1SlottedButton = el.querySelector('#list-item-1-slotted-button') as HTMLButtonElement;
      const listItem1SlottedButtonSpy = sinon.spy();
      listItem1SlottedButton.addEventListener('click', listItem1SlottedButtonSpy);

      listItem1.click();
      expect(listItem1Menu.open).to.be.true;

      //Expect both buttons to receive click
      await clickElement(listItem1SlottedMenuButton);
      expect(listItem1SlottedMenu.open).to.be.true;

      await clickElement(listItem1SlottedButton);
      expect(listItem1SlottedButtonSpy).to.have.been.calledOnce;

      //List item with no forge-ignore on menu and button
      const listItem2 = el.querySelector('#list-item-2') as IListItemComponent;
      const listItem2Menu = el.querySelector('#list-item-2-menu') as IMenuComponent;
      const listItem2SlottedMenu = el.querySelector('#list-item-2-slotted-menu') as IMenuComponent;
      const listItem2SlottedMenuButton = el.querySelector('#list-item-2-slotted-menu-button') as HTMLButtonElement;
      const listItem2SlottedButton = el.querySelector('#list-item-2-slotted-button') as HTMLButtonElement;
      const listItem2SlottedButtonSpy = sinon.spy();
      listItem2SlottedButton.addEventListener('click', listItem2SlottedButtonSpy);

      listItem2.click();
      expect(listItem2Menu.open).to.be.true;

      //Expect both buttons to do nothing
      await clickElement(listItem2SlottedMenuButton);
      expect(listItem2SlottedMenu.open).to.be.false;

      await clickElement(listItem2SlottedButton);
      expect(listItem2SlottedButtonSpy).to.not.have.been.called;
    });
  });
});

interface ListFixtureConfig {
  dense?: boolean;
  disabled?: boolean;
  indented?: boolean;
  selectedValue?: any;
  twoLine?: boolean;
  threeLine?: boolean;
  wrap?: boolean;
  multicolumn?: boolean;
  anchor?: boolean;
  anchorTarget?: '_blank' | '_self';
  withCheckbox?: boolean;
  withRadioButton?: boolean;
}

async function createFixture({
  dense,
  disabled,
  indented,
  selectedValue,
  twoLine,
  threeLine,
  wrap,
  multicolumn,
  withCheckbox,
  withRadioButton
}: ListFixtureConfig = {}): Promise<ListHarness> {
  const el = await fixture<IListComponent>(html`
    <forge-list
      ?dense=${dense}
      ?indented=${indented}
      ?two-line=${twoLine}
      ?three-line=${threeLine}
      ?wrap=${wrap}
      ?multicolumn=${multicolumn}
      .selectedValue=${selectedValue}>
      <forge-list-item value="1">
        <button ?disabled=${disabled}>One</button>
        ${withCheckbox ? html`<input type="checkbox" slot="end" />` : null} ${withRadioButton ? html`<input type="radio" slot="end" />` : null}
      </forge-list-item>
      <forge-list-item value="2"><button>Two</button></forge-list-item>
      <forge-list-item value="3"><button>Three</button></forge-list-item>
    </forge-list>
  `);
  return new ListHarness(el);
}

class ListHarness {
  constructor(public list: IListComponent) {}

  public get listItems(): IListItemComponent[] {
    return Array.from(this.list.querySelectorAll('forge-list-item'));
  }

  public listItemsAttr(attr: string, value: string): boolean {
    return this.listItems.every(li => li.getAttribute(attr) === value);
  }

  public clickListItem(index: number | IListItemComponent): void {
    let listItem: IListItemComponent;

    if (typeof index === 'number') {
      listItem = this.listItems[index];
    } else {
      listItem = index;
    }

    const button = listItem.querySelector('button') as HTMLButtonElement;
    button.click();
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

  public listItemActive(index: number): boolean {
    const focusIndicator = getShadowElement(this.listItems[index], 'forge-focus-indicator') as IFocusIndicatorComponent;
    return focusIndicator?.active;
  }

  public clickElement(el: HTMLElement): Promise<void> {
    return clickElement(el);
  }
}

function clickElement(el: HTMLElement): Promise<void> {
  const { x, y, width, height } = el.getBoundingClientRect();
  return sendMouse({
    type: 'click',
    position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
  });
}
