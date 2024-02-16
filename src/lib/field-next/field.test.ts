import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { dispatchNativeEvent, tick } from '@tylertech/forge-testing';
import { sendMouse } from '@web/test-runner-commands';
import { match, spy } from 'sinon';
import { FieldDensity, FieldLabelAlignment, FieldLabelPosition, FieldShape, FieldSupportTextInset, FieldTheme, FieldVariant, FIELD_CONSTANTS, IFieldComponent } from '.';
import { TestHarness } from '../../test/utils/test-harness';

import './field';

describe('Field', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();
    expect(harness.element.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const harness = await createFixture()
    await expect(harness.element).to.be.accessible();
  });

  describe('properties', () => {
    (['inline-start', 'inline-end', 'block-start', 'inset', 'none'] as FieldLabelPosition[]).forEach((labelPosition) => {
      it(`should set label position ${labelPosition}`, async () => {
        const harness = await createFixture({ labelPosition });
        expect(harness.element.labelPosition).to.equal(labelPosition);
      });
    });
  
    (['default', 'center', 'baseline', 'start', 'end'] as FieldLabelAlignment[]).forEach((labelAlignment) => {
      it(`should set label alignment ${labelAlignment}`, async () => {
        const harness = await createFixture({ labelAlignment });
        expect(harness.element.labelAlignment).to.equal(labelAlignment);
      });
    });
  
    it('should set float label', async () => {
      const harness = await createFixture({ floatLabel: true });
      expect(harness.element.floatLabel).to.be.true;
    });
  
    it('should set invalid', async () => {
      const harness = await createFixture({ invalid: true });
      expect(harness.element.invalid).to.be.true;
    });
  
    it('should set required', async () => {
      const harness = await createFixture({ required: true });
      expect(harness.element.required).to.be.true;
    });
  
    it('should set optional', async () => {
      const harness = await createFixture({ optional: true });
      expect(harness.element.optional).to.be.true;
    });
  
    it('should set disabled', async () => {
      const harness = await createFixture({ disabled: true });
      expect(harness.element.disabled).to.be.true;
    });
  
    (['plain', 'outlined', 'tonal', 'filled', 'raised'] as FieldVariant[]).forEach((variant) => {
      it(`should set ${variant} variant`, async () => {
        const harness = await createFixture({ variant });
        expect(harness.element.variant).to.equal(variant);
      });
    });
  
    (['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'] as FieldTheme[]).forEach((theme) => {
      it(`should set ${theme} theme`, async () => {
        const harness = await createFixture({ theme });
        expect(harness.element.theme).to.equal(theme);
      });
    });
  
    (['default', 'rounded', 'squared'] as FieldShape[]).forEach((shape) => {
      it(`should set ${shape} shape`, async () => {
        const harness = await createFixture({ shape });
        expect(harness.element.shape).to.equal(shape);
      });
    });
  
    (['extra-small', 'small', 'medium', 'large', 'extra-large'] as FieldDensity[]).forEach((density) => {
      it(`should set ${density} density`, async () => {
        const harness = await createFixture({ density });
        expect(harness.element.density).to.equal(density);
      });
    });
  
    it('should set dense', async () => {
      const harness = await createFixture({ dense: true });
      expect(harness.element.dense).to.be.true;
    });
  
    it('should set popover icon', async () => {
      const harness = await createFixture({ popoverIcon: true });
      expect(harness.element.popoverIcon).to.be.true;
    });
  
    it('should set popover expanded', async () => {
      const harness = await createFixture({ popoverExpanded: true });
      expect(harness.element.popoverExpanded).to.be.true;
    });
  
    it('should set multiline', async () => {
      const harness = await createFixture({ multiline: true });
      expect(harness.element.multiline).to.be.true;
    });
  
    (['none', 'start', 'end', 'both'] as FieldSupportTextInset[]).forEach((supportTextInset) => {
      it(`should set support text inset ${supportTextInset}`, async () => {
        const harness = await createFixture({ supportTextInset });
        expect(harness.element.supportTextInset).to.equal(supportTextInset);
      });
    });
  });

  describe('attributes', () => {
    (['inline-start', 'inline-end', 'block-start', 'inset', 'none'] as FieldLabelPosition[]).forEach((labelPosition) => {    
      if (labelPosition === FIELD_CONSTANTS.defaults.DEFAULT_LABEL_POSITION) {
        return;
      }
      
      it(`should set label position ${labelPosition} attribute`, async () => {
        const harness = await createDefaultFixture();
        harness.element.labelPosition = labelPosition;
        expect(harness.element.getAttribute(FIELD_CONSTANTS.attributes.LABEL_POSITION)).to.equal(labelPosition);
      });
    });

    (['default', 'center', 'baseline', 'start', 'end'] as FieldLabelAlignment[]).forEach((labelAlignment) => {
      if (labelAlignment === FIELD_CONSTANTS.defaults.DEFAULT_LABEL_ALIGNMENT) {
        return;
      }

      it(`should set label alignment ${labelAlignment} attribute`, async () => {
        const harness = await createDefaultFixture();
        harness.element.labelAlignment = labelAlignment;
        expect(harness.element.getAttribute(FIELD_CONSTANTS.attributes.LABEL_ALIGNMENT)).to.equal(labelAlignment);
      });
    });

    it('should set float label attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.floatLabel = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.FLOAT_LABEL)).to.be.true;
    });

    it('should set invalid attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.invalid = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.INVALID)).to.be.true;
    });

    it('should set required attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.required = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.REQUIRED)).to.be.true;
    });

    it('should set optional attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.optional = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.OPTIONAL)).to.be.true;
    });

    it('should set disabled attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.disabled = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.DISABLED)).to.be.true;
    });

    it('should set popover icon attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.popoverIcon = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.POPOVER_ICON)).to.be.true;
    });

    it('should set popover expanded attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.popoverExpanded = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.POPOVER_EXPANDED)).to.be.true;
    });

    it('should set multiline attribute', async () => {
      const harness = await createDefaultFixture();
      harness.element.multiline = true;
      expect(harness.element.hasAttribute(FIELD_CONSTANTS.attributes.MULTILINE)).to.be.true;
    });

    (['none', 'start', 'end', 'both'] as FieldSupportTextInset[]).forEach((supportTextInset) => {
      if (supportTextInset === FIELD_CONSTANTS.defaults.DEFAULT_SUPPORT_TEXT_INSET) {
        return;
      }

      it(`should set support text inset ${supportTextInset} attribute`, async () => {
        const harness = await createDefaultFixture();
        harness.element.supportTextInset = supportTextInset;
        expect(harness.element.getAttribute(FIELD_CONSTANTS.attributes.SUPPORT_TEXT_INSET)).to.equal(supportTextInset);
      });
    });
  });

  describe('defaults', () => {
    it('should default label position to "inset"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.labelPosition).to.equal('inset');
    });

    it('should default label alignment to "default"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.labelAlignment).to.equal('default');
    });

    it('should default float label to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.floatLabel).to.be.false;
    });

    it('should default invalid to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.invalid).to.be.false;
    });

    it('should default required to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.required).to.be.false;
    });

    it('should default optional to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.optional).to.be.false;
    });

    it('should default disabled to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.disabled).to.be.false;
    });

    it('should default variant to "outlined"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.variant).to.equal('outlined');
    });

    it('should default theme to "default"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.theme).to.equal('default');
    });

    it('should default shape to "default"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.shape).to.equal('default');
    });

    it('should default density to "medium"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.density).to.equal('medium');
    });

    it('should default dense to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.dense).to.be.false;
    });

    it('should default popover icon to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.popoverIcon).to.be.false;
    });

    it('should default popover expanded to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.popoverExpanded).to.be.false;
    });

    it('should default multiline to false', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.multiline).to.be.false;
    });

    it('should default support text inset to "none"', async () => {
      const harness = await createDefaultFixture();
      expect(harness.element.supportTextInset).to.equal('none');
    });
  });

  describe('events', () => {
    it('should dispatch popover icon click event', async () => {
      const harness = await createFixture({ popoverIcon: true });
      const clickSpy = spy();
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_CLICK, clickSpy);

      await harness.clickElement(harness.popoverIconElement);

      expect(clickSpy.called).to.be.true;
    });

    it('should not dispatch popover icon click event when popover icon is false', async () => {
      const harness = await createDefaultFixture();
      const clickSpy = spy();
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_CLICK, clickSpy);

      dispatchNativeEvent(harness.popoverIconElement, 'click');

      expect(clickSpy.called).to.be.false;
    });

    it('should not dispatch popover icon click event when popover icon is removed', async () => {
      const harness = await createFixture({ popoverIcon: true });
      const clickSpy = spy();
      harness.element.addEventListener(FIELD_CONSTANTS.events.POPOVER_ICON_CLICK, clickSpy);
      harness.element.popoverIcon = false;

      dispatchNativeEvent(harness.popoverIconElement, 'click');

      expect(clickSpy.called).to.be.false;
    });
  });

  describe('slots', () => {
    it('should add class when start slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('start');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_START)).to.be.true;
    });

    it('should not add class when start slot has no content', async () => {
      const harness = await createDefaultFixture();
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_START)).to.be.false;
    });

    it('should remove class when start slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('start');
      await tick();
      harness.removeSlottedContent('start');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_START)).to.be.false;
    });

    it('should add class when end slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('end');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_END)).to.be.true;
    });

    it('should not add class when end slot has no content', async () => {
      const harness = await createDefaultFixture();
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_END)).to.be.false;
    });

    it('should remove class when end slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('end');
      await tick();
      harness.removeSlottedContent('end');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_END)).to.be.false;
    });

    it('should add class when accessory slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('accessory');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_ACCESSORY)).to.be.true;
    });

    it('should not add class when accessory slot has no content', async () => {
      const harness = await createDefaultFixture();
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_ACCESSORY)).to.be.false;
    });

    it('should remove class when accessory slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('accessory');
      await tick();
      harness.removeSlottedContent('accessory');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_ACCESSORY)).to.be.false;
    });

    it('should add class when support text start slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('support-text-start');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_START)).to.be.true;
    });

    it('should not add class when support text start slot has no content', async () => {
      const harness = await createDefaultFixture();
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_START)).to.be.false;
    });

    it('should remove class when support text start slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('support-text-start');
      await tick();
      harness.removeSlottedContent('support-text-start');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_START)).to.be.false;
    });

    it('should add class when support text end slot has content', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('support-text-end');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_END)).to.be.true;
    });

    it('should not add class when support text end slot has no content', async () => {
      const harness = await createDefaultFixture();
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_END)).to.be.false;
    });

    it('should remove class when support text end slot content is removed', async () => {
      const harness = await createDefaultFixture();
      harness.addSlottedContent('support-text-end');
      await tick();
      harness.removeSlottedContent('support-text-end');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_SUPPORT_END)).to.be.false;
    });

    it('should add class when label slot has content and label position is inset', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      harness.addSlottedContent('label');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_LABEL)).to.be.true;
    });

    it('should not add class when label slot has content and label position is not inset', async () => {
      const harness = await createFixture({ labelPosition: 'inline-start' });
      harness.addSlottedContent('label');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_LABEL)).to.be.false;
    });

    it('should remove class when label slot content is removed and label position is inset', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      harness.addSlottedContent('label');
      await tick();
      harness.removeSlottedContent('label');
      await tick();
      expect(harness.rootElement.classList.contains(FIELD_CONSTANTS.classes.HAS_LABEL)).to.be.false;
    });
  });

  describe('label position', () => {
    it('should render label before container when label position is inline start', async () => {
      const harness = await createFixture({ labelPosition: 'inline-start' });
      expect(harness.labelElement).to.equal(harness.rootElement.firstElementChild);
    });

    it('should render label after container when label position is inline end', async () => {
      const harness = await createFixture({ labelPosition: 'inline-end' });
      expect(harness.labelElement).to.equal(harness.rootElement.lastElementChild);
    });

    it('should render label before container when label position is block start', async () => {
      const harness = await createFixture({ labelPosition: 'block-start' });
      expect(harness.labelElement).to.equal(harness.rootElement.firstElementChild);
    });

    it('should render label as first child of container when label position is inset', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      expect(harness.labelElement).to.equal(harness.containerElement.firstElementChild);
    });

    it('should render label before container when label position is none', async () => {
      const harness = await createFixture({ labelPosition: 'none' });
      expect(harness.labelElement).to.equal(harness.rootElement.firstElementChild);
    });

    it('should render label as first child of resize container when multiline and label position is inset', async () => {
      const harness = await createFixture({ labelPosition: 'inset', multiline: true });
      expect(harness.labelElement).to.equal(harness.resizeContainerElement.firstElementChild);
    });
  });

  describe('resize container', () => {
    it('should not render resize container by default', async () => {
      const harness = await createDefaultFixture();
      const resizeContainer = getShadowElement(harness.element, FIELD_CONSTANTS.selectors.RESIZE_CONTAINER);
      expect(resizeContainer).to.be.null;
    });

    it('should add resize container when multiline', async () => {
      const harness = await createFixture({ multiline: true });
      const resizeContainer = getShadowElement(harness.element, FIELD_CONSTANTS.selectors.RESIZE_CONTAINER);
      expect(resizeContainer).not.to.be.null;
    });

    it('should remove resize container when not multiline', async () => {
      const harness = await createFixture({ multiline: true });
      harness.element.multiline = false;
      const resizeContainer = getShadowElement(harness.element, FIELD_CONSTANTS.selectors.RESIZE_CONTAINER);
      expect(resizeContainer).to.be.null;
    });
  });

  describe('animations', () => {
    it('should animate in floating label', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      const animationSpy = spy();
      harness.rootElement.addEventListener('animationstart', animationSpy);
      harness.addSlottedContent('label');
      harness.element.floatLabel = true;

      await tick();

      expect(animationSpy.calledWithMatch(match({ animationName: FIELD_CONSTANTS.animations.FLOAT_IN_LABEL }))).to.be.true;
    });

    it('should animate out floating label', async () => {
      const harness = await createFixture({ labelPosition: 'inset', floatLabel: true });
      const animationSpy = spy();
      harness.rootElement.addEventListener('animationstart', animationSpy);
      harness.addSlottedContent('label');
      harness.element.floatLabel = false;

      await tick();

      expect(animationSpy.calledWithMatch(match({ animationName: FIELD_CONSTANTS.animations.FLOAT_OUT_LABEL }))).to.be.true;
    });

    it('should float label in without animation', async () => {
      const harness = await createFixture({ labelPosition: 'inset' });
      const animationSpy = spy();
      harness.rootElement.addEventListener('animationstart', animationSpy);
      harness.addSlottedContent('label');
      harness.element.floatLabelWithoutAnimation(true);

      await tick();

      expect(animationSpy.called).to.be.false;
    });

    it('should float label out without animation', async () => {
      const harness = await createFixture({ labelPosition: 'inset', floatLabel: true });
      const animationSpy = spy();
      harness.rootElement.addEventListener('animationstart', animationSpy);
      harness.addSlottedContent('label');
      harness.element.floatLabelWithoutAnimation(false);

      await tick();

      expect(animationSpy.called).to.be.false;
    });
  });
});

