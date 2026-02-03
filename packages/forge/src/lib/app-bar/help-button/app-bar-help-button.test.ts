import { expect } from '@esm-bundle/chai';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import type { IAppBarHelpButtonComponent } from './app-bar-help-button';
import type { IMenuComponent } from '../../menu/menu';
import type { IIconComponent } from '../../icon/icon';
import { MENU_CONSTANTS } from '../../menu/menu-constants';

import './app-bar-help-button';

describe('App Bar Help Button', () => {
  it('should be accessible', async () => {
    const el = await fixture<IAppBarHelpButtonComponent>(html`<forge-app-bar-help-button></forge-app-bar-help-button>`);

    await expect(el).to.be.accessible();
  });

  it('should set menu options', async () => {
    const el = await fixture<IAppBarHelpButtonComponent>(html`<forge-app-bar-help-button></forge-app-bar-help-button>`);
    const menuEl = el.querySelector(MENU_CONSTANTS.elementName) as IMenuComponent;

    expect(menuEl.options.length).to.equal(0);

    el.options = [
      { label: 'one', value: '1' },
      { label: 'two', value: '2' },
      { label: 'three', value: '3' }
    ];

    expect(el.options.length).to.equal(3);
    expect(menuEl.options.length).to.equal(3);
  });

  it('should forward aria-label', async () => {
    const el = await fixture<IAppBarHelpButtonComponent>(html`<forge-app-bar-help-button aria-label="foo"></forge-app-bar-help-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).to.equal('foo');
  });

  it('should remove internal aria-label if arial-label removed', async () => {
    const el = await fixture<IAppBarHelpButtonComponent>(html`<forge-app-bar-help-button aria-label="foo"></forge-app-bar-help-button>`);
    const iconButtonEl = el.querySelector('forge-icon-button') as HTMLElement;

    expect(iconButtonEl.getAttribute('aria-label')).to.equal('foo');

    el.removeAttribute('aria-label');
    await elementUpdated(el);

    expect(iconButtonEl.getAttribute('aria-label')).to.be.null;
  });

  it('should set icon', async () => {
    const el = await fixture<IAppBarHelpButtonComponent>(html`<forge-app-bar-help-button icon="test"></forge-app-bar-help-button>`);
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    expect(el.icon).to.equal('test');
    expect(iconButtonEl.name).to.equal('test');
  });

  it('should set icon dynamically', async () => {
    const el = await fixture<IAppBarHelpButtonComponent>(html`<forge-app-bar-help-button></forge-app-bar-help-button>`);
    const iconButtonEl = el.querySelector('forge-icon') as IIconComponent;

    el.icon = 'test';

    expect(el.icon).to.equal('test');
    expect(iconButtonEl.name).to.equal('test');
  });
});
