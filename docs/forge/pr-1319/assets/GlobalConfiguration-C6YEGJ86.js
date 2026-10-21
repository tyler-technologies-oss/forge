import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-BjnIcTYW.js";function o(e){let n={blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Global Configuration`}),`
`,(0,c.jsx)(n.h1,{id:`global-configuration`,children:`Global Configuration`}),`
`,(0,c.jsx)(n.p,{children:`Tyler Forge provides access to a global configuration object that allows you to override default state for various components that support it.
This is useful for setting defaults for your application without having to pass the same properties/attributes to every component instance.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`This feature is currently in preview and is still experimental. It may change in the future, but we welcome feedback on how it can be improved.`}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,c.jsxs)(n.p,{children:[`To use the global configuration object, you will need to ensure you set it up `,(0,c.jsx)(n.strong,{children:`before`}),` any components are defined. This is typically done
as early as possible in your application startup process.`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`A common place to set up the global configuration object is in your `,(0,c.jsx)(n.code,{children:`index.html`}),` file, before any other scripts are loaded.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`For example, to set the default label position for all field-based components to `,(0,c.jsx)(n.code,{children:`block-start`}),`, you would set the global configuration
object as follows:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`window.TylerForgeGlobalConfiguration = {
  'forge-field': {
    labelPosition: 'block-start'
  }
};
`})}),`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`TylerForgeGlobalConfiguration`}),` object is a simple object where the keys are the component names and the values are objects containing
the properties you want to override. The properties you can override are specific to each component and are documented in the component's
API documentation.`]}),`
`,(0,c.jsxs)(n.p,{children:[`It's important to note that `,(0,c.jsx)(n.strong,{children:`not all components support global configuration`}),`. If a component does not support it, the properties you set
in the configuration object will be ignored.`]}),`
`,(0,c.jsx)(n.h2,{id:`typescript`,children:`TypeScript`}),`
`,(0,c.jsxs)(n.p,{children:[`If you are using TypeScript, Forge ships with ambient type definitions that augment `,(0,c.jsx)(n.code,{children:`window`}),` with the `,(0,c.jsx)(n.code,{children:`TylerForgeGlobalConfiguration`}),` object.`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};