export interface ISliderProps {
  range: boolean;
  tickmarks: boolean;
  value: number;
  valueStart: number;
  valueEnd: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  readonly: boolean;
  labeled: boolean;
}

export const argTypes = {
  range: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  tickmarks: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  value: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  valueStart: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  valueEnd: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  min: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  max: {
    control: 'number',
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
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  readonly: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
