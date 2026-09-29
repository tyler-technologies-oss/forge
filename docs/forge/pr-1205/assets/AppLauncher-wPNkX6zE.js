import{u as a,j as e,M as r,T as o,C as s}from"./blocks-Ck8GEe5N.js";import{C as l}from"./CustomArgTypes-BL556TU4.js";import{A as p,D as c}from"./AppLauncher.stories-CgNMbu2c.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BieQ8965.js";import"./iframe-BJxToyET.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-UHZ10xki.js";import"./service-adapter-8tADcN_b.js";import"./app-bar-menu-button-1cKXt_wX.js";import"./component-utils-DXwuBG7n.js";import"./class-map-BnEDXcyy.js";import"./directive-CwRn8Fwj.js";import"./property-DFrfpKpf.js";import"./base-lit-element-CpHFhxvO.js";import"./async-directive-jA1Mz7ci.js";import"./a11y-utils-DMYgbTDM.js";import"./dom-utils-BrrHV3zE.js";import"./feature-detection-iQu3yOww.js";import"./platform-EVTRdOou.js";import"./constants-C55SM-CY.js";import"./create-context-BxR5I8pu.js";import"./custom-element-DBARb8MV.js";import"./icon-button-Jr3jBluS.js";import"./base-button-TqALiGM0.js";import"./tyler-icons-BAsQ94Lf.js";import"./state-Chsbeeao.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./utils-C31il88P.js";import"./focus-indicator-DrGqahUv.js";import"./floating-ui.dom-DaMtbvS2.js";import"./icon-CxJqbZxZ.js";import"./state-layer-C_jpB3Dn.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DoIKtOh1.js";import"./base-component-Fg022xRz.js";import"./icon-button-constants-CCuvYQ62.js";import"./tooltip-DAmw-RhN.js";import"./overlay-DJKQ8z9g.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-BZtDEab1.js";import"./dismissible-stack-DyoP5jNB.js";import"./with-element-internals-DyIzLVwy.js";import"./app-bar-profile-button-CBWn5KGD.js";import"./badge-lk4WKqw5.js";import"./menu-aLJCoXgh.js";import"./list-DcLkysYS.js";import"./list-item-CkV3pnHm.js";import"./event-utils-zQ4FLDwK.js";import"./list-dropdown-aware-core-B8lYXzvV.js";import"./list-dropdown-CqIHfi6p.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-BFcPS07f.js";import"./popover-CyhOFEuV.js";import"./skeleton-gZ6y8N7F.js";import"./a11y-BxM9_46k.js";import"./scroll-axis-observer-D2bLFLX3.js";import"./base-component-delegate-DMLdtHaG.js";import"./avatar-MHFWGlvf.js";import"./style-map-DdyOA5fx.js";import"./avatar-constants-BHIz_4e6.js";import"./button-BFMR-gG-.js";import"./button-constants-CBCPGxiy.js";import"./toolbar-D4eiazkc.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./when-CI7b_ccM.js";import"./card-CkiTlThZ.js";import"./dialog-DX49i-fZ.js";import"./backdrop-DRDqOFah.js";import"./text-field-Cqx3plho.js";import"./base-field-CvxMEI8-.js";import"./label-D3aYJFzX.js";import"./button-toggle-group-constants-B13jv-HO.js";import"./checkbox-constants-BwwE81dH.js";import"./switch-constants-jYOGPwkc.js";import"./with-label-aware-0QImz1zN.js";import"./object-utils-CUPteeNI.js";function t(i){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
`,e.jsx(o,{}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-app-launcher>"})," component is a navigation solution designed for the Tyler Cloud ecosystem, enabling users to easily switch between applications and contexts. It provides a unified interface for accessing both related and all available applications within the Tyler platform, enhancing user workflow and navigation efficiency."]}),`
`,e.jsx(n.p,{children:"The component adapts responsively to screen size, presenting as a popover on desktop devices and a full-screen dialog on mobile devices to ensure optimal user experience across all platforms."}),`
`,e.jsx(s,{of:c}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-app-launcher>"})," component is designed to be used within a ",e.jsx(n.code,{children:"<forge-app-bar>"}),", typically placed in the ",e.jsx(n.code,{children:"end"})," slot alongside other user-related actions like the user profile component. This ensures consistent navigation structure throughout Tyler Cloud applications."]}),`
`,e.jsx(n.p,{children:"When using the app launcher, you can provide two primary data sources:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"relatedApps"}),": An array of applications relevant to the current user's context, displayed in the default view."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"allApps"}),': An array of all available applications within the Tyler Cloud ecosystem, accessible via the "View all apps" button.']}),`
`]}),`
`,e.jsx(n.p,{children:"To do so, this requires the use of JavaScript to set the properties on the component instance."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-bar theme-mode="scoped">
  <forge-app-launcher slot="end" id="app-launcher"></forge-app-launcher>
</forge-app-bar>

<script>
  const appLauncher = document.querySelector('#app-launcher');

  const relatedApps = [
    {
      label: 'Project Management',
      iconName: 'assignment',
      uri: 'https://project-management.example.com',
      target: '_blank'
    },
    {
      label: 'Time Tracking',
      iconName: 'access_time',
      uri: 'https://time-tracking.example.com',
      target: '_blank'
    }
  ];

  const allApps = [
    {
      label: 'Payments Administration',
      iconName: 'payment',
      uri: 'https://payments-admin.example.com',
      target: '_blank'
    },
    {
      label: 'PEP Administration',
      iconName: 'admin_panel_settings',
      uri: 'https://pep-admin.example.com',
      target: '_blank'
    },
    {
      label: 'User Management',
      iconName: 'people',
      uri: 'https://user-management.example.com',
      target: '_blank'
    }
  ];

  appLauncher.relatedApps = relatedApps;
  appLauncher.allApps = allApps;
<\/script>
`})}),`
`,e.jsx(n.h3,{id:"app-bar-integration",children:"App Bar Integration"}),`
`,e.jsxs(n.p,{children:["When using the app launcher within an app bar, you should set the ",e.jsx(n.code,{children:'theme-mode="scoped"'})," attribute on the ",e.jsx(n.code,{children:"<forge-app-bar>"})," to ensure proper theming inheritance and prevent the app bar's theme tokens from cascading into the launcher's popover content."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- Correct theming with theme-mode="scoped" -->
<forge-app-bar theme-mode="scoped">
  <forge-app-launcher slot="end" id="app-launcher">
    <!-- Content slots -->
  </forge-app-launcher>
</forge-app-bar>
`})}),`
`,e.jsx(n.h2,{id:"views",children:"Views"}),`
`,e.jsx(n.p,{children:"The app launcher supports three primary views:"}),`
`,e.jsx(n.h3,{id:"related-apps-view",children:"Related Apps View"}),`
`,e.jsx(n.p,{children:"The default view showing a curated list of applications relevant to the current user's context. This view includes:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A list of related applications with icons and labels"}),`
`,e.jsx(n.li,{children:'A "View all apps" button to access the complete application catalog'}),`
`,e.jsx(n.li,{children:"Optional custom links section for additional resources"}),`
`]}),`
`,e.jsx(n.h3,{id:"all-apps-view",children:"All Apps View"}),`
`,e.jsx(n.p,{children:"A comprehensive view displaying all available applications with:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Search functionality to filter applications by name"}),`
`,e.jsx(n.li,{children:"Complete list of applications in the Tyler Cloud ecosystem"}),`
`,e.jsx(n.li,{children:"Back button to return to the related apps view (when available)"}),`
`]}),`
`,e.jsx(n.h3,{id:"loading-view",children:"Loading View"}),`
`,e.jsx(n.p,{children:"A skeleton loading state that displays automatically when no application data is available:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Shows when both ",e.jsx(n.code,{children:"relatedApps"})," and ",e.jsx(n.code,{children:"allApps"})," arrays are empty"]}),`
`,e.jsx(n.li,{children:"Displays skeleton placeholders to provide visual feedback during data loading"}),`
`,e.jsx(n.li,{children:"Automatically transitions to the appropriate view when app data is provided"}),`
`]}),`
`,e.jsx(n.h2,{id:"custom-links",children:"Custom Links"}),`
`,e.jsxs(n.p,{children:["The component supports custom links through the ",e.jsx(n.code,{children:"<forge-app-launcher-link>"})," utility component, which provides accessible and visually consistent links within the launcher. Custom links appear in a separate section and are ideal for documentation, FAQ pages, or other supplementary resources."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-app-launcher>
  <span slot="app-launcher-links-title">Resources</span>
  <forge-app-launcher-link slot="app-launcher-link">
    <a href="/documentation" target="_blank">Documentation</a>
  </forge-app-launcher-link>
  <forge-app-launcher-link slot="app-launcher-link">
    <a href="/support" target="_blank">Support Center</a>
  </forge-app-launcher-link>
</forge-app-launcher>
`})}),`
`,e.jsx(n.h2,{id:"responsive-behavior",children:"Responsive Behavior"}),`
`,e.jsx(n.p,{children:"The component automatically adapts to screen size using an internal media query breakpoint at 768px:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Desktop (>768px)"}),": Displays as a popover anchored to the launcher button"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Mobile (≤768px)"}),": Displays as a full-screen persistent dialog for optimal touch interaction"]}),`
`]}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The app launcher button includes appropriate ",e.jsx(n.code,{children:"aria-label"}),' text ("Open app launcher") for screen readers.']}),`
`,e.jsx(n.li,{children:"All application links maintain proper focus management and keyboard navigation."}),`
`,e.jsxs(n.li,{children:["The component supports standard dialog accessibility patterns with ",e.jsx(n.code,{children:'role="dialog"'})," and ",e.jsx(n.code,{children:'aria-modal="true"'})," when in mobile mode."]}),`
`,e.jsxs(n.li,{children:["Custom links should include descriptive link text and appropriate ",e.jsx(n.code,{children:"target"})," attributes for external resources."]}),`
`,e.jsxs(n.li,{children:["Search functionality includes proper labeling with ",e.jsx(n.code,{children:"placeholder"})," text and ",e.jsx(n.code,{children:'autocomplete="off"'})," for optimal screen reader experience."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"launcherAriaLabel"}),", ",e.jsx(n.code,{children:"backAriaLabel"}),", and ",e.jsx(n.code,{children:"closeAriaLabel"})," allow the trigger, back, and close button labels to be localized."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"searchPlaceholder"})," allows the search input's ",e.jsx(n.code,{children:"placeholder"})," text to be localized, since it can't be provided via a slot."]}),`
`,e.jsxs(n.li,{children:["The ",e.jsx(n.code,{children:"header-title"}),", ",e.jsx(n.code,{children:"empty-state-text"}),", and ",e.jsx(n.code,{children:"loading-text"})," slots allow the header title, empty search results message, and loading message to be localized or replaced with custom markup."]}),`
`]})]})}function qe(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{qe as default};
