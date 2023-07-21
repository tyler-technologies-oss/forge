export interface ICardProps {
  raised: boolean;
}

export const argTypes = {
  raised: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
