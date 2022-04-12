export interface IColorPickerProps {
  value: string,
  allowOpacity: boolean;
  opacity: number;
}

export const argTypes = {
  value: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  allowOpacity: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  opacity: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};