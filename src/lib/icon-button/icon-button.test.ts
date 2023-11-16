import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { sendMouse } from '@web/test-runner-commands';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { tylIconMoreVert } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '../icon/icon-registry';
import { ICON_BUTTON_CONSTANTS } from './icon-button-constants';
import { IconButtonComponent, IIconButtonComponent } from './icon-button';
import { IconButtonComponentDelegate } from './icon-button-component-delegate';
import { ITooltipComponent } from '../tooltip';
import { ICON_CLASS_NAME } from '../constants';

import './icon-button';

const DEFAULT_ICON = '<forge-icon name="more_vert"></forge-icon>';
IconRegistry.define(tylIconMoreVert);

describe('Icon Button', () => {
  it('should initialize', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should not be toggle by default', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.toggle).to.be.false;
    expect(el.on).to.be.false;
  });

  it('should have default variant', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.variant).to.equal('icon');
  });

  it('should set variant', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button variant="outlined">${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.variant).to.equal('outlined');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).to.equal('outlined');
  });

  it('should set variant dynamically', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.variant = 'tonal';

    expect(el.variant).to.equal('tonal');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).to.equal('tonal');
  });

  it('should remove reset variant when variant attribute is removed', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button variant="outlined">${DEFAULT_ICON}</forge-icon-button>`);
    
    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT);

    expect(el.variant).to.equal('icon');
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.VARIANT)).to.be.false;
  });

  it('should have default theme', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.theme).to.equal('primary');
  });

  it('should set theme', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button theme="error">${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.theme).to.equal('error');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).to.equal('error');
  });

  it('should set theme dynamically', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.theme = 'secondary';

    expect(el.theme).to.equal('secondary');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).to.equal('secondary');
  });

  it('should remove reset theme when theme attribute is removed', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button theme="secondary">${DEFAULT_ICON}</forge-icon-button>`);
    
    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME);

    expect(el.theme).to.equal('primary');
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.THEME)).to.be.false;
  });

  it('should have default shape', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.shape).to.equal('circular');
  });

  it('should set shape', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button shape="squared">${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.shape).to.equal('squared');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).to.equal('squared');
  });

  it('should set shape dynamically', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.shape = 'squared';

    expect(el.shape).to.equal('squared');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).to.equal('squared');
  });

  it('should remove reset shape when shape attribute is removed', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button shape="squared">${DEFAULT_ICON}</forge-icon-button>`);
    
    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE);

    expect(el.shape).to.equal('circular');
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.SHAPE)).to.be.false;
  });

  it('should have default density', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.density).to.equal('large');
  });

  it('should set density', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button density="small">${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.density).to.equal('small');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).to.equal('small');
  });

  it('should set density dynamically', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.density = 'small';

    expect(el.density).to.equal('small');
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).to.equal('small');
  });

  it('should remove reset density when density attribute is removed', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button density="small">${DEFAULT_ICON}</forge-icon-button>`);
    
    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY);

    expect(el.density).to.equal('large');
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.DENSITY)).to.be.false;
  });

  it('should be accessible with a aria-label', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button aria-label="Test label">${DEFAULT_ICON}</forge-icon-button>`);
    await expect(el).to.be.accessible();
  });

  it('should be accessible with a aria-labelledby', async () => {
    const el = await fixture<IIconButtonComponent>(html`
      <div>
        <forge-icon-button aria-labelledby="test-label">${DEFAULT_ICON}</forge-icon-button>
        <label id="test-label">Test label</label>
      </div>
    `);
    const iconButton = el.querySelector('forge-icon-button') as IIconButtonComponent;
    await expect(iconButton).to.be.accessible();
  });

  it('should set toggle', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.toggle).to.be.true;
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).to.be.true;
  });

  it('should set toggle dynamically', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.toggle = true;

    expect(el.toggle).to.be.true;
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).to.be.true;
  });

  it('should remove reset toggle when toggle attribute is removed', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.removeAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE);

    expect(el.toggle).to.be.false;
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.TOGGLE)).to.be.false;
  });

  it('should not be on by default', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    
    expect(el.on).to.be.false;
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.equal('false');
  });

  it('should toggle on click', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.click();

    expect(el.on).to.be.true;
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.equal('true');
  });

  it('should toggle on click when on is set', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button toggle on>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.click();

    expect(el.on).to.be.false;
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.equal('false');
  });

  it('should not toggle on click when disabled', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button toggle disabled>${DEFAULT_ICON}</forge-icon-button>`);
    
    el.click();

    expect(el.on).to.be.false;
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.equal('false');
  });

  it('should not toggle to on when toggle event cancelled', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button toggle>${DEFAULT_ICON}</forge-icon-button>`);
    const clickSpy = spy((evt: CustomEvent<boolean>) => evt.preventDefault());

    expect(el.on).to.be.false;
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.equal('false');

    el.addEventListener(ICON_BUTTON_CONSTANTS.events.TOGGLE, clickSpy);
    el.click();
    await elementUpdated(el);

    expect(clickSpy).to.be.calledOnce;
    expect(el.on).to.be.false;
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.equal('false');
  });

  it('should not toggle to off when click event cancelled', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button toggle on>${DEFAULT_ICON}</forge-icon-button>`);
    const clickSpy = spy((evt: CustomEvent<boolean>) => evt.preventDefault());

    expect(el.on).to.be.true;
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.equal('true');

    el.addEventListener(ICON_BUTTON_CONSTANTS.events.TOGGLE, clickSpy);
    el.click();
    await elementUpdated(el);

    expect(clickSpy).to.be.calledOnce;
    expect(el.on).to.be.true;
    expect(el.getAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.equal('true');
  });

  it('should not enable toggle if on is set while toggle is off', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button on>${DEFAULT_ICON}</forge-icon-button>`);

    expect(el.toggle).to.be.false;
    expect(el.on).to.be.true;
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.be.false;
  });

  it('should remove aria-pressed if on is set while toggle is off', async () => {
    const el = await fixture<IIconButtonComponent>(html`<forge-icon-button on aria-pressed="true">${DEFAULT_ICON}</forge-icon-button>`);
    
    el.on = false;

    expect(el.toggle).to.be.false;
    expect(el.on).to.be.false;
    expect(el.hasAttribute(ICON_BUTTON_CONSTANTS.attributes.ARIA_PRESSED)).to.be.false;
  });

  describe('IconButtonComponentDelegate', () => {
    it('should create icon button via delegate', async () => {
      const delegate = new IconButtonComponentDelegate({ options: { iconName: 'more_vert', iconExternal: false, iconExternalType: 'standard', iconClass: 'my-custom-class' }});

      expect(delegate.element).to.be.instanceOf(IconButtonComponent);
      expect(delegate.iconElement?.name).to.equal('more_vert');
      expect(delegate.iconElement?.external).to.be.false;
      expect(delegate.iconElement?.externalType).to.equal('standard');
      expect(delegate.iconElement?.classList.contains('my-custom-class')).to.be.true;
    });

    it('should set font-based icon', async () => {
      const delegate = new IconButtonComponentDelegate({ options: { iconName: 'more_vert', iconType: 'font' }});

      expect(delegate.element.innerText).to.equal('more_vert');
      expect(delegate.element.classList.contains(ICON_CLASS_NAME)).to.be.true;
    });

    it('should set tooltip via delegate', async () => {
      const delegate = new IconButtonComponentDelegate({ options: { tooltip: 'Test tooltip', tooltipPosition: 'bottom' }});

      const tooltipEl = delegate.element.querySelector('forge-tooltip') as ITooltipComponent;
      expect(tooltipEl.innerText).to.equal('Test tooltip');
    });

    it('should set disabled via delegate', async () => {
      const delegate = new IconButtonComponentDelegate();

      delegate.disabled = true;

      expect(delegate.disabled).to.be.true;
    });

    it('should call click handler via delegate', async () => {
      const delegate = new IconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const clickSpy = spy();

      delegate.onClick(clickSpy);
      await clickElement(delegate.element);
      delegate.element.remove();

      expect(clickSpy).to.be.calledOnce;
    });

    it('should call focus handler via delegate', async () => {
      const delegate = new IconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const focusSpy = spy();

      delegate.onFocus(focusSpy);
      delegate.element.focus();
      await clickElement(delegate.element);
      delegate.element.remove();

      expect(focusSpy).to.be.calledOnce;
    });

    it('should call blur handler via delegate', async () => {
      const delegate = new IconButtonComponentDelegate();
      document.body.appendChild(delegate.element);
      const blurSpy = spy();

      delegate.onBlur(blurSpy);
      delegate.element.focus();
      await clickElement(document.body);
      delegate.element.remove();

      expect(blurSpy).to.be.calledOnce;
    });
  });

  function clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();
    return sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }
});
