import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { PieChartComponent, PieChartComponentTagName } from './pie-chart.js';
import './pie-chart.js';

const rows = [
  { channel: 'Search', signups: 84 },
  { channel: 'Direct', signups: 63 },
  { channel: 'Referral', signups: 47 },
  { channel: 'Social', signups: 31 }
];

const renderChart = (template = html`<forge-pie-chart category="channel" value="signups" .data=${rows}></forge-pie-chart>`): Promise<PieChartComponent> =>
  renderFixture<PieChartComponent>(template, PieChartComponentTagName);

const getSlices = (el: PieChartComponent): SVGPathElement[] =>
  [...el.shadowRoot!.querySelectorAll<SVGPathElement>('svg path')].filter(
    path => path.getBoundingClientRect().width > 0 && getComputedStyle(path).fill !== 'none'
  );

describe('forge-pie-chart', () => {
  it('should render nothing when no data is set', async () => {
    const el = await renderChart(html`<forge-pie-chart category="channel" value="signups"></forge-pie-chart>`);

    expect(el.shadowRoot!.querySelector('svg')).toBeNull();
  });

  it('should render nothing when the category or value field is missing', async () => {
    const el = await renderChart(html`<forge-pie-chart category="channel" .data=${rows}></forge-pie-chart>`);

    expect(el.shadowRoot!.querySelector('svg')).toBeNull();
  });

  it('should render a slice for each row', async () => {
    const el = await renderChart();

    expect(getSlices(el).length).toBe(rows.length);
  });

  it('should render a smaller slice area when inner-radius is set', async () => {
    const pie = await renderChart();
    const donut = await renderChart(html`<forge-pie-chart category="channel" value="signups" inner-radius="0.6" .data=${rows}></forge-pie-chart>`);
    const area = (el: PieChartComponent): number =>
      getSlices(el).reduce((sum, slice) => sum + slice.getBoundingClientRect().width * slice.getBoundingClientRect().height, 0);

    expect(area(donut)).toBeLessThanOrEqual(area(pie));
    expect(getSlices(donut).length).toBe(rows.length);
  });

  it('should render again when the data changes', async () => {
    const el = await renderChart();

    el.data = rows.slice(0, 2);
    await el.updateComplete;

    expect(getSlices(el).length).toBe(2);
  });
});
