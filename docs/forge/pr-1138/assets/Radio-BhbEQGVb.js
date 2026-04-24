import{u as t,j as e,M as a,T as s,C as i}from"./blocks-lhIR4LWW.js";import{C as l}from"./CssOnlyInformation-D_vSq02b.js";import{C as d}from"./CustomArgTypes-Bj3ah6A5.js";import{R as c,D as p,C as h}from"./Radio.stories-DKboI_VS.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-KAvO3ccT.js";import"./utils-QQyHyWEl.js";import"./class-map-CKj0Y-2z.js";import"./directive-jorct-Oe.js";import"./style-map-DBla6-y8.js";import"./service-adapter-8tADcN_b.js";import"./label-ChMnju8c.js";import"./base-component-DL0YqY-6.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-adapter-BZsNucGb.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-B5NlTkj8.js";import"./tyler-icons-BC4d5Cu4.js";import"./base-lit-element-gvcOHsCv.js";import"./focus-indicator-DE6BE6Uv.js";import"./utils-DU-9AqTO.js";import"./state-layer-Cext-Euv.js";import"./base-button-core-CZBLegUR.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-DIbVfoWG.js";import"./a11y-utils-5_BtrjMB.js";import"./button-toggle-group-E89YZq-N.js";import"./with-form-associated-C0Ge4dkG.js";import"./checkbox-CMtbRh3b.js";import"./icon-button-Cwrtmqh7.js";import"./switch-ID_p_BOB.js";function n(r){const o={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c}),`
`,e.jsx(s,{}),`
`,e.jsx(o.p,{children:"Radios are used when a user must select one option from a set of options. They are used when there are two or more options that are mutually exclusive and the user must select exactly one."}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(o.h2,{id:"grouping",children:"Grouping"}),`
`,e.jsxs(o.p,{children:[`Radio buttons should be part of a radio group and interpreted as such by assistive technologies such as screen readers. By default, radios will form an implicit group
based on their `,e.jsx(o.code,{children:"name"})," attribute. If you want to group radios explicitly you can either provide a ",e.jsx(o.code,{children:'role="radiogroup"'}),` attribute to an ancestor element, or use the
`,e.jsx(o.code,{children:"<forge-radio-group>"})," element."]}),`
`,e.jsx(o.h3,{id:"name",children:"Name"}),`
`,e.jsxs(o.p,{children:["This example shows how radios are grouped implicitly by their ",e.jsx(o.code,{children:"name"})," attribute."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<forge-radio name="default">Option 1</forge-radio>
<forge-radio name="default">Option 2</forge-radio>
<forge-radio name="default">Option 3</forge-radio>
`})}),`
`,e.jsx(o.h3,{id:"role",children:"Role"}),`
`,e.jsxs(o.p,{children:["This example shows how radios are grouped explicitly by their ",e.jsx(o.code,{children:"name"})," and the ancestor element's ",e.jsx(o.code,{children:'role="radiogroup"'})," attribute to provide a label for the group."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<div role="radiogroup" aria-label="Choose a radio option">
  <forge-radio name="default">Option 1</forge-radio>
  <forge-radio name="default">Option 2</forge-radio>
  <forge-radio name="default">Option 3</forge-radio>
</div>
`})}),`
`,e.jsx(o.h3,{id:"radio-group",children:"Radio Group"}),`
`,e.jsxs(o.p,{children:["This example shows how radios are grouped explicitly by the ",e.jsx(o.code,{children:"<forge-radio-group>"})," element."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<forge-radio-group>
  <forge-label legend>Choose an option</forge-label>
  <forge-radio value="option1">Option 1</forge-radio>
  <forge-radio value="option2">Option 2</forge-radio>
  <forge-radio value="option3">Option 3</forge-radio>
</forge-radio-group>
`})}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:[e.jsx(o.strong,{children:"Note:"})," Take note of the ",e.jsx(o.code,{children:"<forge-label>"})," element with the ",e.jsx(o.code,{children:"legend"})," attribute. This is used to provide an accessible label for the radio group."]}),`
`]}),`
`,e.jsx(o.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Ensure that all of the controls that are accessible by a mouse are also accessible by keyboard.",`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"Ensure the controls are reachable by the tab key."}),`
`,e.jsx(o.li,{children:"Ensure each control can be updated or activated by the keyboard."}),`
`]}),`
`]}),`
`,e.jsxs(o.li,{children:["Radio buttons should be part of a radio group and interpreted as such by assistive technologies such as screen readers.",`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["Ensure that your radio group also has an ",e.jsx(o.code,{children:"aria-label"})," attribute describing its purpose."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(o.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(o.p,{children:"The radio component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(l,{})]})}function V(r={}){const{wrapper:o}={...t(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(n,{...r})}):n(r)}export{V as default};
