import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { userEvent } from 'vitest/browser';
import { getShadowElement } from '@tylertech/forge-core';
import { frame } from '../core/utils/utils.js';
import { TestHarness } from '../core/testing/test-harness.js';
import { FIELD_CONSTANTS, type IFieldComponent } from '../field/index.js';
import type {
  FieldDensity,
  FieldLabelAlignment,
  FieldLabelPosition,
  FieldShape,
  FieldSupportTextInset,
  FieldTheme,
  FieldVariant
} from './base/base-field-constants.js';

import './field.js';

describe('Field', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();
    expect(harness.element.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const harness = await createFixture();
    await expect(harness.element).toBeAccessible();
  });

  describe('properties', () => {
    (['inline-start', 'inline-end', 'block-start', 'inset', 'none'] as FieldLabelPosition[]).forEach(labelPosition => {
      it(`should set label position ${labelPosition}`, async () => {
        const harness = await createFixture({ labelPosition });
        expect(harness.element.labelPosition).toBe(labelPosition);
      });
    });

    (['default', 'center', 'baseline', 'start', 'end'] as FieldLabelAlignment[]).forEach(labelAlignment => {
      it(`should set label alignment ${labelAlignment}`, async () => {
        const harness = await createFixture({ labelAlignment });
        expect(harness.element.labelAlignment).toBe(labelAlignment);
      });
    });

    it('should set float label', async () => {
      const harness = await createFixture({ floatLabel: true });
      expect(harness.element.floatLabel).toBe(true);
    });

    it('should set invalid', async () => {
      const harness = await createFixture({ invalid: true });
      expect(harness.element.invalid).toBe(true);
    });

    it('should set required', async () => {
      const harness = await createFixture({ required: true });
      expect(harness.element.required).toBe(true);
    });

    it('should set optional', async () => {
      const harness = await createFixture({ optional: true });
      expect(harness.element.optional).toBe(true);
    });

    it('should set disabled', async () => {
      const harness = await createFixture({ disabled: true });
      expect(harness.element.disabled).toBe(true);
    });

    (['plain', 'outlined', 'tonal', 'filled', 'raised'] as FieldVariant[]).forEach(variant => {
      it(`should set ${variant} variant`, async () => {
        const harness = await createFixture({ variant });
        expect(harness.element.variant).toBe(variant);
      });
    });

    (['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'] as FieldTheme[]).forEach(theme => {
      it(`should set ${theme} theme`, async () => {
        const harness = await createFixture({ theme });
        expect(harness.element.theme).toBe(theme);
      });
    });

    (['default', 'rounded', 'squared'] as FieldShape[]).forEach(shape => {
      it(`should set ${shape} shape`, async () => {
        const harness = await createFixture({ shape });
        expect(harness.element.shape).toBe(shape);
      });
    });

    (['extra-small', 'small', 'medium', 'large', 'extra-large'] as FieldDensity[]).forEach(density => {
      it(`should set ${density} density`, async () => {
        const harness = await createFixture({ density });
        expect(harness.element.density).toBe(density);
      });
    });

    it('should set dense', async () => {
      const harness = await createFixture({ dense: true });
      expect(harness.element.dense).toBe(true);
    });

    it('should set popover icon', async () => {
      const harness = await createFixture({ popoverIcon: true });
      expect(harness.element.popoverIcon).toBe(true);
    });

    it('should set popover expanded', async () => {
      const harness = await createFixture({ popoverExpanded: true });
      expect(harness.element.popoverExpanded).toBe(true);
    });

    it('should set multiline', async () => {
      const harness = await createFixture({ multiline: true });
      expect(harness.element.multiline).toBe(true);
    });

    (['none', 'start', 'end', 'both'] as FieldSupportTextInset[]).forEach(supportTextInset => {
      it(`should set support text inset ${supportTextInset}`, async () => {
        const harness = await createFixture({ supportTextInset });
        expect(harness.element.supportTextInset).toBe(supportTextInset);
      });
    });
  });

  describe('attributes', () => {
    (['inline-start', 'inline-end', 'block-start', 'inset', 'none'] as FieldLabelPosition[]).forEach(labelPosition => {
      if (labelPosition === FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION) {
        return;
      }

      it(`should set label position ${labelPosition} attribute`, async () => {
        const harness = await createDefaultFixture();
        harness.element.labelPosition = labelPosition;
        expect(harness.element.getAttribute(FIELD_CONSTANTS.attributes.LABEL_POSITION)).toBe(labelPosition);
      });
    });

    (['default', 'center', 'baseline', 'start', 'end'] as FieldLabelAlignment[]).forEach(labelAlignment => {
      if (labelAlignment === FIELD_CONSTANTS.defaults.DEFAULT_LABEL_ALIGNMENT) {
        return;
      }

      it(`should set label alignment ${labelAlignment} attribute`, async () => {
        const harness = await createDefaultFixture();
        harness.element.labelAlignment = labelAlignment;
        expect(harness.element.getAttribute(FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT)).toBe(labelAlignment);
      });
    });

    it('should set float label attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.floatLabel = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL)).toBe(true);
    });

    it('should set invalid attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.invalid = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).toBe(true);
    });

    it('should set required attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.required = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).toBe(true);
    });

    it('should set optional attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.optional = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.OPTIONAL)).toBe(true);
    });

    it('should set disabled attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.disabled = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.DISABLED)).toBe(true);
    });

    it('should set popover icon attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.popoverIcon = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.POPOVER_ICON)).toBe(true);
    });

    it('should set popover expanded attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.popoverExpanded = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.POPOVER_EXPANDED)).toBe(true);
    });

    it('should set multiline attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.multiline = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.MULTILINE)).toBe(true);
    });

    (['none', 'start', 'end', 'both'] as FieldSupportTextInset[]).forEach(supportTextInset => {
      if (supportTextInset === FIELD_CONSTANTS.defaults.DEFAULT_SUPPORT_TEXT_INSET) {
        return;
      }

      it(`should set support text inset ${supportTextInset} attribute`, async () => {
        const harness = await createDefaultFixture();
        harness.element.supportTextInset = supportTextInset;
        expect(harness.element.getAttribute(FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET)).toBe(supportTextInset);
      });
    });
  });

  describe('defaults', () => {
    it('should default label position to "inset"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.labelPosition).toBe('inset');
    });

    it('should default label alignment to "default"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.labelAlignment).toBe('default');
    });

    it('should default float label to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.floatLabel).toBe(false);
    });

    it('should default invalid to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.invalid).toBe(false);
    });

    it('should default required to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.required).toBe(false);
    });

    it('should default optional to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.optional).toBe(false);
    });

    it('should default disabled to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.disabled).toBe(false);
    });

    it('should default variant to "outlined"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.variant).toBe('outlined');
    });

    it('should default theme to "default"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.theme).toBe('default');
    });

    it('should default shape to "default"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.shape).toBe('default');
    });

    it('should default density to "default"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.density).toBe('default');
    });

    it('should default dense to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.dense).toBe(false);
    });

    it('should default popover icon to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.popoverIcon).toBe(false);
    });

    it('should default popover expanded to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.popoverExpanded).toBe(false);
    });

    it('should default multiline to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.multiline).toBe(false);
    });

    it('should default support text inset to "none"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.supportTextInset).toBe('none');
    });
  });

  describe('events', () => {
    it('should dispatch popover icon click event', async () => {
      const harness = await createFixture({ popoverIcon: true });
      const clickSpy = vi.fn();
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_CLICK, clickSpy);

      await harness.clickElement(harness.popoverIconElement);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not dispatch popover icon click event when popover icon is false', async () => {
      const harness = await createDefaultFixture();
      const clickSpy = vi.fn();
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_CLICK, clickSpy);

      harness.popoverIconElement.dispatchEvent(new PointerEvent('click'));

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should not dispatch popover icon click event when popover icon is removed', async () => {
      const harness = await createFixture({ popoverIcon: true });
      const clickSpy = vi.fn();
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_CLICK, clickSpy);
      harness.element.popoverIcon = false;

      harness.popoverIconElement.dispatchEvent(new PointerEvent('click'));

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should dispatch popover icon mousedown event when popover icon receives mousedown event', async () => {
      const harness = await createFixture({ popoverIcon: true });
      const mousedownSpy = vi.fn();
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_MOUSEDOWN, mousedownSpy);

      harness.popoverIconElement.dispatchEvent(new MouseEvent('mousedown'));

      expect(mousedownSpy).toHaveBeenCalled();
    });

    it('should not dispatch popover icon mousedown event when popover icon is removed', async () => {
      const harness = await createFixture({ popoverIcon: true });
      const mousedownSpy = vi.fn();
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_MOUSEDOWN, mousedownSpy);
      harness.element.popoverIcon = false;

      harness.popoverIconElement.dispatchEvent(new MouseEvent('mousedown'));

      expect(mousedownSpy).not.toHaveBeenCalled();
    });

    it('should prevent default on the original mousedown event if default prevented on popover icon mousedown event', async () => {
      const harness = await createFixture({ popoverIcon: true });
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_MOUSEDOWN, evt => evt.preventDefault());

      const mousedownEvent = new MouseEvent('mousedown', { cancelable: true });
      harness.popoverIconElement.dispatchEvent(mousedownEvent);

      expect(mousedownEvent.defaultPrevented).toBe(true);
    });
  });

  describe('slots', () => {
    it('should add class when start slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('start');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_START)).toBe(true);
    });

    it('should not add class when start slot has no content', async () => {
      const harness = await createDefaultFixture();
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_START)).toBe(false);
    });

    it('should remove class when start slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('start');
      await frame();
      harness.removeSlottedContent('start');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_START)).toBe(false);
    });

    it('should add class when end slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('end');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_END)).toBe(true);
    });

    it('should not add class when end slot has no content', async () => {
      const harness = await createDefaultFixture();
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_END)).toBe(false);
    });

    it('should remove class when end slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('end');
      await frame();
      harness.removeSlottedContent('end');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_END)).toBe(false);
    });

    it('should add class when accessory slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('accessory');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_ACCESSORY)).toBe(true);
    });

    it('should not add class when accessory slot has no content', async () => {
      const harness = await createDefaultFixture();
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_ACCESSORY)).toBe(false);
    });

    it('should remove class when accessory slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('accessory');
      await frame();
      harness.removeSlottedContent('accessory');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_ACCESSORY)).toBe(false);
    });

    it('should add class when support text slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('support-text');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_START)).toBe(true);
    });

    it('should not add class when support text slot has no content', async () => {
      const harness = await createDefaultFixture();
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_START)).toBe(false);
    });

    it('should remove class when support text slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('support-text');
      await frame();
      harness.removeSlottedContent('support-text');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_START)).toBe(false);
    });

    it('should add class when support text end slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('support-text-end');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_END)).toBe(true);
    });

    it('should not add class when support text end slot has no content', async () => {
      const harness = await createDefaultFixture();
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_END)).toBe(false);
    });

    it('should remove class when support text end slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('support-text-end');
      await frame();
      harness.removeSlottedContent('support-text-end');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_END)).toBe(false);
    });

    it('should add class when label slot has content and label position is inset', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      harness.addSlottedContent('label');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_LABEL)).toBe(true);
    });

    it('should remove class when label slot content is removed and label position is inset', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      harness.addSlottedContent('label');
      await frame();
      harness.removeSlottedContent('label');
      await frame();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_LABEL)).toBe(false);
    });
  });

  describe('label position', () => {
    it('should render label before container when label position is inline start', async () => {
      const harness = await createFixture({ labelPosition: 'inline-start' });
      expect(harness.labelElement).toBe(harness.rootElement.firstElementChild);
    });

    it('should render label before container when label position is inline end', async () => {
      const harness = await createFixture({ labelPosition: 'inline-end' });
      expect(harness.labelElement).toBe(harness.rootElement.firstElementChild);
    });

    it('should render label before container when label position is block start', async () => {
      const harness = await createFixture({ labelPosition: 'block-start' });
      expect(harness.labelElement).toBe(harness.rootElement.firstElementChild);
    });

    it('should render label as first child of container when label position is inset', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      expect(harness.labelElement).toBe(harness.containerElement.firstElementChild);
    });

    it('should render label before container when label position is none', async () => {
      const harness = await createFixture({ labelPosition: 'none' });
      expect(harness.labelElement).toBe(harness.rootElement.firstElementChild);
    });

    it('should render label as first child of container container when multiline and label position is inset', async () => {
      const harness = await createFixture({ labelPosition: 'inset', multiline: true });
      expect(harness.labelElement).toBe(harness.containerElement.firstElementChild);
    });
  });

  describe('animations', () => {
    it('should animate in floating label', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      const animationSpy = vi.fn();
      harness.rootElement.addEventListener('animationstart', animationSpy);
      harness.addSlottedContent('label');
      harness.element.floatLabel = true;

      await frame();
      await frame();

      expect(animationSpy).toHaveBeenCalled();
      expect(animationSpy.mock.calls.some((call: [AnimationEvent]) => call[0].animationName === FIELD_CONSTANTS.animations.FLOAT_IN_LABEL)).toBe(true);
    });

    it('should animate out floating label', async () => {
      const harness = await createFixture({ labelPosition: 'inset', floatLabel: true });
      const animationSpy = vi.fn();
      harness.rootElement.addEventListener('animationstart', animationSpy);
      harness.addSlottedContent('label');
      harness.element.floatLabel = false;

      await frame();
      await frame();

      expect(animationSpy).toHaveBeenCalled();
      expect(animationSpy.mock.calls.some((call: [AnimationEvent]) => call[0].animationName === FIELD_CONSTANTS.animations.FLOAT_OUT_LABEL)).toBe(true);
    });

    it('should float label in without animation', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      const animationSpy = vi.fn();
      harness.rootElement.addEventListener('animationstart', animationSpy);
      harness.addSlottedContent('label');
      harness.element.floatLabelWithoutAnimation(true);

      await frame();

      expect(animationSpy).not.toHaveBeenCalled();
    });

    it('should float label out without animation', async () => {
      const harness = await createFixture({ labelPosition: 'inset', floatLabel: true });
      const animationSpy = vi.fn();
      harness.rootElement.addEventListener('animationstart', animationSpy);
      harness.addSlottedContent('label');
      harness.element.floatLabelWithoutAnimation(false);

      await frame();

      expect(animationSpy).not.toHaveBeenCalled();
    });
  });
});

