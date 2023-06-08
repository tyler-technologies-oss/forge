import { Story } from '@storybook/react';
import { ForgeCard, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import React, { useRef } from 'react';
import { IExpansionPanelProps } from '../expansion-panel-args';
import '../expansion-panel-style.css';

export const CardRecipeTemplate: Story<IExpansionPanelProps> = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function onToggleExpansionPanel({ detail }: CustomEvent<boolean>): void {
    buttonRef.current?.setAttribute('aria-expanded', detail.toString());
  }

  return (
    <ForgeCard style={{'--forge-card-padding': '16px'}}>
      <ForgeExpansionPanel on-forge-expansion-panel-toggle={onToggleExpansionPanel}>
        <button ref={buttonRef} slot="header" aria-controls="expansion-panel-content" aria-expanded="false" className={'expansion-panel-button expansion-panel-button--card'}>
          <div>Panel header</div>
          <ForgeOpenIcon />
        </button>
        <div id="expansion-panel-content">Expandable card content</div>
      </ForgeExpansionPanel>
    </ForgeCard>
  );
};
