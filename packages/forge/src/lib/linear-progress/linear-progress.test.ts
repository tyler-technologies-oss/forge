import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { ILinearProgressComponent } from './linear-progress.js';
import { LINEAR_PROGRESS_CONSTANTS } from './linear-progress-constants.js';

import './linear-progress.js';

describe('Linear Progress', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-linear-progress></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible if aria-label is provided', async () => {
    const screen = render(html`<forge-linear-progress aria-label="Test label"></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;
    await expect(el).toBeAccessible();
  });

  it('should be accessible if aria-label is provided in determinate mode', async () => {
    const screen = render(html`<forge-linear-progress aria-label="Test label" determinate></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;
    await expect(el).toBeAccessible();
  });

  it('should have expected defaults', async () => {
    const screen = render(html`<forge-linear-progress></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;
    expect(el.progress).toBe(0);
    expect(el.buffer).toBe(1);
    expect(el.determinate).toBe(false);
  });

  it('should set determinate', async () => {
    const screen = render(html`<forge-linear-progress></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;

    el.determinate = true;

    const rootElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);

    expect(el.determinate).toBe(true);
    expect(el.hasAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).toBe(true);
    expect(rootElement.classList.contains(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).toBe(false);
    expect(determinateProgressElement.style.transform).toBe('scaleX(0)');
  });

  it('should reset buffer and progress when setting determinate to indeterminate', async () => {
    const screen = render(html`<forge-linear-progress determinate progress="0.5" buffer="0.75"></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;

    el.determinate = false;

    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);
    const trackElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.TRACK);
    const dotsElement = getShadowElement(el, '.dots');

    expect(el.hasAttribute('aria-valuenow')).toBe(false);
    expect(determinateProgressElement.style.transform).toBe('');
    expect(trackElement.style.transform).toBe('scaleX(1)');
    expect(getComputedStyle(dotsElement).display).toBe('none');
  });

  it('should set determinate via attribute', async () => {
    const screen = render(html`<forge-linear-progress determinate></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;
    const rootElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);

    expect(el.determinate).toBe(true);
    expect(el.hasAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).toBe(true);
    expect(rootElement.classList.contains(LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).toBe(false);
    expect(determinateProgressElement.style.transform).toBe('scaleX(0)');
  });

  it('should set progress', async () => {
    const screen = render(html`<forge-linear-progress></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;

    el.determinate = true;
    el.progress = 0.5;

    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);

    expect(el.progress).toBe(0.5);
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).toBe('0.5');
    expect(el.getAttribute('aria-valuenow')).toBe('0.5');
    expect(determinateProgressElement.style.transform).toBe('scaleX(0.5)');
  });

  it('should set buffer', async () => {
    const screen = render(html`<forge-linear-progress></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;

    el.determinate = true;
    el.buffer = 0.75;

    const trackElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.TRACK);
    const dotsElement = getShadowElement(el, '.dots');

    expect(el.buffer).toBe(0.75);
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER)).toBe('0.75');
    expect(trackElement.style.transform).toBe('scaleX(0.75)');
    expect(getComputedStyle(dotsElement).display).not.toBe('none');
  });

  it('should set progress via attribute', async () => {
    const screen = render(html`<forge-linear-progress determinate progress="0.5"></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;
    const determinateProgressElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.PROGRESS);

    expect(el.progress).toBe(0.5);
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).toBe('0.5');
    expect(el.getAttribute('aria-valuenow')).toBe('0.5');
    expect(determinateProgressElement.style.transform).toBe('scaleX(0.5)');
  });

  it('should set buffer via attribute', async () => {
    const screen = render(html`<forge-linear-progress determinate buffer="0.75"></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;
    const trackElement = getShadowElement(el, LINEAR_PROGRESS_CONSTANTS.selectors.TRACK);
    const dotsElement = getShadowElement(el, '.dots');

    expect(el.buffer).toBe(0.75);
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.BUFFER)).toBe('0.75');
    expect(trackElement.style.transform).toBe('scaleX(0.75)');
    expect(getComputedStyle(dotsElement).display).not.toBe('none');
  });

  it('should set aria-label', async () => {
    const expectedLabel = 'Test label';
    const screen = render(html`<forge-linear-progress aria-label="${expectedLabel}"></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;

    expect(el.getAttribute('aria-label')).toBe(expectedLabel);
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-linear-progress></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;

    el.theme = 'secondary';

    expect(el.theme).toBe('secondary');
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.THEME)).toBe('secondary');
  });

  it('should set theme via attribute', async () => {
    const screen = render(html`<forge-linear-progress theme="secondary"></forge-linear-progress>`);
    const el = screen.container.querySelector('forge-linear-progress') as ILinearProgressComponent;

    expect(el.theme).toBe('secondary');
    expect(el.getAttribute(LINEAR_PROGRESS_CONSTANTS.attributes.THEME)).toBe('secondary');
  });
});
