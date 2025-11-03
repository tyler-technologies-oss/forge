import{j as e,M as l}from"./blocks-CQxpztOl.js";import{useMDXComponents as r}from"./index-Voi69W9_.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-D70h1lbg.js";function o(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Frameworks/Svelte"}),`
`,e.jsx(n.h1,{id:"svelte",children:"Svelte"}),`
`,e.jsxs(n.p,{children:["Svelte has ",e.jsx(n.a,{href:"https://custom-elements-everywhere.com/#svelte",rel:"nofollow",children:"decent support"})," for custom elements and can mostly be used without a problem."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"To use Forge in your Svelte application, install the following package from npm:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @tylertech/forge
`})}),`
`,e.jsx(n.h2,{id:"loading-the-tyler-font",children:"Loading the Tyler Font"}),`
`,e.jsxs(n.p,{children:["Edit your ",e.jsx(n.code,{children:"index.html"})," file and add the following ",e.jsx(n.code,{children:"<link>"})," tag to the ",e.jsx(n.code,{children:"<head>"})," section load the Tyler font:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
`})}),`
`,e.jsx(n.p,{children:"This will configure the default font family for your application, and load the required font weights and styles."}),`
`,e.jsx(n.h2,{id:"importing-components",children:"Importing Components"}),`
`,e.jsxs(n.p,{children:["To use Forge components in your Svelte application, import the components you need from the ",e.jsx(n.code,{children:"@tylertech/forge"})," package."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-svelte",children:`<script>
  import { defineButtonComponent, defineCardComponent } from '@tylertech/forge';

  defineButtonComponent();
  defineCardComponent();
<\/script>

<div>
  <forge-card>
    <forge-button>Click me</forge-button>
  </forge-card>
</div>
`})}),`
`,e.jsx(n.h2,{id:"importing-styles",children:"Importing Styles"}),`
`,e.jsxs(n.p,{children:["To use the default Forge styles in your Svelte application, import the ",e.jsx(n.code,{children:"forge.css"})," file from the ",e.jsx(n.code,{children:"@tylertech/forge"})," package."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-svelte",children:`<style>
  @import '@tylertech/forge/dist/forge.css';
</style>
`})})]})}function h(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{h as default};
