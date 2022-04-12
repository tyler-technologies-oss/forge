import { Story } from '@storybook/react';
import { ForgeExpansionPanel, ForgeIcon, ForgeList, ForgeListItem, ForgeOpenIcon } from '@tylertech/forge-react';
import React, { useEffect } from 'react';
import { IconRegistry } from '@tylertech/forge';
import { tylIconCode, tylIconFace } from '@tylertech/tyler-icons/standard';
import { tylIconEmoticonSadOutline } from '@tylertech/tyler-icons/extended';

export const ExpandableTemplate: Story = () => {
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
          <ForgeOpenIcon slot="trailing"></ForgeOpenIcon>
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
          <ForgeOpenIcon slot="trailing"></ForgeOpenIcon>
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
