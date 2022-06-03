import { TabBarLayoutAlign, TabBarLayoutMode } from '@tylertech/forge';

export interface ITabBarProps {
  layoutMode: TabBarLayoutMode;
  layoutAlign: TabBarLayoutAlign;
  underline: boolean;
  stacked: boolean;
  disabled: boolean;
}

export const argTypes = {
  layoutMode: {
    control: {
      type: 'select',
      labels: {
        'fixed': 'Fixed',
        'clustered': 'Clustered',
      },
    },
    options: ['fixed', 'clustered'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  layoutAlign: {
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
  underline: {
    control: 'boolean',
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
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
