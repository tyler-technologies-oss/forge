export interface IExpansionPanelProps {
  open: boolean;
  orientation: string;
  useAnimations: boolean;
};

export const argTypes = {
  open: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  orientation: {
    control: {
      type: 'select',
      labels: {
        'vertical': 'Vertical',
        'horizontal': 'Horizontal',
      },
    },
    options: ['vertical', 'horizontal'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  useAnimations: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
