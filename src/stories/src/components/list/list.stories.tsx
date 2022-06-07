import React, { FC, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { IListProps, argTypes } from './list-args';
import { ForgeCheckbox, ForgeExpansionPanel, ForgeIcon, ForgeList, ForgeListItem, ForgeOpenIcon, ForgeRadio } from '@tylertech/forge-react';
import { tylIconFolder, tylIconCode, tylIconFace, tylIconWifi, tylIconBluetooth, tylIconDataUsage, tylIconCloudDownload, tylIconInfo } from '@tylertech/tyler-icons/standard';
import { tylIconEmoticonSadOutline } from '@tylertech/tyler-icons/extended';
import { IconRegistry } from '@tylertech/forge';

const MDX = require('./list.mdx').default;

export default {
  title: 'Components/List',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
    layout: 'fullscreen'
  }
} as Meta;

export const Default: Story<IListProps> = ({
  staticList = false,
  dense = false,
  indented = false,
  listStyle = 'one-line',
  ripple = true,
  disabled = false,
  wrap = false,
  leadingSlot = 'none',
  trailingSlot = 'none'
}) => {
  useEffect(() => {
    IconRegistry.define([
      tylIconFolder,
      tylIconWifi,
      tylIconBluetooth,
      tylIconDataUsage,
      tylIconCloudDownload,
      tylIconInfo
    ])
  }, []);

  let listItemProps = {
    ripple,
    disabled,
    wrap,
    twoLine: false,
    threeLine: false
  };

  switch(listStyle) {
    case 'one-line': {
      listItemProps.twoLine = false;
      listItemProps.threeLine = false;
      break;
    }
    case 'two-line': {
      listItemProps.twoLine = true;
      listItemProps.threeLine = false;
      break;
    }
    case 'three-line': {
      listItemProps.twoLine = false;
      listItemProps.threeLine = true;
      break;
    }
  }

  const LineOne: FC<{label: string, avatarText: string}> = ({label, avatarText}) => leadingSlot === 'avatar' 
    ? (<span slot="title">{avatarText}</span>)
    : (<span slot="title">List Item {label}</span>);
  const LineTwo: FC<{avatarText: string}> = ({avatarText}) => listStyle !== 'one-line' 
    ? leadingSlot === 'avatar' 
      ? (<span slot="subtitle">{avatarText}</span>)
      : (<span slot="subtitle">Secondary Text</span>)
    : null;
  const LineThree: FC = () => listStyle === 'three-line' ? <span slot="tertiary-title">Tertiary Text</span> : null;
  const LeadingAvatar: FC = () => leadingSlot === 'avatar' ? <ForgeIcon name="folder" slot="avatar" /> : null;
  const LeadingCheckbox: FC<{label: string}> = ({label}) => leadingSlot === 'checkbox'
    ? (<ForgeCheckbox slot="leading">
        <input type="checkbox" aria-label={`Select list item ${label}`} />
      </ForgeCheckbox>)
    : null;
  const LeadingIcon: FC<{icon: string}> = ({icon}) => leadingSlot === 'icon' ? <ForgeIcon slot="leading" name={icon} /> : null;
  const LeadingRadioButton: FC<{label: string}> = ({label}) => leadingSlot === 'radio-button'
    ? (<ForgeRadio slot="leading">
        <input type="radio" name="list-radio" aria-label={`Select list item ${label}`} />
      </ForgeRadio>)
    : null;
  const TrailingCheckbox: FC<{label: string}> = ({label}) => trailingSlot === 'checkbox'
    ? (<ForgeCheckbox slot="trailing">
        <input type="checkbox" aria-label={`Select list item ${label}`} />
      </ForgeCheckbox>)
    : null;
  const TrailingIcon: FC = () => trailingSlot === 'icon' ? <ForgeIcon slot="trailing" name="info" /> : null;
  const TrailingRadioButton: FC<{label: string}> = ({label}) => trailingSlot === 'radio-button'
    ? (<ForgeRadio slot="trailing">
        <input type="radio" name="list-radio" aria-label={`Select list item ${label}`} />
      </ForgeRadio>)
    : null;
  const hasRole = leadingSlot === 'radio-button' || trailingSlot === 'radio-button' ? 'radiogroup' : null;
  return (
    <ForgeList static={staticList} dense={dense} indented={indented} role={hasRole} style={{ width: '450px' }}>
      <ForgeListItem {...listItemProps}>
        <LeadingAvatar />
        <LeadingCheckbox label="one" />
        <LeadingIcon icon="wifi" />
        <LeadingRadioButton label="one" />
        <TrailingCheckbox label="one" />
        <TrailingIcon />
        <TrailingRadioButton label="one" />
        <LineOne label="One" avatarText="Dog Photos" />
        <LineTwo avatarText="9 Jan 2018" />
        <LineThree/>
      </ForgeListItem>

      <ForgeListItem {...listItemProps}>
        <LeadingAvatar />
        <LeadingCheckbox label="two" />
        <LeadingIcon icon="bluetooth" />
        <LeadingRadioButton label="two" />
        <TrailingCheckbox label="two" />
        <TrailingIcon />
        <TrailingRadioButton label="two" />
        <LineOne label="Two" avatarText="Cat Photos"/>
        <LineTwo avatarText="22 Dec 2017" />
        <LineThree />
      </ForgeListItem>

      <ForgeListItem {...listItemProps}>
        <LeadingAvatar />
        <LeadingCheckbox label="three"/>
        <LeadingIcon icon="data_usage" />
        <LeadingRadioButton label="three" />
        <TrailingCheckbox label="three" />
        <TrailingIcon />
        <TrailingRadioButton label="three" />
        <LineOne label="Three" avatarText="Potatoes" />
        <LineTwo avatarText="30 Nov 2017" />
        <LineThree />
      </ForgeListItem>
    
      <ForgeListItem {...listItemProps}>
        <LeadingAvatar />
        <LeadingCheckbox label="four" />
        <LeadingIcon icon="cloud_download" />
        <LeadingRadioButton label="four" />
        <TrailingCheckbox label="four" />
        <TrailingIcon />
        <TrailingRadioButton label="four" />
        <LineOne label="Four" avatarText="Carrots" />
        <LineTwo avatarText="17 Oct 2017" />
        <LineThree />
      </ForgeListItem>
    </ForgeList>
  );
};
Default.args = {
  staticList: false,
  dense: false,
  indented: false,
  listStyle: 'one-line',
  ripple: true,
  disabled: false,
  wrap: false,
  leadingSlot: 'none',
  trailingSlot: 'none',
} as IListProps;

