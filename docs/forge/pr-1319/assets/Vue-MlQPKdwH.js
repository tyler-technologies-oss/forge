import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-BjnIcTYW.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Frameworks/Vue`}),`
`,(0,c.jsx)(n.h1,{id:`vue`,children:`Vue`}),`
`,(0,c.jsxs)(n.p,{children:[`Vue has `,(0,c.jsx)(n.a,{href:`https://custom-elements-everywhere.com/#vue`,rel:`nofollow`,children:`great support`}),` for custom elements and can be used directly.`]}),`
`,(0,c.jsx)(n.h2,{id:`installation`,children:`Installation`}),`
`,(0,c.jsx)(n.p,{children:`To use Forge in your Vue application, install the following package from npm:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`npm install @tylertech/forge
`})}),`
`,(0,c.jsx)(n.h2,{id:`configure-vue`,children:`Configure Vue`}),`
`,(0,c.jsxs)(n.p,{children:[`To make sure Vue plays nice with custom elements, you need to configure the compiler to allow certain elements. The Vue
documentation has a section on `,(0,c.jsx)(n.a,{href:`https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue`,rel:`nofollow`,children:`using custom elements in Vue`}),`
that explains what you need to do.`]}),`
`,(0,c.jsx)(n.p,{children:`If you're using the Vue plugin with Vite, you can use the following in your Vite config:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-js`,children:`import { defineConfig } from 'vite';
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
`,(0,c.jsx)(n.h2,{id:`loading-the-tyler-font`,children:`Loading the Tyler Font`}),`
`,(0,c.jsxs)(n.p,{children:[`Edit your `,(0,c.jsx)(n.code,{children:`index.html`}),` file and add the following `,(0,c.jsx)(n.code,{children:`<link>`}),` tag to the `,(0,c.jsx)(n.code,{children:`<head>`}),` section load the Tyler font:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
`})}),`
`,(0,c.jsx)(n.p,{children:`This will configure the default font family for your application, and load the required font weights and styles.`}),`
`,(0,c.jsx)(n.h2,{id:`importing-components`,children:`Importing Components`}),`
`,(0,c.jsxs)(n.p,{children:[`To use Forge components in your Vue application, import the components you need from the `,(0,c.jsx)(n.code,{children:`@tylertech/forge`}),` package.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<template>
  <div>
    <forge-scaffold>
      <forge-card slot="body">
        <forge-button>Click me</forge-button>
      </forge-card>
    </forge-scaffold>
  </div>
</template>

<script setup>
  import '@tylertech/forge/scaffold';
  import '@tylertech/forge/button';
  import '@tylertech/forge/card';
<\/script>
`})}),`
`,(0,c.jsx)(n.h2,{id:`importing-styles`,children:`Importing Styles`}),`
`,(0,c.jsxs)(n.p,{children:[`To use the default Forge styles in your Vue application, import the `,(0,c.jsx)(n.code,{children:`forge.css`}),` file from the `,(0,c.jsx)(n.code,{children:`@tylertech/forge`}),` package.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-vue`,children:`<style>
@import '@tylertech/forge/dist/forge-core.css';
@import '@tylertech/forge/dist/forge.css';
</style>
`})}),`
`,(0,c.jsx)(n.h3,{id:`dark-theme`,children:`Dark Theme`}),`
`,(0,c.jsxs)(n.p,{children:[`If you want to use the dark theme, import the `,(0,c.jsx)(n.code,{children:`forge-dark.css`}),` file:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-vue`,children:`<style>
@import '@tylertech/forge/dist/forge-dark.css';
</style>
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};