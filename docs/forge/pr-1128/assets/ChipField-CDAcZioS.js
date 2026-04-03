import{j as e,M as s,T as a,C as o}from"./blocks-BW6tMW00.js";import{useMDXComponents as n}from"./index-CdZgOk8d.js";import{C as l}from"./CustomArgTypes-DzMvS4ML.js";import{C as d,D as p,W as c}from"./ChipField.stories-Dmks035y.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-1amZ02A4.js";import"./utils-s6uih_-r.js";import"./style-map-DhE_eh_-.js";import"./directive-jorct-Oe.js";import"./ref-DjoxsuPm.js";import"./service-adapter-CoGDs2_3.js";import"./autocomplete-x8xjn1HM.js";import"./base-component-JqFhTqNN.js";import"./feature-detection-C7YyUy0w.js";import"./base-adapter-BuRgNRgk.js";import"./tyler-icons-CzoCbVaa.js";import"./index-DTwfV0k0.js";import"./divider-DJWSVjA8.js";import"./linear-progress-DSeJSqzy.js";import"./with-default-aria-CktUg9lz.js";import"./a11y-utils-Cisf0Kqm.js";import"./list-7b1y5hwO.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-DFBFTfpT.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-C5TEsO7E.js";import"./property-B9voTIv9.js";import"./base-lit-element-Ck1SVZB_.js";import"./list-dropdown-aware-core-B2bzrxmE.js";import"./list-dropdown-BmfbIFca.js";import"./event-utils-C1SDeUaq.js";import"./popover-uUF2Q5pH.js";import"./overlay-xfWlPvUl.js";import"./with-longpress-listener-CFiRtWHZ.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-CfBVzZbg.js";import"./a11y-BxM9_46k.js";import"./text-field-Dij8M865.js";import"./base-field-BKgwQlzN.js";import"./label-bKp8WFBS.js";import"./button-YbSFJWqY.js";import"./base-button-core-Gs8VA1ot.js";import"./with-label-aware-BNPNo6Ms.js";import"./button-toggle-group-CCsqyC6G.js";import"./with-form-associated-DTUcv569.js";import"./checkbox-DZ8Y-EwU.js";import"./icon-button-DIbOVWXo.js";import"./switch-CR8fKfBF.js";import"./tooltip-CZ9l9EMe.js";import"./chip-set-DIq7DtGu.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
