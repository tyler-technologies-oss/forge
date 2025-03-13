import{j as e,M as s,T as r,C as i}from"./index-Bvg9q9C_.js";import{useMDXComponents as o}from"./index-BOyaz0wS.js";import{C as l}from"./CustomArgTypes-D8KNg1Gt.js";import{T as c,D as h,C as d,V as p,W as b,S as u}from"./Tabs.stories-CA7PoBZx.js";import"./iframe-BqxLf17T.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DOJ_BQTN.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./index-Cf3axooF.js";import"./v4-CQkTLCs1.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./index-CbZAylpk.js";import"./index-fxMNKkgx.js";import"./icon-B5R9pr_c.js";import"./constants-9n5_0r7k.js";import"./feature-detection-DRCh51Sa.js";import"./base-adapter-B6TJxM93.js";import"./index-BgGCUUFB.js";import"./tab-bar-Br2Wcm2k.js";import"./icon-button-B45Yg2R2.js";import"./base-button-adapter-L8S_LI8j.js";import"./with-label-aware-OEbK3wHg.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./focus-indicator-N8y3p24x.js";import"./state-layer-BM79vS2j.js";function a(n){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:`Tabs are used to quickly navigate between different views, and group related content any level of hierarchy. They may be used as primary
or secondary navigation within a page.`}),`
`,e.jsx(t.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(t.p,{children:"Tabs can be displayed in a number of different ways, including horizontal, vertical, and clustered layouts. The default layout is horizontal."}),`
`,e.jsx(t.h3,{id:"default",children:"Default"}),`
`,e.jsx(t.p,{children:"By default tabs are displayed in a horizontal layout. This is the most common use case for tabs:"}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(t.h3,{id:"clustered",children:"Clustered"}),`
`,e.jsx(t.p,{children:`Clustered tabs are displayed in a horizontal orientation, but instead of spanning the full width of their container, they are grouped together
and can be aligned to the left, center, or right of the container:`}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(t.h3,{id:"vertical",children:"Vertical"}),`
`,e.jsx(t.p,{children:`Vertical tabs are displayed in a vertical orientation. This is useful when you have a large number of tabs, or when you want to save horizontal
space:`}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(t.h3,{id:"with-icons",children:"With Icons"}),`
`,e.jsx(t.p,{children:"Tabs can also include icons to help users quickly identify the content of each tab. Icons can be displayed to the left (start) or right (end) of the tab label:"}),`
`,e.jsx(i,{of:b}),`
`,e.jsx(t.h2,{id:"scrolling",children:"Scrolling"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-tab-bar>"}),` element supports scrolling when the tabs overflow the container. This is useful when you have a large number of tabs and
want to ensure that all tabs are accessible to the user. The tabs will automatically scroll when the user switches tabs, or when the
user clicks on the scroll buttons.`]}),`
`,e.jsx(i,{of:u}),`
`,e.jsx(t.h2,{id:"disabled-state",children:"Disabled State"}),`
`,e.jsxs(t.p,{children:["When disabling tabs you should either choose to disable all tabs together through the ",e.jsx(t.code,{children:"<forge-tab-bar>"}),` element, or disable individual tabs for
each `,e.jsx(t.code,{children:"<forge-tab>"}),` element. Do not mix the two approaches. This is recommended because if you attempt to use both at the same time, the two
disabled states can conflict with each other leading to unexpected behavior.`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure that all of the controls that are accessible by a mouse are also accessible by keyboard."}),`
`,e.jsx(t.li,{children:"Ensure each control can be updated or activated by the keyboard."}),`
`,e.jsx(t.li,{children:"Ensure that only the selected tab content is reachable by keyboard."}),`
`]}),`
`,e.jsxs(t.p,{children:["It's expected that you will need to provide the ",e.jsx(t.code,{children:"tablist"})," and ",e.jsx(t.code,{children:"tabpanel"}),` roles to your elements to indicate to assistive technologies
which elements are responsible for the tabs and tab content respectively. Each tab should contain an `,e.jsx(t.code,{children:"aria-controls"}),` property identifying
its corresponding tab content. In addition, each tab content element should be labelled by a tab. These elements need to be wrapped in an
element containing a `,e.jsx(t.code,{children:"tablist"})," role:"]})]})}function J(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(a,{...n})}):a(n)}export{J as default};
