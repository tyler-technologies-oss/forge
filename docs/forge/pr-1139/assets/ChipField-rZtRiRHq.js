import{u as s,j as e,M as n,T as a,C as o}from"./blocks-BsMblH_x.js";import{C as l}from"./CustomArgTypes-DeK6Go89.js";import{C as p,D as d,W as c}from"./ChipField.stories-D1ZnPIgl.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BK3r3gy1.js";import"./utils-ZPyYhNMY.js";import"./style-map-B-zzhRls.js";import"./directive-jorct-Oe.js";import"./ref-CHUXG27-.js";import"./base-lit-element-CpSLQPQa.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-DJ63dKj8.js";import"./base-component-DuGK7lj-.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-BUzokRGk.js";import"./tyler-icons-uU9Yd7lf.js";import"./constants-CPXBix-M.js";import"./feature-detection-3Hxzrcpn.js";import"./divider-BG1pHrzo.js";import"./utils-DU-9AqTO.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./icon-CXw8uXM_.js";import"./linear-progress-D8EbdkBB.js";import"./with-default-aria-DsVOZgoU.js";import"./a11y-utils-zbntmbh3.js";import"./list-CRxpAe8T.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-Kw6pmYRH.js";import"./focus-indicator-BBtCjyD8.js";import"./list-dropdown-aware-core-DrP3vGXx.js";import"./list-dropdown-DR9JShTz.js";import"./event-utils-C1SDeUaq.js";import"./popover-HtFB3a_u.js";import"./overlay-B3G4TIM3.js";import"./with-longpress-listener-dBAnuCiK.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-CAo0Ux7j.js";import"./a11y-BxM9_46k.js";import"./text-field-Cel5Wjfj.js";import"./base-field-DWygkCL_.js";import"./label-BfNTkqXX.js";import"./button-558tNDpa.js";import"./base-button-core-yIcCgPXn.js";import"./with-label-aware-DlKNrMSu.js";import"./button-toggle-group-B_NQutYT.js";import"./with-form-associated-DOdwTZuf.js";import"./checkbox-Czva33aP.js";import"./icon-button-Mxsm8Q6s.js";import"./switch-AGgnckDO.js";import"./tooltip-CePIGaWS.js";import"./chip-set-DfdspMPI.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
`]})]})}function me(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{me as default};
