import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{i as u,n as d,r as f,t as p}from"./AiToolSteps.stories-CQVrnfrZ.js";function m(e){let n={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`A tool renderer that displays a `,(0,g.jsx)(n.code,{children:`displaySteps`}),` tool call as a `,(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-tools-reasoning-steps--docs`,children:(0,g.jsx)(n.code,{children:`forge-ai-steps`})}),` timeline. It is exported from `,(0,g.jsx)(n.code,{children:`@tylertech/forge-ai/tools`}),`. Use it when you want the model to narrate its work as a list of steps.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsxs)(n.p,{children:[`The tool call's `,(0,g.jsx)(n.code,{children:`args.steps`}),` supplies the steps. The timeline stays open while the call is still in progress and collapses once it settles.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`registering`,children:`Registering`}),`
`,(0,g.jsxs)(n.p,{children:[`Define a tool named `,(0,g.jsx)(n.code,{children:`displaySteps`}),` that takes a `,(0,g.jsx)(n.code,{children:`steps`}),` array and render it with this element. Set `,(0,g.jsx)(n.code,{children:`renderOnStart`}),` so the timeline appears while the arguments stream in.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`import '@tylertech/forge-ai/tools';

const displaySteps = {
  name: 'displaySteps',
  renderOnStart: true,
  renderer: { elementTag: 'forge-ai-tool-steps' }
  // parameters: a \`steps\` array of { label, detail?, status? }
};
`})}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};