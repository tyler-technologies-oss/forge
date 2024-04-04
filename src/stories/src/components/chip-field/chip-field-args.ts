import { ChipFieldDensityType, ChipFieldShapeType } from '@tylertech/forge';

export interface IChipFieldProps {
  density: ChipFieldDensityType;
  floatLabel: boolean;
  shape: ChipFieldShapeType;
  label: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
  hasPlaceholder: boolean;
  hasLabel: boolean;
  hasHelperText: boolean;
  hasLeading: boolean;
  hasTrailing: boolean;
  hasAddonEnd: boolean;
  addOnBlur: boolean;
}

export const argTypes = {
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
  label: {
    control: 'text',
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
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  hasPlaceholder: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  hasLabel: {
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
  hasLeading: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasTrailing: {
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
  },
  addOnBlur: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
