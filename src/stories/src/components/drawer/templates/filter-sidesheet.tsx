import React, { CSSProperties, FC } from "react";
import { Story } from "@storybook/react";
import { IDrawerProps } from "../drawer-args";
import { ForgeDrawer, ForgeIconButton, ForgeList, ForgeToolbar } from "@tylertech/forge-react";
import { DocumentListFilters } from "../../../mock/document-filters";

export const FilterSidesheetTemplate: Story<IDrawerProps> = props => {
  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  };
  const viewStyles: CSSProperties = {
    display: 'flex',
    flex: '1 1 0.0001px',
    flexDirection: 'column',
  };
  const FiltersToolbar: FC = () => (
    <ForgeToolbar>
      <div slot="start">Filters</div>
      <ForgeIconButton slot="end">
        <button 
        onClick={() => {}} 
        type="button" 
        aria-label="Close filters" 
        className="tyler-icons">close</button>
      </ForgeIconButton>
    </ForgeToolbar>
  );
  return (
    <div style={containerStyles}>
      <ForgeDrawer {...props}>
        <FiltersToolbar/>
        <ForgeList>        
          <DocumentListFilters/>
        </ForgeList>
      </ForgeDrawer>
      <div style={viewStyles}>
        {/* List of results */}
      </div>
    </div>
  );
};
