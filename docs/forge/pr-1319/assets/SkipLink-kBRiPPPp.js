import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-92lRto7J.js";import{n as c,t as l}from"./CustomArgTypes-sQOLn0vT.js";import{n as u,r as d,t as f}from"./SkipLink.stories-ByI4PSu9.js";function p(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,p:`p`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:u}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`Skip links are used at the beginning of a page to allow users to skip over repetitive content.`}),`
`,(0,h.jsx)(a,{of:f}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.p,{children:[`Always include a skip link as the first child of the `,(0,h.jsx)(n.code,{children:`<body>`}),` element that targets the main content of the page. Any page with
content, navigation or otherwise, that repeats across the start of multiple pages should include a skip link. You may use more
than one to link to multiple areas of the page, but be judicious because too many skip links can themselves become frustrating
to navigate. Remember, users of assistive technology have their own methods to navigate between landmarks on a page and may not
appreciate the extra "help."`]}),`
`,(0,h.jsx)(n.p,{children:`You may also include an inline skip link within a page to skip to relevant content. For example, a skip link could be used to
bypass search filters and go directly to the list of results. Ensure that the text of the skip link clearly indicates what it
navigates to.`}),`
`,(0,h.jsxs)(n.p,{children:[`The target element should always have `,(0,h.jsx)(n.code,{children:`tabindex="-1"`}),` set as an attribute if it is not otherwise focusable. This allows the
browser to focus it after navigation without including it in the tab order.`]}),`
`,(0,h.jsxs)(n.blockquote,{children:[`
`,(0,h.jsx)(n.p,{children:`In Safari, the skip link component does not behave the same as in other browsers because anchor links are never included in the
tab order. Screen reader users can still perceive the skip link and use it to navigate the page.`}),`
`]}),`
`,(0,h.jsx)(n.p,{children:(0,h.jsx)(n.a,{href:`https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html`,rel:`nofollow`,children:`See WCAG Success Criterion 2.4.1 for more information.`})}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};