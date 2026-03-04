import{j as e,M as r,T as l,C as t}from"./blocks-B6IfbOFN.js";import{useMDXComponents as a}from"./index-D4mdMlJZ.js";import{L as c}from"./label-Kx1iPI1y.js";import{C as d}from"./CssOnlyInformation-BJHt0bLQ.js";import{C as m}from"./CustomArgTypes-D8ySLdyb.js";import{L as p,I as h,N as x,a as j,A as f,W as g,C as u}from"./Label.stories-DtgkBcez.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-D6-BN427.js";import"./base-component-DXuuJMhq.js";import"./service-adapter-8tADcN_b.js";import"./feature-detection-BkmzHgah.js";import"./base-adapter-Dwntuuli.js";import"./index-DTwfV0k0.js";import"./button-7INxEilv.js";import"./tyler-icons-BS8_pNWa.js";import"./focus-indicator-BY1zFJV4.js";import"./base-lit-element-kVsF_iwU.js";import"./utils-DU-9AqTO.js";import"./state-layer-Dr4I3-ea.js";import"./base-button-core-BM3obHE1.js";import"./with-label-aware-Bg6h2rtY.js";import"./with-default-aria-CXzIDxFk.js";import"./a11y-utils-DFScBSOY.js";import"./button-toggle-group-Cc7YegMF.js";import"./with-form-associated-Csw0cMu6.js";import"./checkbox-DV6DqneI.js";import"./icon-button-DRXv6M-B.js";import"./switch-Bl1uI7Wn.js";import"./utils-3yMKERXj.js";import"./class-map-CGeaCfCR.js";import"./directive-jorct-Oe.js";import"./decorators-BW47d2MY.js";function s(o){const n={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",...a(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
`,e.jsx(l,{}),`
`,e.jsxs(n.p,{children:[`The Forge Label component is used to associate a text label with a compatible Forge component. This component can be used in place of the
standard HTML `,e.jsx(n.code,{children:"<label>"})," element to provide an accessible label, as well as the correct typography."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-label>"})," element can ",e.jsx(n.strong,{children:"only"})," be associated with specific Forge elements. The following elements are considered label aware:"]}),`
`,e.jsx("ul",{style:{marginBottom:"48px"},children:c.labelableChildSelectors.map(i=>e.jsx("li",{children:e.jsxs("code",{children:["<",i,">"]})},i))}),`
`,e.jsx(n.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(n.h3,{id:"id-associated",children:"ID Associated"}),`
`,e.jsxs(n.p,{children:["You can explicitly associate the label with an element by providing the ",e.jsx(n.code,{children:"for"})," attribute with the ",e.jsx(n.code,{children:"id"})," of the associated element."]}),`
`,e.jsx(t,{of:h}),`
`,e.jsx(n.h3,{id:"nested",children:"Nested"}),`
`,e.jsx(n.p,{children:"You can nest the associated element within the label component for implicit association."}),`
`,e.jsx(t,{of:x}),`
`,e.jsx(n.h3,{id:"legend",children:"Legend"}),`
`,e.jsx(n.p,{children:"You can also use the label component as a legend for a radio group."}),`
`,e.jsx(t,{of:j}),`
`,e.jsx(n.h3,{id:"aligned-list",children:"Aligned List"}),`
`,e.jsx(n.p,{children:"Aligning labels with their associated element in a list format is a common UI pattern."}),`
`,e.jsx(t,{of:f}),`
`,e.jsx(n.h3,{id:"with-icon-button",children:"With Icon Button"}),`
`,e.jsx(n.p,{children:"You can also label icon buttons, and provide some custom styling to create a common design pattern."}),`
`,e.jsx(t,{of:g}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(m,{}),`
`,e.jsx(n.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(n.p,{children:"The label component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(t,{of:u}),`
`,e.jsx(d,{})]})}function Z(o={}){const{wrapper:n}={...a(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(s,{...o})}):s(o)}export{Z as default};
