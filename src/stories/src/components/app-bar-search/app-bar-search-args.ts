export interface IAppBarSearchProps {
  disabled: boolean;
  placeholder: string;
  combined: boolean;
  global: boolean;
}

export const argTypes = {
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  placeholder: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  combined: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  global: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
