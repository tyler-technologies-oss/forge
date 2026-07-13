import{u as n,j as e,M as r,T as s,C as l}from"./blocks-sp9-iCm8.js";import{C as c}from"./CustomArgTypes-BHl2KbKq.js";import{T as d,D as a}from"./TimePicker.stories-Dmq1R733.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-D3Oii2TL.js";import"./utils-B3jYbaiS.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CYnraT90.js";import"./base-component-CYrqcnEP.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-Dc6xHI12.js";import"./tyler-icons-CWFKOemj.js";import"./base-lit-element-BK03A-go.js";import"./directive-CwRn8Fwj.js";import"./constants-NJSwOtlj.js";import"./feature-detection-3Hxzrcpn.js";import"./base-field-CR_hTikp.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./focus-indicator-BZl6qRLK.js";import"./utils-DxVSXevv.js";import"./label-DTIviHOl.js";import"./button-CSCDv7wg.js";import"./state-layer-RJ83GVyt.js";import"./base-button-core-CxgPNbXx.js";import"./with-label-aware-BNvgDdSc.js";import"./with-default-aria-DCkoNhES.js";import"./a11y-utils-DQoauvDo.js";import"./button-toggle-group-CZruN2gd.js";import"./with-form-associated-BgOjsLAv.js";import"./checkbox-DU0EpUEb.js";import"./icon-button-C1Zmz9J7.js";import"./switch-Cw2nKkSw.js";import"./tooltip-DeV8GtrX.js";import"./overlay-yYpcIpns.js";import"./with-longpress-listener-CBo4eBdm.js";import"./dismissible-stack-Cj5gwv2p.js";import"./time-picker-Bk2nVnhH.js";import"./list-dropdown-D4vE1vgw.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-DLb8lZjg.js";import"./list-BRTZHC4C.js";import"./event-utils-zQ4FLDwK.js";import"./popover-88j80EOP.js";import"./skeleton-DYD8m2j0.js";import"./a11y-BxM9_46k.js";import"./dialog-BAAkdPx4.js";import"./backdrop-Br-v5NXK.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
