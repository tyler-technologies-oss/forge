import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import type { IAppBarNotificationButtonComponent } from './app-bar-notification-button';
import { IIconComponent } from '../../icon';
import { IBadgeComponent } from '../../badge';

import './app-bar-notification-button';

describe('App Bar Notification Button', () => {
  it('should be accessible', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button></forge-app-bar-notification-button>`);

    await expect(el).to.be.accessible();
  });

  it('should forward aria-label', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button aria-label="foo"></forge-app-bar-notification-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).to.equal('foo');
  });

  it('should reset internal aria-label to default', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button aria-label="foo"></forge-app-bar-notification-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    el.removeAttribute('aria-label');
    await elementUpdated(el);

    expect(iconButtonEl.getAttribute('aria-label')).to.equal('Show notifications');
  });

  it('should set icon', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button icon="test"></forge-app-bar-notification-button>`);
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    expect(iconButtonEl.name).to.equal('test');
  });

  it('should set icon dynamically', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button></forge-app-bar-notification-button>`);
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    el.icon = 'test';

    expect(iconButtonEl.name).to.equal('test');
  });

  it('should show badge', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    expect(badgeEl).to.be.ok;
    expect(badgeEl.open).to.be.true;
    expect(badgeEl.innerText).to.equal('0');
  });

  it('should show badge dynamically', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button></forge-app-bar-notification-button>`);
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    el.showBadge = true;

    expect(badgeEl).to.be.ok;
    expect(badgeEl.open).to.be.true;
    expect(badgeEl.innerText).to.equal('0');
  });

  it('should hide badge', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);

    el.showBadge = false;

    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;
    expect(badgeEl).to.be.ok;
    expect(badgeEl.open).to.be.false;
  });

  it('should show badge with count', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button show-badge count="5"></forge-app-bar-notification-button>`);
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    expect(badgeEl.innerText).to.equal('5');
  });

  it('should set badge count dynamically', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    el.count = 5;

    expect(badgeEl.innerText).to.equal('5');
  });

  it('should show dot badge', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button show-badge dot></forge-app-bar-notification-button>`);
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    expect(badgeEl.dot).to.be.true;
  });

  it('should set badge dot dynamically', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    el.dot = true;

    expect(badgeEl.dot).to.be.true;
  });

  it('should set badge theme', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button show-badge theme="danger"></forge-app-bar-notification-button>`);
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    expect(badgeEl.getAttribute('theme')).to.equal('danger');
  });

  it('should set badge theme dynamically', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button show-badge></forge-app-bar-notification-button>`);
    const badgeEl = el.querySelector('forge-badge') as IBadgeComponent;

    el.theme = 'danger';

    expect(badgeEl.getAttribute('theme')).to.equal('danger');
  });

  it('should bubble click event', async () => {
    const el = await fixture<IAppBarNotificationButtonComponent>(html`<forge-app-bar-notification-button></forge-app-bar-notification-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy).to.have.been.calledOnce;
  });
});
