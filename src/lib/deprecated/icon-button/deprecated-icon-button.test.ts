import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse, sendKeys } from '@web/test-runner-commands';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
import type { IStateLayerComponent } from '../../state-layer';
import type { IFocusIndicatorComponent } from '../../focus-indicator';
import { DeprecatedIconButtonComponentDelegate } from './deprecated-icon-button-component-delegate';
import { DeprecatedIconButtonComponent, IDeprecatedIconButtonComponent } from './deprecated-icon-button';
import { DEPRECATED_ICON_BUTTON_CONSTANTS } from './deprecated-icon-button-constants';
import { IconRegistry } from '../../icon/icon-registry';

import './deprecated-icon-button';

describe('Deprecated Icon Button', () => {
  before(() => {
    IconRegistry.define(tylIconForgeLogo);
  });

  it('should initialize', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <button type="button">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.shadowRoot).not.to.be.null;
    expect(stateLayer.disabled).to.be.false;
    expect(focusIndicator).to.be.ok;
  });

  it('should be accessible', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <button type="button" aria-label="Test label">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    await expect(el).to.be.accessible();
  });

  it('should use anchor element', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <a href="javascript: void(0);" aria-label="Navigate somewhere>
          <forge-icon name="forge_logo"></forge-icon>
        </a>
      </forge-deprecated-icon-button>
    `);

    await expect(el).to.be.accessible();
  });

  it('should set disabled', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button disabled>
        <button type="button">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.true;

    el.disabled = false;

    expect(el.disabled).to.be.false;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.false;
  });

  it('should wait to initialize until child button is available', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`<forge-deprecated-icon-button></forge-deprecated-icon-button>`);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).to.be.null;
    expect(focusIndicator.targetElement).to.be.null;

    const button = document.createElement('button');
    el.appendChild(button);

    const icon = document.createElement('forge-icon');
    icon.name = 'forge_logo';
    button.appendChild(icon);

    await elementUpdated(el);

    expect(stateLayer.targetElement).to.equal(button);
    expect(focusIndicator.targetElement).to.equal(button);
  });

  it('should wait to initialize until child anchor is available', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`<forge-deprecated-icon-button></forge-deprecated-icon-button>`);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).to.be.null;
    expect(focusIndicator.targetElement).to.be.null;

    const anchor = document.createElement('a');
    el.appendChild(anchor);

    const icon = document.createElement('forge-icon');
    icon.name = 'forge_logo';
    anchor.appendChild(icon);

    await elementUpdated(el);

    expect(stateLayer.targetElement).to.equal(anchor);
    expect(focusIndicator.targetElement).to.equal(anchor);
  });

  it('should dynamically swap button', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <button type="button">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).to.be.ok;
    expect(focusIndicator.targetElement).to.be.ok;

    el.querySelector('button')?.remove();

    const anchor = document.createElement('a');
    el.appendChild(anchor);

    const icon = document.createElement('forge-icon');
    icon.name = 'forge_logo';
    anchor.appendChild(icon);

    await elementUpdated(el);

    expect(stateLayer.targetElement).to.equal(anchor);
    expect(focusIndicator.targetElement).to.equal(anchor);
  });

  it('should detect disabled state from button when initialized', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <button type="button" disabled>Button</button>
      </forge-deprecated-icon-button>
    `);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.true;
  });

  it('should sync disabled state from button', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <button type="button">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    const buttonEl = el.querySelector('button') as HTMLButtonElement;
    buttonEl.disabled = true;

    await elementUpdated(el);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DISABLED)).to.be.true;
  });

  it('should play state layer animation when pressing enter key', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <button type="button">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    const stateLayer = getStateLayer(el);
    const playAnimationSpy = spy(stateLayer, 'playAnimation');

    el.focus();
    await sendKeys({ press: 'Enter' });

    expect(playAnimationSpy).to.be.calledOnce;
  });

  it('should play state layer animation when pressing space key', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <button type="button">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    const stateLayer = getStateLayer(el);
    const playAnimationSpy = spy(stateLayer, 'playAnimation');

    el.focus();
    await sendKeys({ press: ' ' });

    expect(playAnimationSpy).to.be.calledOnce;
  });

  it('should not initialize if invalid child is element slotted in', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <div>
          <forge-icon name="forge_logo"></forge-icon>
        </div>
      </forge-deprecated-icon-button>
    `);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(stateLayer.targetElement).to.be.null;
    expect(focusIndicator.targetElement).to.be.null;
  });

  it('should toggle icons', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button toggle>
        <button type="button">
          <forge-icon name="forge_logo" forge-icon-button-on></forge-icon>
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    const onIcon = el.querySelector(`forge-icon[${DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON}]`) as HTMLElement;
    const offIcon = el.querySelector(`forge-icon:not([${DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON}])`) as HTMLElement;

    expect(el.toggle).to.be.true;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).to.be.true;
    expect(el.isOn).to.be.false;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON)).to.be.false;
    expect(onIcon.hidden).to.be.true;
    expect(offIcon.hidden).to.be.false;

    el.isOn = true;

    expect(el.isOn).to.be.true;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON)).to.be.true;
    expect(onIcon.hidden).to.be.false;
    expect(offIcon.hidden).to.be.true;
  });

  it('should toggle when clicking button', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button toggle>
        <button type="button">
          <forge-icon name="forge_logo" forge-icon-button-on></forge-icon>
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    const onIcon = el.querySelector(`forge-icon[${DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON}]`) as HTMLElement;
    const offIcon = el.querySelector(`forge-icon:not([${DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.ON_ICON}])`) as HTMLElement;
    const buttonElement = el.querySelector('button') as HTMLButtonElement;

    const toggleSpy = spy();
    el.addEventListener(DEPRECATED_ICON_BUTTON_CONSTANTS.events.TOGGLE, toggleSpy);

    expect(el.isOn).to.be.false;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON)).to.be.false;
    expect(onIcon.hidden).to.be.true;
    expect(offIcon.hidden).to.be.false;

    await clickElement(buttonElement);

    expect(toggleSpy).to.be.calledOnce;
    expect(el.isOn).to.be.true;
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.IS_ON)).to.be.true;
    expect(onIcon.hidden).to.be.false;
    expect(offIcon.hidden).to.be.true;
  });

  it('should set density-level', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button density-level="3">
        <button type="button">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);

    expect(el.densityLevel).to.equal(3);
    expect(el.hasAttribute(DEPRECATED_ICON_BUTTON_CONSTANTS.attributes.DENSITY_LEVEL)).to.be.true;
  });

  describe('DeprecatedIconButtonComponentDelegate', () => {
    it('should create button with icon via delegate', async () => {
      const delegate = new DeprecatedIconButtonComponentDelegate({ options: { iconName: 'forge_logo' } });

      expect(delegate.element).to.be.instanceOf(DeprecatedIconButtonComponent);
      expect(delegate.buttonElement).to.be.ok;
      expect(delegate.iconElement).to.be.ok;
      expect(delegate.iconElement?.name).to.equal('forge_logo');
    });

    it('should call click listener via delegate', async () => {
      const delegate = new DeprecatedIconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = spy();

      delegate.onClick(clickSpy);
      await clickElement(delegate.buttonElement);
      delegate.element.remove();

      expect(clickSpy).to.be.have.been.calledOnce;
    });

    it('should call focus listener via delegate', async () => {
      const delegate = new DeprecatedIconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = spy();

      delegate.onFocus(focusSpy);
      await clickElement(delegate.buttonElement);
      delegate.element.remove();

      expect(focusSpy).to.be.have.been.calledOnce;
    });

    it('should call blur listener via delegate', async () => {
      const delegate = new DeprecatedIconButtonComponentDelegate();
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
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <forge-deprecated-icon-button>
        <button type="button" aria-label="Test label">
          <forge-icon name="forge_logo"></forge-icon>
        </button>
      </forge-deprecated-icon-button>
    `);
    await expect(el).to.be.accessible();
  });

  it('should be accessible with aria-labelledby', async () => {
    const el = await fixture<IDeprecatedIconButtonComponent>(html`
      <div>
        <span id="test-label">Test label</span>
        <forge-deprecated-icon-button>
          <button type="button" aria-labelledby="test-label">
            <forge-icon name="forge_logo"></forge-icon>
          </button>
        </forge-deprecated-icon-button>
      </div>
    `);
    const button = el.querySelector('forge-deprecated-icon-button') as IDeprecatedIconButtonComponent;
    await expect(button).to.be.accessible();
  });

  function getStateLayer(btn: IDeprecatedIconButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent;
  }

  function getFocusIndicator(btn: IDeprecatedIconButtonComponent): IFocusIndicatorComponent {
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
