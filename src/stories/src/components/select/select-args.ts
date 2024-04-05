import { SelectDensityType, SelectShapeType } from '@tylertech/forge';

export interface ISelectProps {
  label: string;
  multiple: boolean;
  open: boolean;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  density: SelectDensityType;
  floatLabel: boolean;
  shape: SelectShapeType;
  placeholder: string;
  constrainPopupWidth: boolean;
  wrapOptionText: boolean;
  hasLeadingIcon: boolean;
  hasHelperText: boolean;
  hasAddonEnd: boolean;
}

export const argTypes = {
  label: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  multiple: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  open: {
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
  invalid: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  required: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  density: {
    control: {
      type: 'select',
      labels: {
        'extra-small': 'Extra small',
        'small': 'Small',
        'medium': 'Medium (default)',
        'large': 'Large',
        'extra-large': 'Extra large',
      },
    },
    options: ['default', 'roomy', 'dense'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  floatLabel: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  shape: {
    control: {
      type: 'select',
      labels: {
        'default': 'Default',
        'rounded': 'Rounded',
      },
    },
    options: ['default', 'rounded'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  placeholder: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  constrainPopupWidth: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  wrapOptionText: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  hasLeadingIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasHelperText: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasAddonEnd: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  }
};
