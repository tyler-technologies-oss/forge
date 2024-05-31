import{j as e}from"./jsx-runtime-Bsbl6lUm.js";import{u as r}from"./index-CaXnQEVp.js";import{M as i}from"./index-CNPmWEm0.js";import"./iframe-D_pd-JWv.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";function n(t){const o={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Getting Started/Forms"}),`
`,e.jsx(o.h1,{id:"forms",children:"Forms"}),`
`,e.jsxs(o.p,{children:["Tyler Forge components are designed to work with forms out of the box. This means that you can use the components within a ",e.jsx(o.code,{children:"<form>"}),`
element and they will work as expected.`]}),`
`,e.jsx(o.p,{children:`This has long been a gap in functionality for web components, but with newly available browser APIs we are able to properly allow for our
form-associated elements to participate in native form submission and validation.`}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:["Note: This is only available in modern browsers that support the ",e.jsx(o.code,{children:"formAssociated"})," API for custom elements."]}),`
`]}),`
`,e.jsx(o.h2,{id:"form-submission",children:"Form Submission"}),`
`,e.jsx(o.p,{children:`When using a Forge component within a form, you can expect the component to participate in form submission as you would expect. This means
that the component will be able to be submitted with the form and will be included in the form data.`}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<form>
  <forge-switch name="my-switch">Switch</forge-switch>
  <forge-button type="submit">Submit</forge-button>
</form>
`})}),`
`,e.jsxs(o.p,{children:["In the above example, the ",e.jsx(o.code,{children:"<forge-switch>"})," component will be included in the form data when the form is submitted."]}),`
`,e.jsx(o.h2,{id:"form-validation",children:"Form Validation"}),`
`,e.jsx(o.p,{children:`Forge components also support form validation. This means that you can use the native form validation APIs to validate the components within
a form.`}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<form>
  <forge-checkbox name="my-checkbox" required>Checkbox</forge-checkbox>
  <forge-button type="submit">Submit</forge-button>
</form>
`})}),`
`,e.jsxs(o.p,{children:["In the above example, the ",e.jsx(o.code,{children:"<forge-checkbox>"})," component will be required to be checked before the form can be submitted."]}),`
`,e.jsx(o.h2,{id:"frameworks",children:"Frameworks"}),`
`,e.jsx(o.p,{children:`It's important to note that the above examples are using vanilla HTML forms. If you are using a framework like React, Angular, or Vue, you
will likely be using a form library that abstracts the form APIs. In these cases, you will need to refer to the documentation for the
specific form library you are using to understand how to properly use Forge components within a form.`})]})}function b(t={}){const{wrapper:o}={...r(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(n,{...t})}):n(t)}export{b as default};
