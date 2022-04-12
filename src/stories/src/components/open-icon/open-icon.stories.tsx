import { Meta } from '@storybook/react';
import { DefaultTemplate } from './templates/default';
import { ExpansionPanelTemplate } from './templates/expansion-panel';
import { IOpenIconProps, argTypes } from './open-icon-args';
const MDX = require('./open-icon.mdx').default;

export default {
  title: 'Components/Open Icon',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.argTypes = argTypes;
Default.args = {
  orientation: 'vertical',
} as IOpenIconProps;

export const WithExpansionPanel = ExpansionPanelTemplate.bind({});
WithExpansionPanel.parameters = { 
  controls: { disable: true }
};