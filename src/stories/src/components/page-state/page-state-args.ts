export interface IPageStateProps {
  hasGraphic: boolean;
  hasTitle: boolean;
  hasMessage: boolean;
  hasActions: boolean;
}

export const argTypes = {
  hasGraphic: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasTitle: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasMessage: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasActions: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};
