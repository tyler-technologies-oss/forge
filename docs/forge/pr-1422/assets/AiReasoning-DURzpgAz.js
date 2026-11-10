import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{n as u,r as d,t as f}from"./AiReasoning.stories-DQb_Uo6c.js";function p(e){let n={code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`A collapsible container for showing a model's reasoning as it streams in. Pair it with a `,(0,h.jsx)(n.code,{children:`forge-ai-reasoning-header`}),` in the `,(0,h.jsx)(n.code,{children:`header`}),` slot and add one `,(0,h.jsx)(n.code,{children:`forge-ai-reasoning-content`}),` per reasoning step. Each step types itself out when added.`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsxs)(n.p,{children:[`The header's toggle event updates the container's `,(0,h.jsx)(n.code,{children:`expanded`}),` state automatically.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-ai-reasoning expanded>
  <forge-ai-reasoning-header slot="header" expanded reasoning>
    <span slot="reasoning-title">Thinking...</span>
    <span slot="title">Reasoning</span>
  </forge-ai-reasoning-header>
  <forge-ai-reasoning-content>Analyzing the problem...</forge-ai-reasoning-content>
</forge-ai-reasoning>
`})}),`
`,(0,h.jsx)(n.p,{children:`Append steps as they arrive:`}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`const step = document.createElement('forge-ai-reasoning-content');
step.textContent = text;
reasoning.appendChild(step);
`})}),`
`,(0,h.jsxs)(n.p,{children:[`Set `,(0,h.jsx)(n.code,{children:`reasoning`}),` on the header while steps are streaming, then clear it when done.`]}),`
`,(0,h.jsx)(n.h2,{id:`header`,children:`Header`}),`
`,(0,h.jsxs)(n.p,{children:[(0,h.jsx)(n.code,{children:`forge-ai-reasoning-header`}),` is the clickable header that toggles the section. Put it in the `,(0,h.jsx)(n.code,{children:`header`}),` slot. While `,(0,h.jsx)(n.code,{children:`reasoning`}),` is set it shows the `,(0,h.jsx)(n.code,{children:`reasoning-title`}),` slot; otherwise it shows the `,(0,h.jsx)(n.code,{children:`title`}),` slot. It fires `,(0,h.jsx)(n.code,{children:`forge-ai-reasoning-header-toggle`}),` when the user expands or collapses it, with `,(0,h.jsx)(n.code,{children:`detail.expanded`}),`. The parent `,(0,h.jsx)(n.code,{children:`forge-ai-reasoning`}),` listens for it automatically.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`header.addEventListener('forge-ai-reasoning-header-toggle', evt => {
  console.log(evt.detail.expanded);
});
`})}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};