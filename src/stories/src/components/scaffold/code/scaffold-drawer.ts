export const ScaffoldDrawerHtml = () => `
<forge-drawer>
  <forge-scaffold>
    <forge-toolbar slot="header" style="--forge-toolbar-padding: 0">
      <forge-list slot="center" style="width: 100%">
        <forge-list-item>
          <i slot="leading" className="tyler-icons">
            home
          </i>
          Scaffold beader
        </forge-list-item>
      </forge-list>
    </forge-toolbar>
    <forge-list slot="body">
      <forge-list-item selected="true">
        <i className="tyler-icons" slot="leading">
          add
        </i>
        Scaffold body
      <forge-list-item>
      <forge-list-item selected="true">
        <i className="tyler-icons" slot="leading">
          search
        </i>
        Scaffold body
      <forge-list-item>
      <forge-list-item selected="true">
        <i className="tyler-icons" slot="leading">
          settings
        </i>
        Scaffold body
      <forge-list-item>
    </forge-list>
    <forge-divider></forge-divider>
    <forge-list slot="footer">
      <forge-list-item>
        <i className="tyler-icons" slot="leading">
          help
        </i>
        Scaffold footer
      </forge-list-item>
    </forge-list>
  </forge-scaffold>
</forge-drawer>
`;

export const ScaffoldDrawerBlazor = () => `
<ForgeDrawer>
  <ForgeScaffold>
    <ForgeToolbar slot="header" style="--forge-toolbar-padding: 0">
      <ForgeList slot="center" style="width: 100%">
        <ForgeListItem>
          <i slot="leading" className="tyler-icons">
            home
          </i>
          Scaffold beader
        </ForgeListItem>
      </ForgeList>
    </ForgeToolbar>
    <ForgeList slot="body">
      <ForgeListItem selected="true">
        <i className="tyler-icons" slot="leading">
          add
        </i>
        Scaffold body
      <ForgeListItem>
      <ForgeListItem selected="true">
        <i className="tyler-icons" slot="leading">
          search
        </i>
        Scaffold body
      <ForgeListItem>
      <ForgeListItem selected="true">
        <i className="tyler-icons" slot="leading">
          settings
        </i>
        Scaffold body
      <ForgeListItem>
    </ForgeList>
    <ForgeDivider></ForgeDivider>
    <ForgeList slot="footer">
      <ForgeListItem>
        <i className="tyler-icons" slot="leading">
          help
        </i>
        Scaffold footer
      </ForgeListItem>
    </ForgeList>
  </ForgeScaffold>
</ForgeDrawer>
`;