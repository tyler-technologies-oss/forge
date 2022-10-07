import React, { CSSProperties } from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeScaffold } from '@tylertech/forge-react';
import { argTypes, IScaffoldProps } from './scaffold-args';

const MDX = require('./scaffold.mdx').default;

export default {
  title: 'Components/Scaffold',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IScaffoldProps> = ({
  hasLeft = true,
  hasHeader = true,
  hasBody = true,
  hasBodyHeader = true,
  hasBodyLeft = true,
  hasBodyRight = true,
  hasBodyFooter = true,
  hasFooter = true,
  hasRight = true
}) => {
  const slotStyle: CSSProperties = {
    border: '1px dashed var(--mdc-theme-text-secondary-on-background)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px',
    margin: '8px',
    boxSizing: 'border-box'
  };
  return (
    <ForgeScaffold style={{ '--forge-scaffold-height': '500px', '--forge-scaffold-width': '100%' }}>
      {hasLeft && <div slot="left" style={slotStyle}>left</div>}
      {hasHeader && <div slot="header" style={slotStyle}>header</div>}
      {hasBodyHeader && <div slot="body-header" style={slotStyle}>body-header</div>}
      {hasBodyLeft && <div slot="body-left" style={slotStyle}>body-left</div>}
      {hasBody && <div slot="body" style={slotStyle}>body</div>}
      {hasBodyRight && <div slot="body-right" style={slotStyle}>body-right</div>}
      {hasBodyFooter && <div slot="body-footer" style={slotStyle}>body-footer</div>}
      {hasFooter && <div slot="footer" style={slotStyle}>footer</div>}
      {hasRight && <div slot="right" style={slotStyle}>right</div>}
    </ForgeScaffold>
  );
};
Default.args = {
  hasLeft: true,
  hasHeader: true,
  hasBody: true,
  hasBodyHeader: true,
  hasBodyLeft: true,
  hasBodyRight: true,
  hasBodyFooter: true,
  hasFooter: true,
  hasRight: true,
} as IScaffoldProps;
