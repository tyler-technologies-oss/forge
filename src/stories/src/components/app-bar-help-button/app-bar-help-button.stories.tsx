import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
const MDX = require('./app-bar-help-button.mdx').default;

export default {
  title: 'Components/App Bar/Help Button',
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
