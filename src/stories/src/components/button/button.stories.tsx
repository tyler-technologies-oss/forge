import { Meta } from '@storybook/react';
import { buttonArgTypes, buttonMobileArgTypes, IButtonMobileProps, IButtonProps } from './button-args';
import { DefaultTemplate } from './templates/default';
import { MobileTemplate } from './templates/mobile';
const MDX = require('./button.mdx').default;

export default {
  title: 'Components/Button',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default = DefaultTemplate.bind({});
Default.argTypes = buttonArgTypes;
Default.args = {
  type: 'flat',
  text: 'Button',
} as IButtonProps;

export const Mobile = MobileTemplate.bind({});
Mobile.argTypes = buttonMobileArgTypes;
Mobile.args = {
  type: 'raised',
  hasLeadingIcon: false,
  hasTrailingIcon: false,
} as IButtonMobileProps;

