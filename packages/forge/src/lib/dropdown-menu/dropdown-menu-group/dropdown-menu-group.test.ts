import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-lit';
import { frame } from '../../core/utils/utils.js';
import type { BaseDropdownMenuItem } from '../base/base-dropdown-menu-item.js';
import type { DropdownMenuItemComponent } from '../dropdown-menu-item/dropdown-menu-item.js';
import type { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.js';
import type { DropdownMenuGroupComponent } from './dropdown-menu-group.js';

import '../index.js';

const renderMenu = async (): Promise<{ menu: DropdownMenuComponent; trigger: HTMLElement }> => {
  const screen = render(html`
    <button id="trigger" type="button">Actions</button>
    <forge-dropdown-menu trigger="trigger">
      <forge-dropdown-menu-group id="edit-group" label="Edit">
        <forge-dropdown-menu-item value="cut">Cut</forge-dropdown-menu-item>
        <forge-dropdown-menu-item value="copy">Copy</forge-dropdown-menu-item>
      </forge-dropdown-menu-group>
      <forge-divider></forge-divider>
      <forge-dropdown-menu-group id="view-group">
        <span slot="label">View</span>
        <forge-dropdown-menu-item value="zoom" disabled>Zoom</forge-dropdown-menu-item>
        <forge-dropdown-menu-item value="share">
          Share
          <forge-dropdown-menu-group id="share-group" label="Send">
            <forge-dropdown-menu-item value="email">Email</forge-dropdown-menu-item>
            <forge-dropdown-menu-item value="link">Link</forge-dropdown-menu-item>
          </forge-dropdown-menu-group>
        </forge-dropdown-menu-item>
      </forge-dropdown-menu-group>
    </forge-dropdown-menu>
  `);
  const menu = screen.container.querySelector('forge-dropdown-menu') as DropdownMenuComponent;
  await menu.updateComplete;
  return { menu, trigger: screen.container.querySelector('button') as HTMLElement };
};

const getGroup = (menu: DropdownMenuComponent, id: string): DropdownMenuGroupComponent => menu.querySelector(`#${id}`) as DropdownMenuGroupComponent;
const getItem = (menu: DropdownMenuComponent, value: string): DropdownMenuItemComponent =>
  menu.querySelector(`forge-dropdown-menu-item[value="${value}"]`) as DropdownMenuItemComponent;
const getFocusedValue = (menu: DropdownMenuComponent): unknown =>
  Array.from(menu.querySelectorAll<BaseDropdownMenuItem>('forge-dropdown-menu-item')).find(item => item.matches(':focus'))?.value;

const openMenu = async (menu: DropdownMenuComponent, trigger: HTMLElement): Promise<void> => {
  trigger.click();
  await vi.waitFor(() => expect(menu.open).toBe(true));
  await vi.waitFor(() => expect(getFocusedValue(menu)).toBeDefined());
};

const pressKey = async (key: string): Promise<void> => {
  await userEvent.keyboard(`{${key}}`);
  await frame();
};

describe('DropdownMenuGroup', () => {
  it('should instantiate shadow root', async () => {
    const { menu } = await renderMenu();
    expect(getGroup(menu, 'edit-group').shadowRoot).not.toBeNull();
  });

  it('should have the group role', async () => {
    const { menu } = await renderMenu();
    expect(getGroup(menu, 'edit-group').getAttribute('role')).toBe('group');
  });

  it('should render the label attribute', async () => {
    const { menu } = await renderMenu();
    const group = getGroup(menu, 'edit-group');
    await group.updateComplete;
    expect(group.shadowRoot?.querySelector('#label')?.textContent?.trim()).toBe('Edit');
  });

  it('should reflect label changes to the attribute', async () => {
    const { menu } = await renderMenu();
    const group = getGroup(menu, 'edit-group');
    group.label = 'Updated';
    await group.updateComplete;
    expect(group.getAttribute('label')).toBe('Updated');
    expect(group.shadowRoot?.querySelector('#label')?.textContent?.trim()).toBe('Updated');
  });

  it('should render slotted label content', async () => {
    const { menu } = await renderMenu();
    const group = getGroup(menu, 'view-group');
    await group.updateComplete;
    const slot = group.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="label"]');
    expect(slot?.assignedElements()[0].textContent).toBe('View');
  });

  it('should render the label with a presentation role', async () => {
    const { menu } = await renderMenu();
    const group = getGroup(menu, 'edit-group');
    await group.updateComplete;
    expect(group.shadowRoot?.querySelector('#label')?.getAttribute('role')).toBe('presentation');
  });

  it('should not make the items within it submenu items', async () => {
    const { menu } = await renderMenu();
    expect(getItem(menu, 'cut').hasSubmenu).toBe(false);
  });

  describe('keyboard navigation', () => {
    it('should focus the first item within the first group when the menu opens', async () => {
      const { menu, trigger } = await renderMenu();
      await openMenu(menu, trigger);
      expect(getFocusedValue(menu)).toBe('cut');
    });

    it('should move focus across group boundaries when ArrowDown is pressed', async () => {
      const { menu, trigger } = await renderMenu();
      await openMenu(menu, trigger);

      await pressKey('ArrowDown');
      expect(getFocusedValue(menu)).toBe('copy');

      await pressKey('ArrowDown');
      expect(getFocusedValue(menu)).toBe('share');
    });

    it('should wrap focus from the last item to the first item across groups', async () => {
      const { menu, trigger } = await renderMenu();
      await openMenu(menu, trigger);

      await pressKey('End');
      expect(getFocusedValue(menu)).toBe('share');

      await pressKey('ArrowDown');
      expect(getFocusedValue(menu)).toBe('cut');
    });

    it('should move focus to the last item across groups when ArrowUp is pressed on the first item', async () => {
      const { menu, trigger } = await renderMenu();
      await openMenu(menu, trigger);

      await pressKey('ArrowUp');
      expect(getFocusedValue(menu)).toBe('share');
    });

    it('should skip disabled items within groups', async () => {
      const { menu, trigger } = await renderMenu();
      await openMenu(menu, trigger);

      await pressKey('ArrowDown');
      await pressKey('ArrowDown');
      expect(getFocusedValue(menu)).not.toBe('zoom');
    });

    it('should search for items across groups', async () => {
      const { menu, trigger } = await renderMenu();
      await openMenu(menu, trigger);

      await userEvent.keyboard('s');
      await frame();
      expect(getFocusedValue(menu)).toBe('share');
    });
  });

  describe('submenus', () => {
    it('should detect a submenu from items within a nested group', async () => {
      const { menu } = await renderMenu();
      const share = getItem(menu, 'share');
      await share.updateComplete;
      expect(share.hasSubmenu).toBe(true);
    });

    it('should assign a nested group to the submenu slot', async () => {
      const { menu } = await renderMenu();
      expect(getGroup(menu, 'share-group').slot).toBe('submenu');
    });

    it('should open the submenu and focus the first item within its group when ArrowRight is pressed', async () => {
      const { menu, trigger } = await renderMenu();
      await openMenu(menu, trigger);
      await pressKey('End');

      await pressKey('ArrowRight');
      await vi.waitFor(() => expect(getFocusedValue(menu)).toBe('email'));
    });

    it('should navigate within the submenu group and return to the parent item when ArrowLeft is pressed', async () => {
      const { menu, trigger } = await renderMenu();
      await openMenu(menu, trigger);
      await pressKey('End');
      await pressKey('ArrowRight');
      await vi.waitFor(() => expect(getFocusedValue(menu)).toBe('email'));

      await pressKey('ArrowDown');
      expect(getFocusedValue(menu)).toBe('link');

      await pressKey('ArrowLeft');
      expect(getFocusedValue(menu)).toBe('share');
      expect(getItem(menu, 'share').open).toBe(false);
    });

    it('should select an item within a group and close the menu', async () => {
      const { menu, trigger } = await renderMenu();
      const onSelect = vi.fn();
      menu.addEventListener('forge-dropdown-menu-item-select', onSelect);
      await openMenu(menu, trigger);

      await pressKey('Enter');

      expect(onSelect).toHaveBeenCalledOnce();
      expect(onSelect.mock.calls[0][0].detail.value).toBe('cut');
      await vi.waitFor(() => expect(menu.open).toBe(false));
    });
  });
});
