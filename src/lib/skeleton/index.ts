import { defineCustomElement } from '@tylertech/forge-core';

import { SkeletonComponent } from './skeleton';

export * from './skeleton-constants';
export * from './skeleton';

export function defineSkeletonComponent(): void {
  defineCustomElement(SkeletonComponent);
}
