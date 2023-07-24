import { DayOfWeek } from '@tylertech/forge';

export interface IDatePickerProps {
  disabled: boolean;
  min: Date | string,
  max: Date | string,
  open: boolean;
  masked: boolean;
  maskFormat: string;
  showMaskFormat: boolean;
  allowInvalidDate: boolean;
  showToday: boolean;
  showClear: boolean;
  disabledDaysOfWeek: DayOfWeek[];
  yearRange: string;
  locale: string | undefined;
}

export const argTypes = {
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  min: {
    control: 'date',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  max: {
    control: 'date',
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
  masked: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  maskFormat: {
    control: 'text',
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
  allowInvalidDate: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  showToday: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  showClear: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  disabledDaysOfWeek: {
    control: {
      type: 'multi-select',
      labels: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
      },
    },
    options: [0, 1, 2, 3, 4, 5, 6],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  yearRange: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  locale: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};