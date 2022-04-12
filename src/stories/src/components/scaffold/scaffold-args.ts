export interface ILimitedScaffoldProps {
  hasHeader: boolean;
  hasBody: boolean;
  hasFooter: boolean;
}
export interface IScaffoldProps {
  hasLeft: boolean;
  hasHeader: boolean;
  hasBody: boolean;
  hasBodyHeader: boolean;
  hasBodyLeft: boolean;
  hasBodyRight: boolean;
  hasBodyFooter: boolean;
  hasFooter: boolean;
  hasRight: boolean;
}

export const limitedArgTypes = {
  hasHeader: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasBody: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasFooter: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
}

export const argTypes = {
  hasLeft: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasHeader: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasBody: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasBodyHeader: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasBodyLeft: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasBodyRight: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasBodyFooter: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasFooter: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasRight: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};