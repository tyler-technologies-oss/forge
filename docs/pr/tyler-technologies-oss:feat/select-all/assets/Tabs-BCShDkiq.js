import{j as e,M as s,T as r,C as a}from"./blocks-d2H4pdaz.js";import{useMDXComponents as o}from"./index-CGhPJCvY.js";import{C as l}from"./CustomArgTypes-3CBLuJNM.js";import{T as c,D as h,C as d,V as b,W as p,S as u}from"./Tabs.stories-vH-Fdovh.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-TounFTVn.js";import"./utils-D4P_Rfvb.js";import"./style-map-BNUbwB4X.js";import"./directive-CJw_OlP2.js";import"./icon-kuXwuZAY.js";import"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./tab-bar-z_oP6Vhe.js";import"./icon-button-CysI0CPp.js";import"./base-button-adapter-DonUN3ik.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./utils-Bd6MGx91.js";import"./focus-indicator-Bg6HJ9xm.js";import"./base-lit-element-B_NjNOv2.js";import"./state-layer-gAgMwMHF.js";function i(n){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(r,{}),`
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
`,e.jsx(a,{of:u}),`
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
element containing a `,e.jsx(t.code,{children:"tablist"})," role:"]})]})}function P(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{P as default};
