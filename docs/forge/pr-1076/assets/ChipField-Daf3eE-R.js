import{j as e,M as s,T as a,C as o}from"./blocks-BjHgXG2B.js";import{useMDXComponents as n}from"./index-D8fqT_yN.js";import{C as l}from"./CustomArgTypes-swUOIEy9.js";import{C as d,D as p,W as c}from"./ChipField.stories-DTN6Dkle.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BUvWK7Gm.js";import"./utils-D8X1NLZa.js";import"./style-map-BiPVbLS3.js";import"./directive-jorct-Oe.js";import"./ref-wShc1pHg.js";import"./service-adapter-CoGDs2_3.js";import"./autocomplete-BJIQdmYB.js";import"./base-component-C90hx4_s.js";import"./feature-detection-Dexxu8GM.js";import"./base-adapter-BG6Ht_Mg.js";import"./tyler-icons-Dn_DGO8W.js";import"./index-DTwfV0k0.js";import"./divider-C8Z9knLF.js";import"./linear-progress-BPDXw63a.js";import"./with-default-aria-DzaWzFxa.js";import"./a11y-utils-B1Om3UYy.js";import"./list-RnOo0JfG.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-CwwoRddA.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-DuaWb64U.js";import"./property-Cj2i7KzY.js";import"./base-lit-element-C1OBJTYz.js";import"./list-dropdown-aware-core-C7DtQxnY.js";import"./list-dropdown-C8BK2Oiq.js";import"./event-utils-C1SDeUaq.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./with-longpress-listener-DVl3ifIG.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-CXhX8HjP.js";import"./a11y-BxM9_46k.js";import"./text-field-BFpW9S5W.js";import"./base-field-Cj5xcuNX.js";import"./label-CNb-VxA0.js";import"./button-HjiDhvyP.js";import"./base-button-core-B4eJrefY.js";import"./with-label-aware-CLcNK3IJ.js";import"./button-toggle-group-CC0eMfsb.js";import"./with-form-associated-DWpuXgRm.js";import"./checkbox-B4E0RTGG.js";import"./icon-button-BsxQaUJP.js";import"./switch-C39lFNL9.js";import"./tooltip-CMogPifb.js";import"./chip-set-BlPamC3y.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