class FieldHarness extends TestHarness<IFieldComponent> {
  public rootElement: HTMLElement;
  public labelElement: HTMLElement;
  public containerElement: HTMLElement;
  public popoverIconElement: HTMLElement;
  public resizeContainerElement: HTMLElement;

  constructor(el: IFieldComponent) {
    super(el);
  }

  public initElementRefs(): void {
    this.rootElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.ROOT);
    this.labelElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.LABEL);
    this.containerElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.CONTAINER);
    this.popoverIconElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.POPOVER_ICON);
    this.resizeContainerElement = getShadowElement(this.element, FIELD_CONSTANTS.selectors.RESIZE_CONTAINER);
  }

  public async clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height} = el.getBoundingClientRect();

    await sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2)
    ]});
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
  const el = await fixture<IFieldComponent>(html`
    <forge-field
      .labelPosition=${labelPosition}
      .labelAlignment=${labelAlignment}
      .floatLabel=${floatLabel}
      .invalid=${invalid}
      .required=${required}
      .optional=${optional}
      .disabled=${disabled}
      .variant=${variant}
      .theme=${theme}
      .shape=${shape}
      .density=${density}
      .dense=${dense}
      .popoverIcon=${popoverIcon}
      .popoverExpanded=${popoverExpanded}
      .multiline=${multiline}
      .supportTextInset=${supportTextInset}
    ></forge-field>
  `);
  return new FieldHarness(el);
}

async function createDefaultFixture(): Promise<FieldHarness> {
  const el = await fixture<IFieldComponent>(html`<forge-field></forge-field>`);
  return new FieldHarness(el);
}
