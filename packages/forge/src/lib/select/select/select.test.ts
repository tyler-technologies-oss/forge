import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { TestHarness } from '../../core/testing/test-harness.js';
import { internals } from '../../constants.js';
import { frame } from '../../core/utils/utils.js';
import {
  FIELD_CONSTANTS,
  FieldDensity,
  FieldLabelAlignment,
  FieldLabelPosition,
  FieldShape,
  FieldSupportTextInset,
  FieldTheme,
  FieldVariant,
  IFieldComponent
} from '../../field/index.js';
import { IPopoverComponent, POPOVER_CONSTANTS } from '../../popover/index.js';
import { BASE_SELECT_CONSTANTS, ISelectOption } from '../core/index.js';
import { ISelectComponent } from './select.js';
import { SELECT_CONSTANTS } from './select-constants.js';

import './select.js';

describe('Select', () => {
  describe('base', () => {
    it('should contain shadow root', async () => {
      const harness = await createFixture();

      expect(harness.element.shadowRoot).not.toBeNull();
    });

    it('should initialize field', async () => {
      const harness = await createFixture();

      expect(harness.fieldElement).toBeTruthy();
      expect(harness.fieldElement.shadowRoot).toBeTruthy();
    });

    it('should instantiate field before connected to DOM', async () => {
      const selectEl = document.createElement('forge-select');
      const fieldEl = selectEl.shadowRoot?.querySelector('forge-field');

      expect(fieldEl).toBeTruthy();
      expect(fieldEl?.shadowRoot).toBeTruthy();
    });

    it('should focus element when clicking field', async () => {
      const harness = await createFixture();

      expect(harness.element.matches(':focus')).toBe(false);

      await harness.clickElement(harness.element);

      expect(harness.element.matches(':focus')).toBe(true);
    });

    it('should ignore clicks originating from field accessory slot', async () => {
      const harness = await createFixture();
      const accessoryEl = document.createElement('button');
      accessoryEl.slot = 'accessory';
      harness.element.appendChild(accessoryEl);

      await frame();
      expect(harness.element.matches(':focus')).toBe(false);

      await harness.clickElement(accessoryEl);

      expect(harness.element.matches(':focus')).toBe(false);
      expect(harness.element.open).toBe(false);
    });

    it('should not focus field when disabled', async () => {
      const harness = await createFixture({ disabled: true });

      expect(harness.element.matches(':focus')).toBe(false);

      await harness.clickElement(harness.element, { force: true });

      expect(harness.element.matches(':focus')).toBe(false);
    });

    it('should have correct default state', async () => {
      const harness = await createFixture();

      expect(harness.element.open).toBe(false);
      expect(harness.element.value).toBeUndefined();
      expect(harness.element.label).toBe(harness.labelElement?.textContent);
      expect(harness.element.placeholder).toBe('');
      expect(harness.element.multiple).toBe(false);
      expect(harness.element.disabled).toBe(false);
      expect(harness.element.labelPosition).toBe(FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION);
      expect(harness.element.labelAlignment).toBe(FIELD_CONSTANTS.defaults.DEFAULT_LABEL_ALIGNMENT);
      expect(harness.element.invalid).toBe(false);
      expect(harness.element.required).toBe(false);
      expect(harness.element.optional).toBe(false);
      expect(harness.element.disabled).toBe(false);
      expect(harness.element.floatLabel).toBe(false);
      expect(harness.element.variant).toBe(FIELD_CONSTANTS.defaults.DEFAULT_VARIANT);
      expect(harness.element.theme).toBe(FIELD_CONSTANTS.defaults.DEFAULT_THEME);
      expect(harness.element.shape).toBe(FIELD_CONSTANTS.defaults.DEFAULT_SHAPE);
      expect(harness.element.density).toBe(FIELD_CONSTANTS.defaults.DEFAULT_DENSITY);
      expect(harness.element.dense).toBe(false);
      expect(harness.element.popoverIcon).toBe(true);
      expect(harness.element.supportTextInset).toBe(FIELD_CONSTANTS.defaults.DEFAULT_SUPPORT_TEXT_INSET);
    });

    it('should dispatch scrolled bottom event when scrolling to bottom of dropdown', async () => {
      const harness = await createFixture();

      harness.element.observeScroll = true;
      harness.element.options = Array.from({ length: 10 }, (_, i) => ({ value: `option-${i}`, label: `Option ${i}` }));
      const spyScrolledBottom = vi.fn();
      harness.element.addEventListener(SELECT_CONSTANTS.events.SCROLLED_BOTTOM, spyScrolledBottom);

      await frame();

      harness.element.open = true;
      await frame();

      const scrollElement = harness.element.popupElement!.shadowRoot!.querySelector(POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
      scrollElement.scrollTop = scrollElement.scrollHeight;
      await frame();

      expect(spyScrolledBottom).toHaveBeenCalledOnce();
    });

    it('should set element attributes on options', async () => {
      const options: ISelectOption[] = [
        { label: 'One', value: 1 },
        { label: 'Two', value: 2 },
        { label: 'Three', value: 3, elementAttributes: new Map<string, string>([['data-test-attr', 'test-value']]) }
      ];
      const harness = await createFixture();
      harness.element.options = options;
      expect(harness.element.children[2].getAttribute('data-test-attr')).toBe('test-value');
    });
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();
      expect(harness.element.getAttribute('role')).toBe('combobox');
      expect(harness.element.getAttribute('aria-haspopup')).toBe('true');
      expect(harness.element.getAttribute('aria-expanded')).toBe('false');
      expect(harness.element.tabIndex).toBe(0);
      expect(harness.element.getAttribute('aria-label')).toBe(harness.labelElement?.textContent);
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when open', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await frame();

      expect(harness.element.hasAttribute('open')).toBe(true);
      expect(harness.element.getAttribute('aria-expanded')).toBe('true');
      expect(harness.element.getAttribute('aria-controls')).toBe(harness.popoverElement?.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should set aria-activedescendant when opened via keyboard', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await frame();

      expect(harness.element.hasAttribute('aria-activedescendant')).toBe(false);

      harness.element.focus();
      await harness.pressKey('ArrowDown');
      await frame();
      await harness.popoverToggleAnimation;
      expect(harness.element.getAttribute('aria-activedescendant')).toBe(harness.getListItems()[0].querySelector('button')?.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should update aria-activedescendant when focused', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await frame();

      expect(harness.element.hasAttribute('aria-activedescendant')).toBe(false);

      harness.element.focus();
      await frame();

      await harness.pressKey('ArrowDown');

      const listItems = harness.getListItems();
      expect(harness.element.getAttribute('aria-activedescendant')).toBe(listItems[0].querySelector('button')?.id);
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when required', async () => {
      const harness = await createFixture({ required: true });
      expect(harness.element.getAttribute('aria-required')).toBe('true');
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when invalid', async () => {
      const harness = await createFixture({ invalid: true });
      expect(harness.element.getAttribute('aria-invalid')).toBe('true');
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when multiple', async () => {
      const harness = await createFixture({ multiple: true });
      await expect(harness.element).toBeAccessible();
    });

    it('should be accessible when multiple and open', async () => {
      const harness = await createFixture({ multiple: true });

      harness.element.open = true;
      await frame();

      expect(harness.element.hasAttribute('open')).toBe(true);
      expect(harness.element.getAttribute('aria-expanded')).toBe('true');
      expect(harness.element.getAttribute('aria-controls')).toBe(harness.popoverElement?.id);
      expect(harness.popoverElement?.querySelector('forge-list')?.getAttribute('aria-multiselectable')).toBe('true');
      await expect(harness.element).toBeAccessible();
    });
  });

  describe('open', () => {
    it('should open when clicking select', async () => {
      const harness = await createFixture();

      await harness.clickElement(harness.element);

      expect(harness.element.matches(':focus')).toBe(true);
      expect(harness.element.open).toBe(true);
      expect(harness.popoverElement).toBeTruthy();
      expect(harness.popoverElement?.open).toBe(true);
      expect(harness.fieldElement.popoverExpanded).toBe(true);
    });

    it('should close when clicking select', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await frame();

      await harness.clickElement(harness.element);
      await harness.popoverToggleAnimation;

      expect(harness.element.open).toBe(false);
      expect(harness.popoverElement).toBeFalsy();
      expect(harness.fieldElement.popoverExpanded).toBe(false);
    });

    it('should close when clicking outside', async () => {
      const harness = await createFixture();

      harness.element.open = true;
      await frame();

      await harness.clickOutside();
      await harness.popoverToggleAnimation;

      expect(harness.element.open).toBe(false);
      expect(harness.popoverElement).toBeFalsy();
      expect(harness.fieldElement.popoverExpanded).toBe(false);
    });

    it('should not open when clicking select while disabled', async () => {
      const harness = await createFixture({ disabled: true });

      await harness.clickElement(harness.element, { force: true });

      expect(harness.element.open).toBe(false);
      expect(harness.popoverElement).toBeFalsy();
      expect(harness.fieldElement.popoverExpanded).toBe(false);
    });

    it('should not open dropdown if no options are available', async () => {
      const harness = await createEmptyFixture();

      await harness.clickElement(harness.element);

      expect(harness.element.open).toBe(false);
      expect(harness.popoverElement).toBeFalsy();
      expect(harness.fieldElement.popoverExpanded).toBe(false);
    });
  });

  describe('selection state', () => {
    it('should select an option', async () => {
      const harness = await createFixture();
      await harness.clickElement(harness.element);

      expect(harness.element.value).toBeFalsy();

      await harness.clickElement(harness.getListItems()[0]);
      expect(harness.element.value).toBe('one');
    });

    it('should select multiple options when multiple is true', async () => {
      const harness = await createFixture({ multiple: true });

      await harness.clickElement(harness.element);
      await harness.clickElement(harness.getListItems()[0]);
      await harness.clickElement(harness.getListItems()[1]);

      expect(harness.element.value).toEqual(['one', 'two']);
    });

    it('should deselect an option when multiple is true', async () => {
      const harness = await createFixture({ multiple: true });
      await harness.clickElement(harness.element);
      await harness.clickElement(harness.getListItems()[0]);

      expect(harness.element.value).toEqual(['one']);

      await harness.clickElement(harness.getListItems()[0]);
      expect(harness.element.value).toEqual([]);
    });

    it('should dispatch change event when selecting an option', async () => {
      const harness = await createFixture();
      const spyChange = vi.fn();

      harness.element.addEventListener(BASE_SELECT_CONSTANTS.events.CHANGE, spyChange);

      await harness.clickElement(harness.element);
      await harness.clickElement(harness.getListItems()[0]);

      expect(spyChange).toHaveBeenCalledOnce();
      expect(spyChange.mock.calls[0][0].detail).toBe('one');
    });
  });

  describe('API', () => {
    it('should set placeholder', async () => {
      const harness = await createFixture({ placeholder: 'Test placeholder' });

      expect(harness.selectedTextElement.getAttribute(SELECT_CONSTANTS.attributes.PLACEHOLDER)).toBe('Test placeholder');
      expect(harness.element.placeholder).toBe('Test placeholder');
      expect(harness.element.getAttribute(SELECT_CONSTANTS.attributes.PLACEHOLDER)).toBe('Test placeholder');
    });

    it('should set disabled', async () => {
      const harness = await createFixture({ disabled: true });

      expect(harness.element.tabIndex).toBe(-1);
      expect(harness.element.getAttribute('aria-disabled')).toBe('true');
      expect(harness.element.disabled).toBe(true);
      expect(harness.element.hasAttribute('disabled')).toBe(true);
      expect(harness.fieldElement.disabled).toBe(true);
      await expect(harness.element).toBeAccessible();

      harness.element.disabled = false;

      expect(harness.element.tabIndex).toBe(0);
      expect(harness.element.getAttribute('aria-disabled')).toBeNull();
      expect(harness.element.disabled).toBe(false);
      expect(harness.element.hasAttribute('disabled')).toBe(false);
      expect(harness.fieldElement.disabled).toBe(false);
    });

    it('should set disabled property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('disabled', '');

      expect(harness.element.hasAttribute('disabled')).toBe(true);
      expect(harness.element.disabled).toBe(true);
      expect(harness.fieldElement.disabled).toBe(true);
    });

    it('should set label-position attribute', async () => {
      const harness = await createFixture({ labelPosition: 'block-start' });

      expect(harness.element.labelPosition).toBe('block-start');
      expect(harness.element.getAttribute('label-position')).toBe('block-start');
      expect(harness.fieldElement.labelPosition).toBe('block-start');
    });

    it('should set labelPosition property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('label-position', 'block-start');

      expect(harness.element.labelPosition).toBe('block-start');
      expect(harness.fieldElement.labelPosition).toBe('block-start');
      expect(harness.element.getAttribute('label-position')).toBe('block-start');
    });

    it('should set label-alignment attribute', async () => {
      const harness = await createFixture({ labelAlignment: 'end' });

      expect(harness.element.labelAlignment).toBe('end');
      expect(harness.element.getAttribute('label-alignment')).toBe('end');
      expect(harness.fieldElement.labelAlignment).toBe('end');
    });

    it('should set labelAlignment property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('label-alignment', 'end');

      expect(harness.element.labelAlignment).toBe('end');
      expect(harness.fieldElement.labelAlignment).toBe('end');
      expect(harness.element.getAttribute('label-alignment')).toBe('end');
    });

    it('should set invalid attribute', async () => {
      const harness = await createFixture({ invalid: true });

      expect(harness.element.invalid).toBe(true);
      expect(harness.element.getAttribute('invalid')).toBe('');
      expect(harness.fieldElement.invalid).toBe(true);
      expect(harness.fieldElement.hasAttribute('invalid')).toBe(true);
    });

    it('should set invalid property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('invalid', '');

      expect(harness.element.invalid).toBe(true);
      expect(harness.fieldElement.invalid).toBe(true);
      expect(harness.element.hasAttribute('invalid')).toBe(true);
    });

    it('should set required attribute', async () => {
      const harness = await createFixture({ required: true });

      expect(harness.element.required).toBe(true);
      expect(harness.element.getAttribute('required')).toBe('');
      expect(harness.fieldElement.required).toBe(true);
      expect(harness.fieldElement.hasAttribute('required')).toBe(true);
    });

    it('should set required property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('required', '');

      expect(harness.element.required).toBe(true);
      expect(harness.fieldElement.required).toBe(true);
      expect(harness.element.hasAttribute('required')).toBe(true);
    });

    it('should set optional attribute', async () => {
      const harness = await createFixture({ optional: true });

      expect(harness.element.optional).toBe(true);
      expect(harness.element.getAttribute('optional')).toBe('');
      expect(harness.fieldElement.optional).toBe(true);
      expect(harness.fieldElement.hasAttribute('optional')).toBe(true);
    });

    it('should set optional property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('optional', '');

      expect(harness.element.optional).toBe(true);
      expect(harness.fieldElement.optional).toBe(true);
      expect(harness.element.hasAttribute('optional')).toBe(true);
    });

    it('should set floatLabel attribute', async () => {
      const harness = await createFixture({ floatLabel: true });

      expect(harness.element.floatLabel).toBe(true);
      expect(harness.element.getAttribute('float-label')).toBe('');
      expect(harness.fieldElement.floatLabel).toBe(true);
      expect(harness.fieldElement.hasAttribute('float-label')).toBe(true);
    });

    it('should set floatLabel property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('float-label', '');

      expect(harness.element.floatLabel).toBe(true);
      expect(harness.fieldElement.floatLabel).toBe(true);
      expect(harness.element.hasAttribute('float-label')).toBe(true);
    });

    it('should set variant attribute', async () => {
      const harness = await createFixture({ variant: 'filled' });

      expect(harness.element.variant).toBe('filled');
      expect(harness.element.getAttribute('variant')).toBe('filled');
      expect(harness.fieldElement.variant).toBe('filled');
    });

    it('should set variant property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('variant', 'filled');

      expect(harness.element.variant).toBe('filled');
      expect(harness.fieldElement.variant).toBe('filled');
      expect(harness.element.getAttribute('variant')).toBe('filled');
    });

    it('should set theme attribute', async () => {
      const harness = await createFixture({ theme: 'success' });

      expect(harness.element.theme).toBe('success');
      expect(harness.element.getAttribute('theme')).toBe('success');
      expect(harness.fieldElement.theme).toBe('success');
    });

    it('should set theme property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('theme', 'success');

      expect(harness.element.theme).toBe('success');
      expect(harness.fieldElement.theme).toBe('success');
      expect(harness.element.getAttribute('theme')).toBe('success');
    });

    it('should set shape attribute', async () => {
      const harness = await createFixture({ shape: 'rounded' });

      expect(harness.element.shape).toBe('rounded');
      expect(harness.element.getAttribute('shape')).toBe('rounded');
      expect(harness.fieldElement.shape).toBe('rounded');
    });

    it('should set shape property from attribute', async () => {
      const harness = await createFixture({ shape: 'rounded' });

      expect(harness.element.shape).toBe('rounded');
      expect(harness.fieldElement.shape).toBe('rounded');
      expect(harness.element.getAttribute('shape')).toBe('rounded');
    });

    it('should set density attribute', async () => {
      const harness = await createFixture({ density: 'extra-small' });

      expect(harness.element.density).toBe('extra-small');
      expect(harness.element.getAttribute('density')).toBe('extra-small');
      expect(harness.fieldElement.density).toBe('extra-small');
    });

    it('should set density property from attribute', async () => {
      const harness = await createFixture({ density: 'extra-small' });

      expect(harness.element.density).toBe('extra-small');
      expect(harness.fieldElement.density).toBe('extra-small');
      expect(harness.element.getAttribute('density')).toBe('extra-small');
    });

    it('should set dense attribute', async () => {
      const harness = await createFixture({ dense: true });

      expect(harness.element.dense).toBe(true);
      expect(harness.element.getAttribute('dense')).toBe('');
      expect(harness.fieldElement.dense).toBe(true);
      expect(harness.fieldElement.hasAttribute('dense')).toBe(true);
    });

    it('should set dense property from attribute', async () => {
      const harness = await createFixture({ dense: true });

      expect(harness.element.dense).toBe(true);
      expect(harness.fieldElement.dense).toBe(true);
      expect(harness.element.hasAttribute('dense')).toBe(true);
    });

    it('should set popover-icon attribute', async () => {
      const harness = await createFixture();
      harness.element.popoverIcon = false;

      expect(harness.element.popoverIcon).toBe(false);
      expect(harness.element.hasAttribute('popover-icon')).toBe(false);
      expect(harness.fieldElement.popoverIcon).toBe(false);
      expect(harness.fieldElement.hasAttribute('popover-icon')).toBe(false);
    });

    it('should set popoverIcon property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('popover-icon', 'false');

      expect(harness.element.popoverIcon).toBe(false);
      expect(harness.fieldElement.popoverIcon).toBe(false);
      expect(harness.element.hasAttribute('popover-icon')).toBe(false);
    });

    it('should set support-text-inset attribute', async () => {
      const harness = await createFixture({ supportTextInset: 'start' });

      expect(harness.element.supportTextInset).toBe('start');
      expect(harness.element.getAttribute('support-text-inset')).toBe('start');
      expect(harness.fieldElement.supportTextInset).toBe('start');
    });

    it('should set supportTextInset property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('support-text-inset', 'start');

      expect(harness.element.supportTextInset).toBe('start');
      expect(harness.fieldElement.supportTextInset).toBe('start');
      expect(harness.element.getAttribute('support-text-inset')).toBe('start');
    });
  });

  describe('label', () => {
    it('should set label', async () => {
      const harness = await createFixture({ label: 'Test label' });

      expect(harness.labelElement?.textContent).toBe('Test label');
      expect(harness.element.label).toBe('Test label');
    });

    it('should set label property from attribute', async () => {
      const harness = await createFixture({ label: 'Test label' });
      harness.element.setAttribute('label', 'New label');

      expect(harness.labelElement?.textContent).toBe('New label');
      expect(harness.element.label).toBe('New label');
    });

    it('should set aria-label when label is set', async () => {
      const harness = await createFixture({ label: 'Test label' });

      expect(harness.element.getAttribute('aria-label')).toBe('Test label');
    });

    it('should remove label element when label is not set', async () => {
      const harness = await createFixture({ label: '' });

      expect(harness.labelElement).toBeFalsy();
    });

    it('should change label dynamically', async () => {
      const harness = await createFixture({ label: 'Test label' });
      expect(harness.labelElement?.textContent).toBe('Test label');

      harness.element.label = 'New label';

      expect(harness.labelElement?.textContent).toBe('New label');
      expect(harness.element.getAttribute('aria-label')).toBe('New label');
    });

    it('should hide label when dense', async () => {
      const harness = await createFixture({ dense: true });

      expect(harness.labelElement).toBeFalsy();
    });

    it('should hide label when density is extra-small', async () => {
      const harness = await createFixture({ density: 'extra-small' });

      expect(harness.labelElement).toBeFalsy();
    });

    it('should show label when dense and label position is not inset', async () => {
      const harness = await createFixture({ dense: true, labelPosition: 'block-start' });

      expect(harness.labelElement).toBeTruthy();
    });

    it('should show label when density is extra-small and label position is not inset', async () => {
      const harness = await createFixture({ density: 'extra-small', labelPosition: 'block-start' });

      expect(harness.labelElement).toBeTruthy();
    });

    it('should hide and show label when inset and dense', async () => {
      const harness = await createFixture();

      expect(harness.labelElement).toBeTruthy();

      harness.element.dense = true;
      expect(harness.labelElement).toBeFalsy();

      harness.element.dense = false;
      expect(harness.labelElement).toBeTruthy();
    });
  });

  describe('floating label', () => {
    it('should float label when select has value', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      harness.element.value = 'one';
      await frame();

      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should float label when has placeholder', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      harness.element.placeholder = 'test';
      await frame();

      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should float label when value is set while dropdown is open', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      await harness.clickElement(harness.element);

      expect(harness.element.open).toBe(true);
      expect(harness.fieldElement.floatLabel).toBe(false);

      harness.element.value = 'one';
      await frame();

      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should not float label when select has no value or placeholder', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      await frame();

      expect(harness.fieldElement.floatLabel).toBe(false);
    });

    it('should always float label when floatLabel is true', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      harness.element.floatLabel = true;
      await frame();

      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should float label when select has value and floatLabel is false', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      harness.element.floatLabel = false;
      harness.element.value = 'one';

      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should hide label when setting density to extra-small', async () => {
      const harness = await createFixture();

      expect(harness.labelElement).toBeTruthy();

      harness.element.density = 'extra-small';
      expect(harness.labelElement).toBeFalsy();

      harness.element.density = 'medium';
      expect(harness.labelElement).toBeTruthy();
    });

    it('should hide label when setting dense to true', async () => {
      const harness = await createFixture();

      expect(harness.labelElement).toBeTruthy();

      harness.element.dense = true;
      expect(harness.labelElement).toBeFalsy();

      harness.element.dense = false;
      expect(harness.labelElement).toBeTruthy();
    });
  });

  describe('form association', () => {
    it('should return form element and name', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const selectEl = document.createElement('forge-select');
      selectEl.setAttribute('name', 'test-select');
      form.appendChild(selectEl);

      expect(selectEl.form).toBe(form);
      expect(selectEl.name).toBe('test-select');
      expect(selectEl.labels).toHaveLength(0);

      selectEl.name = 'new-name';
      expect(selectEl.name).toBe('new-name');

      selectEl.name = null as any;
      expect(selectEl.name).toBe('');
    });

    it('should return associated form labels', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const selectEl = document.createElement('forge-select');
      selectEl.setAttribute('id', 'test-select');
      form.appendChild(selectEl);

      const labelText = 'Test label';
      const labelEl = document.createElement('label');
      labelEl.setAttribute('for', 'test-select');
      labelEl.textContent = labelText;
      form.appendChild(labelEl);

      expect(selectEl.labels).toHaveLength(1);
      expect(selectEl.labels[0]).toBe(labelEl);
    });

    it('should set form value when value is set', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const selectEl = document.createElement('forge-select');
      selectEl.setAttribute('name', 'test-select');
      form.appendChild(selectEl);

      let formData = new FormData(form);
      expect(formData.get('test-select')).toBeNull();

      selectEl.value = 'one';
      formData = new FormData(form);
      expect(formData.get('test-select')).toBe('["one"]');
    });

    it('should reset value when form is reset', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const selectEl = document.createElement('forge-select');
      selectEl.setAttribute('name', 'test-select');
      form.appendChild(selectEl);

      selectEl.value = 'one';
      let formData = new FormData(form);
      expect(formData.get('test-select')).toBe('["one"]');

      form.reset();
      formData = new FormData(form);
      expect(formData.get('test-select')).toBeNull();
    });

    it('should restore form state', async () => {
      const screen = render(html`<form name="test-form"></form>`);
      const form = screen.container.querySelector('form') as HTMLFormElement;

      const selectEl = document.createElement('forge-select') as ISelectComponent;
      const setFormValueSpy = vi.spyOn(selectEl, 'setFormValue');
      selectEl.name = 'test-select';
      selectEl.value = 'one';
      form.appendChild(selectEl);

      const [value, state] = setFormValueSpy.mock.calls[0] ?? [null, null];
      const newSelectEl = document.createElement('forge-select') as ISelectComponent;
      newSelectEl.name = 'test-select';
      selectEl.remove();
      form.appendChild(newSelectEl);

      let restoreState: any = state ?? value;
      if (restoreState instanceof FormData) {
        restoreState = Array.from(restoreState.entries());
      }

      newSelectEl.formStateRestoreCallback(restoreState, 'restore');

      expect(newSelectEl.value).toBe('one');
    });

    it('should validate', async () => {
      const screen = render(html`<forge-select required></forge-select>`);
      const el = screen.container.querySelector('forge-select') as ISelectComponent;

      expect(el[internals].validity.valid).toBe(false);
      expect(el[internals].validationMessage).not.toBe('');
      expect(el[internals].checkValidity()).toBe(false);
      expect(el[internals].reportValidity()).toBe(false);

      el.value = 'one';

      expect(el[internals].willValidate).toBe(true);
      expect(el[internals].validity.valid).toBe(true);
      expect(el[internals].validationMessage).toBe('');
      expect(el[internals].checkValidity()).toBe(true);
      expect(el[internals].reportValidity()).toBe(true);
    });

    it('should set custom validity', async () => {
      const screen = render(html`<forge-select required></forge-select>`);
      const el = screen.container.querySelector('forge-select') as ISelectComponent;
      const message = 'Custom error message';

      el[internals].setValidity({ customError: true }, message);

      expect(el[internals].validationMessage).toBe('Custom error message');
    });
  });

  describe('list dropdown API', () => {
    it('should set popover placement', async () => {
      const harness = await createFixture();

      harness.element.popoverPlacement = 'right';

      harness.element.open = true;
      await frame();

      expect(harness.element.popoverPlacement).toBe('right');
      expect(harness.popoverElement?.placement).toBe('right');
    });

    it('should set popover placement from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('popover-placement', 'right');

      harness.element.open = true;
      await frame();

      expect(harness.element.popoverPlacement).toBe('right');
      expect(harness.popoverElement?.placement).toBe('right');
    });

    it('should set popover flip', async () => {
      const harness = await createFixture();

      harness.element.popoverFlip = 'never';

      harness.element.open = true;
      await frame();

      expect(harness.element.popoverFlip).toBe('never');
      expect(harness.popoverElement?.flip).toBe('never');
    });

    it('should set popover flip from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('popover-flip', 'never');

      harness.element.open = true;
      await frame();

      expect(harness.element.popoverFlip).toBe('never');
      expect(harness.popoverElement?.flip).toBe('never');
    });

    it('should set popover shift', async () => {
      const harness = await createFixture();

      harness.element.popoverShift = 'never';

      harness.element.open = true;
      await frame();

      expect(harness.element.popoverShift).toBe('never');
      expect(harness.popoverElement?.shift).toBe('never');
    });

    it('should set popover shift from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('popover-shift', 'never');

      harness.element.open = true;
      await frame();

      expect(harness.element.popoverShift).toBe('never');
      expect(harness.popoverElement?.shift).toBe('never');
    });

    it('should set popover fallback placements', async () => {
      const harness = await createFixture();

      harness.element.popoverFallbackPlacements = ['top'];

      harness.element.open = true;
      await frame();

      expect(harness.element.popoverFallbackPlacements).toEqual(['top']);
      expect(harness.popoverElement?.fallbackPlacements).toEqual(['top']);
    });

    it('should set popover offset', async () => {
      const harness = await createFixture();

      harness.element.popoverOffset = { mainAxis: 10, crossAxis: 10 };

      harness.element.open = true;
      await frame();

      expect(harness.element.popoverOffset).toEqual({ mainAxis: 10, crossAxis: 10 });
      expect(harness.popoverElement?.offset).toEqual({ mainAxis: 10, crossAxis: 10 });
    });
  });

  describe('show select all', () => {
    it('should have showSelectAll property', async () => {
      const harness = await createFixture();

      expect(harness.element.showSelectAll).toBe(false);

      harness.element.showSelectAll = true;
      await frame();

      expect(harness.element.showSelectAll).toBe(true);
    });

    it('should set show-select-all attribute when showSelectAll is true', async () => {
      const harness = await createFixture({ showSelectAll: true });

      expect(harness.element.hasAttribute('show-select-all')).toBe(true);
    });

    it('should only show select all option when multiple is true and showSelectAll is true', async () => {
      const harness = await createFixture({ multiple: true, showSelectAll: true });

      harness.element.open = true;
      await frame();

      const listItems = harness.getListItems();
      expect(listItems.length).toBeGreaterThan(3);

      const firstItem = listItems[0];
      const button = firstItem.querySelector('button');
      expect(button?.textContent?.trim()).toBe('Select All');
    });

    it('should not show select all option when multiple is false', async () => {
      const harness = await createFixture({ multiple: false, showSelectAll: true });

      harness.element.open = true;
      await frame();

      const listItems = harness.getListItems();
      expect(listItems.length).toBe(3);

      const firstItem = listItems[0];
      const button = firstItem.querySelector('button');
      expect(button?.textContent?.trim()).not.toBe('Select All');
    });

    it('should dispatch forge-select-all event when select all is clicked', async () => {
      const harness = await createFixture({ multiple: true, showSelectAll: true });
      let eventDetail: any;

      harness.element.addEventListener('forge-select-all', (e: any) => {
        eventDetail = e.detail;
      });

      harness.element.open = true;
      await frame();

      const listItems = harness.getListItems();
      const selectAllButton = listItems[0].querySelector('button') as HTMLButtonElement;

      await harness.clickElement(selectAllButton);

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.value).toEqual(['one', 'two', 'three']);
      expect(eventDetail.isAllSelected).toBe(true);
    });

    it('should select all options when select all is clicked while none selected', async () => {
      const harness = await createFixture({ multiple: true, showSelectAll: true });

      harness.element.open = true;
      await frame();

      const listItems = harness.getListItems();
      const selectAllButton = listItems[0].querySelector('button') as HTMLButtonElement;

      expect(harness.element.value).toEqual([]);

      await harness.clickElement(selectAllButton);
      await frame();

      expect(harness.element.value).toEqual(['one', 'two', 'three']);
    });

    it('should deselect all options when select all is clicked while all selected', async () => {
      const harness = await createFixture({ multiple: true, showSelectAll: true });

      harness.element.value = ['one', 'two', 'three'];
      await frame();

      harness.element.open = true;
      await frame();

      const listItems = harness.getListItems();
      const selectAllButton = listItems[0].querySelector('button') as HTMLButtonElement;

      await harness.clickElement(selectAllButton);
      await frame();

      expect(harness.element.value).toEqual([]);
    });

    it('should have selectAllLabel property', async () => {
      const harness = await createFixture();

      expect(harness.element.selectAllLabel).toBeUndefined();

      harness.element.selectAllLabel = 'Custom Select All';
      await frame();

      expect(harness.element.selectAllLabel).toBe('Custom Select All');
    });

    it('should set select-all-label attribute when selectAllLabel is set', async () => {
      const harness = await createFixture({ selectAllLabel: 'Custom Select All' });

      expect(harness.element.getAttribute('select-all-label')).toBe('Custom Select All');
    });

    it('should use custom select all label in dropdown', async () => {
      const harness = await createFixture({
        multiple: true,
        showSelectAll: true,
        selectAllLabel: 'Tout sélectionner'
      });

      harness.element.open = true;
      await frame();

      const listItems = harness.getListItems();
      expect(listItems.length).toBeGreaterThan(3);

      const firstItem = listItems[0];
      const button = firstItem.querySelector('button');
      expect(button?.textContent?.trim()).toBe('Tout sélectionner');
    });

    it('should use default select all label when selectAllLabel is not set', async () => {
      const harness = await createFixture({ multiple: true, showSelectAll: true });

      harness.element.open = true;
      await frame();

      const listItems = harness.getListItems();
      const firstItem = listItems[0];
      const button = firstItem.querySelector('button');
      expect(button?.textContent?.trim()).toBe('Select All');
    });

    it('should update select all label dynamically', async () => {
      const harness = await createFixture({ multiple: true, showSelectAll: true });

      harness.element.open = true;
      await frame();

      let listItems = harness.getListItems();
      let firstItem = listItems[0];
      let button = firstItem.querySelector('button');
      expect(button?.textContent?.trim()).toBe('Select All');

      harness.element.open = false;
      await frame();

      harness.element.selectAllLabel = 'Choose All Items';
      await frame();

      harness.element.open = true;
      await frame();

      listItems = harness.getListItems();
      firstItem = listItems[0];
      button = firstItem.querySelector('button');
      expect(button?.textContent?.trim()).toBe('Choose All Items');
    });
  });
});

