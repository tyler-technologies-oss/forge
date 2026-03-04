import{j as e,M as l,T as s,C as n}from"./blocks-GmgB-FWo.js";import{useMDXComponents as r}from"./index-CS3Ff0us.js";import{C as a}from"./CustomArgTypes-CJZIelLO.js";import{T as d,D as c,a as h,L as p,b as x}from"./TextField.stories-4PsAhUIZ.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BJbEpszz.js";import"./utils-3yMKERXj.js";import"./style-map-Bs1iWlfZ.js";import"./directive-jorct-Oe.js";import"./decorators-D_g6LYzg.js";import"./service-adapter-8tADcN_b.js";import"./text-field-oibF3m6m.js";import"./base-component-DXuuJMhq.js";import"./feature-detection-BkmzHgah.js";import"./base-adapter-Dwntuuli.js";import"./tyler-icons-BS8_pNWa.js";import"./index-DTwfV0k0.js";import"./base-field-JVYJIdv9.js";import"./focus-indicator-D5rXac5k.js";import"./base-lit-element-b6fbKSqi.js";import"./utils-DU-9AqTO.js";import"./label-64IPd7Ff.js";import"./button-DxNiNzFb.js";import"./state-layer-Dr4I3-ea.js";import"./base-button-core-BzOydBeZ.js";import"./with-label-aware-Bg6h2rtY.js";import"./with-default-aria-CXzIDxFk.js";import"./a11y-utils-DFScBSOY.js";import"./button-toggle-group-CuTLB-F0.js";import"./with-form-associated-Csw0cMu6.js";import"./checkbox-CYcpnhwL.js";import"./icon-button-BJe5BT5b.js";import"./switch-CBC5az3f.js";import"./tooltip-DZbumLUT.js";import"./overlay-CnRxeVdV.js";import"./with-longpress-listener-D9AHvrpn.js";import"./dismissible-stack-xq-0Rg1q.js";function o(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"Text fields allow users to input and edit text values. They can be single-line or multi-line, and can include support text."}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(t.h2,{id:"textarea",children:"Textarea"}),`
`,e.jsxs(t.p,{children:["Text fields allow for providing a ",e.jsx(t.code,{children:"<textarea>"})," element in place of an ",e.jsx(t.code,{children:"<input>"})," element for multi-line text input."]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h2,{id:"label-position",children:"Label Position"}),`
`,e.jsxs(t.p,{children:["The text field supports a ",e.jsx(t.code,{children:"labelPosition"})," property/attribute to control the position of the label. The default value is ",e.jsx(t.code,{children:'"inset"'}),`
where the label is positioned inside the text field, but it can also be set to `,e.jsx(t.code,{children:'"block-start"'}),` or "inline-start" to position the
label above or to the left of the text field respectively.`]}),`
`,e.jsx(t.h3,{id:"block-start",children:"Block Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label above the text field."}),`
`,e.jsx(n,{of:p}),`
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
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"?path=/docs/components-field--docs#css-only",children:"field documentation"})," for more information on how to create a CSS-only text-field."]})]})}function Z(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{Z as default};
