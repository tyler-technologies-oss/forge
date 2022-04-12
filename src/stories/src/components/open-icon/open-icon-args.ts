export interface IOpenIconProps {
  orientation: string;
}

export const argTypes = {
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
