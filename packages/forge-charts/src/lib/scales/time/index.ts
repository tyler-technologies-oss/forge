import { scaleUtc } from '@tanstack/charts/scales/time';
import { registerChartScale } from '../scale-registry.js';

registerChartScale('time', () => scaleUtc);

export { scaleUtc };
