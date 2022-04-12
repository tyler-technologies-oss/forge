import { Story } from '@storybook/react';
import { ForgeExpansionPanel } from '@tylertech/forge-react';
import React from 'react';
import { IExpansionPanelProps } from '../expansion-panel-args';

export const DefaultTemplate: Story<IExpansionPanelProps> = ({
  open = false,
  orientation = 'vertical',
  useAnimations = true
}) => {
  const expansionPanelProps = {
    open,
    orientation,
    useAnimations
  };
  return (
    <ForgeExpansionPanel {...expansionPanelProps} style={{ width: '250px' }}>
      <div slot="header">Click me</div>
      <div style={{ width: orientation === 'horizontal' ? '250px' : 'auto' }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure
        corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo
        exercitationem minus pariatur debitis nihil at labore!
      </div>
    </ForgeExpansionPanel>
  );
}
