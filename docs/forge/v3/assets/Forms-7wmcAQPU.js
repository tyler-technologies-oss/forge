import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-DnLnh7by.js";function o(e){let n={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Forms`}),`
`,(0,c.jsx)(n.h1,{id:`forms`,children:`Forms`}),`
`,(0,c.jsxs)(n.p,{children:[`Tyler Forge components are designed to work with forms out of the box. This means that you can use the components within a `,(0,c.jsx)(n.code,{children:`<form>`}),`
element and they will work as expected.`]}),`
`,(0,c.jsx)(n.p,{children:`This has long been a gap in functionality for web components, but with newly available browser APIs we are able to properly allow for our
form-associated elements to participate in native form submission and validation.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Note: This is only available in modern browsers that support the `,(0,c.jsx)(n.code,{children:`formAssociated`}),` API for custom elements.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`form-submission`,children:`Form Submission`}),`
`,(0,c.jsx)(n.p,{children:`When using a Forge component within a form, you can expect the component to participate in form submission as you would expect. This means
that the component will be able to be submitted with the form and will be included in the form data.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<form>
  <forge-switch name="my-switch">Switch</forge-switch>
  <forge-button type="submit">Submit</forge-button>
</form>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`In the above example, the `,(0,c.jsx)(n.code,{children:`<forge-switch>`}),` component will be included in the form data when the form is submitted.`]}),`
`,(0,c.jsx)(n.h2,{id:`form-validation`,children:`Form Validation`}),`
`,(0,c.jsx)(n.p,{children:`Forge components also support form validation. This means that you can use the native form validation APIs to validate the components within
a form.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<form>
  <forge-checkbox name="my-checkbox" required>Checkbox</forge-checkbox>
  <forge-button type="submit">Submit</forge-button>
</form>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`In the above example, the `,(0,c.jsx)(n.code,{children:`<forge-checkbox>`}),` component will be required to be checked before the form can be submitted.`]}),`
`,(0,c.jsx)(n.h2,{id:`frameworks`,children:`Frameworks`}),`
`,(0,c.jsx)(n.p,{children:`It's important to note that the above examples are using vanilla HTML forms. If you are using a framework like React, Angular, or Vue, you
will likely be using a form library that abstracts the form APIs. In these cases, you will need to refer to the documentation for the
specific form library you are using to understand how to properly use Forge components within a form.`})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};