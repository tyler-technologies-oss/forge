import { scalePoint } from '@tanstack/charts/scales/point';
import { registerChartScale } from '../scale-registry.js';

const POINT_PADDING = 0.4;

registerChartScale('point', getCategories => () => scalePoint<any>().domain(getCategories()).padding(POINT_PADDING));

export { scalePoint };
