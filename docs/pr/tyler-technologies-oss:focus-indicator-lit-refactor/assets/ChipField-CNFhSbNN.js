import{j as e,M as s,T as a,C as o}from"./blocks-Ci80t2jX.js";import{useMDXComponents as n}from"./index-Cqey9dI-.js";import{C as l}from"./CustomArgTypes-D5_RmmzV.js";import{C as d,D as c,W as p}from"./ChipField.stories-D6eTg1MD.js";import"./iframe-Cqs95LDf.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-D0zOu5id.js";import"./style-map-CqUpN2Mv.js";import"./directive-CJw_OlP2.js";import"./ref-DbA_630d.js";import"./service-adapter-BykFeYYZ.js";import"./autocomplete-wAQgqeki.js";import"./constants-BGCYAxRd.js";import"./feature-detection-tRmgbRLz.js";import"./base-adapter-C0vShr2G.js";import"./icon-eJOvSyyv.js";import"./index-CiLSBptl.js";import"./divider-BT9ZT4ca.js";import"./linear-progress-BTaob5x2.js";import"./with-default-aria-BuZDknr8.js";import"./a11y-utils-u_48QH_E.js";import"./list-CwxN3dUl.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BRTtEqto.js";import"./utils-DY0XlZdW.js";import"./focus-indicator-DoAi9By9.js";import"./base-lit-element-CfuWj_Vj.js";import"./list-dropdown-aware-core-aQW-pvIy.js";import"./list-dropdown-CoLmjvEU.js";import"./event-utils-C1SDeUaq.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./with-longpress-listener--RsduI3u.js";import"./dismissible-stack-Bl2voxQy.js";import"./skeleton-fsmWNbya.js";import"./a11y-BxM9_46k.js";import"./text-field-DpXPd0el.js";import"./base-field-Ci6votMZ.js";import"./label-DSbs6spH.js";import"./button-C8oqjrq6.js";import"./base-button-adapter-DmujTNGw.js";import"./with-label-aware-BxafsAK6.js";import"./button-toggle-group-BalQXvu-.js";import"./with-form-associated-DboGVkoL.js";import"./checkbox-CkpXn7kA.js";import"./icon-button-Cc-POQpg.js";import"./switch-5f4KoIm0.js";import"./tooltip-CRaofu57.js";import"./chip-set-ClNcFxE-.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:c}),`
`,e.jsx(i.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-chip-field>"})," component is deprecated and will be removed in a future release. Existing components such as ",e.jsx(i.code,{children:"<forge-text-field>"}),` and
`,e.jsx(i.code,{children:"<forge-select>"})," will be able to be used to create similar functionality which removes the current need for this specialized component."]}),`
`,e.jsx(i.h2,{id:"with-autocomplete",children:"With Autocomplete"}),`
`,e.jsx(i.p,{children:"It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type."}),`
`,e.jsx(o,{of:p}),`
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
`]})]})}function ae(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ae as default};
