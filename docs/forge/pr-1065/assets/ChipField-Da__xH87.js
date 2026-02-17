import{j as e,M as s,T as a,C as o}from"./blocks-Cd8ovbmU.js";import{useMDXComponents as n}from"./index-mNNAnFaW.js";import{C as l}from"./CustomArgTypes-C8P1X2rG.js";import{C as d,D as p,W as c}from"./ChipField.stories-CZa9pNWB.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-pqTvACNP.js";import"./utils-Cntew3lg.js";import"./style-map-BBm1Uuz6.js";import"./directive-jorct-Oe.js";import"./ref-BeKtLWVo.js";import"./service-adapter-CffG5Lhq.js";import"./autocomplete-BgysD7Fj.js";import"./base-component-DDNjpQtJ.js";import"./feature-detection-DBWkqjAp.js";import"./base-adapter-j11ZPrFD.js";import"./tyler-icons-CBdZU-Tr.js";import"./index-DTwfV0k0.js";import"./divider-Dq-Slgl_.js";import"./linear-progress-CpNoMDP5.js";import"./with-default-aria-BJTWd1sB.js";import"./a11y-utils-Bk90r5kb.js";import"./list-a6IB0DPO.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-DGD4bZzf.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-B_dAHUd_.js";import"./property-lhIUG2P8.js";import"./base-lit-element-DAd-9Gma.js";import"./list-dropdown-aware-core-SbWPRe8l.js";import"./list-dropdown-B3dtYuQ5.js";import"./event-utils-C1SDeUaq.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./with-longpress-listener-BpF482dW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-C3LWj3F7.js";import"./a11y-BxM9_46k.js";import"./text-field-gs39rriO.js";import"./base-field-CdA0iQoJ.js";import"./label-Blmy9e6R.js";import"./button-DIUHasWh.js";import"./base-button-core-CMCUVN-D.js";import"./with-label-aware-Ef9Lm0aI.js";import"./button-toggle-group-CH9NiA1W.js";import"./with-form-associated-BAum3q-z.js";import"./checkbox-Dv_UGdzf.js";import"./icon-button-B_qVG_it.js";import"./switch-CicCqkci.js";import"./tooltip-DxbQteKS.js";import"./chip-set-yZLLHaLw.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
