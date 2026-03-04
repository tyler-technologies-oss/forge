import{j as e,M as l,T as s,C as n}from"./blocks-BGXNjPUL.js";import{useMDXComponents as r}from"./index-C9aBCO2c.js";import{C as a}from"./CustomArgTypes-DKQaY4X4.js";import{T as d,D as c,a as p,L as h,b as x}from"./TextField.stories-CJTbXNDF.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-6jvvl83j.js";import"./utils-BQsOXphk.js";import"./style-map-OsH3dYIv.js";import"./directive-jorct-Oe.js";import"./decorators-1bDp89Ox.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-DRhXxEw0.js";import"./base-component-B5xZY7DP.js";import"./dom-utils-CBD4z_3d.js";import"./feature-detection-DBnB2p_f.js";import"./base-adapter-DZ7lVcI0.js";import"./tyler-icons-_ZRRE207.js";import"./base-lit-element-DuNePglZ.js";import"./constants-uy-3DCWv.js";import"./base-field-Zo4to8fb.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./focus-indicator-uWMef9QC.js";import"./utils-DU-9AqTO.js";import"./label-DeJt3_F9.js";import"./button-gG20MWYF.js";import"./state-layer-CDycYdPe.js";import"./base-button-core-l79ZJf1a.js";import"./with-label-aware-rB4nYfN7.js";import"./with-default-aria-qCwd8R18.js";import"./a11y-utils-OON17uxD.js";import"./button-toggle-group-BEE-9owA.js";import"./with-form-associated-FNJFgCdg.js";import"./checkbox-C-zSna6d.js";import"./icon-button-Bs31_lcM.js";import"./switch-DDhwKpy9.js";import"./tooltip-D6IG9xiN.js";import"./overlay-CeKA2Vs0.js";import"./with-longpress-listener-CURrVc38.js";import"./dismissible-stack-xq-0Rg1q.js";function o(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"Text fields allow users to input and edit text values. They can be single-line or multi-line, and can include support text."}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(t.h2,{id:"textarea",children:"Textarea"}),`
`,e.jsxs(t.p,{children:["Text fields allow for providing a ",e.jsx(t.code,{children:"<textarea>"})," element in place of an ",e.jsx(t.code,{children:"<input>"})," element for multi-line text input."]}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(t.h2,{id:"label-position",children:"Label Position"}),`
`,e.jsxs(t.p,{children:["The text field supports a ",e.jsx(t.code,{children:"labelPosition"})," property/attribute to control the position of the label. The default value is ",e.jsx(t.code,{children:'"inset"'}),`
where the label is positioned inside the text field, but it can also be set to `,e.jsx(t.code,{children:'"block-start"'}),` or "inline-start" to position the
label above or to the left of the text field respectively.`]}),`
`,e.jsx(t.h3,{id:"block-start",children:"Block Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label above the text field."}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h3,{id:"inline-start",children:"Inline Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label to the left of the text field."}),`
`,e.jsx(n,{of:x}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The ",e.jsx(t.code,{children:"labelPosition"})," property is available via ",e.jsx(t.a,{href:"?path=/docs/getting-started-global-configuration--docs",children:"global configuration"}),` if
you want to set adjust the default value for all text fields in your application.`]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Ensure that if you are not using a ",e.jsx(t.code,{children:"<label>"})," element, you provide an ",e.jsx(t.code,{children:"aria-label"})," or ",e.jsx(t.code,{children:"aria-labelledby"})," attribute to the ",e.jsx(t.code,{children:"<input>"})," element."]}),`
`]}),`
`,e.jsx(t.h3,{id:"required-field-markup",children:"Required Field Markup"}),`
`,e.jsxs(t.p,{children:["To ensure proper validation and accessibility, apply the ",e.jsx(t.code,{children:"required"})," attribute to both the ",e.jsx(t.code,{children:"<forge-text-field>"})," component and its nested ",e.jsx(t.code,{children:"<input>"})," element:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The ",e.jsx(t.code,{children:"required"})," attribute on ",e.jsx(t.code,{children:"<forge-text-field>"})," is ",e.jsx(t.strong,{children:"presentational"}),", used to display the required field indicator in the UI."]}),`
`,e.jsxs(t.li,{children:["The ",e.jsx(t.code,{children:"required"})," attribute on the nested ",e.jsx(t.code,{children:"<input>"})," is ",e.jsx(t.strong,{children:"semantic"}),", enabling native form validation and improving accessibility support."]}),`
`]}),`
`,e.jsx(t.p,{children:e.jsx(t.strong,{children:"Example:"})}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-text-field required>
  <input required />
</forge-text-field>
`})}),`
`,e.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(t.p,{children:'The text-field component is also available as a CSS-only component. This is a variant of the "field" component.'}),`
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"?path=/docs/components-field--docs#css-only",children:"field documentation"})," for more information on how to create a CSS-only text-field."]})]})}function te(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{te as default};
