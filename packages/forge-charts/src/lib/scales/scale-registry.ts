export type ChartScaleType = 'band' | 'point' | 'linear' | 'time';

/**
 * Creates the TanStack scale factory for an axis. `getCategories` is only called by scales that need a categorical domain.
 */
export type ChartScaleResolver = (getCategories: () => unknown[]) => () => any;

const resolvers = new Map<ChartScaleType, ChartScaleResolver>();

/**
 * Makes a scale available to the `x-scale` property of the cartesian charts.
 *
 * Each scale lives in its own subpath export and registers itself when imported, so scales that are never imported can be tree-shaken.
 */
export const registerChartScale = (type: ChartScaleType, resolver: ChartScaleResolver): void => {
  resolvers.set(type, resolver);
};

export const resolveChartScale = (type: ChartScaleType, getCategories: () => unknown[]): (() => any) | undefined => resolvers.get(type)?.(getCategories);
