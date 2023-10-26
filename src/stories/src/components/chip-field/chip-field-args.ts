import { ChipFieldDensityType, ChipFieldFloatLabelType, ChipFieldShapeType } from '@tylertech/forge';

export interface IChipFieldProps {
  density: ChipFieldDensityType;
  floatLabelType: ChipFieldFloatLabelType;
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
  setValueOnBlur: boolean;
}

export const argTypes = {
  density: {
    control: {
      type: 'select',
      labels: {
        'default': 'Default',
        'roomy': 'Roomy',
        'dense': 'Dense',
      },
    },
    options: ['default', 'roomy', 'dense'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  floatLabelType: {
    control: {
      type: 'select',
      labels: {
        'auto': 'Auto',
        'always': 'Always',
      },
    },
    options: ['auto', 'always'],
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
  setValueOnBlur: {
    control: 'boolean',
    description: 'When set to true, pressing tab or clicking away from the field will set whatever you have typed as a value',
    table: {
      category: 'Properties',
    },
  },
};
