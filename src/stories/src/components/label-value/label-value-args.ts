import { LabelValueAlignment, LabelValueDensityType } from '@tylertech/forge';

export interface ILabelValueProps {
  empty: boolean;
  density: LabelValueDensityType;
  align: LabelValueAlignment;
  ellipsis: boolean;
  singleLine: boolean;
  hasIcon: boolean;
}

export const argTypes = {
    empty: {
      control: 'boolean',
      description: '',
      table: {
        category: 'Properties',
      },
    },
    density: {
      control: {
        type: 'select',
        labels: {
          'default': 'Default',
          'roomy': 'Roomy',
          'dense': 'Dense',
        },
      },
      options: ['default', 'roomy', 'dense'],
      description: '',
      table: {
        category: 'Properties',
      },
    },
    align: {
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
    ellipsis: {
      control: 'boolean',
      description: '',
      table: {
        category: 'Properties',
      },
    },
    singleLine: {
      control: 'boolean',
      description: '',
      table: {
        category: 'Properties',
      },
    },
    hasIcon: {
      control: 'boolean',
      description: '',
      table: {
        category: 'Slots',
      },
    },
  };
