import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { spy } from 'sinon';
import { TestHarness } from '../../../test/utils/test-harness';
import { LABEL_CONSTANTS } from '../../label';
import { IRadioComponent, RADIO_CONSTANTS } from '../radio';
import { IRadioGroupComponent } from './radio-group';
import { RADIO_GROUP_CONSTANTS } from './radio-group-constants';

import './radio-group';
import { tick } from '@tylertech/forge-testing';

class RadioGroupHarness extends TestHarness<HTMLElement> {
  public radioElements: IRadioComponent[];

  constructor(el: HTMLElement) {
    super(el);
  }

  public initElementRefs(): void {
    this.radioElements = Array.from(this.element.querySelectorAll(RADIO_CONSTANTS.elementName));
  }
}

describe('Radio group', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<IRadioGroupComponent>(html`<forge-radio-group></forge-radio-group>`);
    expect(el.shadowRoot).to.not.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<IRadioGroupComponent>(html`<forge-radio-group></forge-radio-group>`);
    await expect(el).to.be.accessible();
  });

  it('should render with correct default values', async () => {
    const el = await fixture<IRadioGroupComponent>(html`<forge-radio-group></forge-radio-group>`);
    expect(el.disabled).to.be.false;
  });

  describe('attributes', async () => {
    it('should set disabled', async () => {
      const el = await fixture<IRadioGroupComponent>(html`<forge-radio-group disabled></forge-radio-group>`);
      expect(el.disabled).to.be.true;

      el.removeAttribute('disabled');
      expect(el.disabled).to.be.false;
    });
  });

  describe('form association', async () => {
    it('should form associate', async () => {
      const form = await fixture<HTMLFormElement>(html`<form></form>`);
      const radioGroup = document.createElement(RADIO_GROUP_CONSTANTS.elementName);

      form.appendChild(radioGroup);

      expect(radioGroup.form).to.equal(form);
    });

    it('should accept a label', async () => {
      const label = await fixture<IRadioGroupComponent>(html`<label>Label</label>`);
      const radioGroup = document.createElement(RADIO_GROUP_CONSTANTS.elementName);

      label.appendChild(radioGroup);

      expect(radioGroup.labels.length).to.equal(1);
      expect(radioGroup.labels[0]).to.equal(label);
    });

    it('should accept a name', async () => {
      const radioGroup = await fixture<IRadioGroupComponent>(html`<forge-radio-group name="test"></forge-radio-group>`);
      expect(radioGroup.name).to.equal('test');

      radioGroup.name = 'new-test';
      expect(radioGroup.name).to.equal('new-test');

      radioGroup.removeAttribute('name');
      expect(radioGroup.name).to.equal('');
    });
  });

  describe('label aware', async () => {
    it('should connect to nested forge label', async () => {
      const el = await fixture<IRadioGroupComponent>(html`<forge-radio-group><forge-label legend>Label</forge-label></forge-radio-group>`);
      expect(el.ariaLabel).to.equal('Label');
    });

    it('should stop forge label connected event from propagating', async () => {
      const el = await fixture<HTMLElement>(html`<div><forge-radio-group></forge-radio-group></div>`);
      const radioGroupEl = el.querySelector(RADIO_GROUP_CONSTANTS.elementName) as IRadioGroupComponent;
      const connectedSpy = spy();

      el.addEventListener(LABEL_CONSTANTS.events.CONNECTED, connectedSpy);

      const label = document.createElement('forge-label');
      label.legend = true;
      label.innerText = 'Label';
      radioGroupEl.appendChild(label);

      await tick();
      
      expect(connectedSpy).not.to.have.been.called;
    });

    it('should accept forge label change', async () => {
      const el = await fixture<IRadioComponent>(html`<forge-radio-group></forge-radio-group>`);
      el.labelChangedCallback?.('Test label');
      expect(el.ariaLabel).to.equal('Test label');

      el.labelChangedCallback?.(null);
      expect(el.ariaLabel).to.be.null;
    });
  });

  describe('radio', async () => {
    it('should disable descendant radios', async () => {
      const el = await fixture<IRadioGroupComponent>(html`
        <forge-radio-group disabled>
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </forge-radio-group>
      `);
      const ctx = new RadioGroupHarness(el);

      ctx.radioElements.forEach(radio => {
        expect(radio.disabled).to.be.true;
      });
    });

    it('should enable descendant radios', async () => {
      const el = await fixture<IRadioGroupComponent>(html`
        <forge-radio-group disabled>
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </forge-radio-group>
      `);
      const ctx = new RadioGroupHarness(el);

      el.disabled = false;

      ctx.radioElements.forEach(radio => {
        expect(radio.disabled).to.be.false;
      });
    });

    it('should prevent descendant radios from enabling when disabled', async () => {
      const el = await fixture<IRadioGroupComponent>(html`
        <forge-radio-group disabled>
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </forge-radio-group>
      `);
      const ctx = new RadioGroupHarness(el);

      ctx.radioElements.forEach(radio => {
        radio.disabled = false;
        expect(radio.disabled).to.be.true;
      });
    });

    it('should not prevent descendant radios from disabling when enabled', async () => {
      const el = await fixture<IRadioGroupComponent>(html`
        <forge-radio-group>
          <forge-radio></forge-radio>
          <forge-radio></forge-radio>
        </forge-radio-group>
      `);
      const ctx = new RadioGroupHarness(el);

      ctx.radioElements.forEach(radio => {
        radio.disabled = true;
        expect(radio.disabled).to.be.true;
      });
    });

    it('should set required when a descendant radio is required', async () => {
      const el = await fixture<IRadioGroupComponent>(html`
        <forge-radio-group>
          <forge-radio required>One</forge-radio>
          <forge-radio>Two</forge-radio>
        </forge-radio-group>
      `);

      expect(el.ariaRequired).to.equal('true');
      await expect(el).to.be.accessible();
    });

    it('should not set required when no descendant radios are required', async () => {
      const el = await fixture<IRadioGroupComponent>(html`
        <forge-radio-group>
          <forge-radio>One</forge-radio>
          <forge-radio>Two</forge-radio>
        </forge-radio-group>
      `);

      expect(el.ariaRequired).to.be.null;
      await expect(el).to.be.accessible();
    });

    it('should set required to false when a change to descendant radios results in none being required', async () => {
      const el = await fixture<IRadioGroupComponent>(html`
        <forge-radio-group>
          <forge-radio required>One</forge-radio>
          <forge-radio>Two</forge-radio>
        </forge-radio-group>
      `);

      const radio = el.querySelector(RADIO_CONSTANTS.elementName) as IRadioComponent;
      radio.required = false;

      expect(el.ariaRequired).to.equal('false');
      await expect(el).to.be.accessible();
    });
  });
});
