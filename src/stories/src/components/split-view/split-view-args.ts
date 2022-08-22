import { SplitViewOrientation } from "@tylertech/forge";

export interface ISplitViewCommonProps {
  autoClose: boolean;
  disableClose: boolean;
  disabled: boolean;
  orientation: SplitViewOrientation;
}

export interface ISplitViewPanel1Props {
  autoClose1: boolean;
  disableClose1: boolean;
  disabled1: boolean;
  label1: string;
  max1: number | undefined;
  min1: number;
  open1: boolean;
  size1: number;
}

export interface ISplitViewPanel2Props {
  autoClose2: boolean;
  disableClose2: boolean;
  disabled2: boolean;
  label2: string;
  min2: number;
  max2: number | undefined;
  open2: boolean;
  size2: number;
}

export interface ISplitViewPanel3Props {
  autoClose3: boolean;
  disableClose3: boolean;
  disabled3: boolean;
  label3: string;
  max3: number | undefined;
  min3: number;
  open3: boolean;
  size3: number;
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
  autoClose: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Split View',
    },
  },
  disableClose: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Split View',
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
    control: 'number',
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
  autoClose1: {
    name: 'auto close (panel 1)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 1',
    },
  },
  disableClose1: {
    name: 'disable close (panel 1)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 1',
    },
  },
  label1: {
    name: 'label (panel 1)',
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
    control: 'number',
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
  autoClose2: {
    name: 'auto close (panel 2)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 2',
    },
  },
  disableClose2: {
    name: 'disable close (panel 2)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 2',
    },
  },
  label2: {
    name: 'label (panel 2)',
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
    control: 'number',
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
  autoClose3: {
    name: 'auto close (panel 3)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 3',
    },
  },
  disableClose3: {
    name: 'disable close (panel 3)',
    control: 'boolean',
    description: '',
    table: {
      category: 'Panel 3',
    },
  },
  label3: {
    name: 'label (panel 3)',
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
