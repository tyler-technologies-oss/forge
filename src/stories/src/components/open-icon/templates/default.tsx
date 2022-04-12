import { Story } from '@storybook/react';
import { ForgeOpenIcon, ForgeSwitch } from '@tylertech/forge-react';
import React, { useState } from 'react';
import { IOpenIconProps } from '../open-icon-args';

export const DefaultTemplate: Story<IOpenIconProps> = ({
  orientation = 'vertical'
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ForgeSwitch on-forge-switch-select={() => setIsOpen(!isOpen)} button-aria-label="Toggle open icon" />
      <ForgeOpenIcon open={isOpen} {...{ orientation }} style={{ display: 'inline-block', marginLeft: '24px' }} />
    </div>
  );
};
