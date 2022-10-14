import { SplitViewOrientation } from "@tylertech/forge";

export interface ISplitViewCommonProps {
  autoClose: boolean;
  autoCloseThreshold: number;
  allowClose: boolean;
  disabled: boolean;
  orientation: SplitViewOrientation;
}

export interface ISplitViewPanel1Props {
  autoClose1: boolean;
  autoCloseThreshold1: number;
  allowClose1: boolean;
  disabled1: boolean;
  accessibleLabel1: string;
  max1: number | undefined;
  min1: number;
  open1: boolean;
  size1: string;
}

export interface ISplitViewPanel2Props {
  autoClose2: boolean;
  autoCloseThreshold2: number;
  allowClose2: boolean;
  disabled2: boolean;
  accessibleLabel2: string;
  min2: number;
  max2: number | undefined;
  open2: boolean;
  size2: string;
}

export interface ISplitViewPanel3Props {
  autoClose3: boolean;
  autoCloseThreshold3: number;
  allowClose3: boolean;
  disabled3: boolean;
  accessibleLabel3: string;
  max3: number | undefined;
  min3: number;
  open3: boolean;
  size3: string;
}

export interface ISplitViewProps extends ISplitViewCommonProps, Partial<ISplitViewPanel1Props>, Partial<ISplitViewPanel2Props>, Partial<ISplitViewPanel3Props> {};

const splitViewArgTypes = {
  orientation: {
    control: {
      type: 'select',
      labels: {
        'horizontal': 'Horizontal',
        'vertical': 'Vertical',
      },
    },
    options: ['horizontal', 'vertical'],
    description: '',
    table: {
      category: 'Split View',
    },
  },
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Split View',
    },
  },
  allowClose: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Split View',
    },
  },
  autoClose: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Split View',
    },
  },
  autoCloseThreshold: {
    control: 'number',
    description: '',
    table: {
      category: 'Split View'
    },
  },
}

const splitViewPanel1ArgTypes = {
  open1: {
    name: 'open (panel 1)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 1',
    },
  },
  size1: {
    name: 'size (panel 1)',
    control: 'text',
    description: '',
    table: {
      category: 'Panel 1'
    },
  },
  min1: {
    name: 'min (panel 1)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 1'
    },
  },
  max1: {
    name: 'max (panel 1)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 1'
    },
  },
  disabled1: {
    name: 'disabled (panel 1)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 1',
    },
  },
  allowClose1: {
    name: 'allow close (panel 1)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 1',
    },
  },
  autoClose1: {
    name: 'auto close (panel 1)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 1',
    },
  },
  autoCloseThreshold1: {
    name: 'auto close threshold (panel 1)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 1'
    },
  },
  accessibleLabel1
  : {
    name: 'accessible label (panel 1)',
    control: 'text',
    description: '',
    table: {
      category: 'Panel 1'
    },
  },
}

const splitViewPanel2ArgTypes = {
  open2: {
    name: 'open (panel 2)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 2',
    },
  },
  size2: {
    name: 'size (panel 2)',
    control: 'text',
    description: '',
    table: {
      category: 'Panel 2'
    },
  },
  min2: {
    name: 'min (panel 2)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 2'
    },
  },
  max2: {
    name: 'max (panel 2)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 2'
    },
  },
  disabled2: {
    name: 'disabled (panel 2)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 2',
    },
  },
  allowClose2: {
    name: 'allow close (panel 2)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 2',
    },
  },
  autoClose2: {
    name: 'auto close (panel 2)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 2',
    },
  },
  autoCloseThreshold2: {
    name: 'auto close threshold (panel 2)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 2'
    },
  },
  accessibleLabel2: {
    name: 'accessible label (panel 2)',
    control: 'text',
    description: '',
    table: {
      category: 'Panel 2'
    },
  },
}

const splitViewPanel3ArgTypes = {
  open3: {
    name: 'open (panel 3)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 3',
    },
  },
  size3: {
    name: 'size (panel 3)',
    control: 'text',
    description: '',
    table: {
      category: 'Panel 3'
    },
  },
  min3: {
    name: 'min (panel 3)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 3'
    },
  },
  max3: {
    name: 'max (panel 3)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 3'
    },
  },
  disabled3: {
    name: 'disabled (panel 3)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 3',
    },
  },
  allowClose3: {
    name: 'allow close (panel 3)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 3',
    },
  },
  autoClose3: {
    name: 'auto close (panel 3)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 3',
    },
  },
  autoCloseThreshold3: {
    name: 'auto close threshold (panel 3)',
    control: 'number',
    description: '',
    table: {
      category: 'Panel 3'
    },
  },
  accessibleLabel3: {
    name: 'accessible label (panel 3)',
    control: 'text',
    description: '',
    table: {
      category: 'Panel 3'
    },
  },
}

export const argTypes = {
  ...splitViewArgTypes,
  ...splitViewPanel1ArgTypes,
  ...splitViewPanel2ArgTypes,
  ...splitViewPanel3ArgTypes,
};
