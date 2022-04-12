export interface IBadgeProps {
  dot: boolean;
  open: boolean;
  theme: string;
  positioned: boolean;
  strong: boolean;
  text: string;
  badgeBackgroundColor?: string;
}

export const argTypes = {
  dot: { 
    control: 'boolean', 
    description: 'Use a dot badge to indicate new or unread content exists.',
    table: {
      category: 'Properties'
    },
  },
  open: { 
    control: 'boolean',
    description: 'Use open to show or hide the badge',
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
  positioned: { 
    control: 'boolean',
    description: 'Use positioned to place the badge relative to an icon such as a notification icon',
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
  badgeBackgroundColor: {
    name: '--forge-badge-theme-muted-background',
    control: 'select',
    options: ['--mdc-theme-secondary', '--forge-theme-tertiary'],
    description: 'Dot and Numeric badges should use --forge-badge-theme-muted-background: var(--mdc-theme-secondary) when placed on an indigo background and --forge-badge-theme-muted-background: var(--mdc-theme-tertiary) when placed on a white background.',
    table: {
      category: 'CSS Custom Properties'
    },
  }
};
