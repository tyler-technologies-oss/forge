import{j as e}from"./jsx-runtime-gdtrzl5b.js";import{u as s}from"./index-BVBmosDd.js";import{ae as n,af as a,ag as o}from"./index-BfJ3hnjl.js";import{C as l}from"./CustomArgTypes-BPt4I3-M.js";import{C as p,D as d,W as c}from"./ChipField.stories-DQw0RpqA.js";import"./iframe-47unJMMI.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-CmNCmodr.js";import"./lit-element-Dk2-kgKT.js";import"./lit-html-DZH-Jm0H.js";import"./style-map-DxfbqtuX.js";import"./directive-Ctav8iJK.js";import"./chunk-454WOBUV-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./ref-9TtedaQt.js";import"./directive-helpers-DnQ__Q7V.js";import"./constants-DjE6emXm.js";import"./autocomplete-BElBkNft.js";import"./base-adapter-F7QHxK2H.js";import"./index-ByifSpfC.js";import"./divider-V8nRRqMS.js";import"./icon-DHpZ4R73.js";import"./index-Dh0vMUMR.js";import"./linear-progress-BjLGzdmZ.js";import"./with-default-aria-DCLjqsVH.js";import"./list-tzlsEZgh.js";import"./state-layer-DkOkOFSZ.js";import"./focus-indicator-BpCDYqsq.js";import"./list-dropdown-aware-core-DfUgINQ8.js";import"./list-dropdown-BVbYUUzh.js";import"./event-utils-C1SDeUaq.js";import"./popover-DMO_rraq.js";import"./overlay-oQigVWsx.js";import"./with-longpress-listener-D-8wsf8o.js";import"./dismissible-stack-DUAAgggE.js";import"./skeleton-AD7XJ-QC.js";import"./a11y-BxM9_46k.js";import"./text-field-By0mC--H.js";import"./base-field-CfB2Uzg4.js";import"./label-kORtmqyo.js";import"./button-DJU3J9XV.js";import"./base-button-adapter-O0rbh8zo.js";import"./with-label-aware-CLWydNrR.js";import"./button-toggle-group-BMiaMm6c.js";import"./with-form-associated-DjPnTr_x.js";import"./checkbox-7ZtPo8kA.js";import"./icon-button-DSVS47IC.js";import"./switch-BDI72jLc.js";import"./tooltip-CB-SMzj2.js";import"./chip-set-CVGkErpR.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
