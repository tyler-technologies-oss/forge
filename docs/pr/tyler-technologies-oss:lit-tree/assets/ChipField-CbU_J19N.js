import{j as e,M as s,T as a,C as o}from"./index-5RP3f3z-.js";import{useMDXComponents as n}from"./index-pGllwBrH.js";import{C as l}from"./CustomArgTypes-ITtaNNPL.js";import{C as p,D as d,W as c}from"./ChipField.stories-DC5TTtWo.js";import"./iframe-DyxU3mHA.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DzhRrs8R.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./ref-DJjbfkOF.js";import"./directive-helpers-DcB0QpIl.js";import"./feature-detection-ONR9WHvu.js";import"./autocomplete-BgOuagpQ.js";import"./constants-BjnHqKgS.js";import"./base-adapter-CQdYccXX.js";import"./index-CbZAylpk.js";import"./divider-CpwmAwgQ.js";import"./icon-Ctzrqx63.js";import"./index-BgGCUUFB.js";import"./linear-progress-DPUjJFYN.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";import"./list-DjbLwyYT.js";import"./state-layer-CxIpCmDW.js";import"./focus-indicator-I_IrwQSK.js";import"./list-dropdown-aware-core-BdubphoD.js";import"./list-dropdown-D4ar2DiO.js";import"./event-utils-C1SDeUaq.js";import"./popover-C6QnYMTq.js";import"./overlay-D8lPnEIG.js";import"./with-longpress-listener-S3ft74cg.js";import"./dismissible-stack-Dx1UJAF9.js";import"./skeleton-Dfdgg-pt.js";import"./a11y-BxM9_46k.js";import"./text-field-jJqOSL3m.js";import"./base-field-Berl2o5-.js";import"./label-0TgDsZHI.js";import"./button-ClwhnaJK.js";import"./base-button-adapter-BUcmIwIL.js";import"./with-label-aware-DAaZnhel.js";import"./button-toggle-group-SI6kj2fb.js";import"./with-form-associated-Dm8KqB07.js";import"./checkbox-BMGViPZ8.js";import"./icon-button-D5fTQ0k5.js";import"./switch-BTIWsPYn.js";import"./tooltip-CTpoJPTH.js";import"./chip-set-DUJKse4y.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
