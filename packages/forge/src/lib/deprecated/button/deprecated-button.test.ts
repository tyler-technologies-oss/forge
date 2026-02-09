import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import type { IStateLayerComponent } from '../../state-layer/index.js';
import type { IFocusIndicatorComponent } from '../../focus-indicator/index.js';
import { DeprecatedButtonComponentDelegate } from './deprecated-button-component-delegate.js';
import { DeprecatedButtonComponent, IDeprecatedButtonComponent } from './deprecated-button.js';
import { DEPRECATED_BUTTON_CONSTANTS } from './deprecated-button-constants.js';

import './deprecated-button.js';

describe('Deprecated Button', () => {
  it('should initialize', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.shadowRoot).not.to.be.null;
    expect(stateLayer.disabled).to.be.false;
    expect(focusIndicator).to.be.ok;
  });

  it('should be accessible', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    await expect(el).to.be.accessible();
  });

  it('should be text (undefined) type by default', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    expect(el.type).to.be.undefined;
  });

  it('should be raised type', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button type="raised">
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    expect(el.type).to.equal('raised');
    expect(el.getAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.TYPE)).to.equal('raised');
    await expect(el).to.be.accessible();
  });

  it('should be outlined type', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button type="outlined">
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    expect(el.type).to.equal('outlined');
    expect(el.getAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.TYPE)).to.equal('outlined');
    await expect(el).to.be.accessible();
  });

  it('should be flat type', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button type="unelevated">
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    expect(el.type).to.equal('unelevated');
    expect(el.getAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.TYPE)).to.equal('unelevated');
    await expect(el).to.be.accessible();
  });

  it('should use anchor element', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <a href="javascript: void(0);">Anchor</a>
      </forge-deprecated-button>
    `);

    await expect(el).to.be.accessible();
  });

  it('should set full width', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button full-width>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    expect(el.fullWidth).to.be.true;
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.FULL_WIDTH)).to.be.true;

    el.fullWidth = false;

    expect(el.fullWidth).to.be.false;
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.FULL_WIDTH)).to.be.false;
  });

  it('should set disabled', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button disabled>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.true;

    el.disabled = false;

    expect(el.disabled).to.be.false;
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.false;
  });

  it('should wait to initialize until child button is available', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`<forge-deprecated-button></forge-deprecated-button>`);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).to.be.null;
    expect(focusIndicator.targetElement).to.be.undefined;

    const button = document.createElement('button');
    el.appendChild(button);

    await elementUpdated(el);

    expect(stateLayer.targetElement).to.equal(button);
    expect(focusIndicator.targetElement).to.equal(button);
  });

  it('should wait to initialize until child anchor is available', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`<forge-deprecated-button></forge-deprecated-button>`);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).to.be.null;
    expect(focusIndicator.targetElement).to.be.undefined;

    const anchor = document.createElement('a');
    el.appendChild(anchor);

    await elementUpdated(el);

    expect(stateLayer.targetElement).to.equal(anchor);
    expect(focusIndicator.targetElement).to.equal(anchor);
  });

  it('should dynamically swap button', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).to.equal(el.querySelector('button'));
    expect(focusIndicator.targetElement).to.equal(el.querySelector('button'));

    el.querySelector('button')?.remove();

    const anchor = document.createElement('a');
    el.appendChild(anchor);

    await elementUpdated(el);

    expect(stateLayer.targetElement).to.equal(anchor);
    expect(focusIndicator.targetElement).to.equal(anchor);
  });

  it('should detect disabled state from button when initialized', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <button type="button" disabled>Button</button>
      </forge-deprecated-button>
    `);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.true;
  });

  it('should sync disabled state from button', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    const buttonEl = el.querySelector('button') as HTMLButtonElement;
    buttonEl.disabled = true;

    await elementUpdated(el);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute(DEPRECATED_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.true;
  });

  it('should play state layer animation when pressing enter key', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    const stateLayer = getStateLayer(el);
    const playAnimationSpy = spy(stateLayer, 'playAnimation');

    el.focus();
    await sendKeys({ press: 'Enter' });

    expect(playAnimationSpy).to.be.calledOnce;
  });

  it('should play state layer animation when pressing space key', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);

    const stateLayer = getStateLayer(el);
    const playAnimationSpy = spy(stateLayer, 'playAnimation');

    el.focus();
    await sendKeys({ press: ' ' });

    expect(playAnimationSpy).to.be.calledOnce;
  });

  it('should not initialize if invalid child is element slotted in', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button>
        <div>Button</div>
      </forge-deprecated-button>
    `);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).to.be.null;
    expect(focusIndicator.targetElement).to.be.undefined;
  });

  describe('DeprecatedButtonComponentDelegate', () => {
    it('should create button via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate({ options: { text: 'Button' } });

      expect(delegate.element).to.be.instanceOf(DeprecatedButtonComponent);
      expect(delegate.element.innerText).to.equal('Button');
    });

    it('should set type via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate({ options: { type: 'button' } });

      expect(delegate.buttonElement?.type).to.equal('button');
    });

    it('should set type via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate({ options: { type: 'submit' } });

      expect(delegate.buttonElement?.type).to.equal('submit');
    });

    it('should call click listener via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = spy();

      delegate.onClick(clickSpy);
      await clickElement(delegate.buttonElement);
      delegate.element.remove();

      expect(clickSpy).to.be.have.been.calledOnce;
    });

    it('should call focus listener via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = spy();

      delegate.onFocus(focusSpy);
      await clickElement(delegate.buttonElement);
      delegate.element.remove();

      expect(focusSpy).to.be.have.been.calledOnce;
    });

    it('should call blur listener via delegate', async () => {
      const delegate = new DeprecatedButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const blurSpy = spy();

      delegate.onBlur(blurSpy);
      delegate.buttonElement?.focus();
      await clickElement(document.body);
      delegate.element.remove();

      expect(blurSpy).to.be.have.been.calledOnce;
    });
  });

  it('should be accessible with aria-label', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <forge-deprecated-button aria-label="Test label">
        <button type="button">Button</button>
      </forge-deprecated-button>
    `);
    await expect(el).to.be.accessible();
  });

  it('should be accessible with aria-labelledby', async () => {
    const el = await fixture<IDeprecatedButtonComponent>(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-deprecated-button>
          <button type="button" aria-labelledby="test-label">Button</button>
        </forge-deprecated-button>
      </div>
    `);
    const button = el.querySelector('forge-deprecated-button') as IDeprecatedButtonComponent;
    await expect(button).to.be.accessible();
  });

  function getStateLayer(btn: IDeprecatedButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(btn: IDeprecatedButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }

  function clickElement(el: HTMLElement | undefined): Promise<void> {
    if (!el) {
      return Promise.resolve();
    }
    const { x, y, width, height } = el.getBoundingClientRect();
    return sendMouse({
      type: 'click',
      position: [Math.floor(x + window.scrollX + width / 2), Math.floor(y + window.scrollY + height / 2)]
    });
  }
});
