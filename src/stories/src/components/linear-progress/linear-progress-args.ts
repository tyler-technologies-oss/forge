export interface ILinearProgressProps {
  determinate: boolean;
  progress: number;
  buffer: number;
  visible: boolean;
}

export const argTypes = {
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
  visible: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
