# Tyler Forge™ Charts

Lit-based chart web components for Tyler Forge™, built on [TanStack Charts](https://tanstack.com/charts).

> This package is private and unreleased while it is being built out.

## Usage

```ts
import '@tylertech/forge-charts';
import { barY, defineChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';

const rows = [
  { channel: 'Search', value: 84 },
  { channel: 'Direct', value: 63 }
];

const chart = document.querySelector('forge-chart');
chart.definition = defineChart(
  {
    marks: [barY(rows, { x: 'channel', y: 'value' })],
    scales: {
      x: { scale: () => scaleBand<string>().domain(rows.map(row => row.channel)) },
      y: { scale: scaleLinear, nice: true, grid: true }
    }
  },
  { tooltip }
);
```

```html
<forge-chart aria-label="Weekly signups by channel"></forge-chart>
```

### `forge-chart`

| Name           | Type              | Description                                                      |
| -------------- | ----------------- | ---------------------------------------------------------------- |
| `definition`   | `ChartDefinition` | Property only. Replace it to update the chart.                   |
| `height`       | `number`          | Height in pixels. Defaults to `320` unless `aspect-ratio` is set. |
| `aspect-ratio` | `number`          | Width-to-height ratio. Ignored when `height` is set.             |

The host gets `role="figure"` unless a role is already set. Name it with `aria-label` or `aria-labelledby` and describe it with `aria-describedby`.

Fires `forge-chart-select` with `detail: { point }` when a data point is clicked or activated by keyboard.

Series colors, text, and the tooltip follow the active Forge theme. See [TanStack's theming guide](https://tanstack.com/charts) for the `--ts-chart-*` variables the element maps to Forge tokens.

## Development

```bash
pnpm dev:forge-charts   # dev site on http://localhost:3451 (from the repo root)
pnpm --filter @tylertech/forge-charts test
pnpm --filter @tylertech/forge-charts lint
pnpm --filter @tylertech/forge-charts build
```
