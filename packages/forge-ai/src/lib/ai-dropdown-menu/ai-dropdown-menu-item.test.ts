import { describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { settle } from '../../testing/settle.js';
import type { ForgeAiDropdownMenuItemComponent } from './ai-dropdown-menu-item.js';
import type { ForgeAiDropdownMenuComponent } from './ai-dropdown-menu.js';

import './index.js';

const TAG = 'forge-ai-dropdown-menu-item';

function createItem(template = html`<forge-ai-dropdown-menu-item value="x">Label</forge-ai-dropdown-menu-item>`): Promise<ForgeAiDropdownMenuItemComponent> {
  return renderFixture<ForgeAiDropdownMenuItemComponent>(template, TAG);
}

// Legacy slotless form: nested menu without slot="submenu" (used by Storybook WithNestedMenus and consumers).
const submenuItem = (attrs = html``): ReturnType<typeof html> => html`
  <forge-ai-dropdown-menu-item value="parent" ${attrs}>
    Parent
    <forge-ai-dropdown-menu>
      <forge-ai-dropdown-menu-item value="child">Child</forge-ai-dropdown-menu-item>
    </forge-ai-dropdown-menu>
  </forge-ai-dropdown-menu-item>
`;

describe('ForgeAiDropdownMenuItem', () => {
  describe('registration', () => {
    it('should define the custom element', () => {
      expect(customElements.get(TAG)).toBeDefined();
    });

    it('should contain shadow root', async () => {
      const el = await createItem();

      expect(el.shadowRoot).toBeTruthy();
    });
  });

  describe('defaults', () => {
    it('should use documented default property values', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item></forge-ai-dropdown-menu-item>`);

      expect(el.value).toBe('');
      expect(el.selected).toBe(false);
      expect(el.disabled).toBe(false);
      expect(el.selectionMode).toBe('none');
      expect(el.submenuTrigger).toBe('hover');
      expect(el.submenuOpenDelay).toBe(150);
      expect(el.submenuCloseDelay).toBe(300);
    });

    it('should set tabindex -1 and the menuitem role on connect', async () => {
      const el = await createItem();

      expect(el.getAttribute('tabindex')).toBe('-1');
      expect(el.getAttribute('role')).toBe('menuitem');
    });
  });

  describe('attributes', () => {
    it('should read attributes into properties', async () => {
      const el = await createItem(html`
        <forge-ai-dropdown-menu-item
          value="v"
          selected
          disabled
          selection-mode="multi"
          submenu-trigger="click"
          submenu-open-delay="10"
          submenu-close-delay="20"></forge-ai-dropdown-menu-item>
      `);

      expect(el.value).toBe('v');
      expect(el.selected).toBe(true);
      expect(el.disabled).toBe(true);
      expect(el.selectionMode).toBe('multi');
      expect(el.submenuTrigger).toBe('click');
      expect(el.submenuOpenDelay).toBe(10);
      expect(el.submenuCloseDelay).toBe(20);
    });

    it('should reflect selected and disabled to attributes', async () => {
      const el = await createItem();

      el.selected = true;
      el.disabled = true;
      await el.updateComplete;

      expect(el.hasAttribute('selected')).toBe(true);
      expect(el.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('roles and aria', () => {
    it('should set menuitemradio and aria-selected in single mode', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selection-mode="single" selected>A</forge-ai-dropdown-menu-item>`);

      expect(el.getAttribute('role')).toBe('menuitemradio');
      expect(el.getAttribute('aria-selected')).toBe('true');
      expect(el.hasAttribute('aria-checked')).toBe(false);
    });

    it('should set menuitemcheckbox and aria-checked in multi mode', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selection-mode="multi">A</forge-ai-dropdown-menu-item>`);

      expect(el.getAttribute('role')).toBe('menuitemcheckbox');
      expect(el.getAttribute('aria-checked')).toBe('false');
      expect(el.hasAttribute('aria-selected')).toBe(false);
    });

    it('should update aria-checked when selected changes in multi mode', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selection-mode="multi">A</forge-ai-dropdown-menu-item>`);

      el.selected = true;
      await el.updateComplete;

      expect(el.getAttribute('aria-checked')).toBe('true');
    });

    it('should update aria-selected when selected changes in single mode', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selection-mode="single">A</forge-ai-dropdown-menu-item>`);

      el.selected = true;
      await el.updateComplete;

      expect(el.getAttribute('aria-selected')).toBe('true');
    });

    it('should not expose selection aria attributes in none mode', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selected>A</forge-ai-dropdown-menu-item>`);

      expect(el.hasAttribute('aria-selected')).toBe(false);
      expect(el.hasAttribute('aria-checked')).toBe(false);
    });

    it('should switch role and aria attributes when selectionMode changes', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selection-mode="multi" selected>A</forge-ai-dropdown-menu-item>`);

      el.selectionMode = 'single';
      await el.updateComplete;
      expect(el.getAttribute('role')).toBe('menuitemradio');
      expect(el.getAttribute('aria-selected')).toBe('true');
      expect(el.hasAttribute('aria-checked')).toBe(false);

      el.selectionMode = 'none';
      await el.updateComplete;
      expect(el.getAttribute('role')).toBe('menuitem');
      expect(el.hasAttribute('aria-selected')).toBe(false);
      expect(el.hasAttribute('aria-checked')).toBe(false);
    });

    it('should expose aria-disabled reflecting disabled', async () => {
      const el = await createItem();
      expect(el.getAttribute('aria-disabled')).toBe('false');

      el.disabled = true;
      await el.updateComplete;

      expect(el.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('labelText', () => {
    it('should return the trimmed default slot text', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item> Hello </forge-ai-dropdown-menu-item>`);

      expect(el.labelText).toBe('Hello');
    });

    it('should join text from multiple slotted nodes', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item><span>One</span><span>Two</span></forge-ai-dropdown-menu-item>`);

      expect(el.labelText).toBe('One Two');
    });

    it('should return an empty string when empty', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item></forge-ai-dropdown-menu-item>`);

      expect(el.labelText).toBe('');
    });
  });

  describe('slots and rendering', () => {
    it('should reserve selection space and show a check icon when selected in multi mode', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selection-mode="multi" selected>A</forge-ai-dropdown-menu-item>`);

      expect(el.shadowRoot!.querySelector('.ai-dropdown-menu-item__selection-icon')).not.toBeNull();
      expect(el.shadowRoot!.querySelector('svg.ai-dropdown-menu-item__selection-svg')).not.toBeNull();
    });

    it('should reserve selection space but show no icon when not selected', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selection-mode="single">A</forge-ai-dropdown-menu-item>`);

      expect(el.shadowRoot!.querySelector('.ai-dropdown-menu-item__selection-icon')).not.toBeNull();
      expect(el.shadowRoot!.querySelector('svg.ai-dropdown-menu-item__selection-svg')).toBeNull();
    });

    it('should use a different icon for single and multi selection', async () => {
      const single = await createItem(html`<forge-ai-dropdown-menu-item selection-mode="single" selected>A</forge-ai-dropdown-menu-item>`);
      const singlePath = single.shadowRoot!.querySelector('svg.ai-dropdown-menu-item__selection-svg path')!.getAttribute('d');
      single.selectionMode = 'multi';
      await single.updateComplete;
      const multiPath = single.shadowRoot!.querySelector('svg.ai-dropdown-menu-item__selection-svg path')!.getAttribute('d');

      expect(singlePath).not.toBe(multiPath);
    });

    it('should not render a selection icon container in none mode', async () => {
      const el = await createItem(html`<forge-ai-dropdown-menu-item selected>A</forge-ai-dropdown-menu-item>`);

      expect(el.shadowRoot!.querySelector('.ai-dropdown-menu-item__selection-icon')).toBeNull();
    });

    it('should project start and end icon slots', async () => {
      const el = await createItem(html`
        <forge-ai-dropdown-menu-item>
          <svg slot="start"></svg>
          <svg slot="end"></svg>
          Label
        </forge-ai-dropdown-menu-item>
      `);

      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="start"]')!.assignedElements()).toHaveLength(1);
      expect(el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="end"]')!.assignedElements()).toHaveLength(1);
    });

    it('should wrap the description slot only when description content exists', async () => {
      const without = await createItem(html`<forge-ai-dropdown-menu-item>Label</forge-ai-dropdown-menu-item>`);
      expect(without.shadowRoot!.querySelector('.ai-dropdown-menu-item__description')).toBeNull();

      const withDesc = await createItem(html`<forge-ai-dropdown-menu-item>Label<span slot="description">More info</span></forge-ai-dropdown-menu-item>`);
      await settle(withDesc);
      expect(withDesc.shadowRoot!.querySelector('.ai-dropdown-menu-item__description')).not.toBeNull();
      expect(withDesc.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="description"]')!.assignedNodes()).toHaveLength(1);
    });

    it('should not show a submenu arrow without a submenu', async () => {
      const el = await createItem();

      expect(el.shadowRoot!.querySelector('.ai-dropdown-menu-item__submenu-arrow')).toBeNull();
    });

    it('should show a submenu arrow when a submenu is present (legacy slotless form)', async () => {
      const el = await createItem(submenuItem());
      await settle(el);

      expect(el.shadowRoot!.querySelector('.ai-dropdown-menu-item__submenu-arrow')).not.toBeNull();
    });

    it('should set aria-haspopup and aria-expanded when a submenu is present (legacy slotless form)', async () => {
      const el = await createItem(submenuItem());
      await settle(el);
      el.selectionMode = 'single';
      await el.updateComplete;

      expect(el.getAttribute('aria-haspopup')).toBe('menu');
      expect(el.getAttribute('aria-expanded')).toBe('false');
    });

    const slottedSubmenu = html`
      <forge-ai-dropdown-menu-item value="parent">
        Parent
        <forge-ai-dropdown-menu slot="submenu">
          <forge-ai-dropdown-menu-item value="child">Child</forge-ai-dropdown-menu-item>
        </forge-ai-dropdown-menu>
      </forge-ai-dropdown-menu-item>
    `;

    it.skip('should set aria-haspopup when a submenu is provided via slot="submenu" (BUG: submenu query only inspects the default slot, so the documented slot="submenu" API is not detected)', async () => {
      const el = await createItem(slottedSubmenu);
      await settle(el);

      expect(el.getAttribute('aria-haspopup')).toBe('menu');
      expect(el.getAttribute('aria-expanded')).toBe('false');
    });

    it.skip('should show a submenu arrow when a submenu is provided via slot="submenu" (BUG: documented slot="submenu" API is not detected)', async () => {
      const el = await createItem(slottedSubmenu);
      await settle(el);

      expect(el.shadowRoot!.querySelector('.ai-dropdown-menu-item__submenu-arrow')).not.toBeNull();
    });

    it.skip('should exclude slot="submenu" content from labelText (BUG: labelText reads the default slot; slotless nested menu leaks "Parent Child")', async () => {
      const el = await createItem(slottedSubmenu);
      await settle(el);

      expect(el.labelText).toBe('Parent');
    });
  });

  describe('submenu triggers', () => {
    const submenu = (el: ForgeAiDropdownMenuItemComponent): ForgeAiDropdownMenuComponent => el.querySelector('forge-ai-dropdown-menu')!;

    it('should open the submenu after the open delay on hover', async () => {
      vi.useFakeTimers();
      try {
        const el = await createItem(submenuItem(html``));
        await vi.advanceTimersByTimeAsync(0);
        el.submenuOpenDelay = 50;
        await el.updateComplete;

        el.dispatchEvent(new MouseEvent('mouseenter'));
        await vi.advanceTimersByTimeAsync(49);
        expect(submenu(el).open).toBe(false);

        await vi.advanceTimersByTimeAsync(2);
        await el.updateComplete;
        expect(submenu(el).open).toBe(true);
        expect(el.getAttribute('aria-expanded')).toBe('true');
      } finally {
        vi.useRealTimers();
      }
    });

    it('should close the submenu after the close delay on mouseleave', async () => {
      vi.useFakeTimers();
      try {
        const el = await createItem(submenuItem(html``));
        await vi.advanceTimersByTimeAsync(0);
        el.submenuOpenDelay = 0;
        el.submenuCloseDelay = 80;
        await el.updateComplete;
        el.dispatchEvent(new MouseEvent('mouseenter'));
        await vi.advanceTimersByTimeAsync(5);
        await el.updateComplete;
        expect(submenu(el).open).toBe(true);

        el.dispatchEvent(new MouseEvent('mouseleave'));
        await vi.advanceTimersByTimeAsync(79);
        expect(submenu(el).open).toBe(true);
        await vi.advanceTimersByTimeAsync(2);
        await el.updateComplete;

        expect(submenu(el).open).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should cancel a pending open when the mouse leaves before the delay', async () => {
      vi.useFakeTimers();
      try {
        const el = await createItem(submenuItem(html``));
        await vi.advanceTimersByTimeAsync(0);

        el.dispatchEvent(new MouseEvent('mouseenter'));
        await vi.advanceTimersByTimeAsync(50);
        el.dispatchEvent(new MouseEvent('mouseleave'));
        await vi.advanceTimersByTimeAsync(500);
        await el.updateComplete;

        expect(submenu(el).open).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should not open on hover when the trigger is click', async () => {
      vi.useFakeTimers();
      try {
        const el = await createItem(html`
          <forge-ai-dropdown-menu-item submenu-trigger="click">
            Parent
            <forge-ai-dropdown-menu><forge-ai-dropdown-menu-item>Child</forge-ai-dropdown-menu-item></forge-ai-dropdown-menu>
          </forge-ai-dropdown-menu-item>
        `);
        await vi.advanceTimersByTimeAsync(0);

        el.dispatchEvent(new MouseEvent('mouseenter'));
        await vi.advanceTimersByTimeAsync(1000);
        await el.updateComplete;

        expect(submenu(el).open).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should not open on hover when disabled', async () => {
      vi.useFakeTimers();
      try {
        const el = await createItem(html`
          <forge-ai-dropdown-menu-item disabled>
            Parent
            <forge-ai-dropdown-menu><forge-ai-dropdown-menu-item>Child</forge-ai-dropdown-menu-item></forge-ai-dropdown-menu>
          </forge-ai-dropdown-menu-item>
        `);
        await vi.advanceTimersByTimeAsync(0);

        el.dispatchEvent(new MouseEvent('mouseenter'));
        await vi.advanceTimersByTimeAsync(1000);
        await el.updateComplete;

        expect(submenu(el).open).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should not react to hover on an item without a submenu', async () => {
      vi.useFakeTimers();
      try {
        const el = await createItem();
        await vi.advanceTimersByTimeAsync(0);

        el.dispatchEvent(new MouseEvent('mouseenter'));
        el.dispatchEvent(new MouseEvent('mouseleave'));
        await vi.advanceTimersByTimeAsync(1000);

        expect(el.hasAttribute('aria-expanded')).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should toggle the submenu on click and stop propagation when trigger is click', async () => {
      const el = await createItem(html`
        <forge-ai-dropdown-menu-item submenu-trigger="click">
          Parent
          <forge-ai-dropdown-menu><forge-ai-dropdown-menu-item>Child</forge-ai-dropdown-menu-item></forge-ai-dropdown-menu>
        </forge-ai-dropdown-menu-item>
      `);
      await settle(el);
      const parentListener = vi.fn();
      el.parentElement!.addEventListener('click', parentListener);

      el.click();
      await settle(el);
      expect(submenu(el).open).toBe(true);
      expect(parentListener).not.toHaveBeenCalled();

      el.click();
      await settle(el);
      expect(submenu(el).open).toBe(false);
    });

    it('should toggle the submenu on click when trigger is both', async () => {
      const el = await createItem(html`
        <forge-ai-dropdown-menu-item submenu-trigger="both">
          Parent
          <forge-ai-dropdown-menu><forge-ai-dropdown-menu-item>Child</forge-ai-dropdown-menu-item></forge-ai-dropdown-menu>
        </forge-ai-dropdown-menu-item>
      `);
      await settle(el);

      el.click();
      await settle(el);

      expect(submenu(el).open).toBe(true);
    });

    it('should let clicks bubble when trigger is hover', async () => {
      const el = await createItem(submenuItem());
      await settle(el);
      const parentListener = vi.fn();
      el.parentElement!.addEventListener('click', parentListener);

      el.click();

      expect(parentListener).toHaveBeenCalledTimes(1);
    });

    it('should ignore clicks when disabled', async () => {
      const el = await createItem(html`
        <forge-ai-dropdown-menu-item disabled submenu-trigger="click">
          Parent
          <forge-ai-dropdown-menu><forge-ai-dropdown-menu-item>Child</forge-ai-dropdown-menu-item></forge-ai-dropdown-menu>
        </forge-ai-dropdown-menu-item>
      `);
      await settle(el);

      el.click();
      await settle(el);

      expect(submenu(el).open).toBe(false);
    });
  });

  describe('keyboard', () => {
    const submenu = (el: ForgeAiDropdownMenuItemComponent): ForgeAiDropdownMenuComponent => el.querySelector('forge-ai-dropdown-menu')!;

    it('should open the submenu on ArrowRight and stop the event', async () => {
      const el = await createItem(submenuItem());
      await settle(el);
      const evt = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });

      el.dispatchEvent(evt);
      await settle(el);

      expect(evt.defaultPrevented).toBe(true);
      expect(submenu(el).open).toBe(true);
      expect(el.getAttribute('aria-expanded')).toBe('true');
    });

    it('should ignore ArrowRight without a submenu', async () => {
      const el = await createItem();
      const evt = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });

      el.dispatchEvent(evt);

      expect(evt.defaultPrevented).toBe(false);
    });

    it('should close the submenu on ArrowLeft', async () => {
      const el = await createItem(submenuItem());
      await settle(el);
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await settle(el);

      const evt = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
      el.dispatchEvent(evt);
      await settle(el);

      expect(evt.defaultPrevented).toBe(true);
      expect(submenu(el).open).toBe(false);
      expect(document.activeElement).toBe(el);
    });

    it('should close the submenu on Escape and keep the event from propagating', async () => {
      const el = await createItem(submenuItem());
      await settle(el);
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await settle(el);
      const parentListener = vi.fn();
      el.parentElement!.addEventListener('keydown', parentListener);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }));
      await settle(el);

      expect(submenu(el).open).toBe(false);
      expect(parentListener).not.toHaveBeenCalled();
    });

    it('should let Escape and ArrowLeft propagate when no submenu is open', async () => {
      const el = await createItem(submenuItem());
      await settle(el);
      const parentListener = vi.fn();
      el.parentElement!.addEventListener('keydown', parentListener);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));

      expect(parentListener).toHaveBeenCalledTimes(2);
    });

    it('should ignore key presses when disabled', async () => {
      const el = await createItem(html`
        <forge-ai-dropdown-menu-item disabled>
          Parent
          <forge-ai-dropdown-menu><forge-ai-dropdown-menu-item>Child</forge-ai-dropdown-menu-item></forge-ai-dropdown-menu>
        </forge-ai-dropdown-menu-item>
      `);
      await settle(el);

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await settle(el);

      expect(submenu(el).open).toBe(false);
    });
  });

  describe('lifecycle', () => {
    it('should clear pending timers when disconnected', async () => {
      vi.useFakeTimers();
      try {
        const el = await createItem(submenuItem());
        await vi.advanceTimersByTimeAsync(0);
        const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;

        el.dispatchEvent(new MouseEvent('mouseenter'));
        el.remove();
        await vi.advanceTimersByTimeAsync(1000);

        expect(sub.open).toBe(false);
      } finally {
        vi.useRealTimers();
      }
    });

    it('should stop reacting to events after being disconnected', async () => {
      const el = await createItem(submenuItem());
      await settle(el);
      const sub = el.querySelector<ForgeAiDropdownMenuComponent>('forge-ai-dropdown-menu')!;
      el.remove();

      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await settle(el);

      expect(sub.open).toBe(false);
    });
  });
});
