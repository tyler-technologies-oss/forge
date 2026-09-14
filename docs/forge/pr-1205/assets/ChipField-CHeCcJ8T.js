import{u as s,j as e,M as n,T as a,C as o}from"./blocks-BZgKBsRu.js";import{C as l}from"./CustomArgTypes-BDnjSdPK.js";import{C as p,D as d,W as c}from"./ChipField.stories-IDMw-xEp.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DucEJqMh.js";import"./utils-DgK06r1C.js";import"./style-map-DQNfgzcs.js";import"./directive-CwRn8Fwj.js";import"./ref-DvPp5UHH.js";import"./base-lit-element-DBlSe9lS.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-9DbKVblF.js";import"./base-component-BoZ3BOE8.js";import"./utils-C1mY2kke.js";import"./base-adapter-CKKMXnbe.js";import"./dom-utils-QqrulHvL.js";import"./tyler-icons-gd947w-D.js";import"./constants-B0fflZN8.js";import"./feature-detection-DY5_mT0R.js";import"./divider-C6x2Y4zt.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-LQTwNhb5.js";import"./with-default-aria-D2hTdL-5.js";import"./a11y-utils-BgIwxT0N.js";import"./list-BpgKZh9Q.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-e2HqliqN.js";import"./focus-indicator-DXw8Y8hB.js";import"./list-dropdown-aware-core-DeopaRw8.js";import"./list-dropdown-B4qDBOji.js";import"./event-utils-C1SDeUaq.js";import"./popover-CSRiiy_0.js";import"./overlay-B2h4Qxq4.js";import"./with-longpress-listener-CFdqYAal.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-BqxN4Nno.js";import"./a11y-BxM9_46k.js";import"./text-field-DwmImSRz.js";import"./base-field-Yl7ZFpTq.js";import"./label-D3aO7fYn.js";import"./button-constants-BSJHK5Y_.js";import"./button-toggle-group-constants-rI541wlG.js";import"./checkbox-constants-DH9ecVuP.js";import"./icon-button-constants-DoLISkFF.js";import"./switch-constants-hzKnnB0w.js";import"./with-label-aware-DLI3ucZG.js";import"./icon-button-7uqnM-R4.js";import"./base-button-core-CDzrnVSk.js";import"./tooltip-CFImliAj.js";import"./chip-set-DRKSe1eZ.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
`]})]})}function ce(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ce as default};
