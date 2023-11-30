import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { BASE_BUTTON_CONSTANTS } from './base/base-button-constants';
import { BUTTON_CONSTANTS } from './button-constants';
import { ButtonComponent, IButtonComponent } from './button';
import type { IStateLayerComponent } from '../state-layer';
import type { IFocusIndicatorComponent } from '../focus-indicator';
import { ButtonComponentDelegate } from './button-component-delegate';

import './button';

describe('Button', () => {
  it('should initialize', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    const rootEl = getRootEl(el);
    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);
    
    expect(el.shadowRoot).not.to.be.null;
    expect(el.type).to.equal('button');
    expect(rootEl.getAttribute('part')).to.equal('root');
    expect(rootEl.classList.contains(BASE_BUTTON_CONSTANTS.classes.ROOT)).to.be.true;
    expect(stateLayer.disabled).to.be.false;
    expect(focusIndicator).to.be.ok;
  });

  it('should be accessible', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    await expect(el).to.be.accessible();
  });

  it('should be text variant by default', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    expect(el.variant).to.equal('text');
  });

  it('should be raised variant', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="raised">Button</forge-button>`);

    expect(el.variant).to.equal('raised');
    await expect(el).to.be.accessible();
  });

  it('should be outlined variant', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="outlined">Button</forge-button>`);

    expect(el.variant).to.equal('outlined');
    await expect(el).to.be.accessible();
  });

  it('should be flat variant', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="flat">Button</forge-button>`);

    expect(el.variant).to.equal('flat');
    await expect(el).to.be.accessible();
  });

  it('should be link variant', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="link">Button</forge-button>`);

    const stateLayer = getStateLayer(el);

    expect(el.variant).to.equal('link');
    expect(stateLayer.disabled).to.be.true;
    await expect(el).to.be.accessible();
  });

  it('should enable state layer when switching from link variant dynamically', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button variant="link">Button</forge-button>`);

    const stateLayer = getStateLayer(el);
    expect(stateLayer.disabled).to.be.true;

    el.variant = 'raised';

    expect(stateLayer.disabled).to.be.false;
  });

  it('should set pill', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button pill>Button</forge-button>`);

    expect(el.pill).to.be.true;
    expect(el.hasAttribute('pill')).to.be.true;
    await expect(el).to.be.accessible();
  });

  it('should set theme', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button theme="success">Button</forge-button>`);

    expect(el.theme).to.equal('success');
    expect(el.getAttribute('theme')).to.equal('success');
    await expect(el).to.be.accessible();
  });

  it('should set full width', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button full-width>Button</forge-button>`);

    expect(el.fullWidth).to.be.true;
    expect(el.hasAttribute(BUTTON_CONSTANTS.attributes.FULL_WIDTH)).to.be.true;

    el.fullWidth = false;

    expect(el.fullWidth).to.be.false;
    expect(el.hasAttribute(BUTTON_CONSTANTS.attributes.FULL_WIDTH)).to.be.false;
  });

  describe('ButtonComponentDelegate', () => {
    it('should create button via delegate', async () => {
      const delegate = new ButtonComponentDelegate({ options: { text: 'Button' }});

      expect(delegate.element).to.be.instanceOf(ButtonComponent);
      expect(delegate.element.innerText).to.equal('Button');
    });

    it('should set variant via delegate', async () => {
      const delegate = new ButtonComponentDelegate({ options: { variant: 'raised' }});

      expect(delegate.element.variant).to.equal('raised');
    });

    it('should set type via delegate', async () => {
      const delegate = new ButtonComponentDelegate({ options: { type: 'submit' }});

      expect(delegate.element.type).to.equal('submit');
    });

    it('should call click listener via delegate', async () => {
      const delegate = new ButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = spy();

      delegate.onClick(clickSpy);
      await clickElement(delegate.element);
      delegate.element.remove();

      expect(clickSpy).to.be.have.been.calledOnce;
    });

    it('should call focus listener via delegate', async () => {
      const delegate = new ButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = spy();

      delegate.onFocus(focusSpy);
      await clickElement(delegate.element);
      delegate.element.remove();

      expect(focusSpy).to.be.have.been.calledOnce;
    });

    it('should call blur listener via delegate', async () => {
      const delegate = new ButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const blurSpy = spy();

      delegate.onBlur(blurSpy);
      delegate.element.focus();
      await clickElement(document.body);
      delegate.element.remove();

      expect(blurSpy).to.be.have.been.calledOnce;
    });
  });

  it('should be accessible with aria-label', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button aria-label="Test label">Button</forge-button>`);
    await expect(el).to.be.accessible();
  });

  it('should be accessible with aria-labelledby', async () => {
    const el = await fixture<IButtonComponent>(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-button aria-labelledby="test-label"></forge-button>
      </div>
    `);
    const button = el.querySelector('forge-button') as IButtonComponent;
    await expect(button).to.be.accessible();
  });

  function getRootEl(el: IButtonComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getStateLayer(btn: IButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent
  }

  function getFocusIndicator(btn: IButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }

  function clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();
    return sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }
});
