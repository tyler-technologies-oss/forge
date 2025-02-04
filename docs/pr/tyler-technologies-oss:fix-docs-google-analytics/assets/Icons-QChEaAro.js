import{j as e,M as t}from"./index-w01xucW8.js";import{useMDXComponents as i}from"./index-Be4DGfmT.js";import"./iframe-BHKin_8s.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";function s(o){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Getting Started/Icons"}),`
`,e.jsx(n.h1,{id:"icons",children:"Icons"}),`
`,e.jsx(n.p,{children:`Tyler Forge provides a set of icons that can be used in your application and libraries. These icons are SVGs and can be used either directly in your HTML
or more commonly via the Forge icon component.`}),`
`,e.jsxs(n.p,{children:["To learn more about the Forge icon component, see the ",e.jsx(n.a,{href:"?path=/docs/components-icon--docs",children:"documentation"}),"."]}),`
`,e.jsx(n.h2,{id:"icon-library",children:"Icon Library"}),`
`,e.jsx(n.p,{children:"Icons are distributed via the Tyler icons library. This library is made up 3 sets of icons:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Standard:"})," The standard Material Design icons."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Extended:"})," This is a subset of the community-based Material Design icon set."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom:"})," Custom icons created by Tyler Technologies."]}),`
`]}),`
`,e.jsx(n.p,{children:"These three sets of icons are combined into a single library that can be used in your applications, that gives you access to over 5000 icons."}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"}),` we are currently in the planning phase of combining all 3 icon sets into a single library to reduce confusion and deduplicate the icons.
This will be available in a future release. See the `,e.jsx(n.a,{href:"?path=/docs/about-roadmap--docs",children:"roadmap"})," to view the status of this project."]}),`
`]}),`
`,e.jsxs(n.p,{children:["You can view the full set of icons or search the library in the design system ",e.jsx(n.a,{href:"https://forge.tylertech.com/assets/icon-library/",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.p,{children:"The Tyler icons library is available as as NPM package, or from the Forge CDN."}),`
`,e.jsx(n.h3,{id:"npm-package",children:"NPM Package"}),`
`,e.jsx(n.p,{children:"This is the recommended way to consume icons in your applications or libraries. You can install the package using the following command:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @tylertech/tyler-icons
`})}),`
`,e.jsx(n.h4,{id:"usage",children:"Usage"}),`
`,e.jsx(n.p,{children:"The icons are distributed as ES modules, so you can import them directly into your application:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { tylIconFavorite } from '@tylertech/tyler-icons/standard';
import { tylIconHeart } from '@tylertech/tyler-icons/extended';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';
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
`]})]})}function g(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(s,{...o})}):s(o)}export{g as default};
