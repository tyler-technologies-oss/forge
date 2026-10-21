import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-BjnIcTYW.js";import{n as c,t as l}from"./CustomArgTypes-DROUQxDe.js";import{n as u,r as d,t as f}from"./TimePicker.stories-Cniz3nwb.js";function p(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:u}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`The time picker component can be used to allow the user to enter a time manually, or to choose a time from the configurable dropdown list of suggestions. The built-in input mask is enabled by default, and will force users to enter a time in either 12 hour (default) or 24 hour formats.`}),`
`,(0,h.jsxs)(n.p,{children:[`This component is composable and only requires that an `,(0,h.jsx)(n.code,{children:`<input>`}),` element be provided as one of its children. It's common that the component wraps a text-field component to provide the Forge look-and-feel, but it can technically attach itself to any instance of a child `,(0,h.jsx)(n.code,{children:`<input>`}),` element.`]}),`
`,(0,h.jsxs)(n.blockquote,{children:[`
`,(0,h.jsxs)(n.p,{children:[(0,h.jsx)(n.strong,{children:`Important`}),`: all communication with this component through its APIs, such as getting/setting value or listen for change events `,(0,h.jsx)(n.strong,{children:`must`}),` be in 24 hour time format. Ex. "15:30".`]}),`
`,(0,h.jsx)(n.p,{children:`This is to ensure that a compatible format is used in all locales, as well as to provide a uniform way to interact with the component.`}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`example`,children:`Example`}),`
`,(0,h.jsxs)(n.p,{children:[`Values should `,(0,h.jsx)(n.strong,{children:`always`}),` be set through the `,(0,h.jsx)(n.code,{children:`<forge-time-picker>`}),` element, `,(0,h.jsx)(n.strong,{children:`not`}),` the `,(0,h.jsx)(n.code,{children:`<input>`}),` element.`]}),`
`,(0,h.jsxs)(n.p,{children:[`You can still use attributes such as `,(0,h.jsx)(n.code,{children:`placeholder`}),` on the `,(0,h.jsx)(n.code,{children:`<input>`}),` but things like `,(0,h.jsx)(n.code,{children:`value`}),`, `,(0,h.jsx)(n.code,{children:`disabled`}),`, `,(0,h.jsx)(n.code,{children:`min`}),`, and `,(0,h.jsx)(n.code,{children:`max`}),` should be set on the `,(0,h.jsx)(n.code,{children:`<forge-time-picker>`}),` element itself.`]}),`
`,(0,h.jsxs)(n.p,{children:[(0,h.jsx)(n.strong,{children:`Note`}),`: When used in a form where you want the date to be required, you must set the `,(0,h.jsx)(n.code,{children:`required`}),` property on the embedded `,(0,h.jsx)(n.code,{children:`<forge-text-field>`}),` element, rather than the `,(0,h.jsx)(n.code,{children:`<forge-time-picker>`}),` element. This also applies to the invalid property.`]}),`
`,(0,h.jsx)(a,{of:f}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`When using a screen reader, ensure keyboard navigation in the dropdown list is announced.`}),`
`,(0,h.jsxs)(n.li,{children:[`Be sure that you add the proper `,(0,h.jsx)(n.code,{children:`aria-label`}),` to the `,(0,h.jsx)(n.code,{children:`<input>`}),` element if not using a `,(0,h.jsx)(n.code,{children:`<label>`}),` element with a `,(0,h.jsx)(n.code,{children:`for`}),` attribute.`]}),`
`,(0,h.jsxs)(n.li,{children:[`The time-picker component will add the following ARIA attributes to the `,(0,h.jsx)(n.code,{children:`<input>`}),` element for you:`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:(0,h.jsx)(n.code,{children:`aria-live`})}),`
`,(0,h.jsx)(n.li,{children:(0,h.jsx)(n.code,{children:`aria-atomic`})}),`
`,(0,h.jsx)(n.li,{children:(0,h.jsx)(n.code,{children:`aria-haspopup`})}),`
`,(0,h.jsx)(n.li,{children:(0,h.jsx)(n.code,{children:`aria-expanded`})}),`
`,(0,h.jsx)(n.li,{children:(0,h.jsx)(n.code,{children:`aria-owns`})}),`
`,(0,h.jsx)(n.li,{children:(0,h.jsx)(n.code,{children:`aria-disabled`})}),`
`]}),`
`]}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};