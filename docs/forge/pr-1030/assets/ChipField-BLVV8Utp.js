import{j as e,M as s,T as a,C as o}from"./blocks-CQxU_hvH.js";import{useMDXComponents as n}from"./index-K_CAaOWv.js";import{C as l}from"./CustomArgTypes-Brq4Kf9x.js";import{C as p,D as d,W as c}from"./ChipField.stories-CPTLwG4P.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DriYmvez.js";import"./utils-BA5-_s-B.js";import"./style-map-igkUgyFI.js";import"./directive-jorct-Oe.js";import"./ref-CbYPxrRw.js";import"./base-lit-element-CEUhu6q-.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-CAYLO06d.js";import"./base-component-uHQQIvwK.js";import"./dom-utils-Cm-jqRNo.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-CRD6uec5.js";import"./tyler-icons-Bwr0J3kB.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-nmR2RwOe.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-C_nfyJF6.js";import"./with-default-aria-B3uYJhs1.js";import"./a11y-utils-DC7k5H9Q.js";import"./list-B3MPjcuq.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BAlZ4sKA.js";import"./focus-indicator-BrbZv0xw.js";import"./list-dropdown-aware-core-BrtaMfM1.js";import"./list-dropdown-DkULjLho.js";import"./event-utils-C1SDeUaq.js";import"./popover-COK8oi_U.js";import"./overlay-BB80zovl.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-CerfHp_D.js";import"./a11y-BxM9_46k.js";import"./text-field-krqlEIb4.js";import"./base-field-Dw-RN5vF.js";import"./label-BxEiOTH9.js";import"./button-DFgZemWW.js";import"./base-button-core-8vnOoMNq.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-CHBa_PC5.js";import"./with-form-associated-CNArq4wQ.js";import"./checkbox-CKn84_oJ.js";import"./icon-button-3w-6zUmZ.js";import"./switch-QiY0xOLb.js";import"./tooltip-DIuICY4U.js";import"./chip-set-CFRrbic5.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function me(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{me as default};
