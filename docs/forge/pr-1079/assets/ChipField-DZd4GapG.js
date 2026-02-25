import{j as e,M as s,T as a,C as o}from"./blocks-ivsuwfU9.js";import{useMDXComponents as n}from"./index-DeVzph4F.js";import{C as l}from"./CustomArgTypes-CwJxfKWE.js";import{C as d,D as p,W as c}from"./ChipField.stories-DStEU7EC.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CvOKOd3F.js";import"./utils-zCyTXnrZ.js";import"./style-map-D9Aeadbf.js";import"./directive-jorct-Oe.js";import"./ref-DAqVVuuC.js";import"./service-adapter-CoGDs2_3.js";import"./autocomplete-DNEfXPT6.js";import"./base-component-BWatm2PB.js";import"./feature-detection-D1CqJtyS.js";import"./base-adapter-BuHpYl3d.js";import"./tyler-icons-DRTyRvfU.js";import"./index-DTwfV0k0.js";import"./divider-BUi3LQey.js";import"./linear-progress-Dnev6XAt.js";import"./with-default-aria-BwzGA5R6.js";import"./a11y-utils-uud85_zm.js";import"./list-DrfuQcV0.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-D7Damx7l.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-D4rjhUva.js";import"./property-BJ9JucP8.js";import"./base-lit-element-DueX1byJ.js";import"./list-dropdown-aware-core-DFAD9dm7.js";import"./list-dropdown-DeV_3Cst.js";import"./event-utils-C1SDeUaq.js";import"./popover-s3N-XehF.js";import"./overlay-CsYzVqz1.js";import"./with-longpress-listener-cAy3D5yE.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-D35b5pv1.js";import"./a11y-BxM9_46k.js";import"./text-field-TrCZ3xYL.js";import"./base-field-BDjPjPCs.js";import"./label-DjhrjYcA.js";import"./button-Bi90NRzP.js";import"./base-button-core-BdHUKNnX.js";import"./with-label-aware-BdHJcOJ4.js";import"./button-toggle-group-BVIytbZM.js";import"./with-form-associated-BlRaNIDF.js";import"./checkbox-DW8QQYdx.js";import"./icon-button-dDjQtfj0.js";import"./switch-DReLaeSi.js";import"./tooltip-jHI1dl1O.js";import"./chip-set-BKprp8Rq.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
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
