import{u as n,j as e,M as r,T as s,C as l}from"./blocks-lzQ4jgIO.js";import{C as a}from"./CustomArgTypes-iwKdrQ1x.js";import{C as c,D as d}from"./ConfirmationDialog.stories-sML5_5Vk.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cv18HVO7.js";import"./iframe-Y92HmdHZ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-DbbJplVM.js";import"./ref-C9xd_Bhv.js";import"./base-lit-element-DXQv51bq.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-8tADcN_b.js";import"./property-4XXebId8.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./style-map-CPyruTRu.js";import"./when-CI7b_ccM.js";import"./tyler-icons-SWWw4qdQ.js";import"./utils-DKysp6Us.js";import"./constants-D9XaGcQ2.js";import"./feature-detection-3Hxzrcpn.js";import"./button-BUQjmV8l.js";import"./base-component-eLLEz2pp.js";import"./base-adapter-BCJU7eTd.js";import"./dom-utils-DyV3Musz.js";import"./focus-indicator-CypHdldK.js";import"./utils-DU-9AqTO.js";import"./state-layer-C4o8tMgM.js";import"./base-button-core-Cs7r2nBO.js";import"./with-label-aware-v-rvTgpX.js";import"./with-default-aria-DvCryB8T.js";import"./a11y-utils-BNxJc0Sy.js";import"./button-constants-1yoxvAmM.js";import"./circular-progress-Bc1cF_P_.js";import"./dialog-C-zyrl9l.js";import"./backdrop-BlmHgV5b.js";import"./dismissible-stack-xq-0Rg1q.js";import"./icon-button-BG-KzVAg.js";import"./icon-button-constants-DmTas6I8.js";function t(o){const i={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
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
`]})]})}function Y(o={}){const{wrapper:i}={...n(),...o.components};return i?e.jsx(i,{...o,children:e.jsx(t,{...o})}):t(o)}export{Y as default};
