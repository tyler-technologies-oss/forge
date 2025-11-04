import{j as e,M as s}from"./blocks-C23olooG.js";import{useMDXComponents as r}from"./index-B2Cv-Tf_.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-D-MbC9N8.js";function o(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Frameworks/Vue"}),`
`,e.jsx(n.h1,{id:"vue",children:"Vue"}),`
`,e.jsxs(n.p,{children:["Vue has ",e.jsx(n.a,{href:"https://custom-elements-everywhere.com/#vue",rel:"nofollow",children:"great support"})," for custom elements and can be used directly."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"To use Forge in your Vue application, install the following package from npm:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @tylertech/forge
`})}),`
`,e.jsx(n.h2,{id:"configure-vue",children:"Configure Vue"}),`
`,e.jsxs(n.p,{children:[`To make sure Vue plays nice with custom elements, you need to configure the compiler to allow certain elements. The Vue
documentation has a section on `,e.jsx(n.a,{href:"https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue",rel:"nofollow",children:"using custom elements in Vue"}),`
that explains what you need to do.`]}),`
`,e.jsx(n.p,{children:"If you're using the Vue plugin with Vite, you can use the following in your Vite config:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('forge-')
        }
      }
    })
  ]
});
`})}),`
`,e.jsx(n.h2,{id:"loading-the-tyler-font",children:"Loading the Tyler Font"}),`
`,e.jsxs(n.p,{children:["Edit your ",e.jsx(n.code,{children:"index.html"})," file and add the following ",e.jsx(n.code,{children:"<link>"})," tag to the ",e.jsx(n.code,{children:"<head>"})," section load the Tyler font:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
`})}),`
`,e.jsx(n.p,{children:"This will configure the default font family for your application, and load the required font weights and styles."}),`
`,e.jsx(n.h2,{id:"importing-components",children:"Importing Components"}),`
`,e.jsxs(n.p,{children:["To use Forge components in your Vue application, import the components you need from the ",e.jsx(n.code,{children:"@tylertech/forge"})," package."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<template>
  <div>
    <forge-scaffold>
      <forge-card slot="body">
        <forge-button>Click me</forge-button>
      </forge-card>
    </forge-scaffold>
  </div>
</template>

<script setup>
  import { defineScaffoldComponent, defineButtonComponent, defineCardComponent } from '@tylertech/forge';

  // Only import the components you need
  defineScaffoldComponent();
  defineButtonComponent();
  defineCardComponent();
<\/script>
`})}),`
`,e.jsx(n.h2,{id:"importing-styles",children:"Importing Styles"}),`
`,e.jsxs(n.p,{children:["To use the default Forge styles in your Vue application, import the ",e.jsx(n.code,{children:"forge.css"})," file from the ",e.jsx(n.code,{children:"@tylertech/forge"})," package."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<style>
@import '@tylertech/forge/dist/forge-core.css';
@import '@tylertech/forge/dist/forge.css';
</style>
`})}),`
`,e.jsx(n.h3,{id:"dark-theme",children:"Dark Theme"}),`
`,e.jsxs(n.p,{children:["If you want to use the dark theme, import the ",e.jsx(n.code,{children:"forge-dark.css"})," file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<style>
@import '@tylertech/forge/dist/forge-dark.css';
</style>
`})})]})}function h(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{h as default};
