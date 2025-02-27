import{j as e,M as r,T as s,C as l}from"./index-D8Y1Xo_F.js";import{useMDXComponents as n}from"./index-tWRZnc61.js";import{C as c}from"./CustomArgTypes-BwwbQ9aG.js";import{T as d,D as a}from"./TimePicker.stories-iNXQrxnA.js";import"./iframe-C3TB-rMS.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-BbKlM6X4.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./feature-detection-DRCh51Sa.js";import"./time-picker-D7x_69LE.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./index-nygIasyA.js";import"./index-ByifSpfC.js";import"./focus-indicator-DzT8BbE-.js";import"./index-BmocOEUj.js";import"./text-field-C35tonN9.js";import"./base-field-62l2GfBK.js";import"./label-BV_ZyirU.js";import"./button-DaDzbT7D.js";import"./icon-DB7kP3Ec.js";import"./state-layer-IxmMcKDT.js";import"./base-button-adapter-CyoupZ7K.js";import"./with-label-aware-OEbK3wHg.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./button-toggle-group-BMa49BMk.js";import"./with-form-associated-Bje5Hee1.js";import"./checkbox-DKABHoWa.js";import"./icon-button-Cj-mvUQ9.js";import"./switch-BXC-NkYO.js";import"./tooltip-BEr6TQlq.js";import"./overlay-es9tef1H.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-C80072oY.js";import"./list-dropdown-DfIaHUdb.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-CqfIuBkR.js";import"./list-ByS02Pjt.js";import"./popover-CUMSy1gT.js";import"./skeleton-D2S3-1Sc.js";import"./a11y-BxM9_46k.js";import"./dialog-DJHwpo_v.js";import"./backdrop-CpAR1sZH.js";function o(i){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
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
`]})]})}function ne(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{ne as default};
