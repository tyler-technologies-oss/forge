import { Story } from "@storybook/react";
import { ForgeCard, ForgeRipple } from "@tylertech/forge-react";
import React, { CSSProperties } from "react";

export const CardRecipeTemplate: Story = () => {
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
    <ForgeCard outlined style={cardStyles} role="button" tabIndex="0" aria-label="Click me for fun!">
      <div style={cardBodyStyles}>Click me!</div>
      <ForgeRipple />
    </ForgeCard>
  );
};
