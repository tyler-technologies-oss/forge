import { Story } from '@storybook/react';
import { ForgeCheckbox, ForgeIcon, ForgeList, ForgeListItem, ForgeRadio } from '@tylertech/forge-react';
import { tylIconFolder } from '@tylertech/tyler-icons/standard';
import { IconRegistry } from '@tylertech/forge';
import React, { FC, useEffect } from 'react';
import { IListProps } from '../list-args';

export const DefaultTemplate: Story<IListProps> = ({
  staticList = false,
  dense = false,
  indented = false,
  listStyle = 'one-line',
  ripple = true,
  disabled = false,
  wrap = false,
  leadingSlot = 'none',
  trailingSlot = 'none',
}) => {
  useEffect(() => {
    IconRegistry.define([tylIconFolder])
  }, []);

  const listProps = {
    static: staticList,
    dense,
    indented,
  };
  let listItemProps = {
    ripple,
    disabled,
    wrap,
    twoLine: false,
    threeLine: false,
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
  const LineThree: FC = () => listStyle === 'three-line'
    ? (<span slot="tertiary-title">Tertiary Text</span>)
    : null;
  const LeadingAvatar: FC = () => leadingSlot === 'avatar'
    ? (<ForgeIcon name="folder" slot="avatar" />)
    : null;
  const LeadingCheckbox: FC<{label: string}> = ({label}) => leadingSlot === 'checkbox'
    ? (<ForgeCheckbox slot="leading">
        <input type="checkbox" aria-label={`Select list item ${label}`} />
      </ForgeCheckbox>)
    : null;
  const LeadingIcon: FC<{icon: string}> = ({icon}) => leadingSlot === 'icon'
    ? (<i className={'tyler-icons'} slot="leading">{icon}</i>)
    : null;
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
  const TrailingIcon: FC = () => trailingSlot === 'icon'
    ? (<i className={'tyler-icons'} slot="trailing">info</i>)
    : null;
  const TrailingRadioButton: FC<{label: string}> = ({label}) => trailingSlot === 'radio-button'
    ? (<ForgeRadio slot="trailing">
        <input type="radio" name="list-radio" aria-label={`Select list item ${label}`} />
      </ForgeRadio>)
    : null;
  const hasRole = leadingSlot === 'radio-button' || trailingSlot === 'radio-button'
    ? 'radiogroup'
    : null;
  return (
    <ForgeList {...listProps} role={hasRole} style={{ width: '450px' }}>
      <ForgeListItem {...listItemProps}>
        <LeadingAvatar/>
        <LeadingCheckbox label={'one'}/>
        <LeadingIcon icon={'wifi'}/>
        <LeadingRadioButton label={'one'}/>
        <TrailingCheckbox label={'one'}/>
        <TrailingIcon/>
        <TrailingRadioButton label={'one'}/>
        <LineOne label={'One'} avatarText={'Dog Photos'}/>
        <LineTwo avatarText={'9 Jan 2018'}/>
        <LineThree/>
      </ForgeListItem>

      <ForgeListItem {...listItemProps}>
        <LeadingAvatar/>
        <LeadingCheckbox label={'two'}/>
        <LeadingIcon icon={'bluetooth'}/>
        <LeadingRadioButton label={'two'}/>
        <TrailingCheckbox label={'two'}/>
        <TrailingIcon/>
        <TrailingRadioButton label={'two'}/>
        <LineOne label={'Two'} avatarText={'Cat Photos'}/>
        <LineTwo avatarText={'22 Dec 2017'}/>
        <LineThree/>
      </ForgeListItem>

      <ForgeListItem {...listItemProps}>
        <LeadingAvatar/>
        <LeadingCheckbox label={'three'}/>
        <LeadingIcon icon={'data_usage'}/>
        <LeadingRadioButton label={'three'}/>
        <TrailingCheckbox label={'three'}/>
        <TrailingIcon/>
        <TrailingRadioButton label={'three'}/>
        <LineOne label={'Three'} avatarText={'Potatoes'}/>
        <LineTwo avatarText={'30 Nov 2017'}/>
        <LineThree/>
      </ForgeListItem>
      <ForgeListItem {...listItemProps}>
        <LeadingAvatar/>
        <LeadingCheckbox label={'four'}/>
        <LeadingIcon icon={'cloud_download'}/>
        <LeadingRadioButton label={'four'}/>
        <TrailingCheckbox label={'four'}/>
        <TrailingIcon/>
        <TrailingRadioButton label={'four'}/>
        <LineOne label={'Four'} avatarText={'Carrots'}/>
        <LineTwo avatarText={'17 Oct 2017'}/>
        <LineThree/>
      </ForgeListItem>
    </ForgeList>
  );
};
