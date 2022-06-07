type Direction = 'row' | 'column';

export interface IBusyIndicatorProps {
  titleText: string;
  message: string;
  cancel: boolean;
  spinner: boolean;
  progressBar: boolean;
  progressBarDeterminate: boolean;
  progress: number;
  buffer: number;
  width: number | 'auto';
  direction: Direction;
}

export const argTypes = {
  titleText: { 
    control: 'text',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  message: { 
    control: 'text',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  cancel: { 
    control: 'boolean', 
    description: '',
    table: {
      category: 'Properties'
    },
  },
  spinner: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  progressBar: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  progressBarDeterminate: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  progress: { 
    control: 'number', 
    description: '',
    table: {
      category: 'Properties'
    },
  },
  buffer: { 
    control: 'number', 
    description: '',
    table: {
      category: 'Properties'
    },
  },
  width: { 
    control: 'number', 
    description: '',
    table: {
      category: 'Properties'
    },
  },
  direction: { 
    control: {
      type: 'select',
      labels: {
        'row': 'Row',
        'column': 'Column',
      },        
    },
    description: '',
    options: ['row', 'column'],
    table: {
      category: 'Properties'
    },
  },
};