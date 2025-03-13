import{j as e,M as s,T as a,C as o}from"./index-BOmXBgU7.js";import{useMDXComponents as n}from"./index-BA3TJ4es.js";import{C as l}from"./CustomArgTypes-CRAkUo6U.js";import{C as p,D as d,W as c}from"./ChipField.stories-Cvww7giC.js";import"./iframe-BAdE3if5.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DOJ_BQTN.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./index-Cf3axooF.js";import"./v4-CQkTLCs1.js";import"./ref-DJjbfkOF.js";import"./directive-helpers-DcB0QpIl.js";import"./feature-detection-DRCh51Sa.js";import"./autocomplete-BKKp3DyP.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./index-CbZAylpk.js";import"./divider-75u-P60s.js";import"./icon-B5R9pr_c.js";import"./index-BgGCUUFB.js";import"./linear-progress-CqfIuBkR.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./list-B1GChOkL.js";import"./state-layer-BM79vS2j.js";import"./focus-indicator-N8y3p24x.js";import"./list-dropdown-aware-core-B6iU4WLG.js";import"./list-dropdown-1mNXdaxk.js";import"./event-utils-C1SDeUaq.js";import"./popover-B7EDw8Rs.js";import"./overlay-D-D6lM0z.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-C6sDCr8n.js";import"./skeleton-D2S3-1Sc.js";import"./a11y-BxM9_46k.js";import"./text-field-DAOefgd3.js";import"./base-field-P6wVtFD0.js";import"./label-BlnZVKYh.js";import"./button-C8Y3s8GC.js";import"./base-button-adapter-L8S_LI8j.js";import"./with-label-aware-OEbK3wHg.js";import"./button-toggle-group-CNMe1aV9.js";import"./with-form-associated-Bje5Hee1.js";import"./checkbox-BtFRAWss.js";import"./icon-button-B45Yg2R2.js";import"./switch-O6nuM4w_.js";import"./tooltip-DJSv_HE1.js";import"./chip-set-GTi-FvZP.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function ce(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ce as default};
