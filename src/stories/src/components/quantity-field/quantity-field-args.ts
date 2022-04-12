export interface IQuantityFieldProps {
  invalid: boolean;
  required: boolean;
}

export const argTypes = {
  invalid: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  required: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};