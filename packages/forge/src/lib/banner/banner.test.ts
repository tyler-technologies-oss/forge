import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { IBannerComponent } from './banner';
import { BannerTheme, BANNER_CONSTANTS } from './banner-constants';
import { task } from '../core/utils/utils';

import './banner';

describe('Banner', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<IBannerComponent>(html`<forge-banner>Test</forge-banner>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should add and remove class when icon slot is populated', async () => {
    const el = await fixture<IBannerComponent>(html`<forge-banner><span slot="icon">icon</span>Test</forge-banner>`);
    const iconEl = el.querySelector('[slot=icon]') as HTMLSpanElement;
    const rootEl = el.shadowRoot?.querySelector('.forge-banner');

    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_ICON)).to.be.true;

    iconEl.remove();
    await elementUpdated(el);
    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_ICON)).to.be.false;

    el.appendChild(iconEl);
    await elementUpdated(el);
    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_ICON)).to.be.true;
  });

  it('should add and remove class when button slot is populated', async () => {
    const el = await fixture<IBannerComponent>(html`<forge-banner><button slot="button">button</button>Test</forge-banner>`);
    const buttonEl = el.querySelector('[slot=button]') as HTMLButtonElement;
    const rootEl = el.shadowRoot?.querySelector('.forge-banner');

    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_BUTTON)).to.be.true;

    buttonEl.remove();
    await elementUpdated(el);
    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_BUTTON)).to.be.false;

    el.appendChild(buttonEl);
    await elementUpdated(el);
    expect(rootEl?.classList.contains(BANNER_CONSTANTS.classes.HAS_BUTTON)).to.be.true;
  });

  describe('accessibility', () => {
    it('should be accessible', async () => {
      const el = await fixture(html`<forge-banner>Test</forge-banner>`);
      await expect(el).to.be.accessible();
    });

    it('should be accessible in all theme colors', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner>Test</forge-banner>`);

      const themes: BannerTheme[] = ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'];
      for (const theme of themes) {
        el.theme = theme;
        await elementUpdated(el);
        await expect(el).to.be.accessible();
      }
    });
  });

  describe('dismissed', () => {
    it('should set dismissed attribute when dismissed property is set', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);
      el.dismissed = true;

      expect(el.hasAttribute(BANNER_CONSTANTS.attributes.DISMISSED)).to.be.true;
      expect(el.offsetHeight).to.equal(0);
    });

    it('should set dismissed property when dismissed attribute is set', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner dismissed></forge-banner>`);

      expect(el.dismissed).to.be.true;
      expect(el.offsetHeight).to.equal(0);
    });

    it('should set inert attribute when dismissed', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);
      const rootEl = el.shadowRoot?.querySelector('.forge-banner') as HTMLElement;
      el.dismissed = true;

      expect(rootEl.hasAttribute('inert')).to.be.true;
    });
  });

  describe('dismissible/persistent', () => {
    it('should be dismissible (not persistent) by default', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);

      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON);
      expect(el.persistent).to.be.false;
      expect(dismissButton).not.to.be.null;
    });

    it('should hide dismiss button when persistent', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);
      el.persistent = true;

      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLElement;
      expect(dismissButton.hidden).to.be.true;
    });

    it('should dispatch dismissed event after toggling persistent', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);

      await elementUpdated(el);

      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      const dismissSpy = spy();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      el.persistent = true;
      dismissButton.click();
      await task(500);

      expect(dismissButton.hidden).to.be.true;
      expect(dismissSpy.calledOnce).to.be.false;

      el.persistent = false;
      dismissButton.click();
      await task(500);

      expect(dismissButton.hidden).to.be.false;
      expect(dismissSpy.calledOnce).to.be.true;
    });

    it('should dispatch dismissed event when dismiss button is clicked', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      const beforeDismissSpy = spy();
      const dismissSpy = spy();

      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, beforeDismissSpy);
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      await elementUpdated(el);
      dismissButton.click();

      expect(beforeDismissSpy.calledOnce).to.be.true;

      await task(500);

      expect(el.dismissed).to.be.true;
      expect(beforeDismissSpy.calledOnce).to.be.true;
      expect(dismissSpy.calledOnce).to.be.true;
    });

    it('should not dismiss when before dismiss event is prevented', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, (evt: CustomEvent) => evt.preventDefault());

      const dismissSpy = spy();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      dismissButton.click();

      expect(el.dismissed).to.be.false;
      expect(dismissSpy.called).to.be.false;
    });

    it('should not dispatch dismissed event when persistent', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner persistent></forge-banner>`);
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      expect(dismissButton.hidden).to.be.true;

      const dismissSpy = spy();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      dismissButton.click();

      expect(dismissSpy.called).to.be.false;
    });

    it('should dispatch dismissed event after animation is complete when dismiss button is clicked', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);

      await elementUpdated(el);

      const dismissSpy = spy();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;
      dismissButton.click();

      expect(dismissSpy.called).to.be.false;

      await task(500); // Transition duration defaults to 200ms

      expect(dismissSpy.calledOnce).to.be.true;
    });

    it('should not dispatch dismissed event when dismiss button is clicked and before dismiss event is prevented', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;

      const beforeDismissSpy = spy(evt => evt.preventDefault());
      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, beforeDismissSpy);

      const dismissSpy = spy();
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      await elementUpdated(el);
      dismissButton.click();

      expect(beforeDismissSpy.calledOnce).to.be.true;

      await task(500);

      expect(dismissSpy.called).to.be.false;
    });

    it('should not dispatch events if dismiss button is clicked while already dismissed', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner dismissed></forge-banner>`);
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;
      const beforeDismissSpy = spy();
      const dismissSpy = spy();

      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, beforeDismissSpy);
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      await elementUpdated(el);
      dismissButton.click();

      await task(500);

      expect(beforeDismissSpy.called).to.be.false;
      expect(dismissSpy.called).to.be.false;
    });

    it('should not dispatch events if dismiss button is clicked while persistent', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner persistent></forge-banner>`);
      const dismissButton = el.shadowRoot?.querySelector(BANNER_CONSTANTS.selectors.DISMISS_BUTTON) as HTMLButtonElement;
      const beforeDismissSpy = spy();
      const dismissSpy = spy();

      el.addEventListener(BANNER_CONSTANTS.events.BEFORE_DISMISS, beforeDismissSpy);
      el.addEventListener(BANNER_CONSTANTS.events.DISMISSED, dismissSpy);

      await elementUpdated(el);
      dismissButton.click();

      await task(500);

      expect(beforeDismissSpy.called).to.be.false;
      expect(dismissSpy.called).to.be.false;
    });
  });

  describe('theme', () => {
    it('should set theme attribute when theme property is set', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);
      el.theme = 'error';
      expect(el.getAttribute(BANNER_CONSTANTS.attributes.THEME)).to.equal('error');
    });

    it('should set theme property when theme attribute is set', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner theme="error"></forge-banner>`);
      expect(el.theme).to.equal('error');
    });

    it('should use default theme when set to null', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner theme="error"></forge-banner>`);

      expect(el.theme).to.equal('error');

      el.theme = null as any;

      expect(el.theme).to.equal(BANNER_CONSTANTS.defaults.THEME);
    });
  });

  describe('deprecated', () => {
    it('should proxy deprecated can-dismiss attribute to persistent property', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner can-dismiss="false"></forge-banner>`);
      expect(el.persistent).to.be.true;

      el.setAttribute('can-dismiss', '');
      expect(el.persistent).to.be.false;
    });

    it('should proxy deprecated canDismiss property to persistent property', async () => {
      const el = await fixture<IBannerComponent>(html`<forge-banner></forge-banner>`);

      el.canDismiss = false;
      expect(el.canDismiss).to.be.false;
      expect(el.persistent).to.be.true;

      el.canDismiss = true;
      expect(el.canDismiss).to.be.true;
      expect(el.persistent).to.be.false;
    });
  });
});
