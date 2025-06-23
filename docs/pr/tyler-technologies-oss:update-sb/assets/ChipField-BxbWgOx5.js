import{j as e,M as s,T as a,C as o}from"./blocks-BXlq4z9v.js";import{useMDXComponents as n}from"./index-CXruJyNS.js";import{C as l}from"./CustomArgTypes-Bm3uKnLL.js";import{C as d,D as c,W as p}from"./ChipField.stories-DY0rVu85.js";import"./iframe-BYnq_mNZ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-Dc8t8QJe.js";import"./style-map-C5V7saTg.js";import"./directive-CJw_OlP2.js";import"./ref-YyzJ9hkq.js";import"./feature-detection-CY6TVbRZ.js";import"./autocomplete-DgZspdR2.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./icon-ANstxuR5.js";import"./index-CiLSBptl.js";import"./divider-DBTw_7sm.js";import"./linear-progress-CJb_8skk.js";import"./with-default-aria-srFr2cNz.js";import"./a11y-utils-DGb1vALN.js";import"./list-DCzhHkfW.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BVsNuAhs.js";import"./utils-CRxrUqQD.js";import"./focus-indicator-Cgfkaa3d.js";import"./list-dropdown-aware-core-CzqrxWu9.js";import"./list-dropdown-DyHgidej.js";import"./event-utils-C1SDeUaq.js";import"./popover-BUd5kSDj.js";import"./overlay-CmLQVoKV.js";import"./with-longpress-listener-BDlFima-.js";import"./dismissible-stack-BdWcv7_4.js";import"./skeleton-DocRecw2.js";import"./a11y-BxM9_46k.js";import"./text-field-B5DffH3N.js";import"./base-field-mOEyxsOG.js";import"./label-BleHo323.js";import"./button-DKtxCkrw.js";import"./base-button-adapter-DBeYtn0B.js";import"./with-label-aware-DkCFYjRm.js";import"./button-toggle-group-5BDyeLck.js";import"./with-form-associated-9Gj0jfo_.js";import"./checkbox-CF9fzMIR.js";import"./icon-button-BWhggrld.js";import"./switch-ZI6WyDhE.js";import"./tooltip-DdPKhesK.js";import"./chip-set-DGCYej-e.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:c}),`
`,e.jsx(i.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-chip-field>"})," component is deprecated and will be removed in a future release. Existing components such as ",e.jsx(i.code,{children:"<forge-text-field>"}),` and
`,e.jsx(i.code,{children:"<forge-select>"})," will be able to be used to create similar functionality which removes the current need for this specialized component."]}),`
`,e.jsx(i.h2,{id:"with-autocomplete",children:"With Autocomplete"}),`
`,e.jsx(i.p,{children:"It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type."}),`
`,e.jsx(o,{of:p}),`
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
`]})]})}function ne(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ne as default};
