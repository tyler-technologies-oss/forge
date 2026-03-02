import{j as e,M as s,T as a,C as o}from"./blocks-BInB3pzw.js";import{useMDXComponents as n}from"./index-C5Jr0B1O.js";import{C as l}from"./CustomArgTypes-C0OhTjJE.js";import{C as d,D as p,W as c}from"./ChipField.stories-HKoI77Gk.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BlOFKJDS.js";import"./utils-DUpaJ7b_.js";import"./style-map-CoXBBqwT.js";import"./directive-jorct-Oe.js";import"./ref-DXTbTzis.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-BdRTgpmE.js";import"./base-component-CgTc0tMd.js";import"./feature-detection-CiXpQaRQ.js";import"./base-adapter-Dd2Rwp6N.js";import"./tyler-icons-DG1d6qey.js";import"./index-DTwfV0k0.js";import"./divider-BL37Lb2g.js";import"./linear-progress-CYTe6uKP.js";import"./with-default-aria-BEow76us.js";import"./a11y-utils-Byu3IW8S.js";import"./list-By4HPSzV.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-D_bEeiyc.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-DF2HrkuM.js";import"./property-ntTuo9C3.js";import"./base-lit-element-Domadsr2.js";import"./list-dropdown-aware-core-CkLIwo-2.js";import"./list-dropdown-BXE7bLCJ.js";import"./event-utils-C1SDeUaq.js";import"./popover-CNAMd9T5.js";import"./overlay-CvFTNDO2.js";import"./with-longpress-listener-DKzLL2IX.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-B7Zw5LdQ.js";import"./a11y-BxM9_46k.js";import"./text-field-DWvKFKKM.js";import"./base-field-ByG2tr7F.js";import"./label-PBJgWwVx.js";import"./button-CrEyna-l.js";import"./base-button-core-B2TvOgT4.js";import"./with-label-aware-UxVhxMHx.js";import"./button-toggle-group-CSYMjEX6.js";import"./with-form-associated-BeCnrgxY.js";import"./checkbox-D6KNXaeb.js";import"./icon-button-CBB1Wyv0.js";import"./switch-DfOCriK_.js";import"./tooltip-BQwGelzj.js";import"./chip-set-BjGoRsy4.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:p}),`
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
