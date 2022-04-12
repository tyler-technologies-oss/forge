export interface IFilePickerProps {
  accept: string;
  maxSize: number;
  multiple: boolean;
  disabled: boolean;
  compact: boolean;
  borderless: boolean;
}

export const argTypes = {
  accept: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  maxSize: {
    control: 'number',
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
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  compact: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  borderless: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
