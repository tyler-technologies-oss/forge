import React from 'react';
import { Meta, Story } from '@storybook/react';
import { ForgeStack } from '@tylertech/forge-react';
import { IStackProps, argTypes } from './stack-args';

const MDX = require('./stack.mdx').default;

const stackContainer: React.CSSProperties = {
  position: 'relative',
  width: '960px',
  border: '4px solid var(--mdc-theme-text-secondary-on-background)',
  padding: '36px',
  resize: 'both',
  overflow: 'auto'
}

const box: React.CSSProperties = {
  padding: '36px',
  border: '4px dashed var(--mdc-theme-text-secondary-on-background)',
  backgroundColor: 'var(--mdc-theme-text-disabled-on-background)',
  borderRadius: '8px'
}

export default {
  title: 'Components/Stack',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IStackProps> = ({
  inline = false,
  wrap = false,
  stretch = false,
  alignment = "start"
}) => (
  <>
    <p>Resize this container to play with wrapping and alignment</p>
    <div style={{...stackContainer}}>
      <ForgeStack inline={inline} wrap={wrap} stretch={stretch} alignment={alignment}>
        <div style={{...box}}></div>
        <div style={{...box}}></div>
        <div style={{...box}}></div>
        <div style={{...box}}></div>
        <div style={{...box}}></div>
        <div style={{...box}}></div>
      </ForgeStack>
    </div>
  </>
);

export const DocsDemo: Story<IStackProps> = ({
  inline = true,
  wrap = false,
  stretch = false,
  alignment = "start"
}) => (
  <ForgeStack inline={inline} wrap={wrap} stretch={stretch} alignment={alignment}>
    <div style={{...box}}></div>
    <div style={{...box}}></div>
    <div style={{...box}}></div>
  </ForgeStack>
);

Default.args = {
  inline: false,
  wrap: false,
  stretch: false,
  alignment: 'start',
} as IStackProps;
