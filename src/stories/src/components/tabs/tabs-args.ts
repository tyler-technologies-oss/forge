export interface ITabsProps {
  disabled: boolean;
  activeTab: number | null | undefined;
  vertical: boolean;
  clustered: boolean;
  clusteredAlignment: 'start' | 'center' | 'end';
  stacked: boolean;
  secondary: boolean;
  inverted: boolean;
  autoActivate: boolean;
  scrollButtons: boolean;
  showLeading: boolean;
  showTrailing: boolean;
  showLabel: boolean;
}

export const argTypes = {
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  vertical: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  clustered: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  clusteredAlignment: {
    control: {
      type: 'select',
      labels: {
        'start': 'Start',
        'center': 'Center',
        'end': 'End',
      },
    },
    options: ['start', 'center', 'end'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  stacked: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  secondary: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  inverted: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  autoActivate: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  scrollButtons: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  showLeading: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Content',
    },
  },
  showTrailing: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Content',
    },
  },
  showLabel: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Content',
    },
  },
};
