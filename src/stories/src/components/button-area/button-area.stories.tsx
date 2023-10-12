import { Meta, Story } from '@storybook/react';
import React, { useEffect, useRef } from 'react';
import { buttonAreaArgTypes, IButtonAreaProps } from './button-area-args';
import { createElementProxy, ForgeIconButton, ForgeCard, ForgeIcon, ForgeTooltip, ForgeExpansionPanel, ForgeOpenIcon } from '@tylertech/forge-react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconChevronRight, tylIconFavorite } from '@tylertech/tyler-icons/standard';

const MDX = require('./button-area.mdx').default;

const ForgeButtonArea = createElementProxy('forge-button-area');

const cardStyle = {
  '--forge-card-padding': 0,
  width: '320px',
  maxWidth: '100%'
} as React.CSSProperties;
const contentStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '16px'
} as React.CSSProperties;
const textStyle = {
  marginInlineEnd: 'auto'
} as React.CSSProperties;
const panelContentStyle = { margin: '16px' } as React.CSSProperties;

export default {
  title: 'Components/Button Area',
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IButtonAreaProps> = ({
  label = 'Label',
  disabled = false,
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconChevronRight, tylIconFavorite]);
  }, []);

  return (
    <ForgeCard outlined style={cardStyle}>
      <ForgeButtonArea>
        <button slot="button" type="button" disabled={disabled}>{label}</button>
        <div style={contentStyle}>
          <div style={textStyle}>
            <div className="forge-typography--headline5">Heading</div>
            <div>Content</div>
          </div>
          <ForgeIconButton data-forge-ignore>
            <button type="button" aria-label="Favorite">
              <ForgeIcon name="favorite"></ForgeIcon>
            </button>
            <ForgeTooltip>Favorite</ForgeTooltip>
          </ForgeIconButton>
          <ForgeIcon name="chevron_right"></ForgeIcon>
        </div>
      </ForgeButtonArea>
    </ForgeCard>
  )
};
Default.argTypes = buttonAreaArgTypes;
Default.args = {
  label: 'Label',
  disabled: false,
} as IButtonAreaProps;

export const InExpansionPanel: Story<IButtonAreaProps> = ({
  label = 'Toggle panel',
  disabled = false,
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconChevronRight, tylIconFavorite]);
  }, []);

  const buttonRef = useRef<HTMLButtonElement>(null);

  function onToggleExpansionPanel({ detail }: CustomEvent<boolean>): void {
    buttonRef.current?.setAttribute('aria-expanded', detail.toString());
  }

  return (
    <ForgeCard outlined style={cardStyle}>
      <ForgeExpansionPanel on-forge-expansion-panel-toggle={onToggleExpansionPanel}>
        <ForgeButtonArea slot="header">
          <button ref={buttonRef} slot="button" type="button" disabled={disabled} aria-controls="expandable-content" aria-expanded="false">{label}</button>
          <div style={contentStyle}>
            <div style={textStyle}>
              <div className="forge-typography--headline5">Heading</div>
              <div>Content</div>
            </div>
            <ForgeIconButton data-forge-ignore>
              <button type="button" aria-label="Favorite">
                <ForgeIcon name="favorite"></ForgeIcon>
              </button>
              <ForgeTooltip>Favorite</ForgeTooltip>
            </ForgeIconButton>
            <ForgeOpenIcon></ForgeOpenIcon>
          </div>
        </ForgeButtonArea>
        <div id="expandable-content" role="group" aria-label="Expandable content" style={panelContentStyle}>Content</div>
      </ForgeExpansionPanel>
    </ForgeCard>
  )
};
InExpansionPanel.argTypes = buttonAreaArgTypes;
InExpansionPanel.args = {
  label: 'Toggle panel',
  disabled: false,
} as IButtonAreaProps;
