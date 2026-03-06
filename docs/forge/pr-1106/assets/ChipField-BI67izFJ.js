import{j as e,M as s,T as a,C as o}from"./blocks-CDTkuP8O.js";import{useMDXComponents as n}from"./index-yP541o45.js";import{C as l}from"./CustomArgTypes-aVRWX4xF.js";import{C as p,D as d,W as c}from"./ChipField.stories-CKVx9z5Y.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Nz47_fHD.js";import"./utils-Ba9gsS7G.js";import"./style-map-YtahPS12.js";import"./directive-jorct-Oe.js";import"./ref-0GhgmJo2.js";import"./base-lit-element-qL22cIjR.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-DjKvXmbr.js";import"./base-component-DRtOwP-y.js";import"./dom-utils-DrFTp_YE.js";import"./base-adapter-DL-BEqts.js";import"./tyler-icons-D4_mmXXb.js";import"./index-DTwfV0k0.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-UtG3oNpZ.js";import"./utils-DU-9AqTO.js";import"./linear-progress-BUFrhekn.js";import"./with-default-aria-B9-wjnpV.js";import"./a11y-utils-DnYDwx6N.js";import"./list-Cu8bwlYk.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-D2ldILW1.js";import"./focus-indicator-B9pIc8ye.js";import"./list-dropdown-aware-core-Hf-vowed.js";import"./list-dropdown-C1eh2tDN.js";import"./event-utils-C1SDeUaq.js";import"./popover-Dei7Vx-1.js";import"./overlay-C91thjfI.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-D7ds2eUz.js";import"./a11y-BxM9_46k.js";import"./text-field-B5oPl4dX.js";import"./base-field-CZ7afn2P.js";import"./label-BUhDowKT.js";import"./button-DCmcEZ2V.js";import"./base-button-core-lR_f-uSf.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-By5RlPye.js";import"./with-form-associated-OQszfW5m.js";import"./checkbox-qD1ZxiPF.js";import"./icon-button-CfSeSDt7.js";import"./switch-CuFjOXue.js";import"./tooltip-BfgpHI7F.js";import"./chip-set-Nh2PwH9O.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function de(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{de as default};
