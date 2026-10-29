import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,u as a}from"./blocks-DnLnh7by.js";function o(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`Getting Started/Icons`}),`
`,(0,c.jsx)(n.h1,{id:`icons`,children:`Icons`}),`
`,(0,c.jsx)(n.p,{children:`Tyler Forge provides a set of icons that can be used in your application and libraries. These icons are SVGs and can be used either directly in your HTML
or more commonly via the Forge icon component.`}),`
`,(0,c.jsxs)(n.p,{children:[`To learn more about the Forge icon component, see the `,(0,c.jsx)(n.a,{href:`?path=/docs/components-icon--docs`,children:`documentation`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`icon-library`,children:`Icon Library`}),`
`,(0,c.jsx)(n.p,{children:`Icons are distributed via the Tyler icons library. This library gives you access to over 8500+ icons.`}),`
`,(0,c.jsxs)(n.p,{children:[`You can view the full set of icons or search the library in the design system `,(0,c.jsx)(n.a,{href:`https://forge.tylertech.com/assets/icon-library/`,rel:`nofollow`,children:`here`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`installation`,children:`Installation`}),`
`,(0,c.jsx)(n.p,{children:`The Tyler icons library is available as as NPM package, or from the Forge CDN.`}),`
`,(0,c.jsx)(n.h3,{id:`npm-package`,children:`NPM Package`}),`
`,(0,c.jsx)(n.p,{children:`This is the recommended way to consume icons in your applications or libraries. You can install the package using the following command:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`npm install @tylertech/tyler-icons
`})}),`
`,(0,c.jsx)(n.h4,{id:`usage`,children:`Usage`}),`
`,(0,c.jsx)(n.p,{children:`The icons are distributed as ES modules, so you can import them directly into your application:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`import { tylIconFavorite, tylIconHeart, tylIconForgeLogo } from '@tylertech/tyler-icons';
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Each icon object consists of a `,(0,c.jsx)(n.code,{children:`name`}),` and `,(0,c.jsx)(n.code,{children:`data`}),` property. The `,(0,c.jsx)(n.code,{children:`name`}),` is the name of the icon, and the `,(0,c.jsx)(n.code,{children:`data`}),` is the raw SVG string for the icon.`]}),`
`,(0,c.jsxs)(n.p,{children:[`Each icon can then be registered for use with the `,(0,c.jsx)(n.code,{children:`<forge-icon>`}),` component using the `,(0,c.jsx)(n.code,{children:`IconRegistry`}),`:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`import { IconRegistry } from '@tylertech/forge';

IconRegistry.define([tylIconFavorite, tylIconHeart, tylIconForgeLogo]);
`})}),`
`,(0,c.jsx)(n.p,{children:`You can then use the icon in your HTML like so:`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-icon name="favorite"></forge-icon>
<forge-icon name="heart"></forge-icon>
<forge-icon name="forge-logo"></forge-icon>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`If you cannot statically determine the name of the icon to render at build time, you can also use the `,(0,c.jsx)(n.code,{children:`external`}),` attribute on the `,(0,c.jsx)(n.code,{children:`<forge-icon>`}),` element:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-icon name="favorite" external></forge-icon>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`This instructs the `,(0,c.jsx)(n.code,{children:`<forge-icon>`}),` component to fetch the icon data from the CDN at runtime. This is useful if you want to dynamically load icons based on dynamic data.`]}),`
`,(0,c.jsx)(n.h2,{id:`cdn`,children:`CDN`}),`
`,(0,c.jsxs)(n.p,{children:[`You can also access the icons directly from the CDN as `,(0,c.jsx)(n.code,{children:`.svg`}),` files. This is useful if you want to use the icons as images instead, or fetch the
icons manually.`]}),`
`,(0,c.jsx)(n.h3,{id:`image`,children:`Image`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<img src="https://cdn.forge.tylertech.com/v1/icons/svg/standard/cake.svg" alt="Cake icon" />
`})}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:`Note:`}),` make note of the "standard" part of the URL. This is the icon set that the icon belongs to. You can replace this with "extended" or
"custom" to access icons from those sets.`]}),`
`]}),`
`,(0,c.jsx)(n.h3,{id:`fetch`,children:`Fetch`}),`
`,(0,c.jsxs)(n.p,{children:[`You could also fetch these SVG files dynamically in your application using the `,(0,c.jsx)(n.code,{children:`fetch`}),` API. This would give you access to the `,(0,c.jsx)(n.code,{children:`<svg>`}),` data that
you could then render in your HTML. In fact, this is exactly what the `,(0,c.jsx)(n.code,{children:`<forge-icon>`}),` component does under the hood.`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-javascript`,children:`fetch('https://cdn.forge.tylertech.com/v1/icons/svg/standard/cake.svg')
  .then(response => response.text())
  .then(svg => {
    // Render the SVG in your HTML
  });
`})}),`
`,(0,c.jsx)(n.h2,{id:`contribution`,children:`Contribution`}),`
`,(0,c.jsxs)(n.p,{children:[`The icon library is hosted on GitHub and is open source. If you would like to view the source code or contribute to the library, you can find
the repository here: `,(0,c.jsx)(n.a,{href:`https://github.com/tyler-technologies-oss/tyler-icons`,rel:`nofollow`,children:`https://github.com/tyler-technologies-oss/tyler-icons`})]}),`
`,(0,c.jsxs)(n.blockquote,{children:[`
`,(0,c.jsx)(n.p,{children:`Tyler Technologies uses the Material Design Icons as a base for the standard and extended icon sets. These icons are licensed by Google but
self-hosted by Forge to ensure availability and performance. We do not modify the icons in any way, and they are distributed under the
original licensing terms.`}),`
`,(0,c.jsx)(n.p,{children:`The custom icons are created by Tyler Technologies and are licensed under Apache 2.0.`}),`
`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};