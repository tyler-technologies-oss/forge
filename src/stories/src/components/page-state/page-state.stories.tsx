import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeButton, ForgePageState } from '@tylertech/forge-react';
import { IPageStateProps, argTypes } from './page-state-args';
const MDX = require('./page-state.mdx').default;

export default {
  title: 'Components/Page State',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IPageStateProps> = ({
  hasGraphic = true,
  hasTitle = true,
  hasMessage = true,
  hasActions = true
}) => {
  return (
    <ForgePageState>
      {hasGraphic && <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />}
      {hasTitle && <div slot="title">Nothing but tumbleweeds here...</div>}
      {hasMessage && 
        <p slot="message">
          Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have
          mistyped the URL.
        </p>}
      {hasActions && 
        <>
          <ForgeButton variant="raised" slot="action">Go back</ForgeButton>
          <ForgeButton variant="outlined" slot="action">Refresh</ForgeButton>
        </>
      }
    </ForgePageState>
  );
};
Default.args = {
  hasGraphic: true,
  hasTitle: true,
  hasMessage: true,
  hasActions: true,
} as IPageStateProps;
