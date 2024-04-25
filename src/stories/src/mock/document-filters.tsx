import React, { FC } from 'react';
import { ForgeButton, ForgeDateRangePicker, ForgeDivider, ForgeExpansionPanel, ForgeList, ForgeListItem, ForgeSlider, ForgeTextField } from "@tylertech/forge-react";
import { ListFilter, IListItemFilter } from "../components/shared/sidesheet-filter";

export const DOCUMENT_LIST_ITEM_FILTERS: Record<string, IListItemFilter[]> = {
  documentTypes: [
    {
      checked: false,
      label: 'AP Checks',
      count: 246
    },
    {
      checked: false,
      label: 'AP Invoices',
      count: 112
    },
    {
      checked: false,
      label: 'Contracts',
      count: 36
    },
    {
      checked: false,
      label: 'Purchase Orders',
      count: 143
    },
    {
      checked: false,
      label: 'Returns',
      count: 12
    },
  ],
  documentAssignees: [
    {
      checked: false,
      label: 'Shantel123',
      count: 24
    },
    {
      checked: false,
      label: 'Jackson456',
      count: 108
    },
    {
      checked: false,
      label: 'Anita789',
      count: 89
    },
    {
      checked: false,
      label: 'Sergey147',
      count: 243
    },
    {
      checked: false,
      label: 'George369',
      count: 58
    },
  ],
  documentStatuses: [
    {
      checked: false,
      label: 'In progress',
      count: 24
    },
    {
      checked: false,
      label: 'Judge review',
      count: 108
    },
    {
      checked: false,
      label: 'Archived',
      count: 89
    },
    {
      checked: false,
      label: 'Clerk review',
      count: 243
    },
    {
      checked: false,
      label: 'Unknown',
      count: 58
    },
  ],
};

export const DOCUMENT_SLIDER_RANGE_FILTERS: Record<string, {min: number, max: number, value: number}> = {
  documentPrice: {
    min: 0,
    max: 500,
    value: 0,
  },
};


const DocumentPrice: FC = () => {
  const documentPrice = DOCUMENT_SLIDER_RANGE_FILTERS.documentPrice;
  return (
    <ForgeExpansionPanel open={true}>
      <ForgeListItem slot="header">
        Document price
        <ForgeButton>
          <button>Clear</button>
        </ForgeButton>
      </ForgeListItem>
      <div style={{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        padding: '0 16px',
      }}>
        <div style={{padding: '0 16px 0 0'}}>${documentPrice.min}</div>
        <ForgeSlider 
        style={{flex: '1 1 0.0001px'}}
        value={documentPrice.value} 
        min={documentPrice.min} 
        max={documentPrice.max}></ForgeSlider>
        <div style={{padding: '0 0 0 16px'}}>${documentPrice.max}</div>
      </div>
    </ForgeExpansionPanel>
  )
};

export const DocumentPublished: FC = () => (
  <div style={{padding: '16px'}}>
    <ForgeDateRangePicker>
      <ForgeTextField>
        <label htmlFor="input-date-range-picker-01">Document published</label>
        <input type="text" id="input-date-range-picker-01" autoComplete="off" placeholder="mm/dd/yyyy" />
        <input type="text" id="input-date-range-picker-02" autoComplete="off" placeholder="mm/dd/yyyy" />
      </ForgeTextField>
    </ForgeDateRangePicker>
  </div>
);

export const DocumentListFilters: FC = () => (
  <ForgeList>        
    <ListFilter groupId="document-type" label="Document type" filters={DOCUMENT_LIST_ITEM_FILTERS.documentTypes} open={true}/>
    <ForgeDivider/>
    <DocumentPrice/>
    <ForgeDivider/>
    <DocumentPublished/>
    <ForgeDivider/>
    <ListFilter groupId="document-assignee" label="Document assignee" filters={DOCUMENT_LIST_ITEM_FILTERS.documentAssignees} open={true}/>
    <ForgeDivider/>
    <ListFilter groupId="document-status" label="Document status" filters={DOCUMENT_LIST_ITEM_FILTERS.documentStatuses} open={true}/>
  </ForgeList>
);