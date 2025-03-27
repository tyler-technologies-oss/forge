import{j as e,M as r,T as s,C as l}from"./index-BKvspvr7.js";import{useMDXComponents as n}from"./index-BX2GV3qo.js";import{C as c}from"./CustomArgTypes-6MkDPcli.js";import{T as d,D as a}from"./TimePicker.stories-DH07H1cS.js";import"./iframe-CJnQ4-nt.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-CiMlxpQp.js";import"./lit-element-B3QVTycr.js";import"./lit-html-CuBe1DX_.js";import"./feature-detection-C61kIZu7.js";import"./time-picker-USraCwRB.js";import"./constants-DHnR0122.js";import"./base-adapter-B_B1W7NX.js";import"./index-nygIasyA.js";import"./index-RsKXMDm2.js";import"./utils-DXGAA5XK.js";import"./index-CiLSBptl.js";import"./text-field-BaC_G5Rf.js";import"./base-field-CbTrav_1.js";import"./focus-indicator-B_9E-jM6.js";import"./label-BftBTwPr.js";import"./button-DOA_SM9C.js";import"./icon-DNSPAaK0.js";import"./state-layer-DA2sYK0k.js";import"./base-button-adapter-Diqkx89j.js";import"./with-label-aware-CbEUrhML.js";import"./with-default-aria-COlelyab.js";import"./a11y-utils-CCSbmmS7.js";import"./button-toggle-group-JMDAjILZ.js";import"./with-form-associated-BgRoomBE.js";import"./checkbox-BwLNDz7l.js";import"./icon-button-BgvK8Gih.js";import"./switch-B2m0S8OE.js";import"./tooltip-C3leIcs0.js";import"./overlay-B56HkyOr.js";import"./with-longpress-listener-D4mCqU-o.js";import"./dismissible-stack-2hc7GWs9.js";import"./list-dropdown-DdyeeUcA.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-Brg7kVg_.js";import"./list-Bo9PHw-V.js";import"./popover-DYtj2Mty.js";import"./skeleton-Cfb12itF.js";import"./a11y-BxM9_46k.js";import"./dialog-BwC-zUyx.js";import"./backdrop-UaagznG1.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
