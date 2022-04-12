import { DrawerDirection } from '@tylertech/forge';

export const baseDrawerArgTypes = {
  direction: {
    control: {
      type: 'select',
      labels: {
        'left': 'Left',
      },
    },
    options: ['left', 'right'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
}

export const drawerArgTypes = {
  open: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  ...baseDrawerArgTypes
};

export const miniDrawerArgTypes = {
  ...baseDrawerArgTypes,
  hover: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Attributes',
    },
  },
}

export interface IDrawerProps {
  open: boolean;
  direction: DrawerDirection;
}

export interface IMiniDrawerProps extends Omit<IDrawerProps, 'open'> {
  hover: boolean;
}