import { expect } from '@esm-bundle/chai';
import { nothing } from 'lit-html';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { tick } from '@tylertech/forge-testing';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import { spy } from 'sinon';
import { ISelectComponent } from './select';
import { TestHarness } from '../../../test/utils/test-harness';
import { FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldShape, FieldSupportTextInset, FieldTheme, FieldVariant, FIELD_CONSTANTS, IFieldComponent } from '../../field';
import { BASE_SELECT_CONSTANTS } from '../core';
import { IPopoverComponent, POPOVER_CONSTANTS } from '../../popover';
import { SELECT_CONSTANTS } from './select-constants';

import './select';

describe('Select', () => {
  describe('base', () => {
    it('should contain shadow root', async () => {
      const harness = await createFixture();

      expect(harness.element.shadowRoot).not.to.be.null;
    });

    it('should initialize field', async () => {
      const harness = await createFixture();

      expect(harness.fieldElement).to.be.ok;
      expect(harness.fieldElement.shadowRoot).to.be.ok;
    });

    it('should instantiate field before connected to DOM', async () => {
      const selectEl = document.createElement('forge-select');
      const fieldEl = selectEl.shadowRoot?.querySelector('forge-field');

      expect(fieldEl).to.be.ok;
      expect(fieldEl?.shadowRoot).to.be.ok;
    });

    it('should focus element when clicking field', async () => {
      const harness = await createFixture();

      expect(harness.element.matches(':focus')).to.be.false;

      await harness.clickElement(harness.element);

      expect(harness.element.matches(':focus')).to.be.true;
    });

    it('should ignore clicks originating from field accessory slot', async () => {
      const harness = await createFixture();
      const accessoryEl = document.createElement('button');
      accessoryEl.slot = 'accessory';
      harness.element.appendChild(accessoryEl);

      await elementUpdated(harness.element);
      expect(harness.element.matches(':focus')).to.be.false;

      await harness.clickElement(accessoryEl);

      expect(harness.element.matches(':focus')).to.be.false;
      expect(harness.element.open).to.be.false;
    });

    it('should not focus field when disabled', async () => {
      const harness = await createFixture({ disabled: true });

      expect(harness.element.matches(':focus')).to.be.false;

      await harness.clickElement(harness.element);

      expect(harness.element.matches(':focus')).to.be.false;
    });

    it('should have correct default state', async () => {
      const harness = await createFixture();

      expect(harness.element.open).to.be.false;
      expect(harness.element.value).to.be.undefined;
      expect(harness.element.label).to.be.equal(harness.labelElement?.textContent);
      expect(harness.element.placeholder).to.be.empty;
      expect(harness.element.multiple).to.be.false;
      expect(harness.element.disabled).to.be.false;
      expect(harness.element.labelPosition).to.equal(FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION);
      expect(harness.element.labelAlignment).to.equal(FIELD_CONSTANTS.defaults.DEFAULT_LABEL_ALIGNMENT);
      expect(harness.element.invalid).to.be.false;
      expect(harness.element.required).to.be.false;
      expect(harness.element.optional).to.be.false;
      expect(harness.element.disabled).to.be.false;
      expect(harness.element.floatLabel).to.be.false;
      expect(harness.element.variant).to.equal(FIELD_CONSTANTS.defaults.DEFAULT_VARIANT);
      expect(harness.element.theme).to.equal(FIELD_CONSTANTS.defaults.DEFAULT_THEME);
      expect(harness.element.shape).to.equal(FIELD_CONSTANTS.defaults.DEFAULT_SHAPE);
      expect(harness.element.density).to.equal(FIELD_CONSTANTS.defaults.DEFAULT_DENSITY);
      expect(harness.element.dense).to.be.false;
      expect(harness.element.popoverIcon).to.be.true;
      expect(harness.element.supportTextInset).to.equal(FIELD_CONSTANTS.defaults.DEFAULT_SUPPORT_TEXT_INSET);
    });

    it('should dispatch scrolled bottom event when scrolling to bottom of dropdown', async () => {
      const harness = await createFixture();

      harness.element.observeScroll = true;
      harness.element.options = Array.from({ length: 10 }, (_, i) => ({ value: `option-${i}`, label: `Option ${i}` }));
      
      const spyScrolledBottom = spy();
      harness.element.addEventListener(SELECT_CONSTANTS.events.SCROLLED_BOTTOM, spyScrolledBottom);

      await elementUpdated(harness.element);

      harness.element.open = true;
      await elementUpdated(harness.element);

      const scrollElement = harness.element.popupElement!.shadowRoot!.querySelector(POPOVER_CONSTANTS.selectors.SURFACE) as HTMLElement;
      scrollElement.scrollTop = scrollElement.scrollHeight;
      await tick();

      expect(spyScrolledBottom.calledOnce).to.be.true;
    });
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const harness = await createFixture();
  
      expect(harness.element.getAttribute('role')).to.equal('combobox');
      expect(harness.element.getAttribute('aria-haspopup')).to.equal('true');
      expect(harness.element.getAttribute('aria-expanded')).to.equal('false');
      expect(harness.element.tabIndex).to.equal(0);
      expect(harness.element.getAttribute('aria-label')).to.equal(harness.labelElement?.textContent);
      await expect(harness.element).to.be.accessible();
    });
  
    it('should be accessible when open', async () => {
      const harness = await createFixture();
  
      harness.element.open = true;
      await tick();
  
      expect(harness.element.hasAttribute('open')).to.be.true;
      expect(harness.element.getAttribute('aria-expanded')).to.equal('true');
      expect(harness.element.getAttribute('aria-controls')).to.equal(harness.popoverElement?.id);
      await expect(document.body).to.be.accessible({ ignoredRules: ['region'] });
    });
  
    it('should set aria-activedescendant when opened via keyboard', async () => {
      const harness = await createFixture();
  
      harness.element.open = true;
      await tick();
  
      expect(harness.element.hasAttribute('aria-activedescendant')).to.be.false;
  
      harness.element.focus();
      harness.pressKey('ArrowDown');
      await elementUpdated(harness.element);
      await harness.popoverToggleAnimation;
  
      expect(harness.element.getAttribute('aria-activedescendant')).to.equal(harness.getListItems()[0].querySelector('button')?.id);
      await expect(document.body).to.be.accessible({ ignoredRules: ['region'] });
    });

    it('should update aria-activedescendant when focused', async () => {
      const harness = await createFixture();
  
      harness.element.open = true;
      await tick();
  
      expect(harness.element.hasAttribute('aria-activedescendant')).to.be.false;
  
      harness.element.focus();
      await tick();
  
      await harness.pressKey('ArrowDown');
  
      const listItems = harness.getListItems();
      expect(harness.element.getAttribute('aria-activedescendant')).to.equal(listItems[0].querySelector('button')?.id);
      await expect(document.body).to.be.accessible({ ignoredRules: ['region'] });
    });

    it('should be accessible when required', async () => {
      const harness = await createFixture({ required: true });
  
      expect(harness.element.getAttribute('aria-required')).to.equal('true');
      await expect(harness.element).to.be.accessible();
    });

    it('should be accessible when invalid', async () => {
      const harness = await createFixture({ invalid: true });
  
      expect(harness.element.getAttribute('aria-invalid')).to.equal('true');
      await expect(harness.element).to.be.accessible();
    });

    it('should be accessible when multiple', async () => {
      const harness = await createFixture({ multiple: true });
  
      await expect(harness.element).to.be.accessible();
    });

    it('should be accessible when multiple and open', async () => {
      const harness = await createFixture({ multiple: true });
  
      harness.element.open = true;
      await tick();
  
      expect(harness.element.hasAttribute('open')).to.be.true;
      expect(harness.element.getAttribute('aria-expanded')).to.equal('true');
      expect(harness.element.getAttribute('aria-controls')).to.equal(harness.popoverElement?.id);
      await expect(harness.element).to.be.accessible();
    });
  });

  describe('open', () => {
    it('should open when clicking select', async () => {
      const harness = await createFixture();
  
      await harness.clickElement(harness.element);
  
      expect(harness.element.matches(':focus')).to.be.true;
      expect(harness.element.open).to.be.true;
      expect(harness.popoverElement).to.exist;
      expect(harness.popoverElement?.open).to.be.true;
      expect(harness.fieldElement.popoverExpanded).to.be.true;
    });
  
    it('should close when clicking select', async () => {
      const harness = await createFixture();
  
      harness.element.open = true;
      await tick();
  
      await harness.clickElement(harness.element);
      await harness.popoverToggleAnimation;
  
      expect(harness.element.open).to.be.false;
      expect(harness.popoverElement).not.to.exist;
      expect(harness.fieldElement.popoverExpanded).to.be.false;
    });
  
    it('should close when clicking outside', async () => {
      const harness = await createFixture();
  
      harness.element.open = true;
      await tick();
  
      await harness.clickOutside();
      await harness.popoverToggleAnimation;
  
      expect(harness.element.open).to.be.false;
      expect(harness.popoverElement).not.to.exist;
      expect(harness.fieldElement.popoverExpanded).to.be.false;
    });
  
    it('should not open when clicking select while disabled', async () => {
      const harness = await createFixture({ disabled: true });
  
      await harness.clickElement(harness.element);
  
      expect(harness.element.open).to.be.false;
      expect(harness.popoverElement).not.to.exist;
      expect(harness.fieldElement.popoverExpanded).to.be.false;
    });

    it('should not open dropdown if no options are available', async () => {
      const harness = await createEmptyFixture();

      await harness.clickElement(harness.element);

      expect(harness.element.open).to.be.false;
      expect(harness.popoverElement).not.to.exist;
      expect(harness.fieldElement.popoverExpanded).to.be.false;
    });
  });

  describe('selection state', () => {
    it('should select an option', async () => {
      const harness = await createFixture();
  
      await harness.clickElement(harness.element);

      expect(harness.element.value).not.to.be.ok;

      await harness.clickElement(harness.getListItems()[0]);
  
      expect(harness.element.value).to.equal('one');
    });

    it('should select multiple options when multiple is true', async () => {
      const harness = await createFixture({ multiple: true });
  
      await harness.clickElement(harness.element);
      await harness.clickElement(harness.getListItems()[0]);
      await harness.clickElement(harness.getListItems()[1]);
  
      expect(harness.element.value).to.deep.equal(['one', 'two']);  
    });

    it('should deselect an option when multiple is true', async () => {
      const harness = await createFixture({ multiple: true });
  
      await harness.clickElement(harness.element);
      await harness.clickElement(harness.getListItems()[0]);

      expect(harness.element.value).to.deep.equal(['one']);

      await harness.clickElement(harness.getListItems()[0]);
  
      expect(harness.element.value).to.deep.equal([]);
    });

    it('should dispatch change event when selecting an option', async () => {
      const harness = await createFixture();
      const spyChange = spy();
  
      harness.element.addEventListener(BASE_SELECT_CONSTANTS.events.CHANGE, spyChange);
  
      await harness.clickElement(harness.element);
      await harness.clickElement(harness.getListItems()[0]);
  
      expect(spyChange.calledOnce).to.be.true;
      expect(spyChange.firstCall.args[0].detail).to.equal('one');
    });
  });

  describe('API', () => {
    it('should set placeholder', async () => {
      const harness = await createFixture({ placeholder: 'Test placeholder' });

      expect(harness.selectedTextElement.getAttribute(SELECT_CONSTANTS.attributes.PLACEHOLDER)).to.equal('Test placeholder');
      expect(harness.element.placeholder).to.equal('Test placeholder');
      expect(harness.element.getAttribute(SELECT_CONSTANTS.attributes.PLACEHOLDER)).to.equal('Test placeholder');
    });

    it('should set disabled', async () => {
      const harness = await createFixture({ disabled: true });

      expect(harness.element.tabIndex).to.equal(-1);
      expect(harness.element.getAttribute('aria-disabled')).to.equal('true');
      expect(harness.element.disabled).to.be.true;
      expect(harness.element.hasAttribute('disabled')).to.be.true;
      expect(harness.fieldElement.disabled).to.be.true;
      await expect(harness.element).to.be.accessible();

      harness.element.disabled = false;

      expect(harness.element.tabIndex).to.equal(0);
      expect(harness.element.getAttribute('aria-disabled')).to.be.null;
      expect(harness.element.disabled).to.be.false;
      expect(harness.element.hasAttribute('disabled')).to.be.false;
      expect(harness.fieldElement.disabled).to.be.false;
    });

    it('should set disabled property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('disabled', '');

      expect(harness.element.hasAttribute('disabled')).to.be.true;
      expect(harness.element.disabled).to.be.true;
      expect(harness.fieldElement.disabled).to.be.true;
    });

    it('should set label-position attribute', async () => {
      const harness = await createFixture({ labelPosition: 'block-start' });

      expect(harness.element.labelPosition).to.equal('block-start');
      expect(harness.element.getAttribute('label-position')).to.equal('block-start');
      expect(harness.fieldElement.labelPosition).to.equal('block-start');
    });

    it('should set labelPosition property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('label-position', 'block-start');

      expect(harness.element.labelPosition).to.equal('block-start');
      expect(harness.fieldElement.labelPosition).to.equal('block-start');
      expect(harness.element.getAttribute('label-position')).to.equal('block-start');
    });

    it('should set label-alignment attribute', async () => {
      const harness = await createFixture({ labelAlignment: 'end' });

      expect(harness.element.labelAlignment).to.equal('end');
      expect(harness.element.getAttribute('label-alignment')).to.equal('end');
      expect(harness.fieldElement.labelAlignment).to.equal('end');
    });

    it('should set labelAlignment property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('label-alignment', 'end');

      expect(harness.element.labelAlignment).to.equal('end');
      expect(harness.fieldElement.labelAlignment).to.equal('end');
      expect(harness.element.getAttribute('label-alignment')).to.equal('end');
    });

    it('should set invalid attribute', async () => {
      const harness = await createFixture({ invalid: true });

      expect(harness.element.invalid).to.be.true;
      expect(harness.element.getAttribute('invalid')).to.equal('');
      expect(harness.fieldElement.invalid).to.be.true;
      expect(harness.fieldElement.hasAttribute('invalid')).to.be.true;
    });

    it('should set invalid property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('invalid', '');

      expect(harness.element.invalid).to.be.true;
      expect(harness.fieldElement.invalid).to.be.true;
      expect(harness.element.hasAttribute('invalid')).to.be.true;
    });

    it('should set required attribute', async () => {
      const harness = await createFixture({ required: true });

      expect(harness.element.required).to.be.true;
      expect(harness.element.getAttribute('required')).to.equal('');
      expect(harness.fieldElement.required).to.be.true;
      expect(harness.fieldElement.hasAttribute('required')).to.be.true;
    });

    it('should set required property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('required', '');

      expect(harness.element.required).to.be.true;
      expect(harness.fieldElement.required).to.be.true;
      expect(harness.element.hasAttribute('required')).to.be.true;
    });

    it('should set optional attribute', async () => {
      const harness = await createFixture({ optional: true });

      expect(harness.element.optional).to.be.true;
      expect(harness.element.getAttribute('optional')).to.equal('');
      expect(harness.fieldElement.optional).to.be.true;
      expect(harness.fieldElement.hasAttribute('optional')).to.be.true;
    });

    it('should set optional property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('optional', '');

      expect(harness.element.optional).to.be.true;
      expect(harness.fieldElement.optional).to.be.true;
      expect(harness.element.hasAttribute('optional')).to.be.true;
    });

    it('should set floatLabel attribute', async () => {
      const harness = await createFixture({ floatLabel: true });

      expect(harness.element.floatLabel).to.be.true;
      expect(harness.element.getAttribute('float-label')).to.equal('');
      expect(harness.fieldElement.floatLabel).to.be.true;
      expect(harness.fieldElement.hasAttribute('float-label')).to.be.true;
    });

    it('should set floatLabel property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('float-label', '');

      expect(harness.element.floatLabel).to.be.true;
      expect(harness.fieldElement.floatLabel).to.be.true;
      expect(harness.element.hasAttribute('float-label')).to.be.true;
    });

    it('should set variant attribute', async () => {
      const harness = await createFixture({ variant: 'filled' });

      expect(harness.element.variant).to.equal('filled');
      expect(harness.element.getAttribute('variant')).to.equal('filled');
      expect(harness.fieldElement.variant).to.equal('filled');
    });

    it('should set variant property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('variant', 'filled');

      expect(harness.element.variant).to.equal('filled');
      expect(harness.fieldElement.variant).to.equal('filled');
      expect(harness.element.getAttribute('variant')).to.equal('filled');
    });

    it('should set theme attribute', async () => {
      const harness = await createFixture({ theme: 'success' });

      expect(harness.element.theme).to.equal('success');
      expect(harness.element.getAttribute('theme')).to.equal('success');
      expect(harness.fieldElement.theme).to.equal('success');
    });

    it('should set theme property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('theme', 'success');

      expect(harness.element.theme).to.equal('success');
      expect(harness.fieldElement.theme).to.equal('success');
      expect(harness.element.getAttribute('theme')).to.equal('success');
    });

    it('should set shape attribute', async () => {
      const harness = await createFixture({ shape: 'rounded' });

      expect(harness.element.shape).to.equal('rounded');
      expect(harness.element.getAttribute('shape')).to.equal('rounded');
      expect(harness.fieldElement.shape).to.equal('rounded');
    });

    it('should set shape property from attribute', async () => {
      const harness = await createFixture({ shape: 'rounded' });

      expect(harness.element.shape).to.equal('rounded');
      expect(harness.fieldElement.shape).to.equal('rounded');
      expect(harness.element.getAttribute('shape')).to.equal('rounded');
    });

    it('should set density attribute', async () => {
      const harness = await createFixture({ density: 'extra-small' });

      expect(harness.element.density).to.equal('extra-small');
      expect(harness.element.getAttribute('density')).to.equal('extra-small');
      expect(harness.fieldElement.density).to.equal('extra-small');
    });

    it('should set density property from attribute', async () => {
      const harness = await createFixture({ density: 'extra-small' });

      expect(harness.element.density).to.equal('extra-small');
      expect(harness.fieldElement.density).to.equal('extra-small');
      expect(harness.element.getAttribute('density')).to.equal('extra-small');
    });

    it('should set dense attribute', async () => {
      const harness = await createFixture({ dense: true });

      expect(harness.element.dense).to.be.true;
      expect(harness.element.getAttribute('dense')).to.equal('');
      expect(harness.fieldElement.dense).to.be.true;
      expect(harness.fieldElement.hasAttribute('dense')).to.be.true;
    });

    it('should set dense property from attribute', async () => {
      const harness = await createFixture({ dense: true });

      expect(harness.element.dense).to.be.true;
      expect(harness.fieldElement.dense).to.be.true;
      expect(harness.element.hasAttribute('dense')).to.be.true;
    });

    it('should set popover-icon attribute', async () => {
      const harness = await createFixture();
      harness.element.popoverIcon = false;

      expect(harness.element.popoverIcon).to.be.false;
      expect(harness.element.hasAttribute('popover-icon')).to.be.false;
      expect(harness.fieldElement.popoverIcon).to.be.false;
      expect(harness.fieldElement.hasAttribute('popover-icon')).to.be.false;
    });

    it('should set popoverIcon property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('popover-icon', 'false');

      expect(harness.element.popoverIcon).to.be.false;
      expect(harness.fieldElement.popoverIcon).to.be.false;
      expect(harness.element.hasAttribute('popover-icon')).to.be.false;
    });

    it('should set support-text-inset attribute', async () => {
      const harness = await createFixture({ supportTextInset: 'start' });

      expect(harness.element.supportTextInset).to.equal('start');
      expect(harness.element.getAttribute('support-text-inset')).to.equal('start');
      expect(harness.fieldElement.supportTextInset).to.equal('start');
    });

    it('should set supportTextInset property from attribute', async () => {
      const harness = await createFixture();

      harness.element.setAttribute('support-text-inset', 'start');

      expect(harness.element.supportTextInset).to.equal('start');
      expect(harness.fieldElement.supportTextInset).to.equal('start');
      expect(harness.element.getAttribute('support-text-inset')).to.equal('start');
    });
  });

  describe('label', () => {
    it('should set label', async () => {
      const harness = await createFixture({ label: 'Test label' });

      expect(harness.labelElement?.textContent).to.equal('Test label');
      expect(harness.element.label).to.equal('Test label');
    });

    it('should set label property from attribute', async () => {
      const harness = await createFixture({ label: 'Test label' });
      harness.element.setAttribute('label', 'New label');

      expect(harness.labelElement?.textContent).to.equal('New label');
      expect(harness.element.label).to.equal('New label');
    });

    it('should set aria-label when label is set', async () => {
      const harness = await createFixture({ label: 'Test label' });

      expect(harness.element.getAttribute('aria-label')).to.equal('Test label');
    });

    it('should remove label element when label is not set', async () => {
      const harness = await createFixture({ label: '' });

      expect(harness.labelElement).not.to.be.ok;
    });

    it('should change label dynamically', async () => {
      const harness = await createFixture({ label: 'Test label' });
      
      expect(harness.labelElement?.textContent).to.equal('Test label');

      harness.element.label = 'New label';

      expect(harness.labelElement?.textContent).to.equal('New label');
      expect(harness.element.getAttribute('aria-label')).to.equal('New label');
    });

    it('should hide label when dense', async () => {
      const harness = await createFixture({ dense: true });

      expect(harness.labelElement).not.to.be.ok;
    });

    it('should hide label when density is extra-small', async () => {
      const harness = await createFixture({ density: 'extra-small' });

      expect(harness.labelElement).not.to.be.ok;
    });

    it('should show label when dense and label position is not inset', async () => {
      const harness = await createFixture({ dense: true, labelPosition: 'block-start' });

      expect(harness.labelElement).to.be.ok;
    });

    it('should show label when density is extra-small and label position is not inset', async () => {
      const harness = await createFixture({ density: 'extra-small', labelPosition: 'block-start' });

      expect(harness.labelElement).to.be.ok;
    });

    it('should hide and show label when inset and dense', async () => {
      const harness = await createFixture();

      expect(harness.labelElement).to.be.ok;

      harness.element.dense = true;
      expect(harness.labelElement).not.to.be.ok;

      harness.element.dense = false;
      expect(harness.labelElement).to.be.ok;
    });
  });

  describe('floating label', () => {
    it('should float label when select has value', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      harness.element.value = 'one';
      await tick();

      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should float label when has placeholder', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      harness.element.placeholder = 'test';
      await tick();

      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should not float label when select has no value or placeholder', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      await tick();

      expect(harness.fieldElement.floatLabel).to.be.false;
    });

    it('should always float label when floatLabel is true', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      harness.element.floatLabel = true;
      await tick();

      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should float label when select has value and floatLabel is false', async () => {
      const harness = await createFixture();

      harness.element.labelPosition = 'inset';
      harness.element.floatLabel = false;
      harness.element.value = 'one';

      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should hide label when setting density to extra-small', async () => {
      const harness = await createFixture();

      expect(harness.labelElement).to.be.ok;

      harness.element.density = 'extra-small';
      expect(harness.labelElement).not.to.be.ok;

      harness.element.density = 'medium';
      expect(harness.labelElement).to.be.ok;
    });

    it('should hide label when setting dense to true', async () => {
      const harness = await createFixture();

      expect(harness.labelElement).to.be.ok;

      harness.element.dense = true;
      expect(harness.labelElement).not.to.be.ok;

      harness.element.dense = false;
      expect(harness.labelElement).to.be.ok;
    });
  });
});

