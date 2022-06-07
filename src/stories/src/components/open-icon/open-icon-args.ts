export interface IOpenIconProps {
  open: boolean;
  orientation: string;
}

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
};
