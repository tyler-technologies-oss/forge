import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{a as u,c as d,i as f,n as p,o as m,r as h,s as g,t as _}from"./AiSteps.stories-DvsMCNLC.js";function v(e){let n={a:`a`,code:`code`,h2:`h2`,p:`p`,...t(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(s,{of:_}),`
`,(0,b.jsx)(o,{}),`
`,(0,b.jsxs)(n.p,{children:[`An expandable timeline of the steps an agent took to produce a response. Collapsed, it shows a step count and the first couple of labels. Expanded, it lists every step with a status marker, and a detail card for steps that have a `,(0,b.jsx)(n.code,{children:`detail`}),`. Use it to show your work without dumping every intermediate message.`]}),`
`,(0,b.jsx)(a,{of:h}),`
`,(0,b.jsxs)(n.p,{children:[`Pass `,(0,b.jsx)(n.code,{children:`steps`}),` as `,(0,b.jsx)(n.code,{children:`{ label, detail?, status? }`}),` objects. `,(0,b.jsx)(n.code,{children:`status`}),` is `,(0,b.jsx)(n.code,{children:`pending`}),`, `,(0,b.jsx)(n.code,{children:`running`}),`, or `,(0,b.jsx)(n.code,{children:`complete`}),` (the default). An empty `,(0,b.jsx)(n.code,{children:`steps`}),` array renders nothing.`]}),`
`,(0,b.jsx)(n.h2,{id:`running-and-complete`,children:`Running and complete`}),`
`,(0,b.jsxs)(n.p,{children:[`While `,(0,b.jsx)(n.code,{children:`running`}),` is set, the timeline stays open and the summary is hidden so the user can watch progress.`]}),`
`,(0,b.jsx)(a,{of:u}),`
`,(0,b.jsxs)(n.p,{children:[`When `,(0,b.jsx)(n.code,{children:`running`}),` turns off, the timeline collapses to its summary. An element that first renders with `,(0,b.jsx)(n.code,{children:`running`}),` off starts expanded, so a finished run is readable without interaction.`]}),`
`,(0,b.jsx)(a,{of:p}),`
`,(0,b.jsx)(n.h2,{id:`steps-without-detail`,children:`Steps without detail`}),`
`,(0,b.jsxs)(n.p,{children:[`Steps with no `,(0,b.jsx)(n.code,{children:`detail`}),` render as just a marker and label.`]}),`
`,(0,b.jsx)(a,{of:f}),`
`,(0,b.jsx)(n.h2,{id:`formatting`,children:`Formatting`}),`
`,(0,b.jsxs)(n.p,{children:[(0,b.jsx)(n.code,{children:`label`}),` and `,(0,b.jsx)(n.code,{children:`detail`}),` are rendered as sanitized inline markdown: `,(0,b.jsx)(n.code,{children:"`code`"}),`, `,(0,b.jsx)(n.code,{children:`**bold**`}),`, `,(0,b.jsx)(n.code,{children:`*italic*`}),`, `,(0,b.jsx)(n.code,{children:`~~strikethrough~~`}),` and links. Escape literal `,(0,b.jsx)(n.code,{children:`*`}),`, `,(0,b.jsx)(n.code,{children:`_`}),` and backtick characters with a backslash. Unclosed syntax stays literal while text is still streaming. In the collapsed summary, links appear as plain text, and images or media from other origins render as links.`]}),`
`,(0,b.jsx)(a,{of:g}),`
`,(0,b.jsx)(n.h2,{id:`streaming`,children:`Streaming`}),`
`,(0,b.jsxs)(n.p,{children:[`Re-assign `,(0,b.jsx)(n.code,{children:`steps`}),` as new data arrives. This example adds each step's label first, then its detail once the step completes.`]}),`
`,(0,b.jsx)(a,{of:m}),`
`,(0,b.jsxs)(n.p,{children:[`To drive this from a model's tool call, see `,(0,b.jsx)(n.a,{href:`?path=/docs/ai-components-tools-reasoning-tool-steps--docs`,children:(0,b.jsx)(n.code,{children:`forge-ai-tool-steps`})}),`.`]}),`
`,(0,b.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,b.jsx)(l,{})]})}function y(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,b.jsx)(n,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=r(),n(),i(),c(),d()})))()}x();export{y as default};