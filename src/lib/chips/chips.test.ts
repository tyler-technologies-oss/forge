import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { CHIP_SET_CONSTANTS, IChipSetComponent } from './chip-set';
import { IChipComponent } from './chip/chip';
import { CHIP_CONSTANTS, IChipSelectEventData } from './chip/chip-constants';
import { IIconButtonComponent } from '../icon-button';
import { IFocusIndicatorComponent } from '../focus-indicator';
import { IStateLayerComponent } from '../state-layer';

import './chip-set';

describe('Chips', () => {
  describe('ChipSet', () => {
    it('should contain shadow root', async () => {
      const el = await fixture<IChipSetComponent>(html`<forge-chip-set></forge-chip-set>`);
      expect(el.shadowRoot).not.to.be.null;
    });

    it('should be accessible without chips', async () => {
      const el = await fixture<IChipSetComponent>(html`<forge-chip-set></forge-chip-set>`);
      await expect(el).to.be.accessible();
    });

    it('should be accessible with chips', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      await expect(el).to.be.accessible();
    });

    it('should be accessible with input chips', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set type="input">
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      await expect(el).to.be.accessible();
    });

    it('should have expected defaults', async () => {
      const el = await fixture<IChipSetComponent>(html`<forge-chip-set></forge-chip-set>`);

      expect(el.vertical).to.be.false;
      expect(el.type).to.equal(CHIP_CONSTANTS.defaults.TYPE);
      expect(el.dense).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.invalid).to.be.false;
      expect(el.theme).to.equal(CHIP_CONSTANTS.defaults.THEME);
    });

    it('should update set vertical attribute when setting property', async () => {
      const el = await fixture<IChipSetComponent>(html`<forge-chip-set></forge-chip-set>`);
      el.vertical = true;

      expect(el.hasAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL)).to.be.true;
    });

    it('should update vertical property when removing attribute', async () => {
      const el = await fixture<IChipSetComponent>(html`<forge-chip-set vertical></forge-chip-set>`);
      el.removeAttribute(CHIP_SET_CONSTANTS.attributes.VERTICAL);

      expect(el.vertical).to.be.false;
    });

    it('should apply type attribute to all child chips when set by default attribute', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set type="filter">
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);

      const chips = getChips(el);
      expect(chips.length).to.equal(3);
      expect(chips.every(chip => chip.type === 'filter')).to.be.true;
    });

    it('should apply type attribute to all child chips when set by property', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);

      expect(chips.every(chip => chip.type === CHIP_CONSTANTS.defaults.TYPE)).to.be.true;

      el.type = 'filter';

      expect(chips.every(chip => chip.type === 'filter')).to.be.true;
    });

    it('should apply dense attribute to all child chips when set by default attribute', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set dense>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);

      expect(chips.every(chip => chip.dense)).to.be.true;
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.DENSE))).to.be.true;
    });

    it('should apply disabled attribute to all child chips when set by default attribute', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set disabled>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);

      expect(chips.every(chip => chip.disabled)).to.be.true;
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED))).to.be.true;
    });

    it('should apply disabled attribute to all child chips when set by property', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);

      expect(chips.every(chip => chip.disabled)).to.be.false;
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED))).to.be.false;

      el.disabled = true;

      expect(chips.every(chip => chip.disabled)).to.be.true;
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED))).to.be.true;
    });

    it('should apply invalid attribute to all child chips when set by default attribute', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set invalid>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);

      expect(chips.every(chip => chip.invalid)).to.be.true;
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.INVALID))).to.be.true;
    });

    it('should apply invalid attribute to all child chips when set by property', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);

      expect(chips.every(chip => chip.invalid)).to.be.false;
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.INVALID))).to.be.false;

      el.invalid = true;

      expect(chips.every(chip => chip.invalid)).to.be.true;
      expect(chips.every(chip => chip.hasAttribute(CHIP_CONSTANTS.attributes.INVALID))).to.be.true;
    });

    it('should apply theme attribute to all child chips when set by default attribute', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set theme="error">
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);

      expect(chips.every(chip => chip.theme === 'error')).to.be.true;
    });

    it('should apply theme attribute to all child chips when set by property', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
          <forge-chip>Test</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);

      expect(chips.every(chip => chip.theme === CHIP_CONSTANTS.defaults.THEME)).to.be.true;

      el.theme = 'error';

      expect(chips.every(chip => chip.theme === 'error')).to.be.true;
    });
  });

  describe('Chip', () => {
    it('should contain shadow root', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      expect(el.shadowRoot).not.to.be.null;
    });

    it('should be accessible', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      await expect(el).to.be.accessible();
    });

    it('should have expected defaults', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);

      expect(el.type).to.equal(CHIP_CONSTANTS.defaults.TYPE);
      expect(el.value).to.be.undefined;
      expect(el.selected).to.be.false;
      expect(el.disabled).to.be.false;
      expect(el.invalid).to.be.false;
      expect(el.dense).to.be.false;
      expect(el.theme).to.equal(CHIP_CONSTANTS.defaults.THEME);
      expect(el.href).to.be.undefined;
      expect(el.target).to.be.undefined;
      expect(el.download).to.be.undefined;
      expect(el.rel).to.be.undefined;
    });

    it('should set type via attribute', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="filter">Test</forge-chip>`);
      expect(el.type).to.equal('filter');
    });

    it('should update type attribute when setting property', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      el.type = 'filter';

      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.TYPE)).to.be.true;
    });

    it('should reset to default type when removing attribute', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="filter">Test</forge-chip>`);
      el.removeAttribute(CHIP_CONSTANTS.attributes.TYPE);

      expect(el.type).to.equal(CHIP_CONSTANTS.defaults.TYPE);
    });

    it('should set value attribute', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip value="test">Test</forge-chip>`);
      expect(el.value).to.equal('test');
    });

    it('should set value attribute when setting property', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      el.value = 'test';

      expect(el.getAttribute(CHIP_CONSTANTS.attributes.VALUE)).to.equal('test');
    });

    it('should set selected attribute', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip selected>Test</forge-chip>`);
      expect(el.selected).to.be.true;
    });

    it('should set selected attribute when setting property', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      el.selected = true;

      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.true;
    });

    it('should use anchor as trigger element when setting href by default', async () => {
      const href = 'javascript: void(0);';
      const el = await fixture<IChipComponent>(html`<forge-chip href="${href}">Test</forge-chip>`);
      const triggerEl = getTriggerElement(el);

      expect(triggerEl).to.be.instanceOf(HTMLAnchorElement);
      expect(triggerEl?.getAttribute(CHIP_CONSTANTS.attributes.HREF)).to.equal(href);
    });

    it('should use anchor as trigger element when setting href dynamically', async () => {
      const href = 'javascript: void(0);';
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);

      let triggerEl = getTriggerElement(el);
      expect(triggerEl).to.be.instanceOf(HTMLButtonElement);

      el.href = href;

      triggerEl = getTriggerElement(el);
      expect(triggerEl).to.be.instanceOf(HTMLAnchorElement);
      expect(triggerEl?.getAttribute(CHIP_CONSTANTS.attributes.HREF)).to.equal(href);
    });

    it('should reset trigger to button element when removing href', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);

      let triggerEl = getTriggerElement(el);
      expect(triggerEl).to.be.instanceOf(HTMLAnchorElement);

      el.removeAttribute(CHIP_CONSTANTS.attributes.HREF);

      triggerEl = getTriggerElement(el);
      expect(triggerEl).to.be.instanceOf(HTMLButtonElement);
    });

    it('should set anchor target via attribute', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip href="javascript: void(0);" target="_blank">Test</forge-chip>`);
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.target).to.equal('_blank');
      expect(el.target).to.equal('_blank');
    });

    it('should update target attribute when setting property', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.target).to.equal('');
      expect(el.target).to.be.undefined;

      el.target = '_blank';

      expect(anchorEl.target).to.equal('_blank');
      expect(el.getAttribute(CHIP_CONSTANTS.attributes.TARGET)).to.equal('_blank');
    });

    it('should set anchor download via attribute', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip href="javascript: void(0);" download="test">Test</forge-chip>`);
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.download).to.equal('test');
      expect(el.download).to.equal('test');
    });

    it('should update download attribute when setting property', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.download).to.equal('');
      expect(el.download).to.be.undefined;

      el.download = 'test';

      expect(anchorEl.download).to.equal('test');
      expect(el.getAttribute(CHIP_CONSTANTS.attributes.DOWNLOAD)).to.equal('test');
    });

    it('should set anchor rel via attribute', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip href="javascript: void(0);" rel="noopener">Test</forge-chip>`);
      const anchorEl = el.shadowRoot?.querySelector(CHIP_CONSTANTS.selectors.TRIGGER) as HTMLAnchorElement;

      expect(anchorEl.rel).to.equal('noopener');
      expect(el.rel).to.equal('noopener');
    });

    it('should update rel attribute when setting property', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.rel).to.equal('');
      expect(el.rel).to.be.undefined;

      el.rel = 'noopener';

      expect(anchorEl.rel).to.equal('noopener');
      expect(el.getAttribute(CHIP_CONSTANTS.attributes.REL)).to.equal('noopener');
    });

    it('should inherit target, download, and rel values when href is set', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip target="_blank" download="test" rel="noopener">Test</forge-chip>`);

      el.href = 'javascript: void(0);';

      const anchorEl = getTriggerElement(el) as HTMLAnchorElement;

      expect(anchorEl.target).to.equal('_blank');
      expect(anchorEl.download).to.equal('test');
      expect(anchorEl.rel).to.equal('noopener');
    });

    it('should set focus to trigger element when calling focus() method', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      const triggerEl = getTriggerElement(el);

      el.focus();

      expect(document.activeElement).to.equal(el);
      expect(triggerEl?.matches(':focus')).to.be.true;
    });

    it('should set disabled', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip disabled>Test</forge-chip>`);
      const focusIndicatorEl = getFocusIndicator(el);
      const stateLayerEl = getStateLayer(el);
      const triggerEl = getTriggerElement(el) as HTMLButtonElement;

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).to.be.true;
      expect(triggerEl?.disabled).to.be.true;
      expect(focusIndicatorEl).to.be.null;
      expect(stateLayerEl).to.be.null;
    });

    it('should toggle disabled dynamically', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      const triggerEl = getTriggerElement(el) as HTMLButtonElement;

      let focusIndicatorEl = getFocusIndicator(el);
      let stateLayerEl = getStateLayer(el);

      expect(el.disabled).to.be.false;
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).to.be.false;
      expect(triggerEl?.disabled).to.be.false;
      expect(focusIndicatorEl).to.be.ok;
      expect(stateLayerEl).to.be.ok;

      el.disabled = true;
      focusIndicatorEl = getFocusIndicator(el);
      stateLayerEl = getStateLayer(el);

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).to.be.true;
      expect(triggerEl?.disabled).to.be.true;
      expect(focusIndicatorEl).to.be.null;
      expect(stateLayerEl).to.be.null;

      el.disabled = false;
      focusIndicatorEl = getFocusIndicator(el);
      stateLayerEl = getStateLayer(el);

      expect(el.disabled).to.be.false;
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).to.be.false;
      expect(triggerEl?.disabled).to.be.false;
      expect(focusIndicatorEl).to.be.ok;
      expect(stateLayerEl).to.be.ok;
    });

    it('should not disable if anchor element is used as trigger', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip href="javascript: void(0);">Test</forge-chip>`);
      const triggerEl = getTriggerElement(el) as HTMLAnchorElement;
      const focusIndicatorEl = getFocusIndicator(el);
      const stateLayerEl = getStateLayer(el);

      expect(el.disabled).to.be.false;
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).to.be.false;
      expect(triggerEl?.hasAttribute('disabled')).to.be.false;
      expect(focusIndicatorEl).to.be.ok;
      expect(stateLayerEl).to.be.ok;

      el.disabled = true;

      expect(el.disabled).to.be.true;
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.DISABLED)).to.be.true;
      expect(triggerEl?.hasAttribute('disabled')).to.be.false;
      expect(focusIndicatorEl).to.be.ok;
      expect(stateLayerEl).to.be.ok;
    });

    it('should allow interaction if disabled and href are set', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip disabled>Test</forge-chip>`);
      let triggerEl = getTriggerElement(el) as HTMLButtonElement;
      let focusIndicatorEl = getFocusIndicator(el);
      let stateLayerEl = getStateLayer(el);

      expect(el.disabled).to.be.true;
      expect(triggerEl.hasAttribute('disabled')).to.be.true;
      expect(focusIndicatorEl).to.be.null;
      expect(stateLayerEl).to.be.null;

      el.href = 'javascript: void(0);';

      triggerEl = getTriggerElement(el) as HTMLButtonElement;
      focusIndicatorEl = getFocusIndicator(el);
      stateLayerEl = getStateLayer(el);

      expect(el.disabled).to.be.true;
      expect(triggerEl.hasAttribute('disabled')).to.be.false;
      expect(focusIndicatorEl).to.be.ok;
      expect(stateLayerEl).to.be.ok;
    });

    it('should disable remove button if chip type is "input" when disabled', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="input" disabled>Test</forge-chip>`);
      const removeButton = getRemoveButtonElement(el);

      expect(removeButton?.disabled).to.be.true;
    });

    it('should set default theme if null is provided', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip theme="success">Test</forge-chip>`);

      expect(el.theme).to.equal('success');

      el.theme = null as any;

      expect(el.theme).to.equal(CHIP_CONSTANTS.defaults.THEME);
    });

    it('should remove state layer when field type is set', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="field">Test</forge-chip>`);
      const stateLayerEl = getStateLayer(el);

      expect(stateLayerEl).to.be.null;
    });

    it('should manually animate state layer when pressing enter or space on focused anchor chip', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="choice" href="javascript: void(0);">Test</forge-chip>`);
      const stateLayerEl = getStateLayer(el);
      const animateSpy = spy(stateLayerEl, 'playAnimation');

      el.focus();
      await sendKeys({ press: 'Enter' });

      expect(animateSpy.calledOnce).to.be.true;

      await sendKeys({ press: 'Space' });

      expect(animateSpy.calledTwice).to.be.true;
    });

    it('should not manually animate state layer when pressing enter or space on non-anchor focused chip', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="choice">Test</forge-chip>`);
      const stateLayerEl = getStateLayer(el);
      const animateSpy = spy(stateLayerEl, 'playAnimation');

      el.focus();
      await sendKeys({ press: 'Enter' });

      expect(animateSpy.called).to.be.false;

      await sendKeys({ press: 'Space' });

      expect(animateSpy.called).to.be.false;
    });
  });

  describe('Keyboard navigation', () => {
    it('should activate focus indicator when focusing chip', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      const triggerEl = getTriggerElement(el) as HTMLButtonElement;
      const focusIndicatorEl = getFocusIndicator(el);

      expect(triggerEl?.matches(':focus')).to.be.false;

      triggerEl?.focus();

      expect(triggerEl?.matches(':focus')).to.be.true;
      expect(focusIndicatorEl?.active).to.be.true;
    });

    it('should focus next chip when pressing ArrowRight', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];
      const secondChip = chips[1];

      firstChip.focus();
      expect(document.activeElement).to.equal(firstChip);

      await sendKeys({ press: 'ArrowRight' });

      expect(document.activeElement).to.equal(secondChip);
    });

    it('should focus previous chip when pressing ArrowLeft', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];
      const secondChip = chips[1];

      secondChip.focus();
      expect(document.activeElement).to.equal(secondChip);

      await sendKeys({ press: 'ArrowLeft' });

      expect(document.activeElement).to.equal(firstChip);
    });

    it('should focus remove button of previous chip when pressing ArrowLeft for input chips', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set type="input">
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];
      const secondChip = chips[1];
      const removeButton = getRemoveButtonElement(firstChip);

      secondChip.focus();
      expect(document.activeElement).to.equal(secondChip);

      await sendKeys({ press: 'ArrowLeft' });

      expect(removeButton.matches(':focus')).to.be.true;
    });

    it('should wrap focus to first chip when pressing ArrowRight on last chip', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];
      const lastChip = chips[2];

      lastChip.focus();
      expect(document.activeElement).to.equal(lastChip);

      await sendKeys({ press: 'ArrowRight' });

      expect(document.activeElement).to.equal(firstChip);
    });

    it('should wrap focus to last chip when pressing ArrowLeft on first chip', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];
      const lastChip = chips[2];

      firstChip.focus();
      expect(document.activeElement).to.equal(firstChip);

      await sendKeys({ press: 'ArrowLeft' });

      expect(document.activeElement).to.equal(lastChip);
    });

    it('should move focus to remove button when pressing ArrowRight on focused input chip', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="input">Test</forge-chip>`);
      const removeButton = getRemoveButtonElement(el);

      el.focus();

      expect(document.activeElement).to.equal(el);
      expect(removeButton?.matches(':focus')).to.be.false;

      await sendKeys({ press: 'ArrowRight' });

      expect(document.activeElement).to.equal(el);
      expect(removeButton?.matches(':focus')).to.be.true;
    });

    it('should move focus back to trigger element when pressing ArrowLeft on focused remove button', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="input">Test</forge-chip>`);
      const triggerEl = getTriggerElement(el);
      const removeButton = getRemoveButtonElement(el);

      el.focus();

      await sendKeys({ press: 'ArrowRight' });
      expect(triggerEl.matches(':focus')).to.be.false;
      expect(removeButton.matches(':focus')).to.be.true;

      await sendKeys({ press: 'ArrowLeft' });
      expect(triggerEl.matches(':focus')).to.be.true;
      expect(removeButton.matches(':focus')).to.be.false;
    });

    it('should moved focus to next chip when pressing tab key while remove button is focused', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set type="input">
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];
      const secondChip = chips[1];
      const removeButton = getRemoveButtonElement(firstChip);

      firstChip.focus();

      await sendKeys({ press: 'ArrowRight' });
      expect(removeButton.matches(':focus')).to.be.true;

      await sendKeys({ press: 'Tab' });
      expect(document.activeElement).to.equal(secondChip);
    });
  });

  describe('selection', () => {
    it('should dispatch select event when clicking on chip', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      const selectSpy = spy();

      el.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      el.click();

      expect(selectSpy.calledOnce).to.be.true;
      expect(selectSpy.firstCall.args[0].detail.value).to.equal(el.value);
      expect(selectSpy.firstCall.args[0].detail.selected).to.be.true;
    });

    it('should reflect updated selected state on event target when dispatching select event', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="choice">Test</forge-chip>`);
      let targetSelected = false;
      const selectSpy = spy(evt => (targetSelected = evt.target?.selected));

      el.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      el.click();

      expect(targetSelected).to.be.true;
      expect(el.selected).to.be.true;
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.true;
    });

    it('should dispatch select event when pressing enter or space on chip', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      const selectSpy = spy();

      el.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      el.focus();

      await sendKeys({ press: 'Enter' });

      expect(selectSpy.calledOnce).to.be.true;

      await sendKeys({ press: 'Space' });

      expect(selectSpy.calledTwice).to.be.true;
    });

    it('should not set selected if select event is cancelled', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip>Test</forge-chip>`);
      const selectSpy = spy((evt: CustomEvent<IChipSelectEventData>) => evt.preventDefault());

      el.addEventListener(CHIP_CONSTANTS.events.SELECT, selectSpy);

      el.click();

      expect(el.selected).to.be.false;
      expect(el.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;
    });

    it('should not select focused chip when pressing enter or space on default "action" chips', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];

      firstChip.focus();

      await sendKeys({ press: 'Enter' });

      expect(firstChip.selected).to.be.false;
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;

      await sendKeys({ press: 'Space' });

      expect(firstChip.selected).to.be.false;
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;
    });

    it('should be accessible when selected', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip selected>Test</forge-chip>`);
      const triggerEl = getTriggerElement(el);

      expect(triggerEl.getAttribute('aria-pressed')).to.equal('true');
      await expect(el).to.be.accessible();
    });

    ['filter', 'choice', 'input'].forEach(type => {
      describe(`${type} chips keyboard selection`, () => {
        it(`should select focused chip when pressing enter on ${type} chips`, async () => {
          const el = await fixture<IChipSetComponent>(html`
            <forge-chip-set type="${type}">
              <forge-chip>Test 1</forge-chip>
              <forge-chip>Test 2</forge-chip>
              <forge-chip>Test 3</forge-chip>
            </forge-chip-set>
          `);
          const chips = getChips(el);
          const firstChip = chips[0];

          firstChip.focus();

          await sendKeys({ press: 'Enter' });

          expect(firstChip.selected).to.be.true;
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.true;
        });

        it(`should select focused chip when pressing space on ${type} chips`, async () => {
          const el = await fixture<IChipSetComponent>(html`
            <forge-chip-set type="${type}">
              <forge-chip>Test 1</forge-chip>
              <forge-chip>Test 2</forge-chip>
              <forge-chip>Test 3</forge-chip>
            </forge-chip-set>
          `);
          const chips = getChips(el);
          const firstChip = chips[0];

          firstChip.focus();

          await sendKeys({ press: 'Space' });

          expect(firstChip.selected).to.be.true;
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.true;
        });

        it(`should toggle selected state when pressing enter or space on ${type} chips`, async () => {
          const el = await fixture<IChipSetComponent>(html`
            <forge-chip-set type="${type}">
              <forge-chip>Test 1</forge-chip>
              <forge-chip>Test 2</forge-chip>
              <forge-chip>Test 3</forge-chip>
            </forge-chip-set>
          `);
          const chips = getChips(el);
          const firstChip = chips[0];

          firstChip.focus();

          await sendKeys({ press: 'Enter' });

          expect(firstChip.selected).to.be.true;
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.true;

          await sendKeys({ press: 'Enter' });

          expect(firstChip.selected).to.be.false;
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;

          await sendKeys({ press: 'Space' });

          expect(firstChip.selected).to.be.true;
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.true;

          await sendKeys({ press: 'Space' });

          expect(firstChip.selected).to.be.false;
          expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;
        });
      });
    });

    it('should not select focused chip when pressing enter or space on default "action" chips', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip>Test 1</forge-chip>
          <forge-chip>Test 2</forge-chip>
          <forge-chip>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];

      firstChip.focus();

      await sendKeys({ press: 'Enter' });

      expect(firstChip.selected).to.be.false;
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;

      await sendKeys({ press: 'Space' });

      expect(firstChip.selected).to.be.false;
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;
    });

    it('should not select focused chip when pressing enter or space on disabled chips', async () => {
      const el = await fixture<IChipSetComponent>(html`
        <forge-chip-set>
          <forge-chip disabled>Test 1</forge-chip>
          <forge-chip disabled>Test 2</forge-chip>
          <forge-chip disabled>Test 3</forge-chip>
        </forge-chip-set>
      `);
      const chips = getChips(el);
      const firstChip = chips[0];

      firstChip.focus();

      await sendKeys({ press: 'Enter' });

      expect(firstChip.selected).to.be.false;
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;

      await sendKeys({ press: 'Space' });

      expect(firstChip.selected).to.be.false;
      expect(firstChip.hasAttribute(CHIP_CONSTANTS.attributes.SELECTED)).to.be.false;
    });

    it('should not set aria-pressed on anchor chips', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="choice" href="javascript: void(0);">Test</forge-chip>`);
      const triggerEl = getTriggerElement(el);

      el.focus();
      await sendKeys({ press: 'Enter' });

      expect(triggerEl.hasAttribute('aria-pressed')).to.be.false;
    });
  });

  describe('deletion', () => {
    it('should dispatch delete event when clicking on remove button', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="input">Test</forge-chip>`);
      const deleteSpy = spy();

      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      const removeButton = getRemoveButtonElement(el);
      removeButton.click();

      expect(deleteSpy.calledOnce).to.be.true;
      expect(deleteSpy.firstCall.args[0].detail.value).to.equal(el.value);
    });

    it('should dispatch delete event when pressing delete key on focused chip', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="input">Test</forge-chip>`);
      const deleteSpy = spy();

      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      el.focus();

      await sendKeys({ press: 'Delete' });

      expect(deleteSpy.calledOnce).to.be.true;
      expect(deleteSpy.firstCall.args[0].detail.value).to.equal(el.value);
    });

    it('should dispatch delete event when pressing backspace key on focused chip', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="input">Test</forge-chip>`);
      const deleteSpy = spy();

      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      el.focus();

      await sendKeys({ press: 'Backspace' });

      expect(deleteSpy.calledOnce).to.be.true;
      expect(deleteSpy.firstCall.args[0].detail.value).to.equal(el.value);
    });

    it('should dispatch delete event when pressing enter key on focused remove button', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="input">Test</forge-chip>`);

      const deleteSpy = spy();
      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      el.focus();

      await sendKeys({ press: 'ArrowRight' });

      expect(getRemoveButtonElement(el)?.matches(':focus')).to.be.true;

      await sendKeys({ press: 'Enter' });

      expect(deleteSpy.calledOnce).to.be.true;
      expect(deleteSpy.firstCall.args[0].detail.value).to.equal(el.value);
    });

    it('should dispatch delete event when pressing space key on focused remove button', async () => {
      const el = await fixture<IChipComponent>(html`<forge-chip type="input">Test</forge-chip>`);

      const deleteSpy = spy();
      el.addEventListener(CHIP_CONSTANTS.events.DELETE, deleteSpy);

      el.focus();

      await sendKeys({ press: 'ArrowRight' });

      expect(getRemoveButtonElement(el)?.matches(':focus')).to.be.true;

      await sendKeys({ press: 'Space' });

      expect(deleteSpy.calledOnce).to.be.true;
      expect(deleteSpy.firstCall.args[0].detail.value).to.equal(el.value);
    });
  });

  function getChips(el: IChipSetComponent): IChipComponent[] {
    return Array.from(el.querySelectorAll('forge-chip'));
  }

  function getTriggerElement(el: IChipComponent): HTMLElement {
    return el.shadowRoot?.querySelector(CHIP_CONSTANTS.selectors.TRIGGER) as HTMLElement;
  }

  function getRemoveButtonElement(el: IChipComponent): IIconButtonComponent {
    return el.shadowRoot?.querySelector('#remove-button') as IIconButtonComponent;
  }

  function getFocusIndicator(el: IChipComponent): IFocusIndicatorComponent {
    return el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }

  function getStateLayer(el: IChipComponent): IStateLayerComponent {
    return el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }
});
