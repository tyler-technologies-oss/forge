export interface IProductIconProps {
  color: string;
  size: number;
  shadow: boolean;
  iterations: number;
  contentType: string;
  tylerIcon: string;
}

export const argTypes = {
  color: {
    control: {
      type: 'select',
      labels: {
        'red-500': 'Red 500',
        'pink-500': 'Pink 500',
        'purple-500': 'Purple 500',
        'deep-purple-500': 'Deep purple 500',
        'indigo-500': 'Indigo 500',
        'blue-500': 'Blue 500',
        'light-blue-500': 'Light blue 500',
        'cyan-500': 'Cyan 500',
        'teal-500': 'Teal 500',
        'green-500': 'Green 500',
        'light-green-500': 'Light green 500',
        'lime-500': 'Lime 500',
        'yellow-500': 'Yellow 500',
        'amber-500': 'Amber 500',
        'orange-500': 'Orange 500',
        'deep-orange-500': 'Deep orange 500',
        'brown-500': 'Brown 500',
        'grey-500': 'Grey 500',
        'blue-grey-500': 'Blue grey 500',
      },
    },
    options: [
      'red-500',
      'pink-500',
      'purple-500',
      'deep-purple-500',
      'indigo-500',
      'blue-500',
      'light-blue-500',
      'cyan-500',
      'teal-500',
      'green-500',
      'light-green-500',
      'lime-500',
      'yellow-500',
      'amber-500',
      'orange-500',
      'deep-orange-500',
      'brown-500',
      'grey-500',
      'blue-grey-500',
    ],
    description: '',
    table: {
      category: 'Properties',
    },
  },
  size: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  shadow: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  iterations: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  contentType: {
    control: {
      type: 'select',
      labels: {
        'text': 'Text',
        'icon': 'Icon',
      },
    },
    options: ['text', 'icon'],
    description: '',
    table: {
      category: 'Slots',
    },
  },
  tylerIcon: {
    control: 'text',
    description: '',
    table: {
      category: 'Slots',
    },
  },
};
