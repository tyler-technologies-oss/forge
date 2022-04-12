import React from 'react';
import { Story } from "@storybook/react";
import { ForgeButton, ForgeMenu } from "@tylertech/forge-react";
import { IButtonMenuProps } from "../button-args";
import { IListItemComponent, IMenuOption } from '@tylertech/forge';

export const MenuTemplate: Story<IButtonMenuProps> = props => {
  const menuProps = {
    options: [
      { value: 'edit', label: 'Edit' },
      { value: 'delete', label: 'Delete' },
      { value: 'view', label: 'View' }
    ],
    dense: props.type.split('-')[1] == 'dense',
    optionBuilder: (option: IMenuOption, listItem: IListItemComponent) => {
      if (props.hasLeadingIcon) {
        const iconEl = document.createElement('i');
        iconEl.slot = 'leading';
        iconEl.classList.add('tyler-icons');
        iconEl.setAttribute('aria-hidden', 'true');
        iconEl.textContent = 'assignment';
        listItem.appendChild(iconEl);  
      }
      const labelDiv = document.createElement('div');
      labelDiv.classList.add('forge-typography--body1');
      labelDiv.style.width = "140px";
      labelDiv.textContent = option.label !== undefined ? option.label : '';
      listItem.appendChild(labelDiv);   
      if (props.hasTrailingIcon) {
        const iconEl = document.createElement('i');
        iconEl.slot = "trailing";
        iconEl.classList.add('tyler-icons');
        iconEl.setAttribute('aria-hidden', 'true');
        iconEl.textContent = 'assignment';
        listItem.appendChild(iconEl);  
      } 
    },
    persistSelection: props.persistSelection,
  };

  return (
    <ForgeMenu {...menuProps}>
      <ForgeButton type={props.type}>
        <button>
          Open menu
        </button>
      </ForgeButton>
    </ForgeMenu>
  );
};
