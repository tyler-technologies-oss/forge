import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { APP_BAR_CONSTANTS } from './app-bar-constants';
import type { IStateLayerComponent } from '../../state-layer';
import type { IFocusIndicatorComponent } from '../../focus-indicator';
import type { IAppBarComponent } from './app-bar';

import './app-bar';

describe('App Bar', () => {
  it('should initialize', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar></forge-app-bar>`);
    
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar title-text="Test"></forge-app-bar>`);

    await expect(el).to.be.accessible();
  });

  it('should set title', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar title-text="Test"></forge-app-bar>`);

    const titleEl = getTitleEl(el);
    expect(el.titleText).to.equal('Test');
    expect(titleEl.innerText).to.equal('Test');
  });

  it('should set title as slot', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar><h2 slot="title">Test</h2></forge-app-bar>`);

    const titleEl = getTitleEl(el);

    expect(el.titleText).to.equal('');
    expect(titleEl.innerText).to.equal('');
    await expect(el).to.be.accessible();
  });

  it('should set elevation', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar elevation="raised"></forge-app-bar>`);

    expect(el.elevation).to.equal('raised');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.ELEVATION)).to.equal('raised');

    el.elevation = 'none';

    expect(el.elevation).to.equal('none');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.ELEVATION)).to.equal('none');
  });

  it('should set theme', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar theme="white"></forge-app-bar>`);

    expect(el.theme).to.equal('white');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.THEME)).to.equal('white');

    el.theme = '';

    expect(el.theme).to.equal('');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.THEME)).to.be.false;
  });

  it('should set href', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar href="javascript: void(0);" title-text="Test"></forge-app-bar>`);

    let anchorEl = getAnchorEl(el);
    expect(el.href).to.equal('javascript: void(0);');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.HREF)).to.equal('javascript: void(0);');
    expect(anchorEl).to.be.ok;
    expect(anchorEl.href).to.equal('javascript: void(0);');
    expect(anchorEl.classList.contains(APP_BAR_CONSTANTS.classes.LOGO_TITLE_CONTAINER)).to.be.true;
    expect(getStateLayer(el)).to.be.ok;
    expect(getFocusIndicator(el)).to.be.ok;
    await expect(el).to.be.accessible();

    el.href = '';
    anchorEl = getAnchorEl(el);
    const containerEl = el.shadowRoot?.querySelector(APP_BAR_CONSTANTS.selectors.LOGO_TITLE_CONTAINER) as HTMLElement;
    
    expect(el.href).to.equal('');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.HREF)).to.be.false;
    expect(containerEl).to.be.ok;
    expect(anchorEl).not.to.be.ok;
    expect(getStateLayer(el)).not.to.be.ok;
    expect(getFocusIndicator(el)).not.to.be.ok;
  });

  it('should set anchor target', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar href="javascript: void(0);" target="_blank"></forge-app-bar>`);

    let anchorEl = getAnchorEl(el);
    expect(el.target).to.equal('_blank');
    expect(el.getAttribute(APP_BAR_CONSTANTS.attributes.TARGET)).to.equal('_blank');
    expect(anchorEl.target).to.equal('_blank');

    el.target = '';
    anchorEl = getAnchorEl(el);

    expect(el.target).to.equal('');
    expect(el.hasAttribute(APP_BAR_CONSTANTS.attributes.TARGET)).to.be.false;
    expect(anchorEl.target).to.equal('');
  });

  it('should set center section visibility', async () => {
    const el = await fixture<IAppBarComponent>(html`<forge-app-bar></forge-app-bar>`);

    const centerEl = getCenterEl(el);
    expect(centerEl.style.display).to.equal('none');
    expect(getRootEl(el).classList.contains(APP_BAR_CONSTANTS.classes.NO_CENTER)).to.be.true;

    const slottedCenterEl = document.createElement('div');
    slottedCenterEl.slot = 'center';
    el.appendChild(slottedCenterEl);

    await elementUpdated(el);

    expect(centerEl.style.display).to.equal('');
    expect(getRootEl(el).classList.contains(APP_BAR_CONSTANTS.classes.NO_CENTER)).to.be.false;
  });

  function getRootEl(el: IAppBarComponent): HTMLElement {
    return el.shadowRoot?.firstElementChild as HTMLElement;
  }

  function getTitleEl(el: IAppBarComponent): HTMLHeadingElement {
    return el.shadowRoot?.querySelector('h1') as HTMLHeadingElement;
  }

  function getAnchorEl(el: IAppBarComponent): HTMLAnchorElement {
    return el.shadowRoot?.querySelector('a') as HTMLAnchorElement;
  }

  function getCenterEl(el: IAppBarComponent): HTMLElement {
    return el.shadowRoot?.querySelector(APP_BAR_CONSTANTS.selectors.CENTER_SECTION) as HTMLElement;
  }

  function getStateLayer(el: IAppBarComponent): IStateLayerComponent {
    return el.shadowRoot?.querySelector('forge-state-layer') as IStateLayerComponent
  }

  function getFocusIndicator(el: IAppBarComponent): IFocusIndicatorComponent {
    return el.shadowRoot?.querySelector('forge-focus-indicator') as IFocusIndicatorComponent;
  }
});
