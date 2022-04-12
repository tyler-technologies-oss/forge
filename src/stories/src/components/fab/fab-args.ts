export interface IFabProps {
  mini: boolean;
  extended: boolean;
  exited: boolean;
  theme: string;
}

export const argTypes = {
  mini: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  extended: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  exited: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  theme: {
    control: {
      type: 'select',
      labels: {
        'none': 'None',
        'primary': 'Primary',
        'secondary': 'Secondary',
        'success': 'Success',
        'warning': 'Warning',
        'danger': 'Danger',
        'info': 'Info',
      },
    },
    options: ['none', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    description: '',
    table: {
      category: 'Attributes',
    },
  },
};
