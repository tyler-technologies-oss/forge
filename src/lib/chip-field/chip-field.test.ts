import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import { nothing } from 'lit';
import { IChipFieldComponent } from './chip-field';
import {
  BASE_FIELD_CONSTANTS,
  FieldDensity,
  FieldLabelAlignment,
  FieldLabelPosition,
  FieldShape,
  FieldSupportTextInset,
  FieldTheme,
  FieldVariant,
  FIELD_CONSTANTS,
  IFieldComponent
} from '../field';
import { getShadowElement } from '@tylertech/forge-core';

import './chip-field';
import { CHIP_FIELD_CONSTANTS } from './chip-field-constants';
import { IChipComponent } from '../chips';
import { LABEL_CONSTANTS } from '../label/label-constants';
import { timer } from '@tylertech/forge-testing';

describe('Chip Field', () => {
  it('should use shadow DOM', async () => {
    const harness = await createFixture();

    expect(harness.chipField.shadowRoot).to.exist;
  });

  it('should be accessible', async () => {
    const harness = await createFixture();

    await expect(harness.chipField).to.be.accessible();
  });

  it('should be accessible with chips', async () => {
    const harness = await createFixture({ hasChips: true });
    await timer(200); // Wait for the field animation to complete
    await expect(harness.chipField).to.be.accessible();
  });

  it('should have expected default values', async () => {
    const harness = await createFixture();

    expect(harness.chipField.addOnBlur).to.be.false;
  });

  it('should set addOnBlur via attribute', async () => {
    const harness = await createFixture({ addOnBlur: true });

    expect(harness.chipField.addOnBlur).to.be.true;
    expect(harness.chipField.hasAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_ON_BLUR)).to.be.true;
  });

  it('should set addOnBlur via property', async () => {
    const harness = await createFixture();

    harness.chipField.addOnBlur = true;

    expect(harness.chipField.addOnBlur).to.be.true;
    expect(harness.chipField.hasAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_ON_BLUR)).to.be.true;
  });

  describe('events', () => {
    it('should dispatch member added event when pressing enter key if value exists', async () => {
      const harness = await createFixture();
      const memberAddedSpy = sinon.spy();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, memberAddedSpy);

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await sendKeys({ press: 'Enter' });

      expect(memberAddedSpy).to.have.been.calledOnce;
      expect(memberAddedSpy.calledWith(new CustomEvent(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, { detail: 'New Chip' }))).to.be.true;
    });

    it('should not dispatch member added event when pressing enter key if value does not exist', async () => {
      const harness = await createFixture();
      const memberAddedSpy = sinon.spy();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, memberAddedSpy);

      harness.inputElement.focus();
      harness.inputElement.value = '';
      await sendKeys({ press: 'Enter' });

      expect(memberAddedSpy).to.not.have.been.called;
    });

    it('should dispatch member added event when pressing tab key to blur field if value exists and addOnBlur is true', async () => {
      const harness = await createFixture({ addOnBlur: true });
      const memberAddedSpy = sinon.spy();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, memberAddedSpy);

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await sendKeys({ press: 'Tab' });

      expect(memberAddedSpy).to.have.been.calledOnce;
      expect(memberAddedSpy.calledWith(new CustomEvent(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, { detail: 'New Chip' }))).to.be.true;
      expect(harness.inputElement.value).to.be.empty;
    });

    it('should dispatch member removed event when pressing backspace key', async () => {
      const harness = await createFixture({ hasChips: true });
      const memberRemovedSpy = sinon.spy();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, memberRemovedSpy);

      harness.inputElement.focus();
      const chip = harness.chips.at(-1);
      await sendKeys({ press: 'Backspace' });

      expect(memberRemovedSpy).to.have.been.calledOnce;
      expect(memberRemovedSpy.calledWith(new CustomEvent(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, { detail: chip }))).to.be.true;
    });

    it('should dispatch member removed event when pressing delete key on focus chip', async () => {
      const harness = await createFixture({ hasChips: true });
      const memberRemovedSpy = sinon.spy();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, memberRemovedSpy);

      harness.inputElement.focus();
      const chip = harness.chips.at(-1);
      chip?.focus();
      await sendKeys({ press: 'Delete' });

      expect(memberRemovedSpy).to.have.been.calledOnce;
      expect(memberRemovedSpy.calledWith(new CustomEvent(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, { detail: chip }))).to.be.true;
    });

    it('should not dispatch member added event when addOnBlur is set to false dynamically', async () => {
      const harness = await createFixture({ addOnBlur: true });
      const memberAddedSpy = sinon.spy();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, memberAddedSpy);

      harness.chipField.addOnBlur = false;
      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await sendKeys({ press: 'Tab' });

      expect(memberAddedSpy).to.not.have.been.called;
    });

    it('should not remove member removed event when pressing backspace key if no chips exist', async () => {
      const harness = await createFixture();
      const memberRemovedSpy = sinon.spy();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, memberRemovedSpy);

      harness.inputElement.focus();
      await sendKeys({ press: 'Backspace' });

      expect(memberRemovedSpy).to.not.have.been.called;
    });
  });

  describe('keyboard interaction', () => {
    it('should focus last chip when pressing arrow left key if input is empty', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.inputElement.focus();
      await sendKeys({ press: 'ArrowLeft' });

      expect(document.activeElement).to.equal(harness.chips.at(-1));
    });

    it('should focus input when pressing arrow right key if last chip is focused', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.chips.at(-1)?.focus();
      await sendKeys({ press: 'ArrowRight' });

      expect(document.activeElement).to.equal(harness.inputElement);
    });

    it('should focus next chip if pressing arrow right key on focused chip', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.chips.at(0)?.focus();
      await sendKeys({ press: 'ArrowRight' });

      expect(document.activeElement).to.equal(harness.chips.at(1));
    });

    it('should focus previous chip if pressing arrow left key on focused chip', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.chips.at(1)?.focus();
      await sendKeys({ press: 'ArrowLeft' });

      expect(document.activeElement).to.equal(harness.chips.at(0));
    });

    it('should not focus last chip when pressing arrow left key if input is not empty', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await sendKeys({ press: 'ArrowLeft' });

      expect(document.activeElement).to.equal(harness.inputElement);
    });

    it('should clear input when pressing escape key', async () => {
      const harness = await createFixture();

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await sendKeys({ press: 'Escape' });

      expect(harness.inputElement.value).to.be.empty;
    });

    it('should clear input when pressing tab key if addOnBlur is false', async () => {
      const harness = await createFixture();

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await sendKeys({ press: 'Tab' });

      expect(harness.inputElement.value).to.be.empty;
    });

    it('should not move focus if pressing arrow left key when no chips are present', async () => {
      const harness = await createFixture();

      harness.inputElement.focus();
      await sendKeys({ press: 'ArrowLeft' });

      expect(document.activeElement).to.equal(harness.inputElement);
    });

    it('should float label when adding a chip', async () => {
      const harness = await createFixture();

      const chip = document.createElement('forge-chip');
      chip.textContent = 'New Chip';
      chip.slot = 'member';
      harness.chipField.append(chip);

      await elementUpdated(harness.chipField);

      expect(harness.chipField.floatLabel).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).to.be.true;
      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should unfloat label when all members are removed', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.chips.forEach(chip => chip.remove());
      await elementUpdated(harness.chipField);

      expect(harness.chipField.floatLabel).to.be.false;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).to.be.false;
      expect(harness.fieldElement.floatLabel).to.be.false;
    });
  });

  describe('mouse interaction', () => {
    it('should focus input when calling click() method on field', async () => {
      const harness = await createFixture();

      harness.chipField.click();

      expect(document.activeElement).to.equal(harness.inputElement);
    });

    it('should focus input when clicking on field', async () => {
      const harness = await createFixture();

      await harness.clickField();

      expect(document.activeElement).to.equal(harness.inputElement);
    });

    it('should not focus input clicking on field when disabled', async () => {
      const harness = await createFixture({ disabled: true });

      await harness.clickField();

      expect(document.activeElement).to.not.equal(harness.inputElement);
    });
  });

  describe('inherited field state', () => {
    it('should set labelPosition via attribute', async () => {
      const harness = await createFixture({ labelPosition: 'block-start' });

      expect(harness.chipField.labelPosition).to.equal('block-start');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_POSITION)).to.be.true;
      expect(harness.fieldElement.labelPosition).to.equal('block-start');
    });

    it('should set labelPosition via property', async () => {
      const harness = await createFixture();

      harness.chipField.labelPosition = 'block-start';

      expect(harness.chipField.labelPosition).to.equal('block-start');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_POSITION)).to.be.true;
      expect(harness.fieldElement.labelPosition).to.equal('block-start');
    });

    it('should set labelAlignment via attribute', async () => {
      const harness = await createFixture({ labelAlignment: 'end' });

      expect(harness.chipField.labelAlignment).to.equal('end');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT)).to.be.true;
      expect(harness.fieldElement.labelAlignment).to.equal('end');
    });

    it('should set labelAlignment via property', async () => {
      const harness = await createFixture();

      harness.chipField.labelAlignment = 'end';

      expect(harness.chipField.labelAlignment).to.equal('end');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT)).to.be.true;
      expect(harness.fieldElement.labelAlignment).to.equal('end');
    });

    it('should set invalid via attribute', async () => {
      const harness = await createFixture({ invalid: true });

      expect(harness.chipField.invalid).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.INVALID)).to.be.true;
      expect(harness.fieldElement.invalid).to.be.true;
    });

    it('should set invalid via property', async () => {
      const harness = await createFixture();

      harness.chipField.invalid = true;

      expect(harness.chipField.invalid).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.INVALID)).to.be.true;
      expect(harness.fieldElement.invalid).to.be.true;
    });

    it('should set required via attribute', async () => {
      const harness = await createFixture({ required: true });

      expect(harness.chipField.required).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.REQUIRED)).to.be.true;
      expect(harness.fieldElement.required).to.be.true;
    });

    it('should set required via property', async () => {
      const harness = await createFixture();

      harness.chipField.required = true;

      expect(harness.chipField.required).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.REQUIRED)).to.be.true;
      expect(harness.fieldElement.required).to.be.true;
    });

    it('should set optional via attribute', async () => {
      const harness = await createFixture({ optional: true });

      expect(harness.chipField.optional).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.OPTIONAL)).to.be.true;
      expect(harness.fieldElement.optional).to.be.true;
    });

    it('should set optional via property', async () => {
      const harness = await createFixture();

      harness.chipField.optional = true;

      expect(harness.chipField.optional).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.OPTIONAL)).to.be.true;
      expect(harness.fieldElement.optional).to.be.true;
    });

    it('should set disabled via attribute', async () => {
      const harness = await createFixture({ disabled: true });

      expect(harness.chipField.disabled).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DISABLED)).to.be.true;
      expect(harness.inputElement.disabled).to.be.true;
      expect(harness.fieldElement.disabled).to.be.true;
    });

    it('should set disabled via property', async () => {
      const harness = await createFixture();

      harness.chipField.disabled = true;

      expect(harness.chipField.disabled).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DISABLED)).to.be.true;
      expect(harness.inputElement.disabled).to.be.true;
      expect(harness.fieldElement.disabled).to.be.true;
    });

    it('should set floatLabel via attribute', async () => {
      const harness = await createFixture({ floatLabel: true });

      expect(harness.chipField.floatLabel).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).to.be.true;
      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should set floatLabel via property', async () => {
      const harness = await createFixture();

      harness.chipField.floatLabel = true;

      expect(harness.chipField.floatLabel).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).to.be.true;
      expect(harness.fieldElement.floatLabel).to.be.true;
    });

    it('should set variant via attribute', async () => {
      const harness = await createFixture({ variant: 'plain' });

      expect(harness.chipField.variant).to.equal('plain');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.VARIANT)).to.be.true;
      expect(harness.fieldElement.variant).to.equal('plain');
    });

    it('should set variant via property', async () => {
      const harness = await createFixture();

      harness.chipField.variant = 'plain';

      expect(harness.chipField.variant).to.equal('plain');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.VARIANT)).to.be.true;
      expect(harness.fieldElement.variant).to.equal('plain');
    });

    it('should set theme via attribute', async () => {
      const harness = await createFixture({ theme: 'primary' });

      expect(harness.chipField.theme).to.equal('primary');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.THEME)).to.be.true;
      expect(harness.fieldElement.theme).to.equal('primary');
    });

    it('should set theme via property', async () => {
      const harness = await createFixture();

      harness.chipField.theme = 'primary';

      expect(harness.chipField.theme).to.equal('primary');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.THEME)).to.be.true;
      expect(harness.fieldElement.theme).to.equal('primary');
    });

    it('should set shape via attribute', async () => {
      const harness = await createFixture({ shape: 'rounded' });

      expect(harness.chipField.shape).to.equal('rounded');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.SHAPE)).to.be.true;
      expect(harness.fieldElement.shape).to.equal('rounded');
    });

    it('should set shape via property', async () => {
      const harness = await createFixture();

      harness.chipField.shape = 'rounded';

      expect(harness.chipField.shape).to.equal('rounded');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.SHAPE)).to.be.true;
      expect(harness.fieldElement.shape).to.equal('rounded');
    });

    it('should set density via attribute', async () => {
      const harness = await createFixture({ density: 'small' });

      expect(harness.chipField.density).to.equal('small');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DENSITY)).to.be.true;
      expect(harness.fieldElement.density).to.equal('small');
    });

    it('should set density via property', async () => {
      const harness = await createFixture();

      harness.chipField.density = 'small';

      expect(harness.chipField.density).to.equal('small');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DENSITY)).to.be.true;
      expect(harness.fieldElement.density).to.equal('small');
    });

    it('should set dense via attribute', async () => {
      const harness = await createFixture({ dense: true });

      expect(harness.chipField.dense).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DENSE)).to.be.true;
      expect(harness.fieldElement.dense).to.be.true;
    });

    it('should set dense via property', async () => {
      const harness = await createFixture();

      harness.chipField.dense = true;

      expect(harness.chipField.dense).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DENSE)).to.be.true;
      expect(harness.fieldElement.dense).to.be.true;
    });

    it('should set popoverIcon via attribute', async () => {
      const harness = await createFixture({ popoverIcon: true });

      expect(harness.chipField.popoverIcon).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.POPOVER_ICON)).to.be.true;
      expect(harness.fieldElement.popoverIcon).to.be.true;
    });

    it('should set popoverIcon via property', async () => {
      const harness = await createFixture();

      harness.chipField.popoverIcon = true;

      expect(harness.chipField.popoverIcon).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.POPOVER_ICON)).to.be.true;
      expect(harness.fieldElement.popoverIcon).to.be.true;
    });

    it('should set supportTextInset via attribute', async () => {
      const harness = await createFixture({ supportTextInset: 'end' });

      expect(harness.chipField.supportTextInset).to.equal('end');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET)).to.be.true;
      expect(harness.fieldElement.supportTextInset).to.equal('end');
    });

    it('should set supportTextInset via property', async () => {
      const harness = await createFixture();

      harness.chipField.supportTextInset = 'end';

      expect(harness.chipField.supportTextInset).to.equal('end');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET)).to.be.true;
      expect(harness.fieldElement.supportTextInset).to.equal('end');
    });

    it('should get popover target element from field', async () => {
      const harness = await createFixture();

      expect(harness.chipField.popoverTargetElement).to.be.ok;
    });

    it('should float label when chips are present', async () => {
      const harness = await createFixture({ hasChips: true });

      expect(harness.chipField.floatLabel).to.be.true;
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).to.be.true;
      expect(harness.fieldElement.floatLabel).to.be.true;
    });
  });

  describe('label', () => {
    it('should connect slotted label to input', async () => {
      const el = await fixture<IChipFieldComponent>(html`<forge-chip-field></forge-chip-field>`);

      const label = document.createElement('label');
      const input = document.createElement('input');
      label.slot = 'label';
      input.id = 'input';
      el.append(input);
      el.append(label);

      await elementUpdated(el);

      expect(label.htmlFor).to.equal(input.id);
      await expect(el).to.be.accessible();
    });

    it('should add id to input if no id is present', async () => {
      const el = await fixture<IChipFieldComponent>(html`<forge-chip-field></forge-chip-field>`);

      const label = document.createElement('label');
      const input = document.createElement('input');
      label.slot = 'label';
      input.id = 'input';
      el.append(input);
      el.append(label);

      await elementUpdated(el);

      const id = input.id;
      expect(id).to.not.be.undefined;
      expect(label.htmlFor).to.equal(id);
      await expect(el).to.be.accessible();
    });

    it('should connect slotted forge label to input', async () => {
      const el = await fixture<IChipFieldComponent>(html`<forge-chip-field></forge-chip-field>`);

      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      el.append(input);
      el.append(label);
      await elementUpdated(el);

      expect(label.forElement).to.equal(el);
      expect(input.ariaLabel).to.equal(label.textContent);
      await expect(el).to.be.accessible();
    });

    it('should update input label when forge label text changes', async () => {
      const el = await fixture<IChipFieldComponent>(html`<forge-chip-field></forge-chip-field>`);

      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      label.dynamic = true;
      el.append(input);
      el.append(label);
      await elementUpdated(el);

      label.textContent = 'New label';
      await elementUpdated(el);

      expect(input.ariaLabel).to.equal(label.textContent);
    });

    it('should focus text field when forge label is clicked', async () => {
      const el = await fixture<IChipFieldComponent>(html`<forge-chip-field></forge-chip-field>`);

      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      el.append(input);
      el.append(label);

      const focusSpy = sinon.spy(input, 'focus');
      await elementUpdated(el);
      label.click();
      await elementUpdated(el);

      expect(focusSpy).to.have.been.called;
    });
  });
});

