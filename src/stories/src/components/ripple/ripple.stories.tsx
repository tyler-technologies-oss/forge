import { Meta, Story } from '@storybook/react';
import { ForgeRipple, ForgeCard } from '@tylertech/forge-react';
import React, { CSSProperties } from 'react';
import { IRippleArgs, argTypes } from './ripple-args';

const MDX = require('./ripple.mdx').default;

export default {
  title: 'Components/Ripple',
  parameters: { 
    docs: { 
      page: MDX
    }
  },
} as Meta;

export const Default: Story = ({ unbounded = false }) => {
  const divStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: unbounded ? '24px' : '0',
    width: '200px',
    height: '150px',
    cursor: 'pointer'
  };
  return (
    <div>
      <div style={divStyles} id="custom-ripple-button" role="button" tabIndex={0} aria-label="Click me for fun!">Click me!</div>
      <ForgeRipple unbounded={unbounded} target="#custom-ripple-button" />
    </div>
  );
};
Default.argTypes = argTypes;
Default.args = {
  unbounded: false
} as IRippleArgs;

export const WithCard: Story = () => {
  const cardStyles: CSSProperties = {
    width: '200px',
    height: '150px'
  };
  const cardBodyStyles: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer'
  };
  return (
    <ForgeCard style={cardStyles} role="button" tabIndex="0" aria-label="Click me for fun!">
      <div style={cardBodyStyles}>Click me!</div>
      <ForgeRipple />
    </ForgeCard>
  );
};
WithCard.parameters = { 
  controls: { disable: true }
};
