import React, { CSSProperties } from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeCard, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import { argTypes, IOpenIconProps } from './open-icon-args';

const MDX = require('./open-icon.mdx').default;

export default {
  title: 'Components/Open Icon',
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IOpenIconProps> = ({
  open = false,
  orientation = 'vertical'
}) => (
    <ForgeOpenIcon open={open} orientation={orientation} />
);
Default.argTypes = argTypes;
Default.args = {
  open: false,
  orientation: 'vertical',
} as IOpenIconProps;

export const WithExpansionPanel: Story<{}> = () => {
  const flexContainer: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };
  const placeholderContainer: CSSProperties = {
    border: '1px dashed #e0e0e0',
    padding: '8px',
    margin: '8px'
  };
  return (
    <ForgeCard outlined style={{'--forge-card-padding': '16px', margin: '16px'}}>
      <ForgeExpansionPanel>
        <div slot="header" role="button" tabIndex={0} style={flexContainer}>
          <div>Expansion panel</div>
          <ForgeOpenIcon />
        </div>
        <div style={placeholderContainer}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure
          corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo
          exercitationem minus pariatur debitis nihil at labore!  
        </div>
      </ForgeExpansionPanel>
    </ForgeCard>
  );
};
WithExpansionPanel.parameters = { 
  controls: { disable: true }
};