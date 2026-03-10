import{j as e,M as a,T as l,C as n}from"./blocks-Bj4UIZ3Q.js";import{useMDXComponents as r}from"./index-C-T8XxeZ.js";import{L as c}from"./label-DM98B8Eo.js";import{C as m}from"./CssOnlyInformation-CHbPFmZU.js";import{C as d}from"./CustomArgTypes-HIi5YJFX.js";import{L as p,I as h,N as x,a as j,A as f,W as g,C as u}from"./Label.stories-CfUlp1yq.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-FS6UuRTf.js";import"./base-component-D7FTQsYl.js";import"./service-adapter-8tADcN_b.js";import"./dom-utils-B5Tbf4eK.js";import"./base-adapter-D-ThygVj.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./index-DTwfV0k0.js";import"./button-CbbznlWX.js";import"./tyler-icons-iDvhFOMC.js";import"./focus-indicator-DXnp9Plt.js";import"./base-lit-element-rVPJIuYM.js";import"./directive-jorct-Oe.js";import"./utils-DU-9AqTO.js";import"./state-layer-D0PE-_Ks.js";import"./base-button-core-BolENla4.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-ee86JPIo.js";import"./a11y-utils-DBLgTZVa.js";import"./button-toggle-group-DtdFckgK.js";import"./with-form-associated-BeklrvsL.js";import"./checkbox-DJio2xZg.js";import"./icon-button-rbnRrweT.js";import"./switch-C1g5po_j.js";import"./utils-Dyztg_A4.js";import"./class-map-RGHtdqCY.js";import"./decorators-DgJ9C-Mf.js";function s(t){const o={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:p}),`
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
`,e.jsx(m,{})]})}function ee(t={}){const{wrapper:o}={...r(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(s,{...t})}):s(t)}export{ee as default};
