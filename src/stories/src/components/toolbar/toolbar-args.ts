export interface IToolbarProps {
  inverted: boolean;
  hasStart: boolean;
  hasCenter: boolean;
  hasEnd: boolean;
}

export const argTypes = {
  inverted: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  hasStart: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasCenter: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasEnd: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};
