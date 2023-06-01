import { Story } from '@storybook/react';
import { ForgeCard, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import React from 'react';
import { IExpansionPanelProps } from '../expansion-panel-args';

export const CardRecipeTemplate: Story<IExpansionPanelProps> = () => (
  <ForgeCard style={{'--forge-card-padding': '16px'}}>
    <ForgeExpansionPanel>
      <button slot="header" style={{ all: 'unset', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>Panel header</div>
        <ForgeOpenIcon />
      </button>
      <div>Expandable card content</div>
    </ForgeExpansionPanel>
  </ForgeCard>
);
