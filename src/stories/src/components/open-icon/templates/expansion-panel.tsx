import { Story } from '@storybook/react';
import { ForgeCard, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import React, { CSSProperties } from 'react';
import { LiveDemoStage } from '../../../core/live-demo-stage';

export const ExpansionPanelTemplate: Story<{}> = () => {
  const flexContainer: CSSProperties = {
    display: 'flex',
    WebkitBoxOrient: 'horizontal',
    WebkitBoxDirection: 'normal',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
  };
  const placeholderContainer: CSSProperties = {
    border: '1px dashed #e0e0e0',
    display: 'flex',
    WebkitBoxOrient: 'vertical',
    WebkitBoxDirection: 'normal',
    flexDirection: 'column',
    WebkitBoxPack: 'center',
    justifyContent: 'center',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
    padding: '8px',
    margin: '8px',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
  };
  return (
    <LiveDemoStage>
      <ForgeCard>
        <ForgeExpansionPanel>
          <div slot="header" style={flexContainer}>
            <div style={{ flex: 1 }}>Expansion panel</div>
            <ForgeOpenIcon className="forge-flex-item--right"></ForgeOpenIcon>
          </div>
          <div style={placeholderContainer}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum error officia iure
            corporis veritatis ut quod quo libero ea repellendus, consequuntur porro explicabo
            exercitationem minus pariatur debitis nihil at labore!  
          </div>
        </ForgeExpansionPanel>
      </ForgeCard>
    </LiveDemoStage>
  );
};