export const Expandable: Story = () => {
  useEffect(() => {
    IconRegistry.define([
      tylIconFace,
      tylIconCode,
      tylIconEmoticonSadOutline
    ]);
  }, []);

  return (
    <ForgeList style={{ width: '450px' }}>
      <ForgeExpansionPanel>
        <ForgeListItem slot="header">
          <ForgeIcon slot="leading" name="code" />
          List Item One
          <ForgeOpenIcon slot="trailing" />
        </ForgeListItem>
        <ForgeList>
          <ForgeListItem indented>List Item One</ForgeListItem>
          <ForgeListItem indented>List Item Two</ForgeListItem>
          <ForgeListItem indented>List Item Three</ForgeListItem>
        </ForgeList>
      </ForgeExpansionPanel>
      <ForgeExpansionPanel>
        <ForgeListItem slot="header">
          <ForgeIcon slot="leading" name="face" />
          List Item Two
          <ForgeOpenIcon slot="trailing" />
        </ForgeListItem>
        <ForgeList>
          <ForgeListItem indented>List Item One</ForgeListItem>
          <ForgeListItem indented>List Item Two</ForgeListItem>
          <ForgeListItem indented>List Item Three</ForgeListItem>
        </ForgeList>
      </ForgeExpansionPanel>
      <ForgeListItem>
        <ForgeIcon slot="leading" name="emoticon_sad_outline" />
        List Item Three
      </ForgeListItem>
    </ForgeList>
  );
};
Expandable.argTypes = {};
Expandable.parameters = {
  controls: {
    disable: true
  }
};
