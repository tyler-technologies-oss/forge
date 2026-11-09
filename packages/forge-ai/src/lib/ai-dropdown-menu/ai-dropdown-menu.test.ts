import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { userEvent } from 'vitest/browser';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { ForgeAiDropdownMenuComponent } from './ai-dropdown-menu.js';
import type { ForgeAiDropdownMenuItemComponent } from './ai-dropdown-menu-item.js';
import type { DropdownChangeEventDetail } from './selection-manager.js';

import './index.js';

const TAG = 'forge-ai-dropdown-menu';

const items = html`
  <forge-ai-dropdown-menu-item value="a">Alpha</forge-ai-dropdown-menu-item>
  <forge-ai-dropdown-menu-item value="b">Bravo</forge-ai-dropdown-menu-item>
  <forge-ai-dropdown-menu-item value="c">Charlie</forge-ai-dropdown-menu-item>
`;

function createMenu(template = html`<forge-ai-dropdown-menu>${items}</forge-ai-dropdown-menu>`): Promise<ForgeAiDropdownMenuComponent> {
  return renderFixture<ForgeAiDropdownMenuComponent>(template, TAG);
}

const getTrigger = (el: ForgeAiDropdownMenuComponent): HTMLButtonElement => el.shadowRoot!.querySelector<HTMLButtonElement>('#dropdown-trigger')!;
const getContent = (el: ForgeAiDropdownMenuComponent): HTMLElement => el.shadowRoot!.querySelector<HTMLElement>('#dropdown-content')!;
const getItems = (el: ForgeAiDropdownMenuComponent): ForgeAiDropdownMenuItemComponent[] => Array.from(el.querySelectorAll('forge-ai-dropdown-menu-item'));

async function openMenu(el: ForgeAiDropdownMenuComponent): Promise<void> {
  el.open = true;
  await settle(el);
}

function collect<T = DropdownChangeEventDetail>(el: HTMLElement, type: string): CustomEvent<T>[] {
  const events: CustomEvent<T>[] = [];
  el.addEventListener(type, evt => events.push(evt as CustomEvent<T>));
  return events;
}

