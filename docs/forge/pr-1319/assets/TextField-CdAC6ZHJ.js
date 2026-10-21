import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-92lRto7J.js";import{n as c,t as l}from"./CustomArgTypes-sQOLn0vT.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./TextField.stories-DOHH3wxc.js";function g(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:d}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(n.p,{children:`Text fields allow users to input and edit text values. They can be single-line or multi-line, and can include support text.`}),`
`,(0,v.jsx)(a,{of:h}),`
`,(0,v.jsx)(n.h2,{id:`textarea`,children:`Textarea`}),`
`,(0,v.jsxs)(n.p,{children:[`Text fields allow for providing a `,(0,v.jsx)(n.code,{children:`<textarea>`}),` element in place of an `,(0,v.jsx)(n.code,{children:`<input>`}),` element for multi-line text input.`]}),`
`,(0,v.jsx)(a,{of:u}),`
`,(0,v.jsx)(n.h2,{id:`label-position`,children:`Label Position`}),`
`,(0,v.jsxs)(n.p,{children:[`The text field supports a `,(0,v.jsx)(n.code,{children:`labelPosition`}),` property/attribute to control the position of the label. The default value is `,(0,v.jsx)(n.code,{children:`"inset"`}),`
where the label is positioned inside the text field, but it can also be set to `,(0,v.jsx)(n.code,{children:`"block-start"`}),` or "inline-start" to position the
label above or to the left of the text field respectively.`]}),`
`,(0,v.jsx)(n.h3,{id:`block-start`,children:`Block Start`}),`
`,(0,v.jsx)(n.p,{children:`This variant positions the label above the text field.`}),`
`,(0,v.jsx)(a,{of:f}),`
`,(0,v.jsx)(n.h3,{id:`inline-start`,children:`Inline Start`}),`
`,(0,v.jsx)(n.p,{children:`This variant positions the label to the left of the text field.`}),`
`,(0,v.jsx)(a,{of:m}),`
`,(0,v.jsxs)(n.blockquote,{children:[`
`,(0,v.jsxs)(n.p,{children:[(0,v.jsx)(n.strong,{children:`Note:`}),` The `,(0,v.jsx)(n.code,{children:`labelPosition`}),` property is available via `,(0,v.jsx)(n.a,{href:`?path=/docs/getting-started-global-configuration--docs`,children:`global configuration`}),` if
you want to set adjust the default value for all text fields in your application.`]}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(l,{}),`
`,(0,v.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[`Ensure that if you are not using a `,(0,v.jsx)(n.code,{children:`<label>`}),` element, you provide an `,(0,v.jsx)(n.code,{children:`aria-label`}),` or `,(0,v.jsx)(n.code,{children:`aria-labelledby`}),` attribute to the `,(0,v.jsx)(n.code,{children:`<input>`}),` element.`]}),`
`]}),`
`,(0,v.jsx)(n.h3,{id:`required-field-markup`,children:`Required Field Markup`}),`
`,(0,v.jsxs)(n.p,{children:[`To ensure proper validation and accessibility, apply the `,(0,v.jsx)(n.code,{children:`required`}),` attribute to both the `,(0,v.jsx)(n.code,{children:`<forge-text-field>`}),` component and its nested `,(0,v.jsx)(n.code,{children:`<input>`}),` element:`]}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[`The `,(0,v.jsx)(n.code,{children:`required`}),` attribute on `,(0,v.jsx)(n.code,{children:`<forge-text-field>`}),` is `,(0,v.jsx)(n.strong,{children:`presentational`}),`, used to display the required field indicator in the UI.`]}),`
`,(0,v.jsxs)(n.li,{children:[`The `,(0,v.jsx)(n.code,{children:`required`}),` attribute on the nested `,(0,v.jsx)(n.code,{children:`<input>`}),` is `,(0,v.jsx)(n.strong,{children:`semantic`}),`, enabling native form validation and improving accessibility support.`]}),`
`]}),`
`,(0,v.jsx)(n.p,{children:(0,v.jsx)(n.strong,{children:`Example:`})}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<forge-text-field required>
  <input required />
</forge-text-field>
`})}),`
`,(0,v.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,v.jsx)(n.p,{children:`The text-field component is also available as a CSS-only component. This is a variant of the "field" component.`}),`
`,(0,v.jsxs)(n.p,{children:[`See the `,(0,v.jsx)(n.a,{href:`?path=/docs/components-field--docs#css-only`,children:`field documentation`}),` for more information on how to create a CSS-only text-field.`]})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),c(),p()})))()}y();export{_ as default};