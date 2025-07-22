import{j as e,M as r,T as s,C as l}from"./blocks-BTp7l5NO.js";import{useMDXComponents as n}from"./index-cGhAmLir.js";import{C as c}from"./CustomArgTypes-CZQzHYhg.js";import{T as d,D as a}from"./TimePicker.stories-DGCadO3A.js";import"./iframe-DgPlgY2v.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-Bnph8n13.js";import"./feature-detection-uS6p5jc8.js";import"./time-picker-DjqM89li.js";import"./constants-wOq9K3uV.js";import"./base-adapter-Mla2Q9YN.js";import"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import"./utils-CRxrUqQD.js";import"./text-field-su1dEfif.js";import"./base-field-WJtNENB5.js";import"./focus-indicator-IWpzSXYP.js";import"./label-BSASIOtP.js";import"./button-r2EMLpWm.js";import"./state-layer-BFwsAUDA.js";import"./base-button-adapter-D0zqnDMQ.js";import"./with-label-aware-D31hYnqk.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./button-toggle-group-D5jBldBo.js";import"./with-form-associated-BeE6NBc1.js";import"./checkbox-DOmkbh7U.js";import"./icon-button-DkluvO-9.js";import"./switch-Bt2bdQXJ.js";import"./tooltip-CcxiN_AO.js";import"./overlay-D-bkGTD9.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-BdWcv7_4.js";import"./list-dropdown-C9nqfntS.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-2PahUgVv.js";import"./list-z5iQB-6r.js";import"./event-utils-zQ4FLDwK.js";import"./popover-xi3V_Oll.js";import"./skeleton-C4EH8VF8.js";import"./a11y-BxM9_46k.js";import"./dialog-JQ2PS6Se.js";import"./backdrop-BZvWLwDX.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`]})]})}function ee(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{ee as default};
