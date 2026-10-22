import{b as g}from"./iframe-B2G4zKPj.js";import"./service-adapter-8tADcN_b.js";import{I as l}from"./icon-CzY8gUKj.js";import{e as m,f as c,d,g as h,h as f}from"./tyler-icons-6f2n3B-C.js";import"./app-layout-CXlx8bvr.js";import"./divider-Bq2uY91e.js";import"./inline-message-XoyeymbY.js";import"./list-CWBEI486.js";import"./list-item-Cy6LxyEf.js";import"./preload-helper-PPVm8Dsz.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-SPSYPiJ5.js";import"./base-lit-element-jhkq3ECX.js";import"./async-directive-BP2vb57q.js";import"./directive-CwRn8Fwj.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./state-D0NMu0LN.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./utils-srtmqB2N.js";import"./app-bar-menu-button-Dg0OuAkc.js";import"./class-map-BsyfRX0P.js";import"./a11y-utils-D_hXjxHZ.js";import"./dom-utils-DExKgbbf.js";import"./custom-element-DR9AFpIK.js";import"./icon-button-Dd9p4EqL.js";import"./base-button-DTSPJNju.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./focus-indicator-bDn075UK.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-oVncPkRT.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-CG4WlmkL.js";import"./base-component-BFu9bkgC.js";import"./icon-button-constants-JHHxiN9v.js";import"./tooltip-DdRl_dqo.js";import"./overlay-DWH89yjz.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-j9Qzt-d1.js";import"./with-element-internals-DChZslLI.js";import"./dialog-DoQxHo6b.js";import"./backdrop-ngk7d2eo.js";import"./drawer-B-CimXk8.js";import"./base-drawer-CRoTqCXm.js";import"./event-utils-zQ4FLDwK.js";import"./mini-drawer-Bt5EnS2p.js";import"./scaffold-Ca9xBuAs.js";import"./toolbar-C4ep4NAp.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__;l.define([m,c,d,h,f]);const y="forge-app-layout",v=n("forge-app-layout-breakpoint-change"),b=n("forge-app-layout-drawer-change"),we={title:"Components/App Layout",component:y,argTypes:{appTitle:{control:"text",description:"The title text to display in the app bar",table:{category:"Properties"}},breakpoint:{control:"number",description:"The screen width breakpoint in pixels for responsive behavior",table:{category:"Properties"}}},args:{appTitle:"Custom Mobile Content Demo",breakpoint:960}},t={render:o=>{let a=window.innerWidth>=o.breakpoint?"large":"small";const r=e=>{a=e.detail.breakpoint,i(),v(e)},s=e=>{b(e)},i=()=>{const e=document.getElementById("navigation-container");if(!e)return;const p=a==="small"?`<forge-inline-message theme="info-secondary" style="margin: var(--forge-spacing-medium);">
              <forge-icon slot="icon" name="info_outline"></forge-icon>
              This banner only appears in the mobile view.
            </forge-inline-message>`:"";e.innerHTML=`
        ${p}
        <forge-list navlist data-forge-app-layout-close>
          <forge-list-item>
            <forge-icon slot="start" name="home"></forge-icon>
            <a href="javascript: void(0);">Home</a>
          </forge-list-item>
          <forge-list-item>
            <forge-icon slot="start" name="inbox"></forge-icon>
            <a href="javascript: void(0);">Inbox</a>
          </forge-list-item>
          <forge-list-item>
            <forge-icon slot="start" name="star"></forge-icon>
            <a href="javascript: void(0);">Starred</a>
          </forge-list-item>
          <forge-list-item>
            <forge-icon slot="start" name="settings"></forge-icon>
            <a href="javascript: void(0);">Settings</a>
          </forge-list-item>
        </forge-list>
      `};return setTimeout(()=>{i()},0),g`
      <style>
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
          padding: 0;
        }
      </style>
      <forge-app-layout
        app-title=${o.appTitle}
        breakpoint=${o.breakpoint}
        @forge-app-layout-breakpoint-change=${r}
        @forge-app-layout-drawer-change=${s}>
        <div id="navigation-container" slot="navigation">
          <!-- Content will be dynamically updated based on breakpoint -->
        </div>

        <div slot="body" style="padding: var(--forge-spacing-medium);">
          <h2 class="forge-typography--display1">Custom Mobile Content Demo</h2>
          <p class="forge-typography--body1" style="margin-block: var(--forge-spacing-medium);">
            This demo demonstrates that you can use the <code>forge-app-layout-breakpoint-change</code> event to detect when the layout changes between mobile
            and desktop modes, and render different content accordingly.
          </p>
          <p class="forge-typography--body1" style="margin-block-end: var(--forge-spacing-medium);">
            Try resizing the window to see the navigation content change:
          </p>
          <ul class="forge-typography--body1">
            <li><span class="forge-typography--heading1">Mobile (small):</span> Shows an inline message that only appears in mobile view</li>
            <li><span class="forge-typography--heading1">Desktop (large):</span> Shows standard navigation list without the message</li>
          </ul>
          <p class="forge-typography--body2" style="margin-block-start: var(--forge-spacing-large); color: var(--forge-theme-text-medium);">
            Check the Actions panel below to see the events being emitted as you resize the window or toggle the drawer.
          </p>
        </div>
      </forge-app-layout>
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    // Track the current breakpoint state
    let currentBreakpoint: 'small' | 'large' = window.innerWidth >= args.breakpoint ? 'large' : 'small';

    // Handle breakpoint change event
    const handleBreakpointChange = (event: CustomEvent<AppLayoutBreakpointChangeEventData>): void => {
      currentBreakpoint = event.detail.breakpoint;
      updateNavigationContent();
      breakpointChangeAction(event);
    };

    // Handle drawer change event
    const handleDrawerChange = (event: CustomEvent<AppLayoutDrawerChangeEventData>): void => {
      drawerChangeAction(event);
    };

    // Update the navigation content based on the current breakpoint
    const updateNavigationContent = (): void => {
      const navigationContainer = document.getElementById('navigation-container');
      if (!navigationContainer) {
        return;
      }
      const mobileOnlyBanner = currentBreakpoint === 'small' ? \`<forge-inline-message theme="info-secondary" style="margin: var(--forge-spacing-medium);">
              <forge-icon slot="icon" name="info_outline"></forge-icon>
              This banner only appears in the mobile view.
            </forge-inline-message>\` : '';
      navigationContainer.innerHTML = \`
        \${mobileOnlyBanner}
        <forge-list navlist data-forge-app-layout-close>
          <forge-list-item>
            <forge-icon slot="start" name="home"></forge-icon>
            <a href="javascript: void(0);">Home</a>
          </forge-list-item>
          <forge-list-item>
            <forge-icon slot="start" name="inbox"></forge-icon>
            <a href="javascript: void(0);">Inbox</a>
          </forge-list-item>
          <forge-list-item>
            <forge-icon slot="start" name="star"></forge-icon>
            <a href="javascript: void(0);">Starred</a>
          </forge-list-item>
          <forge-list-item>
            <forge-icon slot="start" name="settings"></forge-icon>
            <a href="javascript: void(0);">Settings</a>
          </forge-list-item>
        </forge-list>
      \`;
    };

    // Initialize content after render
    setTimeout(() => {
      updateNavigationContent();
    }, 0);
    return html\`
      <style>
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
          padding: 0;
        }
      </style>
      <forge-app-layout
        app-title=\${args.appTitle}
        breakpoint=\${args.breakpoint}
        @forge-app-layout-breakpoint-change=\${handleBreakpointChange}
        @forge-app-layout-drawer-change=\${handleDrawerChange}>
        <div id="navigation-container" slot="navigation">
          <!-- Content will be dynamically updated based on breakpoint -->
        </div>

        <div slot="body" style="padding: var(--forge-spacing-medium);">
          <h2 class="forge-typography--display1">Custom Mobile Content Demo</h2>
          <p class="forge-typography--body1" style="margin-block: var(--forge-spacing-medium);">
            This demo demonstrates that you can use the <code>forge-app-layout-breakpoint-change</code> event to detect when the layout changes between mobile
            and desktop modes, and render different content accordingly.
          </p>
          <p class="forge-typography--body1" style="margin-block-end: var(--forge-spacing-medium);">
            Try resizing the window to see the navigation content change:
          </p>
          <ul class="forge-typography--body1">
            <li><span class="forge-typography--heading1">Mobile (small):</span> Shows an inline message that only appears in mobile view</li>
            <li><span class="forge-typography--heading1">Desktop (large):</span> Shows standard navigation list without the message</li>
          </ul>
          <p class="forge-typography--body2" style="margin-block-start: var(--forge-spacing-large); color: var(--forge-theme-text-medium);">
            Check the Actions panel below to see the events being emitted as you resize the window or toggle the drawer.
          </p>
        </div>
      </forge-app-layout>
    \`;
  }
}`,...t.parameters?.docs?.source}}};const Ce=["CustomMobileContent"];export{t as CustomMobileContent,Ce as __namedExportsOrder,we as default};
