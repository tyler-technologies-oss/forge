import { PaginatorAlternativeAlignment } from '@tylertech/forge';

export interface IPaginatorProps {
  pageIndex: number;
  pageSize: number;
  offset: number;
  total: number;
  pageSizeOptions: number[];
  label: string;
  firstLast: boolean;
  first: boolean;
  disabled: boolean;
  alternative: boolean;
  alignment: PaginatorAlternativeAlignment;
}

export const argTypes = {
  pageIndex: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  pageSize: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  offset: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  total: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  pageSizeOptions: {
    control: 'array',    
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
  firstLast: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  first: {
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
  alternative: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  alignment: {
    control: {
      type: 'select',
      labels: {
        'start': 'Start',
        'space-between': 'Space between',
        'end': 'End',
      },
    },
    options: ['start', 'space-between', 'end'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
