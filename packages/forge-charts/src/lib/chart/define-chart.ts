import { defineChart } from '@tanstack/charts';
import type { DomChartDefinition } from '@tanstack/charts';
import { tooltip } from '@tanstack/charts/tooltip';

/**
 * Wraps `defineChart()` for chart specs assembled from runtime property values.
 *
 * The specs are built from field names supplied as attributes, so TanStack's compile-time inference can't apply and the result is widened to `DomChartDefinition`.
 */
export const defineForgeChart = (spec: object): DomChartDefinition<any> =>
  defineChart(spec as Parameters<typeof defineChart>[0], { tooltip }) as unknown as DomChartDefinition<any>;
