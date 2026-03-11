import{j as e,M as s,T as a,C as o}from"./blocks-D9FRAhPO.js";import{useMDXComponents as n}from"./index-DItk2pAf.js";import{C as l}from"./CustomArgTypes-BkKTQX49.js";import{C as p,D as d,W as c}from"./ChipField.stories-CCfz7Wtg.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-1u9wRnNk.js";import"./utils-DQ34OAOC.js";import"./style-map-D9j4aE4e.js";import"./directive-jorct-Oe.js";import"./ref-CFABHZr-.js";import"./base-lit-element-DTeIWjMQ.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-CClnjb7Q.js";import"./base-component-DL0YqY-6.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-BZsNucGb.js";import"./tyler-icons-DdbCLFCE.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-DSi0ElUE.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-DP1CUIRM.js";import"./with-default-aria-DIbVfoWG.js";import"./a11y-utils-5_BtrjMB.js";import"./list-Boy0Lri8.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-CK5iHsfr.js";import"./focus-indicator-Nvt4dqBV.js";import"./list-dropdown-aware-core-RmMVYNXJ.js";import"./list-dropdown-B18ivrUi.js";import"./event-utils-C1SDeUaq.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-DtujUGDy.js";import"./a11y-BxM9_46k.js";import"./text-field-Dzq9B0pc.js";import"./base-field-EKpX4Hm5.js";import"./label-B3XLMC7F.js";import"./button-9C-yiDRS.js";import"./base-button-core-o2H6M1SN.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-C_1USqcb.js";import"./with-form-associated-C0Ge4dkG.js";import"./checkbox-B23DYIto.js";import"./icon-button-B78lZmMn.js";import"./switch-D7d43D8D.js";import"./tooltip-C_eok51I.js";import"./chip-set-7c9hBDO9.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function me(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{me as default};
