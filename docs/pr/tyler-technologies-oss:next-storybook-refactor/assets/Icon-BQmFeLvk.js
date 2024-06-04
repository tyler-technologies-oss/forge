import{j as e}from"./jsx-runtime-BXY7fkHv.js";import{u as r}from"./index-B35H-hDJ.js";import{M as s,T as c,C as i}from"./index-BQXqdhD9.js";import{C as a}from"./CustomArgTypes-DVZyxngG.js";import{I as l,D as d,E as h,L as u,C as m}from"./Icon.stories-Dqq12rES.js";import"./iframe-DY-Rh9OC.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-d6LfNt4R.js";import"./icon-V4IE3JYq.js";import"./base-adapter-BIKyOSkq.js";import"./constants-C96o6uhb.js";import"./index-Dh0vMUMR.js";import"./index-fxMNKkgx.js";function o(t){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(c,{}),`
`,e.jsx(n.p,{children:"Icons are used to visually communicate the intention of content or actions. They can enhance the user experience and make the interface more intuitive."}),`
`,e.jsx(n.p,{children:"The icon component in Forge is used to render SVG icons. It supports direct integration with the Tyler icons library."}),`
`,e.jsxs(n.p,{children:["Before you get started with this component you may want to learn more about installing and using icons in Forge ",e.jsx(n.a,{href:"?path=/docs/getting-started-icons--docs",children:"here"}),"."]}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(n.h2,{id:"registry",children:"Registry"}),`
`,e.jsxs(n.p,{children:["The Forge icon component uses the Forge ",e.jsx(n.code,{children:"IconRegistry"})," to define icons that are available in your application/library."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`import { IconRegistry } from '@tylertech/forge';
import { tylIconForgeLogo } from '@tylertech/tyler-icons/custom';

IconRegistry.define([
  tylIconForgeLogo,
  // Add more icons here
]);
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important:"})," The ",e.jsx(n.code,{children:"IconRegistry"})," is side-effectful (stores the icons on ",e.jsx(n.code,{children:"window"}),`), but cannot be statically analyzed by bundlers. This means that
calls to the `,e.jsx(n.code,{children:"IconRegistry.define()"})," method ",e.jsx(n.em,{children:"might"}),` be removed from optimized production bundles because the bundles may identify them as dead (unused)
code. To prevent this, you can move these calls to either a `,e.jsx(n.code,{children:"constructor"}),` of a JavaScript class,
`,e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks",rel:"nofollow",children:"static initialization block"}),`, or to a module
that is imported in your application's entry point.`]}),`
`,e.jsx(n.h2,{id:"external",children:"External"}),`
`,e.jsx(n.p,{children:`You can also use the icon component to render icons dynamically from the Forge CDN (or any other external source). This is useful when you don't know
the icon name at build time.`}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note"}),": since external icons are not known at runtime, you do not need to register them with the ",e.jsx(n.code,{children:"IconRegistry"}),`. The icon component will automatically cache
the icons it fetches from the external source in the registry for you for any additional usages of the icon to avoid fetching the same icon multiple times.`]}),`
`,e.jsx(i,{of:h}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:"If you view your network requests you will see that the icon is fetched from the Forge CDN when this page loads."}),`
`]}),`
`,e.jsx(n.h3,{id:"url-builder",children:"URL Builder"}),`
`,e.jsxs(n.p,{children:["If you want to adjust where the icon is fetched from, you can implement the ",e.jsx(n.code,{children:"externalUrlBuilder"}),` callback, which is called with the icon name and should
return the URL of the `,e.jsx(n.code,{children:".svg"})," icon you want to render."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:"const externalUrlBuilder = (name: string, type: IconExternalType): string {\n  return `https://example.com/${iconName}.svg`;\n};\n"})}),`
`,e.jsx(n.h2,{id:"lazy",children:"Lazy"}),`
`,e.jsxs(n.p,{children:["Icons can also be rendered lazily using the ",e.jsx(n.code,{children:"lazy"}),` attribute. This is useful when you have a large number of icons on a page and you want to defer rendering
them until they are visible within the viewport.`]}),`
`,e.jsx(i,{of:u}),`
`,e.jsx(n.p,{children:"If you were to inspect this page before scrolling this section into view, you would see that the icon is not rendered in the DOM until it is visible."}),`
`,e.jsx(n.h2,{id:"custom-svg",children:"Custom SVG"}),`
`,e.jsxs(n.p,{children:["You can also use the icon component to render custom SVG content via the ",e.jsx(n.code,{children:"src"}),` property/attribute. This is useful when you need to render custom SVGs or
SVGs from a third-party library.`]}),`
`,e.jsx(n.p,{children:"For example, here is how we can use the icon component to render an SVG from the Forge illustration library and treat it like text:"}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:`There are two types of icons used in applications, decorative and semantic. Typically we use icons for decorative purposes only, but there
may be cases where you need to make an icon semantic and accessible.`}),`
`,e.jsx(n.h3,{id:"decorative-icons",children:"Decorative icons"}),`
`,e.jsx(n.p,{children:"Decorative icons are typically hidden from assistive technology, but there are some important things to note about these icons:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Add an ",e.jsx(n.code,{children:'aria-hidden="true"'})," attribute to the icon element to avoid its content being interpreted incorrectly."]}),`
`,e.jsx(n.li,{children:"Treat icons as any other text on the page and use proper color contrast ratios."}),`
`]}),`
`,e.jsx(n.h3,{id:"semantic-icons",children:"Semantic icons"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Use an ",e.jsx(n.code,{children:'role="img"'})," attribute to give it semantic meaning."]}),`
`,e.jsxs(n.li,{children:["Use an ",e.jsx(n.code,{children:"aria-label"})," or ",e.jsx(n.code,{children:"aria-describedby"})," attribute."]}),`
`,e.jsxs(n.li,{children:["Use a ",e.jsx(n.code,{children:"title"})," attribute or a Forge tooltip component to provide a visual description."]}),`
`,e.jsx(n.li,{children:"Treat icons as any other text on the page and use proper color contrast ratios."}),`
`,e.jsxs(n.li,{children:["If using an SVG icon, hook up the ",e.jsx(n.code,{children:"<title>"})," element (if applicable) to an ",e.jsx(n.code,{children:"aria-labelledby"})," attribute on the ",e.jsx(n.code,{children:"<svg>"})," element.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If no ",e.jsx(n.code,{children:"<title>"})," element exists, use an alternative approach such as ",e.jsx(n.code,{children:"aria-label"})," or ",e.jsx(n.code,{children:"title"})," attribute."]}),`
`]}),`
`]}),`
`]})]})}function G(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{G as default};
