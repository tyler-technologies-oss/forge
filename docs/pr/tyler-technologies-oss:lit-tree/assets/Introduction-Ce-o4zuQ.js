import{j as e,M as i}from"./index-DJbJR8E5.js";import{useMDXComponents as s}from"./index-CgSK1qGA.js";import"./iframe-DAkevSCC.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";function t(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Design Tokens/Introduction"}),`
`,e.jsx(n.h1,{id:"design-tokens",children:"Design Tokens"}),`
`,e.jsx(n.p,{children:`Design tokens are the core building blocks of a design system. They are the variables that define the visual design of a product. These variables can be used
to define colors, typography, spacing, and much more.`}),`
`,e.jsxs(n.p,{children:["Forge provides a set of design tokens that are used to style the components. These tokens are available as ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",rel:"nofollow",children:"CSS custom properties"}),` and can be used to style
your own components as well to keep your design consistent and reduce the need to redefine styles.`]}),`
`,e.jsx(n.p,{children:`Design tokens are a powerful tool for creating a consistent design system. They allow you to define the visual design of your product in a single place, and
easily reuse those styles throughout your application so that they can be changed dynamically and everything stays in sync.`}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.p,{children:`When installing and using Forge, you also have access to a set of global CSS stylesheets that can be loaded into your application. These stylesheets include
the design tokens that are used to style the Forge components.`}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`The Forge components do not rely on these tokens being loaded because they are included in the components themselves. However, if you are building your own
components, you can use these tokens to style them and this will help keep your application consistent with the Tyler Forge design.`}),`
`]}),`
`,e.jsx(n.p,{children:"To use the design tokens in your application, you can include the following CSS file in your application:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`@use '@tylertech/forge/dist/forge';
`})}),`
`,e.jsx(n.p,{children:"This will include all of the design tokens that are available in Forge."}),`
`,e.jsx(n.p,{children:"If you would like to instead only include specific design tokens, you can include the following CSS file in your application:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`// This will load only the theme design tokens
@use '@tylertech/forge/dist/theme/forge-theme';

// This will load only the typography design tokens
@use '@tylertech/forge/dist/typography/forge-typography';

// This will load all other tokens
@use '@tylertech/forge/dist/forge-tokens';
`})}),`
`,e.jsxs(n.p,{children:["To view the tokens in your page, inspect the ",e.jsx(n.code,{children:"<html>"})," element and look under the ",e.jsx(n.code,{children:":root"})," selector."]}),`
`,e.jsx(n.h2,{id:"theming",children:"Theming"}),`
`,e.jsx(n.p,{children:`Theming is probably the most common use case for design tokens. By using design tokens, you can easily create a theme for your application that can be changed
dynamically. It's important that you use the same theme design tokens as the Forge components so that your application looks consistent with the Forge components,
but also adapts to theme changes such as dark mode.`}),`
`,e.jsxs(n.p,{children:["To learn more about theming see the ",e.jsx(n.a,{href:"?path=/docs/getting-started-theming--docs",children:"Theming documentation"}),"."]})]})}function p(o={}){const{wrapper:n}={...s(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{p as default};
