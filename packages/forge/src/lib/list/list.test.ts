import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { frame } from '../core/utils/utils.js';
import type { IFocusIndicatorComponent } from '../focus-indicator/focus-indicator.js';
import type { IStateLayerComponent } from '../state-layer/state-layer.js';
import type { IListItemComponent } from './list-item/index.js';
import { LIST_ITEM_CONSTANTS } from './list-item/index.js';
import type { IListComponent } from './list/list.js';
import { LIST_CONSTANTS } from './list/list-constants.js';
import type { IMenuComponent } from '../menu/menu.js';

import './list/list.js';
import '../menu/menu.js';

describe('List', () => {
  describe('accessibility', () => {
    it('should be accessible', async () => {
      const ctx = await createFixture();
      await expect(ctx.list).toBeAccessible();
    });

    it('should have a default role of list', async () => {
      const ctx = await createFixture();
      expect(ctx.list.getAttribute('role')).toBe('list');
      expect(ctx.listItemsAttr('role', 'listitem')).toBe(true);
    });
  });

  describe('select event', () => {
    it('should dispatch select event when clicked', async () => {
      const ctx = await createFixture();
      const spy = vi.fn();
      ctx.list.addEventListener('forge-list-item-select', spy);
      ctx.clickListItem(1);
      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0].detail.value).toBe('2');
    });

    it('should dispatch select event when enter key is pressed', async () => {
      const ctx = await createFixture();
      const spy = vi.fn();
      ctx.list.addEventListener('forge-list-item-select', spy);
      ctx.listItems[1].querySelector('button')?.focus();

      await userEvent.keyboard('{Enter}');

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0].detail.value).toBe('2');
    });

    it('should dispatch select event when space key is pressed', async () => {
      const ctx = await createFixture();
      const spy = vi.fn();
      ctx.list.addEventListener('forge-list-item-select', spy);
      ctx.listItems[1].querySelector('button')?.focus();

      await userEvent.keyboard(' ');

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0].detail.value).toBe('2');
    });

    it('should not dispatch select event when disabled', async () => {
      const ctx = await createFixture({ disabled: true });
      const spy = vi.fn();
      ctx.list.addEventListener('forge-list-item-select', spy);

      ctx.listItems[0].querySelector('button')?.focus();
      ctx.clickListItem(0);
      await userEvent.keyboard('{Enter}');
      await userEvent.keyboard(' ');

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not dispatch select event if target element has forge-ignore attribute', async () => {
      const ctx = await createFixture();
      const spy = vi.fn();
      ctx.list.addEventListener('forge-list-item-select', spy);

      const ignoredElement = document.createElement('button');
      ignoredElement.type = 'button';
      ignoredElement.setAttribute('forge-ignore', '');
      ctx.listItems[0].appendChild(ignoredElement);

      await frame();
      ignoredElement.click();

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('selected', () => {
    it('should set selected via selectedValue on list', async () => {
      const ctx = await createFixture({ selectedValue: '2' });

      expect(ctx.listItems[1].selected).toBe(true);
      expect(ctx.listItems.filter(li => li.selected).length).toBe(1);
      await expect(ctx.list).toBeAccessible();
    });

    it('should set selected value via attribute', async () => {
      const ctx = await createFixture();

      ctx.list.setAttribute(LIST_CONSTANTS.attributes.SELECTED_VALUE, '2');
      expect(ctx.list.selectedValue).toBe('2');
      expect(ctx.listItems[1].selected).toBe(true);
    });

    it('should remove selected value', async () => {
      const ctx = await createFixture({ selectedValue: '2' });

      expect(ctx.listItems[1].selected).toBe(true);

      ctx.list.selectedValue = null;
      expect(ctx.listItems.filter(li => li.selected).length).toBe(0);
    });

    it('should set selected when value matches list selected value', async () => {
      const ctx = await createFixture({ selectedValue: 'some-value' });

      expect(ctx.listItems[1].selected).toBe(false);

      ctx.listItems[1].value = 'some-value';
      expect(ctx.listItems[1].selected).toBe(true);
    });
  });

  describe('disabled', () => {
    it('should set disabled', async () => {
      const ctx = await createFixture({ disabled: true });

      expect(ctx.getListItemRootElement(0).classList.contains(LIST_ITEM_CONSTANTS.classes.DISABLED)).toBe(true);
      expect(ctx.hasStateLayer()).toBe(false);
      expect(ctx.hasFocusIndicator()).toBe(false);
      await expect(ctx.list).toBeAccessible();
    });

    it('should re-enable interactivity after disabled', async () => {
      const ctx = await createFixture({ disabled: true });

      expect(ctx.hasStateLayer()).toBe(false);
      expect(ctx.hasFocusIndicator()).toBe(false);

      (ctx.listItems[0].querySelector('button') as HTMLButtonElement).disabled = false;

      await frame();

      expect(ctx.hasStateLayer()).toBe(true);
      expect(ctx.hasFocusIndicator()).toBe(true);
    });
  });

  describe('API', () => {
    it('should set dense', async () => {
      const ctx = await createFixture({ dense: true });

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.DENSE)).toBe(true);
      expect(ctx.listItemsAttr('dense', '')).toBe(true);

      ctx.list.dense = false;

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.DENSE)).toBe(false);
      expect(ctx.listItemsAttr('dense', '')).toBe(false);
    });

    it('should set indented', async () => {
      const ctx = await createFixture({ indented: true });

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.INDENTED)).toBe(true);
      expect(ctx.listItemsAttr('indented', '')).toBe(true);

      ctx.list.indented = false;

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.INDENTED)).toBe(false);
      expect(ctx.listItemsAttr('indented', '')).toBe(false);
    });

    it('should set twoLine', async () => {
      const ctx = await createFixture({ twoLine: true });

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE)).toBe(true);
      expect(ctx.listItemsAttr('two-line', '')).toBe(true);

      ctx.list.twoLine = false;

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE)).toBe(false);
      expect(ctx.listItemsAttr('two-line', '')).toBe(false);
    });

    it('should set threeLine', async () => {
      const ctx = await createFixture({ threeLine: true });

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE)).toBe(true);
      expect(ctx.listItemsAttr('three-line', '')).toBe(true);

      ctx.list.threeLine = false;

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE)).toBe(false);
      expect(ctx.listItemsAttr('three-line', '')).toBe(false);
    });

    it('should set wrap', async () => {
      const ctx = await createFixture({ wrap: true });

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.WRAP)).toBe(true);
      expect(ctx.listItemsAttr('wrap', '')).toBe(true);

      ctx.list.wrap = false;

      expect(ctx.list.hasAttribute(LIST_ITEM_CONSTANTS.attributes.WRAP)).toBe(false);
      expect(ctx.listItemsAttr('wrap', '')).toBe(false);
    });

    it('should set multicolumn', async () => {
      const ctx = await createFixture({ multicolumn: true });

      expect(ctx.list.hasAttribute(LIST_CONSTANTS.attributes.MULTICOLUMN)).toBe(true);

      const innerElement = getShadowElement(ctx.list, LIST_CONSTANTS.selectors.INNER);
      expect(innerElement.classList.contains(LIST_CONSTANTS.classes.MULTICOLUMN)).toBe(true);

      expect(ctx.listItemsAttr('multicolumn', '')).toBe(false);

      ctx.list.multicolumn = false;

      expect(ctx.list.hasAttribute(LIST_CONSTANTS.attributes.MULTICOLUMN)).toBe(false);
      expect(innerElement.classList.contains(LIST_CONSTANTS.classes.MULTICOLUMN)).toBe(false);
    });
  });

  describe('focus indicator', () => {
    it('should not have focus indicator when no interactive element is present', async () => {
      const screen = render(html`<forge-list-item>Test Item</forge-list-item>`);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).toBeFalsy();
    });

    it('should have focus indicator when button is present', async () => {
      const screen = render(html`
        <forge-list-item>
          <button type="button">Test Item</button>
        </forge-list-item>
      `);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).toBeTruthy();
    });

    it('should have focus indicator when checkbox is present', async () => {
      const screen = render(html`
        <forge-list-item>
          <input type="checkbox" slot="start" />
          Test Item
        </forge-list-item>
      `);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).toBeTruthy();
    });

    it('should have focus indicator when radio button is present', async () => {
      const screen = render(html`
        <forge-list-item>
          <input type="radio" slot="start" />
          Test Item
        </forge-list-item>
      `);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).toBeTruthy();
    });

    it('should have focus indicator when anchor is present', async () => {
      const screen = render(html`
        <forge-list-item>
          <a href="javascript: void(0);">Test Item</a>
        </forge-list-item>
      `);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator');

      expect(focusIndicator).toBeTruthy();
    });

    it('should activate focus indicator when active set', async () => {
      const ctx = await createFixture();

      ctx.listItems[1].active = true;
      expect(ctx.listItems[1].active).toBe(true);
      expect(ctx.listItems[1].hasAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE)).toBe(true);
      expect(ctx.listItemActive(0)).toBe(false);
      expect(ctx.listItemActive(1)).toBe(true);
      expect(ctx.listItemActive(0)).toBe(false);
    });

    it('should not activate focus indicator when clicked', async () => {
      const screen = render(html`<forge-list-item><button>Test Item</button></forge-list-item>`);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const focusIndicator = el.shadowRoot!.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
      const button = el.querySelector('button') as HTMLButtonElement;

      await userEvent.click(el);

      expect(button.matches(':focus')).toBe(true);
      expect(focusIndicator.active).toBe(false);
    });
  });

  describe('state layer', () => {
    it('should not have a state layer when no interactive element is present', async () => {
      const screen = render(html`<forge-list-item>Test Item</forge-list-item>`);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).toBeFalsy();
    });

    it('should have state layer when button is present', async () => {
      const screen = render(html`
        <forge-list-item>
          <button type="button">Test Item</button>
        </forge-list-item>
      `);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).toBeTruthy();
    });

    it('should have state layer when checkbox is present', async () => {
      const screen = render(html`
        <forge-list-item>
          <input type="checkbox" slot="start" />
          Test Item
        </forge-list-item>
      `);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).toBeTruthy();
    });

    it('should have state layer when radio button is present', async () => {
      const screen = render(html`
        <forge-list-item>
          <input type="radio" slot="start" />
          Test Item
        </forge-list-item>
      `);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).toBeTruthy();
    });

    it('should have state layer when anchor is present', async () => {
      const screen = render(html`
        <forge-list-item>
          <a href="javascript: void(0);">Test Item</a>
        </forge-list-item>
      `);
      const el = screen.container.querySelector('forge-list-item') as IListItemComponent;
      const stateLayer = el.shadowRoot!.querySelector('forge-state-layer');

      expect(stateLayer).toBeTruthy();
    });

    it('should animate state layer when button is clicked', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <button type="button">Test Item</button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItem = el.querySelector('forge-list-item') as IListItemComponent;
      const stateLayerEl = listItem.shadowRoot!.querySelector('forge-state-layer') as IStateLayerComponent;
      const stateLayerAnimationSpy = vi.spyOn((stateLayerEl as any)._core._adapter, 'startAnimation');

      await userEvent.click(listItem);

      expect(stateLayerAnimationSpy).toHaveBeenCalledOnce();
    });

    it('should animate state layer when checkbox is clicked', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            Test Item
            <input type="checkbox" slot="start" />
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const stateLayerEl = listItemEl.shadowRoot!.querySelector('forge-state-layer') as IStateLayerComponent;
      const stateLayerAnimationSpy = vi.spyOn((stateLayerEl as any)._core._adapter, 'startAnimation');
      const checkbox = listItemEl.querySelector('input') as HTMLInputElement;

      checkbox.click();

      expect(stateLayerAnimationSpy).toHaveBeenCalledOnce();
    });

    it('should animate state layer when pressing enter key or space key on button', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <button type="button">Test Item</button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const stateLayerEl = listItemEl.shadowRoot!.querySelector('forge-state-layer') as IStateLayerComponent;
      const stateLayerAnimationSpy = vi.spyOn((stateLayerEl as any)._core._adapter, 'startAnimation');
      const button = listItemEl.querySelector('button') as HTMLButtonElement;

      button.focus();
      await userEvent.keyboard('{Enter}');

      expect(stateLayerAnimationSpy).toHaveBeenCalledOnce();

      await userEvent.keyboard(' ');

      expect(stateLayerAnimationSpy).toHaveBeenCalledTimes(2);
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

      expect(listItem.dense).toBe(true);
      expect(listItem.twoLine).toBe(true);
      expect(listItem.threeLine).toBe(true);
      expect(listItem.selected).toBe(true);
    });
  });

  describe('nested anchor', () => {
    it('should detect nested anchor element', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);" aria-label="Navigate to link">Test</a>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const rootEl = listItemEl.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;
      const internalAnchor = rootEl.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;

      expect(internalAnchor).toBeTruthy();
      expect(internalAnchor.href).toBe('javascript: void(0);');
      expect(internalAnchor.getAttribute('aria-hidden')).toBe('true');
      expect(internalAnchor.classList.contains(LIST_ITEM_CONSTANTS.classes.INTERNAL_ANCHOR)).toBe(true);
      await expect(el).toBeAccessible();
    });

    it('should dynamically detect nested anchor element', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>List Item</forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const rootEl = listItemEl.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;

      await expect(el).toBeAccessible();

      const anchor = document.createElement('a');
      anchor.href = 'javascript: void(0);';
      anchor.setAttribute('aria-label', 'Navigate to link');
      listItemEl.appendChild(anchor);

      await frame();

      let internalAnchor = rootEl.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;

      expect(internalAnchor).toBeTruthy();
      expect(internalAnchor.href).toBe(anchor.href);
      expect(internalAnchor.getAttribute('aria-hidden')).toBe('true');
      expect(internalAnchor.classList.contains(LIST_ITEM_CONSTANTS.classes.INTERNAL_ANCHOR)).toBe(true);
      await expect(el).toBeAccessible();

      anchor.remove();

      await frame();

      internalAnchor = rootEl.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;

      expect(internalAnchor).toBeFalsy();
      await expect(el).toBeAccessible();
    });

    it('should dispatch select event when anchor is clicked', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);" aria-label="Navigate to link"></a>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const spy = vi.fn();
      el.addEventListener('forge-list-item-select', spy);

      listItemEl.querySelector('a')?.click();

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should click slotted anchor when clicking internal anchor', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);" aria-label="Navigate to link"></a>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const internalAnchor = listItemEl.shadowRoot!.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;
      const anchor = listItemEl.querySelector('a') as HTMLAnchorElement;
      const spy = vi.spyOn(anchor, 'click');

      internalAnchor.click();

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should click slotted anchor when pressing space key', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);">Test</a>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const anchor = listItemEl.querySelector('a') as HTMLAnchorElement;
      const spy = vi.spyOn(anchor, 'click');

      anchor.focus();
      anchor.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      anchor.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true }));

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should update internal anchor href when slotted href changes', async () => {
      const oldHref = 'javascript: void(0);';
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <a href=${oldHref}>Test</a>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const rootEl = listItemEl.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;
      const anchor = listItemEl.querySelector('a') as HTMLAnchorElement;
      const internalAnchor = rootEl.querySelector(`#${LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR}`) as HTMLAnchorElement;

      expect(internalAnchor.href).toBe(oldHref);

      const newHref = 'javascript: console.log("changed")';
      anchor.href = newHref;
      await frame();

      expect(oldHref).not.toBe(newHref);
      expect(internalAnchor.href).toBe(newHref);
    });
  });

  describe('nested button', () => {
    it('should detect nested button element', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <button type="button">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;

      await expect(el).toBeAccessible();
    });

    it('should dynamically detect nested button element', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>List Item</forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;

      await expect(el).toBeAccessible();

      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', 'Button');
      listItemEl.appendChild(button);

      await frame();

      await expect(el).toBeAccessible();

      button.remove();

      await frame();

      await expect(el).toBeAccessible();
    });

    it('should dispatch select event when button is clicked', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <button type="button" aria-label="Button"></button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const spy = vi.fn();
      el.addEventListener('forge-list-item-select', spy);

      listItemEl.querySelector('button')?.click();

      expect(spy).toHaveBeenCalledOnce();
    });

    it('should click slotted button when template clicked', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <button type="button" aria-label="Button"></button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const rootEl = listItemEl.shadowRoot!.querySelector(LIST_ITEM_CONSTANTS.selectors.ROOT) as HTMLElement;
      const button = listItemEl.querySelector('button') as HTMLButtonElement;
      const spy = vi.spyOn(button, 'click');

      rootEl.click();

      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('noninteractive', () => {
    it('should not attach to nested button if noninteractive', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item noninteractive>
            <button type="button">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const selectSpy = vi.fn();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.querySelector('button')?.click();

      expect(selectSpy).not.toHaveBeenCalled();
    });

    it('should detach from nested button if noninteractive dynamically', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <button type="button">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const selectSpy = vi.fn();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.noninteractive = true;

      listItemEl.querySelector('button')?.click();

      expect(selectSpy).not.toHaveBeenCalled();
    });

    it('should set noninteractive via parent list on all child list items', async () => {
      const screen = render(html`
        <forge-list noninteractive>
          <forge-list-item>
            <button type="button">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;

      expect(listItemEl.noninteractive).toBe(true);

      el.noninteractive = false;

      expect(listItemEl.noninteractive).toBe(false);
    });

    it('should not attach to nested anchor if noninteractive', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item noninteractive>
            <a href="javascript: void(0);">Link</a>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const selectSpy = vi.fn();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.querySelector('a')?.click();

      expect(selectSpy).not.toHaveBeenCalled();
    });

    it('should detach from nested anchor if noninteractive dynamically', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <a href="javascript: void(0);">Link</a>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const selectSpy = vi.fn();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.noninteractive = true;

      listItemEl.querySelector('a')?.click();

      expect(selectSpy).not.toHaveBeenCalled();
    });

    it('should be interactive is button is slotted into noninteractive slot', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            Text
            <button type="button" slot="secondary-text">Button</button>
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const stateLayerEl = listItemEl.shadowRoot!.querySelector('forge-state-layer');
      const focusIndicatorEl = listItemEl.shadowRoot!.querySelector('forge-focus-indicator');
      const selectSpy = vi.fn();
      el.addEventListener('forge-list-item-select', selectSpy);

      listItemEl.querySelector('button')?.click();

      expect(stateLayerEl).toBeFalsy();
      expect(focusIndicatorEl).toBeFalsy();
      expect(selectSpy).not.toHaveBeenCalledOnce();
    });
  });

  describe('with form control', () => {
    it('should toggle slotted start form control when clicked', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            Test Item
            <input type="checkbox" slot="start" />
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const checkbox = listItemEl.querySelector('input') as HTMLInputElement;

      expect(checkbox.checked).toBe(false);

      listItemEl.click();

      expect(checkbox.checked).toBe(true);
    });

    it('should not toggle start checkbox if forge-ignore attribute is present', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            Test Item
            <input type="checkbox" slot="start" forge-ignore />
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const checkbox = listItemEl.querySelector('input') as HTMLInputElement;

      expect(checkbox.checked).toBe(false);

      listItemEl.click();

      expect(checkbox.checked).toBe(false);
    });

    it('should dispatch select event when slotted label with for attribute is clicked', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            <label for="the-checkbox">Test Item</label>
            <input type="checkbox" id="the-checkbox" slot="start" />
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const labelEl = listItemEl.querySelector('label') as HTMLLabelElement;
      const checkboxEl = listItemEl.querySelector('input') as HTMLInputElement;
      const selectSpy = vi.fn();
      el.addEventListener('forge-list-item-select', selectSpy);

      expect(listItemEl.noninteractive).toBe(false);
      expect(checkboxEl.checked).toBe(false);

      await userEvent.click(labelEl);

      expect(selectSpy).toHaveBeenCalledOnce();
      expect(checkboxEl.checked).toBe(true);
    });

    it('should click slotted form control when enter key is pressed', async () => {
      const screen = render(html`
        <forge-list>
          <forge-list-item>
            Test Item
            <input type="checkbox" slot="start" />
          </forge-list-item>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const listItemEl = el.querySelector('forge-list-item') as IListItemComponent;
      const checkbox = listItemEl.querySelector('input') as HTMLInputElement;
      const spy = vi.spyOn(checkbox, 'click');

      checkbox.focus();
      await userEvent.keyboard('{Enter}');

      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe('with menu', () => {
    it('should toggle its menu when clicked anywhere', async () => {
      const screen = render(html`
        <forge-list>
          <forge-menu id="menu">
            <forge-list-item>
              <span id="slotted-content" slot="start">Text</span>
              <button type="button">Open menu</button>
            </forge-list-item>
          </forge-menu>
        </forge-list>
      `);
      const el = screen.container.querySelector('forge-list') as IListComponent;
      const menu = el.querySelector('#menu') as IMenuComponent;
      const slottedContent = el.querySelector('#slotted-content') as HTMLElement;

      slottedContent.click();

      expect(menu.open).toBe(true);
    });

    it('should handle forge-ignore on menus identically to buttons', async () => {
      const screen = render(html`
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
      const el = screen.container.querySelector('forge-list') as IListComponent;

      //List item with forge-ignore on menu and button
      const listItem1 = el.querySelector('#list-item-1') as IListItemComponent;
      const listItem1Menu = el.querySelector('#list-item-1-menu') as IMenuComponent;
      const listItem1SlottedMenu = el.querySelector('#list-item-1-slotted-menu') as IMenuComponent;
      const listItem1SlottedMenuButton = el.querySelector('#list-item-1-slotted-menu-button') as HTMLButtonElement;
      const listItem1SlottedButton = el.querySelector('#list-item-1-slotted-button') as HTMLButtonElement;
      const listItem1SlottedButtonSpy = vi.fn();
      listItem1SlottedButton.addEventListener('click', listItem1SlottedButtonSpy);

      listItem1.click();
      expect(listItem1Menu.open).toBe(true);

      //Expect both buttons to receive click
      await userEvent.click(listItem1SlottedMenuButton);
      expect(listItem1SlottedMenu.open).toBe(true);

      await userEvent.click(listItem1SlottedButton);
      expect(listItem1SlottedButtonSpy).toHaveBeenCalledOnce();

      //List item with no forge-ignore on menu and button
      const listItem2 = el.querySelector('#list-item-2') as IListItemComponent;
      const listItem2Menu = el.querySelector('#list-item-2-menu') as IMenuComponent;
      const listItem2SlottedMenu = el.querySelector('#list-item-2-slotted-menu') as IMenuComponent;
      const listItem2SlottedMenuButton = el.querySelector('#list-item-2-slotted-menu-button') as HTMLButtonElement;
      const listItem2SlottedButton = el.querySelector('#list-item-2-slotted-button') as HTMLButtonElement;
      const listItem2SlottedButtonSpy = vi.fn();
      listItem2SlottedButton.addEventListener('click', listItem2SlottedButtonSpy);

      listItem2.click();
      expect(listItem2Menu.open).toBe(true);

      //Expect both buttons to do nothing
      await userEvent.click(listItem2SlottedMenuButton);
      expect(listItem2SlottedMenu.open).toBe(false);

      await userEvent.click(listItem2SlottedButton);
      expect(listItem2SlottedButtonSpy).not.toHaveBeenCalled();
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
}

async function createFixture({
  dense,
  disabled,
  indented,
  selectedValue,
  twoLine,
  threeLine,
  wrap,
  multicolumn
}: ListFixtureConfig = {}): Promise<ListHarness> {
  const screen = render(html`
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
      </forge-list-item>
      <forge-list-item value="2"><button>Two</button></forge-list-item>
      <forge-list-item value="3"><button>Three</button></forge-list-item>
    </forge-list>
  `);
  const el = screen.container.querySelector('forge-list') as IListComponent;
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
}
