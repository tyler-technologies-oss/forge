import { Meta } from '@storybook/react';
const MDX = require('./drawer.mdx').default;
import { drawerArgTypes, IDrawerProps, IMiniDrawerProps, miniDrawerArgTypes } from './drawer-args';
import { DrawerTemplate } from './templates/drawer';
import { MiniTemplate } from './templates/mini';
import { ModalTemplate } from './templates/modal';

export default {
  title: 'Components/Drawer',
  parameters: { 
    docs: { 
      page: MDX
    },
    layout: 'fullscreen',
  },  
} as Meta;

export const Drawer = DrawerTemplate.bind({});
Drawer.argTypes = drawerArgTypes;
Drawer.args = {
  open: true,
  direction: 'left'
} as IDrawerProps;

export const Modal = ModalTemplate.bind({});
Modal.argTypes = drawerArgTypes;
Modal.args = {
  open: false,
  direction: 'left'
} as IDrawerProps;

export const Mini = MiniTemplate.bind({});
Mini.argTypes = miniDrawerArgTypes;
Mini.args = {
  direction: 'left',
  hover: false
} as IMiniDrawerProps;
