import { BottomSheetMode } from '@tylertech/forge';

export interface IBottomSheetProps {
  persistent: boolean;
  mode: BottomSheetMode;
  fullscreen: boolean;
}

export const argTypes = {
  persistent: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  mode: {
    control: {
      type: 'select',
      labels: {
        'modal': 'Modal',
        'inline-modal': 'Inline Modal',
        'nonmodal': 'Non Modal',
      },
    },
    options: ['modal', 'inline-modal', 'nonmodal'],
    table: {
      category: 'Properties'
    }
  },
  fullscreen: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
