import{j as e}from"./jsx-runtime-B90IPUH6.js";import{u as n}from"./index-BmS3b3Pa.js";import{ae as r,af as s,ag as l}from"./index-BpDpOyso.js";import{C as c}from"./CustomArgTypes-D45OSR85.js";import{T as d,D as a}from"./TimePicker.stories-Dwrc-8YF.js";import"./iframe-IV-JUf41.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-CRuDW25z.js";import"./lit-element-Dk2-kgKT.js";import"./lit-html-DZH-Jm0H.js";import"./constants-DjE6emXm.js";import"./time-picker-CN45jZaB.js";import"./base-adapter-F7QHxK2H.js";import"./index-nygIasyA.js";import"./index-ByifSpfC.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./text-field-Mn1kp0eu.js";import"./base-field-D-7Ngroz.js";import"./label-BKvMlVMw.js";import"./button-C5f1g9CL.js";import"./icon-DHpZ4R73.js";import"./state-layer-DTKAXCUq.js";import"./base-button-adapter-WOmen6Ii.js";import"./with-label-aware-CLWydNrR.js";import"./with-default-aria-DCLjqsVH.js";import"./button-toggle-group-BJ7gYCrU.js";import"./with-form-associated-DjPnTr_x.js";import"./checkbox-DohAEIBZ.js";import"./icon-button-XdSjYqUR.js";import"./switch-BL3gYf9s.js";import"./tooltip-CoCQ3Otm.js";import"./overlay-DWm8nYOy.js";import"./with-longpress-listener-D-8wsf8o.js";import"./dismissible-stack-DoZLb9q6.js";import"./list-dropdown-IlYW5PKf.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-CcMix19v.js";import"./list-ePbvhvCk.js";import"./popover-tgjxHp7t.js";import"./skeleton-Cs99PVGD.js";import"./a11y-BxM9_46k.js";import"./dialog-CnAjkfPt.js";import"./backdrop-BKmy5m9d.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"The time picker component can be used to allow the user to enter a time manually, or to choose a time from the configurable dropdown list of suggestions. The built-in input mask is enabled by default, and will force users to enter a time in either 12 hour (default) or 24 hour formats."}),`
`,e.jsxs(t.p,{children:["This component is composable and only requires that an ",e.jsx(t.code,{children:"<input>"})," element be provided as one of its children. It's common that the component wraps a text-field component to provide the Forge look-and-feel, but it can technically attach itself to any instance of a child ",e.jsx(t.code,{children:"<input>"})," element."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Important"}),": all communication with this component through its APIs, such as getting/setting value or listen for change events ",e.jsx(t.strong,{children:"must"}),' be in 24 hour time format. Ex. "15:30".']}),`
`,e.jsx(t.p,{children:"This is to ensure that a compatible format is used in all locales, as well as to provide a uniform way to interact with the component."}),`
`]}),`
`,e.jsx(t.h2,{id:"example",children:"Example"}),`
`,e.jsxs(t.p,{children:["Values should ",e.jsx(t.strong,{children:"always"})," be set through the ",e.jsx(t.code,{children:"<forge-time-picker>"})," element, ",e.jsx(t.strong,{children:"not"})," the ",e.jsx(t.code,{children:"<input>"})," element."]}),`
`,e.jsxs(t.p,{children:["You can still use attributes such as ",e.jsx(t.code,{children:"placeholder"})," on the ",e.jsx(t.code,{children:"<input>"})," but things like ",e.jsx(t.code,{children:"value"}),", ",e.jsx(t.code,{children:"disabled"}),", ",e.jsx(t.code,{children:"min"}),", and ",e.jsx(t.code,{children:"max"})," should be set on the ",e.jsx(t.code,{children:"<forge-time-picker>"})," element itself."]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note"}),": When used in a form where you want the date to be required, you must set the ",e.jsx(t.code,{children:"required"})," property on the embedded ",e.jsx(t.code,{children:"<forge-text-field>"})," element, rather than the ",e.jsx(t.code,{children:"<forge-time-picker>"})," element. This also applies to the invalid property."]}),`
`,e.jsx(l,{of:a}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"When using a screen reader, ensure keyboard navigation in the dropdown list is announced."}),`
`,e.jsxs(t.li,{children:["Be sure that you add the proper ",e.jsx(t.code,{children:"aria-label"})," to the ",e.jsx(t.code,{children:"<input>"})," element if not using a ",e.jsx(t.code,{children:"<label>"})," element with a ",e.jsx(t.code,{children:"for"})," attribute."]}),`
`,e.jsxs(t.li,{children:["The time-picker component will add the following ARIA attributes to the ",e.jsx(t.code,{children:"<input>"})," element for you:",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-live"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-atomic"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-haspopup"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-expanded"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-owns"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-disabled"})}),`
`]}),`
`]}),`
`]})]})}function re(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{re as default};
