import { BackdropAppearance } from '@tylertech/forge';

export const argTypes = {
  delay: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  maxOpacity: { 
    control: 'number',
    description: '',
    table: {
      category: 'Properties'
    },
  },
  appearance: {
    control: {
      type: 'select',
      labels: {
        'auto': 'Auto',
        'light': 'Light',
        'dark': 'Dark',
      }
    },
    options: ['auto', 'light', 'dark'],
    table: {
      category: 'Properties'
    },
  }
};

export interface IBackdropProps {
  delay: number;
  maxOpacity: number;
  appearance: BackdropAppearance | 'auto';
}