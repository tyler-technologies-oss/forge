import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { getShadowElement } from '@tylertech/forge-core';
import { playStateLayerAnimation, toggleFocusIndicator } from '../../constants.js';
import { ListboxComponent } from '../../listbox/listbox.js';
import { OptionComponent } from './option.js';

import './option.js';
import '../../listbox/listbox.js';

async function createStandaloneFixture(template = html`<forge-option value="1">Option</forge-option>`): Promise<OptionComponent> {
  const screen = render(template);
  const option = screen.container.querySelector('forge-option') as OptionComponent;
  await option.updateComplete;
  return option;
}

async function createListboxFixture(
  template = html`
    <forge-listbox>
      <forge-option value="1">Option 1</forge-option>
    </forge-listbox>
  `
): Promise<{ listbox: ListboxComponent; option: OptionComponent }> {
  const screen = render(template);
  const listbox = screen.container.querySelector('forge-listbox') as ListboxComponent;
  await listbox.updateComplete;
  const option = listbox.querySelector('forge-option') as OptionComponent;
  await option.updateComplete;
  return { listbox, option };
}

describe('Option', () => {
  it('should render with correct default values', async () => {
    const option = await createStandaloneFixture();
    expect(option.value).toBe('1');
    expect(option.selected).toBe(false);
    expect(option.disabled).toBe(false);
    expect(option.divider).toBe(false);
    expect(option.optionClass).toEqual([]);
  });

  describe('config-only mode (standalone)', () => {
    it('should render in light DOM without a shadow root', async () => {
      const option = await createStandaloneFixture();
      expect(option.shadowRoot).toBeNull();
    });

    it('should not throw when connected outside of a listbox', async () => {
      const option = await createStandaloneFixture(html`<forge-option value="1" disabled selected>Option</forge-option>`);
      expect(option.value).toBe('1');
      expect(option.disabled).toBe(true);
      expect(option.selected).toBe(true);
    });
  });

  describe('shadow DOM mode (within a listbox)', () => {
    it('should render a shadow root', async () => {
      const { option } = await createListboxFixture();
      expect(option.shadowRoot).not.toBeNull();
    });

    it('should set role to option', async () => {
      const { option } = await createListboxFixture();
      expect(option.getAttribute('role')).toBe('option');
    });

    it('should render a state layer and focus indicator', async () => {
      const { option } = await createListboxFixture();
      expect(getShadowElement(option, 'forge-state-layer')).toBeTruthy();
      expect(getShadowElement(option, 'forge-focus-indicator')).toBeTruthy();
    });

    it('should not render a state layer when disabled', async () => {
      const { option } = await createListboxFixture(html`
        <forge-listbox>
          <forge-option value="1" disabled>Option 1</forge-option>
        </forge-listbox>
      `);
      expect(option.shadowRoot?.querySelector('forge-state-layer')).toBeNull();
    });

    it('should apply disabled and selected classes', async () => {
      const { listbox, option } = await createListboxFixture();
      const root = option.shadowRoot!.querySelector('.forge-option') as HTMLElement;
      expect(root.classList.contains('disabled')).toBe(false);
      expect(root.classList.contains('selected')).toBe(false);

      option.disabled = true;
      listbox.value = '1';
      await listbox.updateComplete;
      await option.updateComplete;

      expect(root.classList.contains('disabled')).toBe(true);
      expect(root.classList.contains('selected')).toBe(true);
    });

    describe('single-select mode', () => {
      it('should set aria-selected and render a checkmark when selected', async () => {
        const { option } = await createListboxFixture(html`
          <forge-listbox>
            <forge-option value="1" selected>Option 1</forge-option>
          </forge-listbox>
        `);
        expect(option.getAttribute('aria-selected')).toBe('true');
        expect(option.getAttribute('aria-checked')).toBeNullable();
        expect(option.shadowRoot?.querySelector('.checkmark')).toBeTruthy();
      });

      it('should not render a checkmark or checkbox when not selected', async () => {
        const { option } = await createListboxFixture();
        expect(option.getAttribute('aria-selected')).toBeNullable();
        expect(option.shadowRoot?.querySelector('.checkmark')).toBeNull();
        expect(option.shadowRoot?.querySelector('.checkbox')).toBeNull();
      });
    });

    describe('multi-select mode', () => {
      it('should set aria-checked and render a checked checkbox when selected', async () => {
        const { option } = await createListboxFixture(html`
          <forge-listbox multiple>
            <forge-option value="1" selected>Option 1</forge-option>
          </forge-listbox>
        `);
        expect(option.getAttribute('aria-checked')).toBe('true');
        expect(option.getAttribute('aria-selected')).toBeNullable();
        const checkbox = option.shadowRoot?.querySelector('.checkbox');
        expect(checkbox?.getAttribute('name')).toBe('check_box');
      });

      it('should render an unchecked checkbox when not selected', async () => {
        const { option } = await createListboxFixture(html`
          <forge-listbox multiple>
            <forge-option value="1">Option 1</forge-option>
          </forge-listbox>
        `);
        const checkbox = option.shadowRoot?.querySelector('.checkbox');
        expect(checkbox?.getAttribute('name')).toBe('check_box_outline_blank');
      });

      it('should not render a checkmark', async () => {
        const { option } = await createListboxFixture(html`
          <forge-listbox multiple>
            <forge-option value="1" selected>Option 1</forge-option>
          </forge-listbox>
        `);
        expect(option.shadowRoot?.querySelector('.checkmark')).toBeNull();
      });
    });

    describe('drag handle', () => {
      it('should not render a drag handle by default', async () => {
        const { option } = await createListboxFixture();
        expect(option.shadowRoot?.querySelector('.drag-handle')).toBeNull();
      });

      it('should render a reorder drag handle when the listbox is reorderable', async () => {
        const { option } = await createListboxFixture(html`
          <forge-listbox reorderable>
            <forge-option value="1">Option 1</forge-option>
          </forge-listbox>
        `);
        const handle = option.shadowRoot?.querySelector('.drag-handle');
        expect(handle?.getAttribute('name')).toBe('drag_horizontal');
        expect(handle?.getAttribute('draggable')).toBe('true');
      });

      it('should render a drag-out handle when the listbox allows drag out', async () => {
        const { option } = await createListboxFixture(html`
          <forge-listbox allow-drag-out>
            <forge-option value="1">Option 1</forge-option>
          </forge-listbox>
        `);
        const handle = option.shadowRoot?.querySelector('.drag-handle');
        expect(handle?.getAttribute('name')).toBe('drag');
      });
    });

    describe('disabled context', () => {
      it('should be disabled when the parent listbox is disabled at connection time', async () => {
        const { option } = await createListboxFixture(html`
          <forge-listbox disabled>
            <forge-option value="1">Option 1</forge-option>
          </forge-listbox>
        `);
        expect(option.disabled).toBe(true);
        expect(option.hasAttribute('disabled')).toBe(true);
      });

      it('should remain disabled locally even if not otherwise disabled by context', async () => {
        const { option } = await createListboxFixture(html`
          <forge-listbox>
            <forge-option value="1" disabled>Option 1</forge-option>
          </forge-listbox>
        `);
        expect(option.disabled).toBe(true);
      });
    });
  });

  describe('events', () => {
    it('should dispatch forge-option-update with reason "added" when connected', async () => {
      const screen = render(html`<div></div>`);
      const container = screen.container.querySelector('div') as HTMLElement;
      const updateSpy = vi.fn();
      container.addEventListener('forge-option-update', updateSpy);

      const option = document.createElement('forge-option') as OptionComponent;
      option.value = '1';
      container.appendChild(option);

      expect(updateSpy).toHaveBeenCalledOnce();
      expect(updateSpy.mock.calls[0][0].detail).toEqual({ reason: 'added' });
    });

    it('should dispatch forge-option-update with reason "selected"/"deselected" when selected changes', async () => {
      const option = await createStandaloneFixture();
      const updateSpy = vi.fn();
      option.addEventListener('forge-option-update', updateSpy);

      option.selected = true;
      await option.updateComplete;
      expect(updateSpy.mock.calls.at(-1)?.[0].detail).toEqual({ reason: 'selected' });

      option.selected = false;
      await option.updateComplete;
      expect(updateSpy.mock.calls.at(-1)?.[0].detail).toEqual({ reason: 'deselected' });
    });

    it('should dispatch forge-option-value-change when value changes', async () => {
      const option = await createStandaloneFixture();
      const changeSpy = vi.fn();
      option.addEventListener('forge-option-value-change', changeSpy);

      option.value = '2';

      expect(changeSpy).toHaveBeenCalledOnce();
      expect(changeSpy.mock.calls[0][0].detail).toBe('2');
    });

    it('should not dispatch forge-option-value-change when value is set to the same value', async () => {
      const option = await createStandaloneFixture();
      const changeSpy = vi.fn();
      option.addEventListener('forge-option-value-change', changeSpy);

      option.value = '1';

      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe('imperative API', () => {
    it('should toggle the focus indicator via the toggleFocusIndicator symbol', async () => {
      const { option } = await createListboxFixture();
      const focusIndicator = getShadowElement(option, 'forge-focus-indicator') as HTMLElement & { active: boolean };

      option[toggleFocusIndicator](true);
      await option.updateComplete;
      expect(focusIndicator.active).toBe(true);

      option[toggleFocusIndicator](false);
      await option.updateComplete;
      expect(focusIndicator.active).toBe(false);

      option[toggleFocusIndicator]();
      await option.updateComplete;
      expect(focusIndicator.active).toBe(true);
    });

    it('should play the state layer animation via the playStateLayerAnimation symbol', async () => {
      const { option } = await createListboxFixture();
      const stateLayer = getShadowElement(option, 'forge-state-layer') as HTMLElement & { playAnimation: () => void };
      const playSpy = vi.spyOn(stateLayer, 'playAnimation');

      option[playStateLayerAnimation]();

      expect(playSpy).toHaveBeenCalledOnce();
    });
  });

  describe('configuration properties', () => {
    it('should accept a label and secondary label', async () => {
      const option = await createStandaloneFixture(html`<forge-option value="1" label="Primary" secondary-label="Secondary"></forge-option>`);
      expect(option.label).toBe('Primary');
      expect(option.secondaryLabel).toBe('Secondary');
    });

    it('should accept a divider flag', async () => {
      const option = await createStandaloneFixture(html`<forge-option value="1" divider></forge-option>`);
      expect(option.divider).toBe(true);
    });

    it('should parse option-class attribute into an array and reflect array values back to the attribute', async () => {
      const option = await createStandaloneFixture(html`<forge-option value="1" option-class="foo bar"></forge-option>`);
      expect(option.optionClass).toEqual(['foo', 'bar']);

      option.optionClass = ['baz', 'qux'];
      await option.updateComplete;
      expect(option.getAttribute('option-class')).toBe('baz qux');
    });

    it('should accept leading/trailing icon configuration', async () => {
      const option = await createStandaloneFixture(html`
        <forge-option value="1" leading-icon="home" leading-icon-class="lead" trailing-icon="settings" trailing-icon-class="trail"></forge-option>
      `);
      expect(option.leadingIcon).toBe('home');
      expect(option.leadingIconClass).toBe('lead');
      expect(option.trailingIcon).toBe('settings');
      expect(option.trailingIconClass).toBe('trail');
    });

    it('should accept builder functions and tooltip config programmatically', async () => {
      const option = await createStandaloneFixture();
      const leadingBuilder = (): HTMLElement => document.createElement('span');
      const trailingBuilder = (): HTMLElement => document.createElement('span');
      const tooltip = { text: 'Tooltip text' };

      option.leadingBuilder = leadingBuilder;
      option.trailingBuilder = trailingBuilder;
      option.tooltip = tooltip;

      expect(option.leadingBuilder).toBe(leadingBuilder);
      expect(option.trailingBuilder).toBe(trailingBuilder);
      expect(option.tooltip).toBe(tooltip);
    });
  });
});
