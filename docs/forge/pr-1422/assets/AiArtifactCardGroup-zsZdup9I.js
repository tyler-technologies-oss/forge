import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{a as u,i as d,n as f,r as p,t as m}from"./AiArtifactCardGroup.stories-DH-YQQG4.js";function h(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:f}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsxs)(n.p,{children:[`Lists several `,(0,_.jsx)(n.code,{children:`forge-ai-artifact-card`}),` elements as one container, for example when an agent returns more than one result for a request. Cards past `,(0,_.jsx)(n.code,{children:`visible-count`}),` (3 by default) collapse behind a toggle.`]}),`
`,(0,_.jsx)(a,{of:p}),`
`,(0,_.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[`Place only `,(0,_.jsx)(n.code,{children:`forge-ai-artifact-card`}),` elements in the group. They switch to a row style automatically, and each still emits `,(0,_.jsx)(n.code,{children:`forge-ai-artifact-card-open`}),`.`]}),`
`,(0,_.jsxs)(n.li,{children:[`The toggle emits `,(0,_.jsx)(n.code,{children:`forge-ai-artifact-card-group-toggle`}),` with `,(0,_.jsx)(n.code,{children:`{ expanded }`}),`.`]}),`
`,(0,_.jsxs)(n.li,{children:[`Customize the toggle text with `,(0,_.jsx)(n.code,{children:`show-more-text`}),` (`,(0,_.jsx)(n.code,{children:`{count}`}),` becomes the number of collapsed cards) and `,(0,_.jsx)(n.code,{children:`show-less-text`}),`.`]}),`
`,(0,_.jsxs)(n.li,{children:[`Cards you set `,(0,_.jsx)(n.code,{children:`hidden`}),` on stay hidden and are not counted.`]}),`
`]}),`
`,(0,_.jsxs)(n.p,{children:[`With `,(0,_.jsx)(n.code,{children:`visible-count`}),` cards or fewer, no toggle renders.`]}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsx)(n.h2,{id:`active-row`,children:`Active row`}),`
`,(0,_.jsxs)(n.p,{children:[`Set `,(0,_.jsx)(n.code,{children:`active`}),` on the card for the result currently being viewed. In a group it shows as a light accent fill.`]}),`
`,(0,_.jsx)(a,{of:m}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{}),`
`,(0,_.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsx)(n.li,{children:`The group is a list and each card a list item, so screen readers announce the number of visible results. The toggle label includes the number of collapsed ones.`}),`
`,(0,_.jsxs)(n.li,{children:[`The toggle is a native button with `,(0,_.jsx)(n.code,{children:`aria-expanded`}),`, and keeps focus after expanding or collapsing.`]}),`
`,(0,_.jsx)(n.li,{children:`Collapsed cards are removed from the tab order and accessibility tree.`}),`
`]})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};