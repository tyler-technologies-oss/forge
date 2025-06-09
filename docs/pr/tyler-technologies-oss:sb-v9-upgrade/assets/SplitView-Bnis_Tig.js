import{j as e,M as o,T as r,C as a}from"./blocks-BiOEtk1e.js";import{useMDXComponents as s}from"./index-B_QGz6G5.js";import{C as l}from"./CustomArgTypes-CdGL2gxd.js";import{S as c,D as d}from"./SplitView.stories-CYGs-crc.js";import"./iframe-CE3HZkEz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CEkw6ujh.js";import"./decorators-B95OLgQg.js";import"./feature-detection-CY6TVbRZ.js";import"./split-view-OZ4vBqIY.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./icon-Bh1zyXYd.js";import"./index-CiLSBptl.js";import"./utils-CRxrUqQD.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";function t(i){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c}),`
`,e.jsx(r,{}),`
`,e.jsxs(n.p,{children:["The split view component presents ",e.jsx(n.code,{children:"<forge-split-view-panel>"})," elements side-by-side as resizable panels. This is useful in situations where a user may want to adjust how much screen space is devoted to part of the interface. For example, you could consider displaying a map or image viewer within a split view."]}),`
`,e.jsxs(n.p,{children:["A split view configuration typically consists of one or more ",e.jsx(n.code,{children:"resizable"})," panels as well as at least one non-resizable panel. Resizable panels are defined by the resizable attribute, which can be set to ",e.jsx(n.code,{children:"'start'"})," or ",e.jsx(n.code,{children:"'end'"})," to reflect which direction they expand into. Non-resizable panels are not interactive on their own, but automatically expand to fill in the space left by their sibling panels."]}),`
`,e.jsxs(n.p,{children:["The split view panel component consists of two basic parts: its content, and a handle to resize it. Each handle is linked to its content by accessibility attributes, providing an accessible label and size information for assistive technology. The handle's position in relation to the content is determined by the ",e.jsx(n.code,{children:"resizable"})," value. When it's '",e.jsx(n.code,{children:"start'"})," the handle appears before the content, or after the content when it's ",e.jsx(n.code,{children:"'end'"}),"."]}),`
`,e.jsx(a,{of:d}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Verify that all content slotted into a panel is responsive and can resize fluidly.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If a panel's content is inaccessible under or over a certain size, be sure to set the ",e.jsx(n.code,{children:"min"})," and ",e.jsx(n.code,{children:"max"})," properties accordingly."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Be sure to include a unique ",e.jsx(n.code,{children:"accessibleLabel"})," property value for each panel that describes its content."]}),`
`,e.jsxs(n.li,{children:["If the user can close a panel, provide an easy way for them to reopen it.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.code,{children:"aria-controls"})," and ",e.jsx(n.code,{children:"aria-expanded"})," on the element that controls the open state."]}),`
`]}),`
`]}),`
`]})]})}function S(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{S as default};
