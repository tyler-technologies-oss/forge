import{u as s,j as e,M as n,T as a,C as o}from"./blocks-D80V3pa1.js";import{C as l}from"./CustomArgTypes-BNqTz2Fd.js";import{C as p,D as d,W as c}from"./ChipField.stories-BONTtINf.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CjzVpfqS.js";import"./utils-Bqf6WcF-.js";import"./style-map-BHakPK_e.js";import"./directive-CwRn8Fwj.js";import"./ref-DDjPIlcr.js";import"./base-lit-element-D28pwoeu.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-DFted_dJ.js";import"./base-component-CYrqcnEP.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-Dc6xHI12.js";import"./tyler-icons-J8-UQPDE.js";import"./constants-scFqwPpP.js";import"./feature-detection-CvbR5w2Z.js";import"./divider-ygs7M1Xv.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-CNsyrVbY.js";import"./with-default-aria-Bs3XhyPE.js";import"./a11y-utils-BtLz16ul.js";import"./list-DyIfwNHS.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BCX73D4o.js";import"./focus-indicator-DHikC1Y8.js";import"./list-dropdown-aware-core-BqamMkkt.js";import"./list-dropdown-Dn5_Q8_H.js";import"./event-utils-C1SDeUaq.js";import"./popover-1VKXWetn.js";import"./overlay-BUaUM1sf.js";import"./with-longpress-listener-5SwIGzn_.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-CVBYr5DN.js";import"./a11y-BxM9_46k.js";import"./text-field-B9xZ2Bp8.js";import"./base-field-Cab5qth9.js";import"./label-DcyIgUN2.js";import"./button-RZbwlICz.js";import"./base-button-BqGhclOZ.js";import"./base-Dnf9m7-Y.js";import"./query-assigned-elements-BiGvSZm7.js";import"./class-map-BraAMXTq.js";import"./button-toggle-group-CizYn0Bm.js";import"./with-label-aware-Cv_TQB0N.js";import"./checkbox-px03cLLv.js";import"./icon-button-Y8A9ultm.js";import"./switch-xZjZ3ZX2.js";import"./tooltip-DD6ZsOiy.js";import"./chip-set-DX0UhNMu.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(i.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-chip-field>"})," component is deprecated and will be removed in a future release. Existing components such as ",e.jsx(i.code,{children:"<forge-text-field>"}),` and
`,e.jsx(i.code,{children:"<forge-select>"})," will be able to be used to create similar functionality which removes the current need for this specialized component."]}),`
`,e.jsx(i.h2,{id:"with-autocomplete",children:"With Autocomplete"}),`
`,e.jsx(i.p,{children:"It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type."}),`
`,e.jsx(o,{of:c}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Add an ",e.jsx(i.code,{children:"id"})," to your ",e.jsx(i.code,{children:"<input>"})," element and bind it to your ",e.jsx(i.code,{children:"<label>"})," element using the for attribute on the ",e.jsx(i.code,{children:"<label>"}),"."]}),`
`,e.jsxs(i.li,{children:["Ensure that the chips that are added to the field have descriptive ",e.jsx(i.code,{children:"aria-label"})," or ",e.jsx(i.code,{children:"aria-labelledby"})," attributes."]}),`
`,e.jsxs(i.li,{children:["Make sure that the member chips that are added can be accessed via the keyboard left and right arrows.",`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"There should be a distinct visual cue that indicates which chip is focused"}),`
`]}),`
`]}),`
`,e.jsx(i.li,{children:"Similarly, make sure that when a chip is focused using the arrow keys, that the backspace and delete keys do remove them."}),`
`,e.jsx(i.li,{children:"Ensure that when disabled, the entire field as well as the member chips all appear visually and interactively disabled."}),`
`]})]})}function he(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{he as default};
