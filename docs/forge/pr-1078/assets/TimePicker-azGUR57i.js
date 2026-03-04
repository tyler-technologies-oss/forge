import{j as e,M as r,T as s,C as l}from"./blocks-BGXNjPUL.js";import{useMDXComponents as n}from"./index-C9aBCO2c.js";import{C as c}from"./CustomArgTypes-DKQaY4X4.js";import{T as d,D as a}from"./TimePicker.stories-CDVl4mO4.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-6jvvl83j.js";import"./utils-BQsOXphk.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-DRhXxEw0.js";import"./base-component-B5xZY7DP.js";import"./dom-utils-CBD4z_3d.js";import"./feature-detection-DBnB2p_f.js";import"./base-adapter-DZ7lVcI0.js";import"./tyler-icons-_ZRRE207.js";import"./base-lit-element-DuNePglZ.js";import"./constants-uy-3DCWv.js";import"./base-field-Zo4to8fb.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./focus-indicator-uWMef9QC.js";import"./utils-DU-9AqTO.js";import"./label-DeJt3_F9.js";import"./button-gG20MWYF.js";import"./state-layer-CDycYdPe.js";import"./base-button-core-l79ZJf1a.js";import"./with-label-aware-rB4nYfN7.js";import"./with-default-aria-qCwd8R18.js";import"./a11y-utils-OON17uxD.js";import"./button-toggle-group-BEE-9owA.js";import"./with-form-associated-FNJFgCdg.js";import"./checkbox-C-zSna6d.js";import"./icon-button-Bs31_lcM.js";import"./switch-DDhwKpy9.js";import"./tooltip-D6IG9xiN.js";import"./overlay-CeKA2Vs0.js";import"./with-longpress-listener-CURrVc38.js";import"./dismissible-stack-xq-0Rg1q.js";import"./time-picker-BPPZGqC1.js";import"./list-dropdown-CYOM7X8_.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-DAF_c_Qg.js";import"./list-n8XxbbWm.js";import"./event-utils-zQ4FLDwK.js";import"./popover-DVUMrAH6.js";import"./skeleton-BEzRyBrd.js";import"./a11y-BxM9_46k.js";import"./dialog-CMWG5v4z.js";import"./backdrop-JQaHonK5.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`]})]})}function se(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{se as default};
