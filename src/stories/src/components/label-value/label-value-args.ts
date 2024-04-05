export interface ILabelValueProps {
  empty: boolean;
  inline: boolean;
  ellipsis: boolean;
  singleLine: boolean;
  hasIcon: boolean;
}

export const argTypes = {
    empty: {
      control: 'boolean',
      description: '',
      table: {
        category: 'Properties',
      },
    },
    ellipsis: {
      control: 'boolean',
      description: '',
      table: {
        category: 'Properties',
      },
    },
    inline: {
      control: 'boolean',
      description: '',
      table: {
        category: 'Properties',
      },
    },
    hasIcon: {
      control: 'boolean',
      description: '',
      table: {
        category: 'Slots',
      },
    },
  };
