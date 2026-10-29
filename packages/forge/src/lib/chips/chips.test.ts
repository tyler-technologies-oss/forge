import { html } from 'lit';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { userEvent } from 'vitest/browser';
import { frame } from '../core/utils/utils.js';
import type { IFocusIndicatorComponent } from '../focus-indicator/index.js';
import type { IconButtonComponent } from '../icon-button/index.js';
import type { IStateLayerComponent } from '../state-layer/index.js';
import { CHIP_SET_CONSTANTS, defineChipSetComponent, type IChipSetComponent } from './chip-set/index.js';
import { CHIP_CONSTANTS, type IChipSelectEventData } from './chip/chip-constants.js';
import type { IChipComponent } from './chip/chip.js';

defineChipSetComponent();

describe('Chips', () => {
  describe('ChipSet', () => {
    it('should contain shadow root', async () => {
      const screen = render(html`<forge-chip-set></forge-chip-set>`);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      expect(el.shadowRoot).not.toBeNull();
    });

    it('should be accessible without chips', async () => {
      const screen = render(html`<forge-chip-set></forge-chip-set>`);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      await expect(el).toBeAccessible();
    });

    it('should be accessible with chips', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      await expect(el).toBeAccessible();
    });

    it('should be accessible with input chips', async () => {
      const screen = render(html`
        <forge-chip-set type="input">
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      await frame();
      await expect(el).toBeAccessible();
    });

    it('should have expected defaults', async () => {
      const screen = render(html`<forge-chip-set></forge-chip-set>`);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;

      expect(el.vertical).toBe(false);
      expect(el.type).toBe(CHIP_CONSTANTS.defaults.TYPE);
      expect(el.dense).toBe(false);
      expect(el.disabled).toBe(false);
      expect(el.invalid).toBe(false);
      expect(el.theme).toBe(CHIP_CONSTANTS.defaults.THEME);
    });

    it('should update set vertical attribute when setting property', async () => {
      const screen = render(html`<forge-chip-set></forge-chip-set>`);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      el.vertical = true;
      await el.updateComplete;

      expect(el.hasAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL)).toBe(true);
    });

    it('should update vertical property when removing attribute', async () => {
      const screen = render(html`<forge-chip-set vertical></forge-chip-set>`);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      el.removeAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL);
      await el.updateComplete;

      expect(el.vertical).toBe(false);
    });

    it('should apply type attribute to all child chips when set by default attribute', async () => {
      const screen = render(html`
        <forge-chip-set type="filter">
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;

      const chips = getChips(el);
      expect(chips.length).toBe(3);
      expect(chips.every(chip => chip.type === 'filter')).toBe(true);
    });

    it('should apply type attribute to all child chips when set by property', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);

      expect(chips.every(chip => chip.type === CHIP_CONSTANTS.defaults.TYPE)).toBe(true);

      el.type = 'filter';
      await el.updateComplete;

      expect(chips.every(chip => chip.type === 'filter')).toBe(true);
    });

    it('should apply dense attribute to all child chips when set by default attribute', async () => {
      const screen = render(html`
        <forge-chip-set dense>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);

      expect(chips.every(chip => chip.dense)).toBe(true);
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.DENSE))).toBe(true);
    });

    it('should apply disabled attribute to all child chips when set by default attribute', async () => {
      const screen = render(html`
        <forge-chip-set disabled>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);

      expect(chips.every(chip => chip.disabled)).toBe(true);
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED))).toBe(true);
    });

    it('should apply disabled attribute to all child chips when set by property', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);

      expect(chips.every(chip => chip.disabled)).toBe(false);
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED))).toBe(false);

      el.disabled = true;
      await el.updateComplete;

      expect(chips.every(chip => chip.disabled)).toBe(true);
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED))).toBe(true);
    });

    it('should apply invalid attribute to all child chips when set by default attribute', async () => {
      const screen = render(html`
        <forge-chip-set invalid>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);

      expect(chips.every(chip => chip.invalid)).toBe(true);
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.INVALID))).toBe(true);
    });

    it('should apply invalid attribute to all child chips when set by property', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);

      expect(chips.every(chip => chip.invalid)).toBe(false);
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.INVALID))).toBe(false);

      el.invalid = true;
      await el.updateComplete;

      expect(chips.every(chip => chip.invalid)).toBe(true);
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.INVALID))).toBe(true);
    });

    it('should apply theme attribute to all child chips when set by default attribute', async () => {
      const screen = render(html`
        <forge-chip-set theme="error">
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);

      expect(chips.every(chip => chip.theme === 'error')).toBe(true);
    });

    it('should apply theme attribute to all child chips when set by property', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);

      expect(chips.every(chip => chip.theme === CHIP_CONSTANTS.defaults.THEME)).toBe(true);

      el.theme = 'error';
      await el.updateComplete;

      expect(chips.every(chip => chip.theme === 'error')).toBe(true);
    });

    it('should apply chip set properties to chips added after the chip set is created', async () => {
      const screen = render(html`<forge-chip-set type="filter" dense disabled invalid theme="error"></forge-chip-set>`);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;

      const chip = document.createElement('forge-chip');
      el.appendChild(chip);
      await chip.updateComplete;

      expect(chip.type).toBe('filter');
      expect(chip.dense).toBe(true);
      expect(chip.disabled).toBe(true);
      expect(chip.invalid).toBe(true);
      expect(chip.theme).toBe('error');
    });

    it('should not override chip properties with default chip set values', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip type="filter" dense disabled invalid theme="error">Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const [chip] = getChips(el);
      await chip.updateComplete;

      expect(chip.type).toBe('filter');
      expect(chip.dense).toBe(true);
      expect(chip.disabled).toBe(true);
      expect(chip.invalid).toBe(true);
      expect(chip.theme).toBe('error');
    });

    it('should override chip properties when chip set properties change', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip disabled>Test</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const [chip] = getChips(el);

      el.disabled = true;
      el.disabled = false;
      await chip.updateComplete;

      expect(chip.disabled).toBe(false);
    });
  });

  describe('Chip', () => {
    it('should contain shadow root', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      expect(el.shadowRoot).not.toBeNull();
    });

    it('should be accessible', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      await expect(el).toBeAccessible();
    });

    it('should have expected defaults', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;

      expect(el.type).toBe(CHIP_CONSTANTS.defaults.TYPE);
      expect(el.value).toBeUndefined();
      expect(el.selected).toBe(false);
      expect(el.disabled).toBe(false);
      expect(el.invalid).toBe(false);
      expect(el.dense).toBe(false);
      expect(el.theme).toBe(CHIP_CONSTANTS.defaults.THEME);
      expect(el.href).toBeUndefined();
      expect(el.target).toBeUndefined();
      expect(el.download).toBeUndefined();
      expect(el.rel).toBeUndefined();
      expect(el.removeButtonLabel).toBeUndefined();
    });

    it('should set type via attribute', async () => {
      const screen = render(html`<forge-chip type="filter">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      expect(el.type).toBe('filter');
    });

    it('should update type attribute when setting property', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      el.type = 'filter';
      await el.updateComplete;

      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.TYPE)).toBe(true);
    });

    it('should reset to default type when removing attribute', async () => {
      const screen = render(html`<forge-chip type="filter">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      el.removeAttribute(CHIP_CONSTANTS.attributes.TYPE);
      await el.updateComplete;

      expect(el.type).toBe(CHIP_CONSTANTS.defaults.TYPE);
    });

    it('should set value attribute', async () => {
      const screen = render(html`<forge-chip value="test">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      expect(el.value).toBe('test');
    });

    it('should set selected attribute', async () => {
      const screen = render(html`<forge-chip selected>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      expect(el.selected).toBe(true);
    });

    it('should set selected attribute when setting property', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      el.selected = true;
      await el.updateComplete;

      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(true);
    });

    it('should use anchor as trigger element when setting href by default', async () => {
      const href = 'javascript: void(0);';
      const screen = render(html`<forge-chip href="${href}">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const triggerEl = getTriggerElement(el);

      expect(triggerEl).toBeInstanceOf(HTMLAnchorElement);
      expect(triggerEl?.getAttribute(CHIP_CONSTANTS.attributes.HREF)).toBe(href);
    });

    it('should use anchor as trigger element when setting href dynamically', async () => {
      const href = 'javascript: void(0);';
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;

      let triggerEl = getTriggerElement(el);
      expect(triggerEl).toBeInstanceOf(HTMLButtonElement);

      el.href = href;
      await el.updateComplete;

      triggerEl = getTriggerElement(el);
      expect(triggerEl).toBeInstanceOf(HTMLAnchorElement);
      expect(triggerEl?.getAttribute(CHIP_CONSTANTS.attributes.HREF)).toBe(href);
    });

    it('should reset trigger to button element when removing href', async () => {
      const screen = render(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;

      let triggerEl = getTriggerElement(el);
      expect(triggerEl).toBeInstanceOf(HTMLAnchorElement);

      el.removeAttribute(CHIP_CONSTANTS.attributes.HREF);
      await el.updateComplete;

      triggerEl = getTriggerElement(el);
      expect(triggerEl).toBeInstanceOf(HTMLButtonElement);
    });

    it('should set anchor target via attribute', async () => {
      const screen = render(html`<forge-chip href="javascript: void(0);" target="_blank">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.target).toBe('_blank');
      expect(el.target).toBe('_blank');
    });

    it('should update target attribute when setting property', async () => {
      const screen = render(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.target).toBe('');
      expect(el.target).toBeUndefined();

      el.target = '_blank';
      await el.updateComplete;

      expect(anchorEl.target).toBe('_blank');
      expect(el.getAttribute(CHIP_CONSTANTS.attributes.TARGET)).toBe('_blank');
    });

    it('should set anchor download via attribute', async () => {
      const screen = render(html`<forge-chip href="javascript: void(0);" download="test">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.download).toBe('test');
      expect(el.download).toBe('test');
    });

    it('should update download attribute when setting property', async () => {
      const screen = render(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.download).toBe('');
      expect(el.download).toBeUndefined();

      el.download = 'test';
      await el.updateComplete;

      expect(anchorEl.download).toBe('test');
      expect(el.getAttribute(CHIP_CONSTANTS.attributes.DOWNLOAD)).toBe('test');
    });

    it('should set anchor rel via attribute', async () => {
      const screen = render(html`<forge-chip href="javascript: void(0);" rel="noopener">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const anchorEl = el.shadowRoot?.querySelector(CHIP_CONSTANTS.selectors.TRIGGER) as HTMLAnchorElement;

      expect(anchorEl.rel).toBe('noopener');
      expect(el.rel).toBe('noopener');
    });

    it('should update rel attribute when setting property', async () => {
      const screen = render(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.rel).toBe('');
      expect(el.rel).toBeUndefined();

      el.rel = 'noopener';
      await el.updateComplete;

      expect(anchorEl.rel).toBe('noopener');
      expect(el.getAttribute(CHIP_CONSTANTS.attributes.REL)).toBe('noopener');
    });

    it('should inherit target, download, and rel values when href is set', async () => {
      const screen = render(html`<forge-chip target="_blank" download="test" rel="noopener">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;

      el.href = 'javascript: void(0);';
      await el.updateComplete;

      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.target).toBe('_blank');
      expect(anchorEl.download).toBe('test');
      expect(anchorEl.rel).toBe('noopener');
    });

    it('should set remove button label via attribute', async () => {
      const screen = render(html`<forge-chip type="input" remove-button-label="Custom remove">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const removeButton = getRemoveButtonElement(el);

      expect(el.removeButtonLabel).toBe('Custom remove');
      expect(removeButton).toHaveAccessibleName('Custom remove');
    });

    it('should update remove button label attribute when setting property', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const removeButton = getRemoveButtonElement(el);

      expect(el.removeButtonLabel).toBeUndefined();
      expect(removeButton).toHaveAccessibleName('Remove Test');

      el.removeButtonLabel = 'Custom remove';
      await el.updateComplete;

      expect(removeButton).toHaveAccessibleName('Custom remove');
    });

    it('should use default remove button label when custom label is not set', async () => {
      const screen = render(html`<forge-chip type="input">Test Chip</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const removeButton = getRemoveButtonElement(el);

      expect(el.removeButtonLabel).toBeUndefined();
      expect(removeButton).toHaveAccessibleName('Remove Test Chip');
    });

    it('should update remove button label when property is set after creation', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      let removeButton = getRemoveButtonElement(el);

      expect(removeButton).toHaveAccessibleName('Remove Test');

      el.removeButtonLabel = 'Delete item';
      await el.updateComplete;
      removeButton = getRemoveButtonElement(el);

      expect(removeButton).toHaveAccessibleName('Delete item');
    });

    it('should reset to default remove button label when custom label is removed', async () => {
      const screen = render(html`<forge-chip type="input" remove-button-label="Custom remove">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      let removeButton = getRemoveButtonElement(el);

      expect(removeButton).toHaveAccessibleName('Custom remove');

      el.removeAttribute(CHIP_CONSTANTS.attributes.REMOVE_BUTTON_LABEL);
      await el.updateComplete;
      removeButton = getRemoveButtonElement(el);

      expect(el.removeButtonLabel).toBeNull();
      expect(removeButton).toHaveAccessibleName('Remove Test');
    });

    it('should set focus to trigger element when calling focus() method', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;

      el.focus();

      expect(document.activeElement).toBe(el);
    });

    it('should set disabled', async () => {
      const screen = render(html`<forge-chip disabled>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const focusIndicatorEl = getFocusIndicator(el);
      const stateLayerEl = getStateLayer(el);
      const triggerEl = getTriggerElement(el) as HTMLButtonElement;

      expect(el.disabled).toBe(true);
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(triggerEl?.disabled).toBe(true);
      expect(focusIndicatorEl).toBeNull();
      expect(stateLayerEl).toBeNull();
    });

    it('should toggle disabled dynamically', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const triggerEl = getTriggerElement(el) as HTMLButtonElement;

      let focusIndicatorEl = getFocusIndicator(el);
      let stateLayerEl = getStateLayer(el);

      expect(el.disabled).toBe(false);
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).toBe(false);
      expect(triggerEl?.disabled).toBe(false);
      expect(focusIndicatorEl).toBeTruthy();
      expect(stateLayerEl).toBeTruthy();

      el.disabled = true;
      await el.updateComplete;
      focusIndicatorEl = getFocusIndicator(el);
      stateLayerEl = getStateLayer(el);

      expect(el.disabled).toBe(true);
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(triggerEl?.disabled).toBe(true);
      expect(focusIndicatorEl).toBeNull();
      expect(stateLayerEl).toBeNull();

      el.disabled = false;
      await el.updateComplete;
      focusIndicatorEl = getFocusIndicator(el);
      stateLayerEl = getStateLayer(el);

      expect(el.disabled).toBe(false);
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).toBe(false);
      expect(triggerEl?.disabled).toBe(false);
      expect(focusIndicatorEl).toBeTruthy();
      expect(stateLayerEl).toBeTruthy();
    });

    it('should not disable if anchor element is used as trigger', async () => {
      const screen = render(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const triggerEl = getTriggerElement(el) as HTMLAnchorElement;
      const focusIndicatorEl = getFocusIndicator(el);
      const stateLayerEl = getStateLayer(el);

      expect(el.disabled).toBe(false);
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).toBe(false);
      expect(triggerEl?.hasAttribute('disabled')).toBe(false);
      expect(focusIndicatorEl).toBeTruthy();
      expect(stateLayerEl).toBeTruthy();

      el.disabled = true;
      await el.updateComplete;

      expect(el.disabled).toBe(true);
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(triggerEl?.hasAttribute('disabled')).toBe(false);
      expect(focusIndicatorEl).toBeTruthy();
      expect(stateLayerEl).toBeTruthy();
    });

    it('should allow interaction if disabled and href are set', async () => {
      const screen = render(html`<forge-chip disabled>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      let triggerEl = getTriggerElement(el) as HTMLButtonElement;
      let focusIndicatorEl = getFocusIndicator(el);
      let stateLayerEl = getStateLayer(el);

      expect(el.disabled).toBe(true);
      expect(triggerEl.hasAttribute('disabled')).toBe(true);
      expect(focusIndicatorEl).toBeNull();
      expect(stateLayerEl).toBeNull();

      el.href = 'javascript: void(0);';
      await el.updateComplete;

      triggerEl = getTriggerElement(el) as HTMLButtonElement;
      focusIndicatorEl = getFocusIndicator(el);
      stateLayerEl = getStateLayer(el);

      expect(el.disabled).toBe(true);
      expect(triggerEl.hasAttribute('disabled')).toBe(false);
      expect(focusIndicatorEl).toBeTruthy();
      expect(stateLayerEl).toBeTruthy();
    });

    it('should disable remove button if chip type is "input" when disabled', async () => {
      const screen = render(html`<forge-chip type="input" disabled>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const removeButton = getRemoveButtonElement(el);

      expect(removeButton?.disabled).toBe(true);
    });

    it('should set default theme if null is provided', async () => {
      const screen = render(html`<forge-chip theme="success">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;

      expect(el.theme).toBe('success');

      el.theme = null as any;
      await el.updateComplete;

      expect(el.theme).toBe(CHIP_CONSTANTS.defaults.THEME);
    });

    it('should remove state layer when field type is set', async () => {
      const screen = render(html`<forge-chip type="field">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const stateLayerEl = getStateLayer(el);

      expect(stateLayerEl).toBeNull();
    });

    it('should manually animate state layer when pressing enter or space on focused anchor chip', async () => {
      const screen = render(html`<forge-chip type="choice" href="javascript: void(0);">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const stateLayerEl = getStateLayer(el);
      const animateSpy = vi.spyOn(stateLayerEl, 'playAnimation');

      el.focus();
      await userEvent.keyboard('{Enter}');

      expect(animateSpy).toHaveBeenCalledOnce();

      await userEvent.keyboard(' ');

      expect(animateSpy).toHaveBeenCalledTimes(2);
    });

    it('should not manually animate state layer when pressing enter or space on non-anchor focused chip', async () => {
      const screen = render(html`<forge-chip type="choice">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const stateLayerEl = getStateLayer(el);
      const animateSpy = vi.spyOn(stateLayerEl, 'playAnimation');

      el.focus();
      await userEvent.keyboard('{Enter}');

      expect(animateSpy).not.toHaveBeenCalled();

      await userEvent.keyboard(' ');

      expect(animateSpy).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation', () => {
    it('should activate focus indicator when focusing chip', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const triggerEl = getTriggerElement(el) as HTMLButtonElement;
      const focusIndicatorEl = getFocusIndicator(el);

      expect(triggerEl?.matches(':focus')).toBe(false);

      triggerEl?.focus();

      expect(triggerEl?.matches(':focus')).toBe(true);
      expect(focusIndicatorEl?.active).toBe(true);
    });

    it('should focus next chip when pressing ArrowRight', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);
      const firstChip = chips[0];
      const secondChip = chips[1];

      firstChip.focus();
      expect(document.activeElement).toBe(firstChip);

      await userEvent.keyboard('{ArrowRight}');

      expect(document.activeElement).toBe(secondChip);
    });

    it('should focus previous chip when pressing ArrowLeft', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);
      const firstChip = chips[0];
      const secondChip = chips[1];

      secondChip.focus();
      expect(document.activeElement).toBe(secondChip);

      await userEvent.keyboard('{ArrowLeft}');

      expect(document.activeElement).toBe(firstChip);
    });

    it('should focus remove button of previous chip when pressing ArrowLeft for input chips', async () => {
      const screen = render(html`
        <forge-chip-set type="input">
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);
      const firstChip = chips[0];
      const secondChip = chips[1];
      const removeButton = getRemoveButtonElement(firstChip);

      secondChip.focus();
      expect(document.activeElement).toBe(secondChip);

      await userEvent.keyboard('{ArrowLeft}');

      expect(removeButton.matches(':focus')).toBe(true);
    });

    it('should wrap focus to first chip when pressing ArrowRight on last chip', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);
      const firstChip = chips[0];
      const lastChip = chips[2];

      lastChip.focus();
      expect(document.activeElement).toBe(lastChip);

      await userEvent.keyboard('{ArrowRight}');

      expect(document.activeElement).toBe(firstChip);
    });

    it('should wrap focus to last chip when pressing ArrowLeft on first chip', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);
      const firstChip = chips[0];
      const lastChip = chips[2];

      firstChip.focus();
      expect(document.activeElement).toBe(firstChip);

      await userEvent.keyboard('{ArrowLeft}');

      expect(document.activeElement).toBe(lastChip);
    });

    it('should move focus to remove button when pressing ArrowRight on focused input chip', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const removeButton = getRemoveButtonElement(el);

      el.focus();

      expect(document.activeElement).toBe(el);
      expect(removeButton?.matches(':focus')).toBe(false);

      await userEvent.keyboard('{ArrowRight}');

      expect(document.activeElement).toBe(el);
      expect(removeButton?.matches(':focus')).toBe(true);
    });

    it('should move focus back to trigger element when pressing ArrowLeft on focused remove button', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const triggerEl = getTriggerElement(el);
      const removeButton = getRemoveButtonElement(el);

      el.focus();

      await userEvent.keyboard('{ArrowRight}');
      expect(triggerEl.matches(':focus')).toBe(false);
      expect(removeButton.matches(':focus')).toBe(true);

      await userEvent.keyboard('{ArrowLeft}');
      expect(triggerEl.matches(':focus')).toBe(true);
      expect(removeButton.matches(':focus')).toBe(false);
    });

    it('should moved focus to next chip when pressing tab key while remove button is focused', async () => {
      const screen = render(html`
        <forge-chip-set type="input">
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);
      const firstChip = chips[0];
      const secondChip = chips[1];
      const removeButton = getRemoveButtonElement(firstChip);

      firstChip.focus();

      await userEvent.keyboard('{ArrowRight}');
      expect(removeButton.matches(':focus')).toBe(true);

      await userEvent.tab();
      expect(document.activeElement).toBe(secondChip);
    });
  });

  describe('selection', () => {
    it('should dispatch select event when clicking on chip', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const selectSpy = vi.fn();

      el.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      await userEvent.click(el);

      expect(selectSpy).toHaveBeenCalledOnce();
      expect(selectSpy.mock.calls[0][0].detail.value).toBe(el.value);
      expect(selectSpy.mock.calls[0][0].detail.selected).toBe(true);
    });

    it('should reflect updated selected state on event target when dispatching select event', async () => {
      const screen = render(html`<forge-chip type="choice">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      let targetSelected = false;
      const selectSpy = vi.fn((evt: Event) => (targetSelected = (evt.target as IChipComponent)?.selected));

      el.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      await userEvent.click(el);

      expect(targetSelected).toBe(true);
      expect(el.selected).toBe(true);
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(true);
    });

    it('should dispatch select event when pressing enter or space on chip', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const selectSpy = vi.fn();

      el.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      el.focus();

      await userEvent.keyboard('{Enter}');

      expect(selectSpy).toHaveBeenCalledOnce();

      await userEvent.keyboard(' ');

      expect(selectSpy).toHaveBeenCalledTimes(2);
    });

    it('should not set selected if select event is cancelled', async () => {
      const screen = render(html`<forge-chip>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const selectSpy = vi.fn((evt: CustomEvent<IChipSelectEventData>) => evt.preventDefault());

      el.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      await userEvent.click(el);

      expect(el.selected).toBe(false);
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(false);
    });

    it('should not select focused chip when pressing enter or space on default "action" chips', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);
      const firstChip = chips[0];

      firstChip.focus();

      await userEvent.keyboard('{Enter}');

      expect(firstChip.selected).toBe(false);
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(false);

      await userEvent.keyboard(' ');

      expect(firstChip.selected).toBe(false);
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(false);
    });

    it('should be accessible when selected', async () => {
      const screen = render(html`<forge-chip selected>Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const triggerEl = getTriggerElement(el);

      expect(triggerEl.getAttribute('aria-pressed')).toBe('true');
      await expect(el).toBeAccessible();
    });

    ['filter', 'choice', 'input'].forEach(type => {
      describe(`${type} chips keyboard selection`, () => {
        it(`should select focused chip when pressing enter on ${type} chips`, async () => {
          const screen = render(html`
            <forge-chip-set type="${type}">
              <forge-chip>Test 1</forge-chip>
              <forge-chip>Test 2</forge-chip>
              <forge-chip>Test 3</forge-chip>
            </forge-chip-set>
          `);
          const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
          await el.updateComplete;
          const chips = getChips(el);
          const firstChip = chips[0];

          firstChip.focus();

          await userEvent.keyboard('{Enter}');

          expect(firstChip.selected).toBe(true);
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(true);
        });

        it(`should select focused chip when pressing space on ${type} chips`, async () => {
          const screen = render(html`
            <forge-chip-set type="${type}">
              <forge-chip>Test 1</forge-chip>
              <forge-chip>Test 2</forge-chip>
              <forge-chip>Test 3</forge-chip>
            </forge-chip-set>
          `);
          const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
          await el.updateComplete;
          const chips = getChips(el);
          const firstChip = chips[0];

          firstChip.focus();

          await userEvent.keyboard(' ');

          expect(firstChip.selected).toBe(true);
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(true);
        });

        it(`should toggle selected state when pressing enter or space on ${type} chips`, async () => {
          const screen = render(html`
            <forge-chip-set type="${type}">
              <forge-chip>Test 1</forge-chip>
              <forge-chip>Test 2</forge-chip>
              <forge-chip>Test 3</forge-chip>
            </forge-chip-set>
          `);
          const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
          await el.updateComplete;
          const chips = getChips(el);
          const firstChip = chips[0];

          firstChip.focus();

          await userEvent.keyboard('{Enter}');

          expect(firstChip.selected).toBe(true);
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(true);

          await userEvent.keyboard('{Enter}');

          expect(firstChip.selected).toBe(false);
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(false);

          await userEvent.keyboard(' ');

          expect(firstChip.selected).toBe(true);
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(true);

          await userEvent.keyboard(' ');

          expect(firstChip.selected).toBe(false);
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(false);
        });
      });
    });

    it('should not select focused chip when pressing enter or space on disabled chips', async () => {
      const screen = render(html`
        <forge-chip-set>
          <forge-chip disabled>Test 1</forge-chip>
          <forge-chip disabled>Test 2</forge-chip>
          <forge-chip disabled>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const el = screen.container.querySelector('forge-chip-set') as IChipSetComponent;
      await el.updateComplete;
      const chips = getChips(el);
      const firstChip = chips[0];

      firstChip.focus();

      await userEvent.keyboard('{Enter}');

      expect(firstChip.selected).toBe(false);
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(false);

      await userEvent.keyboard(' ');

      expect(firstChip.selected).toBe(false);
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).toBe(false);
    });

    it('should not set aria-pressed on anchor chips', async () => {
      const screen = render(html`<forge-chip type="choice" href="javascript: void(0);">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const triggerEl = getTriggerElement(el);

      el.focus();
      await userEvent.keyboard('{Enter}');

      expect(triggerEl.hasAttribute('aria-pressed')).toBe(false);
    });
  });

  describe('deletion', () => {
    it('should dispatch delete event when clicking on remove button', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const deleteSpy = vi.fn();

      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      const removeButton = getRemoveButtonElement(el);
      await userEvent.click(removeButton);

      expect(deleteSpy).toHaveBeenCalledOnce();
      expect(deleteSpy.mock.calls[0][0].detail.value).toBe(el.value);
    });

    it('should dispatch delete event when pressing delete key on focused chip', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const deleteSpy = vi.fn();

      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      el.focus();

      await userEvent.keyboard('{Delete}');

      expect(deleteSpy).toHaveBeenCalledOnce();
      expect(deleteSpy.mock.calls[0][0].detail.value).toBe(el.value);
    });

    it('should dispatch delete event when pressing backspace key on focused chip', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;
      const deleteSpy = vi.fn();

      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      el.focus();

      await userEvent.keyboard('{Backspace}');

      expect(deleteSpy).toHaveBeenCalledOnce();
      expect(deleteSpy.mock.calls[0][0].detail.value).toBe(el.value);
    });

    it('should dispatch delete event when pressing enter key on focused remove button', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;

      const deleteSpy = vi.fn();
      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      el.focus();

      await userEvent.keyboard('{ArrowRight}');

      expect(getRemoveButtonElement(el)?.matches(':focus')).toBe(true);

      await userEvent.keyboard('{Enter}');

      expect(deleteSpy).toHaveBeenCalledOnce();
      expect(deleteSpy.mock.calls[0][0].detail.value).toBe(el.value);
    });

    it('should dispatch delete event when pressing space key on focused remove button', async () => {
      const screen = render(html`<forge-chip type="input">Test</forge-chip>`);
      const el = screen.container.querySelector('forge-chip') as IChipComponent;
      await el.updateComplete;

      const deleteSpy = vi.fn();
      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      el.focus();

      await userEvent.keyboard('{ArrowRight}');

      expect(getRemoveButtonElement(el)?.matches(':focus')).toBe(true);

      await userEvent.keyboard(' ');

      expect(deleteSpy).toHaveBeenCalledOnce();
      expect(deleteSpy.mock.calls[0][0].detail.value).toBe(el.value);
    });
  });

  function getChips(el: IChipSetComponent): IChipComponent[] {
    return Array.from(el.querySelectorAll('forge-chip'));
  }

  function getTriggerElement(el: IChipComponent): HTMLElement {
    return el.shadowRoot?.querySelector(CHIP_CONSTANTS.selectors.TRIGGER) as HTMLElement;
  }

  function getRemoveButtonElement(el: IChipComponent): IconButtonComponent {
    return el.shadowRoot?.querySelector('#remove-button') as IconButtonComponent;
  }

  function getFocusIndicator(el: IChipComponent): IFocusIndicatorComponent {
    return el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }

  function getStateLayer(el: IChipComponent): IStateLayerComponent {
    return el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }
});
