import{j as e,M as r,T as l,C as t}from"./blocks-DcRyP5Ss.js";import{useMDXComponents as a}from"./index-SWDs369O.js";import{L as c}from"./label-BPjNpw35.js";import{C as d}from"./CssOnlyInformation-DA0Ndmti.js";import{C as m}from"./CustomArgTypes-CE7dKsW7.js";import{L as p,I as h,N as x,a as j,A as f,W as g,C as u}from"./Label.stories-CyyBTx8I.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-D_kG7m72.js";import"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./button-CsHFOPZA.js";import"./icon-kuXwuZAY.js";import"./focus-indicator-CPljMOC1.js";import"./base-lit-element-BmBFkTWs.js";import"./utils-Bd6MGx91.js";import"./state-layer-BEEsPoZf.js";import"./base-button-adapter-DK_p4XA7.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./button-toggle-group-DrqjIWRe.js";import"./with-form-associated-DNJXxTFO.js";import"./checkbox-b-qwmjZR.js";import"./icon-button-B0OmNptN.js";import"./switch-D15P6oDe.js";import"./utils-SiGUGHhj.js";import"./class-map-B5wZ9hmU.js";import"./directive-CJw_OlP2.js";import"./decorators-TsuuGBd5.js";function s(o){const n={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",...a(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
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
