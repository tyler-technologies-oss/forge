import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { html } from 'lit';
import { defineChart, barY } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { renderFixture } from '../../testing/fixture.js';
import { ChartComponent, ChartComponentTagName } from './chart.js';

const rows = [
  { category: 'Search', value: 84 },
  { category: 'Direct', value: 63 },
  { category: 'Referral', value: 47 }
];

const _createDefinition = (data = rows): NonNullable<ChartComponent['definition']> =>
  defineChart({
    marks: [barY(data, { x: 'category', y: 'value' })],
    scales: {
      x: { scale: () => scaleBand<string>().domain(data.map(row => row.category)) },
      y: { scale: scaleLinear }
    }
  });

const renderChart = (template = html`<forge-chart aria-label="Signups" .definition=${_createDefinition()}></forge-chart>`): Promise<ChartComponent> =>
  renderFixture<ChartComponent>(template, ChartComponentTagName);

const getSvg = (el: ChartComponent): SVGSVGElement | null => el.shadowRoot!.querySelector('svg');

describe('forge-chart', () => {
  it('should render nothing when no definition is set', async () => {
    const el = await renderChart(html`<forge-chart></forge-chart>`);

    expect(getSvg(el)).toBeNull();
  });

  it('should render an svg when a definition is set', async () => {
    const el = await renderChart();

    expect(getSvg(el)).not.toBeNull();
  });

  it('should expose the host as a figure named by aria-label', async () => {
    await renderChart(html`<forge-chart aria-label="Signups" .definition=${_createDefinition()}></forge-chart>`);

    await expect.element(page.getByRole('figure', { name: 'Signups' })).toBeInTheDocument();
  });

  it('should expose the host as a figure named by aria-labelledby', async () => {
    await renderChart(html`
      <h2 id="title">Signups</h2>
      <forge-chart aria-labelledby="title" .definition=${_createDefinition()}></forge-chart>
    `);

    await expect.element(page.getByRole('figure', { name: 'Signups' })).toBeInTheDocument();
  });

  it('should describe the host with aria-describedby', async () => {
    await renderChart(html`
      <p id="summary">Search leads all channels.</p>
      <forge-chart aria-label="Signups" aria-describedby="summary" .definition=${_createDefinition()}></forge-chart>
    `);

    await expect.element(page.getByRole('figure', { name: 'Signups' })).toHaveAccessibleDescription('Search leads all channels.');
  });

  it('should name the chart graphic from the host aria-label', async () => {
    const el = await renderChart(html`<forge-chart aria-label="Signups" .definition=${_createDefinition()}></forge-chart>`);

    expect(getSvg(el)!.getAttribute('aria-label')).toBe('Signups');
  });

  it('should update the chart graphic name when aria-label changes', async () => {
    const el = await renderChart(html`<forge-chart aria-label="Signups" .definition=${_createDefinition()}></forge-chart>`);

    el.setAttribute('aria-label', 'Registrations');
    await el.updateComplete;

    expect(getSvg(el)!.getAttribute('aria-label')).toBe('Registrations');
  });

  it('should use the default height when no height or aspect ratio is set', async () => {
    const el = await renderChart();

    expect(getSvg(el)!.getBoundingClientRect().height).toBe(320);
  });

  it('should use the height when it is set', async () => {
    const el = await renderChart(html`<forge-chart height="200" .definition=${_createDefinition()}></forge-chart>`);

    expect(getSvg(el)!.getBoundingClientRect().height).toBe(200);
  });

  it('should derive the height from the aspect ratio when no height is set', async () => {
    const el = await renderChart(html`<forge-chart aspect-ratio="2" .definition=${_createDefinition()}></forge-chart>`);
    const { width, height } = getSvg(el)!.getBoundingClientRect();

    expect(height).toBeCloseTo(width / 2, 0);
  });

  it('should re-render when the definition is replaced', async () => {
    const el = await renderChart();
    const initialBars = getSvg(el)!.querySelectorAll('rect').length;

    el.definition = _createDefinition([...rows, { category: 'Social', value: 31 }]);
    await el.updateComplete;

    expect(getSvg(el)!.querySelectorAll('rect').length).toBeGreaterThan(initialBars);
  });

  it('should remove the chart when the definition is cleared', async () => {
    const el = await renderChart();

    el.definition = undefined;
    await el.updateComplete;

    expect(el.shadowRoot!.querySelector('.container')!.children.length).toBe(0);
  });

  it('should render the chart again when reconnected', async () => {
    const el = await renderChart();
    const parent = el.parentElement!;

    el.remove();
    parent.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot!.querySelectorAll('svg').length).toBe(1);
  });

  it('should dispatch select event with the data point when a bar is clicked', async () => {
    const el = await renderChart();
    const events: Array<CustomEvent<{ point: { datum: unknown } | null }>> = [];
    el.addEventListener('forge-chart-select', evt => events.push(evt as CustomEvent));
    const { left, top, width, height } = getSvg(el)!.querySelector('rect')!.getBoundingClientRect();

    getSvg(el)!.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: left + width / 2, clientY: top + height / 2 }));

    expect(events.length).toBe(1);
    expect(events[0].detail.point?.datum).toEqual(rows[0]);
  });
});
