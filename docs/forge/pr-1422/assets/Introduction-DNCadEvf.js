import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,u as a}from"./blocks-Dp_o0sTV.js";function o(e){let n={a:`a`,code:`code`,h1:`h1`,h2:`h2`,img:`img`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{title:`AI/Introduction`}),`
`,(0,c.jsx)(n.h1,{id:`forge-ai`,children:`Forge AI`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:`@tylertech/forge-ai`}),` is a library of Web Components for building AI chat interfaces: messages, prompts, tool-call indicators, dialogs, sidebars, canvases, and the small utilities they need.`]}),`
`,(0,c.jsx)(n.p,{children:`The components are UI building blocks. They do not manage conversation state or talk to a model, so you bring your own chat logic and layout and compose the pieces you need. Each page in this section documents one component using static data.`}),`
`,(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.a,{href:`https://www.npmjs.com/package/@tylertech/forge-ai`,rel:`nofollow`,children:(0,c.jsx)(n.img,{src:`https://img.shields.io/npm/v/%40tylertech%2Fforge-ai?style=for-the-badge`,alt:`NPM Version`})}),`
`,(0,c.jsx)(n.a,{href:`https://www.npmjs.com/package/@tylertech/forge-ai`,rel:`nofollow`,children:(0,c.jsx)(n.img,{src:`https://img.shields.io/npm/dt/%40tylertech%2Fforge-ai?style=for-the-badge`,alt:`NPM Downloads`})})]}),`
`,(0,c.jsx)(n.h2,{id:`installation`,children:`Installation`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-bash`,children:`npm install @tylertech/forge-ai @tylertech/forge
`})}),`
`,(0,c.jsx)(n.h2,{id:`registering-components`,children:`Registering components`}),`
`,(0,c.jsx)(n.p,{children:`Import each component you use. Every component is a subpath of the package, and importing it registers the element with the browser.`}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`import '@tylertech/forge-ai/ai-chat-interface';
import '@tylertech/forge-ai/ai-prompt';
`})}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-html`,children:`<forge-ai-prompt placeholder="Ask a question..."></forge-ai-prompt>
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Shared data shapes (messages, tools, threads, agents, files) are exported from `,(0,c.jsx)(n.code,{children:`@tylertech/forge-ai/types`}),`:`]}),`
`,(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:`language-ts`,children:`import type { MessageItem, Thread, Agent } from '@tylertech/forge-ai/types';
`})}),`
`,(0,c.jsxs)(n.p,{children:[`Markdown rendering and other helpers are exported from `,(0,c.jsx)(n.code,{children:`@tylertech/forge-ai/utils`}),`, and the tool renderer elements (data table, paginator, steps) from `,(0,c.jsx)(n.code,{children:`@tylertech/forge-ai/tools`}),`.`]}),`
`,(0,c.jsx)(n.h2,{id:`styling`,children:`Styling`}),`
`,(0,c.jsxs)(n.p,{children:[`The components style themselves with Forge design tokens. For the correct fonts, colors, and spacing, load the Forge global stylesheet and theme in your application. See `,(0,c.jsx)(n.a,{href:`?path=/docs/getting-started-installation--docs`,children:`Getting Started`}),` for details.`]}),`
`,(0,c.jsx)(n.h2,{id:`next-steps`,children:`Next steps`}),`
`,(0,c.jsxs)(n.ul,{children:[`
`,(0,c.jsx)(n.li,{children:`Browse the component pages in this section for properties, events, and examples.`}),`
`,(0,c.jsxs)(n.li,{children:[`Using React? See `,(0,c.jsx)(n.a,{href:`?path=/docs/ai-react--docs`,children:`AI/React`}),`.`]}),`
`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;function l(){return(l=e((()=>{c=r(),n(),i()})))()}l();export{s as default};