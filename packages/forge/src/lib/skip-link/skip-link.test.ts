import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';

import './skip-link.js';
import { ISkipLinkComponent } from './skip-link.js';
import { SKIP_LINK_CONSTANTS } from './skip-link-constants.js';

describe('SkipLink', () => {
  it('should initialize', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should should be accessible', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    await expect(el).toBeAccessible();
  });

  it('should initialize with correct defaults', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    expect(el.target).toBe('');
    expect(el.theme).toBe('default');
    expect(el.muted).toBe(false);
    expect(el.persistent).toBe(false);
  });

  it('should update the target attribute when the property is set', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.target = 'main';
    expect(el.getAttribute(SKIP_LINK_CONSTANTS.attributes.TARGET)).toBe('main');
    expect(getAnchorEl(el).getAttribute('href')).toBe('#main');
  });

  it('should update the theme attribute when the property is set', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.theme = 'primary';
    expect(el.getAttribute(SKIP_LINK_CONSTANTS.attributes.THEME)).toBe('primary');
  });

  it('should update the muted attribute when the property is set', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.muted = true;
    expect(el.hasAttribute(SKIP_LINK_CONSTANTS.attributes.MUTED)).toBe(true);
  });

  it('should update the persistent attribute when the property is set', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.persistent = true;
    expect(el.hasAttribute(SKIP_LINK_CONSTANTS.attributes.PERSISTENT)).toBe(true);
  });

  it('should update the inline attribute when the property is set', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.inline = true;
    expect(el.hasAttribute(SKIP_LINK_CONSTANTS.attributes.INLINE)).toBe(true);
  });

  it('should update the skip-url-change attribute when the property is set', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.skipUrlChange = true;
    expect(el.hasAttribute(SKIP_LINK_CONSTANTS.attributes.SKIP_URL_CHANGE)).toBe(true);
  });

  it('should change the target property when set via attribute', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.TARGET, 'main');
    expect(el.target).toBe('main');
    expect(getAnchorEl(el).getAttribute('href')).toBe('#main');
  });

  it('should change the theme property when set via attribute', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.THEME, 'primary');
    expect(el.theme).toBe('primary');
  });

  it('should change the muted property when set via attribute', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.MUTED, '');
    expect(el.muted).toBe(true);
  });

  it('should change the persistent property when set via attribute', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.PERSISTENT, '');
    expect(el.persistent).toBe(true);
  });

  it('should change the inline property when set via attribute', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.INLINE, '');
    expect(el.inline).toBe(true);
  });

  it('should change the skipUrlChange property when set via attribute', async () => {
    const screen = render(html`<forge-skip-link></forge-skip-link>`);
    const el = screen.container.querySelector('forge-skip-link') as ISkipLinkComponent;
    el.setAttribute(SKIP_LINK_CONSTANTS.attributes.SKIP_URL_CHANGE, '');
    expect(el.skipUrlChange).toBe(true);
  });

  it('should focus the target element when clicked and skipUrlChange is true', async () => {
    const screen = render(html`
      <div>
        <forge-skip-link target="main" skip-url-change></forge-skip-link>
        <div id="main" tabindex="-1"></div>
      </div>
    `);
    const container = screen.container.querySelector('div') as HTMLDivElement;
    const skipLink = container.querySelector('forge-skip-link') as ISkipLinkComponent;
    const target = container.querySelector('#main');
    const anchor = getAnchorEl(skipLink);

    anchor.click();

    expect(document.activeElement).toBe(target);
  });
});

function getAnchorEl(el: ISkipLinkComponent): HTMLAnchorElement {
  return el.shadowRoot!.querySelector(SKIP_LINK_CONSTANTS.selectors.ANCHOR) as HTMLAnchorElement;
}
