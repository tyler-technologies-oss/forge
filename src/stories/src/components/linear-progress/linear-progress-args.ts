export interface ILinearProgressProps {
  open: boolean;
  determinate: boolean;
  progress: number;
  buffer: number;
}

export const argTypes = {
  open: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  determinate: {
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
      category: 'Properties',
    },
  },
  buffer: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
