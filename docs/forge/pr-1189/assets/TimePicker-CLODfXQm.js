import{u as n,j as e,M as r,T as s,C as l}from"./blocks-BEkqHA1b.js";import{C as c}from"./CustomArgTypes-BFL-T1C8.js";import{T as d,D as a}from"./TimePicker.stories-DYNlmX1M.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BqGV7hdN.js";import"./iframe-BTsZxqzu.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-B0J9t6hU.js";import"./service-adapter-DlT-lJx7.js";import"./text-field-Ch1FWqHZ.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./tyler-icons-DhRbvloE.js";import"./property-DkOodoSL.js";import"./base-lit-element-fjOVRZ-k.js";import"./directive-CwRn8Fwj.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./base-field-CobvQUzz.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./focus-indicator-BxamY3-n.js";import"./utils-DxVSXevv.js";import"./label-OjWKjQls.js";import"./button-constants-Dh8wxsDb.js";import"./button-toggle-group-constants-D7W2mml0.js";import"./checkbox-constants-BwznIeqL.js";import"./icon-button-constants-wbi3a2tN.js";import"./switch-constants-CzmANmsv.js";import"./with-label-aware-BdoJiGXC.js";import"./icon-button-CSxHjIC-.js";import"./class-map-B2uIhfTt.js";import"./base-button-DyFlNd1j.js";import"./state-BuOq48og.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CUlOUJ7O.js";import"./state-layer-UyeTOOS1.js";import"./tooltip-DAcILSGy.js";import"./overlay-knVFCZgv.js";import"./with-longpress-listener--49psJKK.js";import"./dismissible-stack-Cj5gwv2p.js";import"./with-element-internals-BVdcaC_W.js";import"./time-picker-B_FvMdr4.js";import"./list-dropdown-DDfHHazV.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-VpC6qUWa.js";import"./list-DxnPa9SU.js";import"./list-item-BTfzPPjj.js";import"./event-utils-zQ4FLDwK.js";import"./popover-CdNzs7fC.js";import"./skeleton-DBZT6LKu.js";import"./a11y-BxM9_46k.js";import"./dialog-DxXf_Dbp.js";import"./backdrop-Dvs4MPLP.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`]})]})}function pe(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{pe as default};
