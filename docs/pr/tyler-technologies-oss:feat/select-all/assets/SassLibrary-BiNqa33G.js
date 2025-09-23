import{j as e,M as o}from"./blocks-Cdr8qEIY.js";import{useMDXComponents as t}from"./index-fzf2DpAi.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CCqKG2bu.js";function a(n){const s={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...t(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Getting Started/Sass Library"}),`
`,e.jsx(s.h1,{id:"sass-library",children:"Sass Library"}),`
`,e.jsx(s.p,{children:`As you already know, Forge provides a vast library of Web Components. These components have built-in styles, templates, functionality, and often times
it's useful to also reference those same styles in your libraries and applications. This helps ensure that there is cohesion and code reuse where possible,
and to reduce the need for you to reinvent something that has already been built.`}),`
`,e.jsx(s.p,{children:`Forge exposes all of the internal Sass files it uses itself as a library that you can also build from. These files are separated out into Sass various files,
mixins, and variables that you can import and use.`}),`
`,e.jsx(s.p,{children:`Along with component-specific styles, we also provide globally used Sass mixins/variables for things like typography, theme, tokens... etc. and these can be
useful to consume in your libraries and applications as well.`}),`
`,e.jsx(s.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(s.p,{children:[`You can access the library by installing the Forge package and importing the Sass files you need. The Sass library is available under the following path:
`,e.jsx(s.code,{children:"@tylertech/forge/styles/*"})]}),`
`,e.jsx(s.p,{children:"Foe example, to create a custom avatar, you could use the following Sass mixin:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-css",children:`@use '@tylertech/forge/styles/avatar';

.my-custom-avatar {
  @include avatar.base;
}
`})}),`
`,e.jsx(s.h2,{id:"tokens",children:"Tokens"}),`
`,e.jsx(s.p,{children:`While it can be tempting to pull in things like colors, spacing, and typography directly from the Forge library, we recommend using the design tokens that are
provided. This helps ensure that your library or application is using the same tokens as the Forge components without you needing to reference them directly
through the Sass files. This also helps avoid static values from living in your CSS so that they can be dynamically changed via CSS variables.`}),`
`,e.jsxs(s.p,{children:["View the design token documentation ",e.jsx(s.a,{href:"?path=/docs/design-tokens-introduction--docs",children:"here"}),"."]}),`
`,e.jsx(s.h2,{id:"css-library",children:"CSS Library"}),`
`,e.jsx(s.p,{children:`Forge also provides a library of CSS-only components that you can use in your applications. These are set of CSS classes that you can use to create components
that provide the same look and feel, but do not have any JavaScript functionality. This can be useful for creating static pages or for use in applications
where you do not want to use Web Components.`}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsxs(s.p,{children:["This feature is still in development and will be available in a future release. See the ",e.jsx(s.a,{href:"?path=/docs/about-roadmap--docs",children:"roadmap"})," for more information."]}),`
`,e.jsx(s.p,{children:"We will update this page when the CSS library is available."}),`
`]})]})}function d(n={}){const{wrapper:s}={...t(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(a,{...n})}):a(n)}export{d as default};
