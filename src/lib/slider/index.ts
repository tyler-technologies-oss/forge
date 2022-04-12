import { defineCustomElement } from '@tylertech/forge-core';

import { SliderComponent } from './slider';

export * from './slider-constants';
export * from './slider';

export function defineSliderComponent(): void {
  defineCustomElement(SliderComponent);
}
