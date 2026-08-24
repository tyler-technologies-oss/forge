import{u as s,j as e,M as r,T as c,C as t}from"./blocks-g3JYf6KR.js";import{C as a}from"./CustomArgTypes-CpxwWQaS.js";import{O as d,D as l,W as p,T as h,a as m,G as x}from"./Option.stories-BmNt_ktD.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CdbO8ZWL.js";import"./utils-CjnDZgMw.js";import"./service-adapter-8tADcN_b.js";import"./tyler-icons-CP3IuoxV.js";import"./utils-CjYv_z18.js";import"./base-lit-element-C3hu__mR.js";import"./directive-CwRn8Fwj.js";import"./constants-B0fflZN8.js";import"./feature-detection-DY5_mT0R.js";import"./style-map-GYvMt1fF.js";import"./option-group-BPrct8lp.js";import"./consume-C-3suYJo.js";import"./state-DRVGkA82.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./class-map-B443CMvP.js";import"./a11y-utils-CFmkCOLc.js";import"./dom-utils-D0uG6d5z.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-CP_rFuyY.js";import"./state-layer-BkRErCgp.js";import"./base-component-DdGiO9ZD.js";import"./base-adapter-CbRstNNQ.js";import"./event-utils-zQ4FLDwK.js";import"./focus-group-BBuA2mQJ.js";import"./key-action-lsAysfb-.js";function i(o){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(c,{}),`
`,e.jsxs(n.p,{children:[`Options represent individual selectable items within a
`,e.jsx(n.a,{href:"?path=/docs/components-listbox--docs",children:"<forge-listbox>"}),`,
`,e.jsx(n.a,{href:"?path=/docs/components-select--docs",children:"<forge-select>"}),`, or
`,e.jsx(n.a,{href:"?path=/docs/components-menu--docs",children:"<forge-menu>"})," component."]}),`
`,e.jsx(t,{of:l}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Depending on context the ",e.jsx(n.code,{children:"<forge-option>"}),` component may function as a declarative or
config-based component. When used within a `,e.jsx(n.code,{children:"<forge-listbox>"}),` an option renders to the DOM like any
other element and may be styled and manipulated directly. In any other context the option does not
render anything to the DOM and is instead used as a configuration object by the parent component.`]}),`
`]}),`
`,e.jsx(n.h2,{id:"icons",children:"Icons"}),`
`,e.jsxs(n.p,{children:["Icons can be added to an option by using the ",e.jsx(n.code,{children:"start"})," or ",e.jsx(n.code,{children:"end"})," slots."]}),`
`,e.jsx(t,{of:p}),`
`,e.jsx(n.h2,{id:"two-line--three-line",children:"Two Line & Three Line"}),`
`,e.jsxs(n.p,{children:["Options can display additional supporting text by using the ",e.jsx(n.code,{children:"secondary"})," and ",e.jsx(n.code,{children:"tertiary"}),` slots along
with the `,e.jsx(n.code,{children:"two-line"})," or ",e.jsx(n.code,{children:"three-line"}),` attributes. This is useful when you need to provide additional
context or details about an option. Keep additional text succinct so users of assistive technologies
can easily understand it.`]}),`
`,e.jsx(t,{of:h}),`
`,e.jsx(t,{of:m}),`
`,e.jsx(n.h2,{id:"option-groups",children:"Option Groups"}),`
`,e.jsxs(n.p,{children:["Related options can be grouped together with a label by using the ",e.jsx(n.code,{children:"<forge-option-group>"}),` component.
Provide the group's label via the `,e.jsx(n.code,{children:"label"})," slot."]}),`
`,e.jsx(t,{of:x}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Options automatically apply the appropriate ",e.jsx(n.code,{children:"role"}),", ",e.jsx(n.code,{children:"aria-selected"}),", or ",e.jsx(n.code,{children:"aria-checked"}),` attributes
based on their selection state and whether they are being used within a single or multiple
selection container.`]}),`
`]})]})}function H(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{H as default};
