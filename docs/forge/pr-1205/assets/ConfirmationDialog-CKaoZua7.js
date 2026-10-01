import{u as r,j as e,M as n,T as s,C as l}from"./blocks-CUjya542.js";import{C as a}from"./CustomArgTypes-Cbgvurit.js";import{C as c,D as d}from"./ConfirmationDialog.stories-Dz-7zoUH.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DhaEe5HC.js";import"./iframe-BsWNYj34.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-DkXHK9oa.js";import"./ref-DGWPoFHa.js";import"./async-directive-CNb4_GPI.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-8tADcN_b.js";import"./property-DjxtPSwu.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./style-map-Be_PXAFo.js";import"./when-CI7b_ccM.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./tyler-icons-D62AQmQV.js";import"./base-lit-element-uFwdyarG.js";import"./button-CtcS03YF.js";import"./class-map-Bo5d0TOS.js";import"./utils-C31il88P.js";import"./focus-indicator-Bk7H1xfH.js";import"./floating-ui.dom-DaMtbvS2.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./icon-BUxeVNUp.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./dom-utils-BDbRr6KM.js";import"./base-component-BFu9bkgC.js";import"./base-button-B4XSMArk.js";import"./state-CbHYH1xk.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./button-constants-DRqTH6Pv.js";import"./circular-progress-BCp-Zc6w.js";import"./with-element-internals-CFYP_epH.js";import"./dialog-C4E5MayG.js";import"./backdrop-ngk7d2eo.js";import"./dismissible-stack-DyoP5jNB.js";import"./icon-button-Csig8kiH.js";import"./icon-button-constants-JHHxiN9v.js";function t(o){const i={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:c}),`
`,e.jsx(s,{}),`
`,e.jsx(i.p,{children:"A confirmation dialog is a modal component used to present users with a brief message or alert requiring their decision. It typically includes two actions:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:'Primary action – The main action that confirms the decision (e.g., "Delete", "Submit", "Confirm").'}),`
`,e.jsx(i.li,{children:'Secondary action – An alternative or dismissive action (e.g., "Cancel", "Go back"), allowing users to exit without proceeding.'}),`
`]}),`
`,e.jsx(i.p,{children:"For succinct alerts (one sentence or less), the dialog title is usually omitted to maintain a clean and focused UI. However, for longer messages or critical actions, a title can provide additional clarity."}),`
`,e.jsxs(i.blockquote,{children:[`
`,e.jsxs(i.p,{children:[e.jsx(i.strong,{children:"Note:"})," Confirmation dialogs display the same in mobile and desktop contexts."]}),`
`]}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The confirmation dialog component will add the ",e.jsx(i.code,{children:'role="dialog"'})," and ",e.jsx(i.code,{children:'aria-modal="true"'})," attribute for you."]}),`
`,e.jsxs(i.li,{children:["Be sure to set the ",e.jsx(i.code,{children:"label"})," and ",e.jsx(i.code,{children:"description"})," attributes on the ",e.jsx(i.code,{children:"<forge-confirmation-dialog>"})," element if needed.",`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"This will allow for a screen reader to properly announce the dialog title and description when it opens."}),`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"aria-labelledby"})," and ",e.jsx(i.code,{children:"aria-describedby"})," attributes will be set automatically for you based on the ",e.jsx(i.code,{children:"label"})," and ",e.jsx(i.code,{children:"description"})," attributes. If no ",e.jsx(i.code,{children:"label"})," or ",e.jsx(i.code,{children:"description"})," is provided, the component will automatically set these to the content of the title slot and message slot."]}),`
`]}),`
`]}),`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"busyLabel"})," property allows you to customize the aria-label of the ",e.jsx(i.code,{children:"forge-circular-progress"})," that becomes visible when ",e.jsx(i.code,{children:"isBusy"}),` is set to true. By default this will announce the word "loading" to the screenreader. It's recommended you set this to a more descriptive value based on the context of your application.`]}),`
`]})]})}function le(o={}){const{wrapper:i}={...r(),...o.components};return i?e.jsx(i,{...o,children:e.jsx(t,{...o})}):t(o)}export{le as default};
