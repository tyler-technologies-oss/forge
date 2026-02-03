import { defineCustomElement } from '@tylertech/forge-core';
import { OpenIconComponent } from './open-icon';

export * from './open-icon-constants';
export * from './open-icon';

export function defineOpenIconComponent(): void {
  defineCustomElement(OpenIconComponent);
}
