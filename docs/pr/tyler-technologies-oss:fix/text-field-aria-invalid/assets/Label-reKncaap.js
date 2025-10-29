import{j as e,M as r,T as l,C as t}from"./blocks-B2mrUp7O.js";import{useMDXComponents as a}from"./index-BAFzhEJw.js";import{L as c}from"./label-C-kHiLFY.js";import{C as d}from"./CssOnlyInformation-BvrtyzKs.js";import{C as m}from"./CustomArgTypes-DWe67STK.js";import{L as p,I as h,N as x,a as j,A as f,W as g,C as u}from"./Label.stories-C1b-7Nq9.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DI7yp4Es.js";import"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./button-CJ5YWwCL.js";import"./icon-kuXwuZAY.js";import"./focus-indicator-BC5BEuUe.js";import"./base-lit-element-DgmwIIiB.js";import"./utils-Bd6MGx91.js";import"./state-layer-gAgMwMHF.js";import"./base-button-adapter-Bhp_-T11.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./button-toggle-group-BAovUuzx.js";import"./with-form-associated-DNJXxTFO.js";import"./checkbox-DiSqW2_u.js";import"./icon-button-CQgGxtJo.js";import"./switch-Bin0Siuv.js";import"./utils-BwTYAoRH.js";import"./class-map-Ddhdmg3-.js";import"./directive-CJw_OlP2.js";import"./decorators-Dkt4QYLX.js";function s(o){const n={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",...a(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
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
