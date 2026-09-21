import{u as r,j as e,M as a,T as s,C as t}from"./blocks-89P17n4a.js";import{C as l}from"./CustomArgTypes-COskihfg.js";import{A as p,D as c}from"./AppLayout.stories-CBlGZ5jH.js";import{MiniDrawer as d}from"./AppLayoutMiniDrawer.stories-CbDw7gQo.js";import{CustomMobileContent as h}from"./AppLayoutCustomMobileContent.stories-BENT3jf_.js";import{MockedApplication as m}from"./AppLayoutMockedApplication.stories-Di1PYsSI.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CnakqzYw.js";import"./iframe-BaLQ_A2d.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CElmhe9Y.js";import"./if-defined-BWD7pjsF.js";import"./service-adapter-DlT-lJx7.js";import"./tyler-icons-DfIaYIv7.js";import"./property-BBtIP4Dp.js";import"./base-lit-element-BOc1ljlO.js";import"./directive-CwRn8Fwj.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./app-layout-DPFnPZ4y.js";import"./state-BHyQhtXL.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./utils-DU-9AqTO.js";import"./app-bar-menu-button-DrBTzQf-.js";import"./class-map-Bpya0c63.js";import"./a11y-utils-CUlOUJ7O.js";import"./dom-utils-D38acdAW.js";import"./base-component-DokdPcmx.js";import"./icon-button-IKvoqhNZ.js";import"./base-button-D-ov5xND.js";import"./query-assigned-elements-43hYArgI.js";import"./focus-indicator-BeZvj0X5.js";import"./state-layer-Y1FZSPuC.js";import"./base-adapter-C2s8cO2K.js";import"./icon-button-constants-wbi3a2tN.js";import"./tooltip-C0ic2qYj.js";import"./overlay-DFZfpbSi.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener--49psJKK.js";import"./dismissible-stack-xq-0Rg1q.js";import"./with-element-internals-BVdcaC_W.js";import"./dialog-CWWGCOKC.js";import"./backdrop-Dvs4MPLP.js";import"./drawer-seV_42ug.js";import"./base-drawer-C3RB7KRX.js";import"./event-utils-zQ4FLDwK.js";import"./mini-drawer-Bw1AxUWG.js";import"./scaffold-D8DtzjhO.js";import"./toolbar-Cijcphd3.js";import"./list-CtFWDf9k.js";import"./list-item-Bra_7jX-.js";import"./badge-DymMcnze.js";import"./button-C5R_qqOK.js";import"./button-constants-Dh8wxsDb.js";import"./card-BdewD5or.js";import"./date-picker-BLOopeVA.js";import"./calendar-DYHmb5gP.js";import"./event-utils-C1SDeUaq.js";import"./popover-BqWv_wJF.js";import"./base-date-picker-core-BV_XSH6u.js";import"./a11y-BxM9_46k.js";import"./text-field-DpRJB-zB.js";import"./base-field-B2hMeS19.js";import"./label-BIsRcMc6.js";import"./button-toggle-group-constants-D7W2mml0.js";import"./checkbox-constants-BwznIeqL.js";import"./switch-constants-CzmANmsv.js";import"./with-label-aware-BdoJiGXC.js";import"./divider-DGwf0Vud.js";import"./select-dropdown-Bb9B8K7M.js";import"./select-ByzXAQSi.js";import"./circular-progress-BL_OHw4o.js";import"./with-form-associated-DMkiEorP.js";import"./linear-progress-VpC6qUWa.js";import"./skeleton-BnMa3F30.js";import"./list-dropdown-aware-core-BezJRemX.js";import"./list-dropdown-DS4nWXyq.js";import"./stack-E4V9OTtJ.js";import"./tab-panel-COnKVwN9.js";import"./consume-Dn26QDt8.js";import"./inline-message-BXrlbIvc.js";function i(o){const n={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:p}),`
`,e.jsx(s,{}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-app-layout>"})," component provides a responsive layout structure for Tyler Cloud applications, featuring an embedded app bar with navigation drawer functionality. This component adapts automatically to different screen sizes, providing an optimal user experience across desktop and mobile devices."]}),`
`,e.jsx(n.p,{children:"The layout includes a built-in app bar with configurable slots and a responsive navigation system that transforms between a persistent side drawer on large screens and a modal drawer on smaller screens."}),`
`,e.jsx(t,{of:c}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-app-layout>"})," component serves as the foundational layout structure for applications, providing both the app bar and navigation framework in a single, cohesive component."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-layout app-title="My Application">
  <!-- App bar content -->
  <img src="/logo.png" alt="Company Logo" slot="app-bar-logo" />
  <forge-button slot="app-bar-end" variant="raised">Action</forge-button>

  <!-- Navigation content -->
  <forge-list slot="navigation">
    <forge-list-item>
      <forge-icon slot="start" name="dashboard"></forge-icon>
      <button type="button">Dashboard</button>
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="start" name="people"></forge-icon>
      <button type="button">Users</button>
    </forge-list-item>
  </forge-list>

  <!-- Main content -->
  <main>
    <h1>Page Content</h1>
    <p>Your application content goes here.</p>
  </main>

  <!-- Footer -->
  <div slot="footer">
    <p>&copy; 2024 Tyler Technologies</p>
  </div>
</forge-app-layout>
`})}),`
`,e.jsx(n.h2,{id:"app-bar-integration",children:"App Bar Integration"}),`
`,e.jsxs(n.p,{children:["The component includes an embedded ",e.jsx(n.code,{children:"<forge-app-bar>"})," with several configurable slots for custom content. The app bar automatically includes a menu button on small screens to control the navigation drawer."]}),`
`,e.jsx(n.h3,{id:"app-bar-slots",children:"App Bar Slots"}),`
`,e.jsx(n.p,{children:"The app bar provides dedicated slots for different types of content:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Logo slot"}),": For company or application branding"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Start slot"}),": For actions at the beginning of the app bar"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Center slot"}),": For centered content like search bars"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"End slot"}),": For actions at the end of the app bar (user profile, settings, etc.)"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-layout app-title="Dashboard">
  <!-- Logo in the app bar -->
  <forge-avatar slot="app-bar-logo" size="small">
    <img src="/company-logo.png" alt="Company" />
  </forge-avatar>

  <!-- Start actions -->
  <forge-button slot="app-bar-start" variant="text">
    <forge-icon name="refresh" slot="start"></forge-icon>
    Refresh
  </forge-button>

  <!-- Center content -->
  <forge-text-field slot="app-bar-center" placeholder="Search...">
    <forge-icon slot="leading" name="search"></forge-icon>
  </forge-text-field>

  <!-- End actions -->
  <forge-user-profile slot="app-bar-end" full-name="John Doe" email="john.doe@example.com"> </forge-user-profile>
