import { SliderType } from '@tylertech/forge';

export interface ISliderProps {
  type: SliderType;
  value: number;
  valueStart: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
}

export const argTypes = {
  type: {
    control: {
      type: 'select',
      labels: {
        'continuous': 'Continuous',
        'continuous-range': 'Continuous range',
        'discrete': 'Discrete',
        'discrete-markers': 'Discrete markers',
        'discrete-range-markers': 'Discrete range markers',
        'discrete-range': 'Discrete range',
      },
    },
    options: ['continuous', 'continuous-range', 'discrete', 'discrete-markers', 'discrete-range-markers', 'discrete-range'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  value: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  valueStart: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  min: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  max: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  step: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
