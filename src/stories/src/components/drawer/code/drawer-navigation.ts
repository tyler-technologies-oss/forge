export const DrawerNavigationCodeHtml = () => `
<div style="display: flex; display: row; height: 100%; width: 100%;">
  <forge-drawer>
    <forge-list>
      <forge-list-item>
        <i class="tyler-icons" slot="leading">home</i>
        Home
      </forge-list-item>
      <forge-list-item>
        <i class="tyler-icons" slot="leading">person</i>
        Profile
      </forge-list-item>
      <forge-divider></forge-divider>
      <h2 class="forge-list-group__subheader">Employee information</h2>
      <forge-list-item>
        <i class="tyler-icons" slot="leading">local_airport</i>
        Time off
      </forge-list-item>
      <forge-list-item>
        <i class="tyler-icons" slot="leading">cash_usd</i>
        Pay & tax
      </forge-list-item>
      <forge-list-item>
        <i class="tyler-icons" slot="leading">assignment_turned_in</i>
        Tasks & documents
      </forge-list-item>
      <forge-list-item>
        <i class="tyler-icons" slot="leading">calendar_clock</i>
        Time entry
      </forge-list-item>
      <forge-list-item>
        <i class="tyler-icons" slot="leading">chart_bar</i>
        Benefits
      </forge-list-item>
    </forge-list>
  </forge-drawer>
  <div>
    <!-- Page content -->
  </div>
</div>
`;