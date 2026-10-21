import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-BjnIcTYW.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Design Tokens/Introduction`}),`
`,(0,c.jsx)(n.h1,{id:`design-tokens`,children:`Design Tokens`}),`
`,(0,c.jsx)(n.p,{children:`Design tokens are the core building blocks of a design system. They are the variables that define the visual design of a product. These variables can be used
to define colors, typography, spacing, and much more.`}),`
`,(0,c.jsxs)(n.p,{children:[`Forge provides a set of design tokens that are used to style the components. These tokens are available as `,(0,c.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties`,rel:`nofollow`,children:`CSS custom properties`}),` and can be used to style
your own components as well to keep your design consistent and reduce the need to redefine styles.`]}),`
`,(0,c.jsx)(n.p,{children:`Design tokens are a powerful tool for creating a consistent design system. They allow you to define the visual design of your product in a single place, and
easily reuse those styles throughout your application so that they can be changed dynamically and everything stays in sync.`}),`
`,(0,c.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,c.jsx)(n.p,{children:`When installing and using Forge, you also have access to a set of global CSS stylesheets that can be loaded into your application. These stylesheets include
the design tokens that are used to style the Forge components.`}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`The Forge components do not rely on these tokens being loaded because they are included in the components themselves. However, if you are building your own
components, you can use these tokens to style them and this will help keep your application consistent with the Tyler Forge design.`}),`
`]}),`
`,(0,c.jsx)(n.p,{children:`To use the design tokens in your application, you can include the following CSS file in your application:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`@use '@tylertech/forge/dist/forge';
`})}),`
`,(0,c.jsx)(n.p,{children:`This will include all of the design tokens that are available in Forge.`}),`
`,(0,c.jsx)(n.p,{children:`If you would like to instead only include specific design tokens, you can include the following CSS file in your application:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-css`,children:`// This will load only the theme design tokens
@use '@tylertech/forge/dist/theme/forge-theme';

// This will load only the typography design tokens
@use '@tylertech/forge/dist/typography/forge-typography';

// This will load all other tokens
@use '@tylertech/forge/dist/forge-tokens';
`})}),`
`,(0,c.jsxs)(n.p,{children:[`To view the tokens in your page, inspect the `,(0,c.jsx)(n.code,{children:`<html>`}),` element and look under the `,(0,c.jsx)(n.code,{children:`:root`}),` selector.`]}),`
`,(0,c.jsx)(n.h2,{id:`theming`,children:`Theming`}),`
`,(0,c.jsx)(n.p,{children:`Theming is probably the most common use case for design tokens. By using design tokens, you can easily create a theme for your application that can be changed
dynamically. It's important that you use the same theme design tokens as the Forge components so that your application looks consistent with the Forge components,
but also adapts to theme changes such as dark mode.`}),`
`,(0,c.jsxs)(n.p,{children:[`To learn more about theming see the `,(0,c.jsx)(n.a,{href:`?path=/docs/getting-started-theming--docs`,children:`Theming documentation`}),`.`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};