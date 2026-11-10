import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{n as u,r as d,t as f}from"./AiChainOfThought.stories-NX1-QA7z.js";function p(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`An expandable container that shows the steps an agent took to reach an answer. Use it so users can inspect the reasoning behind a response without it taking over the conversation.`}),`
`,(0,h.jsxs)(n.p,{children:[`Put a `,(0,h.jsx)(n.code,{children:`forge-ai-reasoning-header`}),` in the `,(0,h.jsx)(n.code,{children:`heading`}),` slot and thought components in the default slot. Clicking the header expands the container, or you can set `,(0,h.jsx)(n.code,{children:`expanded`}),` yourself.`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-ai-chain-of-thought>
  <forge-ai-reasoning-header slot="heading">
    <span slot="title">Chain of thought</span>
    <span slot="reasoning-title">Thinking...</span>
  </forge-ai-reasoning-header>

  <forge-ai-thought-search-result>
    <span slot="title">Searching for information</span>
    Found 3 relevant articles.
  </forge-ai-thought-search-result>

  <forge-ai-thought-detail>
    <span slot="title">Conclusion</span>
    Based on the sources, here is the answer.
  </forge-ai-thought-detail>
</forge-ai-chain-of-thought>
`})}),`
`,(0,h.jsxs)(n.p,{children:[`Set `,(0,h.jsx)(n.code,{children:`reasoning`}),` on the header while the agent is still working to show the `,(0,h.jsx)(n.code,{children:`reasoning-title`}),` slot instead of `,(0,h.jsx)(n.code,{children:`title`}),`.`]}),`
`,(0,h.jsx)(n.h2,{id:`thought-components`,children:`Thought components`}),`
`,(0,h.jsxs)(n.p,{children:[`Each takes a `,(0,h.jsx)(n.code,{children:`title`}),` slot.`]}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`forge-ai-thought-detail`}),`: a text step. Content goes in the default slot.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`forge-ai-thought-search-result`}),`: a search step (optional `,(0,h.jsx)(n.code,{children:`step`}),` number). Set `,(0,h.jsx)(n.code,{children:`sources`}),` to an array of `,(0,h.jsx)(n.code,{children:`{ title, href }`}),` to list source links. Optional description in the default slot.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`forge-ai-thought-image`}),`: an image-analysis step (optional `,(0,h.jsx)(n.code,{children:`step`}),` number). Put the image in the `,(0,h.jsx)(n.code,{children:`image`}),` slot.`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};