import { defineCustomElement } from '@tylertech/forge-core';

import { SkeletonComponent } from './skeleton.js';

export * from './skeleton-constants.js';
export * from './skeleton.js';

export function defineSkeletonComponent(): void {
  defineCustomElement(SkeletonComponent);
}
