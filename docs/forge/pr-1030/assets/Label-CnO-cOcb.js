import{j as e,M as a,T as l,C as n}from"./blocks-CB6G8EqC.js";import{useMDXComponents as r}from"./index-BH_PRZaW.js";import{L as c}from"./label-oHwFUDdN.js";import{C as m}from"./CssOnlyInformation-CG3yyQbM.js";import{C as d}from"./CustomArgTypes-CV06RZfE.js";import{L as p,I as h,N as x,a as j,A as f,W as g,C as u}from"./Label.stories-DRQfwPPz.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-PUzLLxEB.js";import"./base-component-DL0YqY-6.js";import"./service-adapter-8tADcN_b.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-BZsNucGb.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-BGj66c3W.js";import"./tyler-icons-DcY2CuEe.js";import"./base-lit-element-bSUihATO.js";import"./directive-jorct-Oe.js";import"./focus-indicator-CMiLXBO9.js";import"./utils-DU-9AqTO.js";import"./state-layer-CK5iHsfr.js";import"./base-button-core-DPJHz_tP.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-DIbVfoWG.js";import"./a11y-utils-5_BtrjMB.js";import"./button-toggle-group-BfspGbD2.js";import"./with-form-associated-C0Ge4dkG.js";import"./checkbox-DdAXeDFs.js";import"./icon-button-DeJJPiFP.js";import"./switch-CRTL5dTh.js";import"./utils-CAFI_ioD.js";import"./class-map-BPJG0j-K.js";import"./decorators-CYGD3-yd.js";function s(t){const o={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:p}),`
`,e.jsx(l,{}),`
`,e.jsxs(o.p,{children:[`The Forge Label component is used to associate a text label with a compatible Forge component. This component can be used in place of the
standard HTML `,e.jsx(o.code,{children:"<label>"})," element to provide an accessible label, as well as the correct typography."]}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"<forge-label>"})," element can ",e.jsx(o.strong,{children:"only"})," be associated with specific Forge elements. The following elements are considered label aware:"]}),`
`,e.jsx("ul",{style:{marginBottom:"48px"},children:c.labelableChildSelectors.map(i=>e.jsx("li",{children:e.jsxs("code",{children:["<",i,">"]})},i))}),`
`,e.jsx(o.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(o.h3,{id:"id-associated",children:"ID Associated"}),`
`,e.jsxs(o.p,{children:["You can explicitly associate the label with an element by providing the ",e.jsx(o.code,{children:"for"})," attribute with the ",e.jsx(o.code,{children:"id"})," of the associated element."]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(o.h3,{id:"nested",children:"Nested"}),`
`,e.jsx(o.p,{children:"You can nest the associated element within the label component for implicit association."}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(o.h3,{id:"legend",children:"Legend"}),`
`,e.jsx(o.p,{children:"You can also use the label component as a legend for a radio group."}),`
`,e.jsx(n,{of:j}),`
`,e.jsx(o.h3,{id:"aligned-list",children:"Aligned List"}),`
`,e.jsx(o.p,{children:"Aligning labels with their associated element in a list format is a common UI pattern."}),`
`,e.jsx(n,{of:f}),`
`,e.jsx(o.h3,{id:"with-icon-button",children:"With Icon Button"}),`
`,e.jsx(o.p,{children:"You can also label icon buttons, and provide some custom styling to create a common design pattern."}),`
`,e.jsx(n,{of:g}),`
`,e.jsx(o.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(o.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(o.p,{children:"The label component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(m,{})]})}function te(t={}){const{wrapper:o}={...r(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(s,{...t})}):s(t)}export{te as default};
