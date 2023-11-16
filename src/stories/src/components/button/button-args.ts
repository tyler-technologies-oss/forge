export interface IButtonProps {
  variant: string;
  text: string;
  disabled: boolean;
  dense: boolean;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
}

export interface IButtonMobileProps {
  variant: string;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
}

export interface IButtonMenuProps {
  variant: string;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
  persistSelection: boolean;
}

export interface IButtonLoadingOnSubmitProps {
  variant: string;
  determinate: boolean;
  progress: number;
}

const buttonType = {
  control: {
    type: 'select',
    labels: {
      '': 'Default',
      'outlined': 'Outlined',
      'raised': 'Raised',
      'flat': 'Flat'
    },
  },
  options: [ 
    'default', 
    'outlined', 
    'raised',
    'flat'
  ],
  description: '',
  table: {
    category: 'Properties',
  },
};

export const buttonArgTypes = {
  type: buttonType,
  text: {
    control: 'text',
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
  dense: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  hasLeadingIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasTrailingIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};

export const buttonMobileArgTypes = {
  type: buttonType,
  hasLeadingIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasTrailingIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};

export const buttonMenuArgTypes = {
  type: buttonType,
  hasLeadingIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  hasTrailingIcon: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Slots',
    },
  },
  persistSelection: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};

export const buttonLoadingOnSubmitArgTypes = {
  type: buttonType,
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
}