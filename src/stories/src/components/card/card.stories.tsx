import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeButton, ForgeCard, ForgeIcon, ForgeIconButton, ForgeScaffold, ForgeToolbar } from '@tylertech/forge-react';
import { argTypes, ICardProps } from './card-args';
import { LOREM_IPSUM } from '../../mock/lorem-ipsum';
import { tylIconMoreVert } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge';

const MDX = require('./card.mdx').default;

export default {
  title: 'Components/Card',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', backgroundColor: 'var(--mdc-theme-background)', }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default: Story<ICardProps> = ({
  raised = false,
}) => {
  return (
    <ForgeCard raised={raised} style={{ width: '400px', '--forge-card-padding': '16px' }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
      aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
      enim sint nesciunt provident excepturi dolorum pariatur illum?  
    </ForgeCard>
  );
};
Default.args = {
  raised: false
} as ICardProps;

export const Styled: Story<ICardProps> = ({
  raised = false,
}) => {
  const containerStyle = {
    maxWidth: '400px'
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  };
  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end'
  };

  useEffect(() => {
    IconRegistry.define(tylIconMoreVert);
  }, []);

  return (
    <div style={containerStyle}>
      <ForgeCard raised={raised} style={{'--forge-card-padding': '16px'}}>
        <div style={headerStyle}>
          <h3 className="forge-typography--heading4">This is the card title</h3>
          <ForgeIconButton>
            <button type="button">
              <ForgeIcon name="more_vert" />
            </button>
          </ForgeIconButton>
        </div>
        <div>
          <p className="forge-typography--body1">{LOREM_IPSUM.p1}</p>
        </div>
        <div style={footerStyle}>
          <div>
            <ForgeButton>
              <button type="button">Ok</button>
            </ForgeButton>
            <ForgeButton>
              <button type="button">Cancel</button>
            </ForgeButton>
          </div>
        </div>
      </ForgeCard>
    </div>
  );
};
Styled.args = {
  raised: false
} as ICardProps;

export const WithScaffold: Story<ICardProps> = ({
  raised = false
}) => {
  return (
    <ForgeCard raised={raised} style={{ width: '400px', '--forge-card-padding': '0', '--forge-card-height': '300px' }}>
      <ForgeScaffold>
        <ForgeToolbar slot="header">
          <h1 slot="start" className="forge-typography--heading4">Lorem ipsum</h1>
        </ForgeToolbar>

        <p slot="body" className="forge-typography--body1" tabIndex={0} style={{padding: '16px', margin: '0'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?
        </p>

        <ForgeToolbar slot="footer" inverted>
          <ForgeButton type="outlined" slot="end">
            <button type="button">Cancel</button>
          </ForgeButton>
          <ForgeButton type="unelevated" slot="end" style={{marginLeft: '8px'}}>
            <button type="button">Ok</button>
          </ForgeButton>
        </ForgeToolbar>
      </ForgeScaffold>
    </ForgeCard>
  );
};
WithScaffold.args = {
  raised: false
} as ICardProps;
