import { defineCustomElement } from '@tylertech/forge-core';

import { SkeletonComponent } from './skeleton.js';

export * from './skeleton-constants.js';
export * from './skeleton.js';

/** @deprecated Definition functions are deprecated and replaced with side effect imports (`import '@tylertech/forge/skeleton'`). */
export function defineSkeletonComponent(): void {
  defineCustomElement(SkeletonComponent);
}
