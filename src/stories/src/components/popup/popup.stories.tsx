import { Meta } from '@storybook/react';
import { PopupAnimationType } from '@tylertech/forge';
import { IPopupProps, argTypes } from './popup-arg';
import { DefaultTemplate } from './templates/default';
const MDX = require('./popup.mdx').default;

export default {
  title: 'Components/Popup',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.args = {
  placement: 'bottom-start',
  manageFocus: false,
  animationType: PopupAnimationType.Dropdown,
  offset: { x: 0, y: 0 }
} as IPopupProps;
