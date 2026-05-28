import{u as n,j as e,M as r,T as s,C as l}from"./blocks-BbM7jfTw.js";import{C as c}from"./CustomArgTypes-D1WY8d2w.js";import{T as d,D as a}from"./TimePicker.stories-3Kbb4NrF.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DV1hlnLt.js";import"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./text-field-B8VU0z8U.js";import"./base-component-CjLGUkBU.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-CWZvffxF.js";import"./tyler-icons-dYOWTbWz.js";import"./base-lit-element-aPt5fgOI.js";import"./directive-jorct-Oe.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./base-field-BOt13iVE.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./focus-indicator-CSOOyR2s.js";import"./utils-DU-9AqTO.js";import"./label-DX3CgxL3.js";import"./button-kyjDGESX.js";import"./state-layer-B-p_OOit.js";import"./base-button-core-tCgrodjZ.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-CU1tsccO.js";import"./a11y-utils-Cc0M_rsz.js";import"./button-toggle-group-Y_UO5Y63.js";import"./with-form-associated-Cz_4VqQM.js";import"./checkbox-DwRo2V7R.js";import"./icon-button-DIIeI-ib.js";import"./switch-DcW6YBn7.js";import"./tooltip-BDO8tOZg.js";import"./overlay-d7QE-4pI.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./time-picker-APmlOckJ.js";import"./list-dropdown-O2PjaE4W.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-BmTkV8LG.js";import"./list-D0b0vzIp.js";import"./event-utils-zQ4FLDwK.js";import"./popover-SVzeiRWo.js";import"./skeleton-D_iZGXuR.js";import"./a11y-BxM9_46k.js";import"./dialog-Di6dXOYv.js";import"./backdrop-B-u3npFo.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`]})]})}function le(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{le as default};
