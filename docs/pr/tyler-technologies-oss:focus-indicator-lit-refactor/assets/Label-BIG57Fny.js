import{j as e,M as r,T as l,C as t}from"./blocks-Ci80t2jX.js";import{useMDXComponents as a}from"./index-Cqey9dI-.js";import{L as c}from"./label-DSbs6spH.js";import{C as d}from"./CssOnlyInformation-BkyooVeu.js";import{C as m}from"./CustomArgTypes-D5_RmmzV.js";import{L as p,I as h,N as x,a as j,A as f,W as g,C as u}from"./Label.stories-BmtJDeuI.js";import"./iframe-Cqs95LDf.js";import"./_commonjsHelpers-CqkleIqs.js";import"./constants-BGCYAxRd.js";import"./service-adapter-BykFeYYZ.js";import"./feature-detection-tRmgbRLz.js";import"./base-adapter-C0vShr2G.js";import"./index-CiLSBptl.js";import"./button-C8oqjrq6.js";import"./icon-eJOvSyyv.js";import"./focus-indicator-DoAi9By9.js";import"./base-lit-element-CfuWj_Vj.js";import"./utils-DY0XlZdW.js";import"./state-layer-BRTtEqto.js";import"./base-button-adapter-DmujTNGw.js";import"./with-label-aware-BxafsAK6.js";import"./with-default-aria-BuZDknr8.js";import"./a11y-utils-u_48QH_E.js";import"./button-toggle-group-BalQXvu-.js";import"./with-form-associated-DboGVkoL.js";import"./checkbox-CkpXn7kA.js";import"./icon-button-Cc-POQpg.js";import"./switch-5f4KoIm0.js";import"./utils-D0zOu5id.js";import"./class-map-D5pNGn4c.js";import"./directive-CJw_OlP2.js";import"./decorators-9JCBlFx2.js";function s(o){const n={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",...a(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
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
`,e.jsx(d,{})]})}function V(o={}){const{wrapper:n}={...a(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(s,{...o})}):s(o)}export{V as default};
