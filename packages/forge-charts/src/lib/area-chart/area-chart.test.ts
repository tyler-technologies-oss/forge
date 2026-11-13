import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { AreaChartComponent, AreaChartComponentTagName } from './area-chart.js';
import './area-chart.js';

const rows = Array.from({ length: 12 }, (_, index) => ({ day: index + 1, users: 100 + index * 10 }));

const seriesRows = rows.flatMap(row => [
  { ...row, source: 'Web' },
  { ...row, source: 'Mobile', users: row.users / 2 }
]);

const renderChart = (template = html`<forge-area-chart x="day" y="users" .data=${rows}></forge-area-chart>`): Promise<AreaChartComponent> =>
  renderFixture<AreaChartComponent>(template, AreaChartComponentTagName);

const getFilledAreas = (el: AreaChartComponent): SVGPathElement[] =>
  [...el.shadowRoot!.querySelectorAll<SVGPathElement>('svg path')].filter(path => {
    const fill = path.getAttribute('fill') ?? getComputedStyle(path).fill;
    return fill !== 'none' && path.getBoundingClientRect().height > 0;
  });

describe('forge-area-chart', () => {
  it('should render nothing when no data is set', async () => {
    const el = await renderChart(html`<forge-area-chart x="day" y="users"></forge-area-chart>`);

    expect(el.shadowRoot!.querySelector('svg')).toBeNull();
  });

  it('should render a filled area', async () => {
    const el = await renderChart();

    expect(getFilledAreas(el).length).toBeGreaterThan(0);
  });

  it('should render an area for each series when color is set', async () => {
    const single = await renderChart();
    const multiple = await renderChart(html`<forge-area-chart x="day" y="users" color="source" .data=${seriesRows}></forge-area-chart>`);

    expect(getFilledAreas(multiple).length).toBeGreaterThan(getFilledAreas(single).length);
  });

  it('should render again when the data changes', async () => {
    const el = await renderChart();
    const initialShape = getFilledAreas(el)[0].getAttribute('d');

    el.data = rows.map((row, index) => ({ ...row, users: index % 2 ? row.users : 0 }));
    await el.updateComplete;

    expect(getFilledAreas(el)[0].getAttribute('d')).not.toBe(initialShape);
  });
});
