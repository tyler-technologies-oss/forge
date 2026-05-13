import{u as s,j as e,M as n,T as a,C as o}from"./blocks-yX3re4R6.js";import{C as l}from"./CustomArgTypes-CrRmFVDa.js";import{C as p,D as d,W as c}from"./ChipField.stories-BBfEjnkS.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CWXjUqeX.js";import"./utils-C7Mtdcaw.js";import"./style-map-CJYhNJUS.js";import"./directive-CwRn8Fwj.js";import"./ref-CALptolr.js";import"./base-lit-element-BfnNzQe8.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-BLt7arvF.js";import"./base-component-DuGK7lj-.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-ConZDfKW.js";import"./tyler-icons-4d7AKKUw.js";import"./constants-NJSwOtlj.js";import"./feature-detection-3Hxzrcpn.js";import"./divider-BIgqYejs.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-CKPFd0xY.js";import"./with-default-aria-BynPS94F.js";import"./a11y-utils-zbntmbh3.js";import"./list-DyUHSKMC.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-Cnbc18vB.js";import"./focus-indicator-BTv0QnKa.js";import"./list-dropdown-aware-core-CDK0i3bO.js";import"./list-dropdown-DFf46_Jz.js";import"./event-utils-C1SDeUaq.js";import"./popover-BwsK9BW2.js";import"./overlay-C5P-SFRG.js";import"./with-longpress-listener-CBo4eBdm.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-g_Ea1Wjh.js";import"./a11y-BxM9_46k.js";import"./text-field-Dk4H_-Ig.js";import"./base-field-DaIzzACG.js";import"./label-CtJEE94F.js";import"./button-PW1lPiFh.js";import"./base-button-core-Beepd6xW.js";import"./with-label-aware-BNvgDdSc.js";import"./button-toggle-group-BC0QF8Zu.js";import"./with-form-associated-Cn6jc2ls.js";import"./checkbox-TumIk4PH.js";import"./icon-button-Cmf5mtcl.js";import"./switch-BUv3KVhl.js";import"./tooltip-B4bjmlqp.js";import"./chip-set-DkwWGCj0.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
`]})]})}function ce(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ce as default};
