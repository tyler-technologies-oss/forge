export interface IAppBarNotificationsProps {
  count: number;
  dot: boolean;
  showBadge: boolean;
  theme: string;
  icon: string;
}

export const argTypes = {
  count: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  dot: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  showBadge: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  icon: {
    control: {
      type: 'select',
      labels: {
        'notifications': 'Notifications (Default)',
        'email': 'Emails',
        'connection': 'Connections'
      },
    },
    options: ['notifications', 'email', 'connection'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  theme: {
    control: {
      type: 'select',
      labels: {
        'default': 'Default (Secondary)',
        'danger': 'Danger',
        'warning': 'Warning',
        'success': 'Success',
        'info-primary': 'Info (primary)',
        'info-secondary': 'Info (secondary)',
      },
    },
    options: ['default', 'danger', 'warning', 'success', 'info-primary', 'info-secondary'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
