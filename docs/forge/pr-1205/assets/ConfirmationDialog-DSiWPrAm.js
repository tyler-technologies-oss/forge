import{u as n,j as e,M as r,T as s,C as l}from"./blocks-DZM-wJB8.js";import{C as a}from"./CustomArgTypes-B5wIhqi-.js";import{C as c,D as d}from"./ConfirmationDialog.stories-CopBm5HX.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Hi_y4FYo.js";import"./iframe-B7LxWkL4.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BgSSl4hg.js";import"./ref-BmR8d2q1.js";import"./base-lit-element-DD9dOWH-.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-DlT-lJx7.js";import"./property-CcTHpYbU.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./style-map-B4WdC4iL.js";import"./when-CI7b_ccM.js";import"./tyler-icons-qc11a4hp.js";import"./constants-Ds-UekRh.js";import"./feature-detection-Cxj81Y1H.js";import"./button-BT0VAunK.js";import"./class-map-Bp2Z4U3t.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-DEh1smym.js";import"./state-layer-BcVD1OXH.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./base-button-S35S97w6.js";import"./state-BcOT_HUv.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-a04gn1ZN.js";import"./button-constants-D5k34xES.js";import"./circular-progress-QjF0OwOx.js";import"./with-element-internals-CJt7fDtX.js";import"./dialog-qsRa4tTT.js";import"./backdrop-e4rWKi0D.js";import"./dismissible-stack-xq-0Rg1q.js";import"./icon-button-BsODWw2P.js";import"./icon-button-constants-BJvh1yHL.js";function t(o){const i={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
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
`]})]})}function Z(o={}){const{wrapper:i}={...n(),...o.components};return i?e.jsx(i,{...o,children:e.jsx(t,{...o})}):t(o)}export{Z as default};
