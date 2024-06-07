import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { ILinearProgressComponent } from './linear-progress';
import { LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants';

import './linear-progress';

describe('Linear Progress', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-linear-progress></forge-linear-progress>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible if aria-label is provided', async () => {
    const el = await fixture(html`<forge-linear-progress aria-label="Test label"></forge-linear-progress>`);

    await expect(el).to.be.accessible();
  });

  it('should be accessible if aria-label is provided in determinate mode', async () => {
    const el = await fixture(html`<forge-linear-progress aria-label="Test label" determinate></forge-linear-progress>`);

    await expect(el).to.be.accessible();
  });

  it('should have expected defaults', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress></forge-linear-progress>`);
    await expect(el.progress).to.equal(0);
    await expect(el.buffer).to.equal(1);
    await expect(el.determinate).to.equal(false);
  });

  it('should set determinate', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress></forge-linear-progress>`);

    el.determinate = true;

    const rootElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);

    expect(el.determinate).to.equal(true);
    expect(el.hasAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).to.equal(true);
    expect(rootElement.classList.contains(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).to.equal(false);
    expect(determinateProgressElement.style.transform).to.equal('scaleX(0)');
  });

  it('should reset buffer and progress when setting determinate to indeterminate', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress determinate progress="0.5" buffer="0.75"></forge-linear-progress>`);

    el.determinate = false;

    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);
    const trackElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.TRACK);
    const dotsElement = getShadowElement(el, '.dots');

    expect(el.hasAttribute('aria-valuenow')).to.equal(false);
    expect(determinateProgressElement.style.transform).to.equal('');
    expect(trackElement.style.transform).to.equal('scaleX(1)');
    expect(getComputedStyle(dotsElement).display).to.equal('none');
  });

  it('should set determinate via attribute', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress determinate></forge-linear-progress>`);
    const rootElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);

    expect(el.determinate).to.equal(true);
    expect(el.hasAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).to.equal(true);
    expect(rootElement.classList.contains(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).to.equal(false);
    expect(determinateProgressElement.style.transform).to.equal('scaleX(0)');
  });

  it('should set progress', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress></forge-linear-progress>`);

    el.determinate = true;
    el.progress = 0.5;

    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);

    expect(el.progress).to.equal(0.5);
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).to.equal('0.5');
    expect(el.getAttribute('aria-valuenow')).to.equal('0.5');
    expect(determinateProgressElement.style.transform).to.equal('scaleX(0.5)');
  });

  it('should set buffer', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress></forge-linear-progress>`);

    el.determinate = true;
    el.buffer = 0.75;

    const trackElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.TRACK);
    const dotsElement = getShadowElement(el, '.dots');

    expect(el.buffer).to.equal(0.75);
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER)).to.equal('0.75');
    expect(trackElement.style.transform).to.equal('scaleX(0.75)');
    expect(getComputedStyle(dotsElement).display).not.to.equal('none');
  });

  it('should set progress via attribute', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress determinate progress="0.5"></forge-linear-progress>`);
    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);

    expect(el.progress).to.equal(0.5);
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).to.equal('0.5');
    expect(el.getAttribute('aria-valuenow')).to.equal('0.5');
    expect(determinateProgressElement.style.transform).to.equal('scaleX(0.5)');
  });

  it('should set buffer via attribute', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress determinate buffer="0.75"></forge-linear-progress>`);
    const trackElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.TRACK);
    const dotsElement = getShadowElement(el, '.dots');

    expect(el.buffer).to.equal(0.75);
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER)).to.equal('0.75');
    expect(trackElement.style.transform).to.equal('scaleX(0.75)');
    expect(getComputedStyle(dotsElement).display).not.to.equal('none');
  });

  it('should set aria-label', async () => {
    const expectedLabel = 'Test label';
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress aria-label="${expectedLabel}"></forge-linear-progress>`);

    expect(el.getAttribute('aria-label')).to.equal(expectedLabel);
  });

  it('should set theme', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress></forge-linear-progress>`);

    el.theme = 'secondary';

    expect(el.theme).to.equal('secondary');
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.THEME)).to.equal('secondary');
  });

  it('should set theme via attribute', async () => {
    const el = await fixture<ILinearProgressComponent>(html`<forge-linear-progress theme="secondary"></forge-linear-progress>`);

    expect(el.theme).to.equal('secondary');
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.THEME)).to.equal('secondary');
  });
});
