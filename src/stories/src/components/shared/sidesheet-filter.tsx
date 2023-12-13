import { ForgeButton, ForgeCheckbox, ForgeExpansionPanel, ForgeListItem, ForgeOpenIcon } from "@tylertech/forge-react";
import React, { ChangeEvent, FC, useState } from "react";

export interface IListItemFilter {
  checked: boolean;
  label: string;
  count: number;
}

export const ListItemFilter: FC<{filter: IListItemFilter, id: string}> = ({filter, id}) => (
  <ForgeListItem>
    <ForgeCheckbox slot="leading">
      <input 
      id={`${id}`}
      checked={filter.checked} 
      onChange={(evt: ChangeEvent<HTMLInputElement>) => filter.checked = evt.target.checked} 
      type="checkbox" 
      aria-label={`apply filter ${filter.label}`}/>
    </ForgeCheckbox>
      
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div style={{flex: '1 1 0.0001px'}}>{filter.label}</div>
      <div>{filter.count}</div>
    </div>
  </ForgeListItem>
);

export interface IListFilterProps {
  filters: IListItemFilter[];
  label: string;
  open: boolean; 
  groupId: string;
}

export const ListFilter: FC<IListFilterProps> = ({filters, label, open, groupId}) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <ForgeExpansionPanel open={open} openCallback={evt => console.log(evt)}>
      <ForgeListItem slot="header" static={true}>
        <div onClick={() => setIsOpen(!isOpen)}>{label}</div>
        <ForgeButton slot="trailing" onClick={evt => {
            console.log('clear');
            filters.map(f => f.checked = false);
          }}>Clear</ForgeButton>
        <ForgeOpenIcon slot="trailing"/>
      </ForgeListItem>
      { filters.map( (f, i) => (<ListItemFilter key={i} filter={f} id={`${groupId}-${i}`}/>))}
    </ForgeExpansionPanel>
  )
};