</forge-app-layout>
`})}),`
`,e.jsx(n.h2,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,e.jsx(n.p,{children:"The component automatically adapts to screen size using a configurable breakpoint (default: 960px):"}),`
`,e.jsx(n.h3,{id:"large-screens--breakpoint",children:"Large Screens (>= breakpoint)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Navigation appears as a persistent drawer in the body-left area"}),`
`,e.jsxs(n.li,{children:["Can use standard drawer (default) or mini drawer mode via the ",e.jsx(n.code,{children:"use-mini-drawer"})," attribute"]}),`
`,e.jsx(n.li,{children:"Menu button is hidden since navigation is always visible"}),`
`,e.jsx(n.li,{children:"Full scaffold layout with dedicated navigation space"}),`
`,e.jsx(n.li,{children:"Toggle button available to collapse/expand the drawer"}),`
`]}),`
`,e.jsx(n.h3,{id:"small-screens--breakpoint",children:"Small Screens (< breakpoint)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Navigation appears as a modal drawer triggered by the menu button"}),`
`,e.jsx(n.li,{children:"Menu button becomes visible in the app bar start slot"}),`
`,e.jsx(n.li,{children:"Drawer overlays content and can be toggled open/closed"}),`
`,e.jsx(n.li,{children:"Drawer automatically closes when screen size increases"}),`
`,e.jsxs(n.li,{children:["Always uses a modal dialog drawer regardless of ",e.jsx(n.code,{children:"use-mini-drawer"})," setting"]}),`
`]}),`
`,e.jsx(n.h3,{id:"auto-close-on-navigation",children:"Auto-close on Navigation"}),`
`,e.jsxs(n.p,{children:["On small screens, you can automatically close the modal drawer when a user clicks on a navigation item by adding the ",e.jsx(n.code,{children:"data-forge-app-layout-close"})," attribute to any element within the navigation slot. The attribute can be placed on a parent element (like ",e.jsx(n.code,{children:"<forge-list>"}),") to close the drawer on any click within that element:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-layout app-title="My Application">
  <!-- All clicks within this list will close the drawer -->
  <forge-list slot="navigation" navlist data-forge-app-layout-close>
    <forge-list-item>
      <forge-icon slot="start" name="home"></forge-icon>
      <a href="/home">Home</a>
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="start" name="settings"></forge-icon>
      <a href="/settings">Settings</a>
    </forge-list-item>
  </forge-list>
</forge-app-layout>
`})}),`
`,e.jsx(n.p,{children:"For more granular control, you can place the attribute on individual items:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-layout app-title="My Application">
  <forge-list slot="navigation" navlist>
    <!-- These items will close the drawer when clicked -->
    <forge-list-item data-forge-app-layout-close>
      <forge-icon slot="start" name="home"></forge-icon>
      <a href="/home">Home</a>
    </forge-list-item>

    <!-- This item won't close the drawer (e.g., submenu toggle) -->
    <forge-list-item>
      <forge-icon slot="start" name="expand_more"></forge-icon>
      <button type="button">Expand submenu</button>
    </forge-list-item>
  </forge-list>
</forge-app-layout>
`})}),`
`,e.jsxs(n.p,{children:["You can also programmatically close the drawer using the ",e.jsx(n.code,{children:"closeDrawer()"})," method:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`const appLayout = document.querySelector('forge-app-layout');
appLayout.closeDrawer();
`})}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"APP_LAYOUT_CLOSE_ATTRIBUTE"})," constant is exported for use in JavaScript/TypeScript:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`import { APP_LAYOUT_CLOSE_ATTRIBUTE } from '@tylertech/forge/app-layout';

element.setAttribute(APP_LAYOUT_CLOSE_ATTRIBUTE, '');
`})}),`
`,e.jsx(n.h3,{id:"custom-breakpoint",children:"Custom Breakpoint"}),`
`,e.jsxs(n.p,{children:["You can customize the responsive breakpoint by setting the ",e.jsx(n.code,{children:"breakpoint"})," property:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- Use a 1024px breakpoint instead of the default 960px -->
<forge-app-layout app-title="Desktop App" breakpoint="1024">
  <!-- Navigation will switch to drawer mode at 1024px -->
</forge-app-layout>

<!-- Use a smaller 768px breakpoint for tablets -->
<forge-app-layout app-title="Tablet App" breakpoint="768">
  <!-- Navigation switches to drawer mode at 768px -->
</forge-app-layout>
`})}),`
`,e.jsx(n.h3,{id:"custom-content-per-breakpoint",children:"Custom Content Per Breakpoint"}),`
`,e.jsxs(n.p,{children:["You can listen for the ",e.jsx(n.code,{children:"forge-app-layout-breakpoint-change"})," event to render different navigation (or other) content depending on whether the layout is currently in its small or large state:"]}),`
`,e.jsx(t,{of:h}),`
`,e.jsx(n.h2,{id:"navigation-content",children:"Navigation Content"}),`
`,e.jsxs(n.p,{children:["The navigation slot accepts any content but works best with structured navigation elements like ",e.jsx(n.code,{children:"<forge-list>"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-layout app-title="Administration">
  <forge-list slot="navigation" navlist>
    <!-- Dashboard Section -->
    <forge-list-item>
      <forge-icon slot="start" name="dashboard"></forge-icon>
      <a href="/dashboard">Dashboard</a>
    </forge-list-item>

    <!-- Divider -->
    <forge-divider></forge-divider>

    <!-- Users Section -->
    <forge-list-item>
      <forge-icon slot="start" name="people"></forge-icon>
      <a href="/users">Users</a>
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="start" name="admin_panel_settings"></forge-icon>
      <a href="/roles">Roles & Permissions</a>
    </forge-list-item>
  </forge-list>
</forge-app-layout>
`})}),`
`,e.jsx(n.h2,{id:"mini-drawer-mode",children:"Mini Drawer Mode"}),`
`,e.jsx(n.p,{children:"The app-layout component supports using a mini drawer for navigation on large screens. The mini drawer provides a collapsed view that shows only icons, allowing for more content space while maintaining quick access to navigation."}),`
`,e.jsx(n.h3,{id:"using-mini-drawer",children:"Using Mini Drawer"}),`
`,e.jsxs(n.p,{children:["Enable mini drawer mode by setting the ",e.jsx(n.code,{children:"use-mini-drawer"})," attribute:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-layout app-title="My Application" use-mini-drawer>
  <forge-list slot="navigation" navlist>
    <forge-list-item>
      <forge-icon slot="start" name="dashboard"></forge-icon>
      <button type="button">Dashboard</button>
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="start" name="people"></forge-icon>
      <button type="button">Users</button>
    </forge-list-item>
  </forge-list>

  <!-- Main content -->
  <main>Your content here</main>
</forge-app-layout>
`})}),`
`,e.jsxs(n.p,{children:["When enabled, the navigation drawer on large screens will use the ",e.jsx(n.code,{children:"<forge-mini-drawer>"})," component instead of the standard ",e.jsx(n.code,{children:"<forge-drawer>"}),", providing a more compact navigation experience."]}),`
`,e.jsx(t,{of:d}),`
`,e.jsx(n.h3,{id:"hover-expansion",children:"Hover Expansion"}),`
`,e.jsx(n.p,{children:"Enable hover expansion to allow the mini drawer to temporarily expand when the user hovers over it:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-layout app-title="My Application" use-mini-drawer mini-hover>
  <forge-list slot="navigation" navlist>
    <!-- Navigation items -->
  </forge-list>
</forge-app-layout>
`})}),`
`,e.jsxs(n.p,{children:["When ",e.jsx(n.code,{children:"mini-hover"})," is enabled:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The drawer remains collapsed by default, showing only icons"}),`
`,e.jsx(n.li,{children:"Hovering over the drawer temporarily expands it to show full labels"}),`
`,e.jsx(n.li,{children:"The drawer collapses again when the mouse leaves the drawer area"}),`
`,e.jsx(n.li,{children:"This provides a space-efficient navigation option while maintaining easy access to full labels"}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," The mini drawer mode only affects the navigation drawer on large screens (above the breakpoint). On small screens, the navigation will always use a modal drawer regardless of the ",e.jsx(n.code,{children:"use-mini-drawer"})," setting."]}),`
`]}),`
`,e.jsx(n.h2,{id:"layout-slots",children:"Layout Slots"}),`
`,e.jsx(n.p,{children:"Beyond the app bar and navigation, the component provides additional layout slots for content placement:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Default slot"}),": Main content area"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Body slots"}),": ",e.jsx(n.code,{children:"body-header"}),", ",e.jsx(n.code,{children:"body-footer"}),", ",e.jsx(n.code,{children:"body-left"}),", ",e.jsx(n.code,{children:"body-right"})," for additional content areas"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Footer slot"}),": Application footer content"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-layout app-title="Complex Layout">
  <!-- Navigation -->
  <nav slot="navigation">...</nav>

  <!-- Body header -->
  <div slot="body-header">
    <forge-toolbar>
      <h1>Page Title</h1>
      <forge-button slot="end">Action</forge-button>
    </forge-toolbar>
  </div>

  <!-- Main content (default slot) -->
  <main>
    <h2>Primary Content</h2>
    <p>Your main application content.</p>
  </main>

  <!-- Body footer -->
  <div slot="body-footer">
    <forge-pagination></forge-pagination>
  </div>

  <!-- Application footer -->
  <footer slot="footer">
    <p>&copy; 2024 Tyler Technologies. All rights reserved.</p>
  </footer>
</forge-app-layout>
`})}),`
`,e.jsx(n.h2,{id:"full-application-example",children:"Full Application Example"}),`
`,e.jsx(n.p,{children:"A more complete example showing the app-layout composed with cards, tabs, a select, and a date picker to build out a realistic application screen:"}),`
`,e.jsx(t,{of:m}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The embedded menu button includes appropriate focus management and keyboard navigation"}),`
`,e.jsx(n.li,{children:"Navigation drawer follows standard dialog accessibility patterns when in modal mode"}),`
`,e.jsx(n.li,{children:"App bar maintains proper heading structure and landmark roles"}),`
`,e.jsx(n.li,{children:"All slots support proper semantic markup for screen readers"}),`
`,e.jsx(n.li,{children:"Responsive behavior maintains keyboard accessibility across screen sizes"}),`
`]})]})}function He(o={}){const{wrapper:n}={...r(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{He as default};
