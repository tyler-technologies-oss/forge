export interface IBottomSheetProps {
  showBackdrop: boolean;
  backdropClose: boolean;
  escapeClose: boolean;
  fullscreen: boolean;
}

export const argTypes = {
  showBackdrop: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  backdropClose: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  escapeClose: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
  fullscreen: {
    control: 'boolean',
    description: '',
    table: {
      category: 'Properties',
    },
  },
};
