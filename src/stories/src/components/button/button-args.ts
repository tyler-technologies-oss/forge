export interface IButtonProps {
  type: string;
  text: string;
  disabled: boolean;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
}

export interface IButtonMobileProps {
  type: string;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
}

export interface IButtonMenuProps {
  type: string;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
  persistSelection: boolean;
}

export interface IButtonLoadingOnSubmitProps {
  type: string;
  determinate: boolean;
  progress: number;
}

const buttonType = {
  control: {
    type: 'select',
    labels: {
      'default': 'Flat',
      'outlined': 'Outlined',
      'raised': 'Raised',
      'unelevated': 'Unelevated',
      'dense': 'Flat dense',
      'outlined-dense': 'Outlined dense',
      'raised-dense': 'Raised dense',
      'unelevated-dense': 'Unelevated dense',
    },
  },
  options: [ 
    'default', 
    'outlined', 
    'raised', 
    'unelevated',
    'dense',
    'outlined-dense',
    'raised-dense',
    'unelevated-dense',
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