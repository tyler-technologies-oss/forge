import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
const MDX = require('./app-bar-menu-button.mdx').default;

export default {
  title: 'Components/App Bar/Menu Button',
  parameters: { 
    docs: { 
      page: MDX
    },
    controls: {
      disable: true
    }
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
