import { Story } from '@storybook/react';
import { ForgeAccordion, ForgeDivider, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import React from 'react';
import { IAccordionProps } from '../accordion-args';

export const DefaultTemplate: Story<IAccordionProps> = () => {
  const buttonStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };
  return (
    <ForgeAccordion style={{ display: 'block', maxWidth: '256px' }}>
      <ForgeExpansionPanel>
        <div role="button" tabIndex={0} slot="header" style={buttonStyles}>
          <div>Panel One</div>
          <ForgeOpenIcon />
        </div>
        <div>Content for panel one.</div>
      </ForgeExpansionPanel>
      <ForgeDivider />
      <ForgeExpansionPanel>
        <div role="button" tabIndex={0} slot="header" style={buttonStyles}>
          <div>Panel Two</div>
          <ForgeOpenIcon />
        </div>
        <div>Content for panel two.</div>
      </ForgeExpansionPanel>
      <ForgeDivider />
      <ForgeExpansionPanel>
        <div role="button" tabIndex={0} slot="header" style={buttonStyles}>
          <div>Panel Three</div>
          <ForgeOpenIcon />
        </div>
        <div>Content for panel three.</div>
      </ForgeExpansionPanel>
    </ForgeAccordion>
  );  
};
