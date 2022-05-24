import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
const MDX = require('./accordion.mdx').default;

export default {
  title: 'Components/Accordion',
  parameters: { 
    docs: { 
      page: MDX
    },
    controls: {
      disable: true
    }
  }
} as Meta;

export const Default = DefaultTemplate.bind({});
