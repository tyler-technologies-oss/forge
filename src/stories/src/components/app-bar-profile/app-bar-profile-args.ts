export interface IAppBarProfileProps {
  fullName: string;
  email: string;
  avatarLetterCount: number;
  avatarText: string;
  useAvatarImage: boolean;
  useAvatarIcon: boolean;
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
  useAvatarImage: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  useAvatarIcon: {
    control: 'boolean',
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