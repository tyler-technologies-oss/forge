import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{n as u,r as d,t as f}from"./AiPrompt.stories-R8jd86L4.js";function p(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`A text input for sending messages to an AI assistant. It has a send button, optional action slots, slash commands, context chips, and up and down arrow history for recalling previous messages.`}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,h.jsxs)(n.p,{children:[`Listen for `,(0,h.jsx)(n.code,{children:`forge-ai-prompt-send`}),` to receive the message. The input clears after sending, unless you call `,(0,h.jsx)(n.code,{children:`preventDefault()`}),` on the event.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-ai-prompt placeholder="Ask a question..."></forge-ai-prompt>
`})}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-js`,children:`prompt.addEventListener('forge-ai-prompt-send', e => {
  console.log(e.detail.value);
});
`})}),`
`,(0,h.jsxs)(n.p,{children:[`While a response is generating, set `,(0,h.jsx)(n.code,{children:`running`}),` to show a stop button; `,(0,h.jsx)(n.code,{children:`forge-ai-prompt-stop`}),` fires when it is clicked.`]}),`
`,(0,h.jsx)(n.h3,{id:`layout`,children:`Layout`}),`
`,(0,h.jsxs)(n.p,{children:[`The `,(0,h.jsx)(n.code,{children:`variant`}),` is `,(0,h.jsx)(n.code,{children:`stacked`}),` (default), with actions in a row below the input, or `,(0,h.jsx)(n.code,{children:`inline`}),`, with actions beside the input.`]}),`
`,(0,h.jsx)(n.h3,{id:`action-slots`,children:`Action slots`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`actions-start`}),`: start of the actions row in stacked layout, or before the input in inline layout`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`actions-end`}),`: just before the send button`]}),`
`]}),`
`,(0,h.jsxs)(n.p,{children:[`Use them for controls such as file pickers, voice input, or `,(0,h.jsx)(n.code,{children:`forge-button`}),` options.`]}),`
`,(0,h.jsx)(n.h3,{id:`slash-commands-and-context`,children:`Slash commands and context`}),`
`,(0,h.jsxs)(n.p,{children:[`Set `,(0,h.jsx)(n.code,{children:`slashCommands`}),` to show a command menu when the user types `,(0,h.jsx)(n.code,{children:`/`}),`, and handle `,(0,h.jsx)(n.code,{children:`forge-ai-prompt-command`}),`. Set `,(0,h.jsx)(n.code,{children:`contextItems`}),` to show removable chips above the input and handle `,(0,h.jsx)(n.code,{children:`forge-ai-prompt-context-remove`}),`.`]}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};