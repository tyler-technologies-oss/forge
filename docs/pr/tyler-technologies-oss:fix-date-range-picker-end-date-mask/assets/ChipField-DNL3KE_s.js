import{j as e,M as s,T as a,C as o}from"./blocks-D96FETv8.js";import{useMDXComponents as n}from"./index-CqXGvudX.js";import{C as l}from"./CustomArgTypes-DDhscICy.js";import{C as d,D as c,W as p}from"./ChipField.stories-qMlNaTjX.js";import"./iframe-DIGFEk6P.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-qIDk0Vql.js";import"./style-map-3pRPob4x.js";import"./directive-CJw_OlP2.js";import"./ref-GDX07ViL.js";import"./feature-detection-uS6p5jc8.js";import"./autocomplete-BF2xrY-Q.js";import"./constants-wOq9K3uV.js";import"./base-adapter-Mla2Q9YN.js";import"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import"./divider-DoNAUeHX.js";import"./linear-progress-2PahUgVv.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./list-z5iQB-6r.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BFwsAUDA.js";import"./utils-CRxrUqQD.js";import"./focus-indicator-IWpzSXYP.js";import"./list-dropdown-aware-core-P1eltbhy.js";import"./list-dropdown-C9nqfntS.js";import"./event-utils-C1SDeUaq.js";import"./popover-xi3V_Oll.js";import"./overlay-D-bkGTD9.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-BdWcv7_4.js";import"./skeleton-C4EH8VF8.js";import"./a11y-BxM9_46k.js";import"./text-field-BnoM3v28.js";import"./base-field-PCIQc44M.js";import"./label-BSASIOtP.js";import"./button-r2EMLpWm.js";import"./base-button-adapter-D0zqnDMQ.js";import"./with-label-aware-D31hYnqk.js";import"./button-toggle-group-D5jBldBo.js";import"./with-form-associated-BeE6NBc1.js";import"./checkbox-DOmkbh7U.js";import"./icon-button-DkluvO-9.js";import"./switch-Bt2bdQXJ.js";import"./tooltip-CcxiN_AO.js";import"./chip-set-BBt44dwa.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
