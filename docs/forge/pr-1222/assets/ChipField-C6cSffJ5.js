import{u as s,j as e,M as n,T as a,C as o}from"./blocks-DftSGguC.js";import{C as l}from"./CustomArgTypes-BUp51ZN5.js";import{C as p,D as d,W as c}from"./ChipField.stories-C8auwsZL.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-ZebJRd2k.js";import"./utils-DYC_LATD.js";import"./style-map-CHYpaRMA.js";import"./directive-CwRn8Fwj.js";import"./ref-BtD67yXS.js";import"./base-lit-element-H2XiDNvj.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-Bk2_gtxY.js";import"./base-component-BcqNuJgA.js";import"./utils-BBsKBbSu.js";import"./base-adapter-C389HZc_.js";import"./dom-utils-CRnY3o4F.js";import"./tyler-icons-CvAFZSnF.js";import"./constants-C8FIXqZ0.js";import"./feature-detection-CRito7YV.js";import"./platform-C5RrLkNt.js";import"./divider-y91p-zHY.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-Dh__ll_M.js";import"./with-default-aria-C1zfJxsY.js";import"./a11y-utils-J2po7a_p.js";import"./list-N8ASX7X4.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-mJUCxnSJ.js";import"./focus-indicator-vAXHGgAC.js";import"./list-dropdown-aware-core-ltGPVDMZ.js";import"./list-dropdown-D3cIIcNh.js";import"./event-utils-C1SDeUaq.js";import"./popover-DJnfQE5v.js";import"./overlay-CZiEinF4.js";import"./with-longpress-listener-D2FEOwr-.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-q0AxETeF.js";import"./a11y-BxM9_46k.js";import"./text-field-ucavXP17.js";import"./base-field-DsCdnF0Y.js";import"./label-f55TS_D7.js";import"./button-constants-BYc3Vkj-.js";import"./button-toggle-group-constants-DEr-8Y2E.js";import"./checkbox-constants-B-M7hLil.js";import"./icon-button-constants-CuArO63Z.js";import"./switch-constants-B2dyMMoE.js";import"./with-label-aware-BCtp5F9i.js";import"./icon-button-DCXr5XdP.js";import"./base-button-core-ChuPFGJm.js";import"./tooltip-v0Hw78HT.js";import"./chip-set-BOwG39zE.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
`]})]})}function me(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{me as default};
