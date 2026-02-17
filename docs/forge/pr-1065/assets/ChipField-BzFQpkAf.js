import{j as e,M as s,T as a,C as o}from"./blocks-BZ_5D4zt.js";import{useMDXComponents as n}from"./index-3QQAJDrN.js";import{C as l}from"./CustomArgTypes-B3SENDjq.js";import{C as d,D as p,W as c}from"./ChipField.stories-6UpLZlNZ.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BZH4nlqj.js";import"./utils-Cntew3lg.js";import"./style-map-CtAn6EL2.js";import"./directive-jorct-Oe.js";import"./ref-B5HxkRBH.js";import"./service-adapter-CffG5Lhq.js";import"./autocomplete-CWUwqlTO.js";import"./base-component-DDNjpQtJ.js";import"./feature-detection-DBWkqjAp.js";import"./base-adapter-j11ZPrFD.js";import"./tyler-icons-CBdZU-Tr.js";import"./index-DTwfV0k0.js";import"./divider-Dq-Slgl_.js";import"./linear-progress-CpNoMDP5.js";import"./with-default-aria-BJTWd1sB.js";import"./a11y-utils-Bk90r5kb.js";import"./list-Dr2jKmMX.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-DGD4bZzf.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-DA-M5OAc.js";import"./property-CEaicu8j.js";import"./base-lit-element-C3PQjrnC.js";import"./list-dropdown-aware-core-D0SZHNlR.js";import"./list-dropdown-DwVJzwtA.js";import"./event-utils-C1SDeUaq.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./with-longpress-listener-BpF482dW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-C3LWj3F7.js";import"./a11y-BxM9_46k.js";import"./text-field-ldDe5E6_.js";import"./base-field-0AJkS83p.js";import"./label-DpXwgEPI.js";import"./button-DETyVr69.js";import"./base-button-core-nO-IB5gf.js";import"./with-label-aware-Ef9Lm0aI.js";import"./button-toggle-group-B-sohdc2.js";import"./with-form-associated-BAum3q-z.js";import"./checkbox-DWpNTejw.js";import"./icon-button-CZqCErUV.js";import"./switch-BuDNc7Vm.js";import"./tooltip-DxbQteKS.js";import"./chip-set-DnsP9tEf.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
