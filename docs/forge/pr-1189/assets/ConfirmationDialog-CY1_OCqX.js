import{u as n,j as e,M as r,T as s,C as l}from"./blocks-fUy4QAFv.js";import{C as a}from"./CustomArgTypes-CagqRkLp.js";import{C as c,D as d}from"./ConfirmationDialog.stories-DzD9Cwm5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CtUy9-VI.js";import"./iframe-DhPPATOI.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BUEgyQuR.js";import"./ref-BhDBbNSW.js";import"./base-lit-element-HaqO9pkv.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-gy1PbA1l.js";import"./property-Dg1Vmfps.js";import"./base-button-DXDc4OJ8.js";import"./icon-DaCKLlYs.js";import"./constants-BPFI0b36.js";import"./feature-detection-Q4q-Y4Ic.js";import"./state-Co1I3z7K.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CbIWIoQU.js";import"./dom-utils-Dwl6Rho5.js";import"./utils-DrKqfkBZ.js";import"./focus-indicator-Cy6URCXv.js";import"./state-layer-D75fz-rw.js";import"./base-component-RfQ5fKAq.js";import"./base-adapter-CdkfKU0P.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./style-map-CcP_kdqL.js";import"./when-CI7b_ccM.js";import"./button-D5tK2bf-.js";import"./class-map-CEQgffN4.js";import"./button-constants-G4LMDyUn.js";import"./circular-progress-D4RaVrYZ.js";import"./with-element-internals-CFSngiIf.js";import"./dialog-DGghfkK0.js";import"./backdrop-Cme44_g_.js";import"./dismissible-stack-Hc6LlN2C.js";import"./icon-button-C2v-Sinx.js";import"./icon-button-constants-CAk_t8Bl.js";function t(o){const i={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
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
