import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Bcs6hT4V.js";import{n as c,t as l}from"./CustomArgTypes-3XqZyV8V.js";import{n as u,r as d,t as f}from"./AppLayout.stories-VpeBjcrJ.js";import{n as p,r as m}from"./AppLayoutMiniDrawer.stories-CiVa3lJn.js";import{n as h,r as g}from"./AppLayoutCustomMobileContent.stories-AyEEim9X.js";import{n as _,r as v}from"./AppLayoutMockedApplication.stories-DskeV2XP.js";function y(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:f}),`
`,(0,x.jsx)(o,{}),`
`,(0,x.jsxs)(n.p,{children:[`The `,(0,x.jsx)(n.code,{children:`<forge-app-layout>`}),` component provides a responsive layout structure for Tyler Cloud applications, featuring an embedded app bar with navigation drawer functionality. This component adapts automatically to different screen sizes, providing an optimal user experience across desktop and mobile devices.`]}),`
`,(0,x.jsx)(n.p,{children:`The layout includes a built-in app bar with configurable slots and a responsive navigation system that transforms between a persistent side drawer on large screens and a modal drawer on smaller screens.`}),`
`,(0,x.jsx)(a,{of:u}),`
`,(0,x.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,x.jsxs)(n.p,{children:[`The `,(0,x.jsx)(n.code,{children:`<forge-app-layout>`}),` component serves as the foundational layout structure for applications, providing both the app bar and navigation framework in a single, cohesive component.`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-layout app-title="My Application">
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
`,(0,x.jsx)(n.h2,{id:`app-bar-integration`,children:`App Bar Integration`}),`
`,(0,x.jsxs)(n.p,{children:[`The component includes an embedded `,(0,x.jsx)(n.code,{children:`<forge-app-bar>`}),` with several configurable slots for custom content. The app bar automatically includes a menu button on small screens to control the navigation drawer.`]}),`
`,(0,x.jsx)(n.h3,{id:`app-bar-slots`,children:`App Bar Slots`}),`
`,(0,x.jsx)(n.p,{children:`The app bar provides dedicated slots for different types of content:`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.strong,{children:`Logo slot`}),`: For company or application branding`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.strong,{children:`Start slot`}),`: For actions at the beginning of the app bar`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.strong,{children:`Center slot`}),`: For centered content like search bars`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.strong,{children:`End slot`}),`: For actions at the end of the app bar (user profile, settings, etc.)`]}),`
`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-layout app-title="Dashboard">
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
`,(0,x.jsx)(n.h2,{id:`responsive-behavior`,children:`Responsive Behavior`}),`
`,(0,x.jsx)(n.p,{children:`The component automatically adapts to screen size using a configurable breakpoint (default: 960px):`}),`
`,(0,x.jsx)(n.h3,{id:`large-screens--breakpoint`,children:`Large Screens (>= breakpoint)`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsx)(n.li,{children:`Navigation appears as a persistent drawer in the body-left area`}),`
`,(0,x.jsxs)(n.li,{children:[`Can use standard drawer (default) or mini drawer mode via the `,(0,x.jsx)(n.code,{children:`use-mini-drawer`}),` attribute`]}),`
`,(0,x.jsx)(n.li,{children:`Menu button is hidden since navigation is always visible`}),`
`,(0,x.jsx)(n.li,{children:`Full scaffold layout with dedicated navigation space`}),`
`,(0,x.jsx)(n.li,{children:`Toggle button available to collapse/expand the drawer`}),`
`]}),`
`,(0,x.jsx)(n.h3,{id:`small-screens--breakpoint`,children:`Small Screens (< breakpoint)`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsx)(n.li,{children:`Navigation appears as a modal drawer triggered by the menu button`}),`
`,(0,x.jsx)(n.li,{children:`Menu button becomes visible in the app bar start slot`}),`
`,(0,x.jsx)(n.li,{children:`Drawer overlays content and can be toggled open/closed`}),`
`,(0,x.jsx)(n.li,{children:`Drawer automatically closes when screen size increases`}),`
`,(0,x.jsxs)(n.li,{children:[`Always uses a modal dialog drawer regardless of `,(0,x.jsx)(n.code,{children:`use-mini-drawer`}),` setting`]}),`
`]}),`
`,(0,x.jsx)(n.h3,{id:`auto-close-on-navigation`,children:`Auto-close on Navigation`}),`
`,(0,x.jsxs)(n.p,{children:[`On small screens, you can automatically close the modal drawer when a user clicks on a navigation item by adding the `,(0,x.jsx)(n.code,{children:`data-forge-app-layout-close`}),` attribute to any element within the navigation slot. The attribute can be placed on a parent element (like `,(0,x.jsx)(n.code,{children:`<forge-list>`}),`) to close the drawer on any click within that element:`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-layout app-title="My Application">
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
`,(0,x.jsx)(n.p,{children:`For more granular control, you can place the attribute on individual items:`}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-layout app-title="My Application">
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
`,(0,x.jsxs)(n.p,{children:[`You can also programmatically close the drawer using the `,(0,x.jsx)(n.code,{children:`closeDrawer()`}),` method:`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-javascript`,children:`const appLayout = document.querySelector('forge-app-layout');
appLayout.closeDrawer();
`})}),`
`,(0,x.jsxs)(n.p,{children:[`The `,(0,x.jsx)(n.code,{children:`APP_LAYOUT_CLOSE_ATTRIBUTE`}),` constant is exported for use in JavaScript/TypeScript:`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-typescript`,children:`import { APP_LAYOUT_CLOSE_ATTRIBUTE } from '@tylertech/forge/app-layout';

element.setAttribute(APP_LAYOUT_CLOSE_ATTRIBUTE, '');
`})}),`
`,(0,x.jsx)(n.h3,{id:`custom-breakpoint`,children:`Custom Breakpoint`}),`
`,(0,x.jsxs)(n.p,{children:[`You can customize the responsive breakpoint by setting the `,(0,x.jsx)(n.code,{children:`breakpoint`}),` property:`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<!-- Use a 1024px breakpoint instead of the default 960px -->
<forge-app-layout app-title="Desktop App" breakpoint="1024">
  <!-- Navigation will switch to drawer mode at 1024px -->
</forge-app-layout>

<!-- Use a smaller 768px breakpoint for tablets -->
<forge-app-layout app-title="Tablet App" breakpoint="768">
  <!-- Navigation switches to drawer mode at 768px -->
</forge-app-layout>
`})}),`
`,(0,x.jsx)(n.h3,{id:`custom-content-per-breakpoint`,children:`Custom Content Per Breakpoint`}),`
`,(0,x.jsxs)(n.p,{children:[`You can listen for the `,(0,x.jsx)(n.code,{children:`forge-app-layout-breakpoint-change`}),` event to render different navigation (or other) content depending on whether the layout is currently in its small or large state:`]}),`
`,(0,x.jsx)(a,{of:h}),`
`,(0,x.jsx)(n.h2,{id:`navigation-content`,children:`Navigation Content`}),`
`,(0,x.jsxs)(n.p,{children:[`The navigation slot accepts any content but works best with structured navigation elements like `,(0,x.jsx)(n.code,{children:`<forge-list>`}),`:`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-layout app-title="Administration">
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
`,(0,x.jsx)(n.h2,{id:`mini-drawer-mode`,children:`Mini Drawer Mode`}),`
`,(0,x.jsx)(n.p,{children:`The app-layout component supports using a mini drawer for navigation on large screens. The mini drawer provides a collapsed view that shows only icons, allowing for more content space while maintaining quick access to navigation.`}),`
`,(0,x.jsx)(n.h3,{id:`using-mini-drawer`,children:`Using Mini Drawer`}),`
`,(0,x.jsxs)(n.p,{children:[`Enable mini drawer mode by setting the `,(0,x.jsx)(n.code,{children:`use-mini-drawer`}),` attribute:`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-layout app-title="My Application" use-mini-drawer>
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
`,(0,x.jsxs)(n.p,{children:[`When enabled, the navigation drawer on large screens will use the `,(0,x.jsx)(n.code,{children:`<forge-mini-drawer>`}),` component instead of the standard `,(0,x.jsx)(n.code,{children:`<forge-drawer>`}),`, providing a more compact navigation experience.`]}),`
`,(0,x.jsx)(a,{of:p}),`
`,(0,x.jsx)(n.h3,{id:`hover-expansion`,children:`Hover Expansion`}),`
`,(0,x.jsx)(n.p,{children:`Enable hover expansion to allow the mini drawer to temporarily expand when the user hovers over it:`}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-layout app-title="My Application" use-mini-drawer mini-hover>
  <forge-list slot="navigation" navlist>
    <!-- Navigation items -->
  </forge-list>
</forge-app-layout>
`})}),`
`,(0,x.jsxs)(n.p,{children:[`When `,(0,x.jsx)(n.code,{children:`mini-hover`}),` is enabled:`]}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsx)(n.li,{children:`The drawer remains collapsed by default, showing only icons`}),`
`,(0,x.jsx)(n.li,{children:`Hovering over the drawer temporarily expands it to show full labels`}),`
`,(0,x.jsx)(n.li,{children:`The drawer collapses again when the mouse leaves the drawer area`}),`
`,(0,x.jsx)(n.li,{children:`This provides a space-efficient navigation option while maintaining easy access to full labels`}),`
`]}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Note:`}),` The mini drawer mode only affects the navigation drawer on large screens (above the breakpoint). On small screens, the navigation will always use a modal drawer regardless of the `,(0,x.jsx)(n.code,{children:`use-mini-drawer`}),` setting.`]}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`layout-slots`,children:`Layout Slots`}),`
`,(0,x.jsx)(n.p,{children:`Beyond the app bar and navigation, the component provides additional layout slots for content placement:`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.strong,{children:`Default slot`}),`: Main content area`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.strong,{children:`Body slots`}),`: `,(0,x.jsx)(n.code,{children:`body-header`}),`, `,(0,x.jsx)(n.code,{children:`body-footer`}),`, `,(0,x.jsx)(n.code,{children:`body-left`}),`, `,(0,x.jsx)(n.code,{children:`body-right`}),` for additional content areas`]}),`
`,(0,x.jsxs)(n.li,{children:[(0,x.jsx)(n.strong,{children:`Footer slot`}),`: Application footer content`]}),`
`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-html`,children:`<forge-app-layout app-title="Complex Layout">
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
`,(0,x.jsx)(n.h2,{id:`full-application-example`,children:`Full Application Example`}),`
`,(0,x.jsx)(n.p,{children:`A more complete example showing the app-layout composed with cards, tabs, a select, and a date picker to build out a realistic application screen:`}),`
`,(0,x.jsx)(a,{of:_}),`
`,(0,x.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,x.jsx)(l,{}),`
`,(0,x.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsx)(n.li,{children:`The embedded menu button includes appropriate focus management and keyboard navigation`}),`
`,(0,x.jsx)(n.li,{children:`Navigation drawer follows standard dialog accessibility patterns when in modal mode`}),`
`,(0,x.jsx)(n.li,{children:`App bar maintains proper heading structure and landmark roles`}),`
`,(0,x.jsx)(n.li,{children:`All slots support proper semantic markup for screen readers`}),`
`,(0,x.jsx)(n.li,{children:`Responsive behavior maintains keyboard accessibility across screen sizes`}),`
`]})]})}function b(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,x.jsx)(n,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=r(),n(),i(),c(),d(),m(),g(),v()})))()}S();export{b as default};