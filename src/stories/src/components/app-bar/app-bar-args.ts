export interface IAppBarProps {
  title: string;
  fixed: boolean;
  raised: boolean;
  logo: boolean;
  theme: string;
  hasMenu: boolean;
  hasSearch: boolean;
  hasHelp: boolean;
  hasNotifications: boolean;
  hasProfile: boolean;
}

export const argTypes = {
  title: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  fixed: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  raised: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  logo: {
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
        'primary': 'Primary',
        'white': 'White',
      },
    },
    options: ['primary', 'white'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  hasMenu: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasSearch: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasHelp: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasNotifications: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasProfile: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};
