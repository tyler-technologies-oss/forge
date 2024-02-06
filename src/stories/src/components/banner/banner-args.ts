export interface IBannerProps {
  dismissed: boolean;
  persistent: boolean;
  theme: string;
  hasIcon: boolean;
  hasButton: boolean;
}

export const argTypes = {
  dismissed: {
    control: 'boolean',
    table: {
      category: 'Properties'
    },
  },
  persistent: {
    control: 'boolean',
    table: {
      category: 'Properties'
    },
  },
  theme: {
    control: {
      type: 'select',
      labels: {
        'primary': 'Primary',
        'secondary': 'Secondary',
        'tertiary': 'Tertiary',
        'success': 'Success',
        'error': 'Error',
        'warning': 'Warning',
        'info': 'Info (default)',
        'info-secondary': 'Info secondary',
      },        
    },
    description: 'Use theme to change the color of the banner',
    options: ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'info-secondary'],
    table: {
      category: 'Attributes'
    },
  },
  hasIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasButton: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};
