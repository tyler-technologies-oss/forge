import{j as e,M as s,T as a,C as o}from"./blocks-D0yBO_jN.js";import{useMDXComponents as n}from"./index-BdO0fnZl.js";import{C as l}from"./CustomArgTypes-CT0geJaP.js";import{C as d,D as c,W as p}from"./ChipField.stories-CCDrAp5I.js";import"./iframe-Dk6FLRDb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-QLgq-F6h.js";import"./style-map-DxxfczF-.js";import"./directive-CJw_OlP2.js";import"./ref-BqNYG9I-.js";import"./feature-detection-uS6p5jc8.js";import"./autocomplete-CT01K3nf.js";import"./constants-wOq9K3uV.js";import"./base-adapter-Mla2Q9YN.js";import"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import"./divider-DoNAUeHX.js";import"./linear-progress-2PahUgVv.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./list-BoYqkH2U.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-CDmGOVud.js";import"./utils-f75LITG3.js";import"./focus-indicator-13Sfphtk.js";import"./list-dropdown-aware-core-D4TDs8eC.js";import"./list-dropdown-dkmdW-J-.js";import"./event-utils-C1SDeUaq.js";import"./popover-DCwSavHj.js";import"./overlay-Dg-i6Kxe.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-CrNbqK-n.js";import"./skeleton-C4EH8VF8.js";import"./a11y-BxM9_46k.js";import"./text-field-CpSfPocF.js";import"./base-field-DnyNt-Yd.js";import"./label-DwYtoavE.js";import"./button-BApUEgZW.js";import"./base-button-adapter-C_PsGoIF.js";import"./with-label-aware-D31hYnqk.js";import"./button-toggle-group-C313Qpis.js";import"./with-form-associated-BeE6NBc1.js";import"./checkbox-BNaDur5-.js";import"./icon-button-CvGVrMJL.js";import"./switch-B3HYUxdj.js";import"./tooltip-BZNSu0mZ.js";import"./chip-set-CVBElNQP.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
