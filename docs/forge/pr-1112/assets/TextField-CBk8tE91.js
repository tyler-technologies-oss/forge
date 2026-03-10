import{j as e,M as l,T as s,C as n}from"./blocks-BFS-vXbr.js";import{useMDXComponents as r}from"./index-DroSh8Z6.js";import{C as a}from"./CustomArgTypes-CXF69wwr.js";import{T as d,D as c,a as p,L as h,b as x}from"./TextField.stories-_Jnsg27j.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BqpmPwq_.js";import"./utils-Dyztg_A4.js";import"./style-map-DSsT6G9H.js";import"./directive-jorct-Oe.js";import"./decorators-CFyglySJ.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BDwQUTE6.js";import"./base-component-D7FTQsYl.js";import"./dom-utils-B5Tbf4eK.js";import"./base-adapter-D-ThygVj.js";import"./tyler-icons-iDvhFOMC.js";import"./index-DTwfV0k0.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./base-field-CpGwF63l.js";import"./focus-indicator-BHHgalS6.js";import"./base-lit-element-Duab_X8r.js";import"./utils-DU-9AqTO.js";import"./label-DK09rgTn.js";import"./button-Bttm48HU.js";import"./state-layer-D0PE-_Ks.js";import"./base-button-core-B_hhG_0U.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-ee86JPIo.js";import"./a11y-utils-DBLgTZVa.js";import"./button-toggle-group-fRLgIYT2.js";import"./with-form-associated-BeklrvsL.js";import"./checkbox-HEdstB8E.js";import"./icon-button-v27EN9qr.js";import"./switch-kS9Yl3-l.js";import"./tooltip-CNBOgnFN.js";import"./overlay-Btn1tEyh.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";function o(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
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
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"?path=/docs/components-field--docs#css-only",children:"field documentation"})," for more information on how to create a CSS-only text-field."]})]})}function ee(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{ee as default};
