import{j as e}from"./jsx-runtime-0BvT2Uhu.js";import{u as r}from"./index-DVrXV6f9.js";import{ae as a,af as l,ag as n}from"./index-Cg4z2Zqo.js";import{C as c}from"./CustomArgTypes-D1-FPOup.js";import{L as d,I as m,N as p,a as h,A as x,W as j}from"./Label.stories-DR12cNnc.js";import{L as g}from"./label-BzpargFq.js";import"./iframe-Ccrvotme.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-DnAZaZRm.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./index-ByifSpfC.js";import"./icon-DHpZ4R73.js";import"./constants-DjE6emXm.js";import"./base-adapter-F7QHxK2H.js";import"./index-Dh0vMUMR.js";import"./button-CoZ69e4-.js";import"./focus-indicator-BpCDYqsq.js";import"./state-layer-DkOkOFSZ.js";import"./base-button-adapter-BVW_ZDRM.js";import"./with-label-aware-CLWydNrR.js";import"./with-default-aria-B4PYKb3X.js";import"./button-toggle-group-pGGDU2pF.js";import"./with-form-associated-w46sHrbT.js";import"./checkbox-Dsowcwzy.js";import"./icon-button-B5lcHsAP.js";import"./switch-DwfRMwQ7.js";import"./decorators-EVhofM2Q.js";function s(o){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(l,{}),`
`,e.jsxs(t.p,{children:[`The Forge Label component is used to associate a text label with a compatible Forge component. This component can be used in place of the
standard HTML `,e.jsx(t.code,{children:"<label>"})," element to provide an accessible label, as well as the correct typography."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"<forge-label>"})," element can ",e.jsx(t.strong,{children:"only"})," be associated with specific Forge elements. The following elements are considered label aware:"]}),`
`,e.jsx("ul",{style:{marginBottom:"48px"},children:g.labelableChildSelectors.map(i=>e.jsx(t.li,{children:e.jsxs(t.code,{children:["<",i,">"]})},i))}),`
`,e.jsx(t.h2,{id:"examples",children:"Examples"}),`
`,e.jsx(t.h3,{id:"id-associated",children:"ID Associated"}),`
`,e.jsxs(t.p,{children:["You can explicitly associate the label with an element by providing the ",e.jsx(t.code,{children:"for"})," attribute with the ",e.jsx(t.code,{children:"id"})," of the associated element."]}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(t.h3,{id:"nested",children:"Nested"}),`
`,e.jsx(t.p,{children:"You can nest the associated element within the label component for implicit association."}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(t.h3,{id:"legend",children:"Legend"}),`
`,e.jsx(t.p,{children:"You can also use the label component as a legend for a radio group."}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h3,{id:"aligned-list",children:"Aligned List"}),`
`,e.jsx(t.p,{children:"Aligning labels with their associated element in a list format is a common UI pattern."}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(t.h3,{id:"with-icon-button",children:"With Icon Button"}),`
`,e.jsx(t.p,{children:"You can also label icon buttons, and provide some custom styling to create a common design pattern."}),`
`,e.jsx(n,{of:j}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{})]})}function K(o={}){const{wrapper:t}={...r(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(s,{...o})}):s(o)}export{K as default};
