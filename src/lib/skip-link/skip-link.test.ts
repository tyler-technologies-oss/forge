import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';

import './skip-link';
import { ISkipLinkComponent } from './skip-link';
import { SKIP_LINK_CONSTANTS } from './skip-link-constants';

describe('SkipLink', () => {
  it('should initialize', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should should be accessible', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    await expect(el).to.be.accessible();
  });

  it('should initialize with correct defaults', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    expect(el.target).to.equal('');
    expect(el.theme).to.equal('default');
    expect(el.muted).to.be.false;
    expect(el.persistent).to.be.false;
  });

  it('should update the target attribute when the property is set', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.target = 'main';
    expect(el.getAttribute(SKIP_LINK_CONSTANTS.attributes.TARGET)).to.equal('main');
    expect(getAnchorEl(el).getAttribute('href')).to.equal('#main');
  });

  it('should update the theme attribute when the property is set', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.theme = 'primary';
    expect(el.getAttribute(SKIP_LINK_CONSTANTS.attributes.THEME)).to.equal('primary');
  });

  it('should update the muted attribute when the property is set', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.muted = true;
    expect(el.hasAttribute(SKIP_LINK_CONSTANTS.attributes.MUTED)).to.be.true;
  });

  it('should update the persistent attribute when the property is set', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.persistent = true;
    expect(el.hasAttribute(SKIP_LINK_CONSTANTS.attributes.PERSISTENT)).to.be.true;
  });

  it('should change the target property when set via attribute', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.TARGET, 'main');
    expect(el.target).to.equal('main');
    expect(getAnchorEl(el).getAttribute('href')).to.equal('#main');
  });

  it('should change the theme property when set via attribute', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.THEME, 'primary');
    expect(el.theme).to.equal('primary');
  });

  it('should change the muted property when set via attribute', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.MUTED, '');
    expect(el.muted).to.be.true;
  });

  it('should change the persistent property when set via attribute', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.PERSISTENT, '');
    expect(el.persistent).to.be.true;
  });

  function getAnchorEl(el: ISkipLinkComponent): HTMLAnchorElement {
    return el.shadowRoot!.querySelector(SKIP_LINK_CONSTANTS.selectors.ANCHOR) as HTMLAnchorElement;
  }
});
