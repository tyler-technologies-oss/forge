import React from 'react';
import { Meta, Story } from '@storybook/react';
import { argTypes, IExpansionPanelProps } from './expansion-panel-args';
import { ForgeExpansionPanel } from '@tylertech/forge-react';

const MDX = require('./expansion-panel.mdx').default;

export default {
  title: 'Components/Expansion Panel',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IExpansionPanelProps> = ({
  open = false,
  orientation = 'vertical',
  useAnimations = true
}) => (
  <ForgeExpansionPanel open={open} orientation={orientation} useAnimations={useAnimations} style={{ width: '250px' }}>
    <button slot="header" className={'expansion-panel-button expansion-panel-button--default'}>Click me</button>
    <div style={{ width: orientation === 'horizontal' ? '250px' : 'auto' }}>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure
      corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo
      exercitationem minus pariatur debitis nihil at labore!
    </div>
  </ForgeExpansionPanel>
);
Default.args = {
  open: false,
  orientation: 'vertical',
  useAnimations: true
} as IExpansionPanelProps;
