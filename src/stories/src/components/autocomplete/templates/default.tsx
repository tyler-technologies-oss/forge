import React from 'react';
import { Story } from "@storybook/react";
import { ForgeAutocomplete, ForgeTextField, ForgeIconButton } from "@tylertech/forge-react";
import { US_STATES } from "../../../mock/mock-options";
import { IAutocompleteProps } from "../autocomplete-args";
import { IconRegistry } from '@tylertech/forge';
import { tylIconClose, tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';

export const DefaultTemplate: Story<IAutocompleteProps> = ({
  allowUnmatched = false,
  debounce = 500,
  filterOnFocus = true,
  mode = 'default',
  multiple = false,
  observeScrollThreshold = 0,
  optionLimit = 0,
}) => {
  IconRegistry.define([
    tylIconClose,
    tylIconArrowDropDown
  ]);

  const autocompleteProps = {
    allowUnmatched,
    debounce,
    filterOnFocus,
    mode,
    multiple,
    observeScrollThreshold,
    optionLimit,
    filter: (filterText, value) => {
      return US_STATES.filter(item  => item.label.toLowerCase().includes(filterText.toLowerCase()));
    },
  }
  return (
    <ForgeAutocomplete {...autocompleteProps} style={{width: '600px'}}>
      <ForgeTextField>
        <input type="text" id="state" />
        <label htmlFor="state">Choose state</label>
        <ForgeIconButton dense slot="trailing">
          <button type="button" data-forge-autocomplete-clear aria-label="Clear the selection">
            <forge-icon name="close"></forge-icon>
          </button>
        </ForgeIconButton>
        <forge-icon slot="trailing" data-forge-dropdown-icon name="arrow_drop_down"></forge-icon>
      </ForgeTextField>
    </ForgeAutocomplete>
  );
};
