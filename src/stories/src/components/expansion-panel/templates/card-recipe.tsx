import { Story } from '@storybook/react';
import { ForgeCard, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import React from 'react';
import { IExpansionPanelProps } from '../expansion-panel-args';
import '../expansion-panel-style.css';

export const CardRecipeTemplate: Story<IExpansionPanelProps> = () => (
  <ForgeCard style={{'--forge-card-padding': '16px'}}>
    <ForgeExpansionPanel>
      <button slot="header" className={'expansion-panel-button expansion-panel-button--card'}>
        <div>Panel header</div>
        <ForgeOpenIcon />
      </button>
      <div>Expandable card content</div>
    </ForgeExpansionPanel>
  </ForgeCard>
);
