import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,u as o}from"./blocks-DnLnh7by.js";import{n as s}from"./CustomArgTypes-DS7Rl0eI.js";import{n as c,r as l,t as u}from"./SkipToMainContent.stories-Bu322JNr.js";function d(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o,{of:c}),`
`,(0,p.jsx)(n.h1,{id:`recipe-skip-to-main-content`,children:`Recipe: Skip To Main Content`}),`
`,(0,p.jsxs)(n.p,{children:[`Use a "skip to main content" element to meet `,(0,p.jsx)(n.a,{href:`https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html`,rel:`nofollow`,children:`WCAG 2 Criteria 2.4.1: Bypass Blocks`}),`.
This allows users to skip repeated content blocks in order to get more direct access to the primary content of a web page.`]}),`
`,(0,p.jsxs)(n.blockquote,{children:[`
`,(0,p.jsx)(n.p,{children:`Recommended for public facing (community) applications.`}),`
`]}),`
`,(0,p.jsx)(n.p,{children:`Meets needs for:`}),`
`,(0,p.jsxs)(n.ul,{children:[`
`,(0,p.jsx)(n.li,{children:`Sighted keyboard users`}),`
`,(0,p.jsx)(n.li,{children:`Users with visual impairments`}),`
`]}),`
`,(0,p.jsx)(a,{of:u}),`
`,(0,p.jsx)(n.p,{children:`The important aspect of this recipe is to ensure that the skip link is visible when focused, and that it is the first focusable element on the page.
This allows users to quickly navigate to the main content of the page without having to tab through all of the other interactive elements.`}),`
`,(0,p.jsxs)(n.p,{children:[`You should always use an `,(0,p.jsx)(n.code,{children:`<a>`}),` element, and ensure that you prevent the default action when the link is clicked to avoid reloading the page. Use a
hash link to the `,(0,p.jsx)(n.code,{children:`id`}),` of the main content element to ensure that the user is taken directly to the main content.`]})]})}function f(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,p.jsx)(n,{...e,children:(0,p.jsx)(d,{...e})}):d(e)}var p;function m(){return(m=e((()=>{p=r(),n(),i(),s(),l()})))()}m();export{f as default};