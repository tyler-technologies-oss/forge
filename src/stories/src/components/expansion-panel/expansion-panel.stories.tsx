import { Meta } from '@storybook/react';
const MDX = require('./expansion-panel.mdx').default;
import { DefaultTemplate } from './templates/default';
import { argTypes, IExpansionPanelProps } from './expansion-panel-args';

export default {
  title: 'Components/Expansion Panel',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  open: false,
  orientation: 'vertical',
  useAnimations: true,
} as IExpansionPanelProps;
