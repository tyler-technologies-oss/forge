import{j as e,M as s,T as a,C as o}from"./blocks-C3gDyZIu.js";import{useMDXComponents as n}from"./index-CqaAC5S2.js";import{C as l}from"./CustomArgTypes-CNLaeSI0.js";import{C as d,D as c,W as p}from"./ChipField.stories-BZopVnA1.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BciiVb0K.js";import"./utils-D7XrLKwY.js";import"./style-map-Djxu7jNR.js";import"./directive-CJw_OlP2.js";import"./ref-D3ww8A08.js";import"./feature-detection-BwPJgXni.js";import"./autocomplete-B1FrCjfl.js";import"./constants-y3-o2nLB.js";import"./base-adapter-BB1UtCX3.js";import"./icon-FzRol6Tl.js";import"./index-5CPwzmQS.js";import"./divider-BXP9Ondm.js";import"./linear-progress-CfBpjTvZ.js";import"./with-default-aria-BtzFnMjW.js";import"./a11y-utils-Dbhjrk0x.js";import"./list-ucSdTmS4.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-CLjAHnoF.js";import"./utils-BtvMddIW.js";import"./focus-indicator-B9KMEBVK.js";import"./list-dropdown-aware-core-C9m0o2b5.js";import"./list-dropdown-D1aTe_lv.js";import"./event-utils-C1SDeUaq.js";import"./popover-CCIxKg31.js";import"./overlay-B72xXWi5.js";import"./with-longpress-listener-BTdNjnT1.js";import"./dismissible-stack-CF8GDA4v.js";import"./skeleton-1JRnRe4N.js";import"./a11y-BxM9_46k.js";import"./text-field-DqRG6OMZ.js";import"./base-field-DVdLvhJA.js";import"./label-73doN4RE.js";import"./button-Bjtey6FZ.js";import"./base-button-adapter-tGikGtMQ.js";import"./with-label-aware-DXzk0r0A.js";import"./button-toggle-group-C96H3ppB.js";import"./with-form-associated-pDihgILf.js";import"./checkbox-DYAJ7rMi.js";import"./icon-button-DpLi6_yQ.js";import"./switch-WjqoziFM.js";import"./tooltip-DcL6iv1E.js";import"./chip-set-DulgInB8.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
`]})]})}function se(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{se as default};
