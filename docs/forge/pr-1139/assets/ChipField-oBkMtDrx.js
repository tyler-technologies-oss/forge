import{u as s,j as e,M as n,T as a,C as o}from"./blocks-vGk5Sp3j.js";import{C as l}from"./CustomArgTypes-BItI8Ys2.js";import{C as p,D as d,W as c}from"./ChipField.stories-C5LT6glX.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DYu_YUNV.js";import"./utils-qcABQWBJ.js";import"./style-map-CBVsS_js.js";import"./directive-CwRn8Fwj.js";import"./ref-Bchxmirw.js";import"./base-lit-element-CBSoXsbp.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-CNTlSPpg.js";import"./base-component-DuGK7lj-.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-ConZDfKW.js";import"./tyler-icons-BR2D-RGM.js";import"./constants-NJSwOtlj.js";import"./feature-detection-3Hxzrcpn.js";import"./divider-BseY7DCz.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-CKPFd0xY.js";import"./with-default-aria-BynPS94F.js";import"./a11y-utils-zbntmbh3.js";import"./list-B6v9krCw.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-Cnbc18vB.js";import"./focus-indicator-DYCNHTNB.js";import"./list-dropdown-aware-core-zkOhG6yF.js";import"./list-dropdown-B7dvlbct.js";import"./event-utils-C1SDeUaq.js";import"./popover-CZwG_Uov.js";import"./overlay-CQSkmT4F.js";import"./with-longpress-listener-CBo4eBdm.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-g_Ea1Wjh.js";import"./a11y-BxM9_46k.js";import"./text-field-BCq8hCIx.js";import"./base-field-DwrgASMZ.js";import"./label-DqvVA4Ut.js";import"./button-DYXzaptD.js";import"./base-button-core-ALzKbMyA.js";import"./with-label-aware-BNvgDdSc.js";import"./button-toggle-group-CqU02Llq.js";import"./with-form-associated-Cn6jc2ls.js";import"./checkbox-BPHMFZ31.js";import"./icon-button-DK0S2Dk5.js";import"./switch-B5DttFku.js";import"./tooltip-sqz4OrKB.js";import"./chip-set-CeTMm6k1.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
