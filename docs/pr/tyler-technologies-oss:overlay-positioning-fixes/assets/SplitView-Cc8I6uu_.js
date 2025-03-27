import{j as e,M as o,T as r,C as a}from"./index-BKvspvr7.js";import{useMDXComponents as s}from"./index-BX2GV3qo.js";import{C as l}from"./CustomArgTypes-6MkDPcli.js";import{S as c,D as d}from"./SplitView.stories-b8ARgqHa.js";import"./iframe-CJnQ4-nt.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-CiMlxpQp.js";import"./lit-element-B3QVTycr.js";import"./lit-html-CuBe1DX_.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./decorators-CBntP_d2.js";import"./feature-detection-C61kIZu7.js";import"./split-view-BBU5VMLg.js";import"./constants-DHnR0122.js";import"./base-adapter-B_B1W7NX.js";import"./index-nygIasyA.js";import"./index-RsKXMDm2.js";import"./utils-DXGAA5XK.js";import"./event-utils-CyAMYupJ.js";import"./icon-DNSPAaK0.js";import"./index-CiLSBptl.js";import"./state-layer-DA2sYK0k.js";import"./focus-indicator-B_9E-jM6.js";function n(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c}),`
`,e.jsx(r,{}),`
`,e.jsxs(i.p,{children:["The split view component presents ",e.jsx(i.code,{children:"<forge-split-view-panel>"})," elements side-by-side as resizable panels. This is useful in situations where a user may want to adjust how much screen space is devoted to part of the interface. For example, you could consider displaying a map or image viewer within a split view."]}),`
`,e.jsxs(i.p,{children:["A split view configuration typically consists of one or more ",e.jsx(i.code,{children:"resizable"})," panels as well as at least one non-resizable panel. Resizable panels are defined by the resizable attribute, which can be set to ",e.jsx(i.code,{children:"'start'"})," or ",e.jsx(i.code,{children:"'end'"})," to reflect which direction they expand into. Non-resizable panels are not interactive on their own, but automatically expand to fill in the space left by their sibling panels."]}),`
`,e.jsxs(i.p,{children:["The split view panel component consists of two basic parts: its content, and a handle to resize it. Each handle is linked to its content by accessibility attributes, providing an accessible label and size information for assistive technology. The handle's position in relation to the content is determined by the ",e.jsx(i.code,{children:"resizable"})," value. When it's '",e.jsx(i.code,{children:"start'"})," the handle appears before the content, or after the content when it's ",e.jsx(i.code,{children:"'end'"}),"."]}),`
`,e.jsx(a,{of:d}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Verify that all content slotted into a panel is responsive and can resize fluidly.",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If a panel's content is inaccessible under or over a certain size, be sure to set the ",e.jsx(i.code,{children:"min"})," and ",e.jsx(i.code,{children:"max"})," properties accordingly."]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:["Be sure to include a unique ",e.jsx(i.code,{children:"accessibleLabel"})," property value for each panel that describes its content."]}),`
`,e.jsxs(i.li,{children:["If the user can close a panel, provide an easy way for them to reopen it.",`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Set ",e.jsx(i.code,{children:"aria-controls"})," and ",e.jsx(i.code,{children:"aria-expanded"})," on the element that controls the open state."]}),`
`]}),`
`]}),`
`]})]})}function _(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(n,{...t})}):n(t)}export{_ as default};
