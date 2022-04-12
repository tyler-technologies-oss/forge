import { ArgTypes } from '@storybook/addons';

export interface IIconButtonProps {
  toggle: boolean;
  dense: boolean;
  densityLevel: number;
}

export const argTypes = {
  toggle: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  dense: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  densityLevel: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
} as ArgTypes;
