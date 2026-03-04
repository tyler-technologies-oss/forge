import{j as e,M as s,T as a,C as o}from"./blocks-GmgB-FWo.js";import{useMDXComponents as n}from"./index-CS3Ff0us.js";import{C as l}from"./CustomArgTypes-CJZIelLO.js";import{C as d,D as c,W as p}from"./ChipField.stories-DwfoMFvT.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BJbEpszz.js";import"./utils-3yMKERXj.js";import"./style-map-Bs1iWlfZ.js";import"./directive-jorct-Oe.js";import"./ref-BghXvRIG.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-DhhFEXMs.js";import"./base-component-DXuuJMhq.js";import"./feature-detection-BkmzHgah.js";import"./base-adapter-Dwntuuli.js";import"./tyler-icons-BS8_pNWa.js";import"./index-DTwfV0k0.js";import"./divider-CY-gug5I.js";import"./linear-progress-Cnx_HyUf.js";import"./with-default-aria-CXzIDxFk.js";import"./a11y-utils-DFScBSOY.js";import"./list-VCtMCYzb.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-Dr4I3-ea.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-D5rXac5k.js";import"./base-lit-element-b6fbKSqi.js";import"./list-dropdown-aware-core-Ysoegwc7.js";import"./list-dropdown-Bwkgpjuc.js";import"./event-utils-C1SDeUaq.js";import"./popover-C7v8d-bT.js";import"./overlay-CnRxeVdV.js";import"./with-longpress-listener-D9AHvrpn.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-CMBvqwtz.js";import"./a11y-BxM9_46k.js";import"./text-field-oibF3m6m.js";import"./base-field-JVYJIdv9.js";import"./label-64IPd7Ff.js";import"./button-DxNiNzFb.js";import"./base-button-core-BzOydBeZ.js";import"./with-label-aware-Bg6h2rtY.js";import"./button-toggle-group-CuTLB-F0.js";import"./with-form-associated-Csw0cMu6.js";import"./checkbox-CYcpnhwL.js";import"./icon-button-BJe5BT5b.js";import"./switch-CBC5az3f.js";import"./tooltip-DZbumLUT.js";import"./chip-set-DEr6HNXe.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
`]})]})}function le(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{le as default};
