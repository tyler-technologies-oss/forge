import{u as s,j as e,M as o,T as r,C as a}from"./blocks-BaaFsLmi.js";import{C as l}from"./CustomArgTypes-DpZEridC.js";import{S as c,D as d}from"./SplitView.stories-CGuDPsm9.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C0CPHb63.js";import"./iframe-CCQPwMqK.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-71auwco3.js";import"./decorators-BwooPsX-.js";import"./service-adapter-DlT-lJx7.js";import"./split-view-BCDVwKfV.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./tyler-icons-D_P4inVM.js";import"./property-Dw5w9m4o.js";import"./base-lit-element-Rp30TdPi.js";import"./directive-CwRn8Fwj.js";import"./constants-Ds-UekRh.js";import"./feature-detection-Cxj81Y1H.js";import"./utils-DU-9AqTO.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BcVD1OXH.js";import"./focus-indicator-CoBrh689.js";function t(n){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:c}),`
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
`]})]})}function R(n={}){const{wrapper:i}={...s(),...n.components};return i?e.jsx(i,{...n,children:e.jsx(t,{...n})}):t(n)}export{R as default};
