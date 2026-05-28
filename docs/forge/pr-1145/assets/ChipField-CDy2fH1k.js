import{u as s,j as e,M as n,T as a,C as o}from"./blocks-Y8PQpJk5.js";import{C as l}from"./CustomArgTypes-BDmTmGpo.js";import{C as p,D as d,W as c}from"./ChipField.stories-Bak6yEe3.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BEWXVjd9.js";import"./utils-GdTrqNrR.js";import"./style-map-CY-kgomW.js";import"./directive-jorct-Oe.js";import"./ref-T2_jy34F.js";import"./base-lit-element-BL25fEsh.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-B-QytHW-.js";import"./base-component-CjLGUkBU.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-CWZvffxF.js";import"./tyler-icons-uVJIcwMo.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-BTyKVaN5.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-BmTkV8LG.js";import"./with-default-aria-CU1tsccO.js";import"./a11y-utils-Cc0M_rsz.js";import"./list-vGrIuHeR.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-B-p_OOit.js";import"./focus-indicator-D-wWffhJ.js";import"./list-dropdown-aware-core-BlgecZge.js";import"./list-dropdown-BV5ZCDE6.js";import"./event-utils-C1SDeUaq.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-D_iZGXuR.js";import"./a11y-BxM9_46k.js";import"./text-field-Ci9RdMFE.js";import"./base-field-m2qxsLgV.js";import"./label-D_Zx1zB5.js";import"./button-Bdps6HIR.js";import"./base-button-core-CJe6fGlZ.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-Ck3cfAUB.js";import"./with-form-associated-Cz_4VqQM.js";import"./checkbox-DqtYked6.js";import"./icon-button-BVSucFuv.js";import"./switch-BIKy8F8e.js";import"./tooltip-BDO8tOZg.js";import"./chip-set-PTX7KGqo.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
