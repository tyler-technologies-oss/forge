import { Meta } from '@storybook/react';
import { argTypes, IBottomSheetProps } from './bottom-sheet-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./bottom-sheet.mdx').default;

export default {
  title: 'Components/Bottom Sheet',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  showBackdrop: false,
  backdropClose: true,
  escapeClose: true,
  fullscreen: false,
} as IBottomSheetProps;
