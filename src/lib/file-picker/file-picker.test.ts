import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { IFilePickerComponent } from './file-picker';
import './file-picker';
import { FILE_PICKER_CONSTANTS } from './file-picker-constants';
import { spy } from 'sinon';

describe('File Picker', () => {
  it('should initialize', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should should be accessible', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    await expect(el).to.be.accessible();
  });

  it('should contain the file select button', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    await expect(input).to.exist;
  });

  it('should initialize with no accept value', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    await expect(el.accept).to.be.null;
  });

  it('should initialize with no capture value', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    await expect(el.capture).to.be.null;
  });

  it('should initialize with multiple set to false', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    await expect(el.multiple).to.be.false;
  });

  it('should initialize with disabled set to false', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    await expect(el.disabled).to.be.false;
  });

  it('should initialize with compact set to false', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    await expect(el.compact).to.be.false;
  });

  it('should allow accept to be set to null', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.accept = '.png';
    el.accept = null;
    await expect(el.accept).to.be.null;
  });

  it('should allow capture to be set to null', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.capture = 'user';
    el.capture = null;
    await expect(el.capture).to.be.null;
  });

  it('should allow multiple to be set to false', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.multiple = true;
    el.multiple = false;
    await expect(el.multiple).to.be.false;
  });

  it('should allow disabled to be set to false', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.disabled = true;
    el.disabled = false;
    await expect(el.disabled).to.be.false;
  });

  it('should allow compact to be set to false', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.compact = true;
    el.compact = false;
    await expect(el.compact).to.be.false;
  });

  it('should update the accept value when the accept attribute is set', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT, '.png');
    await expect(el.accept).to.equal('.png');
  });

  it('should update the capture value when the accept attribute is set', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.CAPTURE, 'user');
    await expect(el.capture).to.equal('user');
  });

  it('should update the multiple value when the accept attribute is set', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.MULTIPLE, '');
    await expect(el.multiple).to.be.true;
  });

  it('should update the disabled value when the accept attribute is set', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.DISABLED, '');
    await expect(el.disabled).to.be.true;
  });

  it('should update the compact value when the accept attribute is set', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.setAttribute(FILE_PICKER_CONSTANTS.attributes.COMPACT, '');
    await expect(el.compact).to.be.true;
  });

  it('should set the accept attribute on the input when accept is set', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    el.accept = '.png';
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    await expect(input.getAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT)).to.equal('.png');
  });

  it('should activate a click on the file input when the select button is clicked', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    const clickSpy = spy();
    input.addEventListener('click', clickSpy);
    input.click();

    await expect(clickSpy.calledOnce).to.be.true;
  });

  it('should trigger a change event when the file input is triggered', async () => {
    const el = await fixture<IFilePickerComponent>(html`<forge-file-picker></forge-file-picker>`);
    const changeSpy = spy();
    el.addEventListener(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, changeSpy());
    const input = getShadowElement(el, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await expect(changeSpy.calledOnce).to.be.true;
  });
});
