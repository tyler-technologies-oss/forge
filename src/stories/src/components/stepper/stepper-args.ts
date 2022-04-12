import { StepperLayoutAlign, StepperLayoutMode } from '@tylertech/forge';

export interface ILimitedStepperProps {
  linear: boolean;
  alternative: boolean;
  layoutMode: StepperLayoutMode;
  layoutAlign: StepperLayoutAlign;
  disabled: boolean;
  vertical: boolean;
}

export interface IStepperProps extends ILimitedStepperProps {
  editable: boolean;
  completed: boolean;
  error: boolean;
}

export const limitedArgTypes = {
  linear: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  alternative: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  layoutMode: {
    control: {
      type: 'select',
      labels: {
        'fixed': 'Fixed',
        'clustered': 'Clustered',
      },
    },
    options: ['fixed', 'clustered'],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  layoutAlign: {
    control: {
      type: 'select',
      labels: {
        'left': 'Left',
        'center': 'Center',
        'right': 'Right',
      },
    },
    options: ['left', 'center', 'right'],
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
  vertical: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
}

export const argTypes = {
  ...limitedArgTypes,
  editable: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  completed: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  error: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};