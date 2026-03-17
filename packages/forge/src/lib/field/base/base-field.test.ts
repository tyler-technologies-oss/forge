import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { attachShadowTemplate, getShadowElement } from '@tylertech/forge-core';
import type { IFieldComponent } from '../field.js';
import { FIELD_CONSTANTS } from '../field-constants.js';
import { BaseField, type IBaseField } from './base-field.js';
import { BaseFieldAdapter, type IBaseFieldAdapter } from './base-field-adapter.js';
import { BaseFieldCore } from './base-field-core.js';

import '../field.js';

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

if (!customElements.get('forge-test-base-field')) {
  customElements.define('forge-test-base-field', TestBaseField);
}

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
        const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
        const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
        const field = getShadowField(el);
        el.setAttribute('label-position', labelPosition);

        expect(field.labelPosition).toBe(labelPosition);
        expect(el.labelPosition).toBe(labelPosition);
      });
    });

    ['default', 'center', 'baseline', 'start', 'end'].forEach(labelAlignment => {
      it(`should set label-alignment ${labelAlignment}`, async () => {
        const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
        const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
        const field = getShadowField(el);
        el.setAttribute('label-alignment', labelAlignment);

        expect(field.labelAlignment).toBe(labelAlignment);
        expect(el.labelAlignment).toBe(labelAlignment);
      });
    });

    it('should set invalid', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      el.setAttribute('invalid', '');

      expect(field.invalid).toBe(true);
      expect(el.invalid).toBe(true);
    });

    it('should set required', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      el.setAttribute('required', '');

      expect(field.required).toBe(true);
      expect(el.required).toBe(true);
    });

    it('should set optional', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      el.setAttribute('optional', '');

      expect(field.optional).toBe(true);
      expect(el.optional).toBe(true);
    });

    it('should set disabled', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      el.setAttribute('disabled', '');

      expect(field.disabled).toBe(true);
      expect(el.disabled).toBe(true);
    });

    it('should set float-label', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      el.setAttribute('float-label', '');

      expect(field.floatLabel).toBe(true);
      expect(el.floatLabel).toBe(true);
    });

    ['plain', 'outlined', 'tonal', 'filled', 'raised'].forEach(variant => {
      it(`should set variant ${variant}`, async () => {
        const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
        const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
        const field = getShadowField(el);
        el.setAttribute('variant', variant);

        expect(field.variant).toBe(variant);
        expect(el.variant).toBe(variant);
      });
    });

    ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'].forEach(theme => {
      it(`should set theme ${theme}`, async () => {
        const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
        const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
        const field = getShadowField(el);
        el.setAttribute('theme', theme);

        expect(field.theme).toBe(theme);
        expect(el.theme).toBe(theme);
      });
    });

    ['default', 'rounded', 'squared'].forEach(shape => {
      it(`should set shape ${shape}`, async () => {
        const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
        const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
        const field = getShadowField(el);
        el.setAttribute('shape', shape);

        expect(field.shape).toBe(shape);
        expect(el.shape).toBe(shape);
      });
    });

    ['extra-small', 'small', 'medium', 'large', 'extra-large'].forEach(density => {
      it(`should set density ${density}`, async () => {
        const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
        const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
        const field = getShadowField(el);
        el.setAttribute('density', density);

        expect(field.density).toBe(density);
        expect(el.density).toBe(density);
      });
    });

    it('should set dense', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      el.setAttribute('dense', '');

      expect(field.dense).toBe(true);
      expect(el.dense).toBe(true);
    });

    it('should set popover-icon', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      el.setAttribute('popover-icon', '');

      expect(field.popoverIcon).toBe(true);
      expect(el.popoverIcon).toBe(true);
    });

    ['start', 'end', 'both', 'none'].forEach(supportTextInset => {
      it(`should set support-text-inset ${supportTextInset}`, async () => {
        const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
        const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
        const field = getShadowField(el);
        el.setAttribute('support-text-inset', supportTextInset);

        expect(field.supportTextInset).toBe(supportTextInset);
        expect(el.supportTextInset).toBe(supportTextInset);
      });
    });
  });

  describe('methods', () => {
    it('should float label in without animation', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      const adapter = getAdapter(el);
      const animationSpy = vi.fn();
      field.addEventListener('animationstart', animationSpy);

      vi.spyOn(adapter, 'hasValue', 'get').mockReturnValue(true);
      vi.spyOn(adapter, 'hasPlaceholder', 'get').mockReturnValue(true);
      el.floatLabelWithoutAnimation(true);

      expect(field.floatLabel).toBe(true);
      expect(animationSpy).not.toHaveBeenCalled();
    });

    it('should float label out without animation', async () => {
      const screen = render(html`<forge-test-base-field float-label></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const field = getShadowField(el);
      const adapter = getAdapter(el);
      const animationSpy = vi.fn();
      field.addEventListener('animationstart', animationSpy);

      vi.spyOn(adapter, 'hasValue', 'get').mockReturnValue(false);
      vi.spyOn(adapter, 'hasPlaceholder', 'get').mockReturnValue(false);
      el.floatLabelWithoutAnimation(false);

      expect(field.floatLabel).toBe(false);
      expect(animationSpy).not.toHaveBeenCalled();
    });
  });

  describe('label aware', () => {
    it('should handle label click', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const adapter = getAdapter(el);
      const clickSpy = vi.fn();

      vi.spyOn(adapter, 'click').mockImplementation(clickSpy);
      el.labelClickedCallback?.();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should handle label change', async () => {
      const screen = render(html`<forge-test-base-field></forge-test-base-field>`);
      const el = screen.container.querySelector('forge-test-base-field') as IBaseField;
      const adapter = getAdapter(el);
      const labelSpy = vi.fn();

      vi.spyOn(adapter, 'applyLabel').mockImplementation(labelSpy);
      el.labelChangedCallback?.('test');

      expect(labelSpy).toHaveBeenCalledWith('test');
    });
  });
});
