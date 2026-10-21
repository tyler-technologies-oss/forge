import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CuAvrKn_.js";import{o as i,t as a}from"./icon-DzM2_TPc.js";import{Jt as o,Zt as s,ht as c,mt as l,t as u,vt as d}from"./tyler-icons-CLXzO0Q_.js";import{t as f}from"./divider-D4sIL5dx.js";import{t as p}from"./list-B0huA5vt.js";import{t as m}from"./inline-message-BmqUEiuD.js";import{t as h}from"./app-layout-xp_zReNY.js";var g=t({CustomMobileContent:()=>S,__namedExportsOrder:()=>C,default:()=>x}),_,v,y,b,x,S,C;function w(){return(w=e((()=>{r(),a(),u(),h(),f(),m(),p(),{action:_}=__STORYBOOK_MODULE_ACTIONS__,i.define([l,c,o,s,d]),v=`forge-app-layout`,y=_(`forge-app-layout-breakpoint-change`),b=_(`forge-app-layout-drawer-change`),x={title:`Components/App Layout`,component:v,argTypes:{appTitle:{control:`text`,description:`The title text to display in the app bar`,table:{category:`Properties`}},breakpoint:{control:`number`,description:`The screen width breakpoint in pixels for responsive behavior`,table:{category:`Properties`}}},args:{appTitle:`Custom Mobile Content Demo`,breakpoint:960}},S={render:e=>{let t=window.innerWidth>=e.breakpoint?`large`:`small`,r=e=>{t=e.detail.breakpoint,a(),y(e)},i=e=>{b(e)},a=()=>{let e=document.getElementById(`navigation-container`);e&&(e.innerHTML=`
        ${t===`small`?`<forge-inline-message theme="info-secondary" style="margin: var(--forge-spacing-medium);">
              <forge-icon slot="icon" name="info_outline"></forge-icon>
              This banner only appears in the mobile view.
            </forge-inline-message>`:``}
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
      `)};return setTimeout(()=>{a()},0),n`
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
        app-title=${e.appTitle}
        breakpoint=${e.breakpoint}
        @forge-app-layout-breakpoint-change=${r}
        @forge-app-layout-drawer-change=${i}>
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
    `}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C=[`CustomMobileContent`]})))()}export{S as n,w as r,g as t};