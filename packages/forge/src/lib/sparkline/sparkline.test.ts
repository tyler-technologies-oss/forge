import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-lit';
import { html } from 'lit';
import { SparklineComponent } from './sparkline.js';

import './sparkline.js';

describe('Sparkline', () => {
  it('should instantiate shadow root', async () => {
    const screen = render(html`<forge-sparkline></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    expect(el.shadowRoot).not.toBeNull();
  });

  it('should be accessible', async () => {
    const screen = render(html`<forge-sparkline .data=${[1, 2, 3]}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await expect(el).toBeAccessible();
  });

  it('should have default property values', async () => {
    const screen = render(html`<forge-sparkline></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    expect(el.value).toEqual([]);
    expect(el.animated).toBe(true);
    expect(el.filled).toBe(true);
    expect(el.theme).toBe('primary');
  });

  it('should accept data property', async () => {
    const data = [1, 2, 3, 4, 5];
    const screen = render(html`<forge-sparkline .data=${data}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    expect(el.value).toEqual(data);
  });

  it('should render with empty data', async () => {
    const screen = render(html`<forge-sparkline .data=${[]}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('.sparkline-fill')).not.toBeNull();
  });

  it('should update when data changes', async () => {
    const screen = render(html`<forge-sparkline .data=${[1, 2, 3]}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const fillEl = el.shadowRoot?.querySelector('.sparkline-fill') as HTMLElement;
    const initialClipPath = fillEl.style.getPropertyValue('--_sparkline-clip-path');

    el.value = [10, 20, 30, 40, 50];
    await el.updateComplete;

    const updatedClipPath = fillEl.style.getPropertyValue('--_sparkline-clip-path');
    expect(updatedClipPath).not.toBe(initialClipPath);
  });

  it('should apply theme class', async () => {
    const screen = render(html`<forge-sparkline theme="success"></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const root = el.shadowRoot?.querySelector('.forge-sparkline');
    expect(root?.classList.contains('theme--success')).toBe(true);
  });

  it('should apply filled class when filled is true', async () => {
    const screen = render(html`<forge-sparkline filled></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const root = el.shadowRoot?.querySelector('.forge-sparkline');
    expect(root?.classList.contains('filled')).toBe(true);
  });

  it('should apply animated class when animated is true', async () => {
    const screen = render(html`<forge-sparkline animated></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const root = el.shadowRoot?.querySelector('.forge-sparkline');
    expect(root?.classList.contains('animated')).toBe(true);
  });

  it('should handle single data point', async () => {
    const screen = render(html`<forge-sparkline .data=${[50]}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const fillEl = el.shadowRoot?.querySelector('.sparkline-fill') as HTMLElement;
    const clipPath = fillEl.style.getPropertyValue('--_sparkline-clip-path');

    // Single point should be centered (50%)
    expect(clipPath).toContain('50.00%');
  });

  it('should handle all same values', async () => {
    const screen = render(html`<forge-sparkline .data=${[5, 5, 5, 5]}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const fillEl = el.shadowRoot?.querySelector('.sparkline-fill') as HTMLElement;
    const clipPath = fillEl.style.getPropertyValue('--_sparkline-clip-path');

    // All same values should normalize to 50%
    expect(clipPath).toContain('50.00%');
  });

  it('should respect custom min and max', async () => {
    const screen = render(html`<forge-sparkline .data=${[5, 10, 15]} .min=${0} .max=${20}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    expect(el.min).toBe(0);
    expect(el.max).toBe(20);
  });

  it('should have role="img" for accessibility', async () => {
    const screen = render(html`<forge-sparkline></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    expect(el.getAttribute('role')).toBe('img');
  });

  it('should have smooth property default to false', async () => {
    const screen = render(html`<forge-sparkline></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    expect(el.smooth).toBe(false);
  });

  it('should accept smooth property', async () => {
    const screen = render(html`<forge-sparkline smooth></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    expect(el.smooth).toBe(true);
  });

  it('should generate linear path when smooth is false', async () => {
    const screen = render(html`<forge-sparkline .data=${[10, 20, 30]}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const pathEl = el.shadowRoot?.querySelector('.path') as SVGPathElement;
    const d = pathEl.getAttribute('d');

    expect(d).toContain('M ');
    expect(d).toContain(' L ');
    expect(d).not.toContain(' C ');
  });

  it('should generate smooth path when smooth is true', async () => {
    const screen = render(html`<forge-sparkline .data=${[10, 20, 30]} smooth></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const pathEl = el.shadowRoot?.querySelector('.path') as SVGPathElement;
    const d = pathEl.getAttribute('d');

    expect(d).toContain('M ');
    expect(d).toContain(' C ');
    expect(d).not.toContain(' L ');
  });

  it('should update path when smooth property changes', async () => {
    const screen = render(html`<forge-sparkline .data=${[10, 20, 30, 40]}></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const pathEl = el.shadowRoot?.querySelector('.path') as SVGPathElement;
    const linearPath = pathEl.getAttribute('d');

    el.smooth = true;
    await el.updateComplete;

    const smoothPath = pathEl.getAttribute('d');
    expect(smoothPath).not.toBe(linearPath);
    expect(smoothPath).toContain(' C ');
  });

  it('should handle single point with smooth enabled', async () => {
    const screen = render(html`<forge-sparkline .data=${[50]} smooth></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const pathEl = el.shadowRoot?.querySelector('.path') as SVGPathElement;
    const d = pathEl.getAttribute('d');

    expect(d).toMatch(/^M \d+\.\d+ \d+\.\d+$/);
  });

  it('should handle two points with smooth enabled', async () => {
    const screen = render(html`<forge-sparkline .data=${[10, 90]} smooth></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const pathEl = el.shadowRoot?.querySelector('.path') as SVGPathElement;
    const d = pathEl.getAttribute('d');

    expect(d).toContain('M ');
    expect(d).toContain(' L ');
  });

  it('should render smooth curve through all data points', async () => {
    const data = [10, 50, 30, 70, 20];
    const screen = render(html`<forge-sparkline .data=${data} smooth></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const pathEl = el.shadowRoot?.querySelector('.path') as SVGPathElement;
    const d = pathEl.getAttribute('d');

    const curveCommands = (d?.match(/C /g) || []).length;
    expect(curveCommands).toBe(data.length - 1);
  });

  it('should handle empty data with smooth enabled', async () => {
    const screen = render(html`<forge-sparkline .data=${[]} smooth></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    const pathEl = el.shadowRoot?.querySelector('.path') as SVGPathElement;
    const d = pathEl.getAttribute('d');

    expect(d).toBe('');
  });

  it('should work with all properties combined', async () => {
    const screen = render(html`<forge-sparkline .data=${[10, 30, 20, 50, 40]} .min=${0} .max=${60} smooth animated filled theme="success"></forge-sparkline>`);
    const el = screen.container.querySelector('forge-sparkline') as SparklineComponent;

    await el.updateComplete;
    expect(el.smooth).toBe(true);
    expect(el.animated).toBe(true);
    expect(el.filled).toBe(true);
    expect(el.theme).toBe('success');

    const pathEl = el.shadowRoot?.querySelector('.path') as SVGPathElement;
    const d = pathEl.getAttribute('d');
    expect(d).toContain(' C ');
  });
});
