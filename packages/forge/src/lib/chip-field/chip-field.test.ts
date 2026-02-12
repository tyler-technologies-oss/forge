import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html, nothing } from 'lit';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { frame, task } from '../core/utils/utils.js';
import type { IChipFieldComponent } from './chip-field.js';
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
  type IFieldComponent
} from '../field/index.js';
import { CHIP_FIELD_CONSTANTS } from './chip-field-constants.js';
import type { IChipComponent } from '../chips/index.js';
import { LABEL_CONSTANTS } from '../label/label-constants.js';

import './chip-field.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

// Wait for field animation to complete
const FIELD_ANIMATION_TIMEOUT = 200;

describe('Chip Field', () => {
  it('should use shadow DOM', async () => {
    const harness = await createFixture();

    expect(harness.chipField.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const harness = await createFixture();

    await expect(harness.chipField).toBeAccessible();
  });

  it('should be accessible with chips', async () => {
    const harness = await createFixture({ hasChips: true });
    await task(FIELD_ANIMATION_TIMEOUT);
    await expect(harness.chipField).toBeAccessible();
  });

  it('should have expected default values', async () => {
    const harness = await createFixture();

    expect(harness.chipField.addOnBlur).toBe(false);
  });

  it('should set addOnBlur via attribute', async () => {
    const harness = await createFixture({ addOnBlur: true });

    expect(harness.chipField.addOnBlur).toBe(true);
    expect(harness.chipField.hasAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_ON_BLUR)).toBe(true);
  });

  it('should set addOnBlur via property', async () => {
    const harness = await createFixture();

    harness.chipField.addOnBlur = true;

    expect(harness.chipField.addOnBlur).toBe(true);
    expect(harness.chipField.hasAttribute(CHIP_FIELD_CONSTANTS.attributes.ADD_ON_BLUR)).toBe(true);
  });

  describe('events', () => {
    it('should dispatch member added event when pressing enter key if value exists', async () => {
      const harness = await createFixture();
      const memberAddedSpy = vi.fn();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, memberAddedSpy);

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await userEvent.keyboard('{Enter}');

      expect(memberAddedSpy).toHaveBeenCalledOnce();
      expect(memberAddedSpy.mock.calls[0][0].detail).toBe('New Chip');
    });

    it('should not dispatch member added event when pressing enter key if value does not exist', async () => {
      const harness = await createFixture();
      const memberAddedSpy = vi.fn();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, memberAddedSpy);

      harness.inputElement.focus();
      harness.inputElement.value = '';
      await userEvent.keyboard('{Enter}');

      expect(memberAddedSpy).not.toHaveBeenCalled();
    });

    it('should dispatch member added event when pressing tab key to blur field if value exists and addOnBlur is true', async () => {
      const harness = await createFixture({ addOnBlur: true });
      const memberAddedSpy = vi.fn();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, memberAddedSpy);

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await userEvent.keyboard('{Tab}');

      expect(memberAddedSpy).toHaveBeenCalledOnce();
      expect(memberAddedSpy.mock.calls[0][0].detail).toBe('New Chip');
      expect(harness.inputElement.value).toHaveLength(0);
    });

    it('should dispatch member removed event when pressing backspace key', async () => {
      const harness = await createFixture({ hasChips: true });
      const memberRemovedSpy = vi.fn();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, memberRemovedSpy);

      harness.inputElement.focus();
      const chip = harness.chips.at(-1);
      await userEvent.keyboard('{Backspace}');

      expect(memberRemovedSpy).toHaveBeenCalledOnce();
      expect(memberRemovedSpy.mock.calls[0][0].detail).toBe(chip);
    });

    it('should dispatch member removed event when pressing delete key on focus chip', async () => {
      const harness = await createFixture({ hasChips: true });
      const memberRemovedSpy = vi.fn();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, memberRemovedSpy);

      harness.inputElement.focus();
      const chip = harness.chips.at(-1);
      chip?.focus();
      await userEvent.keyboard('{Delete}');

      expect(memberRemovedSpy).toHaveBeenCalledOnce();
      expect(memberRemovedSpy.mock.calls[0][0].detail).toBe(chip);
    });

    it('should not dispatch member added event when addOnBlur is set to false dynamically', async () => {
      const harness = await createFixture({ addOnBlur: true });
      const memberAddedSpy = vi.fn();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_ADDED, memberAddedSpy);

      harness.chipField.addOnBlur = false;
      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await userEvent.keyboard('{Tab}');

      expect(memberAddedSpy).not.toHaveBeenCalled();
    });

    it('should not remove member removed event when pressing backspace key if no chips exist', async () => {
      const harness = await createFixture();
      const memberRemovedSpy = vi.fn();
      harness.chipField.addEventListener(CHIP_FIELD_CONSTANTS.events.MEMBER_REMOVED, memberRemovedSpy);

      harness.inputElement.focus();
      await userEvent.keyboard('{Backspace}');

      expect(memberRemovedSpy).not.toHaveBeenCalled();
    });
  });

  describe('keyboard interaction', () => {
    it('should focus last chip when pressing arrow left key if input is empty', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.inputElement.focus();
      await userEvent.keyboard('{ArrowLeft}');

      expect(document.activeElement).toBe(harness.chips.at(-1));
    });

    it('should focus input when pressing arrow right key if last chip is focused', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.chips.at(-1)?.focus();
      await userEvent.keyboard('{ArrowRight}');

      expect(document.activeElement).toBe(harness.inputElement);
    });

    it('should focus next chip if pressing arrow right key on focused chip', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.chips.at(0)?.focus();
      await userEvent.keyboard('{ArrowRight}');

      expect(document.activeElement).toBe(harness.chips.at(1));
    });

    it('should focus previous chip if pressing arrow left key on focused chip', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.chips.at(1)?.focus();
      await userEvent.keyboard('{ArrowLeft}');

      expect(document.activeElement).toBe(harness.chips.at(0));
    });

    it('should not focus last chip when pressing arrow left key if input is not empty', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await userEvent.keyboard('{ArrowLeft}');

      expect(document.activeElement).toBe(harness.inputElement);
    });

    it('should clear input when pressing escape key', async () => {
      const harness = await createFixture();

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await userEvent.keyboard('{Escape}');

      expect(harness.inputElement.value).toHaveLength(0);
    });

    it('should clear input when pressing tab key if addOnBlur is false', async () => {
      const harness = await createFixture();

      harness.inputElement.focus();
      harness.inputElement.value = 'New Chip';
      await userEvent.keyboard('{Tab}');

      expect(harness.inputElement.value).toHaveLength(0);
    });

    it('should not move focus if pressing arrow left key when no chips are present', async () => {
      const harness = await createFixture();

      harness.inputElement.focus();
      await userEvent.keyboard('{ArrowLeft}');

      expect(document.activeElement).toBe(harness.inputElement);
    });

    it('should float label when adding a chip', async () => {
      const harness = await createFixture();

      const chip = document.createElement('forge-chip');
      chip.textContent = 'New Chip';
      chip.slot = 'member';
      harness.chipField.append(chip);

      await frame();

      expect(harness.chipField.floatLabel).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).toBe(true);
      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should unfloat label when all members are removed', async () => {
      const harness = await createFixture({ hasChips: true });

      harness.chips.forEach(chip => chip.remove());
      await frame();

      expect(harness.chipField.floatLabel).toBe(false);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).toBe(false);
      expect(harness.fieldElement.floatLabel).toBe(false);
    });
  });

  describe('mouse interaction', () => {
    it('should focus input when calling click() method on field', async () => {
      const harness = await createFixture();

      harness.chipField.click();

      expect(document.activeElement).toBe(harness.inputElement);
    });

    it('should focus input when clicking on field', async () => {
      const harness = await createFixture();

      await userEvent.click(harness.chipField);

      expect(document.activeElement).toBe(harness.inputElement);
    });

    it('should not focus input clicking on field when disabled', async () => {
      const harness = await createFixture({ disabled: true });

      await userEvent.click(harness.chipField, { force: true });

      expect(document.activeElement).not.toBe(harness.inputElement);
    });
  });

  describe('inherited field state', () => {
    it('should set labelPosition via attribute', async () => {
      const harness = await createFixture({ labelPosition: 'block-start' });

      expect(harness.chipField.labelPosition).toBe('block-start');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_POSITION)).toBe(true);
      expect(harness.fieldElement.labelPosition).toBe('block-start');
    });

    it('should set labelPosition via property', async () => {
      const harness = await createFixture();

      harness.chipField.labelPosition = 'block-start';

      expect(harness.chipField.labelPosition).toBe('block-start');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_POSITION)).toBe(true);
      expect(harness.fieldElement.labelPosition).toBe('block-start');
    });

    it('should set labelAlignment via attribute', async () => {
      const harness = await createFixture({ labelAlignment: 'end' });

      expect(harness.chipField.labelAlignment).toBe('end');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT)).toBe(true);
      expect(harness.fieldElement.labelAlignment).toBe('end');
    });

    it('should set labelAlignment via property', async () => {
      const harness = await createFixture();

      harness.chipField.labelAlignment = 'end';

      expect(harness.chipField.labelAlignment).toBe('end');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT)).toBe(true);
      expect(harness.fieldElement.labelAlignment).toBe('end');
    });

    it('should set invalid via attribute', async () => {
      const harness = await createFixture({ invalid: true });

      expect(harness.chipField.invalid).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.INVALID)).toBe(true);
      expect(harness.fieldElement.invalid).toBe(true);
    });

    it('should set invalid via property', async () => {
      const harness = await createFixture();

      harness.chipField.invalid = true;

      expect(harness.chipField.invalid).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.INVALID)).toBe(true);
      expect(harness.fieldElement.invalid).toBe(true);
    });

    it('should set required via attribute', async () => {
      const harness = await createFixture({ required: true });

      expect(harness.chipField.required).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.REQUIRED)).toBe(true);
      expect(harness.fieldElement.required).toBe(true);
    });

    it('should set required via property', async () => {
      const harness = await createFixture();

      harness.chipField.required = true;

      expect(harness.chipField.required).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.REQUIRED)).toBe(true);
      expect(harness.fieldElement.required).toBe(true);
    });

    it('should set optional via attribute', async () => {
      const harness = await createFixture({ optional: true });

      expect(harness.chipField.optional).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.OPTIONAL)).toBe(true);
      expect(harness.fieldElement.optional).toBe(true);
    });

    it('should set optional via property', async () => {
      const harness = await createFixture();

      harness.chipField.optional = true;

      expect(harness.chipField.optional).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.OPTIONAL)).toBe(true);
      expect(harness.fieldElement.optional).toBe(true);
    });

    it('should set disabled via attribute', async () => {
      const harness = await createFixture({ disabled: true });

      expect(harness.chipField.disabled).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(harness.inputElement.disabled).toBe(true);
      expect(harness.fieldElement.disabled).toBe(true);
    });

    it('should set disabled via property', async () => {
      const harness = await createFixture();

      harness.chipField.disabled = true;

      expect(harness.chipField.disabled).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DISABLED)).toBe(true);
      expect(harness.inputElement.disabled).toBe(true);
      expect(harness.fieldElement.disabled).toBe(true);
    });

    it('should set floatLabel via attribute', async () => {
      const harness = await createFixture({ floatLabel: true });

      expect(harness.chipField.floatLabel).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).toBe(true);
      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should set floatLabel via property', async () => {
      const harness = await createFixture();

      harness.chipField.floatLabel = true;

      expect(harness.chipField.floatLabel).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).toBe(true);
      expect(harness.fieldElement.floatLabel).toBe(true);
    });

    it('should set variant via attribute', async () => {
      const harness = await createFixture({ variant: 'plain' });

      expect(harness.chipField.variant).toBe('plain');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.VARIANT)).toBe(true);
      expect(harness.fieldElement.variant).toBe('plain');
    });

    it('should set variant via property', async () => {
      const harness = await createFixture();

      harness.chipField.variant = 'plain';

      expect(harness.chipField.variant).toBe('plain');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.VARIANT)).toBe(true);
      expect(harness.fieldElement.variant).toBe('plain');
    });

    it('should set theme via attribute', async () => {
      const harness = await createFixture({ theme: 'primary' });

      expect(harness.chipField.theme).toBe('primary');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.THEME)).toBe(true);
      expect(harness.fieldElement.theme).toBe('primary');
    });

    it('should set theme via property', async () => {
      const harness = await createFixture();

      harness.chipField.theme = 'primary';

      expect(harness.chipField.theme).toBe('primary');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.THEME)).toBe(true);
      expect(harness.fieldElement.theme).toBe('primary');
    });

    it('should set shape via attribute', async () => {
      const harness = await createFixture({ shape: 'rounded' });

      expect(harness.chipField.shape).toBe('rounded');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.SHAPE)).toBe(true);
      expect(harness.fieldElement.shape).toBe('rounded');
    });

    it('should set shape via property', async () => {
      const harness = await createFixture();

      harness.chipField.shape = 'rounded';

      expect(harness.chipField.shape).toBe('rounded');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.SHAPE)).toBe(true);
      expect(harness.fieldElement.shape).toBe('rounded');
    });

    it('should set density via attribute', async () => {
      const harness = await createFixture({ density: 'small' });

      expect(harness.chipField.density).toBe('small');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DENSITY)).toBe(true);
      expect(harness.fieldElement.density).toBe('small');
    });

    it('should set density via property', async () => {
      const harness = await createFixture();

      harness.chipField.density = 'small';

      expect(harness.chipField.density).toBe('small');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DENSITY)).toBe(true);
      expect(harness.fieldElement.density).toBe('small');
    });

    it('should set dense via attribute', async () => {
      const harness = await createFixture({ dense: true });

      expect(harness.chipField.dense).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DENSE)).toBe(true);
      expect(harness.fieldElement.dense).toBe(true);
    });

    it('should set dense via property', async () => {
      const harness = await createFixture();

      harness.chipField.dense = true;

      expect(harness.chipField.dense).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.DENSE)).toBe(true);
      expect(harness.fieldElement.dense).toBe(true);
    });

    it('should set popoverIcon via attribute', async () => {
      const harness = await createFixture({ popoverIcon: true });

      expect(harness.chipField.popoverIcon).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.POPOVER_ICON)).toBe(true);
      expect(harness.fieldElement.popoverIcon).toBe(true);
    });

    it('should set popoverIcon via property', async () => {
      const harness = await createFixture();

      harness.chipField.popoverIcon = true;

      expect(harness.chipField.popoverIcon).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.POPOVER_ICON)).toBe(true);
      expect(harness.fieldElement.popoverIcon).toBe(true);
    });

    it('should set supportTextInset via attribute', async () => {
      const harness = await createFixture({ supportTextInset: 'end' });

      expect(harness.chipField.supportTextInset).toBe('end');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET)).toBe(true);
      expect(harness.fieldElement.supportTextInset).toBe('end');
    });

    it('should set supportTextInset via property', async () => {
      const harness = await createFixture();

      harness.chipField.supportTextInset = 'end';

      expect(harness.chipField.supportTextInset).toBe('end');
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET)).toBe(true);
      expect(harness.fieldElement.supportTextInset).toBe('end');
    });

    it('should get popover target element from field', async () => {
      const harness = await createFixture();

      expect(harness.chipField.popoverTargetElement).toBeTruthy();
    });

    it('should float label when chips are present', async () => {
      const harness = await createFixture({ hasChips: true });

      expect(harness.chipField.floatLabel).toBe(true);
      expect(harness.chipField.hasAttribute(BASE_FIELD_CONSTANTS.attributes.FLOAT_LABEL)).toBe(true);
      expect(harness.fieldElement.floatLabel).toBe(true);
    });
  });

  describe('label', () => {
    it('should connect slotted label to input', async () => {
      const screen = render(html`<forge-chip-field></forge-chip-field>`);
      const el = screen.container.querySelector('forge-chip-field') as IChipFieldComponent;

      const label = document.createElement('label');
      const input = document.createElement('input');
      label.slot = 'label';
      input.id = 'input';
      el.append(input);
      el.append(label);

      await frame();

      expect(label.htmlFor).toBe(input.id);
      await expect(el).toBeAccessible();
    });

    it('should add id to input if no id is present', async () => {
      const screen = render(html`<forge-chip-field></forge-chip-field>`);
      const el = screen.container.querySelector('forge-chip-field') as IChipFieldComponent;

      const label = document.createElement('label');
      const input = document.createElement('input');
      label.slot = 'label';
      input.id = 'input';
      el.append(input);
      el.append(label);

      await frame();

      const id = input.id;
      expect(id).not.toBeUndefined();
      expect(label.htmlFor).toBe(id);
      await expect(el).toBeAccessible();
    });

    it('should connect slotted forge label to input', async () => {
      const screen = render(html`<forge-chip-field></forge-chip-field>`);
      const el = screen.container.querySelector('forge-chip-field') as IChipFieldComponent;

      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      el.append(input);
      el.append(label);
      await frame();

      expect(label.forElement).toBe(el);
      expect(input.ariaLabel).toBe(label.textContent);
      await expect(el).toBeAccessible();
    });

    it('should update input label when forge label text changes', async () => {
      const screen = render(html`<forge-chip-field></forge-chip-field>`);
      const el = screen.container.querySelector('forge-chip-field') as IChipFieldComponent;

      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      label.dynamic = true;
      el.append(input);
      el.append(label);
      await frame();

      label.textContent = 'New label';
      await frame();

      expect(input.ariaLabel).toBe(label.textContent);
    });

    it('should focus text field when forge label is clicked', async () => {
      const screen = render(html`<forge-chip-field></forge-chip-field>`);
      const el = screen.container.querySelector('forge-chip-field') as IChipFieldComponent;

      const label = document.createElement(LABEL_CONSTANTS.elementName);
      const input = document.createElement('input');
      label.textContent = 'Label';
      label.slot = 'label';
      el.append(input);
      el.append(label);

      const focusSpy = vi.spyOn(input, 'focus');
      await frame();
      label.click();
      await frame();

      expect(focusSpy).toHaveBeenCalled();
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
  const screen = render(html`
    <forge-chip-field
      ?add-on-blur=${addOnBlur ?? nothing}
      label-position=${labelPosition ?? nothing}
      label-alignment=${labelAlignment ?? nothing}
      ?invalid=${invalid ?? nothing}
      ?required=${required ?? nothing}
      ?optional=${optional ?? nothing}
      ?disabled=${disabled ?? nothing}
      ?float-label=${floatLabel ?? nothing}
      variant=${variant ?? nothing}
      theme=${ifDefined(theme)}
      shape=${shape ?? nothing}
      density=${density ?? nothing}
      ?dense=${dense ?? nothing}
      ?popover-icon=${popoverIcon ?? nothing}
      support-text-inset=${supportTextInset ?? nothing}>
      <label for="cf-input">Label</label>
      <input type="text" id="cf-input" />
      ${hasChips
        ? html`<forge-chip slot="member" value="One">One</forge-chip><forge-chip slot="member" value="Two">Two</forge-chip
            ><forge-chip slot="member" value="Three">Three</forge-chip>`
        : nothing}
    </forge-chip-field>
  `);

  const chipField = screen.container.querySelector('forge-chip-field') as IChipFieldComponent;
  const inputElement = chipField.querySelector('input') as HTMLInputElement;
  const labelElement = chipField.querySelector('label') as HTMLLabelElement;

  return new ChipFieldHarness(chipField, inputElement, labelElement);
}
