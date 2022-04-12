import { ViewSwitcherAnimationType } from '@tylertech/forge';

export interface IViewSwitcherProps {
  animationType: ViewSwitcherAnimationType;
}

export const argTypes = {
  animationType: {
    control: {
      type: 'select',
      labels: {
        'none': 'None',
        'slide': 'Slide',
        'fade': 'Fade',
      },
    },
    options: ['none', 'slide', 'fade'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
