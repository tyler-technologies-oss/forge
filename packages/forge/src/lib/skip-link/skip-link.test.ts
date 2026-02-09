import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';

import './skip-link.js';
import { ISkipLinkComponent } from './skip-link.js';
import { SKIP_LINK_CONSTANTS } from './skip-link-constants.js';

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

  it('should update the inline attribute when the property is set', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.inline = true;
    expect(el.hasAttribute(SKIP_LINK_CONSTANTS.attributes.INLINE)).to.be.true;
  });

  it('should update the skip-url-change attribute when the property is set', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.skipUrlChange = true;
    expect(el.hasAttribute(SKIP_LINK_CONSTANTS.attributes.SKIP_URL_CHANGE)).to.be.true;
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

  it('should change the inline property when set via attribute', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.INLINE, '');
    expect(el.inline).to.be.true;
  });

  it('should change the skipUrlChange property when set via attribute', async () => {
    const el = await fixture<ISkipLinkComponent>(html`<forge-skip-link></forge-skip-link>`);
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.SKIP_URL_CHANGE, '');
    expect(el.skipUrlChange).to.be.true;
  });

  it('should focus the target element when clicked and skipUrlChange is true', async () => {
    const el = await fixture<ISkipLinkComponent>(html`
      <div>
        <forge-skip-link target="main" skip-url-change></forge-skip-link>
        <div id="main" tabindex="-1"></div>
      </div>
    `);
    const skipLink = el.querySelector('forge-skip-link');
    const target = el.querySelector('#main');
    const anchor = getAnchorEl(skipLink!);

    anchor.click();

    expect(document.activeElement).to.equal(target);
  });

  function getAnchorEl(el: ISkipLinkComponent): HTMLAnchorElement {
    return el.shadowRoot!.querySelector(SKIP_LINK_CONSTANTS.selectors.ANCHOR) as HTMLAnchorElement;
  }
});
