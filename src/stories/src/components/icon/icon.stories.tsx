import { Meta } from '@storybook/react';
const MDX = require('./icon.mdx').default;
import { DefaultTemplate } from './templates/default';
import { ExternalTemplate } from './templates/external';
import { RegistryTemplate } from './templates/registry';
import { StylesTemplate } from './templates/styles';

export default {
  title: 'Components/Icon',
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
export const External = ExternalTemplate.bind({});
export const Registry = RegistryTemplate.bind({});
export const Styles = StylesTemplate.bind({});
