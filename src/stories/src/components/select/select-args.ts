import { SelectDensityType, SelectFloatLabelType, SelectShapeType } from '@tylertech/forge';

export interface ISelectProps {
  label: string;
  multiple: boolean;
  open: boolean;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  density: SelectDensityType;
  floatLabelType: SelectFloatLabelType;
  shape: SelectShapeType;
  placeholder: string;
  hasLeadingIcon: boolean;
  hasHelperText: boolean;
  hasAddonEnd: boolean;
  addonEndAlwaysEnabled: boolean;
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
  addonEndAlwaysEnabled: {
    control: 'boolean',
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
