import{j as e,M as r,T as s,C as l}from"./blocks-Bndd5Oxj.js";import{useMDXComponents as n}from"./index-Bf16K-1_.js";import{C as c}from"./CustomArgTypes-B5dE_4Sf.js";import{T as d,D as a}from"./TimePicker.stories-DqCNEhBc.js";import"./iframe-B_AFpbKZ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-D0zOu5id.js";import"./service-adapter-BykFeYYZ.js";import"./time-picker-D74lFKBf.js";import"./constants-BGCYAxRd.js";import"./feature-detection-tRmgbRLz.js";import"./base-adapter-C0vShr2G.js";import"./icon-eJOvSyyv.js";import"./index-CiLSBptl.js";import"./utils-DY0XlZdW.js";import"./text-field-Ckbn5Mre.js";import"./base-field-CspDK4qd.js";import"./focus-indicator-CyTlhlQD.js";import"./base-lit-element-BpAYiqWS.js";import"./label-8C4joo3A.js";import"./button-BjTHYlPk.js";import"./state-layer-BRTtEqto.js";import"./base-button-adapter-DZFUByYn.js";import"./with-label-aware-BxafsAK6.js";import"./with-default-aria-BuZDknr8.js";import"./a11y-utils-u_48QH_E.js";import"./button-toggle-group-BkTZIXUI.js";import"./with-form-associated-DboGVkoL.js";import"./checkbox-BwaxslW8.js";import"./icon-button-U4pg755t.js";import"./switch-BxEMfYtZ.js";import"./tooltip-CRaofu57.js";import"./overlay-DWLd4_Vp.js";import"./with-longpress-listener--RsduI3u.js";import"./dismissible-stack-Bl2voxQy.js";import"./list-dropdown-CwF34gqt.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-BTaob5x2.js";import"./list-BKcKppFQ.js";import"./event-utils-zQ4FLDwK.js";import"./popover-BWs500m1.js";import"./skeleton-fsmWNbya.js";import"./a11y-BxM9_46k.js";import"./dialog-bZFrz6KW.js";import"./backdrop-BqEK3-r8.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`]})]})}function ie(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{ie as default};
