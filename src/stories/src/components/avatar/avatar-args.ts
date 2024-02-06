export interface IAvatarProps {
  imageUrl: string;
  useIcon: boolean;
  letterCount: number;
  text: string;
}

export const argTypes = {
  imageUrl: {
    control: 'text',
    table: {
      category: 'Properties'
    }
  },
  useIcon: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
  letterCount: {
    control: 'number',
    table: {
      category: 'Properties'
    }
  },
  text: {
    control: 'text',
    table: {
      category: 'Properties'
    }
  }
};
