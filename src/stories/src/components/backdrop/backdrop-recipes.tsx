import { Meta } from '@storybook/react';
import { argTypes, IBackdropProps } from './backdrop-args';
import { OverAppPageTemplate } from './templates/over-app-page';
const MDX = require('./backdrop.mdx').default;

export default {
  title: 'Components/Backdrop/Recipes',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const OverAppPage = OverAppPageTemplate.bind({});
OverAppPage.args = {
  delay: 0,
  maxOpacity: 0.54,
  appearance: 'light',
} as IBackdropProps;
