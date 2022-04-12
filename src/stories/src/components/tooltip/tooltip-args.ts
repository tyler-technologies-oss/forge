import { PopupPlacement } from '@tylertech/forge';

export interface ITooltipProps {
  text: string;
  delay: number;
  position: PopupPlacement;
}

export const argTypes = {
  text: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  delay: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  position: {
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
};
