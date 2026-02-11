import{j as e,M as l,T as c,C as s}from"./blocks-Dsm0v9Vu.js";import{useMDXComponents as i}from"./index-BFM_vy2E.js";import{C as a}from"./CustomArgTypes-D52Gp5G4.js";import{C as r}from"./CssOnlyInformation-C4kNMRMf.js";import{S as d,D as h,C as p}from"./Scaffold.stories-DxECwsBP.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DdV2iuG_.js";import"./utils-DxN0EQW6.js";import"./style-map-CmIHP45Z.js";import"./directive-jorct-Oe.js";import"./class-map-DQex70EF.js";import"./decorators-D1r5GG2F.js";import"./service-adapter-CffG5Lhq.js";import"./scaffold-B_qTjcmL.js";import"./base-component-DX3NI00Q.js";import"./feature-detection-eeAKFJs_.js";function t(n){const o={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(c,{}),`
`,e.jsx(o.p,{children:"The scaffold component is intended to be used as a layout tool. You can use it for your full application layout, or even nest scaffolds within other scaffolds. Think of this component as a structural tool (it uses CSS grid under the hood) with named locations that allow you render any element you want in those named locations."}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:["Note: The scaffold handles common page layouts, but it's simply a wrapper around native CSS ",e.jsx(o.code,{children:"grid"})," styles to aid in common application layouts. We recommend that you become familiar with ",e.jsx(o.code,{children:"flexbox"})," and ",e.jsx(o.code,{children:"grid"})," for scenarios where you cannot use the scaffold. Suggested learning resources:"]}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"https://css-tricks.com/snippets/css/complete-guide-grid/",rel:"nofollow",children:"CSS Tricks: A complete guide to CSS Grid"})}),`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"https://www.youtube.com/watch?v=FEnRpy9Xfes&t=6s",rel:"nofollow",children:"Layout Land: CSS grid basics"})}),`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"https://css-tricks.com/snippets/css/a-guide-to-flexbox/",rel:"nofollow",children:"CSS Tricks: Flexbox basics"})}),`
`,e.jsx(o.li,{children:e.jsx(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox",rel:"nofollow",children:"MDN: Basics of Flexbox"})}),`
`]}),`
`]}),`
`,e.jsx(o.p,{children:"Using a scaffold will help you place elements in pre-defined locations within a layout. This makes it very easy to spin up common layouts without having to write any CSS at all. For instance, by placing content within the built-in slots the component will handle overflowing content for you."}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsx(o.p,{children:"Note: It is recommended that you use a single container element for each slot within the scaffold. This is because the scaffold applies specific CSS grid styles to the slotted elements, and this can cause unwanted side-effects to your elements if you place things like multiple buttons directly into the root of the slots themselves."}),`
`,e.jsx(o.p,{children:"If you encounter rendering issues where content is stacked on the z-index, ensure that each named slot is used only once."}),`
`]}),`
`,e.jsx(s,{of:h}),`
`,e.jsx(o.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"Ensure that all of the content in each of the slots is accessible by tabbing with the keyboard."}),`
`,e.jsxs(o.li,{children:["Use the proper semantic elements for content (if applicable) such as ",e.jsx(o.code,{children:"<header>"}),", ",e.jsx(o.code,{children:"<main>"}),", ",e.jsx(o.code,{children:"<aside>"}),"... etc..",`
`,e.jsxs(o.ul,{children:[`
`,e.jsx(o.li,{children:"The scaffold component itself has no semantic meaning."}),`
`,e.jsx(o.li,{children:"The scaffold component does not make any assumptions about the content you provide so it's up to you to provide the proper landmark elements."}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(o.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(o.p,{children:"The scaffold component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(r,{})]})}function D(n={}){const{wrapper:o}={...i(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{D as default};
