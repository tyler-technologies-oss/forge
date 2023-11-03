import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendKeys, sendMouse } from '@web/test-runner-commands';
import { tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';
import { BASE_BUTTON_CONSTANTS } from './base/base-button-constants';
import type { IButtonComponent } from './button';
import type { IStateLayerComponent } from '../state-layer';
import type { IFocusIndicatorComponent } from '../focus-indicator';
import type { IIconComponent } from '../icon';

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

  it('should allow for alternate role', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button role="presentation">Button</forge-button>`);
    await elementUpdated(el);

    expect(el.role).to.equal('presentation');
  });

  it('should allow for alternate role dynamically', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    el.role = 'presentation';
    expect(el.role).to.equal('presentation');

    await elementUpdated(el);

    el.href = 'javascript: void(0);';
    expect(el.role).to.equal('presentation');

    await elementUpdated(el);

    el.href = '';
    expect(el.role).to.equal('presentation');
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

  it('should show focus indicator when focused', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    const focusIndicator = getFocusIndicator(el);
    expect(focusIndicator.active).to.be.false;

    el.focus();

    expect(el.matches(':focus-visible')).to.be.true;
    expect(focusIndicator.active).to.be.true;
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

  it('should not set popover icon by default', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    const popoverIcon = getPopoverIcon(el);

    expect(el.popoverIcon).to.be.false;
    expect(el.hasAttribute('popover-icon')).to.be.false;
    expect(popoverIcon).not.to.be.ok;
  });

  it('should set default popover icon', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button popover-icon>Button</forge-button>`);

    const popoverIcon = getPopoverIcon(el);
    expect(el.popoverIcon).to.be.true;
    expect(el.hasAttribute('popover-icon')).to.be.true;
    expect(popoverIcon).to.be.ok;
    expect(popoverIcon.name).to.equal(tylIconArrowDropDown.name);
    await expect(el).to.be.accessible();
  });

  it('should set popover icon dynamically', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    await elementUpdated(el);
    el.popoverIcon = true;

    const popoverIcon = getPopoverIcon(el);
    expect(el.popoverIcon).to.be.true;
    expect(el.hasAttribute('popover-icon')).to.be.true;
    expect(popoverIcon).to.be.ok;
    expect(popoverIcon.name).to.equal(tylIconArrowDropDown.name);
  });

  it('should set dense', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button dense>Button</forge-button>`);

    expect(el.dense).to.be.true;
    expect(el.hasAttribute('dense')).to.be.true;
    await expect(el).to.be.accessible();
  });

  it('should set type to submit', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button type="submit">Button</forge-button>`);

    expect(el.type).to.equal('submit');
    expect(el.getAttribute('type')).to.equal('submit');
    await expect(el).to.be.accessible();
  });

  it('should set type to reset', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button type="reset">Button</forge-button>`);

    expect(el.type).to.equal('reset');
    expect(el.getAttribute('type')).to.equal('reset');
    await expect(el).to.be.accessible();
  });

  it('should be disabled', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button disabled>Button</forge-button>`);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.getAttribute('aria-disabled')).to.equal('true');
    await expect(el).to.be.accessible();
  });

  it('should set disabled dynamically', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    el.disabled = true;

    let stateLayer = getStateLayer(el);
    let focusIndicator = getFocusIndicator(el);

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.be.true;
    expect(el.getAttribute('aria-disabled')).to.equal('true');
    expect(stateLayer).not.to.be.ok;
    expect(focusIndicator).not.to.be.ok;
    await expect(el).to.be.accessible();

    el.disabled = false;

    stateLayer = getStateLayer(el);
    focusIndicator = getFocusIndicator(el);

    expect(el.disabled).to.be.false;
    expect(el.hasAttribute('disabled')).to.be.false;
    expect(el.hasAttribute('aria-disabled')).to.be.false;
    expect(el.getAttribute('tabindex')).to.equal('0');
    expect(stateLayer).to.be.ok;
    expect(focusIndicator).to.be.ok;
  });

  it('should not disable when href is specified', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button disable href="javascript: void(0);">Button</forge-button>`);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.disabled).to.be.false;
    expect(el.hasAttribute('disabled')).to.be.false;
    expect(el.hasAttribute('aria-disabled')).to.be.false;
    expect(el.getAttribute('tabindex')).to.equal('0');
    expect(stateLayer).to.be.ok;
    expect(focusIndicator).to.be.ok;
    await expect(el).to.be.accessible();
  });

  it('should not disable dynamically when href is specified', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button href="javascript: void(0);">Button</forge-button>`);

    el.disabled = true;
    await elementUpdated(el);

    const stateLayer = getStateLayer(el);
    const focusIndicator = getFocusIndicator(el);

    expect(el.disabled).to.be.false;
    expect(el.hasAttribute('disabled')).to.be.false;
    expect(el.hasAttribute('aria-disabled')).to.be.false;
    expect(el.getAttribute('tabindex')).to.equal('0');
    expect(stateLayer).to.be.ok;
    expect(focusIndicator).to.be.ok;
    await expect(el).to.be.accessible();
  });

  it('should focus element when focus() is called', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    el.focus();

    expect(document.activeElement).to.equal(el);
  });

  it('should focus element when clicked', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    await clickElement(el);

    expect(document.activeElement).to.equal(el);
  });

  it('should not focus element if clicked when disabled', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button disabled>Button</forge-button>`);

    await clickElement(el);

    expect(document.activeElement).not.to.equal(el);
  });

  it('should dispatch click event when click() is called', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should dispatch click event when clicked', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    await clickElement(el);

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should dispatch click event when enter key is pressed', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.focus();
    await pressKey('Enter');
    await elementUpdated(el);

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should dispatch click event when space key is pressed', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.focus();
    await pressKey(' ');
    await elementUpdated(el);

    expect(clickSpy.calledOnce).to.be.true;
  });

  it('should not dispatch click event is keydown event is canceled', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', evt => evt.preventDefault());

    el.focus();
    await pressKey('Enter');
    await pressKey(' ');
    await elementUpdated(el);

    expect(clickSpy).not.to.be.have.been.called;
  });

  it('should not dispatch click event click() called when disabled', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button disabled>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy.calledOnce).to.be.false;
  });
  
  it('should not dispatch click event if clicked when disabled', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button disabled>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    await clickElement(el);

    expect(clickSpy.calledOnce).to.be.false;
  });

  it('should not dispatch click event if enter key is pressed when disabled', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button disabled>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.focus();
    await pressKey('Enter');
    await elementUpdated(el);

    expect(clickSpy.calledOnce).to.be.false;
  });

  it('should not dispatch click event if space key is pressed when disabled', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button disabled>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.focus();
    await pressKey(' ');
    await elementUpdated(el);

    expect(clickSpy.calledOnce).to.be.false;
  });

  it('should render <a> tag when href is set', async () => {
    const href = `javascript: console.log('href button')`;
    const el = await fixture<IButtonComponent>(html`<forge-button href="${href}">Button</forge-button>`);

    const anchorEl = getAnchorEl(el);
    expect(anchorEl).to.be.ok;
    expect(el.href).to.equal(href);
    expect(anchorEl.href).to.equal(href);
    expect(anchorEl.tabIndex).to.be.equal(-1);
    expect(anchorEl.getAttribute('aria-hidden')).to.equal('true');
    await expect(el).to.be.accessible();
  });

  it('should render <a> tag when href is set dynamically', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    const href = `javascript: console.log('href button')`;
    el.href = href;

    const anchorEl = getAnchorEl(el);
    expect(el.href).to.equal(href);
    expect(anchorEl.href).to.equal(href);
    expect(anchorEl.tabIndex).to.be.equal(-1);
    expect(anchorEl.getAttribute('aria-hidden')).to.equal('true');
    await expect(el).to.be.accessible();
  });

  it('should set all state on <a> when href is set after', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button>Button</forge-button>`);

    let anchorEl = getAnchorEl(el);
    expect(anchorEl).not.to.be.ok;
    
    el.target = '_blank';
    el.download = 'test';
    el.rel = 'noopener';
    el.href = 'javascript: void(0);'; // Set this last to ensure other anchor state is set first
    
    anchorEl = getAnchorEl(el);
    expect(anchorEl).to.be.ok;
    expect(anchorEl.getAttribute('target')).to.equal(el.target);
    expect(anchorEl.getAttribute('download')).to.equal(el.download);
    expect(anchorEl.getAttribute('rel')).to.equal(el.rel);
  });

  it('should click <a> tag when click() is called', async () => {
    window['forgeAnchorTest'] = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const el = await fixture<IButtonComponent>(html`<forge-button href="${href}">Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.click();
    await elementUpdated(el);
    delete window['forgeAnchorTest'];

    expect(clickSpy).to.have.been.calledOnce;
  });

  it('should click <a> tag via mouse', async () => {
    window['forgeAnchorTest'] = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const el = await fixture<IButtonComponent>(html`<forge-button href="${href}">Button</forge-button>`);
    const testSpy = spy(window as any, 'forgeAnchorTest');
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    await clickElement(el);
    delete window['forgeAnchorTest'];

    expect(clickSpy).to.have.been.calledOnce;
    expect(testSpy).to.have.been.calledOnce;
  });

  it('should not click <a> tag when click event is canceled', async () => {
    window['forgeAnchorTest'] = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const el = await fixture<IButtonComponent>(html`<forge-button href="${href}">Button</forge-button>`);
    const testSpy = spy(window as any, 'forgeAnchorTest');
    el.addEventListener('click', evt => evt.preventDefault());

    el.click();
    await elementUpdated(el);
    delete window['forgeAnchorTest'];

    expect(testSpy).not.to.have.been.called;
  });

  it('should click <a> tag via keyboard', async () => {
    window['forgeAnchorTest'] = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const el = await fixture<IButtonComponent>(html`<forge-button href="${href}">Button</forge-button>`);
    const testSpy = spy(window as any, 'forgeAnchorTest');
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.focus();
    await pressKey('Enter');
    await elementUpdated(el);
    delete window['forgeAnchorTest'];

    expect(clickSpy).to.have.been.calledOnce;
    expect(testSpy).to.have.been.calledOnce;
  });

  it('should not click <a> tag when enter key is pressed and event is canceled', async () => {
    window['forgeAnchorTest'] = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const el = await fixture<IButtonComponent>(html`<forge-button href="${href}">Button</forge-button>`);
    const testSpy = spy(window as any, 'forgeAnchorTest');
    el.addEventListener('click', evt => evt.preventDefault());

    el.focus();
    await pressKey('Enter');
    await elementUpdated(el);
    delete window['forgeAnchorTest'];

    expect(testSpy).not.to.have.been.called;
  });

  it('should not disable <a>', async () => {
    window['forgeAnchorTest'] = () => {};
    const href = `javascript: forgeAnchorTest()`;
    const el = await fixture<IButtonComponent>(html`<forge-button href="${href}" disabled>Button</forge-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.click();
    await elementUpdated(el);
    delete window['forgeAnchorTest'];

    expect(clickSpy).to.have.been.called;
  });

  it('should set <a> target', async () => {
    const target = '_blank';
    const el = await fixture<IButtonComponent>(html`<forge-button href="javascript: void(0);" target="${target}">Button</forge-button>`);

    const anchorEl = getAnchorEl(el);
    expect(el.target).to.equal(target);
    expect(el.getAttribute('target')).to.equal(target);
    expect(anchorEl.target).to.equal(target);
    await expect(el).to.be.accessible();
  });
  
  it('should set <a> download', async () => {
    const download = 'test';
    const el = await fixture<IButtonComponent>(html`<forge-button href="javascript: void(0);" download="${download}">Button</forge-button>`);
    
    const anchorEl = getAnchorEl(el);
    expect(el.download).to.equal(download);
    expect(el.getAttribute('download')).to.equal(download);
    expect(anchorEl.download).to.equal(download);
    await expect(el).to.be.accessible();
  });
  
  it('should set <a> rel', async () => {
    const rel = 'test';
    const el = await fixture<IButtonComponent>(html`<forge-button href="javascript: void(0);" rel="${rel}">Button</forge-button>`);
    
    const anchorEl = getAnchorEl(el);
    expect(el.rel).to.equal(rel);
    expect(el.getAttribute('rel')).to.equal(rel);
    expect(anchorEl.rel).to.equal(rel);
    await expect(el).to.be.accessible();
  });

  it('should switch from <a> to default', async () => {
    const el = await fixture<IButtonComponent>(html`<forge-button href="javascript: void(0);">Button</forge-button>`);

    let anchorEl = getAnchorEl(el);
    expect(anchorEl).to.be.ok;
    
    el.href = '';
    anchorEl = getAnchorEl(el);

    expect(anchorEl).not.to.be.ok;
  });

  it('should show popover when click() method is called', async () => {
    const el = await fixture<IButtonComponent>(html`
      <div>
        <forge-button popovertarget="test-popover">Button</forge-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const popoverEl = el.querySelector('[popover]') as HTMLElement;
    const showSpy = spy(popoverEl as any, 'showPopover');

    buttonEl.click();
    await elementUpdated(buttonEl);

    expect(showSpy).to.have.been.calledOnce;
  });

  it('should show popover when clicked', async () => {
    const el = await fixture<IButtonComponent>(html`
      <div>
        <forge-button popovertarget="test-popover">Button</forge-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const popoverEl = el.querySelector('[popover]') as HTMLElement;
    const showSpy = spy(popoverEl as any, 'showPopover');

    await clickElement(buttonEl);
    showSpy.restore();

    expect(showSpy).to.have.been.calledOnce;
  });

  it('should show popover when enter key is pressed', async () => {
    const el = await fixture<HTMLElement>(html`
      <div>
        <forge-button popovertarget="test-popover">Button</forge-button>
        <div popover id="test-popover">Popover</div>
      </div>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const popoverEl = el.querySelector('[popover]') as HTMLElement;
    const showSpy = spy(popoverEl as any, 'showPopover');

    buttonEl.focus();
    await pressKey('Enter');
    await elementUpdated(el);

    expect(showSpy).to.have.been.calledOnce;
  });

  it('should set form reference', async () => {
    const el = await fixture<IButtonComponent>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button>Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    expect(buttonEl.form).to.equal(el);
  });

  it('should submit form when click() is called', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button type="submit">Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const submitSpy = spy();
    el.addEventListener('submit', submitSpy);

    buttonEl.click();
    await elementUpdated(buttonEl);

    expect(submitSpy).to.have.been.calledOnce;
  });

  it('should submit form when clicked by mouse', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button type="submit">Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const submitSpy = spy();
    el.addEventListener('submit', submitSpy);

    await clickElement(buttonEl);

    expect(submitSpy).to.have.been.calledOnce;
  });

  it('should submit form when enter key is pressed', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button type="submit">Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const submitSpy = spy();
    el.addEventListener('submit', submitSpy);

    buttonEl.focus();
    await pressKey('Enter');
    await elementUpdated(el);

    expect(submitSpy).to.have.been.calledOnce;
  });

  it('should submit form when space key is pressed', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button type="submit">Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const submitSpy = spy();
    el.addEventListener('submit', submitSpy);

    buttonEl.focus();
    await pressKey(' ');
    await elementUpdated(el);

    expect(submitSpy).to.have.been.calledOnce;
  });

  it('should reset form when click() is called', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button type="reset">Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const resetSpy = spy();
    el.addEventListener('reset', resetSpy);

    buttonEl.click();
    await elementUpdated(buttonEl);

    expect(resetSpy).to.have.been.calledOnce;
  });

  it('should not submit form when click event is canceled', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button type="submit">Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const submitSpy = spy(evt => evt.preventDefault());
    el.addEventListener('submit', submitSpy);

    const clickSpy = spy(evt => evt.preventDefault());
    buttonEl.addEventListener('click', clickSpy);

    await clickElement(buttonEl);
    await elementUpdated(buttonEl);

    expect(clickSpy).to.have.been.called;
    expect(submitSpy).not.to.have.been.called;
  });

  it('should set correct form submit event submitter', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button type="submit" name="test">Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const submitSpy = spy(evt => {
      expect(evt.submitter).to.equal(buttonEl);
    });
    el.addEventListener('submit', submitSpy);

    buttonEl.click();
    await elementUpdated(buttonEl);

    expect(submitSpy).to.have.been.calledOnce;
  });

  it('should set name and value', async () => {
    const el = await fixture<HTMLFormElement>(html`<forge-button type="submit" name="test" value="test-value">Button</forge-button>`);

    expect(el.name).to.equal('test');
    expect(el.getAttribute('name')).to.equal('test');
    expect(el.value).to.equal('test-value');
    expect(el.getAttribute('value')).to.equal('test-value');

    el.name = 'updated-name';
    el.value = 'updated-value'

    expect(el.name).to.equal('updated-name');
    expect(el.getAttribute('name')).to.equal('updated-name');
    expect(el.value).to.equal('updated-value');
    expect(el.getAttribute('value')).to.equal('updated-value');
  });

  it('should submit form with name', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <form id="test-form" action="javascript: void(0)">
        <forge-button type="submit" name="test" value="test-value">Button</forge-button>
      </form>
    `);

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;
    const submitSpy = spy(evt => {
      const { name } = evt.submitter as HTMLButtonElement;
      const formData = new FormData(el);
      
      expect(name).to.equal('test');
      expect(buttonEl.value).to.equal('test-value');
      expect(formData.get('test')).to.equal(buttonEl.value);
    });
    el.addEventListener('submit', submitSpy);

    buttonEl.click();
    await elementUpdated(buttonEl);

    expect(submitSpy).to.have.been.calledOnce;
  });

  it('should close native <dialog> clicked as submit type', async () => {
    const el = await fixture<HTMLDialogElement>(html`
      <dialog>
        <form method="dialog">
          <forge-button type="submit">Button</forge-button>
        </form>
      </dialog>
    `);

    el.showModal();

    const buttonEl = el.querySelector('forge-button') as IButtonComponent;

    expect(el.open).to.be.true;

    buttonEl.click();
    await elementUpdated(buttonEl);

    expect(el.open).to.be.false;
  });

  function getRootEl(el: IButtonComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getAnchorEl(el: IButtonComponent): HTMLAnchorElement {
    return el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
  }

  function getStateLayer(btn: IButtonComponent): IStateLayerComponent {
    return btn.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent
  }

  function getFocusIndicator(btn: IButtonComponent): IFocusIndicatorComponent {
    return btn.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }

  function getPopoverIcon(btn: IButtonComponent): IIconComponent {
    return btn.shadowRoot?.querySelector('slot[name=end] > forge-icon') as IIconComponent;
  }

  function clickElement(el: HTMLElement): Promise<void> {
    const { x, y, width, height } = el.getBoundingClientRect();
    return sendMouse({ type: 'click', position: [
      Math.floor(x + window.scrollX + width / 2),
      Math.floor(y + window.scrollY + height / 2),
    ]});
  }

  function pressKey(press: ' ' | 'Enter'): Promise<void> {
    return sendKeys({ press });
  }
});
