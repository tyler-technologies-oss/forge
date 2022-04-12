import { Story } from '@storybook/react';
import { ForgeCard, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import React from 'react';
import { IExpansionPanelProps } from '../expansion-panel-args';

export const CardRecipeTemplate: Story<IExpansionPanelProps> = props => (
  <ForgeCard has-padding="false">
    <ForgeExpansionPanel {...props}>
      <button slot="header" style={{justifyContent: 'space-between', alignItems: 'center'}} className={'forge-expandable__button'}>
        <div>Panel header</div>
        <ForgeOpenIcon className={'forge-flex-item--right'}></ForgeOpenIcon>
      </button>
      <div className={'forge-expandable__content'}>Expandable card content</div>
    </ForgeExpansionPanel>
  </ForgeCard>
);
