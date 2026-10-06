import{b as g}from"./iframe-BlLbDnlR.js";import"./service-adapter-8tADcN_b.js";import{I as l}from"./icon-CJqXyQad.js";import{e as m,f as c,d,g as h,h as f}from"./tyler-icons-_o7MAz4c.js";import"./app-layout-BFmrZrLi.js";import"./divider-C7tnw8-Z.js";import"./inline-message-ZbUKeLM6.js";import"./list-C7kfQ7Om.js";import"./list-item-BteMMJXx.js";import"./preload-helper-PPVm8Dsz.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-BeWmazHW.js";import"./base-lit-element-C1X2FsrT.js";import"./async-directive-Cu3UApLZ.js";import"./directive-CwRn8Fwj.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./state-DcksNII9.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./utils-C31il88P.js";import"./app-bar-menu-button-BaGw08-A.js";import"./class-map-BpS8NEi2.js";import"./a11y-utils-DssnAab5.js";import"./dom-utils-BDbRr6KM.js";import"./custom-element-DR9AFpIK.js";import"./icon-button-CyhNoOEa.js";import"./base-button-Cbb-tQj4.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./focus-indicator-CIttc_vs.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-gtlkuVuf.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./base-component-BFu9bkgC.js";import"./icon-button-constants-JHHxiN9v.js";import"./tooltip-CQvCJDFH.js";import"./overlay-BwE7oRiM.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./with-element-internals-CFYP_epH.js";import"./dialog-fH8z4QHs.js";import"./backdrop-ngk7d2eo.js";import"./drawer-B-04gfFR.js";import"./base-drawer-L9q0-_V8.js";import"./event-utils-zQ4FLDwK.js";import"./mini-drawer-CEn9vZb3.js";import"./scaffold-Ca9xBuAs.js";import"./toolbar-Uh-GtQd7.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__;l.define([m,c,d,h,f]);const y="forge-app-layout",v=n("forge-app-layout-breakpoint-change"),b=n("forge-app-layout-drawer-change"),we={title:"Components/App Layout",component:y,argTypes:{appTitle:{control:"text",description:"The title text to display in the app bar",table:{category:"Properties"}},breakpoint:{control:"number",description:"The screen width breakpoint in pixels for responsive behavior",table:{category:"Properties"}}},args:{appTitle:"Custom Mobile Content Demo",breakpoint:960}},t={render:o=>{let a=window.innerWidth>=o.breakpoint?"large":"small";const r=e=>{a=e.detail.breakpoint,i(),v(e)},s=e=>{b(e)},i=()=>{const e=document.getElementById("navigation-container");if(!e)return;const p=a==="small"?`<forge-inline-message theme="info-secondary" style="margin: var(--forge-spacing-medium);">
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
