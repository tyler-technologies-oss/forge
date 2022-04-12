import { PopupPlacement } from '@tylertech/forge';

export interface IToastProps {
  message: string;
  actionText: string;
  duration: number;
  placement: PopupPlacement;
  showClose: boolean;
}

export const argTypes = {
  message: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  actionText: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  duration: {
    control: 'number',
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
      'top', 
      'bottom', 
      'left', 
      'right', 
      'top-left', 
      'top-right',
      'bottom-left', 
      'bottom-right',
      'left-top',
      'left-bottom',
      'right-top',
      'right-bottom',
    ],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  showClose: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
