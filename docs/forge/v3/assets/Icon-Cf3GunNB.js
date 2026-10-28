import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{n as c,t as l}from"./CustomArgTypes-QAslgvtG.js";import{n as u,t as d}from"./CssOnlyInformation-CHdHW0tL.js";import{a as f,i as p,n as m,o as h,r as g,s as _,t as v}from"./Icon.stories-B2cy1FaM.js";function y(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s,{of:f}),`
`,(0,x.jsx)(o,{}),`
`,(0,x.jsx)(n.p,{children:`Icons are used to visually communicate the intention of content or actions. They can enhance the user experience and make the interface more intuitive.`}),`
`,(0,x.jsx)(n.p,{children:`The icon component in Forge is used to render SVG icons. It supports direct integration with the Tyler icons library.`}),`
`,(0,x.jsxs)(n.p,{children:[`Before you get started with this component you may want to learn more about installing and using icons in Forge `,(0,x.jsx)(n.a,{href:`?path=/docs/getting-started-icons--docs`,children:`here`}),`.`]}),`
`,(0,x.jsx)(a,{of:g}),`
`,(0,x.jsx)(n.h2,{id:`registry`,children:`Registry`}),`
`,(0,x.jsxs)(n.p,{children:[`The Forge icon component uses the Forge `,(0,x.jsx)(n.code,{children:`IconRegistry`}),` to define icons that are available in your application/library.`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-javascript`,children:`import { IconRegistry } from '@tylertech/forge';
import { tylIconForgeLogo } from '@tylertech/tyler-icons';

IconRegistry.define([
  tylIconForgeLogo
  // Add more icons here
]);
`})}),`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Important:`}),` The `,(0,x.jsx)(n.code,{children:`IconRegistry`}),` is side-effectful (stores the icons on `,(0,x.jsx)(n.code,{children:`window`}),`), but cannot be statically analyzed by bundlers. This means that
calls to the `,(0,x.jsx)(n.code,{children:`IconRegistry.define()`}),` method `,(0,x.jsx)(n.em,{children:`might`}),` be removed from optimized production bundles because the bundles may identify them as dead (unused)
code. To prevent this, you can move these calls to either a `,(0,x.jsx)(n.code,{children:`constructor`}),` of a JavaScript class,
`,(0,x.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks`,rel:`nofollow`,children:`static initialization block`}),`, or to a module
that is imported in your application's entry point.`]}),`
`,(0,x.jsx)(n.h2,{id:`external`,children:`External`}),`
`,(0,x.jsx)(n.p,{children:`You can also use the icon component to render icons dynamically from the Forge CDN (or any other external source). This is useful when you don't know
the icon name at build time.`}),`
`,(0,x.jsxs)(n.p,{children:[(0,x.jsx)(n.strong,{children:`Note`}),`: since external icons are not known at runtime, you do not need to register them with the `,(0,x.jsx)(n.code,{children:`IconRegistry`}),`. The icon component will automatically cache
the icons it fetches from the external source in the registry for you for any additional usages of the icon to avoid fetching the same icon multiple times.`]}),`
`,(0,x.jsx)(a,{of:p}),`
`,(0,x.jsxs)(n.blockquote,{children:[`
`,(0,x.jsx)(n.p,{children:`If you view your network requests you will see that the icon is fetched from the Forge CDN when this page loads.`}),`
`]}),`
`,(0,x.jsx)(n.h3,{id:`url-builder`,children:`URL Builder`}),`
`,(0,x.jsxs)(n.p,{children:[`If you want to adjust where the icon is fetched from, you can implement the `,(0,x.jsx)(n.code,{children:`externalUrlBuilder`}),` callback, which is called with the icon name and should
return the URL of the `,(0,x.jsx)(n.code,{children:`.svg`}),` icon you want to render.`]}),`
`,(0,x.jsx)(n.pre,{children:(0,x.jsx)(n.code,{className:`language-javascript`,children:`const externalUrlBuilder = (name: string, type: IconExternalType): string {
  return \`https://example.com/\${iconName}.svg\`;
};
`})}),`
`,(0,x.jsx)(n.h2,{id:`lazy`,children:`Lazy`}),`
`,(0,x.jsxs)(n.p,{children:[`Icons can also be rendered lazily using the `,(0,x.jsx)(n.code,{children:`lazy`}),` attribute. This is useful when you have a large number of icons on a page and you want to defer rendering
them until they are visible within the viewport.`]}),`
`,(0,x.jsx)(a,{of:h}),`
`,(0,x.jsx)(n.p,{children:`If you were to inspect this page before scrolling this section into view, you would see that the icon is not rendered in the DOM until it is visible.`}),`
`,(0,x.jsx)(n.h2,{id:`custom-svg`,children:`Custom SVG`}),`
`,(0,x.jsxs)(n.p,{children:[`You can also use the icon component to render custom SVG content via the `,(0,x.jsx)(n.code,{children:`src`}),` property/attribute. This is useful when you need to render custom SVGs or
SVGs from a third-party library.`]}),`
`,(0,x.jsx)(n.p,{children:`For example, here is how we can use the icon component to render an SVG from the Forge illustration library and treat it like text:`}),`
`,(0,x.jsx)(a,{of:m}),`
`,(0,x.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,x.jsx)(l,{}),`
`,(0,x.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,x.jsx)(n.p,{children:`There are two types of icons used in applications, decorative and semantic. Typically we use icons for decorative purposes only, but there
may be cases where you need to make an icon semantic and accessible.`}),`
`,(0,x.jsx)(n.h3,{id:`decorative-icons`,children:`Decorative icons`}),`
`,(0,x.jsx)(n.p,{children:`Decorative icons are typically hidden from assistive technology, but there are some important things to note about these icons:`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[`Add an `,(0,x.jsx)(n.code,{children:`aria-hidden="true"`}),` attribute to the icon element to avoid its content being interpreted incorrectly.`]}),`
`,(0,x.jsx)(n.li,{children:`Treat icons as any other text on the page and use proper color contrast ratios.`}),`
`]}),`
`,(0,x.jsx)(n.h3,{id:`semantic-icons`,children:`Semantic icons`}),`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[`Use an `,(0,x.jsx)(n.code,{children:`role="img"`}),` attribute to give it semantic meaning.`]}),`
`,(0,x.jsxs)(n.li,{children:[`Use an `,(0,x.jsx)(n.code,{children:`aria-label`}),` or `,(0,x.jsx)(n.code,{children:`aria-describedby`}),` attribute.`]}),`
`,(0,x.jsxs)(n.li,{children:[`Use a `,(0,x.jsx)(n.code,{children:`title`}),` attribute or a Forge tooltip component to provide a visual description.`]}),`
`,(0,x.jsx)(n.li,{children:`Treat icons as any other text on the page and use proper color contrast ratios.`}),`
`,(0,x.jsxs)(n.li,{children:[`If using an SVG icon, hook up the `,(0,x.jsx)(n.code,{children:`<title>`}),` element (if applicable) to an `,(0,x.jsx)(n.code,{children:`aria-labelledby`}),` attribute on the `,(0,x.jsx)(n.code,{children:`<svg>`}),` element.`,`
`,(0,x.jsxs)(n.ul,{children:[`
`,(0,x.jsxs)(n.li,{children:[`If no `,(0,x.jsx)(n.code,{children:`<title>`}),` element exists, use an alternative approach such as `,(0,x.jsx)(n.code,{children:`aria-label`}),` or `,(0,x.jsx)(n.code,{children:`title`}),` attribute.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,x.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,x.jsx)(n.p,{children:`The icon component is also available as a CSS-only component without the need for JavaScript.`}),`
`,(0,x.jsx)(a,{of:v}),`
`,(0,x.jsx)(d,{})]})}function b(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,x.jsx)(n,{...e,children:(0,x.jsx)(y,{...e})}):y(e)}var x;function S(){return(S=e((()=>{x=r(),n(),i(),c(),u(),_()})))()}S();export{b as default};