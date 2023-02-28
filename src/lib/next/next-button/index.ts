import { defineCustomElement } from '@tylertech/forge-core';
import { NextButtonComponent } from './next-button-component';

export * from './next-button-adapter';
export * from './next-button-component';
export * from './next-button-constants';
export * from './next-button-element';
export * from './next-button-foundation';

export function defineNextButtonComponent(): void {
  defineCustomElement(NextButtonComponent);
}
