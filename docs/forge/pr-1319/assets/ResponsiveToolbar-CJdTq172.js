import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-BjnIcTYW.js";import{n as c,t as l}from"./CustomArgTypes-DROUQxDe.js";import{n as u,r as d,t as f}from"./ResponsiveToolbar.stories-C5xR8B5d.js";function p(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:u}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`The Responsive Toolbar dynamically adjusts your toolbar content to prevent overlap on smaller screens. It leverages a `,(0,h.jsx)(n.code,{children:`ResizeObserver`}),` to detect
when the title content collides with the end slot content. When an overlap is detected, the toolbar automatically hides the `,(0,h.jsx)(n.code,{children:`end-large`}),` slot
and displays the `,(0,h.jsx)(n.code,{children:`end-small`}),` slot instead.`]}),`
`,(0,h.jsxs)(n.p,{children:[`This approach eliminates the need for manually configuring breakpoints or container queries, ensuring a seamless adaptive experience without extra
calculations. Simply provide your `,(0,h.jsx)(n.code,{children:`end-large`}),` slot content and your `,(0,h.jsx)(n.code,{children:`end-small`}),` slot content, and the component handles the rest.`]}),`
`,(0,h.jsx)(a,{of:f}),`
`,(0,h.jsxs)(n.blockquote,{children:[`
`,(0,h.jsxs)(n.p,{children:[(0,h.jsx)(n.strong,{children:`Note:`}),` The responsive toolbar will not automatically create a mobile friendly version of your end slot content. You
should be providing markup for both the `,(0,h.jsx)(n.code,{children:`end-large`}),` slot and the `,(0,h.jsx)(n.code,{children:`end-small`}),` slot, this lets you fine tune
the user experience based on available space.`]}),`
`]}),`
`,(0,h.jsx)(n.h3,{id:`why-a-responsive-toolbar`,children:`Why a responsive toolbar?`}),`
`,(0,h.jsxs)(n.p,{children:[`The toolbar is a common source of layout issues in applications, often overlooked when adapting to different screen sizes. Managing multiple instances
of the primitive `,(0,h.jsx)(n.code,{children:`<forge-toolbar>`}),` across a page can make breakpoint handling complex and inconsistent.`]}),`
`,(0,h.jsxs)(n.p,{children:[`The `,(0,h.jsx)(n.code,{children:`<forge-responsive-toolbar>`}),` solves this by automatically adjusting to various container sizes, preventing hidden content, overlapping text, and
broken layouts. It ensures a clean, readable UI without the need for manual breakpoint management.`]}),`
`,(0,h.jsx)(n.h3,{id:`when-to-use-a-responsive-toolbar`,children:`When to use a responsive toolbar`}),`
`,(0,h.jsx)(n.p,{children:`If you know that your application could potentially be used on lower resolutions or mobile devices, and you're currently using toolbars with actions
in the end slot, then you should use a responsive toolbar instead.`}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};