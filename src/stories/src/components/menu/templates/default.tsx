import { Story } from '@storybook/react';
import { ForgeButton, ForgeMenu, useForgeToast } from '@tylertech/forge-react';
import React from 'react';
import { IMenuOption, IMenuComponent, IMenuSelectEventData } from '@tylertech/forge';
import { IMenuProps } from '../menu-args';

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

export const DefaultTemplate: Story<IMenuProps> = ({
  open = false,
  placement = 'bottom-start',
  dense = false,
  persistSelection = false,
  mode = 'click',
}) => {
  const [showToast] = useForgeToast();
  const menuProps: Partial<IMenuComponent> = {
    open,
    placement,
    dense,
    persistSelection,
    options: mode === 'click' ? SIMPLE_OPTIONS : CASCADING_OPTIONS
  };

  function onSelect({ detail }: CustomEvent<IMenuSelectEventData>): void {
    showToast({ message: `Selected value: ${detail.value}` });
  }

  return (
    <ForgeMenu {...menuProps} on-forge-menu-select={onSelect}>
      <ForgeButton type="raised">
        <button type="button">Show menu</button>
      </ForgeButton>
    </ForgeMenu>
  );
};
