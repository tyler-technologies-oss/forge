import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnEL0lHT.js";import{n as c,t as l}from"./CustomArgTypes-CbY-ITnm.js";import{n as u,r as d,t as f}from"./AiEditThread.stories-j6RlHFAD.js";function p(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`An inline text field with cancel and save buttons for renaming a conversation. `,(0,h.jsx)(n.a,{href:`?path=/docs/ai-components-conversations-conversations-panel--docs`,children:(0,h.jsx)(n.code,{children:`forge-ai-conversations-panel`})}),` and `,(0,h.jsx)(n.a,{href:`?path=/docs/ai-components-conversations-threads-search--docs`,children:(0,h.jsx)(n.code,{children:`forge-ai-threads-search`})}),` show it in place of a thread's row while it is being renamed. Use it directly only when building your own conversation list.`]}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,h.jsxs)(n.p,{children:[`Set `,(0,h.jsx)(n.code,{children:`thread`}),` to the conversation being renamed and `,(0,h.jsx)(n.code,{children:`value`}),` to the text to start with. The input is focused and its text selected as soon as it renders.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-ai-edit-thread id="editor"></forge-ai-edit-thread>
`})}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-js`,children:`editor.thread = thread;
editor.value = thread.title;
editor.addEventListener('forge-ai-edit-thread-save', e => rename(e.detail.id, e.detail.newTitle));
editor.addEventListener('forge-ai-edit-thread-cancel', () => editor.remove());
`})}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`forge-ai-edit-thread-save`}),` fires on Enter or the save button, with the thread `,(0,h.jsx)(n.code,{children:`id`}),`, `,(0,h.jsx)(n.code,{children:`oldTitle`}),` and the trimmed `,(0,h.jsx)(n.code,{children:`newTitle`}),`. The component does not remove itself, so swap it out in your handler.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`forge-ai-edit-thread-cancel`}),` fires on Escape, the cancel button, or when focus leaves the field. It also fires on save if the new title is empty or unchanged.`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};