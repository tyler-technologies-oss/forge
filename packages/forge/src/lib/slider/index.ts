import { defineCustomElement } from '@tylertech/forge-core';

import { SliderComponent } from './slider.js';

export * from './slider-constants.js';
export * from './slider.js';
export * from './slider-component-delegate.js';

export function defineSliderComponent(): void {
  defineCustomElement(SliderComponent);
}
