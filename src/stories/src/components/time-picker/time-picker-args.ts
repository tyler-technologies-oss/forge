export interface ITimePickerProps {
  allowSeconds: boolean;
  masked: boolean;
  showMaskFormat: boolean;
  use24HourTime: boolean;
  allowInvalidTime: boolean;
  step: number;
  allowInput: boolean;
  allowDropdown: boolean;
  showNow: boolean;
  disabled: boolean;
}

export const argTypes = {
  allowSeconds: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  masked: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  showMaskFormat: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  use24HourTime: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  allowInvalidTime: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  step: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  allowInput: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  allowDropdown: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  showNow: {
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
