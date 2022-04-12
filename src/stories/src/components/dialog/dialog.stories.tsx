import { Meta } from '@storybook/react';
const MDX = require('./dialog.mdx').default;
import { argTypes, IDialogProps } from './dialog-args';
import { SimpleTemplate } from './templates/simple';
import { ComplexTemplate } from './templates/complex';

export default {
  title: 'Components/Dialog',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Simple = SimpleTemplate.bind({});
Simple.args = {
  backdropClose: true,
  escapeClose: true,
  fullscreen: false,
  moveable: true,
  customPosition: false,
  positionX: 0,
  positionY: 0,
  positionType: 'absolute',
} as IDialogProps;

export const Complex = ComplexTemplate.bind({});
Complex.args = {
  backdropClose: true,
  escapeClose: true,
  fullscreen: false,
  moveable: false,
  customPosition: false,
  positionX: 0,
  positionY: 0,
  positionType: 'absolute',
} as IDialogProps;
