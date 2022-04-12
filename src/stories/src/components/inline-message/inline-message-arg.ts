export interface ILimitedInlineMessageProps {
  hasIcon: boolean;
  hasTitle: boolean;
}

export interface IInlineMessageProps extends ILimitedInlineMessageProps {
  theme: string;
}

export const limitedArgTypes = {
  hasIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasTitle: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
}

export const argTypes = {
  ...limitedArgTypes,
  theme: {
    control: {
      type: 'select',
      labels: {
        'danger': 'Danger',
        'warning': 'Warning',
        'success': 'Success',
        'info-primary': 'Info (primary)',
        'info-secondary': 'Info (secondary)',
      },
    },
    options: ['danger', 'warning', 'success', 'info-primary', 'info-secondary'],
    description: '',
    table: {
      category: 'Attributes',
    },
  },
};