class SelectHarness extends TestHarness<ISelectComponent> {
  public fieldElement: IFieldComponent;
  public selectedTextElement: HTMLElement;

  public get labelElement(): HTMLLabelElement | null {
    return getShadowElement(this.element, 'label') as HTMLLabelElement;
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

  public async clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height} = el.getBoundingClientRect();
    await sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2)
    ]});
  }

  public async clickOutside(): Promise<void> {
    await sendMouse({ type: 'click', position: [0, 0]});
  }

  public async pressKey(key: string): Promise<void> {
    await sendKeys({ press: key });
  }
}

interface SelectFixtureConfig {
  label?: string;
  placeholder?: string;
  multiple?: boolean;
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
  const el = await fixture<ISelectComponent>(html`
    <forge-select
      id="my-test-id"
      style="margin-top: 10px;"
      label=${label}
      placeholder=${placeholder}
      ?multiple=${multiple}
      .labelPosition=${labelPosition ?? nothing}
      .labelAlignment=${labelAlignment ?? nothing}
      ?invalid=${invalid}
      ?required=${required}
      ?optional=${optional}
      ?disabled=${disabled}
      ?float-label=${floatLabel}
      .variant=${variant ?? nothing}
      .theme=${theme ?? nothing}
      .shape=${shape ?? nothing}
      .density=${density ?? nothing}
      ?dense=${dense}
      .supportTextInset=${supportTextInset ?? nothing}>
      <forge-option value="one">Option 1</forge-option>
      <forge-option value="two">Option 2</forge-option>
      <forge-option value="three">Option 3</forge-option>
    </forge-select>
  `);
  return new SelectHarness(el);
}

async function createEmptyFixture(): Promise<SelectHarness> {
  const el = await fixture<ISelectComponent>(html`<forge-select></forge-select>`);
  return new SelectHarness(el);
}
