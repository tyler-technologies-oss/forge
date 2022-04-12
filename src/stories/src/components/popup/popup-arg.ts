import { PopupAnimationType, PopupPlacement, IPopupPosition } from '@tylertech/forge';

export interface IPopupProps {
  placement: PopupPlacement;
  manageFocus: boolean;
  animationType: PopupAnimationType;
  offset: IPopupPosition;
}

export const argTypes = {
  placement: {
    control: {
      type: 'select',
      labels: {
        'top': 'Top',        
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
  manageFocus: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  animationType: {
    control: {
      type: 'select',
      labels: {
        'none': 'None',
        'menu': 'Menu',
        'dropdown': 'Dropdown',
      },
    },
    options: ['none', 'menu', 'dropdown'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  offset: {
    control: 'object',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
