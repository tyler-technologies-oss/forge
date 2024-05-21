import{j as e}from"./jsx-runtime-meFPdH3I.js";import{u as s}from"./index-LH7dKNW3.js";import{M as i}from"./index-BgE_T5tt.js";import"./iframe-D5a8rSxo.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";function o(t){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Getting Started/Installation"}),`
`,e.jsx(n.h1,{id:"getting-started",children:"Getting Started"}),`
`,e.jsx(n.p,{children:`Welcome to Tyler Forge! This guide will help you get started with the Tyler Forge design system, and
more specifically, how to use it in your projects.`}),`
`,e.jsx(n.h2,{id:"what-is-tyler-forge",children:"What is Tyler Forge?"}),`
`,e.jsx(n.p,{children:`Tyler Forge is a design system created by Tyler Technologies. It provides a set of reusable components,
styles, and guidelines to help you build consistent, accessible, and user-friendly web applications without
worrying about the design details. You handle the business logic, we handle the design.`}),`
`,e.jsx(n.p,{children:`Tyler Forge is built on the principles of atomic design, which means it breaks down the UI into smaller,
reusable components that can be combined to create more complex interfaces. This makes it easy to build
consistent and scalable applications.`}),`
`,e.jsxs(n.p,{children:["The design system was originally built on top of the ",e.jsx(n.a,{href:"https://material.io/design",rel:"nofollow",children:"Material Design"}),` guidelines,
but has since started to evolve into its own unique design language that is more tailored to the needs of
Tyler Technologies and its customers.`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["The components documented in this site are ",e.jsx(n.em,{children:"an implementation"}),` of the Tyler Forge design system. They
are built using web components which are a collection of browser APIs that allow you to create custom,
reusable, and encapsulated HTML elements. This doesn't have to be `,e.jsx(n.em,{children:"the only implementation"}),` of the
design system. You can create your own components using the same guidelines and principles if you prefer.`]}),`
`,e.jsxs(n.p,{children:["See the ",e.jsx(n.a,{href:"https://forge.tylertech.com/",rel:"nofollow",children:"Tyler Forge™ Design System"})," for more information on the design system itself."]}),`
`]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important"}),` If your're using a framework like Angular or React, you should follow the instructions for
integrating Forge with those frameworks. This guide covers the basic usage of Forge with plain HTML and JavaScript,
and it can be adapted to work with other frameworks as needed.`]}),`
`,e.jsx(n.p,{children:"Before we get into the details, you first need to determine what kind of installation you need. Forge is available in two formats:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"NPM Package"}),": This is the recommended way to install Forge. It allows you to easily manage your dependencies and keep your project up-to-date."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CDN"}),": If you're just experimenting with Forge, or if you're working on a project that doesn't use a package manager, you can use the CDN version."]}),`
`]}),`
`,e.jsx(n.h3,{id:"npm-package",children:"NPM Package"}),`
`,e.jsx(n.p,{children:"To install Forge as an NPM package, run the following command:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @tylertech/forge
`})}),`
`,e.jsx(n.h3,{id:"cdn",children:"CDN"}),`
`,e.jsx(n.p,{children:"To use Forge via CDN, include the following script tag in your HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/index.js"><\/script>
`})}),`
`,e.jsxs(n.p,{children:["Replace ",e.jsx(n.code,{children:"<version>"})," with the version of Tyler Forge you want to use."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["Note: The CDN distributes Forge components as ES modules. This means you need to use the ",e.jsx(n.code,{children:'type="module"'})," attribute in your script tag."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Using the above ",e.jsx(n.code,{children:"<script>"})," will automatically load ",e.jsx(n.strong,{children:"all"}),` components into your page. You can then use them anywhere in your HTML. While this is easy,
it is not recommended for production use as it will load all components, even if you only use a few. For production use, you should load only the components
you need. You can do this by referencing the individual component files directly:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/<component>/index.js"><\/script>
`})}),`
`,e.jsxs(n.p,{children:["Replace ",e.jsx(n.code,{children:"<component>"})," with the name of the component you want to use."]}),`
`,e.jsxs(n.p,{children:["For example, to use ",e.jsx(n.code,{children:"<forge-button>"}),", you would include the following script tag:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/button/index.js"><\/script>
`})}),`
`,e.jsx(n.p,{children:"You will also need to load required global styles. You can do this by including the following link tag in your HTML:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/forge.css">
`})}),`
`,e.jsx(n.p,{children:"Additionally, you can use the JSDelivr CDN to load Forge components if you prefer."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.jsdelivr.net/npm/@tylertech/forge@<version>/dist/esm/index.js">
`})}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.p,{children:"Once you have Forge installed"})]})}function y(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{y as default};
