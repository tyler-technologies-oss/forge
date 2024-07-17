import{j as e}from"./jsx-runtime-KvxOeJA1.js";import{u as n}from"./index-DfxnnCCN.js";import{M as t,T as a,C as s}from"./index-DyZB1HIv.js";import{C as d}from"./CustomArgTypes-BZo0685U.js";import{R as l,D as c}from"./Radio.stories-DvA368kp.js";import"./iframe-csYPrapo.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-BJOK626P.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./constants-DjE6emXm.js";import"./label-u49DyhbP.js";import"./base-adapter-F7QHxK2H.js";import"./index-Dh0vMUMR.js";import"./button-BZEZMHKM.js";import"./icon-DjINFoyU.js";import"./focus-indicator-BPFZRBe9.js";import"./state-layer-D8bHAvjj.js";import"./base-button-adapter-hYZsLwCN.js";import"./index-CIZ3m0iD.js";import"./with-label-aware-CLWydNrR.js";import"./with-default-aria-B4PYKb3X.js";import"./button-toggle-group-CVRZEG3N.js";import"./with-form-associated-w46sHrbT.js";import"./checkbox-an-Xb1xB.js";import"./icon-button-B2LQlK1e.js";import"./switch-CiP8pWu1.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";function i(r){const o={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...n(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(o.p,{children:"Radios are used when a user must select one option from a set of options. They are used when there are two or more options that are mutually exclusive and the user must select exactly one."}),`
`,e.jsx(s,{of:c}),`
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
`]})]})}function J(r={}){const{wrapper:o}={...n(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(i,{...r})}):i(r)}export{J as default};
