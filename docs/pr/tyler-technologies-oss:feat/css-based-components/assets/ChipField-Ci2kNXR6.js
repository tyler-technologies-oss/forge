import{j as e}from"./jsx-runtime-0BvT2Uhu.js";import{u as s}from"./index-DVrXV6f9.js";import{ae as n,af as a,ag as o}from"./index-Cg4z2Zqo.js";import{C as l}from"./CustomArgTypes-D1-FPOup.js";import{C as p,D as d,W as c}from"./ChipField.stories-Dw6hp8BE.js";import"./iframe-Ccrvotme.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-DnAZaZRm.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";import"./chunk-454WOBUV-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./ref-BorTy8X1.js";import"./directive-helpers-DYUueT8w.js";import"./constants-DjE6emXm.js";import"./autocomplete-CCc9RUk0.js";import"./base-adapter-F7QHxK2H.js";import"./index-ByifSpfC.js";import"./divider-V8nRRqMS.js";import"./icon-DHpZ4R73.js";import"./index-Dh0vMUMR.js";import"./linear-progress-CVy9jv9h.js";import"./with-default-aria-B4PYKb3X.js";import"./list-ER_0ZOrZ.js";import"./state-layer-DkOkOFSZ.js";import"./focus-indicator-BpCDYqsq.js";import"./list-dropdown-aware-core-BegcX5HQ.js";import"./list-dropdown-CxkGRIF8.js";import"./event-utils-C1SDeUaq.js";import"./popover-BJdewMbT.js";import"./overlay-DasBtrG-.js";import"./with-longpress-listener-D-8wsf8o.js";import"./dismissible-stack-DUAAgggE.js";import"./skeleton-AD7XJ-QC.js";import"./a11y-BxM9_46k.js";import"./text-field-R8sNW8Ph.js";import"./base-field-BB2ajAbv.js";import"./label-BzpargFq.js";import"./button-CoZ69e4-.js";import"./base-button-adapter-BVW_ZDRM.js";import"./with-label-aware-CLWydNrR.js";import"./button-toggle-group-pGGDU2pF.js";import"./with-form-associated-w46sHrbT.js";import"./checkbox-Dsowcwzy.js";import"./icon-button-B5lcHsAP.js";import"./switch-DwfRMwQ7.js";import"./tooltip-DHBxVVPY.js";import"./chip-set-zDMLJI_J.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
