import{j as e}from"./jsx-runtime-DfrqbXH_.js";import{u as n}from"./index-BsVUS_jo.js";import{M as r,T as s,C as l}from"./index-mcgZeQbb.js";import{C as c}from"./CustomArgTypes-BY4Nkdeq.js";import{T as d,D as a}from"./TimePicker.stories-Cf2OEOea.js";import"./iframe-BOEhyfvW.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-CprCEKh8.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./time-picker-DZzm7Dc4.js";import"./index-nygIasyA.js";import"./index-W-tNKQGp.js";import"./base-adapter-CMsBmfZ6.js";import"./constants-Di1oYYV9.js";import"./index-Dh0vMUMR.js";import"./text-field-BKuxhRPG.js";import"./base-field-AvFiHmn9.js";import"./focus-indicator-jd-AY9Jk.js";import"./utils-BJArth1J.js";import"./label-sj17mrtY.js";import"./button-DIahYMuH.js";import"./icon-Cn5siE75.js";import"./state-layer-DzrxdbUp.js";import"./base-button-adapter-Cr9F1-bS.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-wOgqgTGi.js";import"./event-utils-DC3JW7a-.js";import"./button-toggle-group-BikuhhTp.js";import"./with-form-associated-DehBXl_-.js";import"./checkbox-D4e4C5g3.js";import"./icon-button-CcYkD_r5.js";import"./switch-z_rlF74_.js";import"./tooltip-DakFJcAJ.js";import"./overlay-CRRs1KxA.js";import"./with-longpress-listener-D0chuLy_.js";import"./dismissible-stack-BU50KYzw.js";import"./base-field-foundation-BNB-nXUj.js";import"./object-utils-BVOUzLua.js";import"./list-dropdown-yRzwa5tf.js";import"./linear-progress-De0XZzjv.js";import"./list-B8boNWcU.js";import"./popover-Dh31glfv.js";import"./skeleton-CbdcwsWz.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./dialog-B36BZilC.js";import"./backdrop-BPLpOU6H.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`]})]})}function ae(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{ae as default};
