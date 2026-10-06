import{u as t,j as e,M as a,T as s,C as i}from"./blocks-CmIhzFPq.js";import{C as l}from"./CssOnlyInformation-ouokLBsW.js";import{C as d}from"./CustomArgTypes-9kv-5uq5.js";import{R as p,D as c,C as h}from"./Radio.stories-DC7u8Oip.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DBT2xFc9.js";import"./iframe-BlLbDnlR.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BaIZrU9D.js";import"./class-map-BpS8NEi2.js";import"./directive-CwRn8Fwj.js";import"./style-map-B5Ix9hgE.js";import"./service-adapter-8tADcN_b.js";import"./radio-group-fOpingEl.js";import"./custom-element-DR9AFpIK.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./core-property-Co8uF8PW.js";import"./dom-utils-BDbRr6KM.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./base-component-BFu9bkgC.js";import"./with-element-internals-CFYP_epH.js";import"./a11y-utils-DssnAab5.js";import"./with-label-aware-B4Q13qtt.js";import"./with-form-associated-BZpZ-kob.js";import"./focus-indicator-CIttc_vs.js";import"./floating-ui.dom-DaMtbvS2.js";import"./property-BeWmazHW.js";import"./base-lit-element-C1X2FsrT.js";import"./async-directive-Cu3UApLZ.js";import"./utils-C31il88P.js";import"./state-layer-gtlkuVuf.js";import"./base-adapter-DOky_or5.js";import"./label-hOmdyDz5.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./button-constants-DRqTH6Pv.js";import"./button-toggle-group-constants-CvfmN-z8.js";import"./checkbox-constants-BJ3elUIK.js";import"./icon-button-constants-JHHxiN9v.js";import"./switch-constants-BZVST_qJ.js";function n(r){const o={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:p}),`
`,e.jsx(s,{}),`
`,e.jsx(o.p,{children:"Radios are used when a user must select one option from a set of options. They are used when there are two or more options that are mutually exclusive and the user must select exactly one."}),`
`,e.jsx(i,{of:c}),`
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
`,e.jsx(l,{})]})}function ie(r={}){const{wrapper:o}={...t(),...r.components};return o?e.jsx(o,{...r,children:e.jsx(n,{...r})}):n(r)}export{ie as default};
