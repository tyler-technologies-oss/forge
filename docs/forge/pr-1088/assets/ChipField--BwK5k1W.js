import{j as e,M as s,T as a,C as o}from"./blocks-D6XQdJGS.js";import{useMDXComponents as n}from"./index-CgTZ97cN.js";import{C as l}from"./CustomArgTypes-C3a3f_JZ.js";import{C as d,D as p,W as c}from"./ChipField.stories-C9Q-udoh.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Cnb5F9mc.js";import"./utils-DGEgauoX.js";import"./style-map-Z3gxGID5.js";import"./directive-jorct-Oe.js";import"./ref-Ac1XO49H.js";import"./service-adapter-CoGDs2_3.js";import"./autocomplete-BKfGx0wN.js";import"./base-component-BWatm2PB.js";import"./feature-detection-D1CqJtyS.js";import"./base-adapter-BuHpYl3d.js";import"./tyler-icons-DRTyRvfU.js";import"./index-DTwfV0k0.js";import"./divider-BUi3LQey.js";import"./linear-progress-Dnev6XAt.js";import"./with-default-aria-BwzGA5R6.js";import"./a11y-utils-uud85_zm.js";import"./list-C8b8SuAB.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-D7Damx7l.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-DFGvzRID.js";import"./property-7AlVDRoA.js";import"./base-lit-element-nuQZHjgk.js";import"./list-dropdown-aware-core-Dfwq2xUy.js";import"./list-dropdown-BKZefFXV.js";import"./event-utils-C1SDeUaq.js";import"./popover-s3N-XehF.js";import"./overlay-CsYzVqz1.js";import"./with-longpress-listener-cAy3D5yE.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-D35b5pv1.js";import"./a11y-BxM9_46k.js";import"./text-field-MYLCgXp6.js";import"./base-field-ROADFQ_3.js";import"./label-Kj8pvEr3.js";import"./button-DXZXr0W0.js";import"./base-button-core--_xZ474B.js";import"./with-label-aware-BdHJcOJ4.js";import"./button-toggle-group-ClnOQd8-.js";import"./with-form-associated-BlRaNIDF.js";import"./checkbox-CbwmbFeN.js";import"./icon-button-DqyShR7E.js";import"./switch-BPgWe-WM.js";import"./tooltip-jHI1dl1O.js";import"./chip-set-CtznOcHY.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
