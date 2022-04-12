import React, { useEffect, useState } from 'react';
import { Story } from "@storybook/react";
import { IListItemComponent, IconRegistry } from '@tylertech/forge';
import { ForgeAutocomplete, ForgeIcon, ForgeTextField } from "@tylertech/forge-react";
import { INCIDENTS, IIncidentOption } from "../../../mock/mock-options";
import { tylIconAssignment, tylIconSearch } from '@tylertech/tyler-icons/standard';


export interface IAutocompleteSearchFieldProps {
  filterOnFocus: boolean;
}

export const SearchFieldTemplate: Story<IAutocompleteSearchFieldProps> = ({
  filterOnFocus
}) => {  
  const [selected, setSelected] = useState<IIncidentOption>();

  useEffect(() => {
    IconRegistry.define([
      tylIconAssignment,
      tylIconSearch
    ]);
  }, []);

  const filter = (filterText, value) => {
    return INCIDENTS.filter(item  => {
      const number = item.incidentNumber.toLowerCase().includes(filterText.toLowerCase());
      const label = item.label.toLowerCase().includes(filterText.toLowerCase());
      const assignee = item.assignee.toLowerCase().includes(filterText.toLowerCase());
      const primaryPerson = item.primaryPerson.toLowerCase().includes(filterText.toLowerCase());
      const result = !!label
        ? label
        : !!assignee
          ? assignee
            : !!primaryPerson
              ? primaryPerson
              : !!number
                ? number
                : undefined;
      return result;
    });
  };

  const optionBuilder = (option: IIncidentOption, filterText: string, listItem: IListItemComponent) => { 
    listItem.twoLine = !!option.assignee || !!option.primaryPerson;  
    const optionDiv = document.createElement('div');
    optionDiv.style.display = 'flex';
    optionDiv.style.flexDirection = 'row';
    
    const iconEl = document.createElement('forge-icon');
    iconEl.name = 'assignment';
    iconEl.style.paddingRight = '16px';
    optionDiv.appendChild(iconEl);  

    const textContainerDiv = document.createElement('div');
    textContainerDiv.style.flex = '1 1 0.0001px';
    textContainerDiv.style.minWidth = '0';
    optionDiv.appendChild(textContainerDiv);  

    const labelDiv = document.createElement('div');
    labelDiv.classList.add('forge-typography--body1');
    labelDiv.textContent = `Incident ${option.incidentNumber}: ${option.label}`;
    textContainerDiv.appendChild(labelDiv);

    if (option.assignee && option.assignee.toLowerCase().includes(filterText.toLowerCase())) {
      const assigneeDiv = document.createElement('div');
      assigneeDiv.classList.add('forge-typography--subtitle2');
      assigneeDiv.style.whiteSpace = 'nowrap';
      assigneeDiv.style.textOverflow = 'ellipsis';
      assigneeDiv.style.overflow = 'hidden';
      assigneeDiv.textContent = `Assignee: ${option.assignee}`;
      textContainerDiv.appendChild(assigneeDiv);
    }  
    if (option.primaryPerson && option.primaryPerson.toLowerCase().includes(filterText.toLowerCase())) {
      const primaryPersonDiv = document.createElement('div');
      primaryPersonDiv.classList.add('forge-typography--subtitle2');
      primaryPersonDiv.style.whiteSpace = 'nowrap';
      primaryPersonDiv.style.textOverflow = 'ellipsis';
      primaryPersonDiv.style.overflow = 'hidden';
      primaryPersonDiv.textContent = `Primary person: ${option.primaryPerson}`;
      textContainerDiv.appendChild(primaryPersonDiv);
    }

    return optionDiv;
  }

  return (
    <ForgeAutocomplete
      filterOnFocus={filterOnFocus}
      filter={filter}
      mode="stateless"
      optionBuilder={optionBuilder}
      on-forge-autocomplete-select={evt => setSelected(evt.detail.value)}
      style={{width: '600px'}}>
      <ForgeTextField>
        <input type="text" id="incident" />
        <label htmlFor="incident">Search for incidents</label>
        <ForgeIcon slot="trailing" name="search" />
      </ForgeTextField>
    </ForgeAutocomplete>
  );
};