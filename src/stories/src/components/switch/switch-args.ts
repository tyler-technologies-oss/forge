export interface ISwitchProps {
  dense: boolean;
  hasLabel: boolean;
}

export const argTypes = {
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
      category: 'Slots',
    },
  },
};
