import { Story } from "@storybook/react";
import { ForgeRipple } from "@tylertech/forge-react";
import React, { CSSProperties } from "react";

export const DefaultTemplate: Story = ({ unbounded = false }) => {
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
