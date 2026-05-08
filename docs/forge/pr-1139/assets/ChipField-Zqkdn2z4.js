import{u as s,j as e,M as n,T as a,C as o}from"./blocks-DYZtWDt9.js";import{C as l}from"./CustomArgTypes-B51Le89o.js";import{C as p,D as d,W as c}from"./ChipField.stories-Dgn1th9t.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-VEfyHWkW.js";import"./utils-BX30PoUy.js";import"./style-map-CVDwaut4.js";import"./directive-jorct-Oe.js";import"./ref-CCknHHyB.js";import"./base-lit-element-DtE_4ulw.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-DD4L4otT.js";import"./base-component-DuGK7lj-.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-ConZDfKW.js";import"./tyler-icons-DXmxhIwE.js";import"./constants-NJSwOtlj.js";import"./feature-detection-3Hxzrcpn.js";import"./divider-tA9VXx0m.js";import"./utils-DU-9AqTO.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./linear-progress-CKPFd0xY.js";import"./with-default-aria-BynPS94F.js";import"./a11y-utils-zbntmbh3.js";import"./list-CeiFAVN-.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-Cnbc18vB.js";import"./focus-indicator-wqDlsb_E.js";import"./list-dropdown-aware-core-kQtqkyG4.js";import"./list-dropdown-D8qKTtnW.js";import"./event-utils-C1SDeUaq.js";import"./popover-BS-OVdsI.js";import"./overlay-D2sOlsKa.js";import"./with-longpress-listener-CBo4eBdm.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-g_Ea1Wjh.js";import"./a11y-BxM9_46k.js";import"./text-field-Bib6mwff.js";import"./base-field-BHMDuxhn.js";import"./label-DfBB20aY.js";import"./button-C2C39vE8.js";import"./base-button-core-YADMsmDd.js";import"./with-label-aware-BNvgDdSc.js";import"./button-toggle-group-BSUSg7i_.js";import"./with-form-associated-Cn6jc2ls.js";import"./checkbox-CkPWqzNQ.js";import"./icon-button-C-tZnLZ9.js";import"./switch-ouNxs7Nk.js";import"./tooltip-CXOV95To.js";import"./chip-set-a8_nCQYQ.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
