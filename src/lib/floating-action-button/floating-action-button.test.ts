import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { tylIconFavorite } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '../icon/icon-registry';
import type { IStateLayerComponent } from '../state-layer';
import type { IFocusIndicatorComponent } from '../focus-indicator';
import { FloatingActionButtonComponent, IFloatingActionButtonComponent } from './floating-action-button';
import { FloatingActionButtonComponentDelegate } from './floating-action-button-component-delegate';
import { FLOATING_ACTION_BUTTON_CONSTANTS } from './floating-action-button-constants';

import './floating-action-button';
import { ICON_CLASS_NAME } from '../constants';
IconRegistry.define(tylIconFavorite);

describe('Floating Action Button', () => {
  it('should initialize', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab>Label</forge-fab>`);

    const rootEl = getRootEl(el);
    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);
    
    expect(el.shadowRoot).not.to.be.null;
    expect(el.type).to.equal('button');
    expect(rootEl.getAttribute('part')).to.equal('root');
    expect(stateLayer.disabled).to.be.false;
    expect(focusIndicator).to.be.ok;
  });

  it('should have correct defaults', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab>Label</forge-fab>`);

    expect(el.theme).to.equal('secondary');
    expect(el.dense).to.be.false;
    expect(el.density).to.equal('medium');
    expect(el.elevation).to.equal('raised');
  });

  it('should be accessible', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab>Label</forge-fab>`);

    await expect(el).to.be.accessible();
  });

  it('should be accessible when disabled', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab disabled>Label</forge-fab>`);

    await expect(el).to.be.accessible();
  });

  it('should be accessible with icon and aria-label', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`
      <forge-fab aria-label="With icon">
        <forge-icon name="favorite></forge-icon>
      </forge-fab>
    `);

    await expect(el).to.be.accessible();
  });

  it('should be accessible with aria-labelledby', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`
      <div>
        <label id="test-label">Test label</label>
        <forge-fab aria-labelledby="test-label">
          <forge-icon name="favorite></forge-icon>
        </forge-fab>
      </div>
    `);

    const button = el.querySelector('forge-fab') as IFloatingActionButtonComponent;
    await expect(button).to.be.accessible();
  });

  it('should set theme', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab theme="success">FAB</forge-fab>`);

    expect(el.theme).to.equal('success');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME)).to.equal('success');
    await expect(el).to.be.accessible();
  });

  it('should set density', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab density="small">FAB</forge-fab>`);

    expect(el.density).to.equal('small');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY)).to.equal('small');
    await expect(el).to.be.accessible();
  });

  it('should set elevation', async () => {
    const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab elevation="lowered">FAB</forge-fab>`);

    expect(el.elevation).to.equal('lowered');
    expect(el.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION)).to.equal('lowered');
    await expect(el).to.be.accessible();
  });

  describe('Extended detection', () => {
    it('should not be extended by default', async () => {
      const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab><forge-icon name="favorite"></forge-icon></forge-fab>`);

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).to.be.false;
    });

    it('should not be extended when has short label in default slot', async () => {
      const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab>A</forge-fab>`);

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).to.be.false;
    });

    it('should be extended when has long label in default slot', async () => {
      const el = await fixture<IFloatingActionButtonComponent>(html`<forge-fab>Long label text</forge-fab>`);

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).to.be.true;
    });

    it('should be extended when has short label in label slot', async () => {
      const el = await fixture<IFloatingActionButtonComponent>(html`
        <forge-fab>
          <span slot="label">A</span>
        </forge-fab>
      `);

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).to.be.true;
    });

    it('should be extended when has icon and label', async () => {
      const el = await fixture<IFloatingActionButtonComponent>(html`
        <forge-fab>
          <forge-icon name="favorite"></forge-icon>
          <span>Label</span>
        </forge-fab>
      `);

      const rootEl = getRootEl(el);
      expect(rootEl.classList.contains(FLOATING_ACTION_BUTTON_CONSTANTS.classes.EXTENDED)).to.be.true;
    });
  });

  describe('ButtonComponentDelegate', () => {
    it('should create button via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { label: 'FAB' }});

      expect(delegate.element).to.be.instanceOf(FloatingActionButtonComponent);
      expect(delegate.element.innerText).to.equal('FAB');
    });

    it('should set theme via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { theme: 'success' }});

      expect(delegate.element.theme).to.equal('success');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.THEME)).to.equal('success');
    });

    it('should set density via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { density: 'small' }});

      expect(delegate.element.density).to.equal('small');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.DENSITY)).to.equal('small');
    });

    it('should set elevation via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { elevation: 'lowered' }});

      expect(delegate.element.elevation).to.equal('lowered');
      expect(delegate.element.getAttribute(FLOATING_ACTION_BUTTON_CONSTANTS.attributes.ELEVATION)).to.equal('lowered');
    });

    it('should create icon button via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { iconName: 'more_vert', iconExternal: false, iconExternalType: 'standard', iconClass: 'my-custom-class' }});

      expect(delegate.element).to.be.instanceOf(FloatingActionButtonComponent);
      expect(delegate.iconElement?.name).to.equal('more_vert');
      expect(delegate.iconElement?.external).to.be.false;
      expect(delegate.iconElement?.externalType).to.equal('standard');
      expect(delegate.iconElement?.classList.contains('my-custom-class')).to.be.true;
    });

    it('should set font-based icon', async () => {
      const delegate = new FloatingActionButtonComponentDelegate({ options: { iconName: 'more_vert', iconType: 'font' }});

      expect(delegate.element.innerText).to.equal('more_vert');
      expect(delegate.element.classList.contains(ICON_CLASS_NAME)).to.be.true;
    });

    it('should set disabled via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate();

      delegate.disabled = true;

      expect(delegate.disabled).to.be.true;
      expect(delegate.element.hasAttribute('disabled')).to.be.true;
    });

    it('should call click listener via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = spy();

      delegate.onClick(clickSpy);
      await clickElement(delegate.element);
      delegate.element.remove();

      expect(clickSpy).to.be.have.been.calledOnce;
    });

    it('should call focus listener via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = spy();

      delegate.onFocus(focusSpy);
      await clickElement(delegate.element);
      delegate.element.remove();

      expect(focusSpy).to.be.have.been.calledOnce;
    });

    it('should call blur listener via delegate', async () => {
      const delegate = new FloatingActionButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const blurSpy = spy();

      delegate.onBlur(blurSpy);
      delegate.element.focus();
      await clickElement(document.body);
      delegate.element.remove();

      expect(blurSpy).to.be.have.been.calledOnce;
    });
  });

  function getRootEl(el: IFloatingActionButtonComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getStateLayer(btn: IFloatingActionButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent
  }

  function getFocusIndicator(btn: IFloatingActionButtonComponent): IFocusIndicatorComponent {
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