class FieldHarness extends TestHarness<IFieldComponent> {
  public rootElement: HTMLElement;
  public labelElement: HTMLElement;
  public containerElement: HTMLElement;
  public inputContainerElement: HTMLElement;
  public popoverIconElement: HTMLElement;

  constructor(el: IFieldComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.ROOT);
    this.labelElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.LABEL);
    this.containerElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.CONTAINER);
    this.inputContainerElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.INPUT_CONTAINER);
    this.popoverIconElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.POPOVER_ICON);
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    await userEvent.click(el);
  }

  public addSlottedContent(slotName: string): void {
    const div = document.createElement('div');
    div.slot = slotName;
    this.element.appendChild(div);
  }

  public removeSlottedContent(slotName: string): void {
    const el = this.element.querySelector(`[slot="${slotName}"]`);
    if (el) {
      el.remove();
    }
  }
}

interface FieldFixtureConfig {
  labelPosition?: FieldLabelPosition;
  labelAlignment?: FieldLabelAlignment;
  floatLabel?: boolean;
  invalid?: boolean;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  variant?: FieldVariant;
  theme?: FieldTheme;
  shape?: FieldShape;
  density?: FieldDensity;
  dense?: boolean;
  popoverIcon?: boolean;
  popoverExpanded?: boolean;
  multiline?: boolean;
  supportTextInset?: FieldSupportTextInset;
}

