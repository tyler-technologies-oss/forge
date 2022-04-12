type ListItemStyle = 'one-line' | 'two-line' | 'three-line';
type LeadingSlot = 'none' | 'icon' | 'avatar' | 'checkbox' | 'radio-button';
type TrailingSlot = 'none' | 'icon' | 'checkbox' | 'radio-button';
export interface IListProps {
  staticList: boolean;
  dense: boolean;
  indented: boolean;
  listStyle: ListItemStyle;
  ripple: boolean;
  disabled: boolean;
  wrap: boolean;
  leadingSlot: LeadingSlot;
  trailingSlot: TrailingSlot;
}

export const argTypes = {
  staticList: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  dense: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  indented: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  listStyle: {
    control: {
      type: 'select',
      labels: {
        'one-line': 'One line',
        'two-line': 'Two line',
        'three-line': 'Three line',
      },
    },
    options: ['one-line', 'two-line', 'three-line'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  ripple: {
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
  wrap: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  leadingSlot: {
    control: {
      type: 'select',
      labels: {
        'none': 'None',
        'icon': 'Icon',
        'avatar': 'Avatar',
        'checkbox': 'Checkbox',
        'radio-button': 'Radio button',
      },
    },
    options: ['none', 'icon', 'avatar', 'checkbox', 'radio-button'],
    description: '',
    table: {
      category: 'Slots',
    },
  },
  trailingSlot: {
    control: {
      type: 'select',
      labels: {
        'none': 'None',
        'icon': 'Icon',
        'checkbox': 'Checkbox',
        'radio-button': 'Radio button',
      },
    },
    options: ['none', 'icon', 'checkbox', 'radio-button'],
    description: '',
    table: {
      category: 'Slots',
    },
  },
};
