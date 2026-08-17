import{u as i,j as e,M as r,T as s,C as a}from"./blocks-DXTJDx2G.js";import{C as l}from"./CustomArgTypes-BzctqCJm.js";import{T as c,D as h,C as d,V as b,W as p,S as m,a as u}from"./Tabs.stories-B1DK6fnD.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BWAobhOu.js";import"./utils-BmZ1G202.js";import"./style-map-CyeIkLVB.js";import"./directive-CwRn8Fwj.js";import"./tyler-icons-C2isZNDF.js";import"./utils-CjYv_z18.js";import"./service-adapter-8tADcN_b.js";import"./base-lit-element-s3PIYIKD.js";import"./constants-D9XaGcQ2.js";import"./feature-detection-3Hxzrcpn.js";import"./tab-panel-CiLDhWMT.js";import"./consume-Dn26QDt8.js";import"./state-CwoPWo-e.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./class-map-BUxfhnyt.js";import"./a11y-utils-DQoauvDo.js";import"./dom-utils-D0uG6d5z.js";import"./event-utils-zQ4FLDwK.js";import"./key-action-lsAysfb-.js";import"./utils-DU-9AqTO.js";import"./icon-button-CjKKMho2.js";import"./base-component-DdGiO9ZD.js";import"./base-adapter-CbRstNNQ.js";import"./base-button-core-CePe8YQF.js";import"./with-label-aware-v-rvTgpX.js";import"./with-default-aria-D57-4a2v.js";import"./focus-indicator-DsmueVAt.js";import"./state-layer-Wu0zWm6m.js";import"./icon-button-constants-DmTas6I8.js";import"./index-5CPwzmQS.js";function o(n){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:`Tabs are used to quickly navigate between different views, and group related content any level of hierarchy. They may be used as primary
or secondary navigation within a page.`}),`
`,e.jsx(t.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(t.p,{children:"Tabs can be displayed in a number of different ways, including horizontal, vertical, and clustered layouts. The default layout is horizontal."}),`
`,e.jsx(t.h3,{id:"default",children:"Default"}),`
`,e.jsx(t.p,{children:"By default tabs are displayed in a horizontal layout. This is the most common use case for tabs:"}),`
`,e.jsx(a,{of:h}),`
`,e.jsx(t.h3,{id:"clustered",children:"Clustered"}),`
`,e.jsx(t.p,{children:`Clustered tabs are displayed in a horizontal orientation, but instead of spanning the full width of their container, they are grouped together
and can be aligned to the left, center, or right of the container:`}),`
`,e.jsx(a,{of:d}),`
`,e.jsx(t.h3,{id:"vertical",children:"Vertical"}),`
`,e.jsx(t.p,{children:`Vertical tabs are displayed in a vertical orientation. This is useful when you have a large number of tabs, or when you want to save horizontal
space:`}),`
`,e.jsx(a,{of:b}),`
`,e.jsx(t.h3,{id:"with-icons",children:"With Icons"}),`
`,e.jsx(t.p,{children:"Tabs can also include icons to help users quickly identify the content of each tab. Icons can be displayed to the left (start) or right (end) of the tab label:"}),`
`,e.jsx(a,{of:p}),`
`,e.jsx(t.h2,{id:"scrolling",children:"Scrolling"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-tab-bar>"}),` element supports scrolling when the tabs overflow the container. This is useful when you have a large number of tabs and
want to ensure that all tabs are accessible to the user. The tabs will automatically scroll when the user switches tabs, or when the
user clicks on the scroll buttons.`]}),`
`,e.jsx(a,{of:m}),`
`,e.jsx(t.h2,{id:"disabled-state",children:"Disabled State"}),`
`,e.jsxs(t.p,{children:["When disabling tabs you should either choose to disable all tabs together through the ",e.jsx(t.code,{children:"<forge-tab-bar>"}),` element, or disable individual tabs for
each `,e.jsx(t.code,{children:"<forge-tab>"}),` element. Do not mix the two approaches. This is recommended because if you attempt to use both at the same time, the two
disabled states can conflict with each other leading to unexpected behavior.`]}),`
`,e.jsx(t.h2,{id:"named-tabs",children:"Named Tabs"}),`
`,e.jsxs(t.p,{children:["The active tab can be set or retrieved by its name through the ",e.jsx(t.code,{children:"activeTabName"})," property on the ",e.jsx(t.code,{children:"<forge-tab-bar>"})," element."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<!-- Tab two will be active -->
<forge-tab-bar active-tab-name="two">
  <forge-tab name="one">Tab one</forge-tab>
  <forge-tab name="two">Tab two</forge-tab>
  <forge-tab name="three">Tab three</forge-tab>
  <forge-tab name="four">Tab four</forge-tab>
</forge-tab-bar>
`})}),`
`,e.jsxs(t.p,{children:["To get the name of the active tab when the active tab changes, listen for the ",e.jsx(t.code,{children:"forge-tab-bar-change"}),`
event on the `,e.jsx(t.code,{children:"<forge-tab-bar>"})," element and access the ",e.jsx(t.code,{children:"name"})," property on the event's detail."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`const tabBar = document.querySelector('forge-tab-bar');
tabBar?.addEventListener('forge-tab-bar-change', (event) => {
  const activeTabName = event.detail.name;
  console.log('Active tab name:', activeTabName);
});
`})}),`
`,e.jsx(t.h2,{id:"tab-panels",children:"Tab Panels"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-tab-panel>"})," element can be used to associate content with a specific tab. The ",e.jsx(t.code,{children:"for"}),`
attribute on the `,e.jsx(t.code,{children:"<forge-tab-panel>"})," element should match the ",e.jsx(t.code,{children:"id"}),` of the corresponding
`,e.jsx(t.code,{children:"<forge-tab>"}),` element. When a tab is selected, the corresponding tab panel will be displayed and all
other tab panels will be hidden. The `,e.jsx(t.code,{children:"<forge-tab-panel>"}),` element will also automatically manage ARIA
relationships and focus to ensure that the tab pattern is fully accessible.`]}),`
`,e.jsx(a,{of:u}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure that all of the controls that are accessible by a mouse are also accessible by keyboard."}),`
`,e.jsx(t.li,{children:"Ensure each control can be updated or activated by the keyboard."}),`
`,e.jsx(t.li,{children:"Ensure that only the selected tab content is reachable by keyboard."}),`
`]}),`
`,e.jsxs(t.p,{children:["It's expected that you will need to provide the ",e.jsx(t.code,{children:"tablist"})," and ",e.jsx(t.code,{children:"tabpanel"}),` roles to your elements to
indicate to assistive technologies which elements are responsible for the tabs and tab content
respectively. Each tab should contain an `,e.jsx(t.code,{children:"aria-controls"}),` property identifying its corresponding tab
content. In addition, each tab content element should be labelled by a tab. These elements need to
be wrapped in an element containing a `,e.jsx(t.code,{children:"tablist"})," role:"]})]})}function Z(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(o,{...n})}):o(n)}export{Z as default};
