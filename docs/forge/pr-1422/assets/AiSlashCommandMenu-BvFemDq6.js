import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{i as u,n as d,r as f,t as p}from"./AiSlashCommandMenu.stories-Ce6smgMn.js";function m(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsxs)(n.p,{children:[`A popup list of slash commands, grouped by category, shown above an input. `,(0,g.jsx)(n.a,{href:`?path=/docs/ai-components-chat-prompt--docs`,children:(0,g.jsx)(n.code,{children:`forge-ai-prompt`})}),` already uses it when you set `,(0,g.jsx)(n.code,{children:`slashCommands`}),`, so you only need this component to build a custom input.`]}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,g.jsxs)(n.p,{children:[`The menu does not watch any input. Set `,(0,g.jsx)(n.code,{children:`anchor`}),` to the element to position against, set `,(0,g.jsx)(n.code,{children:`open`}),`, and pass the text after the `,(0,g.jsx)(n.code,{children:`/`}),` as `,(0,g.jsx)(n.code,{children:`filter-query`}),`. Forward `,(0,g.jsx)(n.code,{children:`keydown`}),` events from your input to `,(0,g.jsx)(n.code,{children:`handleKeyDown()`}),`, which handles arrow keys, Home, End, Enter and Escape and returns `,(0,g.jsx)(n.code,{children:`true`}),` when it used the key.`]}),`
`,(0,g.jsx)(n.pre,{children:(0,g.jsx)(n.code,{className:`language-ts`,children:`menu.commands = [{ id: 'clear', name: 'Clear conversation', group: 'Conversation' }];
menu.anchor = input;
input.addEventListener('keydown', evt => menu.handleKeyDown(evt));
menu.addEventListener('forge-ai-slash-command-menu-select', evt => run(evt.detail.command));
menu.addEventListener('forge-ai-slash-command-menu-close', () => (menu.open = false));
`})}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`forge-ai-slash-command-menu-select`}),` fires with the `,(0,g.jsx)(n.code,{children:`command`}),` and its `,(0,g.jsx)(n.code,{children:`index`}),` in the filtered list. The menu does not close itself, so set `,(0,g.jsx)(n.code,{children:`open`}),` to `,(0,g.jsx)(n.code,{children:`false`}),`.`]}),`
`,(0,g.jsxs)(n.li,{children:[(0,g.jsx)(n.code,{children:`forge-ai-slash-command-menu-close`}),` fires when the user presses Escape (through `,(0,g.jsx)(n.code,{children:`handleKeyDown()`}),`) or clicks the close button. The menu does not close itself here either.`]}),`
`,(0,g.jsxs)(n.li,{children:[`The menu is as wide as `,(0,g.jsx)(n.code,{children:`widthReference`}),`, falling back to the `,(0,g.jsx)(n.code,{children:`anchor`}),`, or 300px if neither is set.`]}),`
`]}),`
`,(0,g.jsx)(n.h3,{id:`filtering`,children:`Filtering`}),`
`,(0,g.jsxs)(n.p,{children:[`Commands are matched by name, ignoring case. Commands stay grouped by their `,(0,g.jsx)(n.code,{children:`group`}),`, and the menu shows "No commands found" when nothing matches.`]}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};