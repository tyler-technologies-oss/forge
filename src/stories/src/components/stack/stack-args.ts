export interface IStackProps {
  inline: boolean;
  wrap: boolean;
  gap: string;
  stretch: boolean;
  alignment: string;
}

export const argTypes = {
  inline: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  wrap: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  gap: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  stretch: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  alignment: { 
    control: {
      type: 'select',
      labels: {
        'start': 'Start',
        'center': 'Center',
        'end': 'End',
      },        
    },
    description: 'Use alignment to define how the browser places space the child items along the current direction of a stack',
    options: ['start', 'center', 'end'],
    table: {
      category: 'Properties'
    },
  },
};
