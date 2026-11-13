import { scaleBand } from '@tanstack/charts/scales/band';
import { registerChartScale } from '../scale-registry.js';

const BAND_PADDING = 0.16;

registerChartScale('band', getCategories => () => scaleBand<any>().domain(getCategories()).padding(BAND_PADDING));

export { scaleBand };
