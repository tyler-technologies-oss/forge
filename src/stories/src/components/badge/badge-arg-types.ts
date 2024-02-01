export interface IBadgeProps {
  dot: boolean;
  hide: boolean;
  theme: string;
  strong: boolean;
  text: string;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
}

export const argTypes = {
  dot: { 
    control: 'boolean', 
    description: 'Use a dot badge to indicate new or unread content exists.',
    table: {
      category: 'Properties'
    },
  },
  hide: { 
    control: 'boolean',
    description: 'Use the visibility of the badge',
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
    description: 'Use theme to change the color of the badge',
    options: ['default', 'danger', 'warning', 'success', 'info-primary', 'info-secondary'],
    table: {
      category: 'Attributes'
    },
  },
  strong: { 
    control: 'boolean',
    description: 'Use muted badges by default. In cases where more visual emphasis is needed, use strong badges instead. In general, only pages where just a few badges are used should use the strong style.',
    table: {
      category: 'Attributes'
    },
  },
  text: { 
    control: 'text',
    description: 'Use a numeric badge for numeric counts. Use a text status badge to communicate status or description.',
    table: {
      category: 'Slots'
    },
  },
  hasStartIcon: { 
    control: 'boolean',
    description: 'Use an icon to visually reinforce a badge\'s meaning.',
    table: {
      category: 'Slots'
    },
  },
  hasEndIcon: { 
    control: 'boolean',
    description: 'Use an icon to visually reinforce a badge\'s meaning.',
    table: {
      category: 'Slots'
    },
  }
};
