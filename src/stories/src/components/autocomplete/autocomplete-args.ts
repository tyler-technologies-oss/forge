import { AutocompleteMode } from '@tylertech/forge';

export interface IAutocompleteProps {
  allowUnmatched: boolean;
  debounce: number;
  filterOnFocus: boolean;
  filterFocusFirst: boolean;
  mode: AutocompleteMode;
  multiple: boolean;
  observeScroll: boolean;
  observeScrollThreshold: number;
  optionLimit: number;
}

export const argTypes = {
  allowUnmatched: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  debounce: {
    control: 'number',
    table: {
      category: 'Properties'
    }
  },
  filterOnFocus: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  filterFocusFirst: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  mode: {
    control: {
      type: 'select',
      labels: {
        'default': 'Default',
        'stateless': 'Stateless'
      },
    },
    options: ['default', 'stateless'],
    table: {
      category: 'Properties'
    }
  },
  multiple: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  observeScroll: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  observeScrollThreshold: {
    control: 'number',
    table: {
      category: 'Properties'
    }
  },
  optionLimit: {
    control: 'number',
    table: {
      category: 'Properties'
    }
  },
};