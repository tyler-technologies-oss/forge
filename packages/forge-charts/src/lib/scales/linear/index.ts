import { scaleLinear } from '@tanstack/charts/scales/linear';
import { registerChartScale } from '../scale-registry.js';

registerChartScale('linear', () => scaleLinear);

export { scaleLinear };
