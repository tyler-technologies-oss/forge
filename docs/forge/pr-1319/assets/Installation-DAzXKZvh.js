import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-92lRto7J.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Installation`}),`
`,(0,c.jsx)(n.h1,{id:`installation`,children:`Installation`}),`
`,(0,c.jsx)(n.p,{children:`Before we get into the details, you first need to determine what kind of installation you need. Forge is available in two formats:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`NPM Package`}),`: This is the recommended way to install Forge. It allows you to easily manage your dependencies and keep your project up-to-date.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.strong,{children:`CDN`}),`: If you're just experimenting with Forge, or if you're working on a project that doesn't use a package manager, you can use the CDN version.`]}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`npm-package`,children:`NPM Package`}),`
`,(0,c.jsx)(n.p,{children:`To install Forge from npm, run the following command:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`npm install @tylertech/forge
`})}),`
`,(0,c.jsx)(n.h3,{id:`package-format`,children:`Package Format`}),`
`,(0,c.jsxs)(n.p,{children:[`The `,(0,c.jsx)(n.code,{children:`@tylertech/forge`}),` package follows the following format:`]}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`dist/`}),`: Contains all pre-built static distribution sources.`,`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`<component-name>/`}),`: pre-built CSS stylesheets for specific components.`,`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsxs)(n.li,{children:[`Ex. `,(0,c.jsx)(n.code,{children:`<component-name>/forge-<component-name>.css`}),`: Contains the pre-built CSS stylesheets for CSS-only components.`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`forge-core.css`}),`: The optional Forge core stylesheet. Typically useful when using the `,(0,c.jsx)(n.code,{children:`<forge-scaffold>`}),` for your outer page layout.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`forge-tokens.css`}),`: The optional Forge tokens stylesheet. Contains all design tokens used in the Forge components so your application has access to them as well.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`forge-dark.css`}),`: The default Forge dark theme (must be loaded after `,(0,c.jsx)(n.code,{children:`forge.css`}),`).`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`forge.css`}),`: The pre-built Forge global stylesheet. Contains all global stylesheets. You should prefer to load individual stylesheets instead of this global stylesheet in production.`]}),`
`]}),`
`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`esm/`}),`: Contains the unbundled ESM JavaScript sources as the main entry to the package (uses bare module specifiers).`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`sass/`}),`: Contains all Sass stylesheets as a copy directly from the library. This allows you to utilize the same Sass utilities that Forge does within your own application and/or library.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`custom-elements.json`}),`: This is the custom elements manifest that describes the custom elements in the package. We use this to generate the docs and Angular adapters.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`LICENSE`}),`: The Apache 2.0 license.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`package.json`}),`: The package specification.`]}),`
`,(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:`README.md`}),`: This README.md file.`]}),`
`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`You can inspect the package contents by navigating to the `,(0,c.jsx)(n.code,{children:`node_modules/@tylertech/forge`}),` directory in your project.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`framework-installation`,children:`Framework Installation`}),`
`,(0,c.jsx)(n.p,{children:`If you're using a framework, you should jump to the framework-specific guide:`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`?path=/docs/frameworks-angular--docs`,children:`Angular`})}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`?path=/docs/frameworks-react--docs`,children:`React`})}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`?path=/docs/frameworks-vue--docs`,children:`Vue`})}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`?path=/docs/frameworks-svelte--docs`,children:`Svelte`})}),`
`,(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:`?path=/docs/frameworks-blazor--docs`,children:`Blazor`})}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`import-components`,children:`Import Components`}),`
`,(0,c.jsx)(n.p,{children:`You will then need to import the components you are using within your application to register them in the browser's custom element registry.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`import '@tylertech/forge/button';
import '@tylertech/forge/text-field';
`})}),`
`,(0,c.jsx)(n.p,{children:`If you're prototyping, it can be handy to pull in all components:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`import '@tylertech/forge';
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`Note: make sure to import the components as early as possible in your application bootstrapping process to ensure they are
registered with the browser before your application is rendered to avoid FOUC (Flash of Unstyled Content).`}),`
`]}),`
`,(0,c.jsx)(n.h2,{id:`cdn`,children:`CDN`}),`
`,(0,c.jsx)(n.p,{children:`To use Forge via CDN, include the following script tag in your HTML:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/index.js"><\/script>
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Replace `,(0,c.jsx)(n.code,{children:`<version>`}),` with the version of Tyler Forge you want to use.`]}),`
`]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Note: The CDN distributes Forge components as ES modules. This means you need to use the `,(0,c.jsx)(n.code,{children:`type="module"`}),` attribute in your script tag.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`Using the above `,(0,c.jsx)(n.code,{children:`<script>`}),` will automatically load `,(0,c.jsx)(n.strong,{children:`all`}),` components into your page. You can then use them anywhere in your HTML. While this is easy,
it is not recommended for production use as it will load all components, even if you only use a few. For production use, you should load only the components
you need. You can do this by referencing the individual component files directly:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/<component>/index.js"><\/script>
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`Replace `,(0,c.jsx)(n.code,{children:`<component>`}),` with the name of the component you want to use.`]}),`
`]}),`
`,(0,c.jsxs)(n.p,{children:[`For example, to use `,(0,c.jsx)(n.code,{children:`<forge-button>`}),`, you would include the following script tag:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<script type="module" src="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/button/index.js"><\/script>
`})}),`
`,(0,c.jsx)(n.p,{children:`You will also need to load required global styles. You can do this by including the following link tag in your HTML:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/libs/@tylertech/forge@<version>/forge.css" />
`})}),`
`,(0,c.jsx)(n.p,{children:`Additionally, you can use the JSDelivr CDN to load Forge components if you prefer.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<script type="module" src="https://cdn.jsdelivr.net/npm/@tylertech/forge@<version>/dist/esm/index.js">
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};