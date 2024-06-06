import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { attachShadowTemplate, getShadowElement } from '@tylertech/forge-core';
import { fake, replace, replaceGetter, spy } from 'sinon';
import { IFieldComponent } from '../field';
import { FIELD_CONSTANTS } from '../field-constants';
import { BaseField, IBaseField } from './base-field';
import { BaseFieldAdapter, IBaseFieldAdapter } from './base-field-adapter';
import { BaseFieldCore } from './base-field-core';

import '../field';

class TestBaseFieldCore extends BaseFieldCore<IBaseFieldAdapter> {}
class TestBaseFieldAdapter extends BaseFieldAdapter implements IBaseFieldAdapter {
  protected _fieldElement: IFieldComponent;

  constructor(component: IBaseField) {
    super(component);
    this._fieldElement = getShadowElement(component, FIELD_CONSTANTS.elementName) as IFieldComponent;
  }

  public click(): void {
    throw new Error('Method not implemented.');
  }
  public applyLabel(value: string | null): void {
    throw new Error('Method not implemented.');
  }
  public tryFloatLabel(force?: boolean | undefined): void {
    return;
  }
  public get hasValue(): boolean {
    throw new Error('Method not implemented.');
  }
  public get hasPlaceholder(): boolean {
    throw new Error('Method not implemented.');
  }
}

const template = `
<template>
  <forge-field id="forge-test-base-field-root" part="root"></forge-field>
</template>
`;

class TestBaseField extends BaseField<TestBaseFieldCore> {
  protected readonly _core: TestBaseFieldCore;

  constructor() {
    super();
    attachShadowTemplate(this, template);
    this._core = new TestBaseFieldCore(new TestBaseFieldAdapter(this));
  }
}

window.customElements.define('forge-test-base-field', TestBaseField);

function getShadowField(el: IBaseField): IFieldComponent {
  return getShadowElement(el, FIELD_CONSTANTS.elementName) as IFieldComponent;
}

function getAdapter(el: IBaseField): TestBaseFieldAdapter {
  return (el as TestBaseField)['_core']['_adapter'] as TestBaseFieldAdapter;
}

