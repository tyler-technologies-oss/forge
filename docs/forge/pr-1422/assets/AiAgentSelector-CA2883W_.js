import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{n as u,r as d,t as f}from"./AiAgentSelector.stories-DRKZEwUe.js";function p(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`A dropdown for switching between AI agents. Use it when users can choose which agent handles their conversation.`}),`
`,(0,h.jsxs)(n.p,{children:[`Pass the available `,(0,h.jsx)(n.code,{children:`agents`}),` (`,(0,h.jsx)(n.code,{children:`{ id, name, description? }`}),`) and the current `,(0,h.jsx)(n.code,{children:`selectedAgentId`}),`. The first menu option is always the default (unselected) agent, labeled with `,(0,h.jsx)(n.code,{children:`titleText`}),`. With no `,(0,h.jsx)(n.code,{children:`agents`}),`, the component shows `,(0,h.jsx)(n.code,{children:`titleText`}),` as static text. A search filter appears when there are more than 5 agents.`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,h.jsxs)(n.p,{children:[`The selector is controlled: it emits `,(0,h.jsx)(n.code,{children:`forge-ai-agent-selector-change`}),` but does not update its own selection. Set `,(0,h.jsx)(n.code,{children:`selectedAgentId`}),` in response. `,(0,h.jsx)(n.code,{children:`agent`}),` is `,(0,h.jsx)(n.code,{children:`undefined`}),` when the default option is chosen.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-ts`,children:`selector.addEventListener('forge-ai-agent-selector-change', e => {
  const { agent, previousAgentId } = e.detail;
  selector.selectedAgentId = agent?.id;
});
`})}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsx)(n.p,{children:`The selector supports full keyboard navigation:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Enter / Space`}),` - Open dropdown or select focused item`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Escape`}),` - Close dropdown and return focus to trigger`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Arrow Down / Up`}),` - Navigate through agent options`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`Home`}),` - Jump to default option`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`End`}),` - Jump to last agent`]}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};