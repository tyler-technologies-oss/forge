import { CellAlign, TableLayoutType } from '@tylertech/forge';

export interface ITableProps {
  select: boolean;
  multiselect: boolean;
  dense: boolean;
  roomy: boolean;
  filter: boolean;
  fixedHeaders: boolean;
  layoutType: TableLayoutType;
  wrapContent: boolean;
  resizable: boolean;
  minResizeWidth: number;
  allowRowClick: boolean;
  multiColumnSort: boolean;
}

export const argTypes = {
  select: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  multiselect: {
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
  roomy: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  filter: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  fixedHeaders: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  layoutType: {
    control: {
      type: 'select',
      labels: {
        'auto': 'Auto',
        'fixed': 'Fixed',
      },
    },
    options: ['auto', 'fixed'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  wrapContent: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  resizable: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  minResizeWidth: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  allowRowClick: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  multiColumnSort: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