describe('BaseField', () => {
  describe('attributes', () => {
    ['block-start', 'inline-start', 'inline-end', 'inset', 'none'].forEach(labelPosition => {
      it(`should set label-position ${labelPosition}`, async () => {
        const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
        const field = getShadowField(el);
        el.setAttribute('label-position', labelPosition);
        await elementUpdated(el);
  
        expect(field.labelPosition).to.equal(labelPosition);
        expect(el.labelPosition).to.equal(labelPosition);
      });
    });

    ['default', 'center', 'baseline', 'start', 'end'].forEach(labelAlignment => {
      it(`should set label-alignment ${labelAlignment}`, async () => {
        const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
        const field = getShadowField(el);
        el.setAttribute('label-alignment', labelAlignment);
        await elementUpdated(el);
  
        expect(field.labelAlignment).to.equal(labelAlignment);
        expect(el.labelAlignment).to.equal(labelAlignment);
      });
    });

    it('should set invalid', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const field = getShadowField(el);
      el.setAttribute('invalid', '');
      await elementUpdated(el);

      expect(field.invalid).to.be.true;
      expect(el.invalid).to.be.true;
    });

    it('should set required', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const field = getShadowField(el);
      el.setAttribute('required', '');
      await elementUpdated(el);

      expect(field.required).to.be.true;
      expect(el.required).to.be.true;
    });

    it('should set optional', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const field = getShadowField(el);
      el.setAttribute('optional', '');
      await elementUpdated(el);

      expect(field.optional).to.be.true;
      expect(el.optional).to.be.true;
    });

    it('should set disabled', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const field = getShadowField(el);
      el.setAttribute('disabled', '');
      await elementUpdated(el);

      expect(field.disabled).to.be.true;
      expect(el.disabled).to.be.true;
    });

    it('should set float-label', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const field = getShadowField(el);
      el.setAttribute('float-label', '');
      await elementUpdated(el);

      expect(field.floatLabel).to.be.true;
      expect(el.floatLabel).to.be.true;
    });

    ['plain', 'outlined', 'tonal', 'filled', 'raised'].forEach(variant => {
      it(`should set variant ${variant}`, async () => {
        const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
        const field = getShadowField(el);
        el.setAttribute('variant', variant);
        await elementUpdated(el);
  
        expect(field.variant).to.equal(variant);
        expect(el.variant).to.equal(variant);
      });
    });

    ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'].forEach(theme => {
      it(`should set theme ${theme}`, async () => {
        const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
        const field = getShadowField(el);
        el.setAttribute('theme', theme);
        await elementUpdated(el);
  
        expect(field.theme).to.equal(theme);
        expect(el.theme).to.equal(theme);
      });
    });

    ['default', 'rounded', 'squared'].forEach(shape => {
      it(`should set shape ${shape}`, async () => {
        const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
        const field = getShadowField(el);
        el.setAttribute('shape', shape);
        await elementUpdated(el);
  
        expect(field.shape).to.equal(shape);
        expect(el.shape).to.equal(shape);
      });
    });

    ['extra-small', 'small', 'medium', 'large', 'extra-large'].forEach(density => {
      it(`should set density ${density}`, async () => {
        const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
        const field = getShadowField(el);
        el.setAttribute('density', density);
        await elementUpdated(el);
  
        expect(field.density).to.equal(density);
        expect(el.density).to.equal(density);
      });
    });

    it('should set dense', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const field = getShadowField(el);
      el.setAttribute('dense', '');
      await elementUpdated(el);

      expect(field.dense).to.be.true;
      expect(el.dense).to.be.true;
    });

    it('should set popover-icon', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const field = getShadowField(el);
      el.setAttribute('popover-icon', '');
      await elementUpdated(el);

      expect(field.popoverIcon).to.be.true;
      expect(el.popoverIcon).to.be.true;
    });

    ['start', 'end', 'both', 'none'].forEach(supportTextInset => {
      it(`should set support-text-inset ${supportTextInset}`, async () => {
        const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
        const field = getShadowField(el);
        el.setAttribute('support-text-inset', supportTextInset);
        await elementUpdated(el);
  
        expect(field.supportTextInset).to.equal(supportTextInset);
        expect(el.supportTextInset).to.equal(supportTextInset);
      });
    });
  });

  describe('methods', () => {
    it('should float label in without animation', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const field = getShadowField(el);
      const adapter = getAdapter(el);
      const animationSpy = spy();
      field.addEventListener('animationstart', animationSpy);

      replaceGetter(adapter, 'hasValue', fake.returns(true));
      replaceGetter(adapter, 'hasPlaceholder', fake.returns(true));
      el.floatLabelWithoutAnimation(true);
      await elementUpdated(el);

      expect(field.floatLabel).to.be.true;
      expect(animationSpy.called).to.be.false;
    });

    it('should float label out without animation', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field float-label></forge-test-base-field>`);
      const field = getShadowField(el);
      const adapter = getAdapter(el);
      const animationSpy = spy();
      field.addEventListener('animationstart', animationSpy);

      replaceGetter(adapter, 'hasValue', fake.returns(false));
      replaceGetter(adapter, 'hasPlaceholder', fake.returns(false));
      el.floatLabelWithoutAnimation(false);
      await elementUpdated(el);

      expect(field.floatLabel).to.be.false;
      expect(animationSpy.called).to.be.false;
    });
  });

  describe('label aware', () => {
    it('should handle label click', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const adapter = getAdapter(el);
      const clickSpy = spy();

      replace(adapter, 'click', clickSpy);
      el.labelClickedCallback?.();

      expect(clickSpy.called).to.be.true;
    });

    it('should handle label change', async () => {
      const el = await fixture<IBaseField>(html`<forge-test-base-field></forge-test-base-field>`);
      const adapter = getAdapter(el);
      const labelSpy = spy();

      replace(adapter, 'applyLabel', labelSpy);
      el.labelChangedCallback?.('test');

      expect(labelSpy.calledWith('test')).to.be.true;
    });
  });
});
