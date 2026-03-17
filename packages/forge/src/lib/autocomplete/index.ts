import { defineCustomElement } from '@tylertech/forge-core';

import { AutocompleteComponent } from './autocomplete.js';

export * from './autocomplete-adapter.js';
export * from './autocomplete-component-delegate.js';
export * from './autocomplete-constants.js';
export * from './autocomplete-core.js';
export * from './autocomplete-utils.js';
export * from './autocomplete.js';

export function defineAutocompleteComponent(): void {
  defineCustomElement(AutocompleteComponent);
}