class SelectHarness extends TestHarness<ISelectComponent> {
  public fieldElement: IFieldComponent;
  public selectedTextElement: HTMLElement;

  public get labelElement(): HTMLLabelElement | null {
    return getShadowElement(this.element, SELECT_CONSTANTS.selectors.LABEL) as HTMLLabelElement;
  }

  constructor(el: ISelectComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.fieldElement = getShadowElement(this.element, FIELD_CONSTANTS.elementName) as IFieldComponent;
    this.selectedTextElement = getShadowElement(this.element, SELECT_CONSTANTS.selectors.SELECTED_TEXT) as HTMLElement;
  }

  public get popoverElement(): IPopoverComponent | undefined {
    return this.element.popupElement;
  }

  public get popoverToggleAnimation(): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, 200));
  }

  public getListItems(): HTMLElement[] {
    return Array.from(this.popoverElement?.querySelectorAll('forge-list-item') ?? []);
  }

  public async clickElement(el: HTMLElement, options?: { force?: boolean }): Promise<void> {
    await userEvent.click(el, options);
  }

  public async clickOutside(): Promise<void> {
    await userEvent.click(document.body, { position: { x: 0, y: 0 } });
  }

  public async pressKey(key: string): Promise<void> {
    await userEvent.keyboard(`{${key}}`);
  }
}

