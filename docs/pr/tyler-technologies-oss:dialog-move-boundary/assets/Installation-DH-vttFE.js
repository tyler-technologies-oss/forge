import{j as e,M as i}from"./blocks-CDy2Rd0a.js";import{useMDXComponents as t}from"./index-DsX0JzE-.js";import"./iframe-BwqQa4Dw.js";import"./_commonjsHelpers-CqkleIqs.js";function o(s){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Getting Started/Installation"}),`
`,e.jsx(n.h1,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"Before we get into the details, you first need to determine what kind of installation you need. Forge is available in two formats:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"NPM Package"}),": This is the recommended way to install Forge. It allows you to easily manage your dependencies and keep your project up-to-date."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"CDN"}),": If you're just experimenting with Forge, or if you're working on a project that doesn't use a package manager, you can use the CDN version."]}),`
`]}),`
`,e.jsx(n.h2,{id:"npm-package",children:"NPM Package"}),`
`,e.jsx(n.p,{children:"To install Forge from npm, run the following command:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @tylertech/forge
`})}),`
`,e.jsx(n.h3,{id:"package-format",children:"Package Format"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"@tylertech/forge"})," package follows the following format:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"dist/"}),": Contains all pre-built static distribution sources.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"<component-name>/"}),": pre-built CSS stylesheets for specific components.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Ex. ",e.jsx(n.code,{children:"<component-name>/forge-<component-name>.css"}),": Contains the pre-built CSS stylesheets for CSS-only components."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"forge-core.css"}),": The optional Forge core stylesheet. Typically useful when using the ",e.jsx(n.code,{children:"<forge-scaffold>"})," for your outer page layout."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"forge-tokens.css"}),": The optional Forge tokens stylesheet. Contains all design tokens used in the Forge components so your application has access to them as well."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"forge-dark.css"}),": The default Forge dark theme (must be loaded after ",e.jsx(n.code,{children:"forge.css"}),")."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"forge.css"}),": The pre-built Forge global stylesheet. Contains all global stylesheets. You should prefer to load individual stylesheets instead of this global stylesheet in production."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"lib.js"}),": The pre-built Forge JavaScript bundle. Contains all Forge components and utilities in a single bundle (including dependencies)."]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"esm/"}),": Contains the unbundled ESM JavaScript sources as the main entry to the package (uses bare module specifiers)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"sass/"}),": Contains all Sass stylesheets as a copy directly from the library. This allows you to utilize the same Sass utilities that Forge does within your own application and/or library."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"custom-elements.json"}),": This is the custom elements manifest that describes the custom elements in the package. We use this to generate the docs and Angular adapters."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"LICENSE"}),": The Apache 2.0 license."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"package.json"}),": The package specification."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"README.md"}),": This README.md file."]}),`
`]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:["You can inspect the package contents by navigating to the ",e.jsx(n.code,{children:"node_modules/@tylertech/forge"})," directory in your project."]}),`
`]}),`
`,e.jsx(n.h3,{id:"framework-installation",children:"Framework Installation"}),`
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
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/forge.css" />
`})}),`
`,e.jsx(n.p,{children:"Additionally, you can use the JSDelivr CDN to load Forge components if you prefer."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script type="module" src="https://cdn.jsdelivr.net/npm/@tylertech/forge@<version>/dist/esm/index.js">
`})})]})}function d(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{d as default};
