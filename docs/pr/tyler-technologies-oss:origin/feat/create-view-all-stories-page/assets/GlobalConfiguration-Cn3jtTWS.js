import{j as e}from"./jsx-runtime-DKu5WxKp.js";import{u as i}from"./index-BKtyIYV2.js";import{ae as r}from"./index-Cr6fPkD9.js";import"./iframe-DP-1snqz.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";function n(t){const o={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Getting Started/Global Configuration"}),`
`,e.jsx(o.h1,{id:"global-configuration",children:"Global Configuration"}),`
`,e.jsx(o.p,{children:`Tyler Forge provides access to a global configuration object that allows you to override default state for various components that support it.
This is useful for setting defaults for your application without having to pass the same properties/attributes to every component instance.`}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsx(o.p,{children:"This feature is currently in preview and is still experimental. It may change in the future, but we welcome feedback on how it can be improved."}),`
`]}),`
`,e.jsx(o.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(o.p,{children:["To use the global configuration object, you will need to ensure you set it up ",e.jsx(o.strong,{children:"before"}),` any components are defined. This is typically done
as early as possible in your application startup process.`]}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:["A common place to set up the global configuration object is in your ",e.jsx(o.code,{children:"index.html"})," file, before any other scripts are loaded."]}),`
`]}),`
`,e.jsxs(o.p,{children:["For example, to set the default label position for all field-based components to ",e.jsx(o.code,{children:"block-start"}),`, you would set the global configuration
object as follows:`]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-javascript",children:`window.TylerForgeGlobalConfiguration = {
  'forge-field': {
    labelPosition: 'block-start'
  }
};
`})}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"TylerForgeGlobalConfiguration"}),` object is a simple object where the keys are the component names and the values are objects containing
the properties you want to override. The properties you can override are specific to each component and are documented in the component's
API documentation.`]}),`
`,e.jsxs(o.p,{children:["It's important to note that ",e.jsx(o.strong,{children:"not all components support global configuration"}),`. If a component does not support it, the properties you set
in the configuration object will be ignored.`]}),`
`,e.jsx(o.h2,{id:"typescript",children:"TypeScript"}),`
`,e.jsxs(o.p,{children:["If you are using TypeScript, Forge ships with ambient type definitions that augment ",e.jsx(o.code,{children:"window"})," with the ",e.jsx(o.code,{children:"TylerForgeGlobalConfiguration"})," object."]})]})}function f(t={}){const{wrapper:o}={...i(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(n,{...t})}):n(t)}export{f as default};
