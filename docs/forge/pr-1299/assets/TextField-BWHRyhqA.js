import{u as r,j as e,M as l,T as s,C as o}from"./blocks-DQqW71vk.js";import{C as a}from"./CustomArgTypes-Dhqpume4.js";import{T as d,D as p,a as c,L as h,b as m}from"./TextField.stories-RimuVfto.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BHDj6Grs.js";import"./iframe-Q5Y6f9_2.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CMQDsowF.js";import"./style-map-BzWo1Eiz.js";import"./directive-CwRn8Fwj.js";import"./decorators-BXQZ26Cj.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BbVn4awb.js";import"./custom-element-DR9AFpIK.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./core-property-Co8uF8PW.js";import"./tyler-icons-_o7MAz4c.js";import"./base-field-Du0AVBZp.js";import"./base-component-BFu9bkgC.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./focus-indicator-DqJ5p9rG.js";import"./floating-ui.dom-DaMtbvS2.js";import"./property-CHuf62lW.js";import"./base-lit-element-BJmaTpM6.js";import"./async-directive-CN_AuLrw.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./utils-C31il88P.js";import"./dom-utils-BDbRr6KM.js";import"./base-adapter-DOky_or5.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./label-DixtrICL.js";import"./button-constants-DRqTH6Pv.js";import"./button-toggle-group-constants-CvfmN-z8.js";import"./checkbox-constants-BJ3elUIK.js";import"./icon-button-constants-JHHxiN9v.js";import"./switch-constants-BZVST_qJ.js";import"./with-label-aware-B4Q13qtt.js";import"./icon-CCxVJeCf.js";import"./icon-button-btwNpeCp.js";import"./class-map-DfIRgzLU.js";import"./base-button-BUXjqZrC.js";import"./state-bdshDuzQ.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./state-layer-gtlkuVuf.js";import"./tooltip-DV18Ft3B.js";import"./overlay-BkGC6i7p.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./with-element-internals-CFYP_epH.js";import"./object-utils-CUPteeNI.js";function n(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"Text fields allow users to input and edit text values. They can be single-line or multi-line, and can include support text."}),`
`,e.jsx(o,{of:p}),`
`,e.jsx(t.h2,{id:"textarea",children:"Textarea"}),`
`,e.jsxs(t.p,{children:["Text fields allow for providing a ",e.jsx(t.code,{children:"<textarea>"})," element in place of an ",e.jsx(t.code,{children:"<input>"})," element for multi-line text input."]}),`
`,e.jsx(o,{of:c}),`
`,e.jsx(t.h2,{id:"label-position",children:"Label Position"}),`
`,e.jsxs(t.p,{children:["The text field supports a ",e.jsx(t.code,{children:"labelPosition"})," property/attribute to control the position of the label. The default value is ",e.jsx(t.code,{children:'"inset"'}),`
where the label is positioned inside the text field, but it can also be set to `,e.jsx(t.code,{children:'"block-start"'}),` or "inline-start" to position the
label above or to the left of the text field respectively.`]}),`
`,e.jsx(t.h3,{id:"block-start",children:"Block Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label above the text field."}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(t.h3,{id:"inline-start",children:"Inline Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label to the left of the text field."}),`
`,e.jsx(o,{of:m}),`
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
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"?path=/docs/components-field--docs#css-only",children:"field documentation"})," for more information on how to create a CSS-only text-field."]})]})}function fe(i={}){const{wrapper:t}={...r(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(n,{...i})}):n(i)}export{fe as default};
