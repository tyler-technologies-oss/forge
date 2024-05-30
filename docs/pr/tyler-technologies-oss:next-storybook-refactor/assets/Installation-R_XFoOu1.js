import{j as e}from"./jsx-runtime-BpY_mafH.js";import{u as s}from"./index-8DbiMps6.js";import{M as r}from"./index-BOOh3e2D.js";import"./iframe-Cy6TiJQ1.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";function t(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Getting Started/Installation"}),`
`,e.jsx(n.h1,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"Before we get into the details, you first need to determine what kind of installation you need. Forge is available in two formats:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"NPM Package"}),": This is the recommended way to install Forge. It allows you to easily manage your dependencies and keep your project up-to-date."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CDN"}),": If you're just experimenting with Forge, or if you're working on a project that doesn't use a package manager, you can use the CDN version."]}),`
`]}),`
`,e.jsx(n.h2,{id:"npm-package",children:"NPM Package"}),`
`,e.jsx(n.p,{children:"To install Forge as an NPM package, run the following command:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @tylertech/forge
`})}),`
`,e.jsx(n.p,{children:"If you're using a framework, you should jump to the framework-specific guide:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"?path=/docs/frameworks-angular--docs",children:"Angular"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"?path=/docs/frameworks-react--docs",children:"React"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"?path=/docs/frameworks-vue--docs",children:"Vue"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"?path=/docs/frameworks-svelte--docs",children:"Svelte"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"?path=/docs/frameworks-blazor--docs",children:"Blazor"})}),`
`]}),`
`,e.jsx(n.h3,{id:"define-components",children:"Define Components"}),`
`,e.jsx(n.p,{children:"You will then need to import and define the components you are using within your application in the browser's custom element registry."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { defineButtonComponent, defineTextFieldComponent } from '@tylertech/forge';

// These functions should be called as early as possible when your application is bootstrapping
defineButtonComponent();
defineTextFieldComponent();
`})}),`
`,e.jsx(n.p,{children:"If you're prototyping, it can be handy to pull in all components:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { defineComponents } from '@tylertech/forge';

defineComponents();
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`Note: make sure to call the definition functions as early as possible in your application bootstrapping process to ensure they are
defined with the browser before your application is rendered to avoid FOUC (Flash of Unstyled Content).`}),`
`]}),`
`,e.jsx(n.h2,{id:"cdn",children:"CDN"}),`
`,e.jsx(n.p,{children:"To use Forge via CDN, include the following script tag in your HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/index.js"><\/script>
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Replace ",e.jsx(n.code,{children:"<version>"})," with the version of Tyler Forge you want to use."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Note: The CDN distributes Forge components as ES modules. This means you need to use the ",e.jsx(n.code,{children:'type="module"'})," attribute in your script tag."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Using the above ",e.jsx(n.code,{children:"<script>"})," will automatically load ",e.jsx(n.strong,{children:"all"}),` components into your page. You can then use them anywhere in your HTML. While this is easy,
it is not recommended for production use as it will load all components, even if you only use a few. For production use, you should load only the components
you need. You can do this by referencing the individual component files directly:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/<component>/index.js"><\/script>
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Replace ",e.jsx(n.code,{children:"<component>"})," with the name of the component you want to use."]}),`
`]}),`
`,e.jsxs(n.p,{children:["For example, to use ",e.jsx(n.code,{children:"<forge-button>"}),", you would include the following script tag:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/button/index.js"><\/script>
`})}),`
`,e.jsx(n.p,{children:"You will also need to load required global styles. You can do this by including the following link tag in your HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/forge.css">
`})}),`
`,e.jsx(n.p,{children:"Additionally, you can use the JSDelivr CDN to load Forge components if you prefer."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.jsdelivr.net/npm/@tylertech/forge@<version>/dist/esm/index.js">
`})})]})}function j(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{j as default};
