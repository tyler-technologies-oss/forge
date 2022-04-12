import { Story } from '@storybook/react';
import { ForgeButton, ForgePageState } from '@tylertech/forge-react';
import React from 'react';
import { IPageStateProps } from '../page-state-args';

export const DefaultTemplate: Story<IPageStateProps> = ({
  hasGraphic = true,
  hasTitle = true,
  hasMessage = true,
  hasActions = true,
}) => {
  const Graphic = () => hasGraphic
    ? (<img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" 
        alt="" 
        slot="graphic" />)
    : null;
  const Title = () => hasTitle
    ? (<div slot="title">Nothing but tumbleweeds here...</div>)
    : null;
  const Message = () => hasMessage
    ? (
      <div slot="message">
        Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have
        mistyped the URL.
      </div>
    )
    : null;
  const Actions = () => hasActions
    ? (
      <>
        <ForgeButton type="raised" slot="action">
          <button>Go back</button>
        </ForgeButton>
        <ForgeButton type="outlined" slot="action">
          <button>Refresh</button>
        </ForgeButton>
      </>
    )
    : null;
  return (
    <ForgePageState>
      <Graphic/>    
      <Title/>
      <Message/>
      <Actions/>
    </ForgePageState>
  );
};
