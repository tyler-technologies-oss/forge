import{j as e,M as r,T as l,C as t}from"./blocks-9l-d2DJv.js";import{useMDXComponents as a}from"./index-DemGgAEd.js";import{L as c}from"./label-D5DFhyNo.js";import{C as d}from"./CssOnlyInformation-C0aT0WHR.js";import{C as m}from"./CustomArgTypes-DoC-COyi.js";import{L as p,I as h,N as x,a as j,A as f,W as g,C as u}from"./Label.stories-BtxF_7yQ.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BFlAyfIN.js";import"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./button-BJzpnrOc.js";import"./icon-kuXwuZAY.js";import"./focus-indicator-yFQbMPVG.js";import"./base-lit-element-MJT3RFU7.js";import"./utils-Bd6MGx91.js";import"./state-layer-gAgMwMHF.js";import"./base-button-adapter-CA8DBOGE.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./button-toggle-group-DIqjWydJ.js";import"./with-form-associated-DNJXxTFO.js";import"./checkbox-jQVuQOxP.js";import"./icon-button-DlbKyjJp.js";import"./switch-DguidbhN.js";import"./utils-C83vs9tY.js";import"./class-map-BLl4-78s.js";import"./directive-CJw_OlP2.js";import"./decorators-B_kqXN_e.js";function s(o){const n={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",...a(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
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
