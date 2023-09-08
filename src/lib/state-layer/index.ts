import { defineCustomElement } from '@tylertech/forge-core';

import { StateLayerComponent } from './state-layer';

export * from './state-layer-adapter';
export * from './state-layer-constants';
export * from './state-layer-foundation';
export * from './state-layer';

export function defineStateLayerComponent(): void {
  defineCustomElement(StateLayerComponent);
}
