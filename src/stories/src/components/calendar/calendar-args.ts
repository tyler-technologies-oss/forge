import { ICalendarComponent } from '@tylertech/forge';

export interface ICalendarProps extends Partial<ICalendarComponent> {}

export const argTypes = {
  allowSingleDateRange: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  constrainToEnabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  disabledDates: {
    control: 'object',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  disabledDaysOfWeek: {
    control: {
      type: 'check',
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
  events: {
    control: 'object',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  firstDayOfWeek: {
    control: {
      type: 'select',
      labels: {
        undefined: 'Default',
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
      },
    },
    options: [undefined, 0, 1, 2, 3, 4, 5, 6],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  fixedHeight: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  listYears: {
    control: 'boolean',
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
  max: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  min: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  month: {
    control: {
      type: 'select',
      labels: {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
      },
    },
    options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
  showOtherMonths: {
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
  weekendDays: {
    control: {
      type: 'check',
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
  year: {
    control: 'number',
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
  clearButton: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  menuAnimation: {
    control: {
      type: 'select',
      labels: {
        'scale': 'Scale',
        'fade': 'Fade',
        'none': 'None',
      },
    },
    options: ['scale', 'fade', 'none'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  mode: {
    control: {
      type: 'select',
      labels: {
        'single': 'Single',
        'multiple': 'Multiple',
        'range': 'Range',
      },
    },
    options: ['single', 'multiple', 'range'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  preventFocus: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  selectionFollowsMonth: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  showHeader: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  todayButton: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  view: {
    control: {
      type: 'select',
      labels: {
        'date': 'Date',
        'month': 'Month',
        'year': 'Year',
      },
    },
    options: ['date', 'month', 'year'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
