import{u as s,j as e,M as n,T as a,C as o}from"./blocks-BboKULtb.js";import{C as l}from"./CustomArgTypes-CDVS6J2h.js";import{C as p,D as d,W as c}from"./ChipField.stories-C0zgqs35.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-MktPgWAA.js";import"./utils-C6q7qu_A.js";import"./style-map-6XxNn_yc.js";import"./directive-jorct-Oe.js";import"./ref-sTCHvy_k.js";import"./base-lit-element-B1_PmYbc.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-B80xgOIJ.js";import"./base-component-CjLGUkBU.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-CWZvffxF.js";import"./tyler-icons-0-ZTEdj-.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-DTjwMswR.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-BmTkV8LG.js";import"./with-default-aria-CU1tsccO.js";import"./a11y-utils-Cc0M_rsz.js";import"./list-DgmFnUWQ.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-B-p_OOit.js";import"./focus-indicator-C22xxO9c.js";import"./list-dropdown-aware-core-Ca0vASFB.js";import"./list-dropdown-BLGn1gMS.js";import"./event-utils-C1SDeUaq.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-D_iZGXuR.js";import"./a11y-BxM9_46k.js";import"./text-field-CiiLUOIM.js";import"./base-field-AnwAwN2s.js";import"./label-Dsxzj2Q9.js";import"./button-CLmWBSd0.js";import"./base-button-core-cX0cdbOc.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-CWHFPTny.js";import"./with-form-associated-Cz_4VqQM.js";import"./checkbox-DL9PJXu7.js";import"./icon-button-DJuSwMyH.js";import"./switch-B9Ie-WGO.js";import"./tooltip-BDO8tOZg.js";import"./chip-set-BhMlB6zT.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
