import { Meta } from '@storybook/react';
const MDX = require('./drawer.mdx').default;
import { drawerArgTypes, IDrawerProps } from './drawer-args';
import { NavigationDrawerTemplate } from './templates/navigation-drawer';
import { FilterSidesheetTemplate } from './templates/filter-sidesheet';

export default {
  title: 'Components/Drawer/Recipes',
  parameters: { 
    docs: { 
      page: MDX
    },
    layout: 'fullscreen',
    controls: { hideNoControlsWarning: true }
  },  
} as Meta;

export const NavigationDrawer = NavigationDrawerTemplate.bind({});
NavigationDrawer.argTypes = drawerArgTypes;
NavigationDrawer.args = {
  open: true,
  direction: 'left',
} as IDrawerProps;
export const FilterSidesheet = FilterSidesheetTemplate.bind({});
FilterSidesheet.argTypes = drawerArgTypes;
FilterSidesheet.args = {
  open: true,
  direction: 'right',
} as IDrawerProps;
