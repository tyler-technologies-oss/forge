import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import type { IAppBarMenuButtonComponent } from './app-bar-menu-button.js';
import type { IIconComponent } from '../../icon/index.js';

import './app-bar-menu-button.js';

describe('App Bar Menu Button', () => {
  it('should be accessible', async () => {
    const el = await fixture<IAppBarMenuButtonComponent>(html`<forge-app-bar-menu-button></forge-app-bar-menu-button>`);

    await expect(el).to.be.accessible();
  });

  it('should forward aria-label', async () => {
    const el = await fixture<IAppBarMenuButtonComponent>(html`<forge-app-bar-menu-button aria-label="foo"></forge-app-bar-menu-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).to.equal('foo');
  });

  it('should remove internal aria-label if aria-label removed', async () => {
    const el = await fixture<IAppBarMenuButtonComponent>(html`<forge-app-bar-menu-button aria-label="foo"></forge-app-bar-menu-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).to.equal('foo');

    el.removeAttribute('aria-label');
    await elementUpdated(el);

    expect(iconButtonEl.getAttribute('aria-label')).to.be.null;
  });

  it('should reset internal aria-labelledby to tooltip id if external aria-labelledby removed', async () => {
    const el = await fixture<IAppBarMenuButtonComponent>(html`<forge-app-bar-menu-button aria-labelledby="foo"></forge-app-bar-menu-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;
    const tooltipEl = el.querySelector('forge-tooltip') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-labelledby')).to.equal('foo');

    el.removeAttribute('aria-labelledby');
    await elementUpdated(el);

    expect(iconButtonEl.getAttribute('aria-labelledby')).to.equal(tooltipEl.id);
  });

  it('should set icon', async () => {
    const el = await fixture<IAppBarMenuButtonComponent>(html`<forge-app-bar-menu-button icon="test"></forge-app-bar-menu-button>`);
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    expect(el.icon).to.equal('test');
    expect(iconButtonEl.name).to.equal('test');
  });

  it('should set icon dynamically', async () => {
    const el = await fixture<IAppBarMenuButtonComponent>(html`<forge-app-bar-menu-button></forge-app-bar-menu-button>`);
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    el.icon = 'test';

    expect(el.icon).to.equal('test');
    expect(iconButtonEl.name).to.equal('test');
  });

  it('should bubble click event', async () => {
    const el = await fixture<IAppBarMenuButtonComponent>(html`<forge-app-bar-menu-button></forge-app-bar-menu-button>`);
    const clickSpy = spy();
    el.addEventListener('click', clickSpy);

    el.click();

    expect(clickSpy).to.have.been.calledOnce;
  });
});
