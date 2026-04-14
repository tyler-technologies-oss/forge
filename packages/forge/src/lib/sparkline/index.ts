import { defineCustomElement } from '@tylertech/forge-core';
import { SparklineComponent } from './sparkline.js';

export * from './sparkline.js';

export function defineSparklineComponent(): void {
  defineCustomElement(SparklineComponent);
}
