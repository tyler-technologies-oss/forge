export interface IBannerProps {
  dismissed: boolean;
  canDismiss: boolean;
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
  canDismiss: {
    control: 'boolean',
    table: {
      category: 'Properties'
    },
  },
  theme: {
    control: {
      type: 'select',
      labels: {
        'default': 'Default',
        'danger': 'Danger',
        'warning': 'Warning',
        'success': 'Success',
        'info-primary': 'Info primary',
        'info-secondary': 'Info secondary',
      },        
    },
    description: 'Use theme to change the color of the banner',
    options: ['default', 'danger', 'warning', 'success', 'info-primary', 'info-secondary'],
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
