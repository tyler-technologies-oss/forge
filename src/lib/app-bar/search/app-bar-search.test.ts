import { expect } from '@esm-bundle/chai';
import { spy } from 'sinon';
import { elementUpdated, fixture, html } from '@open-wc/testing';
import { tick } from '@tylertech/forge-testing';
import type { IAppBarSearchComponent } from './app-bar-search';
import { APP_BAR_SEARCH_CONSTANTS } from './app-bar-search-constants';

import './app-bar-search';

describe('App Bar Search', () => {
  it('should initialize', async () => {
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search><input type="text" /></forge-app-bar-search>`);
    
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible with placeholder', async () => {
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search><input type="text" placeholder="Search" /></forge-app-bar-search>`);

    await expect(el).to.be.accessible();
  });

  it('should not initialize until input is available', async () => {
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search></forge-app-bar-search>`);
    const initializeSpy = spy(el['_foundation'], 'initialize');

    expect(initializeSpy.called).to.be.false;

    const inputEl = document.createElement('input');
    el.appendChild(inputEl);
    await elementUpdated(el);

    expect(initializeSpy.calledOnce).to.be.true;
  });

  it('should set disabled', async () => {
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search disabled><input type="text" /></forge-app-bar-search>`);
    const inputEl = el.querySelector('input') as HTMLInputElement;

    expect(el.disabled).to.be.true;
    expect(el.hasAttribute('disabled')).to.true;
    expect(inputEl.disabled).to.be.true;

    el.disabled = false;

    expect(el.disabled).to.be.false;
    expect(el.hasAttribute('disabled')).to.be.false;
    expect(inputEl.disabled).to.be.false;
  });

  it('should set value', async () => {
    let value = 'test';
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search value="${value}"><input type="text" /></forge-app-bar-search>`);

    await tick();
    
    const inputEl = el.querySelector('input') as HTMLInputElement;

    expect(el.value).to.equal(value);
    expect(inputEl.value).to.equal(value);

    value = 'test2';
    el.value = value;

    expect(el.value).to.equal(value);
    expect(inputEl.value).to.equal(value);
  });
  
  it('should set placeholder', async () => {
    let placeholder = 'Search';
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search placeholder="${placeholder}"><input type="text" /></forge-app-bar-search>`);

    await tick();
    
    const inputEl = el.querySelector('input') as HTMLInputElement;

    expect(el.placeholder).to.equal(placeholder);
    expect(inputEl.placeholder).to.equal(placeholder);

    placeholder = 'Search2';
    el.placeholder = placeholder;

    expect(el.placeholder).to.equal(placeholder);
    expect(inputEl.placeholder).to.equal(placeholder);
  });

  it('should emit input event on enter keydown', async () => {
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search><input type="text" /></forge-app-bar-search>`);
    const inputEl = el.querySelector('input') as HTMLInputElement;
    const inputSpy = spy();
    el.addEventListener(APP_BAR_SEARCH_CONSTANTS.events.INPUT, inputSpy);

    el.value = 'test';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(inputSpy.calledOnce).to.be.true;
    expect(inputSpy.firstCall.args[0].detail.value).to.equal(el.value);
  });

  it('should not emit input event on non-enter keydown', async () => {
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search><input type="text" /></forge-app-bar-search>`);
    const inputEl = el.querySelector('input') as HTMLInputElement;
    const inputSpy = spy();
    el.addEventListener(APP_BAR_SEARCH_CONSTANTS.events.INPUT, inputSpy);

    el.value = 'test';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(inputSpy.called).to.be.false;
  });

  it('should not emit input event on enter keydown when disabled', async () => {
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search disabled><input type="text" /></forge-app-bar-search>`);
    const inputEl = el.querySelector('input') as HTMLInputElement;
    const inputSpy = spy();
    el.addEventListener(APP_BAR_SEARCH_CONSTANTS.events.INPUT, inputSpy);

    el.value = 'test';
    inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(inputSpy.called).to.be.false;
  });

  it('should not emit input event on enter keydown when input is not available', async () => {
    const el = await fixture<IAppBarSearchComponent>(html`<forge-app-bar-search></forge-app-bar-search>`);
    const inputSpy = spy();
    el.addEventListener(APP_BAR_SEARCH_CONSTANTS.events.INPUT, inputSpy);

    el.value = 'test';
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(inputSpy.called).to.be.false;
  });
});
