export interface IAvatarProps {
  autoColor: boolean;
  imageUrl: string;
  useIcon: boolean;
  letterCount: number;
  text: string;
}

export const argTypes = {
  autoColor: {
    control: 'boolean',
    table: {
      category: 'Properties'
    }
  },
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
