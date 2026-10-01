import{u as s,j as e,M as r,T as c,C as t}from"./blocks-CUjya542.js";import{C as d}from"./CustomArgTypes-Cbgvurit.js";import{O as a,D as p,W as l,T as h,a as m,G as x}from"./Option.stories-DqRBHF_V.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DhaEe5HC.js";import"./iframe-BsWNYj34.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-DkXHK9oa.js";import"./service-adapter-8tADcN_b.js";import"./icon-BUxeVNUp.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-DjxtPSwu.js";import"./base-lit-element-uFwdyarG.js";import"./async-directive-CNb4_GPI.js";import"./directive-CwRn8Fwj.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./tyler-icons-D62AQmQV.js";import"./style-map-Be_PXAFo.js";import"./listbox-D4mRABlT.js";import"./provide-CZDhzwTe.js";import"./consume-DtITIqjN.js";import"./custom-element-C-crYl4r.js";import"./a11y-utils-DssnAab5.js";import"./dom-utils-BDbRr6KM.js";import"./event-utils-zQ4FLDwK.js";import"./focus-group-CFQOf4z4.js";import"./key-action-lsAysfb-.js";import"./utils-C31il88P.js";import"./option-Cy1-rc0E.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./class-map-Bo5d0TOS.js";import"./context-root-BrWOZWcP.js";import"./state-CbHYH1xk.js";import"./focus-indicator-Bk7H1xfH.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./base-component-BFu9bkgC.js";function i(n){const o={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a}),`
`,e.jsx(c,{}),`
`,e.jsxs(o.p,{children:[`Options represent individual selectable items within a
`,e.jsx(o.a,{href:"?path=/docs/components-listbox--docs",children:"<forge-listbox>"}),`,
`,e.jsx(o.a,{href:"?path=/docs/components-select--docs",children:"<forge-select>"}),`, or
`,e.jsx(o.a,{href:"?path=/docs/components-menu--docs",children:"<forge-menu>"})," component."]}),`
`,e.jsx(t,{of:p}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Note:"})," Depending on context the ",e.jsx(o.code,{children:"<forge-option>"}),` component may function as a rendered or
config-based component. When used within a `,e.jsx(o.code,{children:"<forge-listbox>"}),` an option renders to the DOM like any
other element and may be styled and manipulated directly. In any other context the option does not
render anything to the DOM and is instead used as a configuration object by the parent component.`]}),`
`]}),`
`,e.jsx(o.h2,{id:"icons",children:"Icons"}),`
`,e.jsxs(o.p,{children:["Icons can be added to an option by using the ",e.jsx(o.code,{children:"start"})," or ",e.jsx(o.code,{children:"end"})," slots."]}),`
`,e.jsx(t,{of:l}),`
`,e.jsx(o.h2,{id:"two-line--three-line",children:"Two Line & Three Line"}),`
`,e.jsxs(o.p,{children:["Options can display additional supporting text by using the ",e.jsx(o.code,{children:"secondary"})," and ",e.jsx(o.code,{children:"tertiary"}),` slots along
with the `,e.jsx(o.code,{children:"two-line"})," or ",e.jsx(o.code,{children:"three-line"}),` attributes. This is useful when you need to provide additional
context or details about an option. Keep additional text succinct so users of assistive technologies
can easily understand it.`]}),`
`,e.jsx(t,{of:h}),`
`,e.jsx(t,{of:m}),`
`,e.jsx(o.h2,{id:"option-groups",children:"Option Groups"}),`
`,e.jsxs(o.p,{children:["Related options can be grouped together with a label by using the ",e.jsx(o.code,{children:"<forge-option-group>"}),` component.
Provide the group's label via the `,e.jsx(o.code,{children:"label"})," slot."]}),`
`,e.jsx(t,{of:x}),`
`,e.jsx(o.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Options automatically apply the appropriate ",e.jsx(o.code,{children:"role"}),", ",e.jsx(o.code,{children:"aria-selected"}),", or ",e.jsx(o.code,{children:"aria-checked"}),` attributes
based on their selection state and whether they are being used within a single or multiple
selection container.`]}),`
`]})]})}function re(n={}){const{wrapper:o}={...s(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(i,{...n})}):i(n)}export{re as default};
