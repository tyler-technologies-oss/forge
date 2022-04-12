export interface ICheckboxProps {
  hasLabel: boolean;
  checked: boolean;
  dense: boolean;
}

export const argTypes = {
  checked: {
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
  hasLabel: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slot',
    },
  },
};
