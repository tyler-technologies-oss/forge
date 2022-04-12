export const DrawerFilterSidesheetCodeHtml = () => `
<div style="display: flex; display: row; height: 100%; width: 100%;">
  <forge-drawer>
    <forge-toolbar>
      <div slot="start">Filters</div>
      <forge-icon-button slot="end">
        <button type="button" aria-label="Close filters" class="tyler-icons">close</button>
      </forge-icon-button>
    </forge-toolbar>
    <forge-list>
      <forge-expansion-panel>
        <forge-list-item slot="header" static>
          <div>Document type</div>
          <forge-button slot="trailing">
            <button>Clear</button>
          </forge-button>
          <forge-open-icon slot="trailing"></forge-open-icon>
        </forge-list-item>
        <forge-list-item>
          <forge-checkbox slot="leading">
            <input
              type="checkbox" 
              aria-label="apply filter AP checks"/>
          </forge-checkbox>          
          <div style="display: flex; flex-direction: row">
            <div style="flex: 1 1 0.0001px">AP Checks</div>
            <div>246</div>
          </div>
        </forge-list-item>
        <forge-list-item>
          <forge-checkbox slot="leading">
            <input
              type="checkbox" 
              aria-label="apply filter AP invoices"/>
          </forge-checkbox>          
          <div style="display: flex; flex-direction: row">
            <div style="flex: 1 1 0.0001px">AP invoices</div>
            <div>112</div>
          </div>
        </forge-list-item>
        <forge-list-item>
          <forge-checkbox slot="leading">
            <input
              type="checkbox" 
              aria-label="apply filter contracts"/>
          </forge-checkbox>          
          <div style="display: flex; flex-direction: row">
            <div style="flex: 1 1 0.0001px">Contracts</div>
            <div>36</div>
          </div>
        </forge-list-item>
        <forge-list-item>
          <forge-checkbox slot="leading">
            <input
              type="checkbox" 
              aria-label="apply filter purchase orders"/>
          </forge-checkbox>          
          <div style="display: flex; flex-direction: row">
            <div style="flex: 1 1 0.0001px">Purchase Orders</div>
            <div>143</div>
          </div>
        </forge-list-item>
        <forge-list-item>
          <forge-checkbox slot="leading">
            <input
              type="checkbox" 
              aria-label="apply filter returns"/>
          </forge-checkbox>          
          <div style="display: flex; flex-direction: row">
            <div style="flex: 1 1 0.0001px">Returns</div>
            <div>12</div>
          </div>
        </forge-list-item>
      </forge-expansion-panel>
      <forge-divider></forge-divider>
      <forge-expansion-panel open="true">
        <forge-list-item slot="header">
          Document price
          <forge-button>
            <button>Clear</button>
          </forge-button>
        </forge-list-item>
        <div style="display: flex; flex-direction: row; align-items: center; padding: 0 16px">
          <div style="padding: 0 16px 0 0">0</div>
          <forge-slider 
            style="flex: 1 1 0.0001px" 
            min="0" 
            max="500"></forge-slider>
          <div style="padding: 0 0 0 16px">500</div>
        </div>
      </forge-expansion-panel>
      <forge-divider></forge-divider>
      <div style={{padding: '16px'}}>
        <forge-date-range-picker>
          <forge-text-field>
            <input type="text" id="input-date-range-picker-01" autoComplete="off" placeholder="mm/dd/yyyy" />
            <input type="text" id="input-date-range-picker-02" autoComplete="off" placeholder="mm/dd/yyyy" />
            <label for="input-date-range-picker-01">Document published</label>
          </forge-text-field>
        </forge-date-range-picker>
      </div>
      <forge-divider></forge-divider>
      <!-- etc... document assignee and document status are the same as document type html -->
    </forge-list>
  </forge-drawer>
  <div>
    <!-- List of results -->
  </div>
</div>
`;