import{j as e,M as l,T as s,C as n}from"./index-B_wXwpur.js";import{useMDXComponents as r}from"./index-DXn-3eKA.js";import{C as a}from"./CustomArgTypes-Biq5BHH5.js";import{T as d,D as c,a as p,L as h,b as x}from"./TextField.stories-CV4pj4Po.js";import"./iframe-CoEFcktY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-C9ubTmun.js";import"./lit-element-BuSzPo2N.js";import"./lit-html-Ox1a2bD1.js";import"./style-map-CeIg-cuG.js";import"./directive-CJw_OlP2.js";import"./decorators-CiKOYuay.js";import"./feature-detection-CY6TVbRZ.js";import"./text-field-CGeuarYD.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./icon-Bqgt-0wI.js";import"./index-CiLSBptl.js";import"./base-field-DFQttNW4.js";import"./focus-indicator-Cgfkaa3d.js";import"./utils-CRxrUqQD.js";import"./label-BM0pESju.js";import"./button-CC-L5W3b.js";import"./state-layer-BVsNuAhs.js";import"./base-button-adapter-W6Bt-QcJ.js";import"./with-label-aware-DkCFYjRm.js";import"./with-default-aria-srFr2cNz.js";import"./a11y-utils-DGb1vALN.js";import"./button-toggle-group-5BDyeLck.js";import"./with-form-associated-9Gj0jfo_.js";import"./checkbox-CF9fzMIR.js";import"./icon-button-BkG6pY8m.js";import"./switch-ZI6WyDhE.js";import"./tooltip-BRjtM3KC.js";import"./overlay-D__9laOM.js";import"./with-longpress-listener-BDlFima-.js";import"./dismissible-stack-BdWcv7_4.js";function o(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
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
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"?path=/docs/components-field--docs#css-only",children:"field documentation"})," for more information on how to create a CSS-only text-field."]})]})}function $(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{$ as default};
