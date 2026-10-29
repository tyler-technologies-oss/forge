import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-DnLnh7by.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Sass Library`}),`
`,(0,c.jsx)(n.h1,{id:`sass-library`,children:`Sass Library`}),`
`,(0,c.jsx)(n.p,{children:`As you already know, Forge provides a vast library of Web Components. These components have built-in styles, templates, functionality, and often times
it's useful to also reference those same styles in your libraries and applications. This helps ensure that there is cohesion and code reuse where possible,
and to reduce the need for you to reinvent something that has already been built.`}),`
`,(0,c.jsx)(n.p,{children:`Forge exposes all of the internal Sass files it uses itself as a library that you can also build from. These files are separated out into Sass various files,
mixins, and variables that you can import and use.`}),`
`,(0,c.jsx)(n.p,{children:`Along with component-specific styles, we also provide globally used Sass mixins/variables for things like typography, theme, tokens... etc. and these can be
useful to consume in your libraries and applications as well.`}),`
`,(0,c.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,c.jsxs)(n.p,{children:[`You can access the library by installing the Forge package and importing the Sass files you need. The Sass library is available under the following path:
`,(0,c.jsx)(n.code,{children:`@tylertech/forge/styles/*`})]}),`
`,(0,c.jsx)(n.p,{children:`Foe example, to create a custom avatar, you could use the following Sass mixin:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`@use '@tylertech/forge/styles/avatar';

.my-custom-avatar {
  @include avatar.base;
}
`})}),`
`,(0,c.jsx)(n.h2,{id:`tokens`,children:`Tokens`}),`
`,(0,c.jsx)(n.p,{children:`While it can be tempting to pull in things like colors, spacing, and typography directly from the Forge library, we recommend using the design tokens that are
provided. This helps ensure that your library or application is using the same tokens as the Forge components without you needing to reference them directly
through the Sass files. This also helps avoid static values from living in your CSS so that they can be dynamically changed via CSS variables.`}),`
`,(0,c.jsxs)(n.p,{children:[`View the design token documentation `,(0,c.jsx)(n.a,{href:`?path=/docs/design-tokens-introduction--docs`,children:`here`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`css-library`,children:`CSS Library`}),`
`,(0,c.jsx)(n.p,{children:`Forge also provides a library of CSS-only components that you can use in your applications. These are set of CSS classes that you can use to create components
that provide the same look and feel, but do not have any JavaScript functionality. This can be useful for creating static pages or for use in applications
where you do not want to use Web Components.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[`This feature is still in development and will be available in a future release. See the `,(0,c.jsx)(n.a,{href:`?path=/docs/about-roadmap--docs`,children:`roadmap`}),` for more information.`]}),`
`,(0,c.jsx)(n.p,{children:`We will update this page when the CSS library is available.`}),`
`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};