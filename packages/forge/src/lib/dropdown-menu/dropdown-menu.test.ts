import { html, TemplateResult } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';
import { frame } from '../core/utils/utils.js';
import type { BaseDropdownMenuItem } from './base/base-dropdown-menu-item.js';
import { DROPDOWN_MENU_ITEM_SELECTOR } from './dropdown-menu-constants.js';
import type { DropdownMenuItemCheckboxComponent } from './dropdown-menu-item-checkbox/dropdown-menu-item-checkbox.js';
import type { DropdownMenuItemRadioComponent } from './dropdown-menu-item-radio/dropdown-menu-item-radio.js';
import type { DropdownMenuItemComponent } from './dropdown-menu-item/dropdown-menu-item.js';
import type { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.js';

import './index.js';

class DropdownMenuHarness {
  constructor(
    public readonly menu: DropdownMenuComponent,
    public readonly trigger: HTMLElement
  ) {}

  public get items(): DropdownMenuItemComponent[] {
    return Array.from(this.menu.children).filter((el): el is DropdownMenuItemComponent => el.localName === 'forge-dropdown-menu-item');
  }

  public item(value: string): DropdownMenuItemComponent {
    return this.menu.querySelector(`forge-dropdown-menu-item[value="${value}"]`) as DropdownMenuItemComponent;
  }

  public get focusedItem(): BaseDropdownMenuItem | undefined {
    return Array.from(this.menu.querySelectorAll<BaseDropdownMenuItem>(DROPDOWN_MENU_ITEM_SELECTOR)).find(item => item.matches(':focus'));
  }

  public async open(): Promise<void> {
    this.trigger.click();
    await this.waitForOpen();
  }

  public async waitForOpen(): Promise<void> {
    await vi.waitFor(() => expect(this.menu.open).toBe(true));
    await vi.waitFor(() => expect(this.focusedItem).toBeDefined());
  }

  public async waitForClosed(): Promise<void> {
    await vi.waitFor(() => expect(this.menu.open).toBe(false));
  }

  public async pressKey(key: string): Promise<void> {
    await userEvent.keyboard(`{${key}}`);
    await frame();
  }
}

const renderMenu = async (template = defaultTemplate()): Promise<DropdownMenuHarness> => {
  const screen = render(template);
  const menu = screen.container.querySelector('forge-dropdown-menu') as DropdownMenuComponent;
  const trigger = screen.container.querySelector('button') as HTMLElement;
  await menu.updateComplete;
  return new DropdownMenuHarness(menu, trigger);
};

const defaultTemplate = (): TemplateResult => html`
  <button id="trigger" type="button">Actions</button>
  <forge-dropdown-menu trigger="trigger">
    <forge-dropdown-menu-item value="edit">Edit</forge-dropdown-menu-item>
    <forge-dropdown-menu-item value="copy">Copy</forge-dropdown-menu-item>
    <forge-dropdown-menu-item value="delete" disabled>Delete</forge-dropdown-menu-item>
    <forge-divider></forge-divider>
    <forge-dropdown-menu-item value="share">
      Share
      <forge-dropdown-menu-item value="email">Email</forge-dropdown-menu-item>
      <forge-dropdown-menu-item value="link">Link</forge-dropdown-menu-item>
      <forge-dropdown-menu-item value="social">
        Social
        <forge-dropdown-menu-item value="mastodon">Mastodon</forge-dropdown-menu-item>
      </forge-dropdown-menu-item>
    </forge-dropdown-menu-item>
  </forge-dropdown-menu>
`;

describe('DropdownMenu', () => {
  describe('DropdownMenuComponent', () => {
    it('should instantiate shadow root', async () => {
      const { menu } = await renderMenu();
      expect(menu.shadowRoot).toBeTruthy();
    });

    it('should be closed by default', async () => {
      const { menu } = await renderMenu();
      expect(menu.open).toBe(false);
      expect(menu.hasAttribute('open')).toBe(false);
    });

    it('should open when the trigger located by id is clicked', async () => {
      const harness = await renderMenu();
      await harness.open();
      expect(harness.menu.open).toBe(true);
      expect(harness.menu.hasAttribute('open')).toBe(true);
    });

    it('should open when the triggerElement is clicked', async () => {
      const screen = render(html`
        <button id="element-trigger" type="button">Actions</button>
        <forge-dropdown-menu>
          <forge-dropdown-menu-item>Edit</forge-dropdown-menu-item>
        </forge-dropdown-menu>
      `);
      const menu = screen.container.querySelector('forge-dropdown-menu') as DropdownMenuComponent;
      const trigger = screen.container.querySelector('button') as HTMLElement;
      menu.triggerElement = trigger;
      await menu.updateComplete;

      const harness = new DropdownMenuHarness(menu, trigger);
      await harness.open();
      expect(menu.open).toBe(true);
    });

    it('should prefer triggerElement over trigger when both are set', async () => {
      const screen = render(html`
        <button id="id-trigger" type="button">By id</button>
        <button id="element-trigger" type="button">By element</button>
        <forge-dropdown-menu trigger="id-trigger">
          <forge-dropdown-menu-item>Edit</forge-dropdown-menu-item>
        </forge-dropdown-menu>
      `);
      const menu = screen.container.querySelector('forge-dropdown-menu') as DropdownMenuComponent;
      const idTrigger = screen.container.querySelector('#id-trigger') as HTMLElement;
      const elementTrigger = screen.container.querySelector('#element-trigger') as HTMLElement;
      menu.triggerElement = elementTrigger;
      await menu.updateComplete;

      idTrigger.click();
      await frame();
      expect(menu.open).toBe(false);

      elementTrigger.click();
      await vi.waitFor(() => expect(menu.open).toBe(true));
    });

    it('should connect to a new trigger when the trigger attribute changes', async () => {
      const screen = render(html`
        <button id="first" type="button">First</button>
        <button id="second" type="button">Second</button>
        <forge-dropdown-menu trigger="first">
          <forge-dropdown-menu-item>Edit</forge-dropdown-menu-item>
        </forge-dropdown-menu>
      `);
      const menu = screen.container.querySelector('forge-dropdown-menu') as DropdownMenuComponent;
      const first = screen.container.querySelector('#first') as HTMLElement;
      const second = screen.container.querySelector('#second') as HTMLElement;
      await menu.updateComplete;

      menu.trigger = 'second';
      await menu.updateComplete;

      first.click();
      await frame();
      expect(menu.open).toBe(false);

      second.click();
      await vi.waitFor(() => expect(menu.open).toBe(true));
    });

    it('should locate the trigger within the same shadow root as the menu', async () => {
      const host = document.createElement('div');
      document.body.append(host);
      const shadowRoot = host.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <button id="shadow-trigger" type="button">Actions</button>
        <forge-dropdown-menu trigger="shadow-trigger"><forge-dropdown-menu-item>Edit</forge-dropdown-menu-item></forge-dropdown-menu>
      `;
      const menu = shadowRoot.querySelector('forge-dropdown-menu') as DropdownMenuComponent;
      await menu.updateComplete;

      (shadowRoot.querySelector('button') as HTMLElement).click();
      await vi.waitFor(() => expect(menu.open).toBe(true));
      host.remove();
    });

    it('should set aria-haspopup and aria-expanded on the trigger', async () => {
      const harness = await renderMenu();
      expect(harness.trigger.getAttribute('aria-haspopup')).toBe('menu');
      expect(harness.trigger.getAttribute('aria-expanded')).toBe('false');

      await harness.open();
      expect(harness.trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should not override an existing aria-haspopup on the trigger', async () => {
      const screen = render(html`
        <button id="trigger" type="button" aria-haspopup="true">Actions</button>
        <forge-dropdown-menu trigger="trigger"><forge-dropdown-menu-item>Edit</forge-dropdown-menu-item></forge-dropdown-menu>
      `);
      await (screen.container.querySelector('forge-dropdown-menu') as DropdownMenuComponent).updateComplete;
      expect(screen.container.querySelector('button')?.getAttribute('aria-haspopup')).toBe('true');
    });

    it('should open when the open property is set', async () => {
      const { menu } = await renderMenu();
      menu.open = true;
      await menu.updateComplete;
      await vi.waitFor(() => expect(menu.shadowRoot?.querySelector('forge-popover')?.open).toBe(true));
    });

    it('should close when the open property is set to false', async () => {
      const harness = await renderMenu();
      await harness.open();

      harness.menu.open = false;
      await vi.waitFor(() => expect(harness.menu.shadowRoot?.querySelector('forge-popover')?.open).toBe(false));
    });

    it('should open and focus the first enabled item', async () => {
      const harness = await renderMenu();
      await harness.open();
      expect(harness.focusedItem).toBe(harness.item('edit'));
    });

    it('should open and focus the first item when ArrowDown is pressed on the trigger', async () => {
      const harness = await renderMenu();
      harness.trigger.focus();
      await harness.pressKey('ArrowDown');
      await harness.waitForOpen();
      expect(harness.focusedItem).toBe(harness.item('edit'));
    });

    it('should open and focus the last item when ArrowUp is pressed on the trigger', async () => {
      const harness = await renderMenu();
      harness.trigger.focus();
      await harness.pressKey('ArrowUp');
      await harness.waitForOpen();
      expect(harness.focusedItem).toBe(harness.item('share'));
    });

    it('should close when Escape is pressed and return focus to the trigger', async () => {
      const harness = await renderMenu();
      harness.trigger.focus();
      await harness.open();

      await harness.pressKey('Escape');
      await harness.waitForClosed();
      expect(document.activeElement).toBe(harness.trigger);
    });

    it('should close when Tab is pressed', async () => {
      const harness = await renderMenu();
      await harness.open();

      await userEvent.keyboard('{Tab}');
      await harness.waitForClosed();
    });

    it('should close when clicking outside of the menu', async () => {
      const harness = await renderMenu();
      await harness.open();

      await userEvent.click(document.body);
      await harness.waitForClosed();
    });

    it('should dispatch beforetoggle and toggle events when opened by the trigger', async () => {
      const harness = await renderMenu();
      const beforeToggle = vi.fn();
      const toggle = vi.fn();
      harness.menu.addEventListener('forge-dropdown-menu-beforetoggle', beforeToggle);
      harness.menu.addEventListener('forge-dropdown-menu-toggle', toggle);

      await harness.open();

      expect(beforeToggle).toHaveBeenCalledTimes(1);
      expect(beforeToggle.mock.calls[0][0].detail).toEqual({ oldState: 'closed', newState: 'open' });
      expect(toggle).toHaveBeenCalledTimes(1);
      expect(toggle.mock.calls[0][0].detail).toEqual({ oldState: 'closed', newState: 'open' });
    });

    it('should not open when the beforetoggle event is canceled', async () => {
      const harness = await renderMenu();
      harness.menu.addEventListener('forge-dropdown-menu-beforetoggle', evt => evt.preventDefault());

      harness.trigger.click();
      await frame();
      await frame();

      expect(harness.menu.open).toBe(false);
    });

    describe('keyboard navigation', () => {
      it('should move focus to the next enabled item when ArrowDown is pressed', async () => {
        const harness = await renderMenu();
        await harness.open();

        await harness.pressKey('ArrowDown');
        expect(harness.focusedItem).toBe(harness.item('copy'));

        await harness.pressKey('ArrowDown');
        expect(harness.focusedItem).toBe(harness.item('share'));
      });

      it('should move focus to the previous enabled item when ArrowUp is pressed', async () => {
        const harness = await renderMenu();
        await harness.open();
        await harness.pressKey('ArrowDown');
        await harness.pressKey('ArrowDown');

        await harness.pressKey('ArrowUp');
        expect(harness.focusedItem).toBe(harness.item('copy'));
      });

      it('should wrap focus from the last item to the first item', async () => {
        const harness = await renderMenu();
        await harness.open();
        await harness.pressKey('End');

        await harness.pressKey('ArrowDown');
        expect(harness.focusedItem).toBe(harness.item('edit'));
      });

      it('should wrap focus from the first item to the last item', async () => {
        const harness = await renderMenu();
        await harness.open();

        await harness.pressKey('ArrowUp');
        expect(harness.focusedItem).toBe(harness.item('share'));
      });

      it('should move focus to the first and last enabled items with Home and End', async () => {
        const harness = await renderMenu();
        await harness.open();

        await harness.pressKey('End');
        expect(harness.focusedItem).toBe(harness.item('share'));

        await harness.pressKey('Home');
        expect(harness.focusedItem).toBe(harness.item('edit'));
      });

      it('should focus the next item that starts with the typed characters', async () => {
        const harness = await renderMenu();
        await harness.open();

        await userEvent.keyboard('s');
        await frame();
        expect(harness.focusedItem).toBe(harness.item('share'));
      });

      it('should not move focus to disabled items when typing', async () => {
        const harness = await renderMenu();
        await harness.open();

        await userEvent.keyboard('d');
        await frame();
        expect(harness.focusedItem).toBe(harness.item('edit'));
      });
    });

    describe('dense', () => {
      const getRoot = (item: BaseDropdownMenuItem): HTMLElement => item.shadowRoot?.querySelector('[part="root"]') as HTMLElement;

      it('should not be dense by default', async () => {
        const harness = await renderMenu();
        const edit = harness.item('edit');
        await edit.updateComplete;

        expect(harness.menu.dense).toBe(false);
        expect(edit.dense).toBe(false);
        expect(getRoot(edit).classList.contains('dense')).toBe(false);
      });

      it('should apply the dense layout to items when set', async () => {
        const harness = await renderMenu();
        await harness.open();
        const edit = harness.item('edit');
        await edit.updateComplete;
        const defaultHeight = getRoot(edit).offsetHeight;

        harness.menu.dense = true;
        await harness.menu.updateComplete;
        await edit.updateComplete;

        expect(edit.dense).toBe(true);
        expect(getRoot(edit).classList.contains('dense')).toBe(true);
        expect(getRoot(edit).offsetHeight).toBeLessThan(defaultHeight);
      });

      it('should apply the dense layout when the dense attribute is set', async () => {
        const harness = await renderMenu();
        harness.menu.setAttribute('dense', '');
        await harness.menu.updateComplete;

        expect(harness.menu.dense).toBe(true);
        expect(harness.item('edit').dense).toBe(true);
      });

      it('should apply the dense layout to submenu items', async () => {
        const harness = await renderMenu();
        harness.menu.dense = true;
        await harness.menu.updateComplete;

        expect(harness.item('email').dense).toBe(true);
        expect(harness.item('mastodon').dense).toBe(true);
      });

      it('should remove the dense layout when unset', async () => {
        const harness = await renderMenu();
        harness.menu.dense = true;
        await harness.menu.updateComplete;
        harness.menu.dense = false;
        await harness.menu.updateComplete;

        expect(harness.item('edit').dense).toBe(false);
      });
    });

    describe('selection', () => {
      it('should dispatch the select event with the item value when an item is clicked', async () => {
        const harness = await renderMenu();
        const onSelect = vi.fn();
        harness.menu.addEventListener('forge-dropdown-menu-item-select', onSelect);
        await harness.open();

        harness.item('copy').click();

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][0].detail).toEqual({ value: 'copy' });
        expect(onSelect.mock.calls[0][0].target).toBe(harness.item('copy'));
      });

      it('should close and return focus to the trigger when an item is selected', async () => {
        const harness = await renderMenu();
        await harness.open();

        harness.item('copy').click();

        await harness.waitForClosed();
        expect(document.activeElement).toBe(harness.trigger);
      });

      it('should select the focused item when Enter is pressed', async () => {
        const harness = await renderMenu();
        const onSelect = vi.fn();
        harness.menu.addEventListener('forge-dropdown-menu-item-select', onSelect);
        await harness.open();
        await harness.pressKey('ArrowDown');

        await harness.pressKey('Enter');

        expect(onSelect.mock.calls[0][0].detail).toEqual({ value: 'copy' });
        await harness.waitForClosed();
      });

      it('should select the focused item when Space is pressed', async () => {
        const harness = await renderMenu();
        const onSelect = vi.fn();
        harness.menu.addEventListener('forge-dropdown-menu-item-select', onSelect);
        await harness.open();

        await userEvent.keyboard(' ');
        await frame();

        expect(onSelect.mock.calls[0][0].detail).toEqual({ value: 'edit' });
        await harness.waitForClosed();
      });

      it('should keep the menu open when the select event is canceled', async () => {
        const harness = await renderMenu();
        harness.menu.addEventListener('forge-dropdown-menu-item-select', evt => evt.preventDefault());
        await harness.open();

        harness.item('copy').click();
        await frame();
        await frame();

        expect(harness.menu.open).toBe(true);
      });

      it('should not select disabled items', async () => {
        const harness = await renderMenu();
        const onSelect = vi.fn();
        harness.menu.addEventListener('forge-dropdown-menu-item-select', onSelect);
        await harness.open();

        harness.item('delete').click();
        await frame();

        expect(onSelect).not.toHaveBeenCalled();
        expect(harness.menu.open).toBe(true);
      });
    });

    describe('submenus', () => {
      it('should open the submenu when an item with a submenu is clicked', async () => {
        const harness = await renderMenu();
        await harness.open();

        harness.item('share').click();
        await harness.item('share').updateComplete;

        expect(harness.item('share').open).toBe(true);
        expect(harness.menu.open).toBe(true);
      });

      it('should not dispatch the select event or close the menu when an item with a submenu is clicked', async () => {
        const harness = await renderMenu();
        const onSelect = vi.fn();
        harness.menu.addEventListener('forge-dropdown-menu-item-select', onSelect);
        await harness.open();

        harness.item('share').click();
        await frame();

        expect(onSelect).not.toHaveBeenCalled();
        expect(harness.menu.open).toBe(true);
      });

      it('should open the submenu when the pointer hovers over the item', async () => {
        const harness = await renderMenu();
        await harness.open();

        await userEvent.hover(harness.item('share'));

        await vi.waitFor(() => expect(harness.item('share').open).toBe(true));
      });

      it('should open the submenu and focus its first item when ArrowRight is pressed', async () => {
        const harness = await renderMenu();
        await harness.open();
        await harness.pressKey('End');

        await harness.pressKey('ArrowRight');

        await vi.waitFor(() => expect(harness.focusedItem).toBe(harness.item('email')));
        expect(harness.item('share').open).toBe(true);
      });

      it('should not open a submenu when ArrowRight is pressed on an item without a submenu', async () => {
        const harness = await renderMenu();
        await harness.open();

        await harness.pressKey('ArrowRight');

        expect(harness.focusedItem).toBe(harness.item('edit'));
      });

      it('should close the submenu and focus its parent item when ArrowLeft is pressed', async () => {
        const harness = await renderMenu();
        await harness.open();
        await harness.pressKey('End');
        await harness.pressKey('ArrowRight');
        await vi.waitFor(() => expect(harness.focusedItem).toBe(harness.item('email')));

        await harness.pressKey('ArrowLeft');

        await vi.waitFor(() => expect(harness.focusedItem).toBe(harness.item('share')));
        expect(harness.item('share').open).toBe(false);
        expect(harness.menu.open).toBe(true);
      });

      it('should navigate within the submenu without leaving it', async () => {
        const harness = await renderMenu();
        await harness.open();
        await harness.pressKey('End');
        await harness.pressKey('ArrowRight');
        await vi.waitFor(() => expect(harness.focusedItem).toBe(harness.item('email')));

        await harness.pressKey('ArrowDown');
        expect(harness.focusedItem).toBe(harness.item('link'));

        await harness.pressKey('ArrowDown');
        expect(harness.focusedItem).toBe(harness.item('social'));

        await harness.pressKey('ArrowDown');
        expect(harness.focusedItem).toBe(harness.item('email'));
      });

      it('should support multiple levels of nested submenus', async () => {
        const harness = await renderMenu();
        await harness.open();
        await harness.pressKey('End');
        await harness.pressKey('ArrowRight');
        await vi.waitFor(() => expect(harness.focusedItem).toBe(harness.item('email')));
        await harness.pressKey('End');

        await harness.pressKey('ArrowRight');

        await vi.waitFor(() => expect(harness.focusedItem).toBe(harness.item('mastodon')));
        expect(harness.item('social').open).toBe(true);
      });

      it('should select an item in a submenu and close the entire menu', async () => {
        const harness = await renderMenu();
        const onSelect = vi.fn();
        harness.menu.addEventListener('forge-dropdown-menu-item-select', onSelect);
        await harness.open();
        harness.item('share').click();
        await harness.item('share').updateComplete;

        harness.item('link').click();

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect.mock.calls[0][0].detail).toEqual({ value: 'link' });
        await harness.waitForClosed();
        expect(harness.item('share').open).toBe(false);
      });

      it('should close an open submenu when focus moves to a sibling item', async () => {
        const harness = await renderMenu();
        await harness.open();
        harness.item('share').click();
        await harness.item('share').updateComplete;

        harness.item('copy').focus();

        await vi.waitFor(() => expect(harness.item('share').open).toBe(false));
      });

      it('should close all submenus when the menu closes', async () => {
        const harness = await renderMenu();
        await harness.open();
        harness.item('share').click();
        await harness.item('share').updateComplete;

        harness.menu.open = false;
        await harness.waitForClosed();

        await vi.waitFor(() => expect(harness.item('share').open).toBe(false));
      });
    });
  });

  describe('DropdownMenuItemComponent', () => {
    it('should instantiate shadow root', async () => {
      const { items } = await renderMenu();
      expect(items[0].shadowRoot).toBeTruthy();
    });

    it('should have the menuitem role', async () => {
      const { items } = await renderMenu();
      expect(items[0].getAttribute('role')).toBe('menuitem');
    });

    it('should not be in the tab order', async () => {
      const { items } = await renderMenu();
      expect(items[0].tabIndex).toBe(-1);
    });

    it('should set aria-disabled when disabled', async () => {
      const harness = await renderMenu();
      expect(harness.item('delete').getAttribute('aria-disabled')).toBe('true');
      expect(harness.item('edit').hasAttribute('aria-disabled')).toBe(false);
    });

    it('should expose the label text without the text of its submenu items', async () => {
      const harness = await renderMenu();
      expect(harness.item('share').label).toBe('Share');
      expect(harness.item('edit').label).toBe('Edit');
    });

    it('should detect a submenu from nested items', async () => {
      const harness = await renderMenu();
      await harness.item('share').updateComplete;
      expect(harness.item('share').hasSubmenu).toBe(true);
      expect(harness.item('edit').hasSubmenu).toBe(false);
    });

    it('should assign nested items to the submenu slot', async () => {
      const harness = await renderMenu();
      expect(harness.item('email').slot).toBe('submenu');
      expect(harness.item('edit').slot).toBe('');
    });

    it('should update hasSubmenu when nested items are added and removed', async () => {
      const harness = await renderMenu();
      const edit = harness.item('edit');
      const nested = document.createElement('forge-dropdown-menu-item');
      nested.textContent = 'Nested';
      edit.append(nested);

      await vi.waitFor(() => expect(edit.hasSubmenu).toBe(true));
      expect(nested.slot).toBe('submenu');

      nested.remove();
      await vi.waitFor(() => expect(edit.hasSubmenu).toBe(false));
    });

    it('should set aria-haspopup and aria-expanded when it has a submenu', async () => {
      const harness = await renderMenu();
      const share = harness.item('share');
      await share.updateComplete;

      expect(share.getAttribute('aria-haspopup')).toBe('menu');
      expect(share.getAttribute('aria-expanded')).toBe('false');

      await harness.open();
      share.click();
      await share.updateComplete;
      expect(share.getAttribute('aria-expanded')).toBe('true');
    });

    it('should not set aria-haspopup when it does not have a submenu', async () => {
      const harness = await renderMenu();
      expect(harness.item('edit').hasAttribute('aria-haspopup')).toBe(false);
      expect(harness.item('edit').hasAttribute('aria-expanded')).toBe(false);
    });

    it('should render a submenu icon when it has a submenu', async () => {
      const harness = await renderMenu();
      const share = harness.item('share');
      await share.updateComplete;

      expect(share.shadowRoot?.querySelector('.submenu-icon')).toBeTruthy();
      expect(harness.item('edit').shadowRoot?.querySelector('.submenu-icon')).toBeFalsy();
    });

    it('should not render a state layer when disabled', async () => {
      const harness = await renderMenu();
      expect(harness.item('edit').shadowRoot?.querySelector('forge-state-layer')).toBeTruthy();
      expect(harness.item('delete').shadowRoot?.querySelector('forge-state-layer')).toBeFalsy();
    });

    it('should apply the option two-line and three-line layouts', async () => {
      const harness = await renderMenu();
      const edit = harness.item('edit');

      edit.twoLine = true;
      await edit.updateComplete;
      expect(edit.shadowRoot?.querySelector('.forge-option')?.classList.contains('two-line')).toBe(true);

      edit.threeLine = true;
      await edit.updateComplete;
      expect(edit.shadowRoot?.querySelector('.forge-option')?.classList.contains('three-line')).toBe(true);
      expect(edit.shadowRoot?.querySelector('.forge-option')?.classList.contains('two-line')).toBe(false);
    });

    it('should not open its submenu on hover when disabled', async () => {
      const screen = render(html`
        <button id="trigger" type="button">Actions</button>
        <forge-dropdown-menu trigger="trigger">
          <forge-dropdown-menu-item value="share" disabled>
            Share
            <forge-dropdown-menu-item>Email</forge-dropdown-menu-item>
          </forge-dropdown-menu-item>
          <forge-dropdown-menu-item value="other">Other</forge-dropdown-menu-item>
        </forge-dropdown-menu>
      `);
      const trigger = screen.container.querySelector('button') as HTMLElement;
      const menu = screen.container.querySelector('forge-dropdown-menu') as DropdownMenuComponent;
      const share = menu.querySelector('[value="share"]') as DropdownMenuItemComponent;
      await menu.updateComplete;
      trigger.click();
      await vi.waitFor(() => expect(menu.open).toBe(true));

      await userEvent.hover(share);
      await new Promise(resolve => setTimeout(resolve, 300));

      expect(share.open).toBe(false);
    });
  });

  describe('DropdownMenuItemCheckboxComponent', () => {
    const checkboxTemplate = (): TemplateResult => html`
      <button id="trigger" type="button">View</button>
      <forge-dropdown-menu trigger="trigger">
        <forge-dropdown-menu-item-checkbox value="grid">Grid lines</forge-dropdown-menu-item-checkbox>
        <forge-dropdown-menu-item-checkbox value="ruler" checked>Ruler</forge-dropdown-menu-item-checkbox>
        <forge-dropdown-menu-item-checkbox value="guides" disabled>Guides</forge-dropdown-menu-item-checkbox>
      </forge-dropdown-menu>
    `;

    const getCheckbox = (harness: DropdownMenuHarness, value: string): DropdownMenuItemCheckboxComponent =>
      harness.menu.querySelector(`forge-dropdown-menu-item-checkbox[value="${value}"]`) as DropdownMenuItemCheckboxComponent;

    const hasCheckmark = (item: BaseDropdownMenuItem): boolean => !!item.shadowRoot?.querySelector('forge-icon[part="checkmark"]');

    it('should have the menuitemcheckbox role', async () => {
      const harness = await renderMenu(checkboxTemplate());
      expect(getCheckbox(harness, 'grid').matches('[role="menuitemcheckbox"]')).toBe(true);
    });

    it('should expose checked state through aria-checked', async () => {
      const harness = await renderMenu(checkboxTemplate());
      const grid = getCheckbox(harness, 'grid');
      const ruler = getCheckbox(harness, 'ruler');
      await Promise.all([grid.updateComplete, ruler.updateComplete]);

      expect(grid.getAttribute('aria-checked')).toBe('false');
      expect(ruler.getAttribute('aria-checked')).toBe('true');
    });

    it('should render a check icon only when checked', async () => {
      const harness = await renderMenu(checkboxTemplate());
      const grid = getCheckbox(harness, 'grid');
      const ruler = getCheckbox(harness, 'ruler');
      await Promise.all([grid.updateComplete, ruler.updateComplete]);

      expect(hasCheckmark(grid)).toBe(false);
      expect(hasCheckmark(ruler)).toBe(true);

      grid.checked = true;
      await grid.updateComplete;
      expect(hasCheckmark(grid)).toBe(true);
    });

    it('should toggle checked and dispatch change when clicked', async () => {
      const harness = await renderMenu(checkboxTemplate());
      const grid = getCheckbox(harness, 'grid');
      const changeSpy = vi.fn();
      grid.addEventListener('change', changeSpy);
      harness.menu.addEventListener('forge-dropdown-menu-item-select', evt => evt.preventDefault());
      await harness.open();

      grid.click();
      await grid.updateComplete;
      expect(grid.checked).toBe(true);
      expect(grid.getAttribute('aria-checked')).toBe('true');
      expect(changeSpy).toHaveBeenCalledTimes(1);

      grid.click();
      await grid.updateComplete;
      expect(grid.checked).toBe(false);
      expect(changeSpy).toHaveBeenCalledTimes(2);
    });

    it('should not dispatch change when checked programmatically', async () => {
      const harness = await renderMenu(checkboxTemplate());
      const grid = getCheckbox(harness, 'grid');
      const changeSpy = vi.fn();
      grid.addEventListener('change', changeSpy);

      grid.checked = true;
      await grid.updateComplete;

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should toggle when Enter or Space is pressed', async () => {
      const harness = await renderMenu(checkboxTemplate());
      const grid = getCheckbox(harness, 'grid');
      harness.menu.addEventListener('forge-dropdown-menu-item-select', evt => evt.preventDefault());
      await harness.open();
      expect(harness.focusedItem).toBe(grid);

      await harness.pressKey('Enter');
      expect(grid.checked).toBe(true);

      await harness.pressKey(' ');
      expect(grid.checked).toBe(false);
    });

    it('should dispatch the select event with its value and new checked state and close the menu', async () => {
      const harness = await renderMenu(checkboxTemplate());
      const selectSpy = vi.fn();
      harness.menu.addEventListener('forge-dropdown-menu-item-select', evt => selectSpy(evt.detail));
      await harness.open();

      getCheckbox(harness, 'grid').click();

      expect(selectSpy).toHaveBeenCalledWith({ value: 'grid', checked: true });
      await harness.waitForClosed();
    });

    it('should keep the menu open when the select event is canceled', async () => {
      const harness = await renderMenu(checkboxTemplate());
      harness.menu.addEventListener('forge-dropdown-menu-item-select', evt => evt.preventDefault());
      await harness.open();

      getCheckbox(harness, 'grid').click();
      await frame();

      expect(harness.menu.open).toBe(true);
      expect(getCheckbox(harness, 'grid').checked).toBe(true);
    });

    it('should not toggle when disabled', async () => {
      const harness = await renderMenu(checkboxTemplate());
      const guides = getCheckbox(harness, 'guides');
      await harness.open();

      guides.click();
      await frame();

      expect(guides.checked).toBe(false);
      expect(guides.getAttribute('aria-disabled')).toBe('true');
    });

    it('should be navigable with the arrow keys alongside other item types', async () => {
      const harness = await renderMenu(html`
        <button id="trigger" type="button">View</button>
        <forge-dropdown-menu trigger="trigger">
          <forge-dropdown-menu-item value="reset">Reset</forge-dropdown-menu-item>
          <forge-dropdown-menu-item-checkbox value="grid">Grid lines</forge-dropdown-menu-item-checkbox>
          <forge-dropdown-menu-item-radio value="small" name="size">Small</forge-dropdown-menu-item-radio>
        </forge-dropdown-menu>
      `);
      await harness.open();
      expect(harness.focusedItem?.getAttribute('value')).toBe('reset');

      await harness.pressKey('ArrowDown');
      expect(harness.focusedItem?.getAttribute('value')).toBe('grid');

      await harness.pressKey('ArrowDown');
      expect(harness.focusedItem?.getAttribute('value')).toBe('small');

      await harness.pressKey('ArrowDown');
      expect(harness.focusedItem?.getAttribute('value')).toBe('reset');
    });

    it('should be placed in a submenu of a dropdown menu item', async () => {
      const harness = await renderMenu(html`
        <button id="trigger" type="button">View</button>
        <forge-dropdown-menu trigger="trigger">
          <forge-dropdown-menu-item value="show">
            Show
            <forge-dropdown-menu-item-checkbox value="grid">Grid lines</forge-dropdown-menu-item-checkbox>
            <forge-dropdown-menu-item-radio value="small" name="size">Small</forge-dropdown-menu-item-radio>
          </forge-dropdown-menu-item>
        </forge-dropdown-menu>
      `);
      const show = harness.item('show');
      await harness.open();

      expect(show.hasSubmenu).toBe(true);
      expect(getCheckbox(harness, 'grid').slot).toBe('submenu');

      await harness.pressKey('ArrowRight');
      await vi.waitFor(() => expect(show.open).toBe(true));
      await vi.waitFor(() => expect(harness.focusedItem?.getAttribute('value')).toBe('grid'));
    });

    describe('form association', () => {
      const formTemplate = (): TemplateResult => html`
        <form>
          <button id="trigger" type="button">View</button>
          <forge-dropdown-menu trigger="trigger">
            <forge-dropdown-menu-item-checkbox name="options" value="grid">Grid lines</forge-dropdown-menu-item-checkbox>
            <forge-dropdown-menu-item-checkbox name="options" value="ruler" checked>Ruler</forge-dropdown-menu-item-checkbox>
            <forge-dropdown-menu-item-checkbox name="defaulted" value="snap" default-checked>Snap</forge-dropdown-menu-item-checkbox>
          </forge-dropdown-menu>
        </form>
      `;

      const getForm = (harness: DropdownMenuHarness): HTMLFormElement => harness.menu.closest('form') as HTMLFormElement;

      it('should associate with its form', async () => {
        const harness = await renderMenu(formTemplate());
        expect(getCheckbox(harness, 'grid').form).toBe(getForm(harness));
      });

      it('should submit the value of checked items only', async () => {
        const harness = await renderMenu(formTemplate());
        const grid = getCheckbox(harness, 'grid');
        await Promise.all([grid.updateComplete, getCheckbox(harness, 'ruler').updateComplete]);
        expect(new FormData(getForm(harness)).getAll('options')).toEqual(['ruler']);

        grid.checked = true;
        await grid.updateComplete;
        expect(new FormData(getForm(harness)).getAll('options')).toEqual(['grid', 'ruler']);
      });

      it('should submit the default value of "on" when no value is set', async () => {
        const screen = render(html`
          <form>
            <forge-dropdown-menu-item-checkbox name="flag" checked>Flag</forge-dropdown-menu-item-checkbox>
          </form>
        `);
        const item = screen.container.querySelector('forge-dropdown-menu-item-checkbox') as DropdownMenuItemCheckboxComponent;
        await item.updateComplete;

        expect(new FormData(screen.container.querySelector('form') as HTMLFormElement).get('flag')).toBe('on');
      });

      it('should be checked initially when default-checked is set', async () => {
        const harness = await renderMenu(formTemplate());
        const snap = getCheckbox(harness, 'snap');
        await snap.updateComplete;

        expect(snap.checked).toBe(true);
        expect(new FormData(getForm(harness)).get('defaulted')).toBe('snap');
      });

      it('should return to its default checked state when the form is reset', async () => {
        const harness = await renderMenu(formTemplate());
        const grid = getCheckbox(harness, 'grid');
        const snap = getCheckbox(harness, 'snap');
        grid.checked = true;
        snap.checked = false;
        await Promise.all([grid.updateComplete, snap.updateComplete]);

        getForm(harness).reset();
        await Promise.all([grid.updateComplete, snap.updateComplete]);

        expect(grid.checked).toBe(false);
        expect(snap.checked).toBe(true);
      });

      it('should reflect the name property as an attribute', async () => {
        const harness = await renderMenu(formTemplate());
        const grid = getCheckbox(harness, 'grid');

        grid.name = 'renamed';
        await grid.updateComplete;
        expect(grid.getAttribute('name')).toBe('renamed');

        grid.name = '';
        await grid.updateComplete;
        expect(grid.hasAttribute('name')).toBe(false);
      });

      it('should be disabled when within a disabled fieldset', async () => {
        const screen = render(html`
          <form>
            <fieldset disabled>
              <forge-dropdown-menu-item-checkbox name="flag">Flag</forge-dropdown-menu-item-checkbox>
            </fieldset>
          </form>
        `);
        const item = screen.container.querySelector('forge-dropdown-menu-item-checkbox') as DropdownMenuItemCheckboxComponent;
        await vi.waitFor(() => expect(item.disabled).toBe(true));
      });
    });
  });

  describe('DropdownMenuItemRadioComponent', () => {
    const radioTemplate = (): TemplateResult => html`
      <button id="trigger" type="button">Density</button>
      <forge-dropdown-menu trigger="trigger">
        <forge-dropdown-menu-item-radio name="density" value="compact">Compact</forge-dropdown-menu-item-radio>
        <forge-dropdown-menu-item-radio name="density" value="default" checked>Default</forge-dropdown-menu-item-radio>
        <forge-dropdown-menu-item-radio name="density" value="comfortable">Comfortable</forge-dropdown-menu-item-radio>
        <forge-divider></forge-divider>
        <forge-dropdown-menu-item-radio name="sort" value="name" checked>Name</forge-dropdown-menu-item-radio>
        <forge-dropdown-menu-item-radio name="sort" value="date">Date</forge-dropdown-menu-item-radio>
      </forge-dropdown-menu>
    `;

    const getRadio = (harness: DropdownMenuHarness, value: string): DropdownMenuItemRadioComponent =>
      harness.menu.querySelector(`forge-dropdown-menu-item-radio[value="${value}"]`) as DropdownMenuItemRadioComponent;

    it('should have the menuitemradio role', async () => {
      const harness = await renderMenu(radioTemplate());
      expect(getRadio(harness, 'compact').matches('[role="menuitemradio"]')).toBe(true);
    });

    it('should expose checked state through aria-checked', async () => {
      const harness = await renderMenu(radioTemplate());
      const compact = getRadio(harness, 'compact');
      const standard = getRadio(harness, 'default');
      await Promise.all([compact.updateComplete, standard.updateComplete]);

      expect(compact.getAttribute('aria-checked')).toBe('false');
      expect(standard.getAttribute('aria-checked')).toBe('true');
    });

    it('should render a check icon only when checked', async () => {
      const harness = await renderMenu(radioTemplate());
      const compact = getRadio(harness, 'compact');
      const standard = getRadio(harness, 'default');
      await Promise.all([compact.updateComplete, standard.updateComplete]);

      expect(compact.shadowRoot?.querySelector('forge-icon[part="checkmark"]')).toBeNull();
      expect(standard.shadowRoot?.querySelector('forge-icon[part="checkmark"]')).not.toBeNull();
    });

    it('should check the clicked radio and uncheck the others in its group', async () => {
      const harness = await renderMenu(radioTemplate());
      const compact = getRadio(harness, 'compact');
      const standard = getRadio(harness, 'default');
      const changeSpy = vi.fn();
      compact.addEventListener('change', changeSpy);
      await harness.open();

      compact.click();
      await Promise.all([compact.updateComplete, standard.updateComplete]);

      expect(compact.checked).toBe(true);
      expect(standard.checked).toBe(false);
      expect(changeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not affect radios with a different name', async () => {
      const harness = await renderMenu(radioTemplate());
      await harness.open();

      getRadio(harness, 'compact').click();
      await frame();

      expect(getRadio(harness, 'name').checked).toBe(true);
    });

    it('should uncheck the others in its group when checked programmatically', async () => {
      const harness = await renderMenu(radioTemplate());
      const comfortable = getRadio(harness, 'comfortable');
      const standard = getRadio(harness, 'default');

      comfortable.checked = true;
      await Promise.all([comfortable.updateComplete, standard.updateComplete]);

      expect(standard.checked).toBe(false);
    });

    it('should remain checked and not dispatch change when the checked radio is clicked', async () => {
      const harness = await renderMenu(radioTemplate());
      const standard = getRadio(harness, 'default');
      const changeSpy = vi.fn();
      standard.addEventListener('change', changeSpy);
      await harness.open();

      standard.click();
      await standard.updateComplete;

      expect(standard.checked).toBe(true);
      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should not form a group when it has no name', async () => {
      const harness = await renderMenu(html`
        <button id="trigger" type="button">Density</button>
        <forge-dropdown-menu trigger="trigger">
          <forge-dropdown-menu-item-radio value="a" checked>A</forge-dropdown-menu-item-radio>
          <forge-dropdown-menu-item-radio value="b">B</forge-dropdown-menu-item-radio>
        </forge-dropdown-menu>
      `);
      const b = getRadio(harness, 'b');

      b.checked = true;
      await b.updateComplete;

      expect(getRadio(harness, 'a').checked).toBe(true);
    });

    it('should only group radios within the same menu', async () => {
      const screen = render(html`
        <button id="first-trigger" type="button">First</button>
        <forge-dropdown-menu id="first" trigger="first-trigger">
          <forge-dropdown-menu-item-radio name="density" value="one" checked>One</forge-dropdown-menu-item-radio>
        </forge-dropdown-menu>
        <button id="second-trigger" type="button">Second</button>
        <forge-dropdown-menu id="second" trigger="second-trigger">
          <forge-dropdown-menu-item-radio name="density" value="two">Two</forge-dropdown-menu-item-radio>
        </forge-dropdown-menu>
      `);
      const one = screen.container.querySelector('[value="one"]') as DropdownMenuItemRadioComponent;
      const two = screen.container.querySelector('[value="two"]') as DropdownMenuItemRadioComponent;

      two.checked = true;
      await Promise.all([one.updateComplete, two.updateComplete]);

      expect(one.checked).toBe(true);
    });

    it('should group radios across a submenu', async () => {
      const harness = await renderMenu(html`
        <button id="trigger" type="button">Density</button>
        <forge-dropdown-menu trigger="trigger">
          <forge-dropdown-menu-item-radio name="density" value="compact" checked>Compact</forge-dropdown-menu-item-radio>
          <forge-dropdown-menu-item value="more">
            More
            <forge-dropdown-menu-item-radio name="density" value="spacious">Spacious</forge-dropdown-menu-item-radio>
          </forge-dropdown-menu-item>
        </forge-dropdown-menu>
      `);
      const spacious = getRadio(harness, 'spacious');

      spacious.checked = true;
      await spacious.updateComplete;

      expect(getRadio(harness, 'compact').checked).toBe(false);
    });

    it('should dispatch the select event with its value and checked state', async () => {
      const harness = await renderMenu(radioTemplate());
      const selectSpy = vi.fn();
      harness.menu.addEventListener('forge-dropdown-menu-item-select', evt => selectSpy(evt.detail));
      await harness.open();

      getRadio(harness, 'comfortable').click();

      expect(selectSpy).toHaveBeenCalledWith({ value: 'comfortable', checked: true });
      await harness.waitForClosed();
    });

    it('should not check when disabled', async () => {
      const harness = await renderMenu(html`
        <button id="trigger" type="button">Density</button>
        <forge-dropdown-menu trigger="trigger">
          <forge-dropdown-menu-item-radio name="density" value="default" checked>Default</forge-dropdown-menu-item-radio>
          <forge-dropdown-menu-item-radio name="density" value="compact" disabled>Compact</forge-dropdown-menu-item-radio>
        </forge-dropdown-menu>
      `);
      const compact = getRadio(harness, 'compact');
      await harness.open();

      compact.click();
      await frame();

      expect(compact.checked).toBe(false);
    });

    describe('form association', () => {
      const formTemplate = (): TemplateResult => html`
        <form>
          <button id="trigger" type="button">Density</button>
          <forge-dropdown-menu trigger="trigger">
            <forge-dropdown-menu-item-radio name="density" value="compact">Compact</forge-dropdown-menu-item-radio>
            <forge-dropdown-menu-item-radio name="density" value="default" default-checked>Default</forge-dropdown-menu-item-radio>
            <forge-dropdown-menu-item-radio name="density" value="comfortable">Comfortable</forge-dropdown-menu-item-radio>
          </forge-dropdown-menu>
        </form>
      `;

      const getForm = (harness: DropdownMenuHarness): HTMLFormElement => harness.menu.closest('form') as HTMLFormElement;

      it('should associate with its form', async () => {
        const harness = await renderMenu(formTemplate());
        expect(getRadio(harness, 'compact').form).toBe(getForm(harness));
      });

      it('should submit the value of the checked radio only', async () => {
        const harness = await renderMenu(formTemplate());
        const comfortable = getRadio(harness, 'comfortable');
        await getRadio(harness, 'default').updateComplete;
        expect(new FormData(getForm(harness)).getAll('density')).toEqual(['default']);

        comfortable.checked = true;
        await comfortable.updateComplete;
        await getRadio(harness, 'default').updateComplete;
        expect(new FormData(getForm(harness)).getAll('density')).toEqual(['comfortable']);
      });

      it('should return to its default checked state when the form is reset', async () => {
        const harness = await renderMenu(formTemplate());
        const comfortable = getRadio(harness, 'comfortable');
        const standard = getRadio(harness, 'default');
        comfortable.checked = true;
        await Promise.all([comfortable.updateComplete, standard.updateComplete]);

        getForm(harness).reset();
        await Promise.all([comfortable.updateComplete, standard.updateComplete]);

        expect(standard.checked).toBe(true);
        expect(comfortable.checked).toBe(false);
        expect(new FormData(getForm(harness)).getAll('density')).toEqual(['default']);
      });

      it('should be disabled when within a disabled fieldset', async () => {
        const screen = render(html`
          <form>
            <fieldset disabled>
              <forge-dropdown-menu-item-radio name="density" value="compact">Compact</forge-dropdown-menu-item-radio>
            </fieldset>
          </form>
        `);
        const item = screen.container.querySelector('forge-dropdown-menu-item-radio') as DropdownMenuItemRadioComponent;
        await vi.waitFor(() => expect(item.disabled).toBe(true));
      });
    });
  });
});
