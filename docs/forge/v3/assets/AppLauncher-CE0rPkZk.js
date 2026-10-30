import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-fd9Z3xSU.js";import{n as c,t as l}from"./CustomArgTypes-Cnceb5ig.js";import{n as u,r as d,t as f}from"./AppLauncher.stories-CIUb3MtQ.js";function p(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`The `,(0,h.jsx)(n.code,{children:`<forge-app-launcher>`}),` component is a navigation solution designed for the Tyler Cloud ecosystem, enabling users to easily switch between applications and contexts. It provides a unified interface for accessing both related and all available applications within the Tyler platform, enhancing user workflow and navigation efficiency.`]}),`
`,(0,h.jsx)(n.p,{children:`The component adapts responsively to screen size, presenting as a popover on desktop devices and a full-screen dialog on mobile devices to ensure optimal user experience across all platforms.`}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,h.jsxs)(n.p,{children:[`The `,(0,h.jsx)(n.code,{children:`<forge-app-launcher>`}),` component is designed to be used within a `,(0,h.jsx)(n.code,{children:`<forge-app-bar>`}),`, typically placed in the `,(0,h.jsx)(n.code,{children:`end`}),` slot alongside other user-related actions like the user profile component. This ensures consistent navigation structure throughout Tyler Cloud applications.`]}),`
`,(0,h.jsx)(n.p,{children:`When using the app launcher, you can provide two primary data sources:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`relatedApps`}),`: An array of applications relevant to the current user's context, displayed in the default view.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`allApps`}),`: An array of all available applications within the Tyler Cloud ecosystem, accessible via the "View all apps" button.`]}),`
`]}),`
`,(0,h.jsx)(n.p,{children:`To do so, this requires the use of JavaScript to set the properties on the component instance.`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-app-bar theme-mode="scoped">
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
`,(0,h.jsx)(n.h3,{id:`app-bar-integration`,children:`App Bar Integration`}),`
`,(0,h.jsxs)(n.p,{children:[`When using the app launcher within an app bar, you should set the `,(0,h.jsx)(n.code,{children:`theme-mode="scoped"`}),` attribute on the `,(0,h.jsx)(n.code,{children:`<forge-app-bar>`}),` to ensure proper theming inheritance and prevent the app bar's theme tokens from cascading into the launcher's popover content.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<!-- Correct theming with theme-mode="scoped" -->
<forge-app-bar theme-mode="scoped">
  <forge-app-launcher slot="end" id="app-launcher">
    <!-- Content slots -->
  </forge-app-launcher>
</forge-app-bar>
`})}),`
`,(0,h.jsx)(n.h2,{id:`views`,children:`Views`}),`
`,(0,h.jsx)(n.p,{children:`The app launcher supports three primary views:`}),`
`,(0,h.jsx)(n.h3,{id:`related-apps-view`,children:`Related Apps View`}),`
`,(0,h.jsx)(n.p,{children:`The default view showing a curated list of applications relevant to the current user's context. This view includes:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`A list of related applications with icons and labels`}),`
`,(0,h.jsx)(n.li,{children:`A "View all apps" button to access the complete application catalog`}),`
`,(0,h.jsx)(n.li,{children:`Optional custom links section for additional resources`}),`
`]}),`
`,(0,h.jsx)(n.h3,{id:`all-apps-view`,children:`All Apps View`}),`
`,(0,h.jsx)(n.p,{children:`A comprehensive view displaying all available applications with:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`Search functionality to filter applications by name`}),`
`,(0,h.jsx)(n.li,{children:`Complete list of applications in the Tyler Cloud ecosystem`}),`
`,(0,h.jsx)(n.li,{children:`Back button to return to the related apps view (when available)`}),`
`]}),`
`,(0,h.jsx)(n.h3,{id:`loading-view`,children:`Loading View`}),`
`,(0,h.jsx)(n.p,{children:`A skeleton loading state that displays automatically when no application data is available:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Shows when both `,(0,h.jsx)(n.code,{children:`relatedApps`}),` and `,(0,h.jsx)(n.code,{children:`allApps`}),` arrays are empty`]}),`
`,(0,h.jsx)(n.li,{children:`Displays skeleton placeholders to provide visual feedback during data loading`}),`
`,(0,h.jsx)(n.li,{children:`Automatically transitions to the appropriate view when app data is provided`}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`lazy-loading-apps`,children:`Lazy Loading Apps`}),`
`,(0,h.jsxs)(n.p,{children:[`A standard `,(0,h.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent`,rel:`nofollow`,children:(0,h.jsx)(n.code,{children:`ToggleEvent`})}),` named `,(0,h.jsx)(n.code,{children:`toggle`}),` is dispatched whenever the launcher opens or closes, regardless of whether it was triggered by the user or by setting the `,(0,h.jsx)(n.code,{children:`open`}),` property. Read the current state from the `,(0,h.jsx)(n.code,{children:`open`}),` property on the event target, or from the event's `,(0,h.jsx)(n.code,{children:`oldState`}),` and `,(0,h.jsx)(n.code,{children:`newState`}),` (`,(0,h.jsx)(n.code,{children:`'open'`}),` or `,(0,h.jsx)(n.code,{children:`'closed'`}),`).`]}),`
`,(0,h.jsxs)(n.p,{children:[`This allows you to defer fetching the app list until the launcher is first opened. While `,(0,h.jsx)(n.code,{children:`relatedApps`}),` and `,(0,h.jsx)(n.code,{children:`allApps`}),` are both empty, the launcher displays its `,(0,h.jsx)(n.a,{href:`#loading-view`,children:`loading view`}),`.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-app-bar theme-mode="scoped">
  <forge-app-launcher slot="end" id="app-launcher"></forge-app-launcher>
</forge-app-bar>

<script>
  const appLauncher = document.querySelector('#app-launcher');
  let hasRequestedApps = false;

  appLauncher.addEventListener('toggle', async () => {
    if (!appLauncher.open || hasRequestedApps) {
      return;
    }

    hasRequestedApps = true;
    appLauncher.allApps = await fetchApps();
  });
<\/script>
`})}),`
`,(0,h.jsx)(n.h2,{id:`custom-links`,children:`Custom Links`}),`
`,(0,h.jsxs)(n.p,{children:[`The component supports custom links through the `,(0,h.jsx)(n.code,{children:`<forge-app-launcher-link>`}),` utility component, which provides accessible and visually consistent links within the launcher. Custom links appear in a separate section and are ideal for documentation, FAQ pages, or other supplementary resources.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-app-launcher>
  <span slot="app-launcher-links-title">Resources</span>
  <forge-app-launcher-link slot="app-launcher-link">
    <a href="/documentation" target="_blank">Documentation</a>
  </forge-app-launcher-link>
  <forge-app-launcher-link slot="app-launcher-link">
    <a href="/support" target="_blank">Support Center</a>
  </forge-app-launcher-link>
</forge-app-launcher>
`})}),`
`,(0,h.jsx)(n.h2,{id:`responsive-behavior`,children:`Responsive Behavior`}),`
`,(0,h.jsx)(n.p,{children:`The component automatically adapts to screen size using an internal media query breakpoint at 768px:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Desktop (>768px)`}),`: Displays as a popover anchored to the launcher button`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Mobile (≤768px)`}),`: Displays as a full-screen persistent dialog for optimal touch interaction`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`The app launcher button includes appropriate `,(0,h.jsx)(n.code,{children:`aria-label`}),` text ("Open app launcher") for screen readers.`]}),`
`,(0,h.jsx)(n.li,{children:`All application links maintain proper focus management and keyboard navigation.`}),`
`,(0,h.jsxs)(n.li,{children:[`The component supports standard dialog accessibility patterns with `,(0,h.jsx)(n.code,{children:`role="dialog"`}),` and `,(0,h.jsx)(n.code,{children:`aria-modal="true"`}),` when in mobile mode.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Custom links should include descriptive link text and appropriate `,(0,h.jsx)(n.code,{children:`target`}),` attributes for external resources.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Search functionality includes proper labeling with `,(0,h.jsx)(n.code,{children:`placeholder`}),` text and `,(0,h.jsx)(n.code,{children:`autocomplete="off"`}),` for optimal screen reader experience.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`launcherAriaLabel`}),`, `,(0,h.jsx)(n.code,{children:`backAriaLabel`}),`, and `,(0,h.jsx)(n.code,{children:`closeAriaLabel`}),` allow the trigger, back, and close button labels to be localized.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`searchPlaceholder`}),` allows the search input's `,(0,h.jsx)(n.code,{children:`placeholder`}),` text to be localized, since it can't be provided via a slot.`]}),`
`,(0,h.jsxs)(n.li,{children:[`The `,(0,h.jsx)(n.code,{children:`header-title`}),`, `,(0,h.jsx)(n.code,{children:`empty-state-text`}),`, and `,(0,h.jsx)(n.code,{children:`loading-text`}),` slots allow the header title, empty search results message, and loading message to be localized or replaced with custom markup.`]}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};