describe('ForgeAiDropdownMenu', () => {
  describe('registration', () => {
    it('should define the custom element', () => {
      expect(customElements.get(TAG)).toBeDefined();
    });

    it('should contain shadow root', async () => {
      const el = await createMenu();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('defaults', () => {
    it('should use documented default property values', async () => {
      const el = await createMenu();

      expect(el.variant).toBe('button');
      expect(el.density).toBe('medium');
      expect(el.open).toBe(false);
      expect(el.disabled).toBe(false);
      expect(el.selectionMode).toBe('none');
      expect(el.value).toBeNull();
      expect(el.popoverPlacement).toBe('bottom-start');
      expect(el.triggerLabel).toBeUndefined();
    });
  });

  describe('trigger', () => {
    it('should render a button trigger with menu popup semantics by default', async () => {
      const el = await createMenu();
      const trigger = getTrigger(el);

      expect(trigger.type).toBe('button');
      expect(trigger.classList.contains('forge-button')).toBe(true);
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should render the default trigger text when no selection exists', async () => {
      const el = await createMenu();

      expect(getTrigger(el).textContent).toContain('Choose...');
    });

    it('should project trigger-content slot content', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu><span slot="trigger-content">Pick one</span>${items}</forge-ai-dropdown-menu>`);
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="trigger-content"]')!;

      expect(slot.assignedNodes()).toHaveLength(1);
      expect((slot.assignedNodes()[0] as HTMLElement).textContent).toBe('Pick one');
    });

    it('should project start and end slot content into the trigger', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu><span slot="start">S</span><span slot="end">E</span>${items}</forge-ai-dropdown-menu>`);

      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="start"]')!.assignedNodes()).toHaveLength(1);
      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="end"]')!.assignedNodes()).toHaveLength(1);
    });

    it('should project header slot content', async () => {
      const el = await createMenu(
        html`<forge-ai-dropdown-menu
          ><div slot="header">Heading</div>
          ${items}</forge-ai-dropdown-menu
        >`
      );
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="header"]')!;

      expect(slot.assignedNodes()).toHaveLength(1);
    });

    it('should apply the trigger-label as aria-label', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu trigger-label="More options">${items}</forge-ai-dropdown-menu>`);

      expect(el.triggerLabel).toBe('More options');
      expect(getTrigger(el).getAttribute('aria-label')).toBe('More options');
    });

    it('should omit aria-label when no trigger-label is set', async () => {
      const el = await createMenu();

      expect(getTrigger(el).hasAttribute('aria-label')).toBe(false);
    });

    it('should render icon-button variant classes', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu variant="icon-button">${items}</forge-ai-dropdown-menu>`);
      const trigger = getTrigger(el);

      expect(trigger.classList.contains('forge-icon-button')).toBe(true);
      expect(trigger.classList.contains('forge-button')).toBe(false);
      expect(trigger.classList.contains('forge-icon-button--squared')).toBe(false);
    });

    it('should render squared icon-button variant classes', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu variant="icon-button-squared">${items}</forge-ai-dropdown-menu>`);
      const trigger = getTrigger(el);

      expect(trigger.classList.contains('forge-icon-button')).toBe(true);
      expect(trigger.classList.contains('forge-icon-button--squared')).toBe(true);
    });

    it('should apply density classes to the button trigger', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu density="small">${items}</forge-ai-dropdown-menu>`);

      expect(getTrigger(el).classList.contains('forge-button--small')).toBe(true);
    });

    it('should apply density classes to the icon-button trigger', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu variant="icon-button" density="medium">${items}</forge-ai-dropdown-menu>`);

      expect(getTrigger(el).classList.contains('forge-icon-button--medium')).toBe(true);
    });

    it('should not add a density class when density is large', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu density="large">${items}</forge-ai-dropdown-menu>`);
      const trigger = getTrigger(el);

      expect(trigger.className).not.toContain('--large');
      expect(trigger.className).not.toContain('--medium');
      expect(trigger.className).not.toContain('--small');
    });

    it('should disable the trigger when disabled', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu disabled>${items}</forge-ai-dropdown-menu>`);

      expect(getTrigger(el).disabled).toBe(true);
    });

    it('should reflect disabled to an attribute', async () => {
      const el = await createMenu();

      el.disabled = true;
      await el.updateComplete;

      expect(el.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('open state', () => {
    it('should toggle open when the trigger is clicked', async () => {
      const el = await createMenu();

      getTrigger(el).click();
      await settle(el);
      expect(el.open).toBe(true);
      expect(getTrigger(el).getAttribute('aria-expanded')).toBe('true');

      getTrigger(el).click();
      await settle(el);
      expect(el.open).toBe(false);
      expect(getTrigger(el).getAttribute('aria-expanded')).toBe('false');
    });

    it('should reflect open to an attribute', async () => {
      const el = await createMenu();

      await openMenu(el);

      expect(el.hasAttribute('open')).toBe(true);
    });

    it('should read the open attribute into the property', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu open>${items}</forge-ai-dropdown-menu>`);

      expect(el.open).toBe(true);
    });

    it('should open the popover when open is true', async () => {
      const el = await createMenu();

      await openMenu(el);

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.open).toBe(true);
    });

    it('should dispatch the open event with a timestamp when opened', async () => {
      const el = await createMenu();
      const events = collect<{ timestamp: number }>(el, 'forge-ai-dropdown-menu-open');

      await openMenu(el);

      expect(events).toHaveLength(1);
      expect(typeof events[0].detail.timestamp).toBe('number');
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should dispatch the close event with a timestamp when closed after being open', async () => {
      const el = await createMenu();
      await openMenu(el);
      const events = collect<{ timestamp: number }>(el, 'forge-ai-dropdown-menu-close');

      el.open = false;
      await settle(el);

      expect(events).toHaveLength(1);
      expect(typeof events[0].detail.timestamp).toBe('number');
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should not dispatch the close event on initial render', async () => {
      const closeSpy = vi.fn();
      const container = document.createElement('div');
      container.addEventListener('forge-ai-dropdown-menu-close', closeSpy);
      document.body.append(container);
      const el = document.createElement(TAG) as ForgeAiDropdownMenuComponent;
      container.append(el);
      await settle(el);

      expect(closeSpy).not.toHaveBeenCalled();
    });

    it('should not toggle open when the trigger is clicked while disabled', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu disabled>${items}</forge-ai-dropdown-menu>`);

      getTrigger(el).click();
      await settle(el);

      expect(el.open).toBe(false);
    });

    it('should set data-handles-escape while open and remove it when closed', async () => {
      const el = await createMenu();

      await openMenu(el);
      expect(el.hasAttribute('data-handles-escape')).toBe(true);

      el.open = false;
      await settle(el);
      expect(el.hasAttribute('data-handles-escape')).toBe(false);
    });

    it('should sync open when the popover reports a toggle', async () => {
      const el = await createMenu();
      await openMenu(el);
      const popover = el.shadowRoot!.querySelector('forge-ai-popover')!;

      popover.dispatchEvent(new CustomEvent('forge-ai-popover-toggle', { detail: { open: false }, bubbles: true, composed: true }));
      await settle(el);

      expect(el.open).toBe(false);
    });

    it('should close when focus moves outside the menu', async () => {
      const outside = document.createElement('button');
      document.body.append(outside);
      const el = await createMenu();
      await openMenu(el);
      getItems(el)[0].focus();

      outside.focus();
      await settle(el);

      expect(el.open).toBe(false);
    });

    it('should stay open when focus moves between items inside the menu', async () => {
      const el = await createMenu();
      await openMenu(el);
      const [first, second] = getItems(el);
      first.focus();

      second.focus();
      await settle(el);

      expect(el.open).toBe(true);
    });

    it('should not react to focus loss when already closed', async () => {
      const el = await createMenu();
      const spy = vi.fn();
      el.addEventListener('forge-ai-dropdown-menu-close', spy);

      getTrigger(el).focus();
      getTrigger(el).blur();
      await settle(el);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('popover', () => {
    it('should pass popoverPlacement to the popover for root menus', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu popover-placement="bottom-end">${items}</forge-ai-dropdown-menu>`);

      expect(el.popoverPlacement).toBe('bottom-end');
      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.placement).toBe('bottom-end');
    });

    it('should anchor the popover to the trigger button for root menus', async () => {
      const el = await createMenu();
      el.requestUpdate();
      await el.updateComplete;

      expect(el.shadowRoot!.querySelector('forge-ai-popover')!.anchor).toBe(getTrigger(el));
    });
  });

  describe('accessibility', () => {
    it('should render a menu role container in none mode', async () => {
      const el = await createMenu();

      expect(getContent(el).getAttribute('role')).toBe('menu');
      expect(getContent(el).hasAttribute('aria-multiselectable')).toBe(false);
      expect(getContent(el).getAttribute('aria-labelledby')).toBe('dropdown-trigger');
      expect(getContent(el).getAttribute('aria-orientation')).toBe('vertical');
    });

    it('should render a listbox role container in single mode', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="single">${items}</forge-ai-dropdown-menu>`);

      expect(getContent(el).getAttribute('role')).toBe('listbox');
      expect(getTrigger(el).getAttribute('aria-haspopup')).toBe('listbox');
      expect(getContent(el).hasAttribute('aria-multiselectable')).toBe(false);
    });

    it('should render a multiselectable listbox in multi mode', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="multi">${items}</forge-ai-dropdown-menu>`);

      expect(getContent(el).getAttribute('role')).toBe('listbox');
      expect(getContent(el).getAttribute('aria-multiselectable')).toBe('true');
    });

    it('should associate the trigger with the content region', async () => {
      const el = await createMenu();

      expect(getTrigger(el).getAttribute('aria-controls')).toBe('dropdown-content');
      expect(getContent(el).id).toBe('dropdown-content');
    });
  });

  describe('selection-mode attribute', () => {
    it('should read the selection-mode attribute into the property', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="multi">${items}</forge-ai-dropdown-menu>`);

      expect(el.selectionMode).toBe('multi');
    });

    it('should push selection mode to items', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="single" value="a">${items}</forge-ai-dropdown-menu>`);
      await settle(el);

      for (const item of getItems(el)) {
        expect(item.selectionMode).toBe('single');
      }
    });

    it('should update items when selectionMode changes', async () => {
      const el = await createMenu();

      el.selectionMode = 'multi';
      await settle(el);

      for (const item of getItems(el)) {
        expect(item.selectionMode).toBe('multi');
      }
    });
  });

  describe('action mode (none)', () => {
    it('should dispatch a change event with action detail when an item is clicked', async () => {
      const el = await createMenu();
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      getItems(el)[1].click();
      await settle(el);

      expect(events).toHaveLength(1);
      const detail = events[0].detail;
      expect(detail.selectionMode).toBe('none');
      expect(detail.value).toBe('b');
      expect(detail.selectedItem).toBe(getItems(el)[1]);
      expect(typeof detail.timestamp).toBe('number');
      expect(events[0].bubbles).toBe(true);
      expect(events[0].composed).toBe(true);
    });

    it('should close the menu after an action item is clicked', async () => {
      const el = await createMenu();
      await openMenu(el);

      getItems(el)[0].click();
      await settle(el);

      expect(el.open).toBe(false);
    });

    it('should return focus to the trigger after an action item is clicked', async () => {
      const el = await createMenu();
      await openMenu(el);

      getItems(el)[0].click();
      await settle(el);

      expect(el.shadowRoot!.activeElement).toBe(getTrigger(el));
    });

    it('should not set a value for none mode', async () => {
      const el = await createMenu();
      await openMenu(el);

      getItems(el)[0].click();
      await settle(el);

      expect(el.value).toBeNull();
    });

    it('should not dispatch a change event when a disabled item is clicked', async () => {
      const el = await createMenu(html`
        <forge-ai-dropdown-menu>
          <forge-ai-dropdown-menu-item value="x" disabled>Disabled</forge-ai-dropdown-menu-item>
        </forge-ai-dropdown-menu>
      `);
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      getItems(el)[0].click();
      await settle(el);

      expect(events).toHaveLength(0);
    });
  });

  describe('single selection', () => {
    const single = html`<forge-ai-dropdown-menu selection-mode="single">${items}</forge-ai-dropdown-menu>`;

    it('should select an item and dispatch single detail with previousValue', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="single" value="a">${items}</forge-ai-dropdown-menu>`);
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      getItems(el)[2].click();
      await settle(el);

      expect(events).toHaveLength(1);
      expect(events[0].detail).toMatchObject({ selectionMode: 'single', value: 'c', previousValue: 'a' });
      expect(events[0].detail.selectedItem).toBe(getItems(el)[2]);
    });

    it('should report a null previousValue when nothing was selected', async () => {
      const el = await createMenu(single);
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      getItems(el)[0].click();
      await settle(el);

      expect(events[0].detail).toMatchObject({ value: 'a', previousValue: null });
    });

    it('should update value, mark item selected and close the menu', async () => {
      const el = await createMenu(single);
      await openMenu(el);

      getItems(el)[1].click();
      await settle(el);

      expect(el.value).toBe('b');
      expect(el.open).toBe(false);
      expect(getItems(el).map(i => i.selected)).toEqual([false, true, false]);
    });

    it('should set the selected state from the value property', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="single" value="c">${items}</forge-ai-dropdown-menu>`);
      await settle(el);

      expect(getItems(el).map(i => i.selected)).toEqual([false, false, true]);
    });

    it('should update item selection when value changes programmatically', async () => {
      const el = await createMenu(single);

      el.value = 'b';
      await settle(el);

      expect(getItems(el).map(i => i.selected)).toEqual([false, true, false]);
    });

    it('should show the selected item label in the trigger', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="single" value="b">${items}</forge-ai-dropdown-menu>`);
      await settle(el);

      expect(getTrigger(el).textContent).toContain('Bravo');
      expect(getTrigger(el).textContent).not.toContain('Choose...');
    });

    it('should show the default trigger text when value matches no item', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="single" value="zzz">${items}</forge-ai-dropdown-menu>`);
      await settle(el);

      expect(getTrigger(el).textContent).toContain('Choose...');
    });

    it('should use menuitemradio role and aria-selected on items', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="single" value="a">${items}</forge-ai-dropdown-menu>`);
      await settle(el);
      const [a, b] = getItems(el);

      expect(a.getAttribute('role')).toBe('menuitemradio');
      expect(a.getAttribute('aria-selected')).toBe('true');
      expect(b.getAttribute('aria-selected')).toBe('false');
    });
  });

  describe('multi selection', () => {
    const multi = html`<forge-ai-dropdown-menu selection-mode="multi">${items}</forge-ai-dropdown-menu>`;

    it('should add items and dispatch multi detail with addedItems', async () => {
      const el = await createMenu(multi);
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      getItems(el)[0].click();
      await settle(el);

      expect(events[0].detail).toMatchObject({ selectionMode: 'multi', value: ['a'] });
      const detail = events[0].detail as { addedItems?: unknown[]; removedItems?: unknown[]; selectedItem: unknown[] };
      expect(detail.addedItems).toEqual([getItems(el)[0]]);
      expect(detail.removedItems).toBeUndefined();
      expect(detail.selectedItem).toEqual([getItems(el)[0]]);
    });

    it('should keep the menu open after selecting', async () => {
      const el = await createMenu(multi);
      await openMenu(el);

      getItems(el)[0].click();
      await settle(el);

      expect(el.open).toBe(true);
    });

    it('should accumulate selections and sync value', async () => {
      const el = await createMenu(multi);
      await openMenu(el);

      getItems(el)[0].click();
      getItems(el)[2].click();
      await settle(el);

      expect(el.value).toEqual(['a', 'c']);
      expect(getItems(el).map(i => i.selected)).toEqual([true, false, true]);
    });

    it('should remove a selected item and report removedItems', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="multi" .value=${['a', 'b']}>${items}</forge-ai-dropdown-menu>`);
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      getItems(el)[0].click();
      await settle(el);

      const detail = events[0].detail as { value: string[]; addedItems?: unknown[]; removedItems?: unknown[] };
      expect(detail.value).toEqual(['b']);
      expect(detail.removedItems).toEqual([getItems(el)[0]]);
      expect(detail.addedItems).toBeUndefined();
      expect(el.value).toEqual(['b']);
    });

    it('should show a singular count in the trigger for one selection', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="multi" .value=${['a']}>${items}</forge-ai-dropdown-menu>`);
      await settle(el);

      expect(getTrigger(el).textContent).toContain('1 option selected');
    });

    it('should show a plural count in the trigger for several selections', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="multi" .value=${['a', 'b']}>${items}</forge-ai-dropdown-menu>`);
      await settle(el);

      expect(getTrigger(el).textContent).toContain('2 options selected');
    });

    it('should use menuitemcheckbox role and aria-checked on items', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="multi" .value=${['a']}>${items}</forge-ai-dropdown-menu>`);
      await settle(el);
      const [a, b] = getItems(el);

      expect(a.getAttribute('role')).toBe('menuitemcheckbox');
      expect(a.getAttribute('aria-checked')).toBe('true');
      expect(b.getAttribute('aria-checked')).toBe('false');
    });

    it('should use selected-text slot content override when provided', async () => {
      const el = await createMenu(html`
        <forge-ai-dropdown-menu selection-mode="multi" .value=${['a']}>
          <span slot="selected-text">Custom text</span>
          ${items}
        </forge-ai-dropdown-menu>
      `);
      await settle(el);
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="selected-text"]')!;

      expect(slot.assignedNodes()[0].textContent).toBe('Custom text');
    });
  });

  describe('item groups', () => {
    it('should select items nested inside item groups', async () => {
      const el = await createMenu(html`
        <forge-ai-dropdown-menu>
          <forge-ai-dropdown-menu-item-group>
            <span slot="label">Group</span>
            <forge-ai-dropdown-menu-item value="g1">One</forge-ai-dropdown-menu-item>
            <forge-ai-dropdown-menu-item value="g2">Two</forge-ai-dropdown-menu-item>
          </forge-ai-dropdown-menu-item-group>
        </forge-ai-dropdown-menu>
      `);
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      el.querySelectorAll('forge-ai-dropdown-menu-item')[1].click();
      await settle(el);

      expect(events).toHaveLength(1);
      expect(events[0].detail.value).toBe('g2');
    });

    it('should navigate across items inside groups with the keyboard', async () => {
      const el = await createMenu(html`
        <forge-ai-dropdown-menu>
          <forge-ai-dropdown-menu-item value="x">Top</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-item-group>
            <forge-ai-dropdown-menu-item value="g1">One</forge-ai-dropdown-menu-item>
          </forge-ai-dropdown-menu-item-group>
        </forge-ai-dropdown-menu>
      `);
      getTrigger(el).focus();
      await userEvent.keyboard('{Enter}');
      await settle(el);

      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowDown}');

      expect(document.activeElement).toBe(el.querySelectorAll('forge-ai-dropdown-menu-item')[1]);
    });
  });

  describe('nested content click handling', () => {
    it('should ignore clicks that are not on a menu item', async () => {
      const el = await createMenu(html`
        <forge-ai-dropdown-menu>
          <div slot="header" id="hdr">Header</div>
          ${items}
        </forge-ai-dropdown-menu>
      `);
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      el.querySelector<HTMLElement>('#hdr')!.click();
      await settle(el);

      expect(events).toHaveLength(0);
    });

    it('should ignore clicks on separators', async () => {
      const el = await createMenu(html`
        <forge-ai-dropdown-menu>
          <forge-ai-dropdown-menu-item value="a">A</forge-ai-dropdown-menu-item>
          <forge-ai-dropdown-menu-separator></forge-ai-dropdown-menu-separator>
        </forge-ai-dropdown-menu>
      `);
      await openMenu(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      el.querySelector<HTMLElement>('forge-ai-dropdown-menu-separator')!.click();
      await settle(el);

      expect(events).toHaveLength(0);
    });
  });

  describe('submenu', () => {
    const submenuTemplate = (trigger: string = 'click'): ReturnType<typeof html> => html`
      <forge-ai-dropdown-menu>
        <forge-ai-dropdown-menu-item value="parent" submenu-trigger=${trigger}>
          Parent
          <forge-ai-dropdown-menu slot="submenu">
            <forge-ai-dropdown-menu-item value="child1">Child 1</forge-ai-dropdown-menu-item>
            <forge-ai-dropdown-menu-item value="child2">Child 2</forge-ai-dropdown-menu-item>
          </forge-ai-dropdown-menu>
        </forge-ai-dropdown-menu-item>
      </forge-ai-dropdown-menu>
    `;

    it('should mark a nested menu as a submenu without rendering a trigger', async () => {
      const el = await createMenu(submenuTemplate());
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      await sub.updateComplete;

      expect(sub.getAttribute('data-submenu')).toBe('true');
      expect(sub.shadowRoot!.querySelector('#dropdown-trigger')).toBeNull();
      expect(el.hasAttribute('data-submenu')).toBe(false);
    });

    it('should use right-start placement for submenus', async () => {
      const el = await createMenu(submenuTemplate());
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      await sub.updateComplete;

      expect(sub.shadowRoot!.querySelector('forge-ai-popover')!.placement).toBe('right-start');
    });

    it('should anchor a submenu popover to its parent item', async () => {
      const el = await createMenu(submenuTemplate());
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      await sub.updateComplete;

      expect(sub.shadowRoot!.querySelector('forge-ai-popover')!.anchor).toBe(el.querySelector('forge-ai-dropdown-menu-item'));
    });

    it('should dispatch the submenu child selection from the submenu', async () => {
      const el = await createMenu(submenuTemplate());
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      await openMenu(el);
      sub.open = true;
      await settle(sub);
      const subEvents = collect(sub, 'forge-ai-dropdown-menu-change');

      sub.querySelectorAll('forge-ai-dropdown-menu-item')[0].click();
      await settle(sub);

      expect(subEvents.map(e => e.detail.value)).toContain('child1');
      expect(sub.open).toBe(false);
      expect(el.open).toBe(false);
    });
  });

  describe('keyboard navigation', () => {
    async function openWithKeyboard(el: ForgeAiDropdownMenuComponent): Promise<void> {
      getTrigger(el).focus();
      await userEvent.keyboard('{Enter}');
      await settle(el);
      await userEvent.keyboard('{ArrowDown}');
    }

    it('should open and focus the first item when ArrowDown is pressed on the trigger', async () => {
      const el = await createMenu();
      getTrigger(el).focus();

      await userEvent.keyboard('{ArrowDown}');
      await settle(el);

      expect(el.open).toBe(true);
      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should focus the first item when ArrowDown is pressed after opening with Enter', async () => {
      const el = await createMenu();

      await openWithKeyboard(el);

      expect(el.open).toBe(true);
      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should open the menu when Enter is pressed on the trigger', async () => {
      const el = await createMenu();
      getTrigger(el).focus();

      await userEvent.keyboard('{Enter}');
      await settle(el);

      expect(el.open).toBe(true);
    });

    it('should open the menu when Space is pressed on the trigger', async () => {
      const el = await createMenu();
      getTrigger(el).focus();

      await userEvent.keyboard(' ');
      await settle(el);

      expect(el.open).toBe(true);
    });

    it('should not focus any item when opened with the pointer', async () => {
      const el = await createMenu();

      getTrigger(el).click();
      await settle(el);

      expect(getItems(el).every(i => i.getAttribute('tabindex') === '-1')).toBe(true);
    });

    it('should move focus down through items', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);

      await userEvent.keyboard('{ArrowDown}');

      expect(document.activeElement).toBe(getItems(el)[1]);
      expect(getItems(el)[1].getAttribute('tabindex')).toBe('0');
      expect(getItems(el)[0].getAttribute('tabindex')).toBe('-1');
    });

    it('should wrap from the last item to the first when ArrowDown is pressed', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      expect(document.activeElement).toBe(getItems(el)[2]);

      await userEvent.keyboard('{ArrowDown}');

      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should move focus up through items', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');

      await userEvent.keyboard('{ArrowUp}');

      expect(document.activeElement).toBe(getItems(el)[1]);
    });

    it('should wrap from the first item to the last when ArrowUp is pressed', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);

      await userEvent.keyboard('{ArrowUp}');

      expect(document.activeElement).toBe(getItems(el)[2]);
    });

    it('should focus the last item when ArrowUp is pressed with no current focus', async () => {
      const el = await createMenu();
      await userEvent.click(getTrigger(el));
      await settle(el);

      await userEvent.keyboard('{ArrowUp}');

      expect(document.activeElement).toBe(getItems(el)[2]);
    });

    it('should focus the first item when ArrowDown is pressed with no current focus', async () => {
      const el = await createMenu();
      await userEvent.click(getTrigger(el));
      await settle(el);

      await userEvent.keyboard('{ArrowDown}');

      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should focus the last item on End', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);

      await userEvent.keyboard('{End}');

      expect(document.activeElement).toBe(getItems(el)[2]);
    });

    it('should focus the first item on Home', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);
      await userEvent.keyboard('{End}');

      await userEvent.keyboard('{Home}');

      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should select the focused item on Enter', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);
      await userEvent.keyboard('{ArrowDown}');
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      await userEvent.keyboard('{Enter}');
      await settle(el);

      expect(events).toHaveLength(1);
      expect(events[0].detail.value).toBe('b');
      expect(el.open).toBe(false);
    });

    it('should select the focused item on Space', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      await userEvent.keyboard(' ');
      await settle(el);

      expect(events).toHaveLength(1);
      expect(events[0].detail.value).toBe('a');
    });

    it('should close the menu and return focus to the trigger on Escape', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);

      await userEvent.keyboard('{Escape}');
      await settle(el);

      expect(el.open).toBe(false);
      expect(el.shadowRoot!.activeElement).toBe(getTrigger(el));
    });

    it('should toggle multi selection with Enter without closing', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu selection-mode="multi">${items}</forge-ai-dropdown-menu>`);
      await openWithKeyboard(el);

      await userEvent.keyboard('{Enter}');
      await settle(el);

      expect(el.value).toEqual(['a']);
      expect(el.open).toBe(true);
    });

    it('should do nothing for navigation keys when the menu is closed and focus is not on the trigger', async () => {
      const el = await createMenu();
      const item = getItems(el)[0];
      item.focus();

      item.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true }));
      await settle(el);

      expect(el.open).toBe(false);
    });

    it('should ignore keyboard input while disabled', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu disabled>${items}</forge-ai-dropdown-menu>`);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
      await settle(el);

      expect(el.open).toBe(false);
    });

    it('should not open on Enter pressed on an item while closed', async () => {
      const el = await createMenu();
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      getItems(el)[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
      await settle(el);

      expect(events).toHaveLength(0);
    });

    it('should not select when Enter is pressed with no item focused', async () => {
      const el = await createMenu();
      getTrigger(el).click();
      await settle(el);
      const events = collect(el, 'forge-ai-dropdown-menu-change');

      getContent(el).dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
      await settle(el);

      expect(events).toHaveLength(0);
    });

    it('should ignore unrelated keys', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);

      await userEvent.keyboard('x');

      expect(el.open).toBe(true);
      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should handle an empty menu without error', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu></forge-ai-dropdown-menu>`);
      getTrigger(el).click();
      await settle(el);

      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{End}');

      expect(el.open).toBe(true);
    });

    it('should keep the menu open and focus unchanged when ArrowRight is pressed on an item without a submenu', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);

      await userEvent.keyboard('{ArrowRight}');

      expect(el.open).toBe(true);
      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should ignore ArrowLeft on a root menu', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);

      await userEvent.keyboard('{ArrowLeft}');

      expect(el.open).toBe(true);
      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should handle Home and End on an empty open menu without error', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu></forge-ai-dropdown-menu>`);
      await userEvent.click(getTrigger(el));
      await settle(el);

      await userEvent.keyboard('{Home}{End}{ArrowUp}');

      expect(el.open).toBe(true);
    });

    it('should focus the first item via focusFirstItem', async () => {
      const el = await createMenu();
      await openMenu(el);

      el.focusFirstItem();

      expect(document.activeElement).toBe(getItems(el)[0]);
    });

    it('should do nothing from focusFirstItem when there are no items', async () => {
      const el = await createMenu(html`<forge-ai-dropdown-menu></forge-ai-dropdown-menu>`);
      await openMenu(el);

      expect(() => el.focusFirstItem()).not.toThrow();
    });

    it('should reset focus state each time the menu opens', async () => {
      const el = await createMenu();
      await openWithKeyboard(el);
      await userEvent.keyboard('{ArrowDown}{ArrowDown}');
      await userEvent.keyboard('{Escape}');
      await settle(el);

      getTrigger(el).click();
      await settle(el);
      await userEvent.keyboard('{ArrowDown}');

      expect(document.activeElement).toBe(getItems(el)[0]);
    });
  });

  describe('submenu keyboard navigation', () => {
    const nested = html`
      <forge-ai-dropdown-menu>
        <forge-ai-dropdown-menu-item value="parent">
          Parent
          <forge-ai-dropdown-menu>
            <forge-ai-dropdown-menu-item value="child1">Child 1</forge-ai-dropdown-menu-item>
            <forge-ai-dropdown-menu-item value="child2">Child 2</forge-ai-dropdown-menu-item>
          </forge-ai-dropdown-menu>
        </forge-ai-dropdown-menu-item>
        <forge-ai-dropdown-menu-item value="other">Other</forge-ai-dropdown-menu-item>
      </forge-ai-dropdown-menu>
    `;

    it('should open the submenu and focus its first item on ArrowRight', async () => {
      const el = await createMenu(nested);
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      const parentItem = el.querySelector<ForgeAiDropdownMenuItemComponent>('forge-ai-dropdown-menu-item')!;
      getTrigger(el).focus();
      await userEvent.keyboard('{Enter}');
      await settle(el);
      await userEvent.keyboard('{ArrowDown}');

      await userEvent.keyboard('{ArrowRight}');
      await settle(parentItem);
      await settle(sub);

      expect(sub.open).toBe(true);
      expect(document.activeElement).toBe(sub.querySelector('forge-ai-dropdown-menu-item'));
    });

    it('should navigate within the submenu without moving the parent selection', async () => {
      const el = await createMenu(nested);
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      const parentItem = el.querySelector<ForgeAiDropdownMenuItemComponent>('forge-ai-dropdown-menu-item')!;
      getTrigger(el).focus();
      await userEvent.keyboard('{Enter}');
      await settle(el);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowRight}');
      await settle(parentItem);
      await settle(sub);

      await userEvent.keyboard('{ArrowDown}');

      expect(document.activeElement).toBe(sub.querySelectorAll('forge-ai-dropdown-menu-item')[1]);
    });

    it('should close the submenu and return focus to the parent item on ArrowLeft', async () => {
      const el = await createMenu(nested);
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      const parentItem = el.querySelector<ForgeAiDropdownMenuItemComponent>('forge-ai-dropdown-menu-item')!;
      getTrigger(el).focus();
      await userEvent.keyboard('{Enter}');
      await settle(el);
      await userEvent.keyboard('{ArrowDown}');
      await userEvent.keyboard('{ArrowRight}');
      await settle(parentItem);
      await settle(sub);

      await userEvent.keyboard('{ArrowLeft}');
      await settle(parentItem);
      await settle(sub);

      expect(sub.open).toBe(false);
      expect(document.activeElement).toBe(el.querySelector('forge-ai-dropdown-menu-item'));
      expect(el.open).toBe(true);
    });
  });

  describe('submenu close propagation', () => {
    it('should keep the root menu open when a submenu closes', async () => {
      const el = await createMenu(html`
        <forge-ai-dropdown-menu>
          <forge-ai-dropdown-menu-item value="parent">
            Parent
            <forge-ai-dropdown-menu>
              <forge-ai-dropdown-menu-item value="child">Child</forge-ai-dropdown-menu-item>
            </forge-ai-dropdown-menu>
          </forge-ai-dropdown-menu-item>
        </forge-ai-dropdown-menu>
      `);
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      await openMenu(el);
      sub.open = true;
      await settle(sub);

      sub.open = false;
      await settle(sub);
      await settle(el);

      expect(el.open).toBe(true);
    });
  });
});
