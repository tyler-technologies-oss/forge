import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-fd9Z3xSU.js";import{n as c,t as l}from"./CustomArgTypes-Cnceb5ig.js";import{n as u,r as d,t as f}from"./ConfirmationDialog.stories-DMRGy_Sv.js";function p(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`A confirmation dialog is a modal component used to present users with a brief message or alert requiring their decision. It typically includes two actions:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`Primary action – The main action that confirms the decision (e.g., "Delete", "Submit", "Confirm").`}),`
`,(0,h.jsx)(n.li,{children:`Secondary action – An alternative or dismissive action (e.g., "Cancel", "Go back"), allowing users to exit without proceeding.`}),`
`]}),`
`,(0,h.jsx)(n.p,{children:`For succinct alerts (one sentence or less), the dialog title is usually omitted to maintain a clean and focused UI. However, for longer messages or critical actions, a title can provide additional clarity.`}),`
`,(0,h.jsxs)(n.blockquote,{children:[`
`,(0,h.jsxs)(n.p,{children:[(0,h.jsx)(n.strong,{children:`Note:`}),` Confirmation dialogs display the same in mobile and desktop contexts.`]}),`
`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`The confirmation dialog component will add the `,(0,h.jsx)(n.code,{children:`role="dialog"`}),` and `,(0,h.jsx)(n.code,{children:`aria-modal="true"`}),` attribute for you.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Be sure to set the `,(0,h.jsx)(n.code,{children:`label`}),` and `,(0,h.jsx)(n.code,{children:`description`}),` attributes on the `,(0,h.jsx)(n.code,{children:`<forge-confirmation-dialog>`}),` element if needed.`,`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`This will allow for a screen reader to properly announce the dialog title and description when it opens.`}),`
`,(0,h.jsxs)(n.li,{children:[`The `,(0,h.jsx)(n.code,{children:`aria-labelledby`}),` and `,(0,h.jsx)(n.code,{children:`aria-describedby`}),` attributes will be set automatically for you based on the `,(0,h.jsx)(n.code,{children:`label`}),` and `,(0,h.jsx)(n.code,{children:`description`}),` attributes. If no `,(0,h.jsx)(n.code,{children:`label`}),` or `,(0,h.jsx)(n.code,{children:`description`}),` is provided, the component will automatically set these to the content of the title slot and message slot.`]}),`
`]}),`
`]}),`
`,(0,h.jsxs)(n.li,{children:[`The `,(0,h.jsx)(n.code,{children:`busyLabel`}),` property allows you to customize the aria-label of the `,(0,h.jsx)(n.code,{children:`forge-circular-progress`}),` that becomes visible when `,(0,h.jsx)(n.code,{children:`isBusy`}),` is set to true. By default this will announce the word "loading" to the screenreader. It's recommended you set this to a more descriptive value based on the context of your application.`]}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};