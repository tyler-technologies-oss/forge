import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { IBadgeComponent } from './badge';
import { BadgeTheme, BADGE_CONSTANTS } from './badge-constants';

import './badge';

describe('Badge', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-badge>Test</forge-badge>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible', async () => {
    const el = await fixture(html`<forge-badge>Test</forge-badge>`);
    await expect(el).to.be.accessible();
  });

  it('should be accessible in all theme colors', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge>Test</forge-badge>`);

    const themes: BadgeTheme[] = ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];
    for (const theme of themes) {
      el.theme = theme;
      await elementUpdated(el);
      await expect(el).to.be.accessible();
    }
  });

  it('should set theme attribute when theme property is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge></forge-badge>`);
    el.theme = 'error';
    expect(el.getAttribute(BADGE_CONSTANTS.attributes.THEME)).to.equal('error');
  });

  it('should set theme property when theme attribute is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge theme="error"></forge-badge>`);
    expect(el.theme).to.equal('error');
  });

  it('should get default theme when no theme attribute is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge></forge-badge>`);
    expect(el.theme).to.equal(BADGE_CONSTANTS.defaults.THEME);
  });

  it('should set dot attribute when dot property is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge></forge-badge>`);
    el.dot = true;
    expect(el.hasAttribute(BADGE_CONSTANTS.attributes.DOT)).to.be.true;
  });

  it('should set dot property when dot attribute is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge dot></forge-badge>`);
    expect(el.dot).to.be.true;
  });

  it('should set strong attribute when strong property is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge></forge-badge>`);
    el.strong = true;
    expect(el.hasAttribute(BADGE_CONSTANTS.attributes.STRONG)).to.be.true;
  });

  it('should set strong property when strong attribute is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge strong></forge-badge>`);
    expect(el.strong).to.be.true;
  });

  it('should set hide attribute when hide property is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge></forge-badge>`);
    el.hide = true;
    expect(el.hasAttribute(BADGE_CONSTANTS.attributes.HIDE)).to.be.true;
  });

  it('should set hide property when hide attribute is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge hide></forge-badge>`);
    expect(el.hide).to.be.true;
  });

  it('should set transform when hide attribute is set', async () => {
    const el = await fixture<IBadgeComponent>(html`<forge-badge hide></forge-badge>`);
    const rootEl = el.shadowRoot?.querySelector(BADGE_CONSTANTS.selectors.ROOT) as HTMLElement;

    expect(getComputedStyle(rootEl).transform).to.equal('matrix(0, 0, 0, 0, 0, 0)');
  });
});
