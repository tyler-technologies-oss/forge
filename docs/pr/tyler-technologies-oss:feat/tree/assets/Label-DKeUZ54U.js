import{j as e,M as a,T as l,C as n}from"./blocks-CVgyvBAc.js";import{useMDXComponents as r}from"./index-DIB8FTYC.js";import{L as c}from"./label-BtZLFMp2.js";import{C as d}from"./CssOnlyInformation-Da1dc8bs.js";import{C as m}from"./CustomArgTypes-dii0vyj4.js";import{L as p,I as h,N as x,a as j,A as f,W as g,C as u}from"./Label.stories-DZ46U5kr.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-aLJo785t.js";import"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-DTwfV0k0.js";import"./button-CAXl3FKc.js";import"./icon-Uwxy940_.js";import"./focus-indicator-BYHHNw4I.js";import"./property-Btdv5Qza.js";import"./base-lit-element-DUSJv6CV.js";import"./utils-Bd6MGx91.js";import"./state-layer-BEEsPoZf.js";import"./base-button-adapter-DnQ_SE31.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./button-toggle-group-cmFHWZcw.js";import"./with-form-associated-DNJXxTFO.js";import"./checkbox-DuE98e41.js";import"./icon-button-B9l1618B.js";import"./switch-im3giyJV.js";import"./utils-CWNZ6DqN.js";import"./class-map-DAgnoEt_.js";import"./directive-CJw_OlP2.js";import"./decorators-DRUNm1ly.js";function s(t){const o={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:p}),`
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
`,e.jsx(m,{}),`
`,e.jsx(o.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(o.p,{children:"The label component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(d,{})]})}function $(t={}){const{wrapper:o}={...r(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(s,{...t})}):s(t)}export{$ as default};
