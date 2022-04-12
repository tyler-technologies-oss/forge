import { ChipType } from '@tylertech/forge';

export interface IChipsProps {
  dense: boolean;
  vertical: boolean;
  type: ChipType;
  disabled: boolean;
  invalid: boolean;
  hasLeading: boolean;
  hasTrailing: boolean;
}

export const argTypes = {
  dense: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  type: {
    control: {
      type: 'select',
      labels: {
        'action': 'Action',
        'choice': 'Choice',
        'filter': 'Filter',
        'input': 'Input',
        'field': 'Field'
      },
    },
    options: ['action', 'choice', 'filter', 'input', 'field'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  vertical: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  invalid: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  hasLeading: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasTrailing: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};