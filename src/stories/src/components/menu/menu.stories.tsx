import React from 'react';
import { Meta, Story } from '@storybook/react';
import { IMenuProps, argTypes } from './menu-args';
import { ForgeButton, ForgeMenu, useForgeToast } from '@tylertech/forge-react';
import { IMenuOption, IMenuComponent, IMenuSelectEventData, ToastComponent } from '@tylertech/forge';

const MDX = require('./menu.mdx').default;

export default {
  title: 'Components/Menu',
  argTypes,
  parameters: {
    docs: {
      page: MDX
    }
  }
} as Meta;

export const Default: Story<IMenuProps> = ({
  open = false,
  placement = 'bottom-start',
  dense = false,
  persistSelection = false,
  mode = 'click'
}) => {
  // const [showToast] = useForgeToast();

  function onSelect({ detail }: CustomEvent<IMenuSelectEventData>): void {
    ToastComponent.present({ message: `Selected value: ${detail.value}` });
  }

  return (
    <ForgeMenu
      open={open}
      placement={placement}
      dense={dense}
      persistSelection={persistSelection}
      options={mode === 'click' ? SIMPLE_OPTIONS : CASCADING_OPTIONS}
      on-forge-menu-select={onSelect}>
      <ForgeButton variant="raised">Show menu</ForgeButton>
    </ForgeMenu>
  );
};
Default.args = {
  mode: 'click',
  open: false,
  placement: 'bottom-start',
  dense: false,
  persistSelection: false
} as IMenuProps;

const SIMPLE_OPTIONS: IMenuOption[] = [
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
  { value: 'view', label: 'View' }
];

const CASCADING_OPTIONS: IMenuOption[] = [
  { value: 'edit', label: 'Edit' },
  { 
    value: 'save', 
    label: 'Save', 
    options: [
      { value: 'as-draft', label: 'As draft' },
      { value: 'as-copy', label: 'As copy' },
    ]
  },
  { value: 'delete', label: 'Delete' },
  {
    value: 'view',
    label: 'View',
    options: [
      {
        value: 'appearance',
        label: 'Appearance',
        options: [
          { value: 'full-screen', label: 'Full screen' },
          { value: 'centered', label: 'Centered' },
          { value: 'minimized', label: 'Minimized' }
        ]
      },
      {
        value: 'layout',
        label: 'Layout',
        options: [
          { value: 'vertical', label: 'Vertical' },
          { value: 'horizontal', label: 'Horizontal' }
        ]
      },
      { value: '', label: '', divider: true },
      {
        value: 'output',
        label: 'Output'
      },
      {
        value: 'errors',
        label: 'Errors'
      }
    ]
  }
];
