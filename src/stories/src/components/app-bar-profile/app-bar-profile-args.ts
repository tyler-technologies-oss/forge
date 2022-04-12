export interface IAppBarProfileProps {
  fullName: string;
  email: string;
  avatarImageUrl: string;
  avatarLetterCount: number;
  avatarText: string;
  signOutButton: boolean;
  profileButton: boolean;
}

export const argTypes = {
  fullName: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  email: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  avatarImageUrl: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  avatarLetterCount: {
    control: 'number',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  avatarText: {
    control: 'text',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  signOutButton: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  profileButton: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};