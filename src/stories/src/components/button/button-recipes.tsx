import { Meta } from '@storybook/react';
import { 
  buttonArgTypes,
  buttonLoadingOnSubmitArgTypes, 
  buttonMenuArgTypes, 
  buttonMobileArgTypes, 
  IButtonLoadingOnSubmitProps, 
  IButtonMenuProps, 
  IButtonMobileProps 
} from './button-args';
import { MenuTemplate } from './templates/menu';
import { MobileTemplate } from './templates/mobile';
import { LoadingOnSubmitTemplate } from './templates/loading-on-submit';
const MDX = require('./button.mdx').default;

export default {
  title: 'Components/Button/Recipes',
  argTypes: buttonArgTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Menu = MenuTemplate.bind({});
Menu.argTypes = buttonMenuArgTypes;
Menu.args = {
  type: 'flat',
  hasLeadingIcon: false,
  hasTrailingIcon: false,
  persistSelection: true,
} as IButtonMenuProps;

export const Mobile = MobileTemplate.bind({});
Mobile.argTypes = buttonMobileArgTypes;
Mobile.args = {
  type: 'raised',
  hasLeadingIcon: false,
  hasTrailingIcon: false,
} as IButtonMobileProps;

export const LoadingOnSubmit = LoadingOnSubmitTemplate.bind({});
LoadingOnSubmit.argTypes = buttonLoadingOnSubmitArgTypes;
LoadingOnSubmit.args = {
  type: 'raised',
  determinate: false,
  progress: 0,
} as IButtonLoadingOnSubmitProps;
