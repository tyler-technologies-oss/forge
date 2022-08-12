import { Story } from '@storybook/react';
import { ForgeCard, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import React from 'react';
import { IExpansionPanelProps } from '../expansion-panel-args';

export const CardRecipeTemplate: Story<IExpansionPanelProps> = () => (
  <ForgeCard style={{'--forge-card-padding': '16px'}}>
    <ForgeExpansionPanel>
      <div role="button" tabIndex={0} slot="header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>Panel header</div>
        <ForgeOpenIcon />
      </div>
      <div>Expandable card content</div>
    </ForgeExpansionPanel>
  </ForgeCard>
);