interface SelectFixtureConfig {
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  showSelectAll?: boolean;
  selectAllLabel?: string;
  labelPosition?: FieldLabelPosition;
  labelAlignment?: FieldLabelAlignment;
  invalid?: boolean;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  floatLabel?: boolean;
  variant?: FieldVariant;
  theme?: FieldTheme;
  shape?: FieldShape;
  density?: FieldDensity;
  dense?: boolean;
  supportTextInset?: FieldSupportTextInset;
}

async function createFixture({
  label = 'Test label',
  placeholder,
  multiple,
  showSelectAll,
  selectAllLabel,
  labelPosition,
  labelAlignment,
  invalid,
  required,
  optional,
  disabled,
  floatLabel,
  variant,
  theme,
  shape,
  density,
  dense,
  supportTextInset
}: SelectFixtureConfig = {}): Promise<SelectHarness> {
  const screen = render(html`
    <forge-select
      id="my-test-id"
      style="margin-top: 10px;"
      .label=${label}
      placeholder=${placeholder ?? ''}
      ?multiple=${multiple}
      ?show-select-all=${showSelectAll}
      select-all-label=${ifDefined(selectAllLabel)}
      label-position=${ifDefined(labelPosition)}
      label-alignment=${ifDefined(labelAlignment)}
      ?invalid=${invalid}
      ?required=${required}
      ?optional=${optional}
      ?disabled=${disabled}
      ?float-label=${floatLabel}
      variant=${ifDefined(variant)}
      theme=${ifDefined(theme)}
      shape=${ifDefined(shape)}
      density=${ifDefined(density)}
      ?dense=${dense}
      support-text-inset=${ifDefined(supportTextInset)}>
      <forge-option value="one">Option 1</forge-option>
      <forge-option value="two">Option 2</forge-option>
      <forge-option value="three">Option 3</forge-option>
    </forge-select>
  `);
  const el = screen.container.querySelector('forge-select') as ISelectComponent;
  return new SelectHarness(el);
}

async function createEmptyFixture(): Promise<SelectHarness> {
  const screen = render(html`<forge-select></forge-select>`);
  const el = screen.container.querySelector('forge-select') as ISelectComponent;
  return new SelectHarness(el);
}
