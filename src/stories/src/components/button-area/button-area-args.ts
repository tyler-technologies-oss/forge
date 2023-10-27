export interface IButtonAreaProps {
  label: string;
  disabled: boolean;
}

export const buttonAreaArgTypes = {
  label: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    }
  },
  disabled: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties'
    }
  }
}