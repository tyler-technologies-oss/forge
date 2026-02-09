import { defineCustomElement } from '@tylertech/forge-core';
import { OpenIconComponent } from './open-icon.js';

export * from './open-icon-constants.js';
export * from './open-icon.js';

export function defineOpenIconComponent(): void {
  defineCustomElement(OpenIconComponent);
}
