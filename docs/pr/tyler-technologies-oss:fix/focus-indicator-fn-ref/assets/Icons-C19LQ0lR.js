import{j as e,M as i}from"./blocks-DaaLZYBh.js";import{useMDXComponents as t}from"./index-u53TkaxQ.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Dprz-Y3x.js";function s(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",strong:"strong",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Getting Started/Icons"}),`
`,e.jsx(n.h1,{id:"icons",children:"Icons"}),`
`,e.jsx(n.p,{children:`Tyler Forge provides a set of icons that can be used in your application and libraries. These icons are SVGs and can be used either directly in your HTML
or more commonly via the Forge icon component.`}),`
`,e.jsxs(n.p,{children:["To learn more about the Forge icon component, see the ",e.jsx(n.a,{href:"?path=/docs/components-icon--docs",children:"documentation"}),"."]}),`
`,e.jsx(n.h2,{id:"icon-library",children:"Icon Library"}),`
`,e.jsx(n.p,{children:"Icons are distributed via the Tyler icons library. This library gives you access to over 8500+ icons."}),`
`,e.jsxs(n.p,{children:["You can view the full set of icons or search the library in the design system ",e.jsx(n.a,{href:"https://forge.tylertech.com/assets/icon-library/",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"The Tyler icons library is available as as NPM package, or from the Forge CDN."}),`
`,e.jsx(n.h3,{id:"npm-package",children:"NPM Package"}),`
`,e.jsx(n.p,{children:"This is the recommended way to consume icons in your applications or libraries. You can install the package using the following command:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @tylertech/tyler-icons
`})}),`
`,e.jsx(n.h4,{id:"usage",children:"Usage"}),`
`,e.jsx(n.p,{children:"The icons are distributed as ES modules, so you can import them directly into your application:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { tylIconFavorite, tylIconHeart, tylIconForgeLogo } from '@tylertech/tyler-icons';
`})}),`
`,e.jsxs(n.p,{children:["Each icon object consists of a ",e.jsx(n.code,{children:"name"})," and ",e.jsx(n.code,{children:"data"})," property. The ",e.jsx(n.code,{children:"name"})," is the name of the icon, and the ",e.jsx(n.code,{children:"data"})," is the raw SVG string for the icon."]}),`
`,e.jsxs(n.p,{children:["Each icon can then be registered for use with the ",e.jsx(n.code,{children:"<forge-icon>"})," component using the ",e.jsx(n.code,{children:"IconRegistry"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { IconRegistry } from '@tylertech/forge';

IconRegistry.define([tylIconFavorite, tylIconHeart, tylIconForgeLogo]);
`})}),`
`,e.jsx(n.p,{children:"You can then use the icon in your HTML like so:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-icon name="favorite"></forge-icon>
<forge-icon name="heart"></forge-icon>
<forge-icon name="forge-logo"></forge-icon>
`})}),`
`,e.jsxs(n.p,{children:["If you cannot statically determine the name of the icon to render at build time, you can also use the ",e.jsx(n.code,{children:"external"})," attribute on the ",e.jsx(n.code,{children:"<forge-icon>"})," element:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<forge-icon name="favorite" external></forge-icon>
`})}),`
`,e.jsxs(n.p,{children:["This instructs the ",e.jsx(n.code,{children:"<forge-icon>"})," component to fetch the icon data from the CDN at runtime. This is useful if you want to dynamically load icons based on dynamic data."]}),`
`,e.jsx(n.h2,{id:"cdn",children:"CDN"}),`
`,e.jsxs(n.p,{children:["You can also access the icons directly from the CDN as ",e.jsx(n.code,{children:".svg"}),` files. This is useful if you want to use the icons as images instead, or fetch the
icons manually.`]}),`
`,e.jsx(n.h3,{id:"image",children:"Image"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<img src="https://cdn.forge.tylertech.com/v1/icons/svg/standard/cake.svg" alt="Cake icon" />
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` make note of the "standard" part of the URL. This is the icon set that the icon belongs to. You can replace this with "extended" or
"custom" to access icons from those sets.`]}),`
`]}),`
`,e.jsx(n.h3,{id:"fetch",children:"Fetch"}),`
`,e.jsxs(n.p,{children:["You could also fetch these SVG files dynamically in your application using the ",e.jsx(n.code,{children:"fetch"})," API. This would give you access to the ",e.jsx(n.code,{children:"<svg>"}),` data that
you could then render in your HTML. In fact, this is exactly what the `,e.jsx(n.code,{children:"<forge-icon>"})," component does under the hood."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`fetch('https://cdn.forge.tylertech.com/v1/icons/svg/standard/cake.svg')
  .then(response => response.text())
  .then(svg => {
    // Render the SVG in your HTML
  });
`})}),`
`,e.jsx(n.h2,{id:"contribution",children:"Contribution"}),`
`,e.jsxs(n.p,{children:[`The icon library is hosted on GitHub and is open source. If you would like to view the source code or contribute to the library, you can find
the repository here: `,e.jsx(n.a,{href:"https://github.com/tyler-technologies-oss/tyler-icons",rel:"nofollow",children:"https://github.com/tyler-technologies-oss/tyler-icons"})]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`Tyler Technologies uses the Material Design Icons as a base for the standard and extended icon sets. These icons are licensed by Google but
self-hosted by Forge to ensure availability and performance. We do not modify the icons in any way, and they are distributed under the
original licensing terms.`}),`
`,e.jsx(n.p,{children:"The custom icons are created by Tyler Technologies and are licensed under Apache 2.0."}),`
`]})]})}function d(o={}){const{wrapper:n}={...t(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(s,{...o})}):s(o)}export{d as default};
