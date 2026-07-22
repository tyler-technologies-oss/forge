import{u as s,j as e,M as n,T as a,C as o}from"./blocks-BHyGcAoo.js";import{C as l}from"./CustomArgTypes-DRO9jcnl.js";import{C as p,D as d,W as c}from"./ChipField.stories-D0wszLzy.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-qD-bGIzk.js";import"./utils-Cu3TicFl.js";import"./style-map-CsPbJdgf.js";import"./directive-CwRn8Fwj.js";import"./ref-Cm1GubXY.js";import"./base-lit-element-sZalsBjG.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-B16MRgdG.js";import"./base-component-CYrqcnEP.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-Dc6xHI12.js";import"./tyler-icons-DFT8Hk_L.js";import"./constants-D9XaGcQ2.js";import"./feature-detection-3Hxzrcpn.js";import"./divider-B0Ee0gPN.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-BvuLf7up.js";import"./with-default-aria-D57-4a2v.js";import"./a11y-utils-DQoauvDo.js";import"./list-CpihL8aD.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-DRsbBcDh.js";import"./focus-indicator-DLFCgvFL.js";import"./list-dropdown-aware-core-BRj31MX6.js";import"./list-dropdown-Cw8JqYuR.js";import"./event-utils-C1SDeUaq.js";import"./popover-DsfRe9wk.js";import"./overlay-wJnkDJjY.js";import"./with-longpress-listener-DnatLNR5.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-CGb6dwMS.js";import"./a11y-BxM9_46k.js";import"./text-field-D8O6gLHh.js";import"./base-field-EZO9ex0p.js";import"./label-BJKF1Dni.js";import"./button-constants-1yoxvAmM.js";import"./button-toggle-group-constants-BCLq5she.js";import"./checkbox-constants-CWid-yLt.js";import"./icon-button-constants-DmTas6I8.js";import"./switch-constants-DGsBjGAr.js";import"./with-label-aware-v-rvTgpX.js";import"./icon-button-D5NAib0F.js";import"./base-button-core-CCzcPeOA.js";import"./tooltip-DljB7HTy.js";import"./chip-set-C-hTeV5f.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
