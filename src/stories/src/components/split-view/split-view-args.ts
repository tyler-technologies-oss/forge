import { SplitViewOrientation, SplitViewPanelPosition } from "@tylertech/forge";

export interface ISplitViewProps {
  disabled: string;
  orientation: SplitViewOrientation;
  position: SplitViewPanelPosition;
  open: boolean;
  size: number;
  min: number;
  max: number;
  label: string;
}

export const argTypes = {
  orientation: {
    control: {
      type: 'select',
      labels: {
        'horizontal': 'Horizontal',
        'vertical': 'Vertical',
      },
    },
    options: ['horizontal', 'vertical'],
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
  position: {
    control: {
      type: 'select',
      labels: {
        'start': 'Start',
        'end': 'End',
        'none': 'None'
      },
    },
    options: ['start', 'end', 'none'],
    description: '',
    table: {
      category: 'Pane'
    },
  },
  open: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Pane',
    },
  },
  size: {
    control: 'number',
    description: '',
    table: {
      category: 'Pane'
    },
  },
  min: {
    control: 'number',
    description: '',
    table: {
      category: 'Pane'
    },
  },
  max: {
    control: 'number',
    description: '',
    table: {
      category: 'Pane'
    },
  },
  label: {
    control: 'text',
    description: '',
    table: {
      category: 'Pane'
    },
  },
};
