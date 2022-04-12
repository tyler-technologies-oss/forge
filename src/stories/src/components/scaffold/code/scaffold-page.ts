export const ScaffoldPageHtml = () => `
<forge-scaffold>
  <forge-app-bar title-text="Scaffold Header" slot="header"></forge-app-bar>
  <forge-banner can-dismiss="true" slot="header">
    <i class="tyler-icons" slot="icon">add_alert</i>
    <div>Scaffold header.</div>
    <forge-button type="outlined" slot="button">
        <button type="button" style="background-color: #ffffff">Learn more...</button>
    </forge-button>
  </forge-banner>
  <forge-toolbar slot="body-header">
    <h1 slot="start" class="forge-typography--title">Scaffold body header</h1>
  </forge-toolbar>
  <div slot="left">
    <forge-drawer>
      <forge-toolbar slot="header" style="--forge-toolbar-padding: 0;">
        <forge-list slot="center" style="width: 100%;">
          <forge-list-item>
            <i slot="leading" class="tyler-icons">home</i>
            Scaffold body left
          </forge-list-item>
        </forge-list>
      </forge-toolbar>
      <forge-list>
        <forge-list-item selected="true">
          <i class="tyler-icons" slot="leading">add</i>
          Scaffold body left
        </forge-list-item>
        <forge-list-item>
          <i class="tyler-icons" slot="leading">search</i>
          Scaffold body left
        </forge-list-item>
        <forge-list-item>
          <i class="tyler-icons" slot="leading">settings</i>
          Scaffold body left
        </forge-list-item>
      </forge-list>
    </forge-drawer>
  </div>
  <div slot="body" style="padding-left: 16px;">
    <h1 class="forge-typography--body1">Scaffold body</h1>
  </div>
  <div slot="right">
    <forge-drawer direction="right">
      <forge-toolbar>
        <div slot="start">Scaffold body right</div>
        <forge-icon-button slot="end">
          <button 
          onClick={() => {" 
          type="button" 
          aria-label="Close filters" 
          class="tyler-icons">close</button>
        </forge-icon-button>
      </forge-toolbar>
      <forge-list>
        <forge-list-item slot="header" static="true">
          Scaffold body right
        </forge-list-item>
        <forge-list-item slot="header" static="true">
          Scaffold body right
        </forge-list-item>
        <forge-list-item slot="header" static="true">
          Scaffold body right
        </forge-list-item>
      </forge-list>
    </forge-drawer>
  </div>
  <div slot="body-footer">
    <forge-divider></forge-divder>
    <forge-toolbar>
      <h3 slot="start" class="forge-typography--subtitle1">
        Scaffold body footer
      </h3>
    </forge-toolbar>
  </div>
  <div slot="footer">
    <forge-footer>
      <forge-footer-item>Scaffold footer</forge-footer-item>
      <forge-footer-item>Scaffold footer</forge-footer-item>
      <forge-footer-item>City of Pasadena</forge-footer-item>
      <forge-footer-item>
        <a href="#" style="color: #ffffff">Contact</a>
      </forge-footer-item>
      <forge-footer-item>
        <a href="#" style="color: #ffffff">Terms of use</a>
      </forge-footer-item>
      <forge-footer-item>
        <a href="#" style="color: #ffffff">Privacy policy</a>
      </forge-footer-item>
      <forge-footer-item>&copy; 2021</forge-footer-item>
    </forge-footer>
  </div>
</forge-scaffold>
`;


