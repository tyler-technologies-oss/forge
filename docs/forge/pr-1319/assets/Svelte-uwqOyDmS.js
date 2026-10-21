import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-92lRto7J.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Frameworks/Svelte`}),`
`,(0,c.jsx)(n.h1,{id:`svelte`,children:`Svelte`}),`
`,(0,c.jsxs)(n.p,{children:[`Svelte has `,(0,c.jsx)(n.a,{href:`https://custom-elements-everywhere.com/#svelte`,rel:`nofollow`,children:`decent support`}),` for custom elements and can mostly be used without a problem.`]}),`
`,(0,c.jsx)(n.h2,{id:`installation`,children:`Installation`}),`
`,(0,c.jsx)(n.p,{children:`To use Forge in your Svelte application, install the following package from npm:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`npm install @tylertech/forge
`})}),`
`,(0,c.jsx)(n.h2,{id:`loading-the-tyler-font`,children:`Loading the Tyler Font`}),`
`,(0,c.jsxs)(n.p,{children:[`Edit your `,(0,c.jsx)(n.code,{children:`index.html`}),` file and add the following `,(0,c.jsx)(n.code,{children:`<link>`}),` tag to the `,(0,c.jsx)(n.code,{children:`<head>`}),` section load the Tyler font:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
`})}),`
`,(0,c.jsx)(n.p,{children:`This will configure the default font family for your application, and load the required font weights and styles.`}),`
`,(0,c.jsx)(n.h2,{id:`importing-components`,children:`Importing Components`}),`
`,(0,c.jsxs)(n.p,{children:[`To use Forge components in your Svelte application, import the components you need from the `,(0,c.jsx)(n.code,{children:`@tylertech/forge`}),` package.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-svelte`,children:`<script>
  import '@tylertech/forge/button';
  import '@tylertech/forge/card';
<\/script>

<div>
  <forge-card>
    <forge-button>Click me</forge-button>
  </forge-card>
</div>
`})}),`
`,(0,c.jsx)(n.h2,{id:`importing-styles`,children:`Importing Styles`}),`
`,(0,c.jsxs)(n.p,{children:[`To use the default Forge styles in your Svelte application, import the `,(0,c.jsx)(n.code,{children:`forge.css`}),` file from the `,(0,c.jsx)(n.code,{children:`@tylertech/forge`}),` package.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-svelte`,children:`<style>
  @import '@tylertech/forge/dist/forge.css';
</style>
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};