export interface IButtonToggleGroupProps {
  multiple: boolean;
  stretch: boolean;
  mandatory: boolean;
  vertical: boolean;
  disabled: boolean;
  dense: boolean;
  hasLeading: boolean;
  hasTrailing: boolean;
}

export const argTypes = {
  multiple: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  stretch: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  mandatory: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  vertical: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  dense: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  hasLeading: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots'
    },
  },
  hasTrailing: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots'
    },
  },
};