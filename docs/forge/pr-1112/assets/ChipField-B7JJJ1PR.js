import{j as e,M as s,T as a,C as o}from"./blocks-Bj4UIZ3Q.js";import{useMDXComponents as n}from"./index-C-T8XxeZ.js";import{C as l}from"./CustomArgTypes-HIi5YJFX.js";import{C as p,D as d,W as c}from"./ChipField.stories-BvVFeft-.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-FS6UuRTf.js";import"./utils-Dyztg_A4.js";import"./style-map-EJs35e7b.js";import"./directive-jorct-Oe.js";import"./ref-Dw8cL2_y.js";import"./base-lit-element-rVPJIuYM.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-BuJWc3us.js";import"./base-component-D7FTQsYl.js";import"./dom-utils-B5Tbf4eK.js";import"./base-adapter-D-ThygVj.js";import"./tyler-icons-iDvhFOMC.js";import"./index-DTwfV0k0.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-MVk0ogln.js";import"./utils-DU-9AqTO.js";import"./linear-progress-DJCUZyG6.js";import"./with-default-aria-ee86JPIo.js";import"./a11y-utils-DBLgTZVa.js";import"./list-B6gOTQYv.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-D0PE-_Ks.js";import"./focus-indicator-DXnp9Plt.js";import"./list-dropdown-aware-core-C6aJ4PBt.js";import"./list-dropdown-CT_shKrw.js";import"./event-utils-C1SDeUaq.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-Ctt20BWR.js";import"./a11y-BxM9_46k.js";import"./text-field-CENGspUw.js";import"./base-field-BJ66MH2R.js";import"./label-DM98B8Eo.js";import"./button-CbbznlWX.js";import"./base-button-core-BolENla4.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-DtdFckgK.js";import"./with-form-associated-BeklrvsL.js";import"./checkbox-DJio2xZg.js";import"./icon-button-rbnRrweT.js";import"./switch-C1g5po_j.js";import"./tooltip-CNBOgnFN.js";import"./chip-set-juYio6FQ.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function de(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{de as default};
