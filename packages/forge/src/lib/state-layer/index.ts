import { defineCustomElement } from '@tylertech/forge-core';

import { StateLayerComponent } from './state-layer.js';

export * from './state-layer-adapter.js';
export * from './state-layer-constants.js';
export * from './state-layer-core.js';
export * from './state-layer.js';

export function defineStateLayerComponent(): void {
  defineCustomElement(StateLayerComponent);
}
