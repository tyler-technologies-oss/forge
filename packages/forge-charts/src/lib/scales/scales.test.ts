import { afterEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { renderFixture } from '../../testing/fixture.js';
import { LineChartComponent, LineChartComponentTagName } from '../line-chart/line-chart.js';
import '../line-chart/line-chart.js';

const dated = [new Date(Date.UTC(2026, 0, 1)), new Date(Date.UTC(2026, 1, 1))].map((date, value) => ({ date, value }));

describe('chart scales', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render nothing and warn when the requested scale has not been imported', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const el = await renderFixture<LineChartComponent>(
      html`<forge-line-chart x="date" y="value" .data=${dated}></forge-line-chart>`,
      LineChartComponentTagName
    );

    expect(el.shadowRoot!.querySelector('svg')).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('@tylertech/forge-charts/scales/time'));
  });

  it('should render once the scale subpath has been imported', async () => {
    await import('./time/index.js');
    const el = await renderFixture<LineChartComponent>(
      html`<forge-line-chart x="date" y="value" .data=${dated}></forge-line-chart>`,
      LineChartComponentTagName
    );

    expect(el.shadowRoot!.querySelectorAll('svg circle').length).toBe(dated.length);
  });
});
