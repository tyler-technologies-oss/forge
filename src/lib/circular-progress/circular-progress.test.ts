import { expect } from '@esm-bundle/chai';
import { fixture, html } from '@open-wc/testing';
import { getShadowElement } from '@tylertech/forge-core';
import { ICircularProgressComponent } from './circular-progress';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants';

import './circular-progress';

describe('Circular Progress', () => {
  it('should contain shadow root', async () => {
    const el = await fixture(html`<forge-circular-progress></forge-circular-progress>`);
    expect(el.shadowRoot).not.to.be.null;
  });

  it('should be accessible if data-aria-label is provided', async () => {
    const el = await fixture(html`<forge-circular-progress data-aria-label="Test label"></forge-circular-progress>`);
    await expect(el).to.be.accessible();
  });

  it('should be accessible if data-aria-label is provided in determinate mode', async () => {
    const el = await fixture(html`<forge-circular-progress data-aria-label="Test label" determinate></forge-circular-progress>`);
    await expect(el).to.be.accessible();
  });

  it('should have expected defaults', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress></forge-circular-progress>`);
    await expect(el.progress).to.equal(0);
    await expect(el.determinate).to.equal(false);
  });

  it('should set determinate', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress></forge-circular-progress>`);

    el.determinate = true;

    const rootElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);

    expect(el.determinate).to.equal(true);
    expect(el.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).to.equal(true);
    expect(rootElement.classList.contains(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).to.equal(false);
    expect(determinateProgressElement.getAttribute('stroke-dashoffset')).to.equal('100');
  });

  it('should set determinate via attribute', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress determinate></forge-circular-progress>`);
    const rootElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);

    expect(el.determinate).to.equal(true);
    expect(el.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).to.equal(true);
    expect(rootElement.classList.contains(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).to.equal(false);
    expect(determinateProgressElement.getAttribute('stroke-dashoffset')).to.equal('100');
  });

  it('should set progress', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress></forge-circular-progress>`);
    
    el.determinate = true;
    el.progress = 0.5;

    const rootElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);

    expect(el.progress).to.equal(0.5);
    expect(el.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).to.equal('0.5');
    expect(rootElement.getAttribute('aria-valuenow')).to.equal('0.5');
    expect(determinateProgressElement.getAttribute('stroke-dashoffset')).to.equal('50');
  });

  it('should set progress via attribute', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress determinate progress="0.5"></forge-circular-progress>`);
    const rootElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);

    expect(el.progress).to.equal(0.5);
    expect(el.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).to.equal('0.5');
    expect(rootElement.getAttribute('aria-valuenow')).to.equal('0.5');
    expect(determinateProgressElement.getAttribute('stroke-dashoffset')).to.equal('50');
  });

  it('should set aria-label', async () => {
    const expectedLabel = 'Test label';
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress data-aria-label="${expectedLabel}"></forge-circular-progress>`);
    const rootElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);

    expect(rootElement.getAttribute('aria-label')).to.equal(expectedLabel);
  });

  it('should set theme', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress></forge-circular-progress>`);
    el.theme = 'secondary';

    expect(el.theme).to.equal('secondary');
    expect(el.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.THEME)).to.equal('secondary');
  });

  it('should set theme via attribute', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress theme="secondary"></forge-circular-progress>`);

    expect(el.theme).to.equal('secondary');
    expect(el.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.THEME)).to.equal('secondary');
  });

  it('should set track', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress></forge-circular-progress>`);
    el.track = false;

    expect(el.track).to.equal(false);
    expect(el.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.NO_TRACK)).to.equal(true);
  });

  it('should set track via attribute', async () => {
    const el = await fixture<ICircularProgressComponent>(html`<forge-circular-progress no-track></forge-circular-progress>`);

    expect(el.track).to.equal(false);
    expect(el.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.NO_TRACK)).to.equal(true);
  });
});
