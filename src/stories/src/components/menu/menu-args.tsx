import { OverlayPlacement, MenuMode } from '@tylertech/forge';

export interface IMenuProps {
  open: boolean;
  placement: OverlayPlacement;
  dense: boolean;
  persistSelection: boolean;
  mode: MenuMode;
}

export const argTypes = {
  mode: {
    control: {
      type: 'select',
      labels: {
        'click': 'Click',
        'cascade': 'Cascade',
      },
    },
    options: [
      'click',
      'cascade',
    ],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  open: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  placement: {
    control: {
      type: 'select',
      labels: {
        'top-start': 'Top start',
        'top': 'Top',
        'top-end': 'Top end',
        'right-start': 'Right start',
        'right': 'Right',
        'right-end': 'Right end',
        'bottom-start': 'Bottom start',
        'bottom': 'Bottom',
        'bottom-end': 'Bottom end',
        'left-start': 'Left start',
        'left': 'Left',
        'left-end': 'Right end'
      },
    },
    options: [
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-start',
      'bottom',
      'bottom-end',
      'left-start',
      'left',
      'left-end'
    ],
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
  persistSelection: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};