import React from 'react';
import { Meta } from '@storybook/react';
import { Story } from '@storybook/react';
import { IconRegistry } from '@tylertech/forge';
import { ForgeAutocomplete, ForgeTextField, ForgeIconButton } from '@tylertech/forge-react';
import { tylIconClose, tylIconArrowDropDown } from '@tylertech/tyler-icons/standard';
import { argTypes, IAutocompleteProps } from './autocomplete-args';
import { US_STATES } from '../../mock/mock-options';

const MDX = require('./autocomplete.mdx').default;

export default {
  title: 'Components/Autocomplete',
  argTypes,
  parameters: { 
    docs: { 
      page: MDX
    },
  },
} as Meta;

export const Default: Story<IAutocompleteProps> = ({
  allowUnmatched = false,
  debounce = 500,
  filterOnFocus = true,
  filterFocusFirst = true,
  mode = 'default',
  multiple = false,
  observeScrollThreshold = 0,
  optionLimit = 0,
}) => {
  IconRegistry.define([tylIconClose, tylIconArrowDropDown]);

  return (
    <ForgeAutocomplete
      allowUnmatched={allowUnmatched}
      debounce={debounce}
      filterOnFocus={filterOnFocus}
      filterFocusFirst={filterFocusFirst}
      mode={mode}
      multiple={multiple}
      observeScrollThreshold={observeScrollThreshold}
      optionLimit={optionLimit}
      filter={(filterText, value) => {
        return US_STATES.filter(item  => item.label.toLowerCase().includes(filterText.toLowerCase()));
      }}
     style={{width: '600px'}}>
      <ForgeTextField>
        <label htmlFor="state">Choose state</label>
        <input type="text" id="state" />
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
Default.args = {
  allowUnmatched: false,
  debounce: 500,
  filterOnFocus: true,
  filterFocusFirst: true,
  mode: 'default',
  multiple: false,
  observeScroll: false,
  observeScrollThreshold: 0,
  optionLimit: 0,
} as IAutocompleteProps;
