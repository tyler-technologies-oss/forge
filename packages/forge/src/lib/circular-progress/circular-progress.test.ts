import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { getShadowElement } from '@tylertech/forge-core';
import type { ICircularProgressComponent } from './circular-progress.js';
import { CIRCULAR_PROGRESS_CONSTANTS } from './circular-progress-constants.js';

import './circular-progress.js';

describe('Circular Progress', () => {
  it('should contain shadow root', async () => {
    const screen = render(html`<forge-circular-progress></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;
    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible if aria-label is provided', async () => {
    const screen = render(html`<forge-circular-progress aria-label="Test label"></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;
    await expect(el).toBeAccessible();
  });

  it('should be accessible if aria-label is provided in determinate mode', async () => {
    const screen = render(html`<forge-circular-progress aria-label="Test label" determinate></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;
    await expect(el).toBeAccessible();
  });

  it('should have expected defaults', async () => {
    const screen = render(html`<forge-circular-progress></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;
    expect(el.progress).toBe(0);
    expect(el.determinate).toBe(false);
  });

  it('should set determinate', async () => {
    const screen = render(html`<forge-circular-progress></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;

    el.determinate = true;

    const rootElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);

    expect(el.determinate).toBe(true);
    expect(el.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).toBe(true);
    expect(rootElement.classList.contains(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).toBe(false);
    expect(determinateProgressElement.getAttribute('stroke-dashoffset')).toBe('100');
  });

  it('should set determinate via attribute', async () => {
    const screen = render(html`<forge-circular-progress determinate></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;
    const rootElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.ROOT);
    const determinateProgressElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);

    expect(el.determinate).toBe(true);
    expect(el.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.DETERMINATE)).toBe(true);
    expect(rootElement.classList.contains(CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE)).toBe(false);
    expect(determinateProgressElement.getAttribute('stroke-dashoffset')).toBe('100');
  });

  it('should remove aria-valuenow when indeterminate after determinate', async () => {
    const screen = render(html`<forge-circular-progress determinate progress="0.5"></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;

    expect(el.hasAttribute('aria-valuenow')).toBe(true);

    el.determinate = false;

    expect(el.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('should set progress', async () => {
    const screen = render(html`<forge-circular-progress></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;

    el.determinate = true;
    el.progress = 0.5;

    const determinateProgressElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);

    expect(el.progress).toBe(0.5);
    expect(el.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).toBe('0.5');
    expect(el.getAttribute('aria-valuenow')).toBe('0.5');
    expect(determinateProgressElement.getAttribute('stroke-dashoffset')).toBe('50');
  });

  it('should set progress via attribute', async () => {
    const screen = render(html`<forge-circular-progress determinate progress="0.5"></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;
    const determinateProgressElement = getShadowElement(el, CIRCULAR_PROGRESS_CONSTANTS.selectors.DETERMINATE_PROGRESS_CIRCLE);

    expect(el.progress).toBe(0.5);
    expect(el.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.PROGRESS)).toBe('0.5');
    expect(el.getAttribute('aria-valuenow')).toBe('0.5');
    expect(determinateProgressElement.getAttribute('stroke-dashoffset')).toBe('50');
  });

  it('should set aria-label', async () => {
    const expectedLabel = 'Test label';
    const screen = render(html`<forge-circular-progress aria-label="${expectedLabel}"></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;

    expect(el.getAttribute('aria-label')).toBe(expectedLabel);
  });

  it('should set theme', async () => {
    const screen = render(html`<forge-circular-progress></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;
    el.theme = 'secondary';

    expect(el.theme).toBe('secondary');
    expect(el.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.THEME)).toBe('secondary');
  });

  it('should set theme via attribute', async () => {
    const screen = render(html`<forge-circular-progress theme="secondary"></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;

    expect(el.theme).toBe('secondary');
    expect(el.getAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.THEME)).toBe('secondary');
  });

  it('should set track', async () => {
    const screen = render(html`<forge-circular-progress track></forge-circular-progress>`);
    const el = screen.container.querySelector('forge-circular-progress') as ICircularProgressComponent;

    expect(el.track).toBe(true);
    expect(el.hasAttribute(CIRCULAR_PROGRESS_CONSTANTS.attributes.TRACK)).toBe(true);
  });
});