async function createFixture({
  labelPosition,
  labelAlignment,
  floatLabel,
  invalid,
  required,
  optional,
  disabled,
  variant,
  theme,
  shape,
  density,
  dense,
  popoverIcon,
  popoverExpanded,
  multiline,
  supportTextInset
}: FieldFixtureConfig = {}): Promise<FieldHarness> {
  const screen = render(html`
    <forge-field
      label-position=${ifDefined(labelPosition)}
      label-alignment=${ifDefined(labelAlignment)}
      ?float-label=${floatLabel}
      ?invalid=${invalid}
      ?required=${required}
      ?optional=${optional}
      ?disabled=${disabled}
      variant=${ifDefined(variant)}
      theme=${ifDefined(theme)}
      shape=${ifDefined(shape)}
      density=${ifDefined(density)}
      ?dense=${dense}
      ?popover-icon=${popoverIcon}
      ?popover-expanded=${popoverExpanded}
      ?multiline=${multiline}
      .supportTextInset=${supportTextInset ?? 'none'}></forge-field>
  `);
  const el = screen.container.querySelector('forge-field') as IFieldComponent;
  return new FieldHarness(el);
}

async function createDefaultFixture(): Promise<FieldHarness> {
  const screen = render(html`<forge-field></forge-field>`);
  const el = screen.container.querySelector('forge-field') as IFieldComponent;
  return new FieldHarness(el);
}
