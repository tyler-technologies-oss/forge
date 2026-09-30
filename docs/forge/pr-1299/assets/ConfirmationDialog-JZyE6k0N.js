import{u as r,j as e,M as n,T as s,C as l}from"./blocks-TdDcfZjo.js";import{C as a}from"./CustomArgTypes-tx3tljlX.js";import{C as c,D as d}from"./ConfirmationDialog.stories-ChGOScAc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-PWInALzp.js";import"./iframe-3UUTJgvy.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BUwrw5lO.js";import"./ref-DlnAFypT.js";import"./async-directive-iSfvkVbv.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-8tADcN_b.js";import"./property-06P2Zztu.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./style-map-Bd7m4KTb.js";import"./when-CI7b_ccM.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./tyler-icons-CA7Bw7CG.js";import"./base-lit-element-D5zFxEE6.js";import"./button-DH6t8nYG.js";import"./class-map-Dli6-7pD.js";import"./utils-C31il88P.js";import"./focus-indicator-DfyOOFaI.js";import"./floating-ui.dom-DaMtbvS2.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./icon-aW4TmUba.js";import"./constants-Bm8g2CKk.js";import"./state-layer-CZIH5add.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./dom-utils-BDbRr6KM.js";import"./base-component-BFu9bkgC.js";import"./base-button-D8AI5zd6.js";import"./state-DVIz8d0y.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./button-constants-B9P9oolT.js";import"./circular-progress-CfoxEQ_B.js";import"./with-element-internals-DsIdl_YT.js";import"./dialog-thBFnlfL.js";import"./backdrop-C9lBlb_d.js";import"./dismissible-stack-DyoP5jNB.js";import"./icon-button-Co9D746x.js";import"./icon-button-constants-DWfjKRvV.js";function t(o){const i={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:c}),`
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
`]})]})}function se(o={}){const{wrapper:i}={...r(),...o.components};return i?e.jsx(i,{...o,children:e.jsx(t,{...o})}):t(o)}export{se as default};
