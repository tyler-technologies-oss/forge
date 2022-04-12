import { Meta } from '@storybook/react';
import { argTypes, IAccordionProps } from './accordion-args';
import { DefaultTemplate } from './templates/default';
const MDX = require('./accordion.mdx').default;

export default {
  title: 'Components/Accordion',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  panelSelector: 'forge-expansion-panel',
} as IAccordionProps;