class ChipFieldHarness {
  constructor(
    public readonly chipField: IChipFieldComponent,
    public readonly inputElement: HTMLInputElement,
    public readonly labelElement: HTMLLabelElement
  ) {}

  public get fieldElement(): IFieldComponent {
    return getShadowElement(this.chipField, FIELD_CONSTANTS.elementName) as IFieldComponent;
  }

  public get chips(): IChipComponent[] {
    return Array.from(this.chipField.querySelectorAll('forge-chip'));
  }

  public clickField(): Promise<void> {
    const { x, y } = this.chipField.getBoundingClientRect();
    const mouseX = Math.round(x + 1);
    const mouseY = Math.round(y + 1);
    return sendMouse({ type: 'click', position: [mouseX, mouseY] });
  }
}

async function createFixture({
  hasChips = false,
  addOnBlur,
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
  popoverIcon,
  supportTextInset
}: {
  hasChips?: boolean;
  addOnBlur?: boolean;
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
  popoverIcon?: boolean;
  supportTextInset?: FieldSupportTextInset;
} = {}): Promise<ChipFieldHarness> {
  const chipField = await fixture<IChipFieldComponent>(html`
    <forge-chip-field
      ?add-on-blur=${addOnBlur ?? nothing}
      .labelPosition=${labelPosition ?? nothing}
      .labelAlignment=${labelAlignment ?? nothing}
      ?invalid=${invalid ?? nothing}
      ?required=${required ?? nothing}
      ?optional=${optional ?? nothing}
      ?disabled=${disabled ?? nothing}
      ?float-label=${floatLabel ?? nothing}
      .variant=${variant ?? nothing}
      .theme=${theme ?? nothing}
      .shape=${shape ?? nothing}
      .density=${density ?? nothing}
      ?dense=${dense ?? nothing}
      ?popover-icon=${popoverIcon ?? nothing}
      .supportTextInset=${supportTextInset ?? nothing}>
      <label for="cf-input">Label</label>
      <input type="text" id="cf-input" />
      ${hasChips && ['One', 'Two', 'Three'].map(value => html`<forge-chip slot="member" value=${value}>${value}</forge-chip>`)}
    </forge-chip-field>
  `);

  const inputElement = chipField.querySelector('input') as HTMLInputElement;
  const labelElement = chipField.querySelector('label') as HTMLLabelElement;

  return new ChipFieldHarness(chipField, inputElement, labelElement);
